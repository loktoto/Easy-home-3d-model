import {test,expect} from '@playwright/test';
test('packaged site has public revision, no backend source, and working editor',async({page,request},info)=>{test.skip(!process.env.TEST_PACKAGED_SITE,'Run against allow-listed release artifact');const r=await request.get('/version.json');expect(r.ok()).toBe(true);const v=await r.json();expect(v.commit).toMatch(/^[a-f0-9]{40}$/);expect(v.cloud).toBe('disabled');expect((await request.get('/.git/config')).status()).toBe(404);expect((await request.get('/backend/001-cloud.sql')).status()).toBe(404);await page.goto('/welcome/');await expect(page.locator('body')).toContainText('Easy3DHome');await page.screenshot({path:info.outputPath('release-welcome.png')});await page.goto('/');await expect(page.locator('#startTip')).toBeVisible();await page.locator('#addFurnitureButton').click();await page.locator('#furnitureCatalog button').first().click();await expect(page.locator('#saveStatus')).toContainText('本機');await page.screenshot({path:info.outputPath('release-editor.png')});await page.goto('/easy-home-3d-standalone.html');await expect(page.locator('#projectsButton')).toBeVisible();await page.screenshot({path:info.outputPath('release-offline.png')});});

test('all nine packaged landing pages have consistent social cards and canonical routes',async({page,request},info)=>{
 test.skip(!process.env.TEST_PACKAGED_SITE,'Run against allow-listed release artifact');
 const paths=['','zh-hant/','zh-hans/','es/','ja/','de/','fr/','ko/','pt/'];
 const origin='https://easy3dhome.pages.dev';
 const image=origin+'/welcome/social-card.png';
 const res=await request.get('/welcome/social-card.png');expect(res.ok()).toBeTruthy();expect(res.headers()['content-type']).toContain('image/png');
 const body=await res.body();expect(body.subarray(0,8).toString('hex')).toBe('89504e470d0a1a0a');expect(body.readUInt32BE(16)).toBe(1200);expect(body.readUInt32BE(20)).toBe(630);
 const sitemap=await (await request.get('/sitemap.xml')).text();
 for(const path of paths){
  const canonical=origin+'/welcome/'+path;await page.goto('/welcome/'+path);
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href',canonical);
  await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content',canonical);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content',image);
  await expect(page.locator('meta[property="og:image:width"]')).toHaveAttribute('content','1200');
  await expect(page.locator('meta[property="og:image:height"]')).toHaveAttribute('content','630');
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content','summary_large_image');
  await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content',image);
  await expect(page.locator('link[rel=alternate][hreflang]')).toHaveCount(10);expect(sitemap).toContain(canonical);
  await expect(page.locator('.cta')).toBeVisible();
  await page.screenshot({path:info.outputPath('social-landing-'+(path.replace('/','')||'en')+'.png'),fullPage:true});
 }
 await page.goto('/welcome/social-card.png');await expect(page.locator('img')).toBeVisible();
 expect(await page.locator('img').evaluate(img=>[img.naturalWidth,img.naturalHeight])).toEqual([1200,630]);
 await page.screenshot({path:info.outputPath('social-card.png')});
});
