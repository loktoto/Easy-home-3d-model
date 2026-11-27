import { test, expect } from '@playwright/test';

const key = 'easy-home-3d:projects:v1';
const state = page => page.evaluate(k => JSON.parse(localStorage.getItem(k)), key);
// Seed on the next document, after the previous document's beforeunload save.
const seedNextLoad = (page, raw) => page.addInitScript(({key,raw})=>{if(!sessionStorage.getItem('uat-seeded')){sessionStorage.setItem('uat-seeded','1');localStorage.setItem(key,raw);}}, {key,raw});
const projectFixture = (s,count) => {const p=s.projects[0];return {...s,activeId:'uat-0',projects:Array.from({length:count},(_,i)=>({...structuredClone(p),id:'uat-'+i,name:'UAT '+i,data:{...structuredClone(p.data),name:'UAT '+i}}))};};
const model = async page => { const s = await state(page); return s.projects.find(p => p.id === s.activeId).data; };
const shot = (page, info, name) => page.screenshot({path: info.outputPath(name + '.png'), fullPage: true});
const open = async (page, id) => { await page.locator('#projectsButton').click(); await page.locator('#'+id).click(); };
const close = (page, id) => page.locator('[data-close="'+id+'"]').last().click();
async function nameProject(page,name){
  await page.locator('#projectName').fill(name); await page.locator('#projectName').press('Tab');
  await expect.poll(async()=>{const s=await state(page);return s.projects.find(p=>p.id===s.activeId).name;}).toBe(name);
}
test.beforeEach(async ({page})=>{await page.goto('/?lang=en');await expect(page.locator('#projectsButton')).toBeVisible();});

test('UAT-001 wizard rejects boundaries, then recovers', async({page},info)=>{
 await page.locator('#buildButton').click();
 for(const value of ['3.99','24.01','']){await page.locator('#homeWidth').fill(value);await expect(page.locator('#buildHome')).toBeDisabled();await shot(page,info,'invalid-width-'+(value||'empty'));}
 await page.locator('#homeWidth').fill('8');await page.locator('#homeDepth').fill('6');await page.locator('#homeFloors').selectOption('1');
 await expect(page.locator('#buildHome')).toBeEnabled();await page.locator('#buildHome').click();
 await expect.poll(async()=> (await model(page)).walls.length).toBeGreaterThan(0);await shot(page,info,'valid-home');
});

test('UAT-002 malformed JSON does not change project',async({page},info)=>{
 await nameProject(page,'UAT original');const before=await state(page);
 await page.locator('#projectsButton').click();
 const dialog=page.waitForEvent('dialog');const upload=page.locator('#importFile').setInputFiles({name:'malformed.json',mimeType:'application/json',buffer:Buffer.from('{broken')});
 const alert=await dialog;expect(alert.type()).toBe('alert');await alert.accept();await upload;
 await expect(page.locator('#projectsDialog')).toBeVisible();expect(await state(page)).toEqual(before);await shot(page,info,'malformed-rejected');
});

test('UAT-003 oversized JSON rejects without altering model',async({page},info)=>{
 const before=await state(page);await page.locator('#projectsButton').click();
 const dialog=page.waitForEvent('dialog');const upload=page.locator('#importFile').setInputFiles({name:'oversized.json',mimeType:'application/json',buffer:Buffer.alloc(3000001,32)});
 const alert=await dialog;expect(alert.type()).toBe('alert');expect(alert.message()).toMatch(/3\s*MB/i);await alert.accept();await upload;
 expect(await state(page)).toEqual(before);await shot(page,info,'oversize-rejected');
});

