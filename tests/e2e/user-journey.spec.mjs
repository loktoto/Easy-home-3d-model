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
 await expect(page.getByRole('heading',{name:/Easy\s*3D\s*Home/})).toBeVisible();
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

test('build a complete home end to end: wizard, checker, precise wall height, 3D and backup',async({page},testInfo)=>{
 test.skip(testInfo.project.name!=='desktop-chromium','Mouse precision workflow; mobile wizard is covered separately');
 const errors=[];page.on('pageerror',err=>errors.push(err.message));
 await page.goto('/');
 await page.locator('#buildButton').click();
 await expect(page.locator('#homeDialog')).toBeVisible();
 await expect(page.locator('#homePreview')).toContainText('尺寸檢查通過');
 await page.locator('#homeWidth').fill('9');
 await page.locator('#homeDepth').fill('6.5');
 await page.locator('#homeBedrooms').selectOption('2');
 await page.locator('#buildHome').click();
 let p=await saved(page);
 expect(p.model.walls.length).toBeGreaterThanOrEqual(7);
 expect(p.model.openings.length).toBeGreaterThanOrEqual(8);
 expect(p.model.furniture.length).toBeGreaterThanOrEqual(3);
 await expect(page.locator('#drawingStats')).toContainText('幅牆');
 await page.screenshot({path:testInfo.outputPath('home-wizard-2d.png')});
 await page.locator('#checkButton').click();
 await expect(page.locator('#checkList')).toContainText('圖則檢查通過');
 await page.locator('#checkDialog .dialog-actions button').click();

 const spot=await page.evaluate(()=>{
  const canvas=document.querySelector('#stage'),store=JSON.parse(localStorage.getItem('easy-home-3d:projects:v1'));
  const m=store.projects.find(v=>v.id===store.activeId).data,b=window.EasyHomeCore.getBounds(m);
  const scale=window.EasyHomeCore.clamp(Math.min(canvas.clientWidth/(b.width+2.5),canvas.clientHeight/(b.height+2.5)),18,145);
  const wall=m.walls.find(w=>m.openings.some(o=>o.wallId===w.id));
  const px=wall.a.x+(wall.b.x-wall.a.x)*.06,py=wall.a.y+(wall.b.y-wall.a.y)*.06;
  return {x:canvas.clientWidth/2-scale*b.cx+px*scale,y:canvas.clientHeight/2-scale*b.cy+py*scale};
 });
 const g=await canvasGeometry(page);
 await clickPoint(page,g.r.x+spot.x,g.r.y+spot.y);
 await expect(page.locator('#inspectorContent')).toContainText('直接設定牆長');
 await page.locator('#prop-height').fill('1.9');
 await page.locator('#prop-height').press('Tab');
 p=await saved(page);
 const wallId=p.model.walls.find(w=>w.id===p.model.openings[0].wallId)?.id;
 for(const o of p.model.openings.filter(o=>o.wallId===wallId))expect(o.sill+o.height).toBeLessThanOrEqual(1.9001);
 await page.locator('#checkButton').click();
 await expect(page.locator('#checkList')).not.toContainText('門窗頂部高於牆身');
 await page.locator('#checkDialog .dialog-actions button').click();
 await page.locator('#view3d').click();
 await expect(page.locator('#view3d')).toHaveAttribute('aria-pressed','true');
 await page.screenshot({path:testInfo.outputPath('home-wizard-3d.png')});
 await page.locator('#view2d').click();
 const downloadPromise=page.waitForEvent('download');
 await page.locator('#exportButton').click();
 const backup=await readFile(await (await downloadPromise).path(),'utf8');
 await page.locator('#projectsButton').click();
 await page.locator('#importFile').setInputFiles({name:'home.json',mimeType:'application/json',buffer:Buffer.from(backup)});
 await page.reload();
 p=await saved(page);
 expect(p.state.projects.length).toBe(3);
 expect(p.model.openings.length).toBeGreaterThanOrEqual(8);
 expect(errors).toEqual([]);
});

test('mobile: home wizard builds a full plan and checker is reachable',async({page},testInfo)=>{
 test.skip(testInfo.project.name!=='mobile-webkit','Desktop wizard journey covered above');
 await page.goto('/');
 await page.locator('#buildButton').tap();
 await expect(page.locator('#homeDialog')).toBeVisible();
 await page.locator('#homeBedrooms').selectOption('3');
 await page.locator('#buildHome').tap();
 await expect(page.locator('#drawingStats')).toContainText('幅牆');
 const p=await saved(page);
 expect(p.model.openings.length).toBeGreaterThanOrEqual(10);
 await page.locator('#checkButton').tap();
 await expect(page.locator('#checkList')).toContainText('圖則檢查通過');
});

