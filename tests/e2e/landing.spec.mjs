import { test, expect } from '@playwright/test';
for (const [url,lang] of [['/welcome/','en'],['/welcome/zh-hant/','zh-Hant'],['/welcome/zh-hans/','zh-Hans']]) {
 test('localized landing '+lang, async ({page})=>{
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(url);await expect(page.locator('html')).toHaveAttribute('lang',lang);
  await expect(page.locator('h1')).toBeVisible();await expect(page.locator('link[rel=alternate][hreflang]')).toHaveCount(4);
  await expect(page.locator('.cta')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBe(true);
  await page.locator('.cta').click();await expect(page.locator('#stage')).toBeVisible();await expect(page.locator('#startTip')).toBeVisible();expect(errors).toEqual([]);
 });
}
 test('language navigation preserves direct editor entry',async({page})=>{await page.goto('/welcome/');await page.locator('nav a[lang="zh-Hant"]').click();await expect(page.locator('html')).toHaveAttribute('lang','zh-Hant');await page.locator('nav a[lang="zh-Hans"]').click();await expect(page.locator('html')).toHaveAttribute('lang','zh-Hans');await page.locator('nav a[lang="en"]').click();await expect(page.locator('html')).toHaveAttribute('lang','en');});
