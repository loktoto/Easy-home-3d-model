import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';

async function saved(page){
 await expect(page.locator('#saveStatus')).toContainText('本機已儲存');
 return page.evaluate(() => {
  const state=JSON.parse(localStorage.getItem('easy-home-3d:projects:v1'));
  const project=state.projects.find(p=>p.id===state.activeId);
  return {state,project,model:project.data};
 });
}
async function canvasGeometry(page) {
 const r=await page.locator('#stage').boundingBox();
 if(!r)throw new Error('canvas missing');
 return {r,cx:r.x+r.width/2,cy:r.y+r.height/2};
}
async function clickPoint(page,x,y){
 await page.mouse.click(x,y);
}
async function drawRectangle(page){
 await page.locator('[data-tool="wall"]').click();
 const {cx,cy}=await canvasGeometry(page);
 const points=[[cx-130,cy-100],[cx+130,cy-100],[cx+130,cy+100],[cx-130,cy+100],[cx-130,cy-100]];
 for(const [x,y] of points)await clickPoint(page,x,y);
 await expect(page.locator('#drawingStats')).toContainText('4 幅牆');
 return {cx,cy};
}

test('no blank-screen, no console exceptions and safe first-run empty plan',async({page})=>{
 const errors=[];page.on('pageerror',err=>errors.push(err.message));
 await page.goto('/');
 await expect(page.getByRole('heading',{name:/Easy Home/})).toBeVisible();
 await expect(page.locator('#startTip')).toBeVisible();
 const p=await saved(page);
 expect(p.model.walls).toHaveLength(0);
 expect(p.model.furniture).toHaveLength(0);
 expect(p.model.openings).toHaveLength(0);
 await expect(page.locator('#inspectorContent')).toContainText('牆身');
 expect(errors).toEqual([]);
});

