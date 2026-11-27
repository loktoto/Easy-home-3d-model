import { test, expect } from '@playwright/test';
const key='easy-home-3d:projects:v1';
const model=page=>page.evaluate(k=>{const s=JSON.parse(localStorage.getItem(k));return s.projects.find(p=>p.id===s.activeId).data},key);
const open=async(page,id)=>{await page.locator('#projectsButton').click();await page.locator('#'+id).click();};
const close=(page,id)=>page.locator('[data-close="'+id+'"]').last().click();
const edit=async(field,value)=>{await field.fill(value);await field.press('Tab');};
const shot=(page,info,name)=>page.screenshot({path:info.outputPath(name+'.png'),fullPage:true});
const price=page=>page.locator('#shoppingRows input').first();
const cost=page=>page.locator('[data-budget-prop="cost"]').first();
const qty=page=>page.locator('[data-budget-prop="qty"]').first();
const savedPrice=async page=>Object.values((await model(page)).shopping?.prices||{})[0];
async function sofa(page){await page.locator('#addFurnitureButton').click();await page.locator('#furnitureCatalog button').first().click();await expect.poll(async()=>(await model(page)).furniture.length).toBe(1);}
async function budget(page){await open(page,'budgetButton');await page.locator('#budgetAdd').click();await expect(cost(page)).toBeVisible();}
async function wizard(page){await page.locator('#buildButton').click();await page.locator('#homeFloors').selectOption('1');await page.locator('#buildHome').click();await expect.poll(async()=>(await model(page)).openings.length).toBeGreaterThan(0);}
test.beforeEach(async({page})=>{await page.goto('/?lang=en');await expect(page.locator('#projectsButton')).toBeVisible();});
test('UAT-031 shopping rejects negative edit without stale rollback',async({page},info)=>{
 await sofa(page);await open(page,'shoppingButton');const p=price(page);await edit(p,'125');await expect.poll(()=>savedPrice(page)).toBe(12500);await edit(p,'-1');await shot(page,info,'negative-shopping');
 await expect(p).toHaveValue('125');expect(await savedPrice(page)).toBe(12500);await close(page,'shoppingDialog');await page.reload();await open(page,'shoppingButton');await expect(price(page)).toHaveValue('125');
});
test('UAT-032 shopping precision stays consistent with canonical cents',async({page},info)=>{
 await sofa(page);await open(page,'shoppingButton');const p=price(page);await edit(p,'125');await expect.poll(()=>savedPrice(page)).toBe(12500);await edit(p,'12.345');await shot(page,info,'fractional-cent');
 await expect.poll(async()=>{const s=await savedPrice(page);const v=await p.inputValue();return (s===12500&&v==='125')||(s===1235&&Number(v)===12.35);}).toBe(true);
 await close(page,'shoppingDialog');await page.reload();await open(page,'shoppingButton');expect(Number(await price(page).inputValue())*100).toBeCloseTo(await savedPrice(page),5);
});
test('UAT-033 budget invalid unit cost restores latest accepted value',async({page},info)=>{
 await budget(page);await edit(cost(page),'200');await expect.poll(async()=>(await model(page)).budget?.rows[0]?.cost).toBe(20000);await edit(cost(page),'-1');await shot(page,info,'negative-cost');await expect(cost(page)).toHaveValue('200');expect((await model(page)).budget.rows[0].cost).toBe(20000);
 await close(page,'budgetDialog');await page.reload();await open(page,'budgetButton');await expect(cost(page)).toHaveValue('200');
});
test('UAT-034 budget invalid quantity restores latest accepted value',async({page},info)=>{
 await budget(page);await edit(qty(page),'3');await expect.poll(async()=>(await model(page)).budget?.rows[0]?.qty).toBe(3);await edit(qty(page),'-1');await shot(page,info,'negative-quantity');await expect(qty(page)).toHaveValue('3');expect((await model(page)).budget.rows[0].qty).toBe(3);
});
test('UAT-035 cancelling currency change preserves priced rows',async({page},info)=>{
 await sofa(page);await open(page,'shoppingButton');await edit(price(page),'100');await expect.poll(()=>savedPrice(page)).toBe(10000);page.once('dialog',d=>d.dismiss());await page.locator('#shoppingCurrency').selectOption('USD');await expect(page.locator('#shoppingCurrency')).toHaveValue('HKD');expect(await savedPrice(page)).toBe(10000);await shot(page,info,'cancel-currency');
});
test('UAT-036 confirming currency change clears furniture and budget prices',async({page},info)=>{
 await sofa(page);await budget(page);await edit(cost(page),'200');await expect.poll(async()=>(await model(page)).budget?.rows[0]?.cost).toBe(20000);await close(page,'budgetDialog');await open(page,'shoppingButton');await edit(price(page),'100');await expect.poll(()=>savedPrice(page)).toBe(10000);page.once('dialog',d=>d.accept());await page.locator('#shoppingCurrency').selectOption('USD');await expect.poll(async()=>(await model(page)).shopping.currency).toBe('USD');expect(await savedPrice(page)).toBeUndefined();expect((await model(page)).budget.rows[0].cost).toBeNull();await shot(page,info,'currency-reset');
});
test('UAT-037 brand save persists while consent resets',async({page},info)=>{
 await open(page,'brandButton');await page.locator('#brandCompany').fill('UAT Studio');await page.locator('#brandTitle').fill('QA Plan');await page.locator('#brandRights').check();await page.locator('#brandSave').click();await expect.poll(async()=>(await model(page)).brand?.company).toBe('UAT Studio');await page.reload();await open(page,'brandButton');await expect(page.locator('#brandCompany')).toHaveValue('UAT Studio');await expect(page.locator('#brandTitle')).toHaveValue('QA Plan');await expect(page.locator('#brandSave')).toBeDisabled();await shot(page,info,'brand-reloaded');
});
test('UAT-038 north direction and legend persist',async({page},info)=>{
 await wizard(page);await open(page,'planStatsButton');await edit(page.locator('#northDegrees'),'270');await expect.poll(async()=>(await model(page)).planMeta?.north).toBe(270);const legend=page.locator('#planLegend');const previous=await legend.isChecked();await legend.setChecked(!previous);await expect.poll(async()=>(await model(page)).planMeta?.legend).toBe(!previous);await close(page,'planStatsDialog');await page.reload();await open(page,'planStatsButton');await expect(page.locator('#northDegrees')).toHaveValue('270');expect(await legend.isChecked()).toBe(!previous);await shot(page,info,'plan-meta-reloaded');
});
test('UAT-039 version restore preserves pre-restore checkpoint',async({page},info)=>{
 await wizard(page);const n=(await model(page)).furniture.length;await open(page,'versionsButton');await page.locator('#versionName').fill('UAT checkpoint');await page.locator('#versionSave').click();await expect(page.locator('#versionRows')).toContainText('UAT checkpoint');await close(page,'versionsDialog');await page.locator('#addFurnitureButton').click();await page.locator('#furnitureCatalog button').first().click();await expect.poll(async()=>(await model(page)).furniture.length).toBe(n+1);await open(page,'versionsButton');page.once('dialog',d=>d.accept());await page.locator('[data-restore]').first().click();await expect.poll(async()=>(await model(page)).furniture.length).toBe(n);await expect(page.locator('[data-restore]')).toHaveCount(2);await shot(page,info,'restored-version');
});
test('UAT-040 opening schedule locates opening inspector',async({page},info)=>{
 await wizard(page);await open(page,'planStatsButton');await page.locator('#openingSchedule [data-opening]').first().click();await expect(page.locator('#planStatsDialog')).not.toBeVisible();await expect(page.locator('#view2d')).toHaveAttribute('aria-pressed','true');await expect(page.locator('#inspectorContent input').first()).toBeVisible();await shot(page,info,'opening-located');
});
