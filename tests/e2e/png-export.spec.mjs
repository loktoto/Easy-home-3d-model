import {test,expect} from '@playwright/test';import {readFile} from 'node:fs/promises';
test('high resolution 2D and 3D PNG exports have expected dimensions',async({page},info)=>{
 await page.goto('/');await page.locator('#startBuild').click();await page.locator('#buildHome').click();
 for(const mode of ['2d','3d']){
  await page.locator('#view'+mode).click();await page.locator('#projectsButton').click();await page.locator('#exportPngButton').click();await page.locator('#pngSize').selectOption('1600');await page.screenshot({path:info.outputPath('png-'+mode+'.png')});
  const download=page.waitForEvent('download');await page.locator('#downloadPng').click();const d=await download;const bytes=await readFile(await d.path());expect(bytes.subarray(0,8).toString('hex')).toBe('89504e470d0a1a0a');expect(bytes.readUInt32BE(16)).toBe(1600);expect(bytes.readUInt32BE(20)).toBe(1067);expect(d.suggestedFilename()).toContain(mode);await d.saveAs(info.outputPath('export-'+mode+'.png'));await page.locator('[data-close=pngDialog]').last().click();
 }
});
test('plan label layout separates crowded dimensions and furniture labels',async({page})=>{await page.goto('/');const result=await page.evaluate(()=>{const c=document.createElement('canvas'),ctx=c.getContext('2d'),reserved=[{x:260,y:190,w:80,h:40}],labels=Array.from({length:10},(_,i)=>({text:(i+1)+'.00 m',x:300,y:210}));const out=EasyHomeRenderer.planLabelLayout(ctx,600,420,labels,reserved);const all=[...reserved,...out.map(q=>q.rect)];return {count:out.length,overlap:all.some((a,i)=>all.slice(i+1).some(b=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y))};});expect(result.count).toBe(10);expect(result.overlap).toBe(false);});
