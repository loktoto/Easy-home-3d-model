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

test("door and window overlapping intervals are rejected with 5cm clearance",()=>{
 const door={id:"a",wallId:"wall-a",offset:1,width:1};
 const adjacent={id:"b",wallId:"wall-a",offset:2.1,width:1};
 const overlap={id:"c",wallId:"wall-a",offset:1.8,width:1};
 assert.equal(G.openingFits(adjacent,[door]),true);
 assert.equal(G.openingFits(overlap,[door]),false);
 assert.equal(G.openingFits({...door,width:1.1},[door]),true);
 assert.equal(G.openingFits({...overlap,wallId:"other-wall"},[door]),true);
});