test('two-floor home: floor tabs, independent editing, 3D stacking, backup and add/remove floor',async({page},testInfo)=>{
 test.skip(testInfo.project.name!=='desktop-chromium','Mouse workflow; mobile two-floor covered by shared wizard journey');
 const errors=[];page.on('pageerror',err=>errors.push(err.message));
 await page.goto('/');
 await page.locator('#buildButton').click();
 await expect(page.locator('#homePreview')).toContainText('2 層');
 await page.locator('#homeWidth').fill('10');
 await page.locator('#homeDepth').fill('7');
 await page.locator('#homeBedrooms').selectOption('3');
 await page.locator('#homeFloors').selectOption('2');
 await page.locator('#buildHome').click();
 let p=await saved(page);
 expect(p.model.floorCount).toBe(2);
 expect(p.model.walls.filter(w=>w.floor===1).length).toBeGreaterThan(5);
 expect(p.model.openings.filter(o=>o.floor===1).length).toBeGreaterThan(4);
 await expect(page.locator('.floor-tab')).toHaveCount(2);
 await expect(page.locator('.floor-tab').first()).toHaveClass(/active/);

 await page.locator('.floor-tab').nth(1).click();
 await expect(page.locator('.floor-tab').nth(1)).toHaveClass(/active/);
 await page.locator('#addFurnitureButton').click();
 await page.locator('#furnitureCatalog button').filter({hasText:'書枱'}).click();
 await page.waitForTimeout(350);
 p=await saved(page);const upper=p.model.furniture.at(-1);
 expect(upper.floor).toBe(1);
 await page.locator('.floor-tab').first().click();
 await page.locator('#addFurnitureButton').click();
 await page.locator('#furnitureCatalog button').filter({hasText:'椅子'}).click();
 await page.waitForTimeout(350);
 p=await saved(page);const ground=p.model.furniture.at(-1);
 expect(ground.floor).toBe(0);
 expect(upper.name).toBe('書枱');

 await page.locator('#checkButton').click();
 await expect(page.locator('#checkList')).not.toContainText('必須修正');
 await page.locator('#checkDialog .dialog-actions button').click();
 await page.locator('#view3d').click();
 await expect(page.locator('#view3d')).toHaveAttribute('aria-pressed','true');
 await page.screenshot({path:testInfo.outputPath('two-floor-3d.png')});
 await page.locator('#view2d').click();

 const downloadPromise=page.waitForEvent('download');
 await page.locator('#exportButton').click();
 const backup=await readFile(await (await downloadPromise).path(),'utf8');
 await page.locator('#projectsButton').click();
 await page.locator('#importFile').setInputFiles({name:'two-floor.json',mimeType:'application/json',buffer:Buffer.from(backup)});
 await page.reload();
 p=await saved(page);
 expect(p.model.floorCount).toBe(2);
 expect(p.model.furniture.some(f=>f.name==='書枱'&&f.floor===1)).toBe(true);
 expect(p.model.furniture.some(f=>f.name==='椅子'&&f.floor===0)).toBe(true);

 await page.locator('#addFloor').click();
 p=await saved(page);expect(p.model.floorCount).toBe(3);
 await expect(page.locator('.floor-tab')).toHaveCount(3);
 page.once('dialog',d=>d.accept());
 await page.locator('#removeFloor').click();
 p=await saved(page);expect(p.model.floorCount).toBe(2);
 await expect(page.locator('.floor-tab')).toHaveCount(2);
 expect(errors).toEqual([]);
});

