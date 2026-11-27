import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

const locales=['zh-Hant','zh-Hans','en','es','ja','de','fr','ko','pt'];
const projectDialogs=[
 ['templatesButton','templatesDialog','設計模板'],
 ['exportPngButton','pngDialog','匯出高清 PNG'],
 ['shoppingButton','shoppingDialog','傢俬購物清單'],
 ['budgetButton','budgetDialog','裝修預算'],
 ['pdfButton','pdfDialog','PDF 圖則'],
 ['traceButton','traceDialog','描繪平面圖'],
 ['versionsButton','versionsDialog','版本歷史'],
 ['clientButton','clientDialog','客戶資料'],
 ['brandButton','brandDialog','報告品牌設定'],
 ['cloudButton','cloudDialog','雲端專案']
];
const localDialogs=[['helpButton','helpDialog','30 秒學識用'],['buildButton','homeDialog',null],['addFurnitureButton','furnitureDialog',null],['checkButton','checkDialog',null]];
async function noOverflow(page){
 const dims=await page.evaluate(()=>({w:document.documentElement.scrollWidth,v:innerWidth}));
 expect(dims.w).toBeLessThanOrEqual(dims.v+2);
}
async function inspectDialog(page,info,id,source,locale){
 const dialog=page.locator('#'+id);
 await expect(dialog).toBeVisible();
 const heading=dialog.locator('h2').first();
 await expect(heading).toBeVisible();
 if(source){const translated=await page.evaluate(s=>window.EasyHomeI18n.t(s),source);
  if(locale!=='zh-Hant')expect(translated).not.toBe(source);
  await expect(heading).toHaveText(translated);
 }
 await noOverflow(page);
 const controls=await dialog.locator('button,input,select,textarea').evaluateAll(nodes=>nodes.filter(n=>n.getClientRects().length).map(n=>({tag:n.tagName,id:n.id,disabled:n.disabled,rect:n.getBoundingClientRect().toJSON(),label:n.innerText||n.getAttribute('aria-label')||n.title||n.labels?.[0]?.innerText||''})));
 expect(controls.length).toBeGreaterThan(0);
 for(const c of controls){expect(c.rect.width,c.id||c.tag).toBeGreaterThan(0);expect(c.rect.height,c.id||c.tag).toBeGreaterThan(0);}
 await info.attach(id+'-control-inventory',{body:JSON.stringify(controls,null,2),contentType:'application/json'});
 await page.screenshot({path:info.outputPath(locale+'-'+id+'.png'),animations:'disabled'});
 await dialog.locator('button.close-dialog').click();
 await expect(dialog).not.toBeVisible();
}
for(const locale of locales){
 test('locale '+locale+' project dialogs, controls and screenshots',async({page},info)=>{
  test.setTimeout(120000);
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/?lang='+locale);await expect(page.locator('html')).toHaveAttribute('lang',locale);
  await page.locator('#projectsButton').click();
  await expect(page.locator('#localeSelect')).toHaveValue(locale);
  await inspectDialog(page,info,'projectsDialog','我的專案',locale);
  for(const [button,dialog,heading] of projectDialogs){
   await page.locator('#projectsButton').click();
   await page.locator('#'+button).click();
   await inspectDialog(page,info,dialog,heading,locale);
  }
  expect(errors).toEqual([]);
 });
 test('locale '+locale+' core dialogs and 2D/3D view switching',async({page},info)=>{
  test.setTimeout(90000);
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('/?lang='+locale);await expect(page.locator('html')).toHaveAttribute('lang',locale);
  for(const [button,dialog,heading] of localDialogs){
   await page.locator('#'+button).click();
   await inspectDialog(page,info,dialog,heading,locale);
  }
  await page.locator('#view3d').click();
  await expect(page.locator('#view3d')).toHaveAttribute('aria-pressed','true');
  await page.screenshot({path:info.outputPath(locale+'-3d.png')});
  await page.locator('#view2d').click();
  await expect(page.locator('#view2d')).toHaveAttribute('aria-pressed','true');
  await page.screenshot({path:info.outputPath(locale+'-2d.png')});
  expect(errors).toEqual([]);
 });
}
for(const mode of ['2d','3d']){
 test('PNG '+mode+' all size and framing combinations',async({page},info)=>{
  test.setTimeout(120000);
  await page.goto('/?lang=zh-Hant');
  await page.locator('#startBuild').click();await page.locator('#buildHome').click();
  await page.locator('#view'+mode).click();
  for(const framing of ['fit','current'])for(const size of ['1600','2400','3200']){
   await page.locator('#projectsButton').click();await page.locator('#exportPngButton').click();
   await page.locator('#pngFraming').selectOption(framing);await page.locator('#pngSize').selectOption(size);
   const pending=page.waitForEvent('download');await page.locator('#downloadPng').click();
   const download=await pending;expect(await download.failure()).toBeNull();
   const path=info.outputPath(mode+'-'+framing+'-'+size+'.png');await download.saveAs(path);
   const bytes=await readFile(path);
   expect(bytes.subarray(0,8).toString('hex')).toBe('89504e470d0a1a0a');
   const w=bytes.readUInt32BE(16),h=bytes.readUInt32BE(20);
   expect(Math.max(w,h)).toBe(Number(size));expect(Math.min(w,h)).toBeGreaterThan(0);
   if(framing==='fit')expect(Math.abs(w/h-1.5)).toBeLessThan(.002);
   await page.screenshot({path:info.outputPath(mode+'-'+framing+'-'+size+'-dialog.png')});
   await page.locator('#pngDialog button.close-dialog').click();
  }
 });
}
test('all four templates create separate durable projects',async({page},info)=>{
 test.setTimeout(90000);
 await page.goto('/?lang=zh-Hant');
 const state=()=>page.evaluate(()=>JSON.parse(localStorage.getItem('easy-home-3d:projects:v1')));
 const initial=await state();const initialId=initial.activeId;
 for(let i=0;i<4;i++){
  await page.locator('#projectsButton').click();await page.locator('#templatesButton').click();
  const buttons=page.locator('#templateList button');await expect(buttons).toHaveCount(4);
  await page.screenshot({path:info.outputPath('template-'+i+'-catalog.png')});
  const before=await state();await buttons.nth(i).click();
  await expect(page.locator('#templatesDialog')).not.toBeVisible();
  await expect.poll(async()=> (await state()).projects.length).toBe(before.projects.length+1);
  const after=await state();expect(after.activeId).not.toBe(before.activeId);
  const active=after.projects.find(x=>x.id===after.activeId);
  expect(active.data.walls.length).toBeGreaterThan(0);
  expect(after.projects.find(x=>x.id===initialId).data).toEqual(initial.projects.find(x=>x.id===initialId).data);
  await page.screenshot({path:info.outputPath('template-'+i+'-created.png')});
 }
 await page.reload();expect((await state()).projects.length).toBe(initial.projects.length+4);
});
