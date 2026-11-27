import {test,expect} from '@playwright/test';
test('plan annotations are accurate, persisted and accessible on both browsers',async({page},info)=>{
 await page.goto('/');await page.locator('#startBuild').click();await page.locator('#homeWidth').fill('8');await page.locator('#homeDepth').fill('6');await page.locator('#buildHome').click();
 await page.locator('#projectsButton').click();await page.locator('#planStatsButton').click();
 await expect(page.locator('#planStatsDialog')).toBeVisible();
 await expect(page.locator('#planGross')).toHaveText('48 m²');
 const gross=Number(await page.locator('#planGross').getAttribute('data-area')),net=Number(await page.locator('#planNet').getAttribute('data-area'));
 expect(net).toBeGreaterThan(0);expect(net).toBeLessThan(gross);
 await expect(page.locator('#openingSchedule button').first()).toBeVisible();
 await page.locator('#northDegrees').fill('90');await page.locator('#northDegrees').press('Tab');
 await expect(page.locator('#planNorthStatus')).toContainText('90');
 await page.locator('#planLegend').uncheck();await page.locator('#planDoorSwing').uncheck();
 await page.screenshot({path:info.outputPath('plan-annotations-dialog.png')});
 await page.locator('#openingSchedule button').first().click();await expect(page.locator('#planStatsDialog')).not.toBeVisible();
 await expect(page.locator('#northArrow')).toContainText('90');
 await expect(page.locator('#scaleBar')).toBeVisible();
 const span=await page.locator('#scaleBarFill').boundingBox();expect(span.width).toBeGreaterThan(15);
 await page.reload();await expect(page.locator('#northArrow')).toContainText('90');
 await page.locator('#projectsButton').click();await page.locator('#planStatsButton').click();
 await expect(page.locator('#planLegend')).not.toBeChecked();await expect(page.locator('#planDoorSwing')).not.toBeChecked();
 await page.locator('#planLegend').check();await page.locator('#planDoorSwing').check();
 await page.locator('[data-close=planStatsDialog]').last().click();await expect(page.locator('#planLegendBox')).toBeVisible();
 await page.screenshot({path:info.outputPath('plan-annotations-editor.png')});
});
test('rectangular closed plans, open boundaries and door collision geometry',async({page})=>{
 await page.goto('/');const result=await page.evaluate(()=>{
  const G=EasyHomeCore,m=G.empty('QA');m.walls=[G.wall([0,0],[4,0]),G.wall([4,0],[4,3]),G.wall([4,3],[0,3]),G.wall([0,3],[0,0]),G.wall([2,0],[2,3])];
  const closed=G.planAreas(m,0);const w=m.walls[0];m.openings=[{id:'door',wallId:w.id,type:'door',offset:1,width:1,height:2,sill:0,floor:0}];m.furniture=[{id:'chair',x:.8,y:.3,w:.25,d:.25,h:1,rotation:0,name:'QA',floor:0}];
  const blocked=G.doorSwingWarnings(m).map(v=>v.code);m.furniture[0].y=-1;const clear=G.doorSwingWarnings(m).map(v=>v.code);
  m.walls.splice(0,4);return {closed,open:G.planAreas(m,0),blocked,clear};
 });expect(result.closed.gross).toBeCloseTo(12,5);expect(result.closed.net).toBeLessThan(12);expect(result.open.gross).toBe(0);expect(result.blocked).toContain('door-swing-furniture');expect(result.clear).not.toContain('door-swing-furniture');
});