test('remaining controls: toggles, measure, rotate, nudge, rename and project deletion',async({page},testInfo)=>{
 test.skip(testInfo.project.name!=='desktop-chromium','Desktop keyboard and mouse control sweep');
 const errors=[];page.on('pageerror',err=>errors.push(err.message));
 await page.goto('/');
 await page.locator('#helpButton').click();
 await expect(page.locator('#helpDialog')).toBeVisible();
 await page.locator('#helpDialog .close-dialog').click();
 for(const id of ['#snapButton','#dimsButton']){
  const b=page.locator(id);await b.click();await expect(b).toHaveAttribute('aria-pressed','false');
  await b.click();await expect(b).toHaveAttribute('aria-pressed','true');
 }
 for(const id of ['#zoomIn','#zoomOut','#fitButton','#fitBottom'])await page.locator(id).click();
 const g=await canvasGeometry(page);
 await page.locator('[data-tool="wall"]').click();
 await clickPoint(page,g.cx-90,g.cy-60);
 await page.keyboard.press('Escape');
 expect((await saved(page)).model.walls).toHaveLength(0);
 await page.locator('[data-tool="measure"]').click();
 await clickPoint(page,g.cx-100,g.cy+80);await clickPoint(page,g.cx+40,g.cy+80);
 let p=await saved(page);
 expect(p.model.measurements).toHaveLength(1);
 await expect(page.locator('#inspectorContent')).toContainText('量度結果');
 await page.locator('#prop-bx').fill(String(p.model.measurements[0].b.x+1));
 await page.locator('#prop-bx').press('Tab');
 p=await saved(page);
 expect(p.model.measurements[0].b.x).toBeGreaterThan(1);
 await page.locator('#stage').focus();
 await page.keyboard.press('Delete');
 expect((await saved(page)).model.measurements).toHaveLength(0);
 await page.locator('#addFurnitureButton').click();
 await page.locator('#furnitureCatalog button').filter({hasText:'椅子'}).click();
 p=await saved(page);const before=p.model.furniture[0];
 await page.locator('#stage').focus();
 await page.keyboard.press('ArrowRight');
 await page.keyboard.press('Shift+ArrowUp');
 p=await saved(page);
 expect(p.model.furniture[0].x).toBeCloseTo(before.x+.05,3);
 expect(p.model.furniture[0].y).toBeCloseTo(before.y-.25,3);
 await page.locator('[data-act="rotate"]').click();
 p=await saved(page);
 expect(Math.abs(p.model.furniture[0].rotation-before.rotation)).toBeGreaterThan(1);
 await page.locator('#projectName').fill('我的測試屋');
 await page.locator('#projectName').press('Tab');
 await page.reload();
 await expect(page.locator('#projectName')).toHaveValue('我的測試屋');
 await page.locator('#projectsButton').click();
 await page.locator('#newBlank').click();
 await page.locator('#projectsButton').click();
 expect(await page.locator('.project-item').count()).toBe(2);
 page.once('dialog',d=>d.accept());
 await page.locator('.project-item').first().locator('button.danger').click();
 await expect(page.locator('.project-item')).toHaveCount(1);
 expect(errors).toEqual([]);
});

test('responsive layout across 320–768px: no overflow, real tap targets and reachable wizard actions',async({page},testInfo)=>{
 test.skip(testInfo.project.name!=='desktop-chromium','Viewport sweep runs once in Chromium');
 for(const width of [320,360,390,430,768]){
  await page.setViewportSize({width,height:780});
  await page.goto('/');
  const layout=await page.evaluate(()=>{
   const h=sel=>document.querySelector(sel).getBoundingClientRect().height;
   return {doc:document.documentElement.scrollWidth,screen:window.innerWidth,
    floorTab:h('.floor-tab'),floorAct:h('#addFloor'),project:h('#projectsButton'),tool:h('.tool-scroll .tool'),
    floorBarVisible:document.querySelector('.floor-bar').getBoundingClientRect().height>0};
  });
  expect(layout.doc).toBeLessThanOrEqual(layout.screen+2);
  expect(layout.floorBarVisible).toBe(true);
  expect(Math.min(layout.floorTab,layout.floorAct,layout.project,layout.tool)).toBeGreaterThanOrEqual(43);
  await page.locator('#buildButton').click();
  const action=await page.locator('#buildHome').boundingBox();
  expect(action).not.toBeNull();
  expect(action.y+action.height).toBeLessThanOrEqual(780);
  await page.locator('#homeDialog .close-dialog').click();
 }
});

test('320px phone never hides project controls beyond document width',async({page})=>{
 await page.setViewportSize({width:320,height:700});
 await page.goto('/');
 await expect(page.locator('#projectsButton')).toBeVisible();
 await expect(page.locator('#exportButton')).toBeVisible();
 const overflow=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,screen:window.innerWidth}));
 expect(overflow.doc).toBeLessThanOrEqual(overflow.screen+2);
});


test('published standalone one-file HTML: create room, furniture, save, reload without external assets',async({page},testInfo)=>{
 const external=[];
 page.on('request',req=>{if(/^https?:/.test(req.url())&&!req.url().startsWith('http://127.0.0.1:4173/'))external.push(req.url());});
 await page.goto('/easy-home-3d-standalone.html');
 await expect(page.locator('#startRoom')).toBeVisible();
 await page.locator('#startRoom').click();
 const stage=page.locator('#stage'),r=await stage.boundingBox();
 const p1={x:Math.floor(r.width*.36),y:Math.floor(r.height*.35)};
 const p2={x:Math.floor(r.width*.64),y:Math.floor(r.height*.62)};
 if(testInfo.project.name==='mobile-webkit'){
  await stage.tap({position:p1});await stage.tap({position:p2});
 }else{
  await stage.click({position:p1});await stage.click({position:p2});
 }
 await expect(page.locator('#drawingStats')).toContainText('4 幅牆');
 await page.locator('#addFurnitureButton').click();
 await page.locator('#furnitureCatalog button').filter({hasText:'梳化'}).click();
 await expect(page.locator('#inspectorContent')).toContainText('梳化');
 const before=await saved(page);expect(before.model.furniture).toHaveLength(1);
 await page.reload();
 const restored=await saved(page);
 expect(restored.model.walls).toHaveLength(4);
 expect(restored.model.furniture).toHaveLength(1);
 expect(external).toEqual([]);
});
