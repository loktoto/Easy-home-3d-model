import { test as base, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

const locales=['zh-Hant','zh-Hans','en','es','ja','de','fr','ko','pt'];
const storage='easy-home-3d:projects:v1';
const test=base.extend({
 qa:async({page},use,info)=>{
  const events=[],errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.exposeBinding('__qaRecord',(_,event)=>events.push(event));
  await page.addInitScript(()=>{
   for(const kind of ['click','change','pointerup','keydown'])document.addEventListener(kind,e=>{
    const el=e.target instanceof Element?e.target.closest('button,input,select,textarea,a,canvas'):null;
    if(!el)return;
    const key=el.id?'#'+el.id:el.getAttribute('data-tool')?'[data-tool='+el.getAttribute('data-tool')+']':el.getAttribute('data-act')?'[data-act='+el.getAttribute('data-act')+']':el.getAttribute('data-close')?'[data-close='+el.getAttribute('data-close')+']':el.tagName.toLowerCase();
    // Never capture input values, credentials, token text or model contents.
    window.__qaRecord({kind,key,tag:el.tagName,dialog:el.closest('dialog')?.id||null,trusted:e.isTrusted,locale:document.documentElement.lang}).catch(()=>{});
   },true);
  });
  const shot=async name=>{
   await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBe(true);
   await page.screenshot({path:info.outputPath(name+'.png'),animations:'disabled',timeout:10000});
  };
  try{await use({shot});expect(errors).toEqual([]);}
  finally{await info.attach('actual-control-events',{body:JSON.stringify({events,errors},null,2),contentType:'application/json'});}
 }
});
async function saved(page){
 return page.evaluate(k=>{const s=JSON.parse(localStorage.getItem(k));return {state:s,project:s.projects.find(p=>p.id===s.activeId)}},storage);
}
async function readModel(page){return (await saved(page)).project.data;}
async function expectModel(page,fn,value){await expect.poll(async()=>fn(await readModel(page))).toEqual(value);}
async function dismissInspector(page){
 if(await page.locator('#inspector').evaluate(e=>e.classList.contains('open'))&&await page.locator('#closeInspector').isVisible())await page.locator('#closeInspector').click();
}
async function openProject(page,id){
 await dismissInspector(page);await page.locator('#projectsButton').click();await page.locator('#'+id).click();
}
async function closeDialog(page,id){
 await page.locator('#'+id+' button.close-dialog').click();await expect(page.locator('#'+id)).not.toBeVisible();
}
async function input(page,selector,value){const field=page.locator(selector);await field.fill(String(value));await field.press('Tab');}
async function start(page,locale){
 await page.goto('/?lang='+locale);await expect(page.locator('html')).toHaveAttribute('lang',locale);
}
async function home(page,locale){
 await start(page,locale);await page.locator('#startBuild').click();
 await page.locator('#homeWidth').fill('3');await expect(page.locator('#buildHome')).toBeDisabled();
 await page.locator('#homeName').fill('QA '+locale);
 await page.locator('#homeWidth').fill('8');await page.locator('#homeDepth').fill('6');
 await page.locator('#homeBedrooms').selectOption('2');await page.locator('#homeFloors').selectOption('1');
 await expect(page.locator('#buildHome')).toBeEnabled();await page.locator('#buildHome').click();
 await expect.poll(async()=> (await readModel(page)).walls.length).toBeGreaterThan(3);
}
async function addFirst(page){
 await dismissInspector(page);await page.locator('#addFurnitureButton').click();
 await page.locator('#furnitureCatalog button').first().click();
}
async function download(page,id,path){
 const pending=page.waitForEvent('download',{timeout:15000});await page.locator('#'+id).click();
 const d=await pending;expect(await d.failure()).toBeNull();await d.saveAs(path);return readFile(path);
}

for(const locale of locales){
 test('functional locale '+locale+' geometry, plan annotations, toolbar, units and themes',async({page,qa},info)=>{
  test.setTimeout(120000);
  await home(page,locale);
  await qa.shot(locale+'-built-2d');
  await openProject(page,'planStatsButton');
  await expect(page.locator('#planGross')).toHaveAttribute('data-area','48');
  expect(Number(await page.locator('#planNet').getAttribute('data-area'))).toBeLessThan(48);
  await input(page,'#northDegrees',90);await expect(page.locator('#planNorthStatus')).toContainText('90');
  await page.locator('#planLegend').uncheck();await page.locator('#planDoorSwing').uncheck();await page.locator('#planGrid').check();
  await expectModel(page,m=>[m.planMeta.north,m.planMeta.legend,m.planMeta.doorSwing,m.planMeta.grid],[90,false,false,true]);
  await qa.shot(locale+'-plan-details');
  await page.locator('#openingSchedule button').first().click();
  await expect(page.locator('#planStatsDialog')).not.toBeVisible();await expect(page.locator('#prop-width')).toBeVisible();
  await qa.shot(locale+'-opening-selected');
  await dismissInspector(page);await page.locator('#northArrow').click();
  await expect(page.locator('#northDegrees')).toHaveValue('90');
  await page.locator('#planLegend').check();await page.locator('#planDoorSwing').check();await page.locator('#planGrid').uncheck();
  await closeDialog(page,'planStatsDialog');await expect(page.locator('#planLegendBox')).toBeVisible();
  await page.locator('#addFloor').click();await expectModel(page,m=>m.floorCount,2);
  await page.locator('.floor-tab').first().click();await page.locator('.floor-tab').last().click();
  page.once('dialog',d=>d.accept());await page.locator('#removeFloor').click();await expectModel(page,m=>m.floorCount,1);
  for(const name of ['room','wall','door','window','measure','pan','select']){
   const button=page.locator('[data-tool='+name+']');await button.click();await expect(button).toHaveAttribute('aria-pressed','true');
  }
  for(const id of ['snapButton','dimsButton']){
   const button=page.locator('#'+id),old=await button.getAttribute('aria-pressed');
   await button.click();await expect(button).toHaveAttribute('aria-pressed',old==='true'?'false':'true');
   await button.click();await expect(button).toHaveAttribute('aria-pressed',old);
  }
  for(const id of ['zoomIn','zoomOut','fitBottom','fitButton'])await page.locator('#'+id).click();
  await page.locator('#view3d').click();await expect(page.locator('#view3d')).toHaveAttribute('aria-pressed','true');await qa.shot(locale+'-built-3d');
  await page.locator('#view2d').click();await expect(page.locator('#view2d')).toHaveAttribute('aria-pressed','true');
  await page.emulateMedia({colorScheme:'dark'});
  for(const theme of ['light','dark','system']){
   await page.locator('#projectsButton').click();await page.locator('#themeSelect').selectOption(theme);
   await closeDialog(page,'projectsDialog');await expect(page.locator('html')).toHaveAttribute('data-theme',theme==='system'?'dark':theme);
   await qa.shot(locale+'-theme-'+theme);
  }
  await page.emulateMedia({colorScheme:'light'});await expect(page.locator('html')).toHaveAttribute('data-theme','light');await qa.shot(locale+'-theme-system-light');
  const before=await readModel(page);
  for(const unit of ['cm','mm','ft-in','m']){
   await page.locator('#projectsButton').click();await page.locator('#unitSelect').selectOption(unit);
   await expect(page.locator('#unitSelect')).toHaveValue(unit);await closeDialog(page,'projectsDialog');
   expect(await readModel(page)).toEqual(before);
  }
  await page.reload();await expect(page.locator('html')).toHaveAttribute('lang',locale);
  await expectModel(page,m=>m.planMeta.north,90);
 });

 test('functional locale '+locale+' every furniture catalog button and edit actions',async({page,qa},info)=>{
  test.setTimeout(120000);await start(page,locale);
  const expected=await page.evaluate(()=>EasyHomeCore.catalog.map(c=>({type:c.type,name:c.name,w:c.w,d:c.d,h:c.h})));
  expect(expected).toHaveLength(12);
  for(let i=0;i<expected.length;i++){
   await dismissInspector(page);await page.locator('#addFurnitureButton').click();
   const catalog=page.locator('#furnitureCatalog button');await expect(catalog).toHaveCount(expected.length);
   await expect(catalog.nth(i)).toContainText(expected[i].name);
   if(i===0)await qa.shot(locale+'-catalog');
   await catalog.nth(i).click();
   await expect.poll(async()=> (await readModel(page)).furniture.length).toBe(i+1);
   const item=(await readModel(page)).furniture.at(-1);
   expect({type:item.type,name:item.name,w:item.w,d:item.d,h:item.h}).toEqual(expected[i]);
   await expect(page.locator('#objName')).toHaveValue(item.name);
   await qa.shot(locale+'-furniture-'+item.type);
  }
  const count=expected.length;
  await input(page,'#objName','QA furniture '+locale);
  await input(page,'#prop-w',1.25);await input(page,'#prop-d',.75);await input(page,'#prop-h',1.5);
  await input(page,'#prop-x',2);await input(page,'#prop-y',3);
  await input(page,'#prop-rotation',45);
  await page.locator('#colorInput').fill('#112233');await page.locator('#colorInput').press('Tab');
  await expect.poll(async()=>{const f=(await readModel(page)).furniture.at(-1);return [f.name,f.w,f.d,f.h,f.x,f.y,f.color]}).toEqual(['QA furniture '+locale,1.25,.75,1.5,2,3,'#112233']);
  await page.locator('[data-act=lock]').click();await expectModel(page,m=>m.furniture.at(-1).locked,true);
  await page.locator('[data-act=lock]').click();await expectModel(page,m=>m.furniture.at(-1).locked,false);
  const angle=(await readModel(page)).furniture.at(-1).rotation;
  await page.locator('[data-act=rotate]').click();await expect.poll(async()=> (await readModel(page)).furniture.at(-1).rotation).not.toBe(angle);
  await qa.shot(locale+'-edited-furniture');
  await page.locator('[data-act=duplicate]').click();await expectModel(page,m=>m.furniture.length,count+1);
  await page.locator('[data-act=delete]').click();await expectModel(page,m=>m.furniture.length,count);
  await dismissInspector(page);await page.locator('#undoButton').click();await expectModel(page,m=>m.furniture.length,count+1);
  await page.locator('#redoButton').click();await expectModel(page,m=>m.furniture.length,count);
  await page.reload();await expectModel(page,m=>m.furniture.length,count);
 });

 test('functional locale '+locale+' actual reports, client, image trace, history and backups',async({page,qa},info)=>{
  test.setTimeout(150000);await home(page,locale);
  await addFirst(page);await input(page,'#objName','QA sofa '+locale);await dismissInspector(page);
  await openProject(page,'shoppingButton');await page.locator('#shoppingCurrency').selectOption('USD');
  const row=page.locator('#shoppingRows .report-row').filter({hasText:'QA sofa '+locale});
  await expect(row).toHaveCount(1);await input(page,'#shoppingRows .report-row:has-text("QA sofa '+locale+'") input',25);
  const shopping=await download(page,'shoppingCsv',info.outputPath(locale+'-shopping.csv'));
  expect(shopping.toString('utf8')).toContain('QA sofa '+locale);expect(shopping.toString('utf8')).toContain('"25","25"');
  await qa.shot(locale+'-shopping');await closeDialog(page,'shoppingDialog');
  await openProject(page,'budgetButton');await page.locator('#budgetAdd').click();
  await input(page,'[data-budget-prop=name]','QA painting');await input(page,'[data-budget-prop=qty]',3);await input(page,'[data-budget-prop=cost]',100);await input(page,'#budgetContingency',10);
  const budget=await download(page,'budgetCsv',info.outputPath(locale+'-budget.csv'));
  expect(budget.toString('utf8')).toContain('"QA painting","3","USD","100","300"');expect(budget.toString('utf8')).toContain('"Total","","USD","","357.5"');
  await qa.shot(locale+'-budget');await closeDialog(page,'budgetDialog');
  await openProject(page,'clientButton');await page.locator('#clientName').fill('QA client '+locale);await page.locator('#clientReference').fill('Q-42');await page.locator('#clientStatus').selectOption('active');await page.locator('#clientNotes').fill('QA note');
  await qa.shot(locale+'-client');await page.locator('#clientSave').click();await expectModel(page,m=>m.client?.client,'QA client '+locale);
  await openProject(page,'brandButton');await page.locator('#brandCompany').fill('QA Studio');await page.locator('#brandTitle').fill('QA plan');await page.locator('#brandColor').fill('#11685a');
  const png=await page.evaluate(()=>{const c=document.createElement('canvas');c.width=400;c.height=200;const ctx=c.getContext('2d');ctx.fillStyle='white';ctx.fillRect(0,0,400,200);ctx.strokeStyle='#11685a';ctx.lineWidth=8;ctx.strokeRect(20,20,360,160);return c.toDataURL('image/png').split(',')[1];});
  await page.locator('#brandLogo').setInputFiles({name:'qa-logo.png',mimeType:'image/png',buffer:Buffer.from(png,'base64')});
  await expect(page.locator('#brandLogoPreview')).toBeVisible();await expect(page.locator('#brandSave')).toBeDisabled();
  await page.locator('#brandRights').check();await qa.shot(locale+'-brand');await page.locator('#brandSave').click();
  await openProject(page,'pdfButton');await page.locator('#pdfScale').selectOption('20');await expect(page.locator('#pdfDownload')).toBeDisabled();
  await page.locator('#pdfScale').selectOption('100');await page.locator('#pdfBrand').check();await expect(page.locator('#pdfDownload')).toBeEnabled();
  const pdf=await download(page,'pdfDownload',info.outputPath(locale+'-plan.pdf'));expect(pdf.toString('latin1',0,8)).toBe('%PDF-1.4');expect(pdf.toString('latin1')).toContain('/DCTDecode');
  await qa.shot(locale+'-pdf');await closeDialog(page,'pdfDialog');
  await openProject(page,'traceButton');await page.locator('#traceFile').setInputFiles({name:'qa-plan.png',mimeType:'image/png',buffer:Buffer.from(png,'base64')});
  await expect(page.locator('#tracePreview')).toHaveAttribute('width','400');const trace=page.locator('#tracePreview'),p=await trace.boundingBox();
  await trace.click({position:{x:p.width*.25,y:p.height*.5}});await trace.click({position:{x:p.width*.75,y:p.height*.5}});
  await page.locator('#traceDistance').fill('4');await page.locator('#traceOpacity').fill('50');await page.locator('#traceX').fill('1');await page.locator('#traceY').fill('2');
  await expect(page.locator('#traceApply')).toBeEnabled();await qa.shot(locale+'-trace');await page.locator('#traceApply').click();
  await expect.poll(async()=> (await readModel(page)).traces?.length).toBe(1);
  await openProject(page,'traceButton');await page.locator('#traceRemove').click();await expectModel(page,m=>m.traces,[]);
  const count=(await readModel(page)).furniture.length;
  await openProject(page,'versionsButton');await page.locator('#versionName').fill('QA snapshot');await page.locator('#versionSave').click();await expect(page.locator('#versionRows')).toContainText('QA snapshot');await closeDialog(page,'versionsDialog');
  await addFirst(page);await expectModel(page,m=>m.furniture.length,count+1);await dismissInspector(page);
  await openProject(page,'versionsButton');page.once('dialog',d=>d.accept());await page.locator('[data-restore]').first().click();await expectModel(page,m=>m.furniture.length,count);
  await expect(page.locator('[data-restore]')).toHaveCount(2);await qa.shot(locale+'-history');await closeDialog(page,'versionsDialog');
  const before=(await saved(page)).state.projects.length;
  const json=await download(page,'exportButton',info.outputPath(locale+'-backup.json'));expect(JSON.parse(json.toString('utf8'))).toBeTruthy();
  await page.locator('#projectsButton').click();const chooser=page.waitForEvent('filechooser');await page.locator('#importButton').click();await (await chooser).setFiles({name:'qa-backup.json',mimeType:'application/json',buffer:json});
  await expect.poll(async()=> (await saved(page)).state.projects.length).toBe(before+1);await page.reload();await expectModel(page,m=>m.furniture.length,count);
  await qa.shot(locale+'-restored-backup');
 });
}
