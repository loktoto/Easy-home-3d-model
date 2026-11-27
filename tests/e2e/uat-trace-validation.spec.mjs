import {test,expect} from '@playwright/test';
const key='easy-home-3d:projects:v1';
const stored=page=>page.evaluate(k=>{const s=JSON.parse(localStorage.getItem(k));return s.projects.find(p=>p.id===s.activeId).data.traces||[]},key);
const open=async page=>{await page.locator('#projectsButton').click();await page.locator('#traceButton').click()};
test('UAT-074 calibrated trace rejects invalid fields, preserves image and accepts boundary values',async({page},info)=>{
 await page.goto('/?lang=en');await expect(page.locator('#saveStatus')).toHaveText(/Saved locally/i);await open(page);
 const data=await page.evaluate(()=>{const c=document.createElement('canvas');c.width=300;c.height=200;const x=c.getContext('2d');x.fillStyle='white';x.fillRect(0,0,300,200);x.strokeStyle='black';x.strokeRect(20,20,260,160);return c.toDataURL('image/png').split(',')[1]});
 await page.locator('#traceFile').setInputFiles({name:'synthetic-plan.png',mimeType:'image/png',buffer:Buffer.from(data,'base64')});
 await expect(page.locator('#tracePreview')).toHaveJSProperty('width',300);
 const preview=page.locator('#tracePreview'),box=await preview.boundingBox();await preview.click({position:{x:box.width*.2,y:box.height*.3}});await preview.click({position:{x:box.width*.8,y:box.height*.3}});
 await expect(page.locator('#traceApply')).toBeEnabled();
 await page.locator('#traceDistance').fill('0');await page.locator('#traceApply').click();await expect(page.locator('#traceDistance')).toHaveAttribute('aria-invalid','true');await expect(page.locator('#traceStatus')).toContainText(/allowed range/i);expect(await stored(page)).toEqual([]);
 await page.locator('#traceDistance').fill('3');await page.locator('#traceApply').click();await expect(page.locator('#traceDialog')).not.toBeVisible();await expect.poll(async()=>(await stored(page)).length).toBe(1);
 await open(page);const initial=await stored(page);
 for(const [id,value] of [['traceOpacity','101'],['traceOpacity','0'],['traceOpacity',''],['traceX','1001'],['traceY','-1001']]){
  const field=page.locator('#'+id),prior=await field.inputValue();await field.fill(value);await page.locator('#traceApply').click();await expect(field).toHaveAttribute('aria-invalid','true');await expect(page.locator('#traceStatus')).toContainText(/allowed range/i);expect(await stored(page)).toEqual(initial);await page.screenshot({path:info.outputPath(id+'-'+(value||'blank')+'.png'),fullPage:true});await field.fill(prior);
 }
 for(const value of ['5','100']){await page.locator('#traceOpacity').fill(value);await page.locator('#traceApply').click();await expect(page.locator('#traceDialog')).not.toBeVisible();await expect.poll(async()=>(await stored(page))[0].opacity).toBe(Number(value)/100);if(value==='5')await open(page);}
 await page.reload();await expect.poll(async()=>(await stored(page))[0].opacity).toBe(1);
});
