/* Easy Home 3D — offline canvas renderer (2D + perspective 3D). MIT © 2026 loktoto */
(function(root){
"use strict";
const G=root.EasyHomeCore;
const rgba=(hex,alpha)=>{const v=parseInt((hex||"#82a8bb").replace("#",""),16);return "rgba("+((v>>16)&255)+","+((v>>8)&255)+","+(v&255)+","+alpha+")";};
function line(ctx,a,b,color,width=1,dash=[]){
 ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.setLineDash(dash);ctx.stroke();ctx.setLineDash([]);
}
function pill(ctx,text,x,y,fg="#e9f2ff",bg="#173049"){
 ctx.font="700 11px system-ui,sans-serif";const w=ctx.measureText(text).width+13;
 ctx.fillStyle=bg;ctx.beginPath();ctx.roundRect(x-w/2,y-10,w,19,5);ctx.fill();
 ctx.fillStyle=fg;ctx.textAlign="center";ctx.textBaseline="middle";ctx.fillText(text,x,y);
}
function grid(ctx,w,h,view,toScreen){
 const s=view.scale;let step=s>105?.25:s>48?.5:s>24?1:2;
 const min=toWorld({x:0,y:0},view,w,h),max=toWorld({x:w,y:h},view,w,h);
 const a=Math.floor(min.x/step)*step,b=Math.ceil(max.x/step)*step,c=Math.floor(min.y/step)*step,d=Math.ceil(max.y/step)*step;
 ctx.strokeStyle="#203249";ctx.lineWidth=1;ctx.beginPath();
 for(let x=a;x<=b+.00001;x+=step){const p=toScreen({x,y:0});ctx.moveTo(Math.round(p.x)+.5,0);ctx.lineTo(Math.round(p.x)+.5,h);}
 for(let y=c;y<=d+.00001;y+=step){const p=toScreen({x:0,y});ctx.moveTo(0,Math.round(p.y)+.5);ctx.lineTo(w,Math.round(p.y)+.5);}
 ctx.stroke();
 const origin=toScreen({x:0,y:0});line(ctx,{x:origin.x,y:0},{x:origin.x,y:h},"#2a4761",1);line(ctx,{x:0,y:origin.y},{x:w,y:origin.y},"#2a4761",1);
}
function toWorld(p,view,w,h){return G.point((p.x-w/2-view.panX)/view.scale,(p.y-h/2-view.panY)/view.scale);}
function paint2D(ctx,w,h,model,opts){
 const view=opts.view,sc=view.scale;
 const S=p=>({x:w/2+view.panX+p.x*sc,y:h/2+view.panY+p.y*sc});
 grid(ctx,w,h,view,S);
 const chosen=opts.selected||{}, dims=opts.dimensions!==false;
 const wallOpening=new Map();
 for(const o of model.openings){const list=wallOpening.get(o.wallId)||[];list.push(o);wallOpening.set(o.wallId,list);}
 for(const wall of model.walls){
  const a=S(wall.a),b=S(wall.b),len=G.length(wall.a,wall.b);
  if(len<.01)continue;
  const intervals=(wallOpening.get(wall.id)||[]).map(o=>({start:G.clamp((o.offset-o.width/2)/len,0,1),end:G.clamp((o.offset+o.width/2)/len,0,1)})).sort((a,b)=>a.start-b.start);
  let cursor=0;const col=chosen.kind==="wall"&&chosen.id===wall.id?"#ffcb7f":"#ddebf4";
  for(const interval of intervals){if(interval.start>cursor){line(ctx,S(G.lerp(wall.a,wall.b,cursor)),S(G.lerp(wall.a,wall.b,interval.start)),col,Math.max(4,wall.thickness*sc));}cursor=Math.max(cursor,interval.end);}
  if(cursor<1)line(ctx,S(G.lerp(wall.a,wall.b,cursor)),b,col,Math.max(4,wall.thickness*sc));
  if(chosen.kind==="wall"&&chosen.id===wall.id){for(const p of [a,b]){ctx.fillStyle="#ffcb7f";ctx.beginPath();ctx.arc(p.x,p.y,5,0,Math.PI*2);ctx.fill();}}
  if(dims){const cx=(a.x+b.x)/2,cy=(a.y+b.y)/2,nx=-(b.y-a.y)/Math.max(1,Math.hypot(b.x-a.x,b.y-a.y)),ny=(b.x-a.x)/Math.max(1,Math.hypot(b.x-a.x,b.y-a.y));pill(ctx,G.round(len,2).toFixed(2)+" m",cx+nx*18,cy+ny*18);}
 }
 for(const o of model.openings){
  const wall=model.walls.find(v=>v.id===o.wallId);if(!wall)continue;
  const len=G.length(wall.a,wall.b);if(len<.1)continue;
  const a=S(G.lerp(wall.a,wall.b,(o.offset-o.width/2)/len)),b=S(G.lerp(wall.a,wall.b,(o.offset+o.width/2)/len)),mid={x:(a.x+b.x)/2,y:(a.y+b.y)/2};
  const c=chosen.kind==="opening"&&chosen.id===o.id?"#ffd17e":o.type==="window"?"#6ee6ec":"#ebad68";
  if(o.type==="window"){
   line(ctx,a,b,c,6);line(ctx,a,b,"#18314d",2);
  }else{
   line(ctx,a,b,c,2,[4,4]);
   const dx=b.x-a.x,dy=b.y-a.y;const sign=dx*dy>=0?1:1;
   const hinge=a,edge={x:a.x-dy*sign,y:a.y+dx*sign};
   line(ctx,hinge,edge,c,1);
   ctx.beginPath();ctx.arc(hinge.x,hinge.y,Math.hypot(dx,dy),Math.atan2(edge.y-hinge.y,edge.x-hinge.x),Math.atan2(b.y-hinge.y,b.x-hinge.x),true);ctx.strokeStyle=rgba("#ebad68",.5);ctx.lineWidth=1;ctx.stroke();
  }
  if(dims&&sc>35)pill(ctx,G.round(o.width,2).toFixed(2)+" m",mid.x,mid.y-12,c);
 }
 for(const f of model.furniture){
  const corners=G.furnitureCorners(f).map(S);
  ctx.beginPath();corners.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));ctx.closePath();
  ctx.fillStyle=rgba(f.color,.62);ctx.fill();ctx.strokeStyle=chosen.kind==="furniture"&&chosen.id===f.id?"#ffdd89":f.locked?"#edca96":"#b9dbea";ctx.lineWidth=chosen.id===f.id&&chosen.kind==="furniture"?3:1.5;ctx.stroke();
  const center=S(f);ctx.font="700 12px system-ui,sans-serif";ctx.textBaseline="middle";ctx.textAlign="center";ctx.fillStyle="#f5f9ff";
  if(Math.min(f.w,f.d)*sc>39){ctx.fillText((f.locked?"🔒 ":"")+f.name.slice(0,10),center.x,center.y-6);if(dims)ctx.fillText(G.round(f.w,2)+" × "+G.round(f.d,2)+" m",center.x,center.y+11);}
  else ctx.fillText(f.locked?"🔒":"▣",center.x,center.y);
 }
 for(const q of model.measurements){
  const a=S(q.a),b=S(q.b),active=chosen.kind==="measurement"&&chosen.id===q.id;
  line(ctx,a,b,active?"#ffd17e":"#7ee5bb",1.6,[4,4]);
  for(const p of [a,b]){ctx.fillStyle=active?"#ffd17e":"#8fe7c8";ctx.beginPath();ctx.arc(p.x,p.y,3,0,Math.PI*2);ctx.fill();}
  pill(ctx,G.round(G.length(q.a,q.b),2).toFixed(2)+" m",(a.x+b.x)/2,(a.y+b.y)/2-12,"#92e4ca");
 }
 if(opts.pending&&opts.cursor){
  const a=S(opts.pending),b=S(opts.cursor);
  line(ctx,a,b,"#7dc3ff",2,[7,5]);
  pill(ctx,G.round(G.length(opts.pending,opts.cursor),2).toFixed(2)+" m",(a.x+b.x)/2,(a.y+b.y)/2-15);
  ctx.beginPath();ctx.arc(a.x,a.y,4,0,Math.PI*2);ctx.fillStyle="#b2e2ff";ctx.fill();
 }
 if(opts.cursor&&opts.tool==="wall"&&!opts.pending){
  const p=S(opts.cursor);line(ctx,{x:p.x-7,y:p.y},{x:p.x+7,y:p.y},"#a6d9ff");line(ctx,{x:p.x,y:p.y-7},{x:p.x,y:p.y+7},"#a6d9ff");
 }
}
function projectFactory(w,h,bounds,opts){
 const orbit=opts.orbit||{azimuth:-.65,elevation:.82,distance:1};
 const cx=bounds.cx,cy=bounds.cy,span=Math.max(bounds.width,bounds.height,4);
 const dist=span*1.85*orbit.distance+4,el=G.clamp(orbit.elevation,.15,1.48),az=orbit.azimuth;
 const camera=[cx+dist*Math.cos(el)*Math.sin(az),cy+dist*Math.cos(el)*Math.cos(az),dist*Math.sin(el)+2];
 const target=[cx,cy,1];
 function normalize(a){const m=Math.hypot(...a)||1;return a.map(v=>v/m);}
 function cross(a,b){return [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];}
 function dot(a,b){return a[0]*b[0]+a[1]*b[1]+a[2]*b[2];}
 const forward=normalize(target.map((v,i)=>v-camera[i])),right=normalize(cross(forward,[0,0,1])),up=cross(right,forward);
 const f=Math.min(w,h)*1.42;
 return function(p){
  const q=[p[0]-camera[0],p[1]-camera[1],p[2]-camera[2]];
  const z=dot(q,forward);
  return {x:w/2+f*dot(q,right)/Math.max(.1,z),y:h/2-f*dot(q,up)/Math.max(.1,z),z,valid:z>.1};
 };
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
 const colors=[rgba(box.color,.86),rgba(box.color,.73),rgba(box.color,.8),rgba(box.color,.68),box.kind==="wall"?"#dce8f1":box.color];
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
 polygon(ctx,[[minX,minY,0],[maxX,minY,0],[maxX,maxY,0],[minX,maxY,0]].map(project),"#172c3d","#365267");
 const step=Math.max(bounds.width,bounds.height)>18?2:.5;
 for(let x=Math.floor(minX/step)*step;x<=maxX;x+=step){
  const a=project([x,minY,.008]),b=project([x,maxY,.008]);line(ctx,a,b,"#2a465b",.8);
 }
 for(let y=Math.floor(minY/step)*step;y<=maxY;y+=step){
  const a=project([minX,y,.008]),b=project([maxX,y,.008]);line(ctx,a,b,"#2a465b",.8);
 }
 for(const wall of model.walls){
  const len=G.length(wall.a,wall.b);if(len<.1)continue;
  const openings=model.openings.filter(v=>v.wallId===wall.id).sort((a,b)=>a.offset-b.offset);
  let t=0;for(const o of openings){
   const ta=G.clamp((o.offset-o.width/2)/len,0,1),tb=G.clamp((o.offset+o.width/2)/len,0,1);
   boxOnWall(model,project,faces,wall,t,ta,0,wall.height);
   if(o.sill>.02)boxOnWall(model,project,faces,wall,ta,tb,0,Math.min(o.sill,wall.height));
   const top=o.sill+o.height;
   if(top<wall.height-.02)boxOnWall(model,project,faces,wall,ta,tb,top,wall.height-top);
   if(o.type==="window"){
    const a=G.lerp(wall.a,wall.b,ta),b=G.lerp(wall.a,wall.b,tb);
    const mid=G.midpoint(a,b);
    boxFaces(model,project,faces,{x:mid.x,y:mid.y,z:o.sill,w:G.length(a,b),d:.018,h:Math.min(o.height,wall.height-o.sill),rot:Math.atan2(b.y-a.y,b.x-a.x),color:"#68b7d8",kind:"opening",id:o.id});
   }
   t=Math.max(t,tb);
  }
  boxOnWall(model,project,faces,wall,t,1,0,wall.height);
 }
 for(const f of model.furniture)boxFaces(model,project,faces,{x:f.x,y:f.y,z:0,w:f.w,d:f.d,h:f.h,rot:f.rotation,color:f.color,kind:"furniture",id:f.id});
 faces.sort((a,b)=>b.depth-a.depth);
 for(const f of faces){
  const active=opts.selected&&opts.selected.kind===f.kind&&opts.selected.id===f.id;
  polygon(ctx,f.poly,f.color,active?"#ffdb83":f.kind==="wall"?"#6c899f":"#283a4d",active?2.2:.9);
  if(f.kind==="furniture"||f.kind==="wall")hits.push({poly:f.poly,kind:f.kind,id:f.id});
 }
 for(const q of model.measurements){
  const a=project([q.a.x,q.a.y,.05]),b=project([q.b.x,q.b.y,.05]);
  line(ctx,a,b,"#81e7b6",2,[5,5]);pill(ctx,G.round(G.length(q.a,q.b),2)+" m",(a.x+b.x)/2,(a.y+b.y)/2-8,"#9af5ce");
 }
 return hits;
}
function draw(canvas,ctx,model,opts){
 const w=canvas.clientWidth,h=canvas.clientHeight;if(!w||!h)return [];
 ctx.clearRect(0,0,w,h);ctx.fillStyle="#0b1727";ctx.fillRect(0,0,w,h);
 if(opts.mode==="3d")return paint3D(ctx,w,h,model,opts);
 paint2D(ctx,w,h,model,opts);return [];
}
root.EasyHomeRenderer={draw,toWorld};
})(window);
