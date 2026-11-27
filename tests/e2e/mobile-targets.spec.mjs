import {test,expect} from '@playwright/test';
test('mobile controls are reachable and at least 44 CSS pixels',async({page},info)=>{
 test.skip(info.project.name!=='mobile-webkit');
 await page.goto('/');
 for(const id of ['view2d','view3d','addFloor','removeFloor','zoomIn','zoomOut','projectsButton','exportButton']){
  const b=await page.locator('#'+id).boundingBox();expect(b).not.toBeNull();expect(b.width).toBeGreaterThanOrEqual(44);expect(b.height).toBeGreaterThanOrEqual(44);
 }
 await page.locator('#view3d').tap();await expect(page.locator('#view3d')).toHaveAttribute('aria-pressed','true');await page.locator('#view2d').tap();await expect(page.locator('#view2d')).toHaveAttribute('aria-pressed','true');
 await page.screenshot({path:info.outputPath('mobile-targets.png')});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2)).toBe(true);
});
