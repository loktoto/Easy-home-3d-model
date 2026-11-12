/* Easy Home 3D — geometry and document format. MIT © 2026 loktoto */
(function(root){
"use strict";
const SCHEMA="easy-home-3d", VERSION=1, EPS=1e-8;
const catalog=[
 {type:"sofa",name:"梳化",icon:"▰",w:2.1,d:0.88,h:0.85,color:"#6da9bf"},
 {type:"bed",name:"雙人床",icon:"▣",w:1.5,d:1.9,h:0.55,color:"#ad91d7"},
 {type:"single-bed",name:"單人床",icon:"▤",w:0.95,d:1.9,h:0.52,color:"#b19cd8"},
 {type:"table",name:"飯枱",icon:"▦",w:1.4,d:0.8,h:0.76,color:"#d4a66d"},
 {type:"chair",name:"椅子",icon:"▢",w:0.48,d:0.5,h:0.85,color:"#b7a18a"},
 {type:"desk",name:"書枱",icon:"▥",w:1.2,d:0.6,h:0.75,color:"#bd926b"},
 {type:"wardrobe",name:"衣櫃",icon:"▥",w:1.6,d:0.6,h:2.2,color:"#91a8c0"},
 {type:"shelf",name:"書架",icon:"▤",w:0.85,d:0.35,h:1.8,color:"#ba9971"},
 {type:"fridge",name:"雪櫃",icon:"▣",w:0.68,d:0.7,h:1.78,color:"#9aaebe"},
 {type:"kitchen",name:"廚櫃",icon:"▦",w:1.8,d:0.6,h:0.9,color:"#82aab5"},
 {type:"washer",name:"洗衣機",icon:"▧",w:0.6,d:0.6,h:0.85,color:"#95b8c9"},
 {type:"custom",name:"自訂方塊",icon:"◇",w:1,d:1,h:1,color:"#72bca6"}
];
const num=(n,def=0)=>typeof n==="number"&&Number.isFinite(n)?n:def;
const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));
const round=(n,p=2)=>Math.round(n*Math.pow(10,p))/Math.pow(10,p);
const uid=()=>typeof crypto!=="undefined"&&crypto.randomUUID?crypto.randomUUID():"id-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2);
const point=(x,y)=>({x:num(x),y:num(y)});
const length=(a,b)=>Math.hypot(b.x-a.x,b.y-a.y);
const midpoint=(a,b)=>point((a.x+b.x)/2,(a.y+b.y)/2);
const lerp=(a,b,t)=>point(a.x+(b.x-a.x)*t,a.y+(b.y-a.y)*t);
function distancePointSegment(p,a,b){
 const vx=b.x-a.x,vy=b.y-a.y,den=vx*vx+vy*vy;
 const t=den<EPS?0:clamp(((p.x-a.x)*vx+(p.y-a.y)*vy)/den,0,1);
 const foot=lerp(a,b,t);
 return {distance:length(p,foot),t,foot};
}
function furnitureCorners(f){
 const c=Math.cos(f.rotation||0),s=Math.sin(f.rotation||0),hw=f.w/2,hd=f.d/2;
 return [[-hw,-hd],[hw,-hd],[hw,hd],[-hw,hd]].map(v=>point(f.x+v[0]*c-v[1]*s,f.y+v[0]*s+v[1]*c));
}
function segmentsIntersect(a,b,c,d){
 const cross=(p,q,r)=>(q.x-p.x)*(r.y-p.y)-(q.y-p.y)*(r.x-p.x);
 const o1=cross(a,b,c),o2=cross(a,b,d),o3=cross(c,d,a),o4=cross(c,d,b);
 if(o1*o2<0&&o3*o4<0)return true;
 return distancePointSegment(c,a,b).distance<EPS||
        distancePointSegment(d,a,b).distance<EPS||
        distancePointSegment(a,c,d).distance<EPS||
        distancePointSegment(b,c,d).distance<EPS;
}
function segmentDistance(a,b,c,d){
 if(segmentsIntersect(a,b,c,d))return 0;
 return Math.min(distancePointSegment(a,c,d).distance,distancePointSegment(b,c,d).distance,
   distancePointSegment(c,a,b).distance,distancePointSegment(d,a,b).distance);
}
function furnitureClearances(f,walls){
 const poly=furnitureCorners(f);const result=[];
 for(let i=0;i<walls.length;i++){
  const wall=walls[i];let d=Infinity;
  for(let k=0;k<4;k++)d=Math.min(d,segmentDistance(poly[k],poly[(k+1)%4],wall.a,wall.b));
  result.push({wallId:wall.id,index:i+1,distance:round(Math.max(0,d-wall.thickness/2),3)});
 }
 return result.sort((a,b)=>a.distance-b.distance);
}
function inPoly(pt,poly){
 let inside=false;
 for(let i=0,j=poly.length-1;i<poly.length;j=i++){
   const a=poly[i],b=poly[j];if((a.y>pt.y)!==(b.y>pt.y)&&pt.x<(b.x-a.x)*(pt.y-a.y)/(b.y-a.y)+a.x)inside=!inside;
 }
 return inside;
}
function empty(name){
 return {schema:SCHEMA,version:VERSION,name:name||"我的平面圖",wallHeight:2.7,wallThickness:0.13,walls:[],openings:[],furniture:[],measurements:[]};
}
function wall(a,b,extra){return Object.assign({id:uid(),a:point(a[0],a[1]),b:point(b[0],b[1]),height:2.7,thickness:0.13},extra||{});}
function demo(name){
 const m=empty(name||"示範：6 × 4.5 米");
 const coords=[[[0,0],[6,0]],[[6,0],[6,4.5]],[[6,4.5],[0,4.5]],[[0,4.5],[0,0]],[[2.5,0],[2.5,2.4]],[[0,2.4],[2.5,2.4]]];
 m.walls=coords.map(c=>wall(c[0],c[1]));
 m.openings=[
  {id:uid(),wallId:m.walls[0].id,type:"door",offset:4.65,width:0.9,height:2.1,sill:0},
  {id:uid(),wallId:m.walls[1].id,type:"window",offset:2.3,width:1.5,height:1.15,sill:0.9},
  {id:uid(),wallId:m.walls[4].id,type:"door",offset:1.1,width:0.78,height:2.1,sill:0}
 ];
 const furniture=(type,x,y,rot=0)=>{const c=catalog.find(v=>v.type===type);return {id:uid(),type:c.type,name:c.name,x,y,w:c.w,d:c.d,h:c.h,rotation:rot,locked:false,color:c.color};};
 m.furniture=[furniture("sofa",4.3,3.7),furniture("table",4.3,1.4),furniture("bed",1.1,1.2),furniture("wardrobe",0.35,3.55)];
 return m;
}
function sanitize(raw){
 if(!raw||typeof raw!=="object"||raw.schema!==SCHEMA||raw.version!==VERSION)throw new Error("不支援的圖則格式或版本");
 if(!Array.isArray(raw.walls)||!Array.isArray(raw.furniture)||!Array.isArray(raw.openings)||!Array.isArray(raw.measurements))throw new Error("圖則資料不完整");
 if(raw.walls.length>500||raw.furniture.length>500||raw.openings.length>250||raw.measurements.length>500)throw new Error("物件數量超出限制");
 const safePos=(v)=>clamp(num(v),-1000,1000);
 const safePoint=p=>point(safePos(p&&p.x),safePos(p&&p.y));
 const safeName=(s,fallback)=>typeof s==="string"?s.slice(0,80):fallback;
 const m=empty(safeName(raw.name,"匯入平面圖"));
 m.wallHeight=clamp(num(raw.wallHeight,2.7),1.7,6);
 m.wallThickness=clamp(num(raw.wallThickness,.13),.05,.8);
 const seen=new Set();
 function id(v){const key=typeof v==="string"&&v.length<100?v:uid();if(seen.has(key)){const next=uid();seen.add(next);return next;}seen.add(key);return key;}
 m.walls=raw.walls.map(w=>({id:id(w.id),a:safePoint(w.a),b:safePoint(w.b),height:clamp(num(w.height,2.7),1.7,6),thickness:clamp(num(w.thickness,.13),.05,.8)})).filter(w=>length(w.a,w.b)>=.1);
 const wallIds=new Set(m.walls.map(w=>w.id));
 m.openings=raw.openings.filter(o=>wallIds.has(o.wallId)&&["door","window"].includes(o.type)).map(o=>{
   const w=m.walls.find(v=>v.id===o.wallId),len=length(w.a,w.b);
   const width=clamp(num(o.width,.8),.3,Math.min(3,len*.9));
   return {id:id(o.id),wallId:w.id,type:o.type,width,offset:clamp(num(o.offset,len/2),width/2,len-width/2),height:clamp(num(o.height,o.type==="door"?2.1:1.1),.3,w.height),sill:o.type==="door"?0:clamp(num(o.sill,.9),.2,Math.max(.2,w.height-.3))};
 }).filter(o=>o.width>=.3);
 m.furniture=raw.furniture.map(f=>{
   const c=catalog.find(v=>v.type===f.type)||catalog[catalog.length-1];
   return {id:id(f.id),type:c.type,name:safeName(f.name,c.name),x:safePos(f.x),y:safePos(f.y),w:clamp(num(f.w,c.w),.1,15),d:clamp(num(f.d,c.d),.1,15),h:clamp(num(f.h,c.h),.1,6),rotation:clamp(num(f.rotation),-Math.PI*100,Math.PI*100),locked:f.locked===true,color:/^#[0-9a-f]{6}$/i.test(f.color||"")?f.color:c.color};
 });
 m.measurements=raw.measurements.map(q=>({id:id(q.id),a:safePoint(q.a),b:safePoint(q.b)}));
 return m;
}
function getBounds(model){
 const pts=[];for(const w of model.walls)pts.push(w.a,w.b);
 for(const f of model.furniture)pts.push(...furnitureCorners(f));
 for(const q of model.measurements)pts.push(q.a,q.b);
 if(!pts.length)return {minX:-4,maxX:4,minY:-3,maxY:3,width:8,height:6,cx:0,cy:0,empty:true};
 const xs=pts.map(p=>p.x),ys=pts.map(p=>p.y);
 const minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
 return {minX,maxX,minY,maxY,width:Math.max(.1,maxX-minX),height:Math.max(.1,maxY-minY),cx:(minX+maxX)/2,cy:(minY+maxY)/2,empty:false};
}
function fileExport(model){return JSON.stringify({format:SCHEMA,exportedAt:new Date().toISOString(),project:model},null,2);}
function fileImport(text){
 if(text.length>3000000)throw new Error("檔案超過 3 MB 限制");
 const obj=JSON.parse(text);return sanitize(obj&&obj.format===SCHEMA?obj.project:obj);
}
const api={SCHEMA,VERSION,catalog,clamp,round,uid,point,length,midpoint,lerp,distancePointSegment,segmentsIntersect,segmentDistance,furnitureCorners,furnitureClearances,inPoly,empty,wall,demo,sanitize,getBounds,fileExport,fileImport};
if(typeof module!=="undefined"&&module.exports)module.exports=api;
root.EasyHomeCore=api;
})(typeof window!=="undefined"?window:globalThis);
