import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';

const locales=['zh-Hant','zh-Hans','en','es','ja','de','fr','ko','pt'];
async function project(page,id){await page.locator('#projectsButton').click();await page.locator('#'+id).click();}
async function close(page,id){await page.locator('#'+id+' button.close-dialog').click();await expect(page.locator('#'+id)).not.toBeVisible();}
async function home(page,locale){
 await page.goto('/?lang='+locale);await expect(page.locator('html')).toHaveAttribute('lang',locale);
 await page.locator('#startBuild').click();await page.locator('#homeName').fill('QA '+locale);
 await page.locator('#homeWidth').fill('8');await page.locator('#homeDepth').fill('6');
 await page.locator('#homeBedrooms').selectOption('2');await page.locator('#homeFloors').selectOption('1');
 await page.locator('#buildHome').click();await expect(page.locator('#homeDialog')).not.toBeVisible();
 await expect.poll(()=>page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('easy-home-3d:projects:v1'));return s.projects.find(p=>p.id===s.activeId).data.walls.length})).toBeGreaterThan(3);
}
async function download(page,id,path){
 const p=page.waitForEvent('download',{timeout:20000});await page.locator('#'+id).click();const d=await p;
 expect(await d.failure()).toBeNull();await d.saveAs(path);return {bytes:await readFile(path),name:d.suggestedFilename()};
}
async function nonblankImage(page,bytes){
 return page.evaluate(async data=>{
  const img=new Image();img.src='data:image/png;base64,'+data;await img.decode();
  const c=document.createElement('canvas');c.width=96;c.height=96;const x=c.getContext('2d');x.drawImage(img,0,0,96,96);
  const pixels=x.getImageData(0,0,96,96).data,colors=new Set();
  for(let i=0;i<pixels.length;i+=4)colors.add([pixels[i]>>4,pixels[i+1]>>4,pixels[i+2]>>4,pixels[i+3]>>4].join(','));
  return {w:img.naturalWidth,h:img.naturalHeight,colors:colors.size};
 },bytes.toString('base64'));
}
for(const locale of locales){
 for(const mode of ['2d','3d'])test('all PNG choices '+locale+' '+mode,async({page},info)=>{
  test.setTimeout(120000);await home(page,locale);const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.locator('#view'+mode).click();await expect(page.locator('#view'+mode)).toHaveAttribute('aria-pressed','true');
  const stage=await page.locator('#stage').boundingBox();expect(stage.width).toBeGreaterThan(0);
  await project(page,'exportPngButton');
  for(const framing of ['fit','current'])for(const size of ['1600','2400','3200']){
   const key=locale+'-'+mode+'-'+framing+'-'+size;
   await page.locator('#pngFraming').selectOption(framing);await page.locator('#pngSize').selectOption(size);
   await expect(page.locator('#downloadPng')).toBeEnabled();
   const d=await download(page,'downloadPng',info.outputPath(key+'.png'));
   expect(d.name).toContain(mode);expect(d.bytes.subarray(0,8).toString('hex')).toBe('89504e470d0a1a0a');
   const w=d.bytes.readUInt32BE(16),h=d.bytes.readUInt32BE(20);
   expect(Math.max(w,h)).toBe(Number(size));
   const ratio=framing==='fit'?1.5:stage.width/stage.height;
   expect(Math.abs(w/h-ratio)).toBeLessThan(.01);
   const decoded=await nonblankImage(page,d.bytes);expect(decoded.w).toBe(w);expect(decoded.h).toBe(h);expect(decoded.colors).toBeGreaterThan(5);
   await page.screenshot({path:info.outputPath(key+'-dialog.png'),animations:'disabled'});
  }
  await close(page,'pngDialog');expect(errors).toEqual([]);
 });
 for(const paper of ['A4','A3'])test('all PDF choices '+locale+' '+paper,async({page},info)=>{
  test.setTimeout(150000);await home(page,locale);const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await project(page,'brandButton');await page.locator('#brandCompany').fill('QA Studio');
  await page.locator('#brandTitle').fill('QA plan '+locale);await page.locator('#brandRights').check();await page.locator('#brandSave').click();
  await project(page,'pdfButton');await page.locator('#pdfPaper').selectOption(paper);
  const mm=paper==='A3'?[420,297]:[297,210];
  for(const brand of [false,true])for(const scale of ['20','50','100','200']){
   const key=locale+'-'+paper+'-1-'+scale+'-'+(brand?'brand':'plain');
   await page.locator('#pdfScale').selectOption(scale);await page.locator('#pdfBrand').setChecked(brand);
   await page.screenshot({path:info.outputPath(key+'-preview.png'),animations:'disabled'});
   if(scale==='20'){await expect(page.locator('#pdfDownload')).toBeDisabled();continue;}
   await expect(page.locator('#pdfDownload')).toBeEnabled();
   const {bytes}=await download(page,'pdfDownload',info.outputPath(key+'.pdf'));
   const str=bytes.toString('latin1'),box=str.match(/\/MediaBox \[0 0 ([\d.]+) ([\d.]+)\]/);
   expect(str.startsWith('%PDF-1.4')).toBe(true);expect(box).not.toBeNull();
   expect(Number(box[1])).toBeCloseTo(mm[0]*72/25.4,3);expect(Number(box[2])).toBeCloseTo(mm[1]*72/25.4,3);
   const image=str.match(/\/Subtype \/Image \/Width (\d+) \/Height (\d+)/);expect(image).not.toBeNull();
   expect(Number(image[1])).toBe(Math.round(mm[0]*200/25.4));expect(Number(image[2])).toBe(Math.round(mm[1]*200/25.4));
   expect(str.trimEnd().endsWith('%%EOF')).toBe(true);
  }
  await close(page,'pdfDialog');expect(errors).toEqual([]);
 });
}
