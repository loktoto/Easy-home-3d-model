/* Supabase Auth REST and PostgREST client. Tokens are memory-only. */
(function(root){"use strict";
const config=root.Easy3DHomeCloudConfig;let session=null;
// Prevent accidental use of privileged or unrecognized API keys in browser configuration.
// This is a configuration guard, not JWT signature verification or a substitute for server RLS.
function publicKey(key){
 if(typeof key!=="string")return false;
 if(/^sb_publishable_[A-Za-z0-9_-]{16,}$/.test(key))return true;
 if(!/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(key))return false;
 try{return JSON.parse(atob(key.split(".")[1].replace(/-/g,"+").replace(/_/g,"/")))?.role==="anon";}catch(e){return false;}
}
function configured(){
 try{const u=new URL(config?.url);return !u.username&&!u.password&&!u.search&&!u.hash&&(u.protocol==="https:"||u.protocol==="http:"&&["127.0.0.1","localhost","[::1]"].includes(u.hostname))&&publicKey(config.key);}catch(e){return false;}
}
async function call(path,options={},auth=false){
 if(!configured())throw new Error("Cloud service is not configured");
 if(auth&&!session)throw new Error("Sign in first");
 if(auth&&session.expires_at<Date.now()/1000+30&&session.refresh_token){
  session=await token("refresh_token",{refresh_token:session.refresh_token});
 }
 const headers={apikey:config.key,"Content-Type":"application/json",...(auth?{Authorization:"Bearer "+session.access_token}:{}),...(options.headers||{})};
 const res=await fetch(config.url.replace(/\/$/,"")+path,{...options,headers,cache:"no-store",credentials:"omit"});
 const raw=await res.text();let data=null;try{data=raw?JSON.parse(raw):null;}catch(e){throw new Error("Invalid cloud response");}
 if(!res.ok){const err=new Error(data?.message||data?.msg||data?.error_description||"Cloud request failed");err.status=res.status;throw err;}return data;
}
async function token(grant,data){const s=await call("/auth/v1/token?grant_type="+grant,{method:"POST",body:JSON.stringify(data)});if(!s.access_token||!s.user?.id)throw Error("Invalid authentication response");return {...s,expires_at:s.expires_at||Date.now()/1000+(s.expires_in||3600)};}
async function login(email,password){session=await token("password",{email,password});return session.user;}
async function signup(email,password){const s=await call("/auth/v1/signup",{method:"POST",body:JSON.stringify({email,password})});if(s?.access_token){session={...s,expires_at:s.expires_at||Date.now()/1000+(s.expires_in||3600)};return session.user;}return null;}
async function logout(){try{if(session)await call("/auth/v1/logout",{method:"POST"},true);}finally{session=null;}}
function user(){return session?.user||null;}
const eq=s=>encodeURIComponent("eq."+s);
async function list(){return call("/rest/v1/easy3d_projects?select=owner,id,name,revision,updated_at&order=updated_at.desc&limit=100",{},true);}
async function get(owner,id){const r=await call("/rest/v1/easy3d_projects?owner="+eq(owner)+"&id="+eq(id)+"&select=*",{},true);return r[0]||null;}
async function put(owner,id,name,doc,expected){
 const body={owner,id,name,doc,revision:expected===null?1:expected+1};
 const url="/rest/v1/easy3d_projects"+(expected===null?"":"?owner="+eq(owner)+"&id="+eq(id)+"&revision="+eq(expected));
 let result;try{result=await call(url,{method:expected===null?"POST":"PATCH",headers:{Prefer:"return=representation"},body:JSON.stringify(body)},true);}catch(e){if(e.status===409)throw Error("Revision conflict. Pull the remote version first.");throw e;}
 if(!result?.length)throw Error("Revision conflict or permission denied. Pull the remote version first.");return result[0];
}
async function remove(owner,id,revision){const result=await call("/rest/v1/easy3d_projects?owner="+eq(owner)+"&id="+eq(id)+"&revision="+eq(revision),{method:"DELETE",headers:{Prefer:"return=representation"}},true);if(!result?.length)throw Error("Revision conflict or permission denied.");return true;}
async function memberships(){return call("/rest/v1/easy3d_members?select=owner,project_id,member,role,expires_at",{},true);}
async function createInvite(owner,id,role,days){
 const raw=Array.from(crypto.getRandomValues(new Uint8Array(32)),x=>x.toString(16).padStart(2,"0")).join("");
 const digest=Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",new TextEncoder().encode(raw))),x=>x.toString(16).padStart(2,"0")).join("");
 await call("/rest/v1/easy3d_invites",{method:"POST",body:JSON.stringify({owner,project_id:id,token_hash:digest,role,expires_at:new Date(Date.now()+days*86400000).toISOString()})},true);return raw;
}
async function claimInvite(raw){return call("/rest/v1/rpc/easy3d_claim_invite",{method:"POST",body:JSON.stringify({p_token:raw})},true);}
async function invites(owner,id){return call("/rest/v1/easy3d_invites?owner="+eq(owner)+"&project_id="+eq(id)+"&select=token_hash,role,expires_at,claimed_at",{},true);}
async function revokeInvite(hash){return call("/rest/v1/easy3d_invites?token_hash="+eq(hash),{method:"DELETE"},true);}
async function revokeMember(owner,id,member){return call("/rest/v1/easy3d_members?owner="+eq(owner)+"&project_id="+eq(id)+"&member="+eq(member),{method:"DELETE"},true);}
async function versions(owner,id){return call("/rest/v1/easy3d_versions?owner="+eq(owner)+"&project_id="+eq(id)+"&select=revision,name,created_at&order=revision.desc&limit=50",{},true);}
async function version(owner,id,rev){const r=await call("/rest/v1/easy3d_versions?owner="+eq(owner)+"&project_id="+eq(id)+"&revision="+eq(rev)+"&select=*",{},true);return r[0]||null;}


root.Easy3DHomeCloud={versions,version,memberships,createInvite,claimInvite,invites,revokeInvite,revokeMember,configured,user,login,signup,logout,list,get,put,remove,call};
})(window);
