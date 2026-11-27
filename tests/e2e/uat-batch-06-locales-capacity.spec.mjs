import { test, expect } from '@playwright/test';
const key='easy-home-3d:projects:v1';
const state=page=>page.evaluate(k=>JSON.parse(localStorage.getItem(k)),key);
const shot=(page,info,name)=>page.screenshot({path:info.outputPath(name+'.png'),fullPage:true});
const locales=['zh-Hant','en','zh-Hans','es','ja','de','fr','ko','pt'];
for(const [i,locale] of locales.entries()){
 test('UAT-'+(51+i)+' locale '+locale+' switch preserves project and opens help',async({page},info)=>{
  await page.goto('/?lang='+(locale==='en'?'zh-Hant':'en'));
  await page.locator('#projectName').fill('UAT multilingual project');await page.locator('#projectName').press('Tab');
  await expect.poll(async()=>{const s=await state(page);return s.projects.find(p=>p.id===s.activeId).name;}).toBe('UAT multilingual project');
  await page.locator('#projectsButton').click();await page.locator('#localeSelect').selectOption(locale);
  await expect(page.locator('html')).toHaveAttribute('lang',locale);await expect(page.locator('#projectName')).toHaveValue('UAT multilingual project');await expect(page.locator('#projectsButton')).not.toHaveText('');
  await shot(page,info,'locale-editor-'+locale);
  if(await page.locator('#helpButton').isVisible()){await page.locator('#helpButton').click();}else{await page.locator('#projectsButton').click();await page.locator('#projectHelpButton').click();}
  await expect(page.locator('#helpDialog')).toBeVisible();await shot(page,info,'locale-help-'+locale);
 });
}
test('UAT-060 furniture capacity cannot erase project or original object IDs on reload',async({page},info)=>{
 await page.goto('/?lang=en');await page.locator('#addFurnitureButton').click();await page.locator('#furnitureCatalog button').first().click();
 await expect.poll(async()=>{const s=await state(page);return s.projects[0].data.furniture.length;}).toBe(1);
 const s=await state(page),p=s.projects[0],f=p.data.furniture[0],keep=structuredClone(p);
 keep.id='uat-keep';keep.name='UAT control';keep.data.name=keep.name;keep.data.furniture=[];
 p.id='uat-500';p.name='UAT 500 furniture';p.data.name=p.name;p.data.furniture=Array.from({length:500},(_,i)=>({...structuredClone(f),id:'uat-f-'+i,x:(i%25)*2.5,y:Math.floor(i/25)*2}));s.projects=[p,keep];s.activeId=p.id;
 await page.addInitScript(({key,raw})=>{if(!sessionStorage.getItem('uat-capacity-seeded')){sessionStorage.setItem('uat-capacity-seeded','1');localStorage.setItem(key,raw);}}, {key,raw:JSON.stringify(s)});
 await page.reload();await expect(page.locator('#projectName')).toHaveValue(p.name);await shot(page,info,'500-before');
 page.on('dialog',d=>d.accept());
 const add=page.locator('#addFurnitureButton');if(await add.isEnabled()){await add.click();const item=page.locator('#furnitureCatalog button').first();if(await item.isVisible()&&await item.isEnabled())await item.click();}
 await page.waitForTimeout(750);const before=await state(page);await shot(page,info,'after-add-at-capacity');await page.reload();await shot(page,info,'after-reload');const after=await state(page);
 const original=after.projects.find(x=>x.id===p.id);expect(original,'original project must survive').toBeDefined();expect(after.projects.some(x=>x.id===keep.id)).toBe(true);
 expect(original.data.furniture.map(x=>x.id)).toEqual(before.projects.find(x=>x.id===p.id).data.furniture.map(x=>x.id));
 expect(p.data.furniture.every(x=>original.data.furniture.some(y=>x.id===y.id))).toBe(true);
});
