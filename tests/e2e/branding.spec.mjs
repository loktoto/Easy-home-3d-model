import { test, expect } from '@playwright/test';

const source = 'https://github.com/loktoto/Easy3DHomeModel';
for (const path of ['/','/easy-home-3d-standalone.html']) {
  test('Easy3DHome identity and repository link: ' + path, async ({ page }, testInfo) => {
    await page.goto(path);
    await expect(page).toHaveTitle(/^Easy3DHome/);
    await expect(page.locator('h1')).toHaveText('Easy3DHome');
    await expect(page.locator('a.source-link')).toHaveAttribute('href', source);
    await expect(page.locator('#startRoom')).toBeVisible();
    await page.screenshot({path: testInfo.outputPath(path === '/' ? 'editor-brand.png' : 'standalone-brand.png'), fullPage: true});
  });
}
for (const path of ['/welcome/','/welcome/zh-hant/','/welcome/zh-hans/']) {
  test('Easy3DHome localized landing: ' + path, async ({ page }, testInfo) => {
    await page.goto(path);
    await expect(page).toHaveTitle(/^Easy3DHome/);
    await expect(page.locator('a[href="'+source+'"]').first()).toBeVisible();
    await page.screenshot({path: testInfo.outputPath('landing-brand.png'), fullPage: true});
  });
}
