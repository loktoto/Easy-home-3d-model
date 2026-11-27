import {test,expect} from '@playwright/test';
const url=process.env.EASY3D_SUPABASE_URL,key=process.env.EASY3D_SUPABASE_KEY;
const locales=['zh-Hant','zh-Hans','en','es','ja','de','fr','ko','pt'];
async function openCloud(page){await page.locator('#projectsButton').click();await page.locator('#cloudButton').click();await expect(page.locator('#cloudPush')).toBeEnabled();}
async function close(page,id,last=false){const b=page.locator('[data-close='+id+']');await (last?b.last():b.first()).click();await expect(page.locator('#'+id)).not.toBeVisible();}
for(const locale of locales)test('real cloud dynamic controls and six invite options '+locale,async({page},info)=>{
 test.skip(!url||!key,'Requires isolated local Supabase stack');test.setTimeout(120000);
 await page.addInitScript(({url,key})=>window.Easy3DHomeCloudConfig={url,key},{url,key});
 await page.goto('/?lang='+locale);await expect(page.locator('html')).toHaveAttribute('lang',locale);
 await page.locator('#projectsButton').click();await page.locator('#cloudButton').click();
 const email='qa-'+locale.toLowerCase()+'-'+Date.now()+'-'+Math.random().toString(36).slice(2)+'@example.com',password='QA-pass-2026-Long';
 const auth=async signup=>{await page.locator('#cloudEmail').fill(email);await page.locator('#cloudPassword').fill(password);await page.locator(signup?'#cloudSignup':'#cloudLogin').click();await expect(page.locator('#cloudWorkspace')).toBeVisible({timeout:20000});await expect(page.locator('#cloudPush')).toBeEnabled();};
 await auth(true);await page.locator('#cloudPush').click();await expect(page.locator('[data-cloud-pull]')).toHaveCount(1);
 await page.locator('#cloudRefresh').click();await expect(page.locator('#cloudPush')).toBeEnabled();await expect(page.locator('[data-cloud-pull]')).toHaveCount(1);
 const row=(await page.evaluate(()=>Easy3DHomeCloud.list()))[0];
 const local=await page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('easy-home-3d:projects:v1'));return s.projects.find(p=>p.id===s.activeId).data});
 await page.locator('#cloudLogout').click();await expect(page.locator('#cloudAuth')).toBeVisible();await auth(false);await expect(page.locator('[data-cloud-pull]')).toHaveCount(1);
 await page.locator('[data-cloud-history]').click();await expect(page.locator('[data-cloud-restore="1"]')).toBeDisabled();
 await page.locator('[data-compare-revision="1"]').click();await expect(page.locator('#cloudHistoryCompare')).toContainText('0');
 await page.screenshot({path:info.outputPath(locale+'-cloud-history.png')});await close(page,'cloudHistoryDialog',true);
 await openCloud(page);await page.locator('[data-cloud-share]').click();await expect(page.locator('#shareCreate')).toBeEnabled();
 for(const role of ['viewer','editor'])for(const days of ['1','7','30']){
  await page.locator('#shareRole').selectOption(role);await page.locator('#shareDays').selectOption(days);
  await page.locator('#shareCreate').click();await expect(page.locator('#shareCreate')).toBeEnabled();await expect(page.locator('#shareStatus')).toHaveText('✓');
  expect(await page.locator('#shareLink').inputValue()).toMatch(/#share=[a-f0-9]{64}$/);
  const invites=await page.evaluate(async r=>(await Easy3DHomeCloud.invites(r.owner,r.id)).map(v=>({role:v.role,expiry:v.expires_at,claimed:v.claimed_at})),row);
  expect(invites).toHaveLength(1);expect(invites[0].role).toBe(role);expect(invites[0].claimed).toBeNull();
  expect(Math.abs(Date.parse(invites[0].expiry)-Date.now()-Number(days)*86400000)).toBeLessThan(60000);
  await page.screenshot({path:info.outputPath(locale+'-invite-'+role+'-'+days+'.png'),mask:[page.locator('#shareLink')]});
  await page.locator('#shareRows .project-item button').click();await expect(page.locator('#shareRows .project-item')).toHaveCount(0);await expect(page.locator('#shareCreate')).toBeEnabled();
  expect(await page.evaluate(async r=>(await Easy3DHomeCloud.invites(r.owner,r.id)).length,row)).toBe(0);
 }
 await close(page,'shareDialog',true);await openCloud(page);
 page.once('dialog',d=>d.dismiss());await page.locator('[data-cloud-delete]').click();await expect(page.locator('[data-cloud-delete]')).toHaveCount(1);
 page.once('dialog',d=>d.accept());await page.locator('[data-cloud-delete]').click();await expect(page.locator('[data-cloud-delete]')).toHaveCount(0);
 await expect(page.locator('#cloudPush')).toBeEnabled();expect(await page.evaluate(()=>Easy3DHomeCloud.list())).toEqual([]);
 const after=await page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('easy-home-3d:projects:v1'));return {data:s.projects.find(p=>p.id===s.activeId).data,ref:s.projects.find(p=>p.id===s.activeId).cloudRef}});
 expect(after.data).toEqual(local);expect(after.ref).toBeNull();
 await page.screenshot({path:info.outputPath(locale+'-cloud-deleted-local-preserved.png'),mask:[page.locator('#cloudAccount')]});
 await close(page,'cloudDialog',true);
});
