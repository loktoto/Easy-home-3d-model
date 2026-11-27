import {test,expect} from '@playwright/test';
import {readFile} from 'node:fs/promises';
const locales=['zh-Hant','zh-Hans','en','es','ja','de','fr','ko','pt'];
async function state(page){return page.evaluate(()=>JSON.parse(localStorage.getItem('easy-home-3d:projects:v1')));}
async function model(page){const s=await state(page);return s.projects.find(p=>p.id===s.activeId).data;}
async function open(page,id){await page.locator('#projectsButton').click();await page.locator('#'+id).click();}
async function close(page,id,which='top'){const b=page.locator('[data-close='+id+']');await (which==='top'?b.first():b.last()).click();await expect(page.locator('#'+id)).not.toBeVisible();}
async function edit(page,id,v){await page.locator(id).fill(String(v));await page.locator(id).press('Tab');}
async function dismissInspector(page){if(await page.locator('#closeInspector').isVisible()&&await page.locator('#inspector').evaluate(e=>e.classList.contains('open')))await page.locator('#closeInspector').click();}
for(const locale of locales){
 test('dynamic project actions, cancellation and search '+locale,async({page},info)=>{
  test.setTimeout(90000);await page.goto('/?lang='+locale);
  await expect(page.locator('html')).toHaveAttribute('lang',locale);
  const initial=await state(page);const initialId=initial.activeId;
  await page.locator('#startWall').click();await expect(page.locator('[data-tool=wall]')).toHaveAttribute('aria-pressed','true');
  await page.locator('#startRoom').click();await expect(page.locator('[data-tool=room]')).toHaveAttribute('aria-pressed','true');
  page.once('dialog',d=>d.dismiss());await page.locator('#loadDemo').click();expect((await model(page)).walls).toHaveLength(0);
  page.once('dialog',d=>d.accept());await page.locator('#loadDemo').click();await expect.poll(async()=> (await model(page)).walls.length).toBeGreaterThan(0);
  await open(page,'newDemo');await expect.poll(async()=> (await state(page)).projects.length).toBe(initial.projects.length+1);
  await edit(page,'#projectName','QA demo '+locale);await expect.poll(async()=>{const s=await state(page);return s.projects.find(p=>p.id===s.activeId)?.name;}).toBe('QA demo '+locale);
  const demoId=(await state(page)).activeId;
  await open(page,'clientButton');await page.locator('#clientName').fill('QA client '+locale);
  await page.locator('#clientStatus').selectOption('completed');await page.locator('#clientSave').click();
  await expect.poll(async()=> (await model(page)).client.status).toBe('completed');
  await open(page,'newBlank');await expect.poll(async()=> (await state(page)).projects.length).toBe(initial.projects.length+2);
  await page.locator('#projectsButton').click();
  for(const [filter,count] of [['draft',2],['active',0],['completed',1],['archived',0],['',3]]){
   await page.locator('#projectStatus').selectOption(filter);await expect(page.locator('#projectList .project-item')).toHaveCount(count);
  }
  await page.locator('#projectSearch').fill('QA client '+locale);
  const row=page.locator('#projectList .project-item');await expect(row).toHaveCount(1);
  await row.locator('button:not(.danger)').click();expect((await state(page)).activeId).toBe(demoId);
  await page.locator('#projectsButton').click();await page.locator('#projectSearch').fill('QA demo '+locale);
  page.once('dialog',d=>d.dismiss());await row.locator('button.danger').click();await expect(row).toHaveCount(1);
  await page.screenshot({path:info.outputPath(locale+'-project-cancel.png')});
  page.once('dialog',d=>d.accept());await row.locator('button.danger').click();await expect(row).toHaveCount(0);
  const after=await state(page);expect(after.projects.some(p=>p.id===demoId)).toBe(false);expect(after.activeId).toBe(initialId);
  await page.locator('#projectSearch').fill('');await close(page,'projectsDialog');
  await page.reload();expect((await state(page)).projects.length).toBe(initial.projects.length+1);
 });
 test('dynamic budget removal, currency confirmation and brand logo removal '+locale,async({page},info)=>{
  test.setTimeout(90000);await page.goto('/?lang='+locale);
  await page.locator('#addFurnitureButton').click();await page.locator('#furnitureCatalog button').first().click();await dismissInspector(page);
  await open(page,'shoppingButton');await edit(page,'#shoppingRows .report-row input',100);
  await expect.poll(async()=>Object.values((await model(page)).shopping.prices)).toContain(10000);
  page.once('dialog',d=>d.dismiss());await page.locator('#shoppingCurrency').selectOption('USD');await expect(page.locator('#shoppingCurrency')).toHaveValue('HKD');
  expect(Object.values((await model(page)).shopping.prices)).toContain(10000);
  page.once('dialog',d=>d.accept());await page.locator('#shoppingCurrency').selectOption('USD');await expect.poll(async()=> (await model(page)).shopping.currency).toBe('USD');
  expect((await model(page)).shopping.prices).toEqual({});
  for(const cur of ['EUR','GBP','CNY','TWD','JPY','HKD','USD']){
   await page.locator('#shoppingCurrency').selectOption(cur);await expect.poll(async()=> (await model(page)).shopping.currency).toBe(cur);
  }
  await page.screenshot({path:info.outputPath(locale+'-currency-options.png')});await close(page,'shoppingDialog','bottom');
  await open(page,'budgetButton');await page.locator('#budgetAdd').click();await edit(page,'[data-budget-prop=name]','QA work');await edit(page,'[data-budget-prop=cost]',100);
  await expect.poll(async()=> (await model(page)).budget.rows.length).toBe(1);
  await page.locator('#budgetRows button.danger').click();await expect.poll(async()=> (await model(page)).budget.rows.length).toBe(0);
  await page.screenshot({path:info.outputPath(locale+'-budget-remove.png')});await close(page,'budgetDialog','bottom');
  await open(page,'brandButton');
  const png=await page.evaluate(()=>{const c=document.createElement('canvas');c.width=64;c.height=32;const x=c.getContext('2d');x.fillStyle='#11685a';x.fillRect(0,0,64,32);return c.toDataURL('image/png').split(',')[1]});
  await page.locator('#brandLogo').setInputFiles({name:'qa.png',mimeType:'image/png',buffer:Buffer.from(png,'base64')});
  await expect(page.locator('#brandLogoPreview')).toBeVisible();await page.locator('#brandRemoveLogo').click();await expect(page.locator('#brandLogoPreview')).toBeHidden();
  await page.locator('#brandRights').check();await page.locator('#brandSave').click();
  await expect.poll(async()=> (await model(page)).brand?.logo||'').toBe('');
  await open(page,'brandButton');await expect(page.locator('#brandLogoPreview')).toBeHidden();await page.screenshot({path:info.outputPath(locale+'-brand-remove.png')});await close(page,'brandDialog','bottom');
 });
}
test('actual locale dropdown cycles all languages without project data loss',async({page},info)=>{
 test.setTimeout(90000);await page.goto('/?lang=zh-Hant');
 await page.locator('#addFurnitureButton').click();await page.locator('#furnitureCatalog button').first().click();await dismissInspector(page);
 await expect.poll(async()=> (await model(page)).furniture.length).toBe(1);
 const before=await model(page);
 for(const locale of ['en','zh-Hans','es','ja','de','fr','ko','pt','zh-Hant']){
  await page.locator('#projectsButton').click();await page.locator('#localeSelect').selectOption(locale);
  await expect(page.locator('html')).toHaveAttribute('lang',locale);
  await expect(page.locator('#projectsDialog')).not.toBeVisible();expect(await model(page)).toEqual(before);
  await page.screenshot({path:info.outputPath('actual-switch-'+locale+'.png')});
 }
});
