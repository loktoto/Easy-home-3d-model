import {verifyWebhook,checkoutParams,entitlementFromResource,plans} from "./billing.mjs";
const env=n=>Deno.env.get(n)||"";
const json=(x,status=200,origin="")=>new Response(JSON.stringify(x),{status,headers:{"Content-Type":"application/json","Cache-Control":"no-store",...(origin?{"Access-Control-Allow-Origin":origin,"Vary":"Origin","Access-Control-Allow-Headers":"authorization,apikey,content-type,x-client-info","Access-Control-Allow-Methods":"POST,OPTIONS"}:{})}});
async function stripe(path,method="GET",body=null){const secret=env("STRIPE_TEST_SECRET");if(!secret.startsWith("sk_test_"))throw Error("Stripe test mode is not configured");const r=await fetch("https://api.stripe.com/v1/"+path,{method,headers:{Authorization:"Bearer "+secret,"Stripe-Version":"2025-06-30.basil",...(body?{"Content-Type":"application/x-www-form-urlencoded"}:{})},body});if(!r.ok)throw Error("Stripe request failed");return r.json();}
async function owner(req){const token=req.headers.get("Authorization");if(!token||!token.startsWith("Bearer "))throw Error("Unauthorized");const r=await fetch(env("SUPABASE_URL")+"/auth/v1/user",{headers:{Authorization:token,apikey:env("SUPABASE_ANON_KEY")}});if(!r.ok)throw Error("Unauthorized");return r.json();}
async function record(event,e){const key=env("SUPABASE_SERVICE_ROLE_KEY");if(!key)throw Error("Server configuration missing");const r=await fetch(env("SUPABASE_URL")+"/rest/v1/rpc/easy3d_record_billing",{method:"POST",headers:{apikey:key,Authorization:"Bearer "+key,"Content-Type":"application/json"},body:JSON.stringify({p_event:event.id,p_source:e.source,p_owner:e.owner,p_plan:e.plan,p_active:e.active,p_expires:e.expires,p_created:event.created})});if(!r.ok)throw Error("Entitlement record failed");}
Deno.serve(async req=>{
 const origin=env("EASY3D_APP_ORIGIN"),cors=req.headers.get("Origin")===origin?origin:"";
 if(req.method==="OPTIONS")return json({},cors?200:403,cors);
 if(req.method!=="POST")return json({error:"Method not allowed"},405,cors);
 try{
  const signature=req.headers.get("Stripe-Signature");
  if(signature){const raw=await req.text();if(raw.length>1000000||!await verifyWebhook(raw,signature,env("STRIPE_TEST_WEBHOOK_SECRET")))return json({error:"Invalid signature"},400);const event=JSON.parse(raw);if(event.livemode!==false)return json({error:"Live events disabled"},400);const obj=event.data.object;let e=null;
   if(["checkout.session.completed","checkout.session.async_payment_succeeded"].includes(event.type)&&obj.mode==="payment"&&obj.payment_intent){const intent=await stripe("payment_intents/"+encodeURIComponent(obj.payment_intent)+"?expand[]=latest_charge");e=entitlementFromResource(intent,"home_plus",intent.latest_charge);}
   else if(["charge.refunded","charge.dispute.created","charge.dispute.closed"].includes(event.type)){const chargeId=event.type.startsWith("charge.dispute")?obj.charge:obj.id;const charge=await stripe("charges/"+encodeURIComponent(chargeId));if(charge.payment_intent){const pi=await stripe("payment_intents/"+encodeURIComponent(charge.payment_intent));e=entitlementFromResource(pi,"home_plus",charge);}}
   else if(["customer.subscription.created","customer.subscription.updated","customer.subscription.deleted"].includes(event.type)){const sub=await stripe("subscriptions/"+encodeURIComponent(obj.id));e=entitlementFromResource(sub,"professional");}
   if(e)await record(event,e);return json({received:true});
  }
  if(!cors)return json({error:"Origin not allowed"},403);
  const u=await owner(req),body=await req.json(),plan=body.plan;if(!plans[plan])return json({error:"Unknown plan"},400,cors);const id=env(plan==="home_plus"?"STRIPE_TEST_HOME_PRICE":"STRIPE_TEST_PRO_PRICE");if(!id.startsWith("price_"))throw Error("Price configuration missing");const price=await stripe("prices/"+encodeURIComponent(id));const params=checkoutParams(plan,price,u.id,u.email,origin);const session=await stripe("checkout/sessions","POST",params);if(session.livemode!==false||typeof session.url!=="string"||new URL(session.url).hostname!=="checkout.stripe.com")throw Error("Invalid test checkout");return json({url:session.url,test:true},200,cors);
 }catch(e){return json({error:"Billing unavailable or unauthorized"},400,cors);}
});
