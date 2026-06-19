"use strict";(()=>{var e={};e.id=197,e.ids=[197],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},8048:e=>{e.exports=import("@neondatabase/serverless")},5333:(e,t,s)=>{s.a(e,async(e,a)=>{try{s.r(t),s.d(t,{config:()=>l,default:()=>c,routeModule:()=>p});var r=s(1802),n=s(7153),o=s(6249),i=s(1771),u=e([i]);i=(u.then?(await u)():u)[0];let c=(0,o.l)(i,"default"),l=(0,o.l)(i,"config"),p=new r.PagesAPIRouteModule({definition:{kind:n.x.PAGES_API,page:"/api/mockup",pathname:"/api/mockup",bundlePath:"",filename:""},userland:i});a()}catch(e){a(e)}})},1771:(e,t,s)=>{s.a(e,async(e,a)=>{try{s.r(t),s.d(t,{default:()=>handler});var r=s(8048),n=e([r]);function getDb(){return(0,r.neon)(process.env.NEON_DATABASE_URL)}function errStr(e){if("string"==typeof e)return e;if(e&&"string"==typeof e.message)return e.message;try{return JSON.stringify(e)}catch{return"Unknown error"}}async function handler(e,t){if("OPTIONS"===e.method)return t.setHeader("Access-Control-Allow-Origin","*"),t.status(200).end();if("POST"!==e.method)return t.status(405).json({error:"POST only"});let{action:s,pin:a}=e.body;if(a!==process.env.ADMIN_PIN)return t.status(401).json({error:"Unauthorized"});try{if("research"===s)return await handleResearch(e,t);if("refine"===s)return await handleRefine(e,t);if("photos"===s)return await handlePhotos(e,t);if("save"===s)return await handleSave(e,t);if("list"===s)return await handleList(e,t);if("get"===s)return await handleGet(e,t);if("delete"===s)return await handleDelete(e,t);return t.status(400).json({error:"Invalid action"})}catch(e){return console.error("Mockup API error:",e),t.status(500).json({error:errStr(e)||"Internal error"})}}async function handleSave(e,t){let{slug:s,business_name:a,business_data:r,photo_urls:n,html:o}=e.body;if(!s||!o||!a)return t.status(400).json({error:"slug, business_name, and html required"});let i=getDb();return await i`
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
  `;return r.length?t.status(200).json({success:!0,mockup:r[0]}):t.status(404).json({error:"Mockup not found"})}async function handleDelete(e,t){let{slug:s}=e.body;if(!s)return t.status(400).json({error:"slug required"});let a=getDb();return await a`DELETE FROM mockups WHERE slug = ${s}`,t.status(200).json({success:!0})}async function handleResearch(e,t){let s,a,r;let{name:n,address:o,notes:i,category:u,model:c}=e.body;if(!n||!o)return t.status(400).json({error:"name and address required"});let l="premium"===c,p=process.env.ANTHROPIC_API_KEY,h=process.env.OPENAI_API_KEY;if(!p&&!l)return t.status(500).json({error:"ANTHROPIC_API_KEY not set"});if(l&&!h)return t.status(500).json({error:"OPENAI_API_KEY not set — add it in Vercel env vars to use Premium"});let d=`You are a business researcher for a web design agency. Given a business name, address, and optionally a business type, search the web to find everything about this business — Google Maps, Yelp, Instagram, review sites, their website (if any), industry directories.

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

Be accurate. Use real info. If you can't find something, infer reasonably. Return ${l?"4":"3"} signature_items and ${l?"9":"6"} all_items.${l?" Write richer, more compelling descriptions. Make the tagline creative and memorable. Write a longer, more engaging about_paragraph.":""} Do NOT include any HTML tags, citations, or source references in the JSON values — plain text only.`,m=`Research this business:

Business: ${n}
Address: ${o}${u?`
Business Type: ${u}`:""}${i?`
Context: ${i}`:""}`;if(s=l?await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${h}`},body:JSON.stringify({model:"gpt-5.5",messages:[{role:"system",content:d},{role:"user",content:m}],response_format:{type:"json_object"},max_completion_tokens:4096})}):await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":p,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:4096,system:d,messages:[{role:"user",content:m}],tools:[{type:"web_search_20250305",name:"web_search"}]})}),529===s.status)throw Error("API is overloaded — try again in a minute, or switch tier");if(429===s.status)throw Error("Rate limited — wait a moment and try again");if(!s.ok&&200!==s.status){let e=await s.text().catch(()=>"");throw Error(`API error ${s.status}: ${e.slice(0,200)||"Unknown error"}`)}let g=await s.json();if(g.error)throw Error(errStr(g.error));a=l?g.choices?.[0]?.message?.content||"":(g.content||[]).filter(e=>"text"===e.type).map(e=>e.text).join("");let f=a.replace(/```json\s*|```\s*/g,"").replace(/<\/?cite[^>]*>/g,"").replace(/<\/?antml:cite[^>]*>/g,"").trim();try{r=JSON.parse(f)}catch{let e=f.match(/\{[\s\S]*\}/);if(e)r=JSON.parse(e[0]);else throw Error("Could not parse response")}return t.status(200).json({success:!0,data:r})}async function handleRefine(e,t){let s,a,r;let{business_data:n,request:o,model:i}=e.body;if(!n||!o)return t.status(400).json({error:"business_data and request required"});let u="premium"===i,c=process.env.ANTHROPIC_API_KEY,l=process.env.OPENAI_API_KEY;if(!c&&!u)return t.status(500).json({error:"ANTHROPIC_API_KEY not set"});if(u&&!l)return t.status(500).json({error:"OPENAI_API_KEY not set — add it in Vercel env vars to use Premium"});let p=`You are editing a business website's content. The user will give you the current business JSON and a change request. Return ONLY valid JSON with the same schema, applying their requested changes. No markdown fences, no preamble, no explanation.

Rules:
- Keep ALL existing fields. Only modify what the user asked for.
- Preserve the original structure (signature_items, all_items, hours_detail, etc.).
- If the request is about visual styling (colors, layout, fonts, spacing) rather than content, DO NOT change the JSON — instead set a field "_styling_note" with a brief description of what they want, and return the original JSON otherwise unchanged.
- If they ask to add something not in the schema, find the most relevant existing field to put it in.
- Keep all values plain text. No HTML tags, no citations.`,h=`Current business data:
${JSON.stringify(n,null,2)}

Change request: ${o}

Return the updated JSON.`;if(s=u?await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${l}`},body:JSON.stringify({model:"gpt-5.5",messages:[{role:"system",content:p},{role:"user",content:h}],response_format:{type:"json_object"},max_completion_tokens:4096})}):await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":c,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:4096,system:p,messages:[{role:"user",content:h}]})}),529===s.status)throw Error("API is overloaded — try again in a minute");if(429===s.status)throw Error("Rate limited — wait a moment and try again");if(!s.ok){let e=await s.text().catch(()=>"");throw Error(`API error ${s.status}: ${e.slice(0,200)}`)}let d=await s.json();if(d.error)throw Error(errStr(d.error));a=u?d.choices?.[0]?.message?.content||"":(d.content||[]).filter(e=>"text"===e.type).map(e=>e.text).join("");let m=a.replace(/```json\s*|```\s*/g,"").replace(/<\/?cite[^>]*>/g,"").replace(/<\/?antml:cite[^>]*>/g,"").trim();try{r=JSON.parse(m)}catch{let e=m.match(/\{[\s\S]*\}/);if(e)r=JSON.parse(e[0]);else throw Error("Could not parse response")}return t.status(200).json({success:!0,data:r})}async function handlePhotos(e,t){let{name:s,address:a}=e.body;if(!s||!a)return t.status(400).json({error:"name and address required"});let r=process.env.GOOGLE_MAPS_API_KEY;if(!r)return t.status(200).json({success:!0,photos:[],message:"No Google Maps key — using stock photos"});let n=encodeURIComponent(`${s} ${a}`),o=await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${n}&inputtype=textquery&fields=place_id,name,photos&key=${r}`),i=await o.json();if(!i.candidates?.length)return t.status(200).json({success:!0,photos:[]});let u=i.candidates[0],c=await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${u.place_id}&fields=photos&key=${r}`),l=await c.json(),p=(l.result?.photos||u.photos||[]).slice(0,12),h=[];for(let e of p){let t=`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${e.photo_reference}&key=${r}`;try{let s=await fetch(t,{redirect:"manual"}),a=s.headers.get("location");h.push({url:a||t,width:e.width,height:e.height})}catch{h.push({url:t,width:e.width,height:e.height})}}return t.status(200).json({success:!0,place_id:u.place_id,photos:h})}r=(n.then?(await n)():n)[0],a()}catch(e){a(e)}})}};var t=require("../../webpack-api-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),s=t.X(0,[222],()=>__webpack_exec__(5333));module.exports=s})();