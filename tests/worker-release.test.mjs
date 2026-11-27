import test from 'node:test';
import assert from 'node:assert/strict';
import {makeWorkerSource} from '../scripts/worker-source.mjs';
test('public worker serves only explicit routes and exact release bytes',async()=>{
 const sha='a'.repeat(40),assets={'/index.html':['text/html','<h1>Easy3DHome</h1>'],'/welcome/index.html':['text/html','Welcome'],'/version.json':['application/json',JSON.stringify({commit:sha,cloud:'disabled'})],'/easy-home-3d-convika.zip':['application/zip','']};
 const source=makeWorkerSource(assets,sha);
 const worker=(await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'))).default;
 const get=async(path,method='GET')=>worker.fetch(new Request('https://example.com'+path,{method}));
 for(const path of ['/','/index.html','/welcome/','/welcome','/version.json']){const r=await get(path);assert.equal(r.status,200);assert.equal(r.headers.get('X-Easy-Home-Commit'),sha);assert.equal(r.headers.get('X-Content-Type-Options'),'nosniff');}
 assert.equal(await (await get('/version.json')).json().then(x=>x.commit),sha);
 for(const path of ['/.git/config','/backend/001-cloud.sql','/tests/core.test.cjs','/unknown'])assert.equal((await get(path)).status,404);
 assert.equal((await get('/','POST')).status,405);assert.equal(await(await get('/','HEAD')).text(),'');
 assert.equal((await get('/version.json')).headers.get('Cache-Control'),'no-store');
});