test('full home renovation journey: draw walls, add openings, resize/move/lock furniture, undo/redo, 3D, backups, reload',async({page},testInfo)=>{
 test.skip(testInfo.project.name!=='desktop-chromium','Desktop mouse interaction covered here; mobile Safari in its own test');
 const errors=[];page.on('pageerror',err=>errors.push(err.message));
 await page.goto('/');
 const {cx,cy}=await drawRectangle(page);
 let p=await saved(page);
 expect(p.model.walls).toHaveLength(4);
 for(const wall of p.model.walls)expect(Math.hypot(wall.b.x-wall.a.x,wall.b.y-wall.a.y)).toBeGreaterThan(1);
 await page.locator('[data-tool="door"]').click();
 await clickPoint(page,cx,cy-100);
 await expect(page.locator('#drawingStats')).toContainText('1 個門窗');
 await expect(page.locator('#inspectorContent')).toContainText('開口左邊剩餘牆長');
 await page.locator('[data-tool="window"]').click();
 await clickPoint(page,cx+130,cy);
 await expect(page.locator('#drawingStats')).toContainText('2 個門窗');
 p=await saved(page);
 expect(p.model.openings.map(o=>o.type).sort()).toEqual(['door','window']);

 await page.locator('#addFurnitureButton').click();
 await expect(page.locator('#furnitureDialog')).toBeVisible();
 await page.locator('#furnitureCatalog button').filter({hasText:'梳化'}).click();
 await expect(page.locator('#inspectorContent')).toContainText('梳化');
 await page.locator('#prop-w').fill('2.40');
 await page.locator('#prop-w').press('Tab');
 await page.locator('#prop-h').fill('1.05');
 await page.locator('#prop-h').press('Tab');
 p=await saved(page);
 expect(p.model.furniture).toHaveLength(1);
 expect(p.model.furniture[0].w).toBe(2.4);
 expect(p.model.furniture[0].h).toBe(1.05);
 expect(p.model.furniture[0].locked).toBe(false);
 const start={x:p.model.furniture[0].x,y:p.model.furniture[0].y};
 await page.mouse.move(cx,cy);
 await page.mouse.down();
 await page.mouse.move(cx+70,cy+42,{steps:7});
 await page.mouse.up();
 p=await saved(page);
 expect(p.model.furniture[0].x).not.toBe(start.x);
 expect(p.model.furniture[0].y).not.toBe(start.y);
 const moved={x:p.model.furniture[0].x,y:p.model.furniture[0].y};
 await page.locator('#undoButton').click();
 p=await saved(page);
 expect(p.model.furniture[0].x).toBe(start.x);
 await page.locator('#redoButton').click();
 p=await saved(page);
 expect(p.model.furniture[0].x).toBe(moved.x);
 const rect=await canvasGeometry(page);
 // Position is verified through the saved world coordinates above.
 await page.locator('[data-act="lock"]').click();
 p=await saved(page);
 expect(p.model.furniture[0].locked).toBe(true);
 await page.locator('#prop-x').fill(String(p.model.furniture[0].x));
 await page.locator('#prop-x').press('Tab');
 expect((await saved(page)).model.furniture[0].locked).toBe(true);
 await page.locator('[data-act="lock"]').click();
 expect((await saved(page)).model.furniture[0].locked).toBe(false);
 await page.locator('[data-act="duplicate"]').click();
 expect((await saved(page)).model.furniture).toHaveLength(2);
 await page.locator('[data-act="delete"]').click();
 expect((await saved(page)).model.furniture).toHaveLength(1);
 await page.locator('#view3d').click();
 await expect(page.locator('#view3d')).toHaveAttribute('aria-pressed','true');
 await expect(page.locator('#modeHint')).toContainText('3D');
 await page.screenshot({path:testInfo.outputPath('desktop-3d.png')});
 await page.locator('#view2d').click();
 await expect(page.locator('#view2d')).toHaveAttribute('aria-pressed','true');
 await page.screenshot({path:testInfo.outputPath('desktop-2d.png')});
 const promiseDownload=page.waitForEvent('download');
 await page.locator('#exportButton').click();
 const dl=await promiseDownload;
 expect(dl.suggestedFilename()).toContain('easy-home-3d');
 const file=await readFile(await dl.path(),'utf8');
 const backup=JSON.parse(file);
 expect(backup.format).toBe('easy-home-3d');
 expect(backup.project.walls).toHaveLength(4);
 expect(backup.project.openings).toHaveLength(2);
 await page.locator('#projectsButton').click();
 await page.locator('#importFile').setInputFiles({name:'import.json',mimeType:'application/json',buffer:Buffer.from(file)});
 await expect(page.locator('#drawingStats')).toContainText('4 幅牆');
 expect((await saved(page)).state.projects).toHaveLength(2);
 await page.reload();
 await expect(page.locator('#drawingStats')).toContainText('4 幅牆');
 expect((await saved(page)).model.openings).toHaveLength(2);
 expect(errors).toEqual([]);
});

test('touch/mobile: first-run demo, reachable controls, furniture edit, 2D/3D navigation',async({page},testInfo)=>{
 test.skip(testInfo.project.name!=='mobile-webkit','Exercise iPhone Safari WebKit viewport');
 const errors=[];page.on('pageerror',err=>errors.push(err.message));
 await page.goto('/');
 await expect(page.locator('#startTip')).toBeVisible();
 page.once('dialog',d=>d.accept());
 await page.locator('#loadDemo').tap();
 await expect(page.locator('#drawingStats')).toContainText('6 幅牆');
 await page.locator('#view3d').tap();
 await expect(page.locator('#view3d')).toHaveAttribute('aria-pressed','true');
 await page.locator('#view2d').tap();
 await expect(page.locator('#view2d')).toHaveAttribute('aria-pressed','true');
 await page.locator('#addFurnitureButton').tap();
 await expect(page.locator('#furnitureDialog')).toBeVisible();
 await page.locator('#furnitureCatalog button').filter({hasText:'書枱'}).tap();
 await expect(page.locator('#inspector')).toHaveClass(/open/);
 await expect(page.locator('#inspectorContent')).toContainText('書枱');
 await page.locator('#prop-w').fill('1.70');
 await page.locator('#prop-w').press('Tab');
 expect((await saved(page)).model.furniture.some(f=>f.name==='書枱'&&f.w===1.7)).toBe(true);
 await page.locator('#closeInspector').tap();
 await expect(page.locator('#inspector')).not.toHaveClass(/open/);
 await page.screenshot({path:testInfo.outputPath('mobile-2d.png')});
 const hasHScroll=await page.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+2);
 expect(hasHScroll).toBe(false);
 await page.reload();
 expect((await saved(page)).model.furniture.some(f=>f.name==='書枱')).toBe(true);
 expect(errors).toEqual([]);
});


