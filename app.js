/* Easy3DHome — browser editor. No tracking, account or server required. MIT © 2026 loktoto */
(function(){
"use strict";
const G=window.EasyHomeCore,R=window.EasyHomeRenderer,t=window.EasyHomeI18n.t;
const $=id=>document.getElementById(id);
const canvas=$("stage"),ctx=canvas.getContext("2d"),STORAGE="easy-home-3d:projects:v1";
const $num=n=>G.round(n,2).toFixed(2), esc=v=>String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let state,history=[],future=[],saveTimer=null,toastTimer=null,drawRequested=false;
const touches=new Map();let pinch=null;
const ui={
 mode:"2d",tool:"select",floor:0,snap:true,dimensions:true,
 view:{scale:80,panX:0,panY:0},orbit:{azimuth:-.75,elevation:.82,distance:1},
 selected:null,pending:null,cursor:null,drag:null,hits:[],wallStart:null,wallCount:0
};
function visibleModel(){
 const m=model(),on=v=>G.clamp(Math.round(Number(v.floor)||0),0,Math.max(0,(m.floorCount||1)-1))===ui.floor;
 return {walls:m.walls.filter(on),openings:m.openings.filter(on),furniture:m.furniture.filter(on),measurements:m.measurements.filter(on)};
}
function newProject(data){return {id:G.uid(),name:data.name,data,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};}
function readStore(){
 try{
  const raw=JSON.parse(localStorage.getItem(STORAGE)||"null");
  if(raw&&Array.isArray(raw.projects)&&raw.projects.length<=100){
   const projects=[];
   for(const p of raw.projects){try{
    const m=G.sanitize(p.data);
    projects.push({id:String(p.id||G.uid()),name:String(p.name||m.name).slice(0,80),data:m,createdAt:p.createdAt||"",updatedAt:p.updatedAt||""});
   }catch(e){}}
   if(projects.length)return {projects,activeId:projects.some(p=>p.id===raw.activeId)?raw.activeId:projects[0].id};
  }
 }catch(e){console.warn("Local storage unavailable or invalid",e);}
 const p=newProject(G.empty());return {projects:[p],activeId:p.id};
}
state=readStore();
const active=()=>state.projects.find(p=>p.id===state.activeId)||state.projects[0];
const model=()=>active().data;
function saveNow(){
 clearTimeout(saveTimer);saveTimer=null;
 try{
  localStorage.setItem(STORAGE,JSON.stringify(state));
  $("saveStatus").textContent=t("✓ 本機已儲存");$("saveStatus").classList.remove("error");
 }catch(e){$("saveStatus").textContent=t("⚠ 未能儲存，請匯出備份");$("saveStatus").classList.add("error");}
}
function scheduleSave(){
 active().updatedAt=new Date().toISOString();
 $("saveStatus").textContent=t("儲存中…");$("saveStatus").classList.remove("error");clearTimeout(saveTimer);saveTimer=setTimeout(saveNow,250);
}
function snapshot(){return JSON.stringify(model());}
function record(before){
 if(before===snapshot())return false;
 history.push(before);if(history.length>65)history.shift();future=[];scheduleSave();refresh();return true;
}
function commit(fn){
 const before=snapshot();try{fn();}catch(err){active().data=JSON.parse(before);retainSelection();refresh();throw err;}return record(before);
}
function retainSelection(){
 ui.floor=G.clamp(ui.floor,0,Math.max(0,(model().floorCount||1)-1));
 if(!ui.selected)return;
 const m=model(),array=ui.selected.kind==="wall"?m.walls:ui.selected.kind==="opening"?m.openings:
  ui.selected.kind==="furniture"?m.furniture:m.measurements;
 if(!array.some(o=>o.id===ui.selected.id))ui.selected=null;
}
function undo(){
 if(!history.length)return toast(t("已經沒有可以復原的操作"));
 future.push(snapshot());active().data=G.sanitize(JSON.parse(history.pop()));retainSelection();ui.pending=null;scheduleSave();refresh();toast(t("已復原"));
}
function redo(){
 if(!future.length)return toast(t("已經沒有可以重做的操作"));
 history.push(snapshot());active().data=G.sanitize(JSON.parse(future.pop()));retainSelection();ui.pending=null;scheduleSave();refresh();toast(t("已重做"));
}
function clearUndo(){history=[];future=[];ui.selected=null;ui.pending=null;ui.cursor=null;ui.drag=null;ui.floor=0;}
function toast(text){
 const el=$("toast");el.textContent=text;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2500);
}
function getObject(){
 if(!ui.selected)return null;
 const m=model();
 return ui.selected.kind==="wall"?m.walls.find(o=>o.id===ui.selected.id):
 ui.selected.kind==="opening"?m.openings.find(o=>o.id===ui.selected.id):
 ui.selected.kind==="furniture"?m.furniture.find(o=>o.id===ui.selected.id):
 m.measurements.find(o=>o.id===ui.selected.id);
}
function setSelection(kind,id){
 ui.selected=id?{kind,id}:null;renderInspector();render();
 if(ui.selected&&window.matchMedia("(max-width:780px)").matches)$("inspector").classList.add("open");
}
function render(){
 if(drawRequested)return;drawRequested=true;
 requestAnimationFrame(()=>{
  drawRequested=false;
  const w=canvas.clientWidth,h=canvas.clientHeight;
  if(!w||!h)return;
  const dpr=Math.min(window.devicePixelRatio||1,2);
  if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){
   canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);
  }
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ui.hits=R.draw(canvas,ctx,model(),{...ui,floor:ui.floor});
 });
}
function refresh(){
 $("projectName").value=active().name;
 $("view2d").classList.toggle("active",ui.mode==="2d");
 $("view3d").classList.toggle("active",ui.mode==="3d");
 $("view2d").setAttribute("aria-pressed",ui.mode==="2d");
 $("view3d").setAttribute("aria-pressed",ui.mode==="3d");
 document.querySelectorAll("[data-tool]").forEach(b=>{const selected=b.dataset.tool===ui.tool;b.classList.toggle("active",selected);b.setAttribute("aria-pressed",String(selected));});
 $("snapButton").textContent=t("吸附：")+(ui.snap?t("開"):t("關"));$("snapButton").classList.toggle("active",ui.snap);
 $("snapButton").setAttribute("aria-pressed",String(ui.snap));
 $("dimsButton").textContent=t("尺寸：")+(ui.dimensions?t("開"):t("關"));$("dimsButton").classList.toggle("active",ui.dimensions);
 $("dimsButton").setAttribute("aria-pressed",String(ui.dimensions));
 $("undoButton").disabled=!history.length;$("redoButton").disabled=!future.length;
 renderFloors();
 const m=model();$("drawingStats").textContent=(m.floorCount>1?floorLabel(ui.floor)+" · ":"")+m.walls.length+t(" 幅牆 · ")+m.openings.length+t(" 個門窗 · ")+m.furniture.length+t(" 件傢俬");
 $("startTip").hidden=!!(m.walls.length||m.furniture.length||m.openings.length||m.measurements.length||ui.tool!=="select"||ui.mode!=="2d");
 $("modeHint").textContent=ui.mode==="3d"?t("3D 模式：拖動旋轉，滾輪縮放，按 2D 可返回編輯。"):
 ui.tool==="room"?t("畫房間：依次點選兩個對角，立即建立四幅牆。點 Esc 可以取消。"):
 ui.tool==="wall"?t("逐幅畫牆：點起點及終點；連續畫牆，回到第一點可結束，亦可按 Esc。"):
 ui.tool==="door"?t("加入門：按一下牆身，再於右側輸入實際門闊。"):
 ui.tool==="window"?t("加入窗：按一下牆身，再調整窗闊、窗高及窗台高度。"):
 ui.tool==="measure"?t("量度：先按起點，再按終點，顯示兩點距離。"):
 ui.tool==="pan"?t("移動畫布：拖動畫面；滑鼠滾輪縮放。"):
 m.walls.length===0?t("第 1 步／3：揀「畫房間」點兩個對角，或者逐幅畫牆。"):
 m.openings.length===0?t("第 2 步／3：已畫出牆身；下一步加入門窗，或直接放傢俬。"):
 m.furniture.length===0?t("第 3 步／3：加傢俬、修改闊深高並移動到正確位置。"):
 t("完成基本擺位：可選取物件微調尺寸、轉 3D、匯出 JSON 備份。");
 $("scaleLabel").textContent=ui.mode==="2d"?t("單位：米 (m) · 格線按縮放顯示"):t("透視 3D · 模型尺寸以米 (m) 計");
 $("selectionHint").textContent=ui.selected?t("已選取：")+(getObject()?.name||(ui.selected.kind==="wall"?t("牆身"):ui.selected.kind==="opening"?t("門窗"):t("量度"))):"";
 renderInspector();render();
}
function fit3D(){ui.orbit=R.fitOrbit(canvas,model(),ui.orbit);}
function fit(){
 const bounds=G.getBounds(ui.mode==="3d"?model():visibleModel(),ui.mode==="3d"?undefined:ui.floor),w=canvas.clientWidth||800,h=canvas.clientHeight||550;
 ui.view.scale=G.clamp(Math.min(w/(bounds.width+2.5),h/(bounds.height+2.5)),18,145);
 ui.view.panX=-bounds.cx*ui.view.scale;ui.view.panY=-bounds.cy*ui.view.scale;
 if(ui.mode==="3d")fit3D();else {ui.orbit.distance=1;delete ui.orbit.targetZ;}render();
}
function mode(next){
 if(next==="2d"&&ui.selected){const o=getObject();if(o&&(Number(o.floor)||0)!==ui.floor)ui.selected=null;}
 ui.mode=next;ui.pending=null;ui.wallStart=null;ui.wallCount=0;ui.drag=null;if(next==="3d"){ui.tool="select";fit3D();}
 $("inspector").classList.remove("open");refresh();
}
function tool(next){
 if(ui.mode==="3d"&&next!=="select"&&next!=="pan")ui.mode="2d";
 ui.tool=next;ui.pending=null;ui.wallStart=null;ui.wallCount=0;ui.drag=null;refresh();
}
const position=e=>{const r=canvas.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top};};
const world=e=>R.toWorld(position(e),ui.view,canvas.clientWidth,canvas.clientHeight);
function snapped(p,original=null){
 if(!ui.snap)return G.point(G.round(p.x,3),G.round(p.y,3));
 let q=G.point(Math.round(p.x*10)/10,Math.round(p.y*10)/10);
 let d=.24;
 for(const wall of visibleModel().walls)for(const end of [wall.a,wall.b]){
  const len=G.length(p,end);if(len<d){d=len;q=G.point(end.x,end.y);}
 }
 if(original){
  const dx=Math.abs(q.x-original.x),dy=Math.abs(q.y-original.y);
  if(dx>dy*2.3)q.y=original.y;
  else if(dy>dx*2.3)q.x=original.x;
 }
 return q;
}
function nearestWall(p){
 let found=null,threshold=Math.max(.16,17/ui.view.scale);
 for(const wall of visibleModel().walls){
  const t=G.distancePointSegment(p,wall.a,wall.b);
  if(t.distance<threshold&&(!found||found.distance>t.distance))found={wall,distance:t.distance,t:t.t,foot:t.foot};
 }
 return found;
}
function hit2d(p){
 const m=visibleModel();
 for(let i=m.furniture.length-1;i>=0;i--)if(G.inPoly(p,G.furnitureCorners(m.furniture[i])))return {kind:"furniture",id:m.furniture[i].id};
 for(let i=m.measurements.length-1;i>=0;i--)if(G.distancePointSegment(p,m.measurements[i].a,m.measurements[i].b).distance<Math.max(.09,9/ui.view.scale))return {kind:"measurement",id:m.measurements[i].id};
 for(let i=m.openings.length-1;i>=0;i--){
  const o=m.openings[i],wall=m.walls.find(v=>v.id===o.wallId);if(!wall)continue;
  const len=G.length(wall.a,wall.b),hit=G.distancePointSegment(p,wall.a,wall.b);
  if(hit.distance<Math.max(.18,14/ui.view.scale)&&Math.abs(hit.t*len-o.offset)<=o.width/2+.08)return {kind:"opening",id:o.id};
 }
 const w=nearestWall(p);return w?{kind:"wall",id:w.wall.id}:null;
}
function selected3d(pos){
 for(let i=ui.hits.length-1;i>=0;i--){
  const h=ui.hits[i];if(G.inPoly(pos,h.poly))return {kind:h.kind,id:h.id};
 }
 return null;
}
function addOpening(which,p){
 const hit=nearestWall(p);
 if(!hit)return toast(t("請先畫牆，再按牆身加入")+(which==="door"?t("門"):t("窗")));
 const w=hit.wall,len=G.length(w.a,w.b);if(len<.45)return toast(t("牆太短，無法放置門窗"));
 const width=Math.min(which==="door"?.85:1.2,len*.8);
 const opening={id:G.uid(),type:which,wallId:w.id,floor:Number(w.floor)||0,offset:G.clamp(hit.t*len,width/2,len-width/2),
  width,height:which==="door"?Math.min(2.1,w.height):Math.min(1.1,w.height*.5),sill:which==="door"?0:Math.min(.9,w.height*.35)};
 if(!G.openingFits(opening,model().openings))return toast(t("這個位置已有門窗，請移到其他牆段（至少預留 5 cm）"));
 commit(()=>model().openings.push(opening));setSelection("opening",opening.id);
}
function joinedMove(original,updated,excludeId,originalWalls=null){
 const targets=originalWalls||visibleModel().walls;
 for(const base of targets){
  if(base.id===excludeId)continue;
  const live=model().walls.find(w=>w.id===base.id);if(!live)continue;
  for(const key of ["a","b"]){
   if(G.length(base[key],original)<.028)live[key]=G.point(updated.x,updated.y);
  }
 }
}
function hitWallHandle(p){
 if(ui.selected?.kind!=="wall")return null;
 const wall=getObject();if(!wall)return null;
 const threshold=Math.max(.13,15/ui.view.scale);
 if(G.length(p,wall.a)<threshold)return "a";
 if(G.length(p,wall.b)<threshold)return "b";
 return null;
}
function rectangleWalls(a,b){
 const x1=Math.min(a.x,b.x),x2=Math.max(a.x,b.x),y1=Math.min(a.y,b.y),y2=Math.max(a.y,b.y);
 const corners=[G.point(x1,y1),G.point(x2,y1),G.point(x2,y2),G.point(x1,y2)];
 const m=visibleModel(),segments=[];
 for(let i=0;i<4;i++){
  const a=corners[i],b=corners[(i+1)%4];
  const duplicate=m.walls.some(w=>
   (G.length(w.a,a)<.025&&G.length(w.b,b)<.025)||(G.length(w.a,b)<.025&&G.length(w.b,a)<.025));
  if(!duplicate)segments.push(G.wall([a.x,a.y],[b.x,b.y],{height:model().wallHeight,thickness:model().wallThickness,floor:ui.floor}));
 }
 return segments;
}
function changeStart(e){
 e.preventDefault();canvas.focus({preventScroll:true});
 const p=position(e);
 if(ui.mode==="3d"){
  const hit=ui.tool==="select"?selected3d(p):null;
  if(hit&&hit.kind==="furniture"){
   setSelection(hit.kind,hit.id);
   const obj=getObject(),floor=R.screenToFloor(canvas,model(),ui.orbit,p);
   if(obj&&!obj.locked&&floor){
    ui.drag={type:"furniture3d",origin:floor,start:p,before:snapshot(),original:JSON.parse(JSON.stringify(obj)),moved:false};
   }else{ui.drag=null;if(obj?.locked)toast(t("已鎖定，請先解除鎖定"));}
  }else if(hit){setSelection(hit.kind,hit.id);ui.drag={type:"3dselect",start:p};}
  else{ui.drag={type:"orbit",start:p,az:ui.orbit.azimuth,el:ui.orbit.elevation};}
  canvas.setPointerCapture(e.pointerId);return;
 }
 const w=world(e);let q=snapped(w,ui.pending&&e.shiftKey?ui.pending:null);
 ui.cursor=q;
 if(ui.tool==="room"){
  if(!ui.pending){ui.pending=q;refresh();return;}
  const a=ui.pending, b=q;
  if(Math.abs(b.x-a.x)<.4||Math.abs(b.y-a.y)<.4){toast(t("房間長及闊最少 0.4 米；請選較遠的對角"));return;}
  const walls=rectangleWalls(a,b);
  if(!walls.length){toast(t("這個房間已有四面牆"));ui.pending=null;tool("select");return;}
  commit(()=>model().walls.push(...walls));
  ui.pending=null;ui.cursor=null;ui.tool="select";refresh();
  toast(t("已建立 ")+$num(Math.abs(a.x-b.x))+" × "+$num(Math.abs(a.y-b.y))+t(" 米房間；下一步加門窗"));
  return;
 }
 if(ui.tool==="wall"){
  if(!ui.pending){ui.pending=q;ui.wallStart=q;ui.wallCount=0;refresh();return;}
  if(G.length(ui.pending,q)<.1){toast(t("牆最少需要 0.1 米"));return;}
  const m=model(),next=G.wall([ui.pending.x,ui.pending.y],[q.x,q.y],{height:m.wallHeight,thickness:m.wallThickness,floor:ui.floor});
  commit(()=>m.walls.push(next));
  ui.wallCount++;
  if(ui.wallCount>=3&&G.length(q,ui.wallStart)<.05){
   ui.pending=null;ui.wallStart=null;ui.wallCount=0;ui.tool="select";refresh();
   toast(t("已封閉房間輪廓；可加門窗及傢俬"));
  }else{ui.pending=q;render();}
  return;
 }
 if(ui.tool==="measure"){
  if(!ui.pending){ui.pending=q;render();return;}
  if(G.length(ui.pending,q)<.02){toast(t("請選兩個不同位置"));return;}
  const measurement={id:G.uid(),a:ui.pending,b:q,floor:ui.floor};
  commit(()=>model().measurements.push(measurement));ui.pending=null;setSelection("measurement",measurement.id);return;
 }
 if(ui.tool==="door"||ui.tool==="window"){addOpening(ui.tool,w);return;}
 if(ui.tool==="pan"){ui.drag={type:"pan",start:p,panX:ui.view.panX,panY:ui.view.panY};canvas.setPointerCapture(e.pointerId);return;}
 const endKey=hitWallHandle(w);
 const hit=endKey?{kind:"wall",id:ui.selected.id,endpoint:endKey}:hit2d(w);
 if(hit){
  setSelection(hit.kind,hit.id);
  const obj=getObject(),locked=hit.kind==="furniture"&&obj.locked;
  if(!locked&&hit.kind!=="measurement"){
   ui.drag={type:hit.endpoint?"wall-endpoint":hit.kind,endpoint:hit.endpoint||null,origin:w,start:p,before:snapshot(),original:JSON.parse(JSON.stringify(obj)),originalWalls:hit.kind==="wall"?JSON.parse(JSON.stringify(visibleModel().walls)):null,moved:false};
  }else if(locked)toast(t("已鎖定傢俬；先到屬性解除鎖定"));
 }else{setSelection(null,null);ui.drag={type:"pan",start:p,panX:ui.view.panX,panY:ui.view.panY};}
 canvas.setPointerCapture(e.pointerId);
}
function changeMove(e){
 const p=position(e);
 if(ui.mode==="3d"){
  if(ui.drag?.type==="orbit"){
   ui.orbit.azimuth=ui.drag.az+(p.x-ui.drag.start.x)*.008;
   ui.orbit.elevation=G.clamp(ui.drag.el+(p.y-ui.drag.start.y)*.006,.15,1.48);render();
  }else if(ui.drag?.type==="furniture3d"){
   const d=ui.drag,at=R.screenToFloor(canvas,model(),ui.orbit,p),obj=getObject();
   if(!at||!obj)return;
   if(Math.hypot(p.x-d.start.x,p.y-d.start.y)<4&&!d.moved)return;
   d.moved=true;
   const adj=v=>ui.snap?Math.round(v*20)/20:G.round(v,3);
   obj.x=adj(d.original.x+at.x-d.origin.x);
   obj.y=adj(d.original.y+at.y-d.origin.y);
   render();
  }
  return;
 }
 const w=world(e);ui.cursor=snapped(w,ui.pending&&e.shiftKey?ui.pending:null);
 const d=ui.drag;
 if(!d){render();return;}
 if(d.type==="pan"){
  ui.view.panX=d.panX+(p.x-d.start.x);ui.view.panY=d.panY+(p.y-d.start.y);render();return;
 }
 if(!d.original)return;
 if(Math.hypot(p.x-d.start.x,p.y-d.start.y)<3&&!d.moved)return;
 d.moved=true;
 const dx=w.x-d.origin.x,dy=w.y-d.origin.y;
 const adj=v=>ui.snap?Math.round(v*20)/20:G.round(v,3);
 const obj=getObject();if(!obj)return;
 if(d.type==="furniture"){
  obj.x=adj(d.original.x+dx);obj.y=adj(d.original.y+dy);
 }else if(d.type==="wall"){
  const nextA=G.point(adj(d.original.a.x+dx),adj(d.original.a.y+dy));
  const nextB=G.point(adj(d.original.b.x+dx),adj(d.original.b.y+dy));
  joinedMove(d.original.a,nextA,obj.id,d.originalWalls);
  joinedMove(d.original.b,nextB,obj.id,d.originalWalls);
  obj.a=nextA;obj.b=nextB;
 }else if(d.type==="wall-endpoint"){
  const next=G.point(adj(ui.cursor.x),adj(ui.cursor.y));
  const other=d.endpoint==="a"?obj.b:obj.a;
  if(G.length(next,other)<.1)return;
  joinedMove(d.original[d.endpoint],next,obj.id,d.originalWalls);
  obj[d.endpoint]=next;
 }else if(d.type==="opening"){
  const wall=model().walls.find(v=>v.id===obj.wallId);if(!wall)return;
  const hit=G.distancePointSegment(w,wall.a,wall.b),len=G.length(wall.a,wall.b);
  const newOffset=G.round(G.clamp(hit.t*len,obj.width/2,len-obj.width/2),2);
  if(G.openingFits({...obj,offset:newOffset},model().openings))obj.offset=newOffset;
 }
 render();
}
function preparePointer(e){
 if(e.pointerType!=="touch")return false;
 touches.set(e.pointerId,position(e));
 if(touches.size!==2)return false;
 const vals=[...touches.values()],a=vals[0],b=vals[1];
 const center={x:(a.x+b.x)/2,y:(a.y+b.y)/2},distance=Math.max(10,Math.hypot(a.x-b.x,a.y-b.y));
 pinch={distance,scale:ui.view.scale,panX:ui.view.panX,panY:ui.view.panY,center,
   anchor:R.toWorld(center,ui.view,canvas.clientWidth,canvas.clientHeight),
   orbitDistance:ui.orbit.distance};
 // Pinching is view manipulation, never an accidental edit.
 if(ui.drag?.moved&&ui.drag.before!==snapshot())record(ui.drag.before);
 ui.drag=null;ui.pending=null;ui.wallStart=null;ui.wallCount=0;
 canvas.setPointerCapture(e.pointerId);render();
 return true;
}
function updatePinch(e){
 if(e.pointerType!=="touch"||!touches.has(e.pointerId))return false;
 touches.set(e.pointerId,position(e));
 if(!pinch||touches.size!==2)return false;
 const vals=[...touches.values()],a=vals[0],b=vals[1];
 const dist=Math.max(10,Math.hypot(a.x-b.x,a.y-b.y));
 const center={x:(a.x+b.x)/2,y:(a.y+b.y)/2},factor=dist/pinch.distance;
 if(ui.mode==="3d")ui.orbit.distance=G.clamp(pinch.orbitDistance/factor,.35,Math.max(4,pinch.orbitDistance*2));
 else{
  const w=canvas.clientWidth,h=canvas.clientHeight;
  ui.view.scale=G.clamp(pinch.scale*factor,12,400);
  ui.view.panX=center.x-w/2-pinch.anchor.x*ui.view.scale;
  ui.view.panY=center.y-h/2-pinch.anchor.y*ui.view.scale;
 }
 render();return true;
}
function releasePointer(e){
 if(e?.pointerType==="touch"){touches.delete(e.pointerId);
  if(pinch){if(touches.size<2)pinch=null;ui.drag=null;render();return true;}
 }
 return false;
}
function changeEnd(e){
 if(releasePointer(e))return;
 if(ui.drag){
  const d=ui.drag;ui.drag=null;
  if(d.moved&&d.before!==snapshot()){record(d.before);}
  else render();
 }
}
function escapeAction(){
 if(ui.pending){ui.pending=null;ui.wallStart=null;ui.wallCount=0;refresh();toast(t("已結束當前繪製"));}
 else if(ui.selected){setSelection(null,null);$("inspector").classList.remove("open");}
 else tool("select");
}
function editNumber(prop,value){
 if(!ui.selected)return;
 const obj=getObject();if(!obj)return;
 const n=Number(value);if(String(value).trim()===""||!Number.isFinite(n))return toast(t("請輸入有效數字"));
 const type=ui.selected.kind;
 commit(()=>{
  if(type==="wall"){
   if(["ax","ay","bx","by"].includes(prop)){
    const key=prop[0]==="a"?"a":"b",axis=prop[1]==="x"?"x":"y";
    const candidate={a:G.point(obj.a.x,obj.a.y),b:G.point(obj.b.x,obj.b.y)};
    candidate[key][axis]=G.clamp(n,-1000,1000);
    if(G.length(candidate.a,candidate.b)<.1)throw new Error(t("牆長不可少於 0.1 米"));
    joinedMove(obj[key],candidate[key],obj.id);
    obj[key][axis]=candidate[key][axis];
   }
   else if(prop==="length"){
    if(n<.1||n>1000)throw new Error(t("牆長必須在 0.1 至 1000 米之間"));
    const len=G.length(obj.a,obj.b);
    const next=G.point(obj.a.x+(obj.b.x-obj.a.x)*n/len,obj.a.y+(obj.b.y-obj.a.y)*n/len);
    joinedMove(obj.b,next,obj.id);
    obj.b=next;
   }
   else if(prop==="height")obj.height=G.clamp(n,1.7,6);
   else if(prop==="thickness")obj.thickness=G.clamp(n,.05,.8);
   for(const opening of model().openings.filter(o=>o.wallId===obj.id)){
    const len=G.length(obj.a,obj.b);
    opening.width=Math.min(opening.width,len*.85);opening.offset=G.clamp(opening.offset,opening.width/2,len-opening.width/2);
    opening.sill=Math.min(opening.sill,Math.max(0,obj.height-.3));
    opening.height=Math.min(opening.height,Math.max(.3,obj.height-opening.sill));
   }
  }else if(type==="opening"){
   const wall=model().walls.find(v=>v.id===obj.wallId);
   if(!wall)return;
   const len=G.length(wall.a,wall.b);
   const candidate={...obj};
   if(prop==="width")candidate.width=G.clamp(n,.3,Math.min(3,len*.85));
   if(prop==="offset")candidate.offset=G.clamp(n,candidate.width/2,len-candidate.width/2);
   if(prop==="height")candidate.height=G.clamp(n,.3,wall.height-(candidate.sill||0));
   if(prop==="sill"&&candidate.type==="window")candidate.sill=G.clamp(n,.2,wall.height-.3);
   candidate.offset=G.clamp(candidate.offset,candidate.width/2,len-candidate.width/2);
   candidate.height=Math.min(candidate.height,wall.height-candidate.sill);
   if(!G.openingFits(candidate,model().openings))throw new Error(t("門窗位置重疊，請縮窄或移動至少 5 cm"));
   Object.assign(obj,candidate);
  }else if(type==="furniture"){
   if(["w","d","h"].includes(prop)){const max=prop==="h"?6:15;if(n<.1||n>max)throw new Error(t(max===6?"尺寸必須在 0.1 至 6 米之間":"尺寸必須在 0.1 至 15 米之間"));obj[prop]=n;}
   else if(["x","y"].includes(prop))obj[prop]=G.clamp(n,-1000,1000);
   else if(prop==="rotation")obj.rotation=G.round((((n%360)+360)%360)*Math.PI/180,7);
  }else if(type==="measurement"){
   if(["ax","ay","bx","by"].includes(prop)){const key=prop[0]==="a"?"a":"b",axis=prop[1]==="x"?"x":"y";obj[key][axis]=G.clamp(n,-1000,1000);}
  }
 });
}
function deleteSelected(){
 if(!ui.selected)return;const id=ui.selected.id,kind=ui.selected.kind;
 commit(()=>{
  const m=model(),arr=kind==="wall"?m.walls:kind==="opening"?m.openings:kind==="furniture"?m.furniture:m.measurements;
  const i=arr.findIndex(v=>v.id===id);if(i>=0)arr.splice(i,1);
  if(kind==="wall")m.openings=m.openings.filter(o=>o.wallId!==id);
 });
 ui.selected=null;$("inspector").classList.remove("open");refresh();toast(t("已刪除"));
}
function rotateSelected(){
 const o=getObject();if(!o||ui.selected.kind!=="furniture")return;
 commit(()=>o.rotation=G.round(o.rotation+Math.PI/2,7));
}
function duplicateSelected(){
 const o=getObject();if(!o||ui.selected.kind!=="furniture")return;
 const clone=JSON.parse(JSON.stringify(o));clone.id=G.uid();clone.name=o.name+t(" 副本");clone.x+=.3;clone.y+=.3;clone.locked=false;
 commit(()=>model().furniture.push(clone));setSelection("furniture",clone.id);
}
function addFurniture(type){
 const c=G.catalog.find(v=>v.type===type);if(!c)return;
 const center=R.toWorld({x:canvas.clientWidth/2,y:canvas.clientHeight/2},ui.view,canvas.clientWidth,canvas.clientHeight);
 const b=G.getBounds(visibleModel(),ui.floor);
 const where=ui.mode==="3d"?{x:b.cx,y:b.cy}:center;
 const f={id:G.uid(),type:c.type,name:c.name,x:G.round(where.x,2),y:G.round(where.y,2),w:c.w,d:c.d,h:c.h,rotation:0,locked:false,color:c.color,floor:ui.floor};
 commit(()=>model().furniture.push(f));ui.mode="2d";ui.tool="select";ui.pending=null;ui.wallStart=null;ui.drag=null;$("furnitureDialog").close();refresh();setSelection("furniture",f.id);toast(t("已加入")+c.name+t("；現在可直接拖動，或於屬性修改尺寸"));
}
function field(label,key,value,step=".01",min=null,max=null){
 return '<div class="field"><label for="prop-'+key+'">'+label+'</label><input id="prop-'+key+'" data-prop="'+key+'" type="number" inputmode="decimal" step="'+step+'"'+(min===null?"":' min="'+min+'"')+(max===null?"":' max="'+max+'"')+' value="'+esc(value)+'"></div>';
}
function row(label,value){return '<div class="mini-stat"><span>'+label+'</span><strong>'+esc(value)+'</strong></div>';}
function inspectorActions(extra=""){
 return '<div class="secondary-actions">'+extra+t('<button class="danger" data-act="delete">刪除物件</button></div>');
}
function renderInspector(){
 const box=$("inspectorContent"),m=model(),o=getObject(),s=ui.selected;
 if(!s||!o){
  box.innerHTML=t('<div class="empty-inspector"><div class="badge">100% 本機運行</div><p>按一下牆、門窗、傢俬或量度線，即可在此修改尺寸。</p><p>新增牆壁後，可在右邊直接輸入精確座標；所有尺寸標籤以 <b>米 (m)</b> 顯示。</p></div>')+
   t('<h3>圖則概覽</h3>')+row(t("樓層"),m.floorCount+t(" 層 · 目前 ")+floorLabel(ui.floor))+row(t("牆身"),m.walls.length+t(" 幅"))+row(t("門窗"),m.openings.length+t(" 個"))+row(t("傢俬"),m.furniture.length+t(" 件"))+row(t("量度線"),m.measurements.length+t(" 條"))+
   t('<button class="aside-action primary" data-act="furniture">＋ 新增傢俬</button><button class="aside-action ghost" data-act="projects">開啟／管理專案</button><button class="aside-action ghost" data-act="check">✓ 檢查圖則</button>');
  return;
 }
 let html="";
 if(s.kind==="wall"){
  html=t('<div class="item-summary"><strong>牆身</strong><small>長 ')+$num(G.length(o.a,o.b))+t(' m · 高 ')+$num(o.height)+' m</small></div>'+
    t('<h3>直接設定牆長</h3>')+field(t("牆長 (m)"),"length",$num(G.length(o.a,o.b)))+
    t('<h3>準確端點座標（米）</h3><div class="fields2">')+field(t("起點 X"),"ax",o.a.x)+field(t("起點 Y"),"ay",o.a.y)+field(t("終點 X"),"bx",o.b.x)+field(t("終點 Y"),"by",o.b.y)+'</div>'+
    t('<h3>牆身規格</h3><div class="fields2">')+field(t("牆高 (m)"),"height",o.height)+field(t("牆厚 (m)"),"thickness",o.thickness)+'</div>'+
    row(t("牆長"), $num(G.length(o.a,o.b))+" m")+row(t("已放門窗"),m.openings.filter(v=>v.wallId===o.id).length+t(" 個"))+
    t('<p class="tip">直接修改牆長，或拖動兩端黃色控制點。相接牆身會跟隨端點；移動整幅牆時也會保留連接。</p>')+inspectorActions();
 }else if(s.kind==="opening"){
  const w=m.walls.find(v=>v.id===o.wallId);
  html='<div class="item-summary"><strong>'+(o.type==="door"?t("門"):t("窗"))+t('</strong><small>附在 ')+$num(w?G.length(w.a,w.b):0)+t(' m 牆上</small></div>')+
    '<div class="fields2">'+field(t("闊度 (m)"),"width",o.width)+field(t("離起點 (m)"),"offset",o.offset)+field(t("高度 (m)"),"height",o.height)+(o.type==="window"?field(t("窗台離地 (m)"),"sill",o.sill):"")+'</div>'+
    row(t("開口左邊剩餘牆長"),w?$num(Math.max(0,o.offset-o.width/2))+" m":"—")+
    row(t("開口右邊剩餘牆長"),w?$num(Math.max(0,G.length(w.a,w.b)-o.offset-o.width/2))+" m":"—")+
    t('<p class="tip">「離起點」為開口<b>中心</b>到牆起點的距離。上面列出開口兩側剩餘牆長，方便預留門邊傢俬空間。</p>')+inspectorActions();
 }else if(s.kind==="furniture"){
  html='<div class="item-summary"><strong>'+esc(o.name)+'</strong><small>'+(o.locked?t("🔒 已鎖定位置"):t("可拖動及修改尺寸"))+'</small></div>'+
    t('<div class="field"><label for="objName">傢俬名稱</label><input id="objName" data-prop="name" maxlength="80" value="')+esc(o.name)+'"></div>'+
    t('<h3>實際尺寸（米）</h3><div class="fields3">')+field(t("闊 (m)"),"w",o.w)+field(t("深 (m)"),"d",o.d)+field(t("高 (m)"),"h",o.h)+'</div>'+
    t('<h3>擺放位置</h3><div class="fields2">')+field(t("中心 X"),"x",o.x)+field(t("中心 Y"),"y",o.y)+field(t("旋轉 (°)"),"rotation",G.round(o.rotation*180/Math.PI,1),"1")+
    t('<div class="field"><label for="colorInput">顏色</label><input id="colorInput" data-prop="color" type="color" value="')+esc(o.color)+'"></div></div>'+
    row(t("底面積"),G.round(o.w*o.d,2)+" m²")+
    t('<h3>傢俬與牆身的邊緣距離</h3>')+
    (m.walls.length?G.furnitureClearances(o,m.walls).slice(0,4).map(g=>row(t("第 ")+g.index+t(" 幅牆"), $num(g.distance)+" m")).join(""):t('<p class="tip">先畫牆，才可計算與牆身的距離。</p>'))+
    t('<p class="tip">顯示傢俬外邊緣與牆面的最短平面距離（包括牆厚），不包括門扇開啟及實際施工誤差。</p>')+
    t('<div class="secondary-actions"><button class="primary" data-act="move">✥ 在圖則上移動</button><button class="')+(o.locked?"lock":"ghost")+'" data-act="lock">'+(o.locked?t("🔓 解除鎖定"):t("🔒 鎖定傢俬"))+t('</button><button data-act="rotate">⟳ 旋轉 90°</button><button data-act="duplicate">複製</button></div>')+inspectorActions();
 }else{
  html=t('<div class="item-summary"><strong>量度線</strong><small>兩點直線距離</small></div>')+row(t("量度結果"),$num(G.length(o.a,o.b))+" m")+
    '<div class="fields2">'+field(t("起點 X"),"ax",o.a.x)+field(t("起點 Y"),"ay",o.a.y)+field(t("終點 X"),"bx",o.b.x)+field(t("終點 Y"),"by",o.b.y)+'</div>'+inspectorActions();
 }
 box.innerHTML=html;
}
function showDialog(id){const d=$(id);if(!d.open)d.showModal();}
function renderProjects(){
 const box=$("projectList");box.textContent="";
 for(const p of state.projects){
  const item=document.createElement("div");item.className="project-item"+(p.id===state.activeId?" current":"");
  const txt=document.createElement("div");txt.className="project-text";
  const name=document.createElement("strong");name.textContent=p.name;const sub=document.createElement("small");sub.textContent=(p.id===state.activeId?t("目前使用 · "):"")+p.data.walls.length+t(" 幅牆 · ")+p.data.furniture.length+t(" 件傢俬");
  txt.append(name,sub);const buttons=document.createElement("div");buttons.className="buttons";
  if(p.id!==state.activeId){const b=document.createElement("button");b.textContent=t("開啟");b.onclick=()=>switchProject(p.id);buttons.append(b);}
  const remove=document.createElement("button");remove.textContent=t("刪除");remove.className="danger";remove.disabled=state.projects.length===1;
  remove.onclick=()=>{if(!confirm(t("永久刪除「")+p.name+t("」？此操作無法復原，建議先匯出 JSON。")))return;
   state.projects=state.projects.filter(v=>v.id!==p.id);if(p.id===state.activeId){state.activeId=state.projects[0].id;clearUndo();fit();}
   saveNow();renderProjects();refresh();
  };
  buttons.append(remove);item.append(txt,buttons);box.append(item);
 }
}
function switchProject(id){
 if(!state.projects.some(p=>p.id===id))return;
 saveNow();state.activeId=id;clearUndo();saveNow();$("projectsDialog").close();fit();refresh();
 toast(t("已載入專案：")+active().name);
}
function createProject(demoMode=false){
 const p=newProject(demoMode?G.demo():G.empty());
 state.projects.push(p);state.activeId=p.id;clearUndo();saveNow();$("projectsDialog").close();fit();refresh();
 toast(demoMode?t("已新增示範圖則"):t("已新增空白平面圖"));
}
const templates=[{name:"小型一房住宅",width:6,depth:5,bedrooms:1,floors:1},{name:"兩房公寓",width:8,depth:6,bedrooms:2,floors:1},{name:"三房家庭住宅",width:10,depth:7,bedrooms:3,floors:1},{name:"雙層住宅",width:10,depth:8,bedrooms:3,floors:2}];
function showTemplates(){
 const list=$("templateList");list.replaceChildren();
 for(const preset of templates){
  const b=document.createElement("button"),name=document.createElement("strong"),details=document.createElement("small"),preview=document.createElement("canvas");
  name.textContent=t(preset.name);details.textContent=preset.width+" × "+preset.depth+" m · "+preset.floors+t(" 層");
  const m=generateHome({...preset,name:t(preset.name)}),w=200,h=112,bounds=G.getBounds(m,0),scale=Math.min(w/(bounds.width+1),h/(bounds.height+1));
  preview.width=w;preview.height=h;preview.style.width="100%";preview.style.borderRadius="8px";preview.setAttribute("aria-hidden","true");
  const c=preview.getContext("2d");if(c)R.draw({clientWidth:w,clientHeight:h},c,m,{mode:"2d",floor:0,view:{scale,panX:-bounds.cx*scale,panY:-bounds.cy*scale},dimensions:false,selected:null,tool:"select",orbit:ui.orbit});
  b.append(preview,name,details);b.onclick=()=>{const p=newProject(generateHome({...preset,name:t(preset.name)}));state.projects.push(p);state.activeId=p.id;clearUndo();ui.mode="2d";ui.tool="select";saveNow();$("templatesDialog").close();fit();refresh();};list.append(b);
 }
 $("projectsDialog").close();showDialog("templatesDialog");
}
function exportJSON(){
 saveNow();
 const data=G.fileExport(model()),blob=new Blob([data],{type:"application/json;charset=utf-8"});
 const link=document.createElement("a");link.href=URL.createObjectURL(blob);
 const safe=active().name.replace(/[^\w\u3400-\u9fff-]/g,"_").slice(0,45)||"floorplan";
 link.download="easy-home-3d-"+safe+".json";document.body.append(link);link.click();link.remove();
 setTimeout(()=>URL.revokeObjectURL(link.href),1200);toast(t("已下載 JSON 備份（包括傢俬及尺寸）"));
}
async function importJSON(e){
 const file=e.target.files&&e.target.files[0];e.target.value="";if(!file)return;
 try{
  if(file.size>3000000)throw new Error(t("檔案大小超過 3 MB"));
  const data=G.fileImport(await file.text());
  const p=newProject(data);state.projects.push(p);state.activeId=p.id;clearUndo();
  saveNow();$("projectsDialog").close();fit();refresh();toast(t("成功匯入：")+p.name);
 }catch(err){alert(t("匯入失敗：")+err.message+t("\n\n只接受 Easy3DHome 匯出的 JSON。"));}
}
function wizardOptions(){
 return {width:Number($("homeWidth").value),depth:Number($("homeDepth").value),
  bedrooms:Number($("homeBedrooms").value),floors:Number($("homeFloors").value),
  name:$("homeName").value.trim()||t("我的新居")};
}
function generateHome(o){return Number(o.floors)>1?G.house(o):G.home(o);}
function previewHome(){
 const o=wizardOptions();
 if(!Number.isFinite(o.width)||!Number.isFinite(o.depth)||o.width<4||o.width>24||o.depth<4||o.depth>24){$("homePreview").textContent=t("總長及總闊必須在 4 至 24 米之間");$("buildHome").disabled=true;return;}
 $("buildHome").disabled=false;
 const m=generateHome(o),issues=G.validate(m),errors=issues.filter(v=>v.severity==="error").length;
 $("homePreview").innerHTML='<div class="wizard-preview-grid">'+
  row(t("建築面積"),G.round(o.width*o.depth,2)+" m² × "+m.floorCount+t(" 層"))+row(t("睡房"),o.bedrooms+t(" 間"))+
  row(t("牆身"),m.walls.length+t(" 幅"))+row(t("門窗"),m.openings.length+t(" 個"))+row(t("傢俬"),m.furniture.length+t(" 件"))+'</div>'+
  '<p class="'+(errors?'tip bad':'tip good')+'">'+(errors?t("注意：")+errors+t(" 項尺寸問題，建議減少房間或加大尺寸。"):t("✓ 尺寸檢查通過；建立後可再逐項微調。"))+'</p>';
}
function buildHome(){
 const o=wizardOptions();
 if(!Number.isFinite(o.width)||!Number.isFinite(o.depth)||o.width<4||o.width>24||o.depth<4||o.depth>24)return toast(t("總長及總闊必須在 4 至 24 米之間"));
 const p=newProject(generateHome(o));
 state.projects.push(p);state.activeId=p.id;clearUndo();saveNow();$("homeDialog").close();fit();refresh();
 toast(t("已建立")+model().floorCount+t(" 層家居：")+model().walls.length+t(" 幅牆 · ")+model().openings.length+t(" 個門窗 · ")+model().furniture.length+t(" 件傢俬"));
}
function checkPlan(){
 const issues=G.validate(model()),box=$("checkList");
 if(!issues.length){
  box.innerHTML=t('<div class="check-ok"><strong>✓ 圖則檢查通過</strong><p>沒有發現門窗重疊、超出牆身、牆身斷開或傢俬碰撞。此檢查只作規劃輔助，不取代現場覆尺及專業結構評估。</p></div>');
 }else{
  box.innerHTML=issues.map(v=>'<div class="issue '+esc(v.severity)+'"><strong>'+(v.severity==="error"?t("必須修正"):t("建議檢查"))+'</strong><span>'+esc(v.message)+'</span></div>').join("")+
   t('<p class="tip">以上為平面幾何檢查；承重牆、消防及建築法規仍需合資格人士核對。</p>');
 }
 showDialog("checkDialog");
}
function floorLabel(i){return i===0?t("地下 G/F"):i+"/F";}
function floorCount(){return G.clamp(Math.round(Number(model().floorCount)||1),1,5);}
function renderFloors(){
 const count=floorCount(),box=$("floorTabs");box.textContent="";
 for(let i=0;i<count;i++){
  const b=document.createElement("button");b.className="floor-tab"+(i===ui.floor?" active":"");
  b.dataset.floor=String(i);b.textContent=floorLabel(i);b.setAttribute("aria-pressed",String(i===ui.floor));box.append(b);
 }
 $("removeFloor").disabled=count<=1;$("addFloor").disabled=count>=5;
}
function setFloor(i){
 const next=G.clamp(Math.round(i),0,floorCount()-1);
 ui.floor=next;ui.selected=null;ui.pending=null;ui.wallStart=null;ui.wallCount=0;ui.drag=null;
 $("inspector").classList.remove("open");if(ui.mode==="3d")fit3D();refresh();toast(t("已切換到")+floorLabel(next));
}
function addFloor(){
 const count=floorCount();if(count>=5)return toast(t("最多支援 5 層"));
 commit(()=>{model().floorCount=count+1;});setFloor(count);toast(t("已新增")+floorLabel(count));
}
function removeFloor(){
 const count=floorCount();if(count<=1)return toast(t("至少保留一層"));
 const top=count-1;
 if(!confirm(t("確定刪除")+floorLabel(top)+t("？該層所有牆、門窗、傢俬及量度都會移除。")))return;
 commit(()=>{
  const m=model();
  for(const key of ["walls","openings","furniture","measurements"])m[key]=m[key].filter(v=>(Number(v.floor)||0)!==top);
  m.floorCount=top;
 });
 ui.floor=Math.min(ui.floor,top-1);if(ui.mode==="3d")fit3D();refresh();toast(t("已刪除")+floorLabel(top));
}
function bind(){
 $("localeSelect").addEventListener("change",e=>{saveNow();if($("saveStatus").classList.contains("error")){e.target.value=window.EasyHomeI18n.locale;return;}const url=new URL(location.href);url.searchParams.set("lang",e.target.value);location.replace(url.href);});
 $("view2d").onclick=()=>mode("2d");$("view3d").onclick=()=>mode("3d");
 $("floorTabs").addEventListener("click",e=>{const b=e.target.closest("[data-floor]");if(b)setFloor(Number(b.dataset.floor));});
 $("addFloor").onclick=addFloor;$("removeFloor").onclick=removeFloor;
 document.querySelectorAll("[data-tool]").forEach(b=>b.onclick=()=>tool(b.dataset.tool));
 $("snapButton").onclick=()=>{ui.snap=!ui.snap;refresh();};
 $("dimsButton").onclick=()=>{ui.dimensions=!ui.dimensions;refresh();};
 $("undoButton").onclick=undo;$("redoButton").onclick=redo;
 $("fitButton").onclick=fit;$("fitBottom").onclick=fit;
 $("zoomIn").onclick=()=>zoom(1.25);$("zoomOut").onclick=()=>zoom(.8);
 $("projectsButton").onclick=()=>{renderProjects();showDialog("projectsDialog");};
 $("buildButton").onclick=()=>{previewHome();showDialog("homeDialog");};
 $("startBuild").onclick=()=>{previewHome();showDialog("homeDialog");};
 $("checkButton").onclick=checkPlan;
 $("homeWidth").addEventListener("input",previewHome);$("homeDepth").addEventListener("input",previewHome);
 $("homeBedrooms").addEventListener("change",previewHome);$("homeFloors").addEventListener("change",previewHome);
 $("buildHome").onclick=buildHome;
 $("exportButton").onclick=exportJSON;
 $("helpButton").onclick=()=>showDialog("helpDialog");
 $("addFurnitureButton").onclick=()=>showDialog("furnitureDialog");
 $("startWall").onclick=()=>tool("wall");
 $("startRoom").onclick=()=>tool("room");
 $("loadDemo").onclick=()=>{if(model().walls.length||model().furniture.length)return createProject(true);
  if(!confirm(t("載入一般示範平面圖？目前空白圖則會被示範取代。")))return;
  const before=snapshot();active().data=G.demo(active().name);record(before);fit();
 };
 $("propertiesButton").onclick=()=>$("inspector").classList.toggle("open");
 $("closeInspector").onclick=()=>$("inspector").classList.remove("open");
 $("templatesButton").onclick=showTemplates;
 $("newBlank").onclick=()=>createProject(false);$("newDemo").onclick=()=>createProject(true);
 $("importButton").onclick=()=>$("importFile").click();$("importFile").onchange=importJSON;
 document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>$((b.dataset.close)).close());
 $("projectName").addEventListener("change",e=>{
  const name=e.target.value.trim().slice(0,80)||t("我的平面圖");
  active().name=name;model().name=name;scheduleSave();refresh();
 });
 const cats=$("furnitureCatalog");for(const c of G.catalog){
  const btn=document.createElement("button"),icon=document.createElement("span"),label=document.createElement("strong"),size=document.createElement("small");
  icon.className="f-icon";icon.textContent=c.icon;label.textContent=c.name;
  size.textContent=$num(c.w)+" × "+$num(c.d)+" × "+$num(c.h)+" m";
  btn.append(icon,label,size);btn.onclick=()=>addFurniture(c.type);cats.append(btn);
 }
 $("inspectorContent").addEventListener("change",e=>{
  const p=e.target.dataset.prop;if(!p)return;
  if(p==="name"){const o=getObject();if(!o)return;commit(()=>o.name=e.target.value.slice(0,80)||t("傢俬"));}
  else if(p==="color"){const o=getObject();if(!o)return;commit(()=>o.color=e.target.value);}
  else{try{editNumber(p,e.target.value);}catch(err){toast(err.message);}}
  refresh();
 });
 $("inspectorContent").addEventListener("click",e=>{
  const b=e.target.closest("[data-act]");if(!b)return;
  const act=b.dataset.act;
  if(act==="delete")deleteSelected();
  else if(act==="lock"){const o=getObject();if(!o)return;commit(()=>o.locked=!o.locked);toast(o.locked?t("已鎖定，無法誤拖"):t("已解除鎖定"));}
  else if(act==="move"){ui.mode="2d";ui.tool="select";ui.pending=null;$("inspector").classList.remove("open");refresh();toast(t("請在平面圖直接拖動傢俬，亦可再次開啟屬性輸入座標"));}
  else if(act==="rotate")rotateSelected();
  else if(act==="duplicate")duplicateSelected();
  else if(act==="furniture")showDialog("furnitureDialog");
  else if(act==="projects"){renderProjects();showDialog("projectsDialog");}
  else if(act==="check")checkPlan();
 });
 canvas.addEventListener("pointerdown",e=>{if(preparePointer(e))return;changeStart(e);});
 canvas.addEventListener("pointermove",e=>{if(updatePinch(e))return;changeMove(e);});
 canvas.addEventListener("pointerup",changeEnd);
 canvas.addEventListener("pointercancel",changeEnd);
 canvas.addEventListener("wheel",e=>{e.preventDefault();zoom(e.deltaY<0?1.12:1/1.12,position(e));},{passive:false});
 document.addEventListener("keydown",e=>{
  if(["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName)||document.querySelector("dialog[open]"))return;
  if(e.key==="Escape"){escapeAction();return;}
  if(ui.selected?.kind==="furniture"&&["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(e.key)){
   const obj=getObject();if(obj&&!obj.locked){
    e.preventDefault();const delta=e.shiftKey?.25:.05;
    commit(()=>{
     if(e.key==="ArrowLeft")obj.x=G.round(obj.x-delta,3);
     if(e.key==="ArrowRight")obj.x=G.round(obj.x+delta,3);
     if(e.key==="ArrowUp")obj.y=G.round(obj.y-delta,3);
     if(e.key==="ArrowDown")obj.y=G.round(obj.y+delta,3);
    });return;
   }
  }
  if(e.key==="Delete"||e.key==="Backspace"){if(ui.selected){e.preventDefault();deleteSelected();}return;}
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="z"){e.preventDefault();e.shiftKey?redo():undo();return;}
  if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="y"){e.preventDefault();redo();}
 });
 window.addEventListener("beforeunload",saveNow);
 window.addEventListener("pagehide",()=>{if(saveTimer!==null)saveNow();});
 document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"&&saveTimer!==null)saveNow();});
 const resizeView=()=>{if(ui.mode==="3d")fit3D();render();};
 window.addEventListener("resize",resizeView);
 if(window.ResizeObserver)new ResizeObserver(resizeView).observe(canvas.parentElement);
}
function zoom(factor,at){
 if(ui.mode==="3d"){ui.orbit.distance=G.clamp(ui.orbit.distance/factor,.35,Math.max(4,ui.orbit.distance*1.25));render();return;}
 const w=canvas.clientWidth,h=canvas.clientHeight;
 const loc=at||{x:w/2,y:h/2},before=R.toWorld(loc,ui.view,w,h);
 ui.view.scale=G.clamp(ui.view.scale*factor,12,400);
 ui.view.panX=loc.x-w/2-before.x*ui.view.scale;
 ui.view.panY=loc.y-h/2-before.y*ui.view.scale;
 render();
}
bind();fit();refresh();saveNow();
})();