test('UAT-004 maximum five floors and cancellation',async({page},info)=>{
 await expect(page.locator('#removeFloor')).toBeDisabled();
 for(let n=2;n<=5;n++){await page.locator('#addFloor').click();await expect(page.locator('[data-floor]')).toHaveCount(n);}
 await expect(page.locator('#addFloor')).toBeDisabled();await expect.poll(async()=> (await model(page)).floorCount).toBe(5);await shot(page,info,'five-floors');
 page.once('dialog',d=>d.dismiss());await page.locator('#removeFloor').click();await expect(page.locator('[data-floor]')).toHaveCount(5);
 page.once('dialog',d=>d.accept());await page.locator('#removeFloor').click();await expect(page.locator('[data-floor]')).toHaveCount(4);
 await page.locator('#undoButton').click();await expect(page.locator('[data-floor]')).toHaveCount(5);await shot(page,info,'floor-undo');
});

test('UAT-005 last project cannot be deleted and cancel is nondestructive',async({page},info)=>{
 await nameProject(page,'UAT original');await page.locator('#projectsButton').click();await expect(page.locator('#projectList .danger')).toBeDisabled();
 await page.locator('#newBlank').click();await nameProject(page,'UAT second');
 await page.locator('#projectsButton').click();const row=page.locator('#projectList .project-item').filter({hasText:'UAT original'});
 page.once('dialog',d=>d.dismiss());await row.locator('.danger').click();await expect(row).toHaveCount(1);await shot(page,info,'delete-cancelled');
 page.once('dialog',d=>d.accept());await row.locator('.danger').click();await expect(row).toHaveCount(0);await expect(page.locator('#projectList .danger')).toBeDisabled();
 await close(page,'projectsDialog');await page.reload();await expect(page.locator('#projectName')).toHaveValue('UAT second');await shot(page,info,'remaining-project');
});

test('UAT-006 HTML-like project name remains inert and persists',async({page},info)=>{
 const value='<img src=x onerror=window.uatXss=1>';await nameProject(page,value);
 await page.locator('#projectsButton').click();await expect(page.locator('#projectList strong')).toHaveText(value);
 expect(await page.locator('#projectList img').count()).toBe(0);expect(await page.evaluate(()=>window.uatXss)).toBeUndefined();
 await shot(page,info,'literal-name');await close(page,'projectsDialog');await page.reload();await expect(page.locator('#projectName')).toHaveValue(value);
});

test('UAT-007 locale switch must not lose unsaved work on quota failure',async({page},info)=>{
 await page.evaluate(()=>{const old=Storage.prototype.setItem;window.uatFail=true;Storage.prototype.setItem=function(k,v){if(k==='easy-home-3d:projects:v1'&&window.uatFail)throw Error('UAT quota');return old.call(this,k,v);};});
 await page.locator('#projectName').fill('UAT unsaved');await page.locator('#projectName').press('Tab');await expect(page.locator('#saveStatus')).toHaveClass(/error/);
 await page.locator('#projectsButton').click();await page.locator('#localeSelect').selectOption('ja');
 await expect(page.locator('html')).toHaveAttribute('lang','en');await expect(page.locator('#localeSelect')).toHaveValue('en');await expect(page.locator('#projectName')).toHaveValue('UAT unsaved');await shot(page,info,'locale-blocked');
 await page.evaluate(()=>window.uatFail=false);await page.locator('#localeSelect').selectOption('ja');await expect(page.locator('html')).toHaveAttribute('lang','ja');await expect(page.locator('#projectName')).toHaveValue('UAT unsaved');await shot(page,info,'locale-recovered');
});

test('UAT-008 invalid contingency must not leave misleading visible value',async({page},info)=>{
 await open(page,'budgetButton');const field=page.locator('#budgetContingency');await field.fill('10');await field.press('Tab');
 await expect.poll(async()=> (await model(page)).budget.contingency).toBe(10);const before=await page.locator('#budgetSummary').innerText();
 for(const [i,value] of ['101','-1','','1.5'].entries()){
  await field.fill(value);await field.press('Tab');await expect(field).toHaveValue('10');await expect(page.locator('#budgetContingencyStatus')).toHaveText(/previous value restored/i);
  expect((await model(page)).budget.contingency).toBe(10);expect(await page.locator('#budgetSummary').innerText()).toBe(before);await shot(page,info,'invalid-contingency-'+i);
 }
 await field.fill('20');await field.press('Tab');await expect.poll(async()=> (await model(page)).budget.contingency).toBe(20);await expect(page.locator('#budgetContingencyStatus')).toBeEmpty();await close(page,'budgetDialog');await page.reload();await open(page,'budgetButton');await expect(field).toHaveValue('20');await shot(page,info,'valid-contingency-reloaded');
});

