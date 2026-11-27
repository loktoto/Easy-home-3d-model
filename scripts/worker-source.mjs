/** Generate a self-contained, no-bindings Worker for the allow-listed release. */
export function makeWorkerSource(assets,commit){
 if(!/^[a-f0-9]{40}$/.test(commit))throw new Error('Invalid release commit');
 return 'const ASSETS='+JSON.stringify(assets)+';\nconst COMMIT='+JSON.stringify(commit)+';\n'+`
export default {async fetch(request){
 const method=request.method;
 if(method!=="GET"&&method!=="HEAD")return new Response("Method not allowed",{status:405,headers:{Allow:"GET, HEAD"}});
 const raw=new URL(request.url).pathname;
 const path=raw==="/"?"/index.html":raw.endsWith("/")?raw+"index.html":Object.hasOwn(ASSETS,raw)?raw:raw+"/index.html";
 if(!Object.hasOwn(ASSETS,path))return new Response("Not found",{status:404,headers:{"X-Content-Type-Options":"nosniff","Cache-Control":"no-store"}});
 const [type,body]=ASSETS[path];
 const headers={"Content-Type":type,"X-Content-Type-Options":"nosniff","Referrer-Policy":"no-referrer","X-Easy-Home-Commit":COMMIT,"Cache-Control":path==="/version.json"?"no-store":"public, max-age=120"};
 if(path.endsWith(".zip"))headers["Content-Disposition"]='attachment; filename="Easy3DHome-offline.zip"';
 return new Response(method==="HEAD"?null:path.endsWith(".zip")?Uint8Array.from(atob(body),c=>c.charCodeAt(0)):body,{headers});
}};
`;
}
