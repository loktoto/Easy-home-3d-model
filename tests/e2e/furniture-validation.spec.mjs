import {test,expect} from '@playwright/test';
test('furniture dimensions reject out-of-range values and survive reload',async({page},info)=>{
 await page.goto('/');await page.locator('#addFurnitureButton').click();await page.locator('#furnitureCatalog button').filter({hasText:'梳化'}).click();
 const h=page.locator('#prop-h');await h.fill('1.25');await h.press('Tab');await expect(page.locator('#saveStatus')).toContainText('本機已儲存');await expect(h).toHaveValue('1.25');
 await h.fill('7');await h.press('Tab');await expect(h).toHaveValue('1.25');await expect(page.locator('#toast')).toContainText('尺寸必須');
 await page.locator('#prop-d').fill('0.01');await page.locator('#prop-d').press('Tab');await expect(page.locator('#toast')).toContainText('尺寸必須');
 await page.locator('[data-act=rotate]').click();await page.locator('[data-act=lock]').click();await expect(page.locator('#saveStatus')).toContainText('本機已儲存');
 const get=()=>page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('easy-home-3d:projects:v1'));return s.projects.find(x=>x.id===s.activeId).data.furniture[0]});const before=await get();expect(before.h).toBe(1.25);expect(before.locked).toBe(true);expect(before.rotation).toBeCloseTo(Math.PI/2,5);await page.screenshot({path:info.outputPath('furniture-properties.png')});await page.reload();expect(await get()).toEqual(before);
});
