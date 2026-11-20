const test=require("node:test");
const assert=require("node:assert/strict");
const G=require("../core.js");

test("new plans start completely empty with metric defaults",()=>{
 const m=G.empty("我的新圖則");
 assert.equal(m.schema,"easy-home-3d");
 assert.equal(m.version,1);
 assert.deepEqual(m.walls,[]);
 assert.deepEqual(m.openings,[]);
 assert.deepEqual(m.furniture,[]);
 assert.equal(m.wallHeight,2.7);
});
test("walls retain their real-world lengths",()=>{
 const w=G.wall([0,0],[3,4]);
 assert.equal(G.length(w.a,w.b),5);
 assert.equal(G.distancePointSegment({x:0,y:3},{x:0,y:0},{x:4,y:0}).distance,3);
});
test("rotated furniture hitbox reflects rotation",()=>{
 const f={x:0,y:0,w:2,d:1,rotation:Math.PI/2};
 const poly=G.furnitureCorners(f);
 assert.equal(G.inPoly({x:0,y:.8},poly),true);
 assert.equal(G.inPoly({x:.8,y:0},poly),false);
});
test("demo has generic rooms, door, window and editable furniture",()=>{
 const m=G.demo();
 assert.equal(m.walls.length,6);
 assert.equal(m.openings.length,3);
 assert.equal(m.furniture.length,4);
 assert.ok(G.getBounds(m).width>5.9);
});
test("plan backups retain dimensions, lock and openings",()=>{
 const m=G.demo();
 m.furniture[0].locked=true;m.furniture[0].h=1.1;
 const encoded=G.fileExport(m),copy=G.fileImport(encoded);
 assert.equal(copy.furniture[0].locked,true);
 assert.equal(copy.furniture[0].h,1.1);
 assert.equal(copy.openings.length,3);
 assert.equal(copy.walls[0].id,m.walls[0].id);
});
test("untrusted import schema is rejected and unsafe names remain data",()=>{
 assert.throws(()=>G.fileImport('{"obj":"surprise"}'),/格式/);
 const m=G.demo();
 m.furniture[0].name='<img src=x onerror=alert(1)>';
 const restored=G.fileImport(G.fileExport(m));
 assert.equal(restored.furniture[0].name,m.furniture[0].name);
});
test("malformed objects are bounded on import",()=>{
 const m=G.demo();
 m.furniture[0].w=100000;m.furniture[0].x=-1000000;
 const safe=G.sanitize(m);
 assert.equal(safe.furniture[0].w,15);
 assert.equal(safe.furniture[0].x,-1000);
});
test("deleting wall must allow dependent door/window cleanup",()=>{
 const m=G.demo();
 const removed=m.walls[0].id;m.walls=m.walls.filter(w=>w.id!==removed);
 m.openings=m.openings.filter(o=>o.wallId!==removed);
 assert.doesNotThrow(()=>G.sanitize(m));
});
test("all catalog items have positive dimensions and valid colours",()=>{
 for(const c of G.catalog){assert.ok(c.w>0&&c.d>0&&c.h>0);assert.match(c.color,/^#[0-9a-f]{6}$/i);}
});
test("file import rejects huge payloads",()=>{
 assert.throws(()=>G.fileImport(" ".repeat(3000001)),/3 MB/);
});

test("furniture clearances include wall thickness",()=>{
 const walls=[G.wall([0,0],[5,0],{thickness:.2})];
 const f={x:2,y:1.5,w:1,d:1,rotation:0};
 const gaps=G.furnitureClearances(f,walls);
 assert.equal(gaps.length,1);
 assert.equal(gaps[0].distance,.9);
});
test("segment collision reports zero distance",()=>{
 const a={x:0,y:0},b={x:2,y:2},c={x:0,y:2},d={x:2,y:0};
 assert.equal(G.segmentDistance(a,b,c,d),0);
});

test("home wizard generates a complete, buildable plan with no geometry issues",()=>{
 for(const opts of [{width:8,depth:6,bedrooms:2},{width:10,depth:7,bedrooms:3},{width:6,depth:5,bedrooms:1},{width:4,depth:4,bedrooms:1}]){
  const m=G.home(opts);
  assert.ok(m.walls.length>=7);
  assert.ok(m.openings.length>=8);
  assert.ok(m.furniture.length>=3);
  assert.ok(m.openings.some(o=>o.type==="door"));
  assert.ok(m.openings.some(o=>o.type==="window"));
  assert.deepEqual(G.validate(m),[]);
  assert.deepEqual(G.validate(G.fileImport(G.fileExport(m))),[]);
 }
});
test("two-floor house keeps floors independent and survives JSON backup",()=>{
 const m=G.house({name:"兩層屋",width:10,depth:7,bedrooms:3});
 assert.equal(m.floorCount,2);assert.equal(m.floorHeight,3);
 assert.ok(m.walls.some(w=>w.floor===1));assert.ok(m.walls.some(w=>w.floor===0));
 assert.ok(m.furniture.some(f=>f.name.indexOf("樓梯")>=0));
 assert.deepEqual(G.validate(m),[]);
 const copy=G.fileImport(G.fileExport(m));
 assert.equal(copy.floorCount,2);assert.equal(copy.floorHeight,3);
 assert.equal(copy.walls.filter(w=>w.floor===1).length,m.walls.filter(w=>w.floor===1).length);
 assert.deepEqual(G.validate(copy),[]);
 const ground=G.getBounds(m,0),upper=G.getBounds(m,1);
 assert.ok(ground.width>5&&upper.width>5);
});
test("old one-floor plans load as floor zero and validate per floor",()=>{
 const old=G.demo();delete old.floorCount;delete old.floorHeight;
 for(const key of ["walls","openings","furniture","measurements"])for(const v of old[key])delete v.floor;
 const safe=G.sanitize(old);
 assert.equal(safe.floorCount,1);
 assert.ok(safe.walls.every(w=>w.floor===0));
 assert.ok(G.validate(safe).every(i=>i.severity!=="error"));
});

test("sanitize caps window height above sill and validate reports impossible openings",()=>{
 const m=G.demo(),wall=m.walls[1];
 m.openings=[{id:"bad-window",wallId:wall.id,type:"window",offset:1,width:1,height:2.4,sill:1.6}];
 const safe=G.sanitize(m);
 assert.ok(safe.openings[0].sill+safe.openings[0].height<=safe.walls[1].height+.0001);
 const broken=G.demo();broken.openings[0].sill=2.4;broken.openings[0].height=1.2;
 assert.ok(G.validate(broken).some(i=>i.code==="opening-too-tall"));
});
test("validate catches overlapping openings, dangling walls and furniture collisions",()=>{
 const m=G.empty("問題圖則");
 m.walls=[G.wall([0,0],[5,0]),G.wall([0,0],[0,3])];
 m.openings=[
  {id:"d1",wallId:m.walls[0].id,type:"door",offset:1.5,width:.9,height:2.1,sill:0},
  {id:"d2",wallId:m.walls[0].id,type:"door",offset:2.0,width:.9,height:2.1,sill:0}
 ];
 m.furniture=[
  {id:"f1",type:"custom",name:"A",x:1,y:1,w:1,d:1,h:1,rotation:0,color:"#72bca6"},
  {id:"f2",type:"custom",name:"B",x:1.3,y:1,w:1,d:1,h:1,rotation:0,color:"#72bca6"}
 ];
 const codes=G.validate(m).map(i=>i.code);
 assert.ok(codes.includes("opening-overlap"));
 assert.ok(codes.includes("open-end"));
 assert.ok(codes.includes("furniture-overlap"));
});
test("rotated furniture overlap uses oriented bounding boxes",()=>{
 const a={x:0,y:0,w:2,d:1,rotation:Math.PI/2},b={x:1.6,y:0,w:1,d:1,rotation:0};
 assert.equal(G.furnitureOverlap(a,b),false);
 assert.equal(G.furnitureOverlap(a,{...b,x:.8}),true);
});
