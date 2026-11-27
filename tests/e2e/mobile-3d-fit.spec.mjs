import {test,expect} from '@playwright/test';
test('five-floor model fits inside actual rendered canvas on initial view and resize',async({page},info)=>{
 await page.goto('/');await page.locator('#startBuild').click();await page.locator('#buildHome').click();
 for(let i=0;i<3;i++)await page.locator('#addFloor').click();
 await expect(page.locator('.floor-tab')).toHaveCount(5);
 await page.locator('#view3d').click();
 const check=()=>page.locator('#stage').evaluate(c=>{
  const ctx=c.getContext('2d'),w=c.width,h=c.height,p=ctx.getImageData(0,0,w,h).data;
  const bg=[p[0],p[1],p[2]];let minX=w,minY=h,maxX=-1,maxY=-1;
  for(let y=0;y<h;y+=3)for(let x=0;x<w;x+=3){const j=(y*w+x)*4;if(Math.abs(p[j]-bg[0])+Math.abs(p[j+1]-bg[1])+Math.abs(p[j+2]-bg[2])>24){minX=Math.min(minX,x);minY=Math.min(minY,y);maxX=Math.max(maxX,x);maxY=Math.max(maxY,y);}}
  return maxX>minX&&maxY>minY&&minX>w*.015&&maxX<w*.985&&minY>h*.015&&maxY<h*.985;
 });
 await expect.poll(check).toBe(true);
 await page.screenshot({path:info.outputPath('five-floor-fit.png')});
 await page.setViewportSize({width:info.project.name==='mobile-webkit'?430:1100,height:info.project.name==='mobile-webkit'?720:700});
 await expect.poll(check).toBe(true);await page.screenshot({path:info.outputPath('five-floor-resized.png')});
});