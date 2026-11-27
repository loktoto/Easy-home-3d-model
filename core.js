/* Easy Home 3D — geometry and document format. MIT © 2026 loktoto */
(function(root){
"use strict";
const t=s=>root.EasyHomeI18n?root.EasyHomeI18n.t(s):s;
const SCHEMA="easy-home-3d", VERSION=1, EPS=1e-8;
const catalog=[
 {type:"sofa",name:t("梳化"),icon:"▰",w:2.1,d:0.88,h:0.85,color:"#6da9bf"},
 {type:"bed",name:t("雙人床"),icon:"▣",w:1.5,d:1.9,h:0.55,color:"#ad91d7"},
 {type:"single-bed",name:t("單人床"),icon:"▤",w:0.95,d:1.9,h:0.52,color:"#b19cd8"},
 {type:"table",name:t("飯枱"),icon:"▦",w:1.4,d:0.8,h:0.76,color:"#d4a66d"},
 {type:"chair",name:t("椅子"),icon:"▢",w:0.48,d:0.5,h:0.85,color:"#b7a18a"},
 {type:"desk",name:t("書枱"),icon:"▥",w:1.2,d:0.6,h:0.75,color:"#bd926b"},
 {type:"wardrobe",name:t("衣櫃"),icon:"▥",w:1.6,d:0.6,h:2.2,color:"#91a8c0"},
 {type:"shelf",name:t("書架"),icon:"▤",w:0.85,d:0.35,h:1.8,color:"#ba9971"},
 {type:"fridge",name:t("雪櫃"),icon:"▣",w:0.68,d:0.7,h:1.78,color:"#9aaebe"},
 {type:"kitchen",name:t("廚櫃"),icon:"▦",w:1.8,d:0.6,h:0.9,color:"#82aab5"},
 {type:"washer",name:t("洗衣機"),icon:"▧",w:0.6,d:0.6,h:0.85,color:"#95b8c9"},
 {type:"custom",name:t("自訂方塊"),icon:"◇",w:1,d:1,h:1,color:"#72bca6"}
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
function openingFits(candidate,existing,clearance=.05){
 if(!candidate||!Array.isArray(existing))return false;
 return existing.every(o=>{
  if(o.id===candidate.id||o.wallId!==candidate.wallId)return true;
  const c=Math.abs(num(o.offset)-num(candidate.offset));
  return c>=((num(o.width)+num(candidate.width))/2+clearance-1e-6);
 });
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
  const wall=walls[i];if((Number(wall.floor)||0)!==(Number(f.floor)||0))continue;let d=inPoly(wall.a,poly)||inPoly(wall.b,poly)?0:Infinity;
  for(let k=0;k<4;k++)d=Math.min(d,segmentDistance(poly[k],poly[(k+1)%4],wall.a,wall.b));
  result.push({wallId:wall.id,index:i+1,distance:round(Math.max(0,d-wall.thickness/2),3)});
 }
 return result.sort((a,b)=>a.distance-b.distance);
}
function furnitureIntersectsWall(f,w){
 const poly=furnitureCorners(f);
 if(inPoly(w.a,poly)||inPoly(w.b,poly))return true;
 for(let i=0;i<4;i++)if(segmentDistance(poly[i],poly[(i+1)%4],w.a,w.b)<Math.max(.02,w.thickness/2-.01))return true;
 return false;
}
function furnitureOverlap(a,b){
 const A=furnitureCorners(a),B=furnitureCorners(b),TOL=.01;
 for(const poly of [A,B])for(let i=0;i<4;i++){
  const p=poly[i],q=poly[(i+1)%4],axis={x:-(q.y-p.y),y:q.x-p.x};
  const norm=Math.hypot(axis.x,axis.y)||1;axis.x/=norm;axis.y/=norm;
  const pa=A.map(v=>v.x*axis.x+v.y*axis.y),pb=B.map(v=>v.x*axis.x+v.y*axis.y);
  if(Math.max(...pa)<=Math.min(...pb)+TOL||Math.max(...pb)<=Math.min(...pa)+TOL)return false;
 }
 return true;
}
function furnitureGap(a,b){
 if((Number(a.floor)||0)!==(Number(b.floor)||0))return Infinity;
 if(furnitureOverlap(a,b))return 0;
 const A=furnitureCorners(a),B=furnitureCorners(b);if(inPoly(A[0],B)||inPoly(B[0],A))return 0;
 let d=Infinity;for(let i=0;i<4;i++)for(let j=0;j<4;j++)d=Math.min(d,segmentDistance(A[i],A[(i+1)%4],B[j],B[(j+1)%4]));return d;
}
function clearanceWarnings(model,limit=.1){
 const out=[],f=model.furniture||[],walls=model.walls||[];
 for(const a of f){const nearest=furnitureClearances(a,walls)[0];if(nearest&&nearest.distance<limit)out.push({kind:"wall",id:a.id,name:a.name,distance:nearest.distance});}
 for(let i=0;i<f.length;i++)for(let j=i+1;j<f.length;j++){const d=furnitureGap(f[i],f[j]);if(d<limit)out.push({kind:"furniture",id:f[i].id,name:f[i].name+" / "+f[j].name,distance:d});}
 return out.sort((a,b)=>a.distance-b.distance);
}
function inPoly(pt,poly){
 let inside=false;
 for(let i=0,j=poly.length-1;i<poly.length;j=i++){
   const a=poly[i],b=poly[j];if((a.y>pt.y)!==(b.y>pt.y)&&pt.x<(b.x-a.x)*(pt.y-a.y)/(b.y-a.y)+a.x)inside=!inside;
 }
 return inside;
}
function empty(name){
 return {schema:SCHEMA,version:VERSION,name:name||t("我的平面圖"),wallHeight:2.7,wallThickness:0.13,floorCount:1,floorHeight:3,walls:[],openings:[],furniture:[],measurements:[]};
}
function wall(a,b,extra){return Object.assign({id:uid(),a:point(a[0],a[1]),b:point(b[0],b[1]),height:2.7,thickness:0.13,floor:0},extra||{});}
function demo(name){
 const m=empty(name||t("示範：6 × 4.5 米"));
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
function home(opts){
 const o=opts||{},W=clamp(num(o.width,8),4,24),D=clamp(num(o.depth,6),4,24);
 const bedrooms=clamp(Math.round(num(o.bedrooms,2)),1,3);
 const safeName=s=>typeof s==="string"?s.slice(0,80):t("我的新居");
 const m=empty(safeName(o.name));
 const splitY=round(D*.58,2),kitchenX=round(W*.32,2),bathX=round(W*.52,2);
 const putWall=(a,b)=>{const w=wall(a,b,{height:m.wallHeight,thickness:m.wallThickness});m.walls.push(w);return w;};
 const outer=[putWall([0,0],[W,0]),putWall([W,0],[W,D]),putWall([W,D],[0,D]),putWall([0,D],[0,0])];
 const divider=putWall([0,splitY],[W,splitY]);
 putWall([kitchenX,0],[kitchenX,splitY]);putWall([bathX,0],[bathX,splitY]);
 for(let i=1;i<bedrooms;i++)putWall([round(i*W/bedrooms,2),splitY],[round(i*W/bedrooms,2),D]);
 const putOpen=(w,type,offset,width,height,sill)=>{
  const len=length(w.a,w.b),ww=clamp(width,.3,Math.min(3,len*.82)),s=sill||0;
  const candidate={id:uid(),wallId:w.id,type,width:ww,offset:clamp(offset,ww/2,len-ww/2),
   height:clamp(height,.3,Math.max(.3,w.height-s)),sill:s};
  if(!openingFits(candidate,m.openings))return false;
  m.openings.push(candidate);return true;
 };
 const livingWin=clamp(W*.42,.9,W-.9);
 putOpen(outer[0],"door",W-.65,.92,2.05,0);
 putOpen(outer[0],"window",livingWin,Math.min(1.4,W*.3),1.1,.9);
 putOpen(outer[0],"window",kitchenX/2,Math.min(.9,kitchenX*.4),.9,.95);
 putOpen(outer[1],"window",splitY*.55,Math.min(1.2,splitY*.38),1.1,.9);
 for(let i=0;i<bedrooms;i++){
  const left=i*W/bedrooms,right=(i+1)*W/bedrooms,cx=(left+right)/2,roomW=right-left;
  putOpen(outer[2],"window",W-cx,Math.min(1.2,roomW*.48),1.1,.9);
  putOpen(divider,"door",cx,.82,2.05,0);
 }
 putOpen(m.walls[5],"door",splitY*.58,.78,2.05,0);
 putOpen(m.walls[6],"door",splitY*.42,.78,2.05,0);
 const put=(type,x,y,extra)=>{
  const c=catalog.find(v=>v.type===type)||catalog[catalog.length-1];
  m.furniture.push(Object.assign({id:uid(),type:c.type,name:c.name,x:round(x,2),y:round(y,2),
   w:c.w,d:c.d,h:c.h,rotation:0,locked:false,color:c.color},extra||{}));
 };
 const livingCx=(bathX+W)/2;
 if(W-bathX>3.2){
  put("sofa",livingCx,round(splitY*.78,2));
  put("table",livingCx,round(splitY*.38,2));
 }
 if(kitchenX>1.9)put("kitchen",round(kitchenX/2,2),.5);
 if(kitchenX>.9)put("fridge",Math.min(.5,kitchenX/2),round(splitY-.5,2));
 const bathCx=(kitchenX+bathX)/2;
 if(bathX-kitchenX>1.1){put("washer",bathCx,round(splitY-.45,2));put("custom",bathCx,.5,{name:t("浴室櫃"),w:.5,d:.45,h:.8});}
 for(let i=0;i<bedrooms;i++){
  const left=i*W/bedrooms,cx=(left+(i+1)*W/bedrooms)/2,roomW=W/bedrooms,bedW=Math.min(1.5,round(roomW-.35,2)),bedD=Math.min(1.9,round(D-splitY-.35,2));
  if(bedW>=1&&bedD>1.2){
   const extra={};if(bedW<1.49)extra.w=bedW;if(bedD<1.89)extra.d=bedD;
   put("bed",cx,round((splitY+D)/2,2),Object.keys(extra).length?extra:undefined);
  }
  if(roomW>3.5)put("shelf",round(left+.55,2),round(D-.35,2));
 }
 m.measurements.push({id:uid(),a:point(bathX+.2,.2),b:point(W-.2,round(splitY-.2,2))});
 return m;
}
function house(opts){
 const o=opts||{},W=clamp(num(o.width,10),4,24),D=clamp(num(o.depth,7),4,24);
 const floorHeight=clamp(num(o.floorHeight,3),2.4,4);
 const safeName=typeof o.name==="string"?o.name.slice(0,80):t("我的兩層屋");
 const ground=home({...o,name:safeName,bedrooms:clamp(Math.round(num(o.groundBedrooms,1)),1,2)});
 const upper=home({...o,name:safeName,bedrooms:clamp(Math.round(num(o.bedrooms,3)),1,3)});
 const m=empty(safeName);
 m.floorCount=2;m.floorHeight=floorHeight;m.wallHeight=ground.wallHeight;m.wallThickness=ground.wallThickness;
 const merge=(src,f)=>{for(const key of ["walls","openings","furniture","measurements"])for(const v of src[key]){v.floor=f;m[key].push(v);}};
 merge(ground,0);merge(upper,1);
 const sx=round(W-.65,2),stairD=Math.min(2.2,Math.max(1,round(D*.58-.7,2))),stairH=Math.min(2.6,floorHeight-.2);
 const xs=[sx,.65,round(W*.25,2),round(W*.5,2),round(W*.75,2)];
 const ys=[round(stairD/2+.25,2),round(D*.5,2),round(D-.7,2),.7,round(D*.29,2)];
 const fits=(f,x,y)=>{
  const o={x,y,w:.9,d:stairD,rotation:0};
  return !m.furniture.some(v=>v.floor===f&&furnitureOverlap(o,v))&&!m.walls.some(w=>w.floor===f&&furnitureIntersectsWall(o,w));
 };
 const pick=f=>{for(const x of xs)for(const y of ys)if(fits(f,x,y))return {x,y};return null;};
 let common=null;
 search:for(const x of xs)for(const y of ys)if(fits(0,x,y)&&fits(1,x,y)){common={x,y};break search;}
 const p0=common||pick(0),p1=common||pick(1);
 if(p0&&p1)for(const [f,label,at] of [[0,t("樓梯（地下）"),p0],[1,t("樓梯（一樓）"),p1]])m.furniture.push({id:uid(),type:"custom",name:label,
  x:at.x,y:at.y,w:.9,d:stairD,h:stairH,rotation:0,locked:false,color:"#d8b26f",floor:f});
 return m;
}
function validate(model){
 const issues=[],add=(severity,code,message,ids)=>issues.push({severity,code,message,ids:ids||[]});
 const m=model||{},walls=Array.isArray(m.walls)?m.walls:[],openings=Array.isArray(m.openings)?m.openings:[],furniture=Array.isArray(m.furniture)?m.furniture:[];
 const floorOf=v=>clamp(Math.round(num(v.floor,0)),0,Math.max(0,num(m.floorCount,1)-1));
 if(!walls.length)add("warning","empty",t("圖則尚沒有牆身，先畫第一間房。"));
 for(const w of walls)if(length(w.a,w.b)<.1)add("error","short-wall",t("有牆身短於 0.1 米。"),[w.id]);
 const ends=[];walls.forEach(w=>{ends.push({p:w.a,id:w.id,wall:w});ends.push({p:w.b,id:w.id,wall:w});});
 const dangling=new Set();
 for(const e of ends)if(!walls.some(w=>w.id!==e.id&&floorOf(w)===floorOf(e.wall)&&distancePointSegment(e.p,w.a,w.b).distance<.03))dangling.add(e.id);
 if(dangling.size)add("warning","open-end",dangling.size+t(" 幅牆有未接合的端點，房間可能未封閉。"),[...dangling]);
 for(const o of openings){
  const w=walls.find(v=>v.id===o.wallId);
  if(!w){add("error","orphan-opening",t("有門窗依附的牆身已被刪除。"),[o.id]);continue;}
  const len=length(w.a,w.b);
  if(o.offset-o.width/2<-.001||o.offset+o.width/2>len+.001)add("error","opening-outside",t("有門窗超出牆身範圍。"),[o.id]);
  if(num(o.sill)+num(o.height)>num(w.height,2.7)+.001)add("error","opening-too-tall",t("有門窗頂部高於牆身。"),[o.id]);
  for(const other of openings){
   if(other.id===o.id||other.wallId!==o.wallId||o.id>other.id)continue;
   if(!openingFits(o,[other]))add("error","opening-overlap",t("同一幅牆上的門窗重疊，或相距少於 5 cm。"),[o.id,other.id]);
  }
 }
 for(let i=0;i<furniture.length;i++)for(let j=i+1;j<furniture.length;j++)
  if(floorOf(furniture[i])===floorOf(furniture[j])&&furnitureOverlap(furniture[i],furniture[j]))add("warning","furniture-overlap","「"+furniture[i].name+t("」與「")+furniture[j].name+t("」在平面上重疊。"),[furniture[i].id,furniture[j].id]);
 for(const f of furniture)for(const w of walls)
  if(floorOf(f)===floorOf(w)&&furnitureIntersectsWall(f,w)){add("warning","furniture-wall","「"+f.name+t("」與牆身重疊。"),[f.id,w.id]);break;}
 return issues;
}
function sanitize(raw){
 if(!raw||typeof raw!=="object"||raw.schema!==SCHEMA||raw.version!==VERSION)throw new Error(t("不支援的圖則格式或版本"));
 if(!Array.isArray(raw.walls)||!Array.isArray(raw.furniture)||!Array.isArray(raw.openings)||!Array.isArray(raw.measurements))throw new Error(t("圖則資料不完整"));
 if(raw.walls.length>500||raw.furniture.length>500||raw.openings.length>250||raw.measurements.length>500)throw new Error(t("物件數量超出限制"));
 const safePos=(v)=>clamp(num(v),-1000,1000);
 const safePoint=p=>point(safePos(p&&p.x),safePos(p&&p.y));
 const safeName=(s,fallback)=>typeof s==="string"?s.slice(0,80):fallback;
 const m=empty(safeName(raw.name,t("匯入平面圖")));
 m.wallHeight=clamp(num(raw.wallHeight,2.7),1.7,6);
 m.wallThickness=clamp(num(raw.wallThickness,.13),.05,.8);
 m.floorCount=clamp(Math.round(num(raw.floorCount,1)),1,5);
 m.floorHeight=clamp(num(raw.floorHeight,3),2.4,4);
 const safeFloor=v=>clamp(Math.round(num(v&&v.floor,0)),0,m.floorCount-1);
 const seen=new Set();
 function id(v){const key=typeof v==="string"&&v.length<100?v:uid();if(seen.has(key)){const next=uid();seen.add(next);return next;}seen.add(key);return key;}
 m.walls=raw.walls.map(w=>({id:id(w.id),a:safePoint(w.a),b:safePoint(w.b),height:clamp(num(w.height,2.7),1.7,6),thickness:clamp(num(w.thickness,.13),.05,.8),floor:safeFloor(w)})).filter(w=>length(w.a,w.b)>=.1);
 const wallIds=new Set(m.walls.map(w=>w.id));
 m.openings=raw.openings.filter(o=>wallIds.has(o.wallId)&&["door","window"].includes(o.type)).map(o=>{
   const w=m.walls.find(v=>v.id===o.wallId),len=length(w.a,w.b);
   const width=clamp(num(o.width,.8),.3,Math.min(3,len*.9));
   const sill=o.type==="door"?0:clamp(num(o.sill,.9),.2,Math.max(.2,w.height-.3));
  const height=clamp(num(o.height,o.type==="door"?2.1:1.1),.3,Math.max(.3,w.height-sill));
  return {id:id(o.id),wallId:w.id,type:o.type,width,offset:clamp(num(o.offset,len/2),width/2,len-width/2),height,sill,floor:safeFloor(w)};
 }).filter(o=>o.width>=.3);
 m.furniture=raw.furniture.map(f=>{
   const c=catalog.find(v=>v.type===f.type)||catalog[catalog.length-1];
   return {id:id(f.id),type:c.type,name:safeName(f.name,c.name),x:safePos(f.x),y:safePos(f.y),w:clamp(num(f.w,c.w),.1,15),d:clamp(num(f.d,c.d),.1,15),h:clamp(num(f.h,c.h),.1,6),rotation:clamp(num(f.rotation),-Math.PI*100,Math.PI*100),locked:f.locked===true,color:/^#[0-9a-f]{6}$/i.test(f.color||"")?f.color:c.color,floor:safeFloor(f)};
 });
 m.measurements=raw.measurements.map(q=>({id:id(q.id),a:safePoint(q.a),b:safePoint(q.b),floor:safeFloor(q)}));
 if(raw.shopping)m.shopping=cleanShopping(raw.shopping);
 if(raw.budget)m.budget=cleanBudget(raw.budget);
 if(raw.traces)m.traces=cleanTraces(raw.traces,m.floorCount);
 if(raw.client)m.client=cleanClient(raw.client);
 if(raw.brand)m.brand=cleanBrand(raw.brand);
 return m;
}
function getBounds(model,floor){
 const on=v=>floor===undefined||floor===null||clamp(Math.round(num(v.floor,0)),0,4)===floor;
 const walls=(model.walls||[]).filter(on),furniture=(model.furniture||[]).filter(on),measurements=(model.measurements||[]).filter(on);
 const pts=[];for(const w of walls)pts.push(w.a,w.b);
 for(const f of furniture)pts.push(...furnitureCorners(f));
 for(const q of measurements)pts.push(q.a,q.b);
 if(!pts.length)return {minX:-4,maxX:4,minY:-3,maxY:3,width:8,height:6,cx:0,cy:0,empty:true};
 const xs=pts.map(p=>p.x),ys=pts.map(p=>p.y);
 const minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
 return {minX,maxX,minY,maxY,width:Math.max(.1,maxX-minX),height:Math.max(.1,maxY-minY),cx:(minX+maxX)/2,cy:(minY+maxY)/2,empty:false};
}
function fileExport(model){return JSON.stringify({format:SCHEMA,exportedAt:new Date().toISOString(),project:model},null,2);}
function fileImport(text){
 if(text.length>3000000)throw new Error(t("檔案超過 3 MB 限制"));
 const obj=JSON.parse(text);return sanitize(obj&&obj.format===SCHEMA?obj.project:obj);
}
const units=["m","cm","mm","ft-in"];
const factors={m:1,cm:100,mm:1000};
function unitValue(m,unit){
 if(unit==="ft-in"){const neg=m<0?"-":"",inches=Math.abs(m)/.0254;let feet=Math.floor(inches/12),rest=round(inches-feet*12,6);if(rest>=12){feet++;rest=0;}return neg+feet+"' "+rest+'"';}
 return String(round(m*(factors[unit]||1),9));
}
function parseUnit(value,unit){
 const s=String(value).trim();if(!s)return NaN;
 if(unit==="ft-in"){const match=s.match(/^([+-]?)(\d+)\s*'\s*(\d+(?:\.\d+)?)\s*"?$/);if(match){const inch=Number(match[3]);return inch<12?(match[1]==="-"?-1:1)*(Number(match[2])*12+inch)*.0254:NaN;}const n=Number(s);return Number.isFinite(n)?n*.3048:NaN;}
 return Number(s)/(factors[unit]||1);
}
function formatLength(m,unit="m"){if(unit==="ft-in"){const sign=m<0?"-":"",inch=Math.abs(m)/.0254;let feet=Math.floor(inch/12),rest=round(inch-feet*12,2);if(rest>=12){feet++;rest=0;}return sign+feet+"' "+rest+'"';}return (unit==="m"?round(m,2).toFixed(2):String(round(m*(factors[unit]||1),unit==="mm"?1:2)))+" "+unit;}
function formatArea(m,unit="m"){const f=unit==="ft-in"?1/.3048:(factors[unit]||1);return round(m*f*f,2)+" "+(unit==="ft-in"?"ft":unit)+"²";}
const currencies=["HKD","USD","EUR","GBP","CNY","TWD","JPY"];
function shoppingKey(f){return JSON.stringify([f.type,f.name,round(f.w,6),round(f.d,6),round(f.h,6)]);}
function cleanShopping(raw){
 const currency=currencies.includes(raw?.currency)?raw.currency:"HKD",prices=Object.create(null);
 if(raw?.prices&&typeof raw.prices==="object")for(const [k,v] of Object.entries(raw.prices).slice(0,500)){if(k.length<=400&&Number.isSafeInteger(v)&&v>=0&&v<=1000000000)prices[k]=v;}
 return {currency,prices};
}
function shoppingSummary(model){
 const store=cleanShopping(model.shopping),groups=new Map();
 for(const f of model.furniture){const key=shoppingKey(f);if(!groups.has(key))groups.set(key,{key,name:f.name,w:f.w,d:f.d,h:f.h,count:0,price:store.prices[key]??null});groups.get(key).count++;}
 const rows=[...groups.values()].map(r=>({...r,total:r.price===null?null:r.count*r.price}));
 return {currency:store.currency,rows,total:rows.reduce((n,r)=>n+(r.total??0),0),unpriced:rows.reduce((n,r)=>n+(r.price===null?r.count:0),0)};
}
function csvCell(v){let s=String(v??"");if(/^[\s]*[=+\-@\t\r]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';}
function cleanBudget(raw){return {rows:Array.isArray(raw?.rows)?raw.rows.slice(0,100).map(row=>({id:String(row.id||uid()).slice(0,100),name:String(row.name||"").slice(0,80),qty:clamp(num(row.qty,1),0,100000),cost:row.cost===null||row.cost===undefined?null:clamp(Math.round(num(row.cost)),0,1000000000)})):[],contingency:clamp(num(raw?.contingency,0),0,100)};}
function budgetSummary(m){const b=cleanBudget(m.budget),s=shoppingSummary(m),rows=b.rows.map(r=>({...r,total:r.cost===null?null:Math.round(r.qty*r.cost)})),work=rows.reduce((sum,r)=>sum+(r.total??0),0),subtotal=work+s.total,contingency=Math.round(subtotal*b.contingency/100);return {currency:s.currency,rows,work,furniture:s.total,unpriced:s.unpriced+rows.filter(r=>r.cost===null).length,subtotal,contingency,total:subtotal+contingency,rate:b.contingency};}
function cleanTraces(raw,floors=5){const list=[];for(const v of Array.isArray(raw)?raw.slice(0,5):[]){if(!v||!Number.isInteger(v.floor)||v.floor<0||v.floor>=floors||list.some(x=>x.floor===v.floor)||typeof v.data!=="string"||v.data.length>450000||!/^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(v.data)||!(v.w>0&&v.w<=1000&&v.h>0&&v.h<=1000))continue;list.push({floor:v.floor,data:v.data,w:num(v.w),h:num(v.h),x:clamp(num(v.x),-1000,1000),y:clamp(num(v.y),-1000,1000),opacity:clamp(num(v.opacity,.4),.05,1)});}return list;}
function cleanClient(raw){return {client:String(raw?.client||"").slice(0,100),reference:String(raw?.reference||"").slice(0,80),status:["draft","active","completed","archived"].includes(raw?.status)?raw.status:"draft",notes:String(raw?.notes||"").slice(0,1000)};}
function cleanBrand(raw){return {company:String(raw?.company||"").slice(0,80),title:String(raw?.title||"").slice(0,80),color:/^#[0-9a-f]{6}$/i.test(raw?.color||"")?raw.color:"#11685a",logo:typeof raw?.logo==="string"&&raw.logo.length<=160000&&/^data:image\/jpeg;base64,[A-Za-z0-9+/=]+$/.test(raw.logo)?raw.logo:""};}
const api={cleanBrand,cleanClient,cleanTraces,cleanBudget,budgetSummary,currencies,shoppingKey,cleanShopping,shoppingSummary,csvCell,furnitureGap,clearanceWarnings,units,unitValue,parseUnit,formatLength,formatArea,SCHEMA,VERSION,catalog,clamp,round,uid,point,length,midpoint,lerp,distancePointSegment,segmentsIntersect,segmentDistance,openingFits,furnitureCorners,furnitureClearances,furnitureOverlap,inPoly,empty,wall,demo,home,house,validate,sanitize,getBounds,fileExport,fileImport};
if(typeof module!=="undefined"&&module.exports)module.exports=api;
root.EasyHomeCore=api;
})(typeof window!=="undefined"?window:globalThis);
