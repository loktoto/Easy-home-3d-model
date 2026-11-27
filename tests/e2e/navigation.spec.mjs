import {test,expect} from '@playwright/test';
test('2D and 3D remain reachable on a five-floor project and preserve plan',async({page},info)=>{
 await page.goto('/');await page.locator('#startBuild').click();await page.locator('#buildHome').click();
 for(let i=0;i<3;i++)await page.locator('#addFloor').click();
 await expect(page.locator('.floor-tab')).toHaveCount(5);
 const before=await page.locator('#view2d').boundingBox();const before3=await page.locator('#view3d').boundingBox();
 await page.locator('.floor-tab').last().scrollIntoViewIfNeeded();await page.locator('.floor-tab').last().click();
 expect((await page.locator('#view2d').boundingBox()).x).toBeCloseTo(before.x,0);
 expect((await page.locator('#view3d').boundingBox()).x).toBeCloseTo(before3.x,0);
 await expect(page.locator('#saveStatus')).toContainText('本機已儲存');
 const get=()=>page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('easy-home-3d:projects:v1'));return s.projects.find(x=>x.id===s.activeId).data;});const original=await get();
 await page.locator('#view3d').click();await expect(page.locator('#view3d')).toHaveAttribute('aria-pressed','true');await page.screenshot({path:info.outputPath('navigation-3d.png')});await page.locator('#view2d').click();await expect(page.locator('#view2d')).toHaveAttribute('aria-pressed','true');expect(await get()).toEqual(original);
});