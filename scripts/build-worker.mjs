import {readFile,readdir,writeFile} from 'node:fs/promises';
import path from 'node:path';import {makeWorkerSource} from './worker-source.mjs';
const root=path.resolve('dist/site'),version=JSON.parse(await readFile(path.join(root,'version.json'),'utf8')),assets={};
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.xml':'application/xml; charset=utf-8','.txt':'text/plain; charset=utf-8','.zip':'application/zip'};
async function visit(dir){for(const f of await readdir(dir,{withFileTypes:true})){const name=path.join(dir,f.name);if(f.isDirectory())await visit(name);else{const ext=path.extname(name);if(f.name==='.nojekyll')continue;if(!types[ext])throw Error('Unexpected public file: '+name);const bytes=await readFile(name),route='/'+path.relative(root,name).split(path.sep).join('/');assets[route]=[types[ext],ext==='.zip'?bytes.toString('base64'):bytes.toString('utf8')];}}}
await visit(root);
await writeFile('dist/worker.mjs',makeWorkerSource(assets,version.commit));
console.log('Worker package built for',version.commit,Object.keys(assets).length,'routes');
