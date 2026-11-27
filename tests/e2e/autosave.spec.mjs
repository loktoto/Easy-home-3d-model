import {test,expect} from '@playwright/test';
test('save failure is visible and recovery persists edits',async({page},info)=>{
 await page.addInitScript(()=>{window.failSave=true;const original=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k==='easy-home-3d:projects:v1'&&window.failSave)throw new Error('test quota');return original.call(this,k,v);};});
 await page.goto('/');await expect(page.locator('#saveStatus')).toBeVisible();await expect(page.locator('#saveStatus')).toHaveClass(/error/);await page.screenshot({path:info.outputPath('save-error.png')});
 await page.evaluate(()=>window.failSave=false);await page.locator('#projectName').fill('QA recovery');await page.locator('#projectName').press('Tab');await expect(page.locator('#saveStatus')).not.toHaveClass(/error/);await expect(page.locator('#saveStatus')).toContainText('本機已儲存');
 expect(await page.evaluate(()=>JSON.parse(localStorage.getItem('easy-home-3d:projects:v1')).projects[0].name)).toBe('QA recovery');await page.reload();await expect(page.locator('#projectName')).toHaveValue('QA recovery');
});
