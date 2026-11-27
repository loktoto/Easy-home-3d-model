import {test,expect} from '@playwright/test';import {readFile} from 'node:fs/promises';
test('high resolution 2D and 3D PNG exports have expected dimensions',async({page},info)=>{
 await page.goto('/');await page.locator('#startBuild').click();await page.locator('#buildHome').click();
 for(const mode of ['2d','3d']){
  await page.locator('#view'+mode).click();await page.locator('#projectsButton').click();await page.locator('#exportPngButton').click();await page.locator('#pngSize').selectOption('1600');await page.screenshot({path:info.outputPath('png-'+mode+'.png')});
  const download=page.waitForEvent('download');await page.locator('#downloadPng').click();const d=await download;const bytes=await readFile(await d.path());expect(bytes.subarray(0,8).toString('hex')).toBe('89504e470d0a1a0a');expect(Math.max(bytes.readUInt32BE(16),bytes.readUInt32BE(20))).toBe(1600);expect(d.suggestedFilename()).toContain(mode);await d.saveAs(info.outputPath('export-'+mode+'.png'));await page.locator('[data-close=pngDialog]').last().click();
 }
});