test('beginner room workflow: two corners, exact wall length, connected wall endpoints, undo',async({page},testInfo)=>{
 test.skip(testInfo.project.name!=='desktop-chromium','Precision geometry mouse workflow');
 await page.goto('/');
 await page.locator('#startRoom').click();
 const g=await canvasGeometry(page);
 const first={x:g.cx-110,y:g.cy-80},second={x:g.cx+110,y:g.cy+80};
 await clickPoint(page,first.x,first.y);
 await clickPoint(page,second.x,second.y);
 await expect(page.locator('#drawingStats')).toContainText('4 幅牆');
 let snap=await saved(page);
 expect(snap.model.walls).toHaveLength(4);
 const a=snap.model.walls[0],joined=snap.model.walls[1];
 expect(Math.hypot(a.b.x-joined.a.x,a.b.y-joined.a.y)).toBeLessThan(.001);
 const oldLength=Math.hypot(a.b.x-a.a.x,a.b.y-a.a.y);
 await clickPoint(page,g.cx,first.y);
 await expect(page.locator('#inspectorContent')).toContainText('直接設定牆長');
 await page.locator('#prop-length').fill('3.75');
 await page.locator('#prop-length').press('Tab');
 snap=await saved(page);
 const w=snap.model.walls[0],neighbor=snap.model.walls[1];
 expect(Math.hypot(w.b.x-w.a.x,w.b.y-w.a.y)).toBeCloseTo(3.75,2);
 expect(Math.hypot(w.b.x-neighbor.a.x,w.b.y-neighbor.a.y)).toBeLessThan(.001);
 await expect(page.locator('#inspectorContent')).toContainText('牆身');
 await page.locator('#undoButton').click();
 snap=await saved(page);
 expect(Math.hypot(snap.model.walls[0].b.x-snap.model.walls[0].a.x,snap.model.walls[0].b.y-snap.model.walls[0].a.y)).toBeCloseTo(oldLength,2);
 await expect(page.locator('#inspectorContent')).toContainText('直接設定牆長');
});


test('furniture can be selected and moved in 3D, with coordinates kept in 2D',async({page},testInfo)=>{
 test.skip(testInfo.project.name!=='desktop-chromium','3D mouse pointer regression');
 await page.goto('/');
 await page.locator('#addFurnitureButton').click();
 await page.locator('#furnitureCatalog button').filter({hasText:'自訂方塊'}).click();
 const first=await saved(page);
 const initial={x:first.model.furniture[0].x,y:first.model.furniture[0].y};
 await page.locator('#view3d').click();
 await expect(page.locator('#modeHint')).toContainText('3D');
 const p=await page.evaluate(()=>{
  const store=JSON.parse(localStorage.getItem('easy-home-3d:projects:v1'));
  const m=store.projects.find(x=>x.id===store.activeId).data;
  const f=m.furniture[0];
  return window.EasyHomeRenderer.projectPoint(document.querySelector('#stage'),m,{azimuth:-.75,elevation:.82,distance:1},[f.x,f.y,f.h]);
 });
 expect(p.valid).toBe(true);
 const g=await canvasGeometry(page);
 await page.mouse.move(g.r.x+p.x,g.r.y+p.y);
 await page.mouse.down();
 await page.mouse.move(g.r.x+p.x+48,g.r.y+p.y+21,{steps:12});
 await page.mouse.up();
 const moved=await saved(page);
 const f=moved.model.furniture[0];
 expect(Math.hypot(f.x-initial.x,f.y-initial.y)).toBeGreaterThan(.05);
 await page.locator('#view2d').click();
 const after=await saved(page);
 expect(after.model.furniture[0].x).toBe(f.x);
 expect(after.model.furniture[0].y).toBe(f.y);
});

test('320px phone never hides project controls beyond document width',async({page})=>{
 await page.setViewportSize({width:320,height:700});
 await page.goto('/');
 await expect(page.locator('#projectsButton')).toBeVisible();
 await expect(page.locator('#exportButton')).toBeVisible();
 const overflow=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,screen:window.innerWidth}));
 expect(overflow.doc).toBeLessThanOrEqual(overflow.screen+2);
});
