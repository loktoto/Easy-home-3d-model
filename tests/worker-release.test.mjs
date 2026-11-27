import test from 'node:test';
import assert from 'node:assert/strict';
import {makeWorkerSource} from '../scripts/worker-source.mjs';
test('public worker serves only explicit routes and exact release bytes',async()=>{
 const sha='a'.repeat(40),assets={'/index.html':['text/html','<h1>Easy3DHome</h1>'],'/welcome/index.html':['text/html','Welcome'],'/support/index.html':['text/html','Support'],'/support/binance-pay.svg':['image/svg+xml','<svg/>'],'/version.json':['application/json',JSON.stringify({commit:sha,cloud:'disabled'})],'/easy-home-3d-convika.zip':['application/zip','']};
 const source=makeWorkerSource(assets,sha);
 const worker=(await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'))).default;
 const get=async(path,method='GET')=>worker.fetch(new Request('https://example.com'+path,{method}));
 for(const path of ['/','/index.html','/welcome/','/welcome','/support/','/support','/support/binance-pay.svg','/version.json']){const r=await get(path);assert.equal(r.status,200);assert.equal(r.headers.get('X-Easy-Home-Commit'),sha);assert.equal(r.headers.get('X-Content-Type-Options'),'nosniff');}
 assert.equal((await get('/support/binance-pay.svg')).headers.get('Content-Type'),'image/svg+xml');
 assert.equal((await get('/support/README.md')).status,404);
 assert.equal(await (await get('/version.json')).json().then(x=>x.commit),sha);
 for(const path of ['/.git/config','/backend/001-cloud.sql','/tests/core.test.cjs','/unknown'])assert.equal((await get(path)).status,404);
 assert.equal((await get('/','POST')).status,405);assert.equal(await(await get('/','HEAD')).text(),'');
 assert.equal((await get('/version.json')).headers.get('Cache-Control'),'no-store');
});

import {readFile} from 'node:fs/promises';
test('Worker preserves actual PNG social card bytes and image MIME',async()=>{
 const image=await readFile(new URL('../welcome/social-card.png',import.meta.url));
 assert.equal(image.subarray(0,8).toString('hex'),'89504e470d0a1a0a');
 assert.equal(image.readUInt32BE(16),1200);assert.equal(image.readUInt32BE(20),630);
 const source=makeWorkerSource({'/welcome/social-card.png':['image/png',image.toString('base64')]},'b'.repeat(40));
 const worker=(await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'))).default;
 const url='https://example.com/welcome/social-card.png';
 const response=await worker.fetch(new Request(url));assert.equal(response.headers.get('Content-Type'),'image/png');
 assert.deepEqual(Buffer.from(await response.arrayBuffer()),image);
 const head=await worker.fetch(new Request(url,{method:'HEAD'}));assert.equal(head.status,200);assert.equal((await head.arrayBuffer()).byteLength,0);
});
