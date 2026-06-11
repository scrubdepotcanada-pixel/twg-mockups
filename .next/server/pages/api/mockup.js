"use strict";(()=>{var e={};e.id=197,e.ids=[197],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},8048:e=>{e.exports=import("@neondatabase/serverless")},5333:(e,t,s)=>{s.a(e,async(e,a)=>{try{s.r(t),s.d(t,{config:()=>l,default:()=>c,routeModule:()=>d});var r=s(1802),n=s(7153),o=s(6249),i=s(1771),u=e([i]);i=(u.then?(await u)():u)[0];let c=(0,o.l)(i,"default"),l=(0,o.l)(i,"config"),d=new r.PagesAPIRouteModule({definition:{kind:n.x.PAGES_API,page:"/api/mockup",pathname:"/api/mockup",bundlePath:"",filename:""},userland:i});a()}catch(e){a(e)}})},1771:(e,t,s)=>{s.a(e,async(e,a)=>{try{s.r(t),s.d(t,{default:()=>handler});var r=s(8048),n=e([r]);function getDb(){return(0,r.neon)(process.env.NEON_DATABASE_URL)}function errStr(e){if("string"==typeof e)return e;if(e&&"string"==typeof e.message)return e.message;try{return JSON.stringify(e)}catch{return"Unknown error"}}async function handler(e,t){if("OPTIONS"===e.method)return t.setHeader("Access-Control-Allow-Origin","*"),t.status(200).end();if("POST"!==e.method)return t.status(405).json({error:"POST only"});let{action:s,pin:a}=e.body;if(a!==process.env.ADMIN_PIN)return t.status(401).json({error:"Unauthorized"});try{if("research"===s)return await handleResearch(e,t);if("photos"===s)return await handlePhotos(e,t);if("save"===s)return await handleSave(e,t);if("list"===s)return await handleList(e,t);if("get"===s)return await handleGet(e,t);if("delete"===s)return await handleDelete(e,t);return t.status(400).json({error:"Invalid action"})}catch(e){return console.error("Mockup API error:",e),t.status(500).json({error:errStr(e)||"Internal error"})}}async function handleSave(e,t){let{slug:s,business_name:a,business_data:r,photo_urls:n,html:o}=e.body;if(!s||!o||!a)return t.status(400).json({error:"slug, business_name, and html required"});let i=getDb();return await i`
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
  `;return t.status(200).json({success:!0,mockups:a})}async function handleGet(e,t){let{slug:s}=e.body;if(!s)return t.status(400).json({error:"slug required"});let a=getDb(),r=await a`
    SELECT slug, business_name, business_data, photo_urls, html, created_at
    FROM mockups WHERE slug = ${s} LIMIT 1
  `;return r.length?t.status(200).json({success:!0,mockup:r[0]}):t.status(404).json({error:"Mockup not found"})}async function handleDelete(e,t){let{slug:s}=e.body;if(!s)return t.status(400).json({error:"slug required"});let a=getDb();return await a`DELETE FROM mockups WHERE slug = ${s}`,t.status(200).json({success:!0})}async function handleResearch(e,t){let s;let{name:a,address:r,notes:n,category:o,model:i}=e.body;if(!a||!r)return t.status(400).json({error:"name and address required"});let u=process.env.ANTHROPIC_API_KEY;if(!u)return t.status(500).json({error:"ANTHROPIC_API_KEY not set"});let c=`You are a business researcher for a web design agency. Given a business name, address, and optionally a business type, search the web to find everything about this business — Google Maps, Yelp, Instagram, review sites, their website (if any), industry directories.

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
  "hours_summary": "e.g. 9am-5pm weekdays",
  "hours_detail": [{"days":"Monday - Friday","time":"9:00 AM - 5:00 PM"}],
  "category": "restaurant|cafe|bar|bakery|dental|medical|auto|salon|spa|fitness|legal|realestate|construction|retail|cleaning|pet|accounting|photography|services",
  "palette": "warm|cool|earthy|modern|elegant|fresh",
  "vibe_tags": ["tag1","tag2","tag3","tag4"],
  "about_paragraph": "2-3 sentences for About section",
  "about_paragraph2": "1-2 follow-up sentences",
  "cta_primary": "Main call to action text (e.g. Order Now, Book Appointment, Get a Quote, Schedule Visit, Call Now)",
  "items_label": "Section heading for services/menu (e.g. Our Menu, Our Services, What We Offer, Treatments, Specialties)",
  "signature_items": [{"name":"Item or Service","description":"One sentence","tag":"Most Popular","emoji":"relevant emoji"}],
  "all_items": [{"name":"Item or Service","description":"Short desc","tag":"Popular","emoji":"relevant emoji"}],
  "instagram": "handle without @ or empty string",
  "website": "URL or empty string",
  "has_delivery": false,
  "delivery_platforms": [],
  "review_quote": "Short positive review snippet",
  "review_source": "Google Reviews",
  "rating": "4.7",
  "review_count": "182"
}

Adapt the content to the business type:
- Restaurants/cafes/bars/bakeries: signature_items = menu items, cta = "Order Now", items_label = "Our Menu"
- Dental/medical: signature_items = treatments/services, cta = "Book Appointment", items_label = "Our Services"
- Auto mechanic: signature_items = services offered, cta = "Get a Quote", items_label = "Our Services"
- Salon/spa: signature_items = treatments, cta = "Book Now", items_label = "Our Services"
- Legal/accounting: signature_items = practice areas, cta = "Free Consultation", items_label = "Practice Areas"
- Construction/trades: signature_items = services, cta = "Get a Free Estimate", items_label = "What We Do"
- Retail: signature_items = product categories, cta = "Shop Now", items_label = "Our Products"
- Other: adapt appropriately

The "category" field MUST be one of the enum values above — pick the closest match. If a business type was provided by the user, use it.

Be accurate. Use real info. If you can't find something, infer reasonably. Return 3 signature_items and 6 all_items. Do NOT include any HTML tags, citations, or source references in the JSON values — plain text only.`,l=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":u,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:"premium"===i?"claude-fable-5":"claude-sonnet-4-20250514",max_tokens:4096,system:c,messages:[{role:"user",content:`Research this business:

Business: ${a}
Address: ${r}${o?`
Business Type: ${o}`:""}${n?`
Context: ${n}`:""}`}],tools:[{type:"web_search_20250305",name:"web_search"}]})});if(529===l.status)throw Error("Claude API is overloaded — try again in a minute, or switch to Standard model");if(429===l.status)throw Error("Rate limited — wait a moment and try again");if(!l.ok&&200!==l.status){let e=await l.text().catch(()=>"");throw Error(`API error ${l.status}: ${e.slice(0,200)||"Unknown error"}`)}let d=await l.json();if(d.error)throw Error(errStr(d.error));let p=(d.content||[]).filter(e=>"text"===e.type).map(e=>e.text).join(""),h=p.replace(/```json\s*|```\s*/g,"").replace(/<\/?cite[^>]*>/g,"").replace(/<\/?antml:cite[^>]*>/g,"").trim();try{s=JSON.parse(h)}catch{let e=h.match(/\{[\s\S]*\}/);if(e)s=JSON.parse(e[0]);else throw Error("Could not parse response")}return t.status(200).json({success:!0,data:s})}async function handlePhotos(e,t){let{name:s,address:a}=e.body;if(!s||!a)return t.status(400).json({error:"name and address required"});let r=process.env.GOOGLE_MAPS_API_KEY;if(!r)return t.status(200).json({success:!0,photos:[],message:"No Google Maps key — using stock photos"});let n=encodeURIComponent(`${s} ${a}`),o=await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${n}&inputtype=textquery&fields=place_id,name,photos&key=${r}`),i=await o.json();if(!i.candidates?.length)return t.status(200).json({success:!0,photos:[]});let u=i.candidates[0],c=await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${u.place_id}&fields=photos&key=${r}`),l=await c.json(),d=(l.result?.photos||u.photos||[]).slice(0,12),p=[];for(let e of d){let t=`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${e.photo_reference}&key=${r}`;try{let s=await fetch(t,{redirect:"manual"}),a=s.headers.get("location");p.push({url:a||t,width:e.width,height:e.height})}catch{p.push({url:t,width:e.width,height:e.height})}}return t.status(200).json({success:!0,place_id:u.place_id,photos:p})}r=(n.then?(await n)():n)[0],a()}catch(e){a(e)}})}};var t=require("../../webpack-api-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),s=t.X(0,[222],()=>__webpack_exec__(5333));module.exports=s})();