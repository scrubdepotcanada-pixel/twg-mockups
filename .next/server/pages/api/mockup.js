"use strict";(()=>{var e={};e.id=197,e.ids=[197],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},8048:e=>{e.exports=import("@neondatabase/serverless")},5333:(e,t,s)=>{s.a(e,async(e,a)=>{try{s.r(t),s.d(t,{config:()=>c,default:()=>l,routeModule:()=>d});var r=s(1802),n=s(7153),o=s(6249),i=s(1771),u=e([i]);i=(u.then?(await u)():u)[0];let l=(0,o.l)(i,"default"),c=(0,o.l)(i,"config"),d=new r.PagesAPIRouteModule({definition:{kind:n.x.PAGES_API,page:"/api/mockup",pathname:"/api/mockup",bundlePath:"",filename:""},userland:i});a()}catch(e){a(e)}})},1771:(e,t,s)=>{s.a(e,async(e,a)=>{try{s.r(t),s.d(t,{default:()=>handler});var r=s(8048),n=e([r]);function getDb(){return(0,r.neon)(process.env.NEON_DATABASE_URL)}async function handler(e,t){if("OPTIONS"===e.method)return t.setHeader("Access-Control-Allow-Origin","*"),t.status(200).end();if("POST"!==e.method)return t.status(405).json({error:"POST only"});let{action:s,pin:a}=e.body;if(a!==process.env.ADMIN_PIN)return t.status(401).json({error:"Unauthorized"});try{if("research"===s)return await handleResearch(e,t);if("photos"===s)return await handlePhotos(e,t);if("save"===s)return await handleSave(e,t);if("list"===s)return await handleList(e,t);if("delete"===s)return await handleDelete(e,t);return t.status(400).json({error:"Invalid action"})}catch(e){return console.error("Mockup API error:",e),t.status(500).json({error:e.message||"Internal error"})}}async function handleSave(e,t){let{slug:s,business_name:a,business_data:r,photo_urls:n,html:o}=e.body;if(!s||!o||!a)return t.status(400).json({error:"slug, business_name, and html required"});let i=getDb();return await i`
    INSERT INTO mockups (slug, business_name, business_data, photo_urls, html)
    VALUES (${s}, ${a}, ${JSON.stringify(r||{})}, ${JSON.stringify(n||[])}, ${o})
    ON CONFLICT (slug) DO UPDATE SET
      business_name = EXCLUDED.business_name,
      business_data = EXCLUDED.business_data,
      photo_urls = EXCLUDED.photo_urls,
      html = EXCLUDED.html,
      created_at = NOW()
  `,t.status(200).json({success:!0,url:`/mockups/${s}`})}async function handleList(e,t){let s=getDb(),a=await s`
    SELECT slug, business_name, business_data, created_at
    FROM mockups
    ORDER BY created_at DESC
    LIMIT 50
  `;return t.status(200).json({success:!0,mockups:a})}async function handleDelete(e,t){let{slug:s}=e.body;if(!s)return t.status(400).json({error:"slug required"});let a=getDb();return await a`DELETE FROM mockups WHERE slug = ${s}`,t.status(200).json({success:!0})}async function handleResearch(e,t){let s;let{name:a,address:r,notes:n}=e.body;if(!a||!r)return t.status(400).json({error:"name and address required"});let o=process.env.ANTHROPIC_API_KEY;if(!o)return t.status(500).json({error:"ANTHROPIC_API_KEY not set"});let i=`You are a business researcher for a web design agency. Given a business name and address, search the web to find everything about this business — Google Maps, Yelp, Instagram, review sites, delivery apps, their website (if any).

Return ONLY valid JSON. No markdown fences, no preamble.

{
  "name": "Full business name",
  "tagline": "Catchy 3-6 word tagline for hero",
  "subtitle": "One sentence about what makes them special",
  "address_line1": "Street address",
  "city": "City",
  "province_state": "Province/State abbreviation",
  "postal_zip": "Postal/zip",
  "neighbourhood": "Neighbourhood name or empty string",
  "phone": "Phone or empty string",
  "hours_summary": "e.g. 9am-3pm daily",
  "hours_detail": [{"days":"Monday - Friday","time":"9:00 AM - 5:00 PM"}],
  "category": "cafe|restaurant|retail|salon|fitness|services|auto|bar",
  "palette": "warm|cool|earthy|modern|elegant|fresh",
  "vibe_tags": ["tag1","tag2","tag3","tag4"],
  "about_paragraph": "2-3 sentences for About section",
  "about_paragraph2": "1-2 follow-up sentences",
  "signature_items": [{"name":"Item","description":"One sentence","tag":"Fan Favourite","emoji":"emoji"}],
  "all_items": [{"name":"Item","description":"Short desc","tag":"Popular","emoji":"emoji"}],
  "instagram": "handle without @ or empty string",
  "website": "URL or empty string",
  "has_delivery": true,
  "delivery_platforms": ["Uber Eats"],
  "review_quote": "Short positive review snippet",
  "review_source": "Google Reviews",
  "rating": "4.7",
  "review_count": "182"
}

Be accurate. Use real info. If you can't find something, infer reasonably. Return 3 signature_items and 6 all_items.`,u=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":o,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:4096,system:i,messages:[{role:"user",content:`Research this business:

Business: ${a}
Address: ${r}${n?`
Context: ${n}`:""}`}],tools:[{type:"web_search_20250305",name:"web_search"}]})}),l=await u.json();if(l.error)throw Error(l.error.message);let c=(l.content||[]).filter(e=>"text"===e.type).map(e=>e.text).join(""),d=c.replace(/```json\s*|```\s*/g,"").trim();try{s=JSON.parse(d)}catch{let e=d.match(/\{[\s\S]*\}/);if(e)s=JSON.parse(e[0]);else throw Error("Could not parse response")}return t.status(200).json({success:!0,data:s})}async function handlePhotos(e,t){let{name:s,address:a}=e.body;if(!s||!a)return t.status(400).json({error:"name and address required"});let r=process.env.GOOGLE_MAPS_API_KEY;if(!r)return t.status(200).json({success:!0,photos:[],message:"No Google Maps key — using stock photos"});let n=encodeURIComponent(`${s} ${a}`),o=await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${n}&inputtype=textquery&fields=place_id,name,photos&key=${r}`),i=await o.json();if(!i.candidates?.length)return t.status(200).json({success:!0,photos:[]});let u=i.candidates[0],l=await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${u.place_id}&fields=photos&key=${r}`),c=await l.json(),d=(c.result?.photos||u.photos||[]).slice(0,12),p=[];for(let e of d){let t=`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${e.photo_reference}&key=${r}`;try{let s=await fetch(t,{redirect:"manual"}),a=s.headers.get("location");p.push({url:a||t,width:e.width,height:e.height})}catch{p.push({url:t,width:e.width,height:e.height})}}return t.status(200).json({success:!0,place_id:u.place_id,photos:p})}r=(n.then?(await n)():n)[0],a()}catch(e){a(e)}})}};var t=require("../../webpack-api-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),s=t.X(0,[222],()=>__webpack_exec__(5333));module.exports=s})();