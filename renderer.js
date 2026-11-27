/* Easy3DHome — offline canvas renderer (2D + perspective 3D). MIT © 2026 loktoto */
(function(root){
"use strict";
const G=root.EasyHomeCore;
const light=()=>document.documentElement.dataset.theme==="light";
const C=(dark,day)=>light()?day:dark;
const rgba=(hex,alpha)=>{const v=parseInt((hex||"#82a8bb").replace("#",""),16);return "rgba("+((v>>16)&255)+","+((v>>8)&255)+","+(v&255)+","+alpha+")";};
function line(ctx,a,b,color,width=1,dash=[]){
 ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.setLineDash(dash);ctx.stroke();ctx.setLineDash([]);
}
function pill(ctx,text,x,y,fg=C("#e9f2ff","#193c35"),bg=C("#173049","#e2eee6")){
 ctx.font="700 11px system-ui,sans-serif";const w=ctx.measureText(text).width+13;
 ctx.fillStyle=bg;ctx.beginPath();ctx.roundRect(x-w/2,y-10,w,19,5);ctx.fill();
 ctx.fillStyle=fg;ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(text,x,y);
}
function planLabelLayout(ctx,w,h,labels,reserved){
 const placed=[],occupied=reserved.slice();
 const overlap=(a,b)=>a.x<b.x+b.w+3&&a.x+a.w+3>b.x&&a.y<b.y+b.h+3&&a.y+a.h+3>b.y;
 ctx.font="700 11px system-ui,sans-serif";
 for(const q of labels){
  const width=ctx.measureText(q.text).width+13,height=19;
  let chosen=null;
  for(let radius=0;radius<=240&&!chosen;radius+=22){
   const angles=radius===0?[0]:[0,Math.PI,Math.PI/2,-Math.PI/2,Math.PI/4,-Math.PI/4,3*Math.PI/4,-3*Math.PI/4];
   for(const angle of angles){const x=q.x+Math.cos(angle)*radius,y=q.y+Math.sin(angle)*radius;const b={x:x-width/2,y:y-10,w:width,h:height};
    if(b.x>=4&&b.y>=4&&b.x+b.w<=w-4&&b.y+b.h<=h-4&&!occupied.some(o=>overlap(b,o))){chosen={...q,x,y,rect:b,anchorX:q.x,anchorY:q.y};break;}}
  }
  if(!chosen){for(let y=12;y<h-12&&!chosen;y+=23)for(let x=width/2+5;x<w-width/2-4;x+=width+5){const b={x:x-width/2,y:y-10,w:width,h:height};if(!occupied.some(o=>overlap(b,o))){chosen={...q,x,y,rect:b,anchorX:q.x,anchorY:q.y};break;}}}
  if(chosen){occupied.push(chosen.rect);placed.push(chosen);}
 }
 return placed;
}
function grid(ctx,w,h,view,toScreen){
 const s=view.scale;let step=s>105?.25:s>48?.5:s>24?1:2;
 const min=toWorld({x:0,y:0},view,w,h),max=toWorld({x:w,y:h},view,w,h);
 const a=Math.floor(min.x/step)*step,b=Math.ceil(max.x/step)*step,c=Math.floor(min.y/step)*step,d=Math.ceil(max.y/step)*step;
 ctx.strokeStyle=C("#203249","#dce5dd");ctx.lineWidth=1;ctx.beginPath();
 for(let x=a;x<=b+.00001;x+=step){const p=toScreen({x,y:0});ctx.moveTo(Math.round(p.x)+.5,0);ctx.lineTo(Math.round(p.x)+.5,h);}
 for(let y=c;y<=d+.00001;y+=step){const p=toScreen({x:0,y});ctx.moveTo(0,Math.round(p.y)+.5);ctx.lineTo(w,Math.round(p.y)+.5);}
 ctx.stroke();
 const origin=toScreen({x:0,y:0});line(ctx,{x:origin.x,y:0},{x:origin.x,y:h},C("#2a4761","#aabdb2"),1);line(ctx,{x:0,y:origin.y},{x:w,y:origin.y},C("#2a4761","#aabdb2"),1);
}
function toWorld(p,view,w,h){return G.point((p.x-w/2-view.panX)/view.scale,(p.y-h/2-view.panY)/view.scale);}
function paint2D(ctx,w,h,model,opts){
 const view=opts.view,sc=view.scale;
 const floor=opts.floor===undefined?0:opts.floor;
 const on=v=>G.clamp(Math.round(Number(v.floor)||0),0,4)===floor;
 const walls=model.walls.filter(on),openings=model.openings.filter(on),furniture=model.furniture.filter(on),measurements=model.measurements.filter(on);
 const S=p=>({x:w/2+view.panX+p.x*sc,y:h/2+view.panY+p.y*sc});
 grid(ctx,w,h,view,S);
 const chosen=opts.selected||{}, dims=opts.dimensions!==false, bounds=G.getBounds(model,floor);
 const labels=[],reserved=[];
 const annotate=(text,x,y,fg)=>opts.avoidLabelOverlap?labels.push({text,x,y,fg}):pill(ctx,text,x,y,fg);
 const wallOpening=new Map();
 for(const o of openings){const list=wallOpening.get(o.wallId)||[];list.push(o);wallOpening.set(o.wallId,list);}
 for(const wall of walls){
  const a=S(wall.a),b=S(wall.b),len=G.length(wall.a,wall.b);
  if(len<.01)continue;
  const intervals=(wallOpening.get(wall.id)||[]).map(o=>({start:G.clamp((o.offset-o.width/2)/len,0,1),end:G.clamp((o.offset+o.width/2)/len,0,1)})).sort((a,b)=>a.start-b.start);
  let cursor=0;const col=chosen.kind==="wall"&&chosen.id===wall.id?C("#ffcb7f","#a35b00"):C("#ddebf4","#344e46");
  for(const interval of intervals){if(interval.start>cursor){line(ctx,S(G.lerp(wall.a,wall.b,cursor)),S(G.lerp(wall.a,wall.b,interval.start)),col,Math.max(4,wall.thickness*sc));}cursor=Math.max(cursor,interval.end);}
  if(cursor<1)line(ctx,S(G.lerp(wall.a,wall.b,cursor)),b,col,Math.max(4,wall.thickness*sc));
  if(chosen.kind==="wall"&&chosen.id===wall.id){for(const p of [a,b]){ctx.fillStyle=C("#ffcb7f","#a35b00");ctx.beginPath();ctx.arc(p.x,p.y,7,0,Math.PI*2);ctx.fill();}}
  if(dims){const cx=(a.x+b.x)/2,cy=(a.y+b.y)/2,nx=-(b.y-a.y)/Math.max(1,Math.hypot(b.x-a.x,b.y-a.y)),ny=(b.x-a.x)/Math.max(1,Math.hypot(b.x-a.x,b.y-a.y));annotate(G.round(len,2).toFixed(2)+" m",cx+nx*18,cy+ny*18);}
 }
 for(const o of openings){
  const wall=walls.find(v=>v.id===o.wallId);if(!wall)continue;
  const len=G.length(wall.a,wall.b);if(len<.1)continue;
  const a=S(G.lerp(wall.a,wall.b,(o.offset-o.width/2)/len)),b=S(G.lerp(wall.a,wall.b,(o.offset+o.width/2)/len)),mid={x:(a.x+b.x)/2,y:(a.y+b.y)/2};
  const c=chosen.kind==="opening"&&chosen.id===o.id?C("#ffd17e","#9a5600"):o.type==="window"?C("#6ee6ec","#007b87"):C("#ebad68","#986020");
  if(o.type==="window"){
   line(ctx,a,b,c,6);line(ctx,a,b,C("#18314d","#e1f1e9"),2);
  }else{
   line(ctx,a,b,c,2,[4,4]);
   const dx=b.x-a.x,dy=b.y-a.y,midWall=G.midpoint(wall.a,wall.b);
   const nx=-(wall.b.y-wall.a.y),ny=wall.b.x-wall.a.x;
   const sign=(bounds.cx-midWall.x)*nx+(bounds.cy-midWall.y)*ny>=0?1:-1;
   const hinge=a,edge={x:a.x-dy*sign,y:a.y+dx*sign};
   line(ctx,hinge,edge,c,1);
   ctx.beginPath();ctx.arc(hinge.x,hinge.y,Math.hypot(dx,dy),Math.atan2(edge.y-hinge.y,edge.x-hinge.x),Math.atan2(b.y-hinge.y,b.x-hinge.x),true);ctx.strokeStyle=rgba(C("#ebad68","#986020"),.5);ctx.lineWidth=1;ctx.stroke();
  }
  if(dims&&sc>35)annotate(G.round(o.width,2).toFixed(2)+" m",mid.x,mid.y-12,c);
 }
 for(const f of furniture){
  const corners=G.furnitureCorners(f).map(S);
  ctx.beginPath();corners.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();
  ctx.fillStyle=rgba(f.color,.62);ctx.fill();ctx.strokeStyle=chosen.kind==="furniture"&&chosen.id===f.id?C("#ffdd89","#9a5600"):f.locked?C("#edca96","#745322"):C("#b9dbea","#355b52");ctx.lineWidth=chosen.id===f.id&&chosen.kind==="furniture"?3:1.5;ctx.stroke();
  const center=S(f);ctx.font="700 12px system-ui,sans-serif";ctx.textBaseline="middle";ctx.textAlign="center";ctx.fillStyle=C("#f5f9ff","#172b2a");
  if(Math.min(f.w,f.d)*sc>39){const name=(f.locked?"🔒 ":"")+f.name.slice(0,10),size=G.round(f.w,2)+" × "+G.round(f.d,2)+" m";ctx.fillText(name,center.x,center.y-6);if(dims)ctx.fillText(size,center.x,center.y+11);if(opts.avoidLabelOverlap){const width=Math.max(ctx.measureText(name).width,dims?ctx.measureText(size).width:0)+8;reserved.push({x:center.x-width/2,y:center.y-16,w:width,h:36});}}
  else ctx.fillText(f.locked?"🔒":"▣",center.x,center.y);
 }
 for(const q of measurements){
  const a=S(q.a),b=S(q.b),active=chosen.kind==="measurement"&&chosen.id===q.id;
  line(ctx,a,b,active?C("#ffd17e","#9a5600"):C("#7ee5bb","#12684d"),1.6,[4,4]);
  for(const p of [a,b]){ctx.fillStyle=active?C("#ffd17e","#9a5600"):C("#8fe7c8","#12684d");ctx.beginPath();ctx.arc(p.x,p.y,3,0,Math.PI*2);ctx.fill();}
  annotate(G.round(G.length(q.a,q.b),2).toFixed(2)+" m",(a.x+b.x)/2,(a.y+b.y)/2-12,C("#92e4ca","#075c45"));
 }
 if(opts.avoidLabelOverlap){for(const q of planLabelLayout(ctx,w,h,labels,reserved)){if(Math.hypot(q.x-q.anchorX,q.y-q.anchorY)>24)line(ctx,{x:q.anchorX,y:q.anchorY},{x:q.x,y:q.y},"#7896ac",.8);pill(ctx,q.text,q.x,q.y,q.fg);}}
 if(opts.pending&&opts.cursor){
  const a=S(opts.pending),b=S(opts.cursor);
  if(opts.tool==="room"){
   const x=Math.min(a.x,b.x),y=Math.min(a.y,b.y),rw=Math.abs(a.x-b.x),rh=Math.abs(a.y-b.y);
   ctx.fillStyle="#479cdb24";ctx.strokeStyle=C("#86ceff","#12684d");ctx.lineWidth=2;ctx.setLineDash([8,5]);
   ctx.fillRect(x,y,rw,rh);ctx.strokeRect(x,y,rw,rh);ctx.setLineDash([]);
   const width=G.round(Math.abs(opts.pending.x-opts.cursor.x),2).toFixed(2);
   const depth=G.round(Math.abs(opts.pending.y-opts.cursor.y),2).toFixed(2);
   pill(ctx,width+" m",x+rw/2,y-13);pill(ctx,depth+" m",x-28,y+rh/2);
   pill(ctx,G.round(Math.abs(opts.pending.x-opts.cursor.x)*Math.abs(opts.pending.y-opts.cursor.y),2)+" m²",x+rw/2,y+rh/2,"#e0fff1","#215c50");
  }else{
   line(ctx,a,b,C("#7dc3ff","#12684d"),2,[7,5]);
   pill(ctx,G.round(G.length(opts.pending,opts.cursor),2).toFixed(2)+" m",(a.x+b.x)/2,(a.y+b.y)/2-15);
  }
  ctx.beginPath();ctx.arc(a.x,a.y,5,0,Math.PI*2);ctx.fillStyle="#b2e2ff";ctx.fill();
 }
 if(opts.cursor&&(opts.tool==="wall"||opts.tool==="room")&&!opts.pending){
  const p=S(opts.cursor);line(ctx,{x:p.x-7,y:p.y},{x:p.x+7,y:p.y},"#a6d9ff");line(ctx,{x:p.x,y:p.y-7},{x:p.x,y:p.y+7},"#a6d9ff");
 }
}
function projectFactory(w,h,bounds,opts){
 const orbit=opts.orbit||{azimuth:-.65,elevation:.82,distance:1};
 const cx=bounds.cx,cy=bounds.cy,span=Math.max(bounds.width,bounds.height,4);
 const dist=span*1.85*orbit.distance+4,el=G.clamp(orbit.elevation,.15,1.48),az=orbit.azimuth;
 const targetZ=Number.isFinite(orbit.targetZ)?orbit.targetZ:1;
 const camera=[cx+dist*Math.cos(el)*Math.sin(az),cy+dist*Math.cos(el)*Math.cos(az),targetZ+dist*Math.sin(el)+1];
 const target=[cx,cy,targetZ];
 function normalize(a){const m=Math.hypot(...a)||1;return a.map(v=>v/m);}
 function cross(a,b){return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];}
 function dot(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2];}
 const forward=normalize(target.map((v,i)=>v-camera[i])),right=normalize(cross(forward,[0,0,1])),up=cross(right,forward);
 const f=Math.min(w,h)*1.42;
 const project=function(p){
  const q=[p[0]-camera[0],p[1]-camera[1],p[2]-camera[2]];
  const z=dot(q,forward);
  return {x:w/2+f*dot(q,right)/Math.max(.1,z),y:h/2-f*dot(q,up)/Math.max(.1,z),z,valid:z>.1};
 };
 project.toFloor=function(pos){
  const nx=(pos.x-w/2)/f,ny=(h/2-pos.y)/f;
  const dir=forward.map((v,i)=>v+nx*right[i]+ny*up[i]);
  if(dir[2]>=-.005)return null;
  const t=-camera[2]/dir[2];
  if(!Number.isFinite(t)||t<0)return null;
  return G.point(camera[0]+dir[0]*t,camera[1]+dir[1]*t);
 };
 return project;
}
function screenToFloor(canvas,model,orbit,pos){
 const project=projectFactory(canvas.clientWidth,canvas.clientHeight,G.getBounds(model),{orbit});
 return project.toFloor(pos);
}
function polygon(ctx,pts,fill,stroke="#284257",width=1){
 if(pts.length<3||pts.some(p=>!p.valid))return;
 ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();
 ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=width;ctx.stroke();}
}
function boxFaces(model,project,items,box){
 const c=Math.cos(box.rot||0),s=Math.sin(box.rot||0),hx=box.w/2,hy=box.d/2;
 const XY=[[-hx,-hy],[hx,-hy],[hx,hy],[-hx,hy]].map(v=>[box.x+v[0]*c-v[1]*s,box.y+v[0]*s+v[1]*c]);
 const pts=XY.map(v=>project([v[0],v[1],box.z])).concat(XY.map(v=>project([v[0],v[1],box.z+box.h])));
 const faces=[[0,1,5,4],[1,2,6,5],[2,3,7,6],[3,0,4,7],[4,5,6,7]];
 const alpha=box.alpha===undefined?1:box.alpha;
 const colors=[rgba(box.color,.86*alpha),rgba(box.color,.73*alpha),rgba(box.color,.8*alpha),rgba(box.color,.68*alpha),box.kind==="wall"?"#dce8f1":rgba(box.color,alpha)];
 for(let i=0;i<faces.length;i++){
   const poly=faces[i].map(j=>pts[j]);
   const avg=poly.reduce((v,p)=>v+p.z,0)/poly.length;
   items.push({poly,depth:avg,color:colors[i],kind:box.kind,id:box.id});
 }
}
function boxOnWall(model,proj,faces,wall,t0,t1,z,h){
 if(t1<=t0+.0001||h<=.01)return;
 const a=G.lerp(wall.a,wall.b,t0),b=G.lerp(wall.a,wall.b,t1);
 boxFaces(model,proj,faces,{x:(a.x+b.x)/2,y:(a.y+b.y)/2,z,w:G.length(a,b),d:wall.thickness,h,rot:Math.atan2(b.y-a.y,b.x-a.x),color:"#c0d2e2",kind:"wall",id:wall.id});
}
function paint3D(ctx,w,h,model,opts){
 const bounds=G.getBounds(model),project=projectFactory(w,h,bounds,opts),hits=[],faces=[];
 const pad=1.5,minX=bounds.minX-pad,maxX=bounds.maxX+pad,minY=bounds.minY-pad,maxY=bounds.maxY+pad;
 polygon(ctx,[[minX,minY,-.2],[maxX,minY,-.2],[maxX,maxY,-.2],[minX,maxY,-.2]].map(project),C("#172c3d","#dbe5db"),C("#365267","#829a89"));
 const step=Math.max(bounds.width,bounds.height)>18?2:.5;
 for(let x=Math.floor(minX/step)*step;x<=maxX;x+=step){
  const a=project([x,minY,-.19]),b=project([x,maxY,-.19]);line(ctx,a,b,C("#2a465b","#aebfb2"),.8);
 }
 for(let y=Math.floor(minY/step)*step;y<=maxY;y+=step){
  const a=project([minX,y,-.19]),b=project([maxX,y,-.19]);line(ctx,a,b,C("#2a465b","#aebfb2"),.8);
 }
 const floorCount=G.clamp(Math.round(Number(model.floorCount)||1),1,5);
 const floorH=Number(model.floorHeight)||3;
 for(let floor=0;floor<floorCount;floor++){
  const z0=floor*floorH;
  const on=v=>G.clamp(Math.round(Number(v.floor)||0),0,floorCount-1)===floor;
  const walls=model.walls.filter(on),openings=model.openings.filter(on),furniture=model.furniture.filter(on),measurements=model.measurements.filter(on);
  boxFaces(model,project,faces,{x:bounds.cx,y:bounds.cy,z:z0-.14,w:bounds.width+1,d:bounds.height+1,h:.14,
   rot:0,color:"#9db3c6",alpha:floor?.42:1,kind:"slab",id:"slab-"+floor});
  for(const wall of walls){
   const len=G.length(wall.a,wall.b);if(len<.1)continue;
   const wallOpenings=openings.filter(v=>v.wallId===wall.id).sort((a,b)=>a.offset-b.offset);
   let t=0;for(const o of wallOpenings){
    const ta=G.clamp((o.offset-o.width/2)/len,0,1),tb=G.clamp((o.offset+o.width/2)/len,0,1);
    boxOnWall(model,project,faces,wall,t,ta,z0,wall.height);
    if(o.sill>.02)boxOnWall(model,project,faces,wall,ta,tb,z0,Math.min(o.sill,wall.height));
    const top=o.sill+o.height;
    if(top<wall.height-.02)boxOnWall(model,project,faces,wall,ta,tb,z0+top,wall.height-top);
    if(o.type==="window"){
     const a=G.lerp(wall.a,wall.b,ta),b=G.lerp(wall.a,wall.b,tb),mid=G.midpoint(a,b);
     boxFaces(model,project,faces,{x:mid.x,y:mid.y,z:z0+o.sill,w:G.length(a,b),d:.018,h:Math.min(o.height,wall.height-o.sill),
      rot:Math.atan2(b.y-a.y,b.x-a.x),color:"#68b7d8",kind:"opening",id:o.id});
    }
    t=Math.max(t,tb);
   }
   boxOnWall(model,project,faces,wall,t,1,z0,wall.height);
  }
  for(const f of furniture)boxFaces(model,project,faces,{x:f.x,y:f.y,z:z0,w:f.w,d:f.d,h:f.h,rot:f.rotation,color:f.color,kind:"furniture",id:f.id});
  for(const q of measurements){
   const a=project([q.a.x,q.a.y,z0+.05]),b=project([q.b.x,q.b.y,z0+.05]);
   line(ctx,a,b,"#81e7b6",2,[5,5]);pill(ctx,G.round(G.length(q.a,q.b),2)+" m",(a.x+b.x)/2,(a.y+b.y)/2-8,C("#9af5ce","#12684d"));
  }
 }
 faces.sort((a,b)=>b.depth-a.depth);
 for(const f of faces){
  const active=opts.selected&&opts.selected.kind===f.kind&&opts.selected.id===f.id;
  polygon(ctx,f.poly,f.color,active?"#ffdb83":f.kind==="wall"?"#6c899f":"#283a4d",active?2.2:.9);
  if((f.kind==="furniture"||f.kind==="wall")&&f.poly.every(p=>p.valid))hits.push({poly:f.poly,kind:f.kind,id:f.id});
 }
 return hits;
}
function draw(canvas,ctx,model,opts){
 const w=canvas.clientWidth,h=canvas.clientHeight;if(!w||!h)return [];
 ctx.clearRect(0,0,w,h);ctx.fillStyle=C("#0b1727","#f7f7f2");ctx.fillRect(0,0,w,h);
 if(opts.mode==="3d")return paint3D(ctx,w,h,model,opts);
 paint2D(ctx,w,h,model,opts);return [];
}
function projectPoint(canvas,model,orbit,xyz){
 return projectFactory(canvas.clientWidth,canvas.clientHeight,G.getBounds(model),{orbit})(xyz);
}
function fitOrbit(canvas,model,orbit){
 const w=canvas.clientWidth,h=canvas.clientHeight;if(!w||!h)return {...orbit};
 const b=G.getBounds(model),floorH=Number(model.floorHeight)||3;
 const top=Math.max(1,((model.floorCount||1)-1)*floorH,...model.walls.map(v=>(Number(v.floor)||0)*floorH+v.height),...model.furniture.map(v=>(Number(v.floor)||0)*floorH+v.h));
 const fitted={...orbit,targetZ:top/2,distance:.65},pad=Math.max(b.width,b.height)>18?3.5:2;
 const points=[];for(const x of [b.minX-pad,b.maxX+pad])for(const y of [b.minY-pad,b.maxY+pad])for(const z of [-.25,top])points.push([x,y,z]);
 const margin=Math.min(32,Math.min(w,h)*.09);
 for(let i=0;i<70;i++){const project=projectFactory(w,h,b,{orbit:fitted});if(points.map(project).every(p=>p.valid&&p.x>=margin&&p.x<=w-margin&&p.y>=margin&&p.y<=h-margin))break;fitted.distance*=1.12;}
 return fitted;
}
root.EasyHomeRenderer={draw,toWorld,screenToFloor,projectPoint,fitOrbit,planLabelLayout};
})(window);