test('UAT-009 project capacity must never erase existing data on reload',async({page},info)=>{
 await nameProject(page,'UAT original');
 await seedNextLoad(page,JSON.stringify(projectFixture(await state(page),100)));
 await page.reload();await expect(page.locator('#projectName')).toHaveValue('UAT 0');await page.locator('#projectsButton').click();await expect(page.locator('#projectList .project-item')).toHaveCount(100);
 await shot(page,info,'before-capacity');const add=page.locator('#newBlank');
 if(await add.isEnabled()){page.once('dialog',d=>d.accept());await add.click();}else{await close(page,'projectsDialog');}
 const before=await state(page);expect(before.projects.length).toBe(100);await shot(page,info,'before-reload');
 await page.reload();await shot(page,info,'after-reload');const after=await state(page);
 expect(after.projects.map(p=>p.id)).toEqual(before.projects.map(p=>p.id));
});

test('UAT-010 explicit clear controls keep user project after reload',async({page},info)=>{
 await nameProject(page,'UAT controls');await page.locator('#snapButton').click();await expect(page.locator('#snapButton')).toHaveAttribute('aria-pressed','false');
 await page.locator('#dimsButton').click();await expect(page.locator('#dimsButton')).toHaveAttribute('aria-pressed','false');
 await page.locator('#zoomIn').click();await page.locator('#zoomOut').click();await page.locator('#fitBottom').click();await page.locator('#fitButton').click();
 await page.locator('#view3d').click();await expect(page.locator('#view3d')).toHaveAttribute('aria-pressed','true');await shot(page,info,'3d-empty');
 await page.locator('#view2d').click();await expect(page.locator('#view2d')).toHaveAttribute('aria-pressed','true');await page.locator('#helpButton').click();await expect(page.locator('#helpDialog')).toBeVisible();await close(page,'helpDialog');
 await page.reload();await expect(page.locator('#projectName')).toHaveValue('UAT controls');await shot(page,info,'controls-reloaded');
});


test('UAT-009a legacy 101-project store retains every project on reload',async({page},info)=>{
 const fixture=projectFixture(await state(page),101);await seedNextLoad(page,JSON.stringify(fixture));await page.reload();await expect(page.locator('#projectName')).toHaveValue('UAT 0');
 expect((await state(page)).projects.map(p=>p.id)).toEqual(fixture.projects.map(p=>p.id));await page.locator('#projectsButton').click();await expect(page.locator('#projectList .project-item')).toHaveCount(101);await shot(page,info,'legacy-101-preserved');
 await page.reload();expect((await state(page)).projects.map(p=>p.id)).toEqual(fixture.projects.map(p=>p.id));
});

test('UAT-009b unreadable storage is never overwritten and offers raw backup',async({page},info)=>{
 const raw='{unreadable-user-storage';await seedNextLoad(page,raw);await page.reload();await expect(page.locator('#saveStatus')).toHaveClass(/error/);
 await page.locator('#projectName').fill('Recovery session');await page.locator('#projectName').press('Tab');await expect(page.locator('#saveStatus')).toHaveClass(/error/);
 expect(await page.evaluate(k=>localStorage.getItem(k),key)).toBe(raw);await page.locator('#projectsButton').click();const button=page.locator('#recoveryBackup');await expect(button).toBeVisible();await shot(page,info,'recovery-download');
 const download=page.waitForEvent('download');await button.click();expect((await download).suggestedFilename()).toBe('easy3dhome-local-recovery.json');await page.reload();expect(await page.evaluate(k=>localStorage.getItem(k),key)).toBe(raw);
});
