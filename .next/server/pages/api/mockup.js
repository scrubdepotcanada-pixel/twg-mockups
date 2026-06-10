"use strict";(()=>{var e={};e.id=197,e.ids=[197],e.modules={145:e=>{e.exports=require("next/dist/compiled/next-server/pages-api.runtime.prod.js")},2480:(e,t,s)=>{s.r(t),s.d(t,{config:()=>c,default:()=>n,routeModule:()=>l});var a={};s.r(a),s.d(a,{default:()=>handler});var r=s(1802),o=s(7153),i=s(6249);async function handler(e,t){if("POST"!==e.method)return t.status(405).json({error:"POST only"});let{action:s,pin:a}=e.body;if(a!==process.env.ADMIN_PIN)return t.status(401).json({error:"Unauthorized"});try{if("research"===s)return await handleResearch(e,t);if("photos"===s)return await handlePhotos(e,t);return t.status(400).json({error:"Invalid action"})}catch(e){return console.error("Mockup API error:",e),t.status(500).json({error:e.message||"Internal error"})}}async function handleResearch(e,t){let s;let{name:a,address:r,notes:o,category:i}=e.body;if(!a||!r)return t.status(400).json({error:"name and address required"});let n=process.env.ANTHROPIC_API_KEY;if(!n)return t.status(500).json({error:"ANTHROPIC_API_KEY not set"});let c=`You are a business researcher for a web design agency. Given a business name, address, and optionally a business type, search the web to find everything about this business — Google Maps, Yelp, Instagram, review sites, their website (if any), industry directories.

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

Be accurate. Use real info. If you can't find something, infer reasonably. Return 3 signature_items and 6 all_items.`,l=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json","x-api-key":n,"anthropic-version":"2023-06-01"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:4096,system:c,messages:[{role:"user",content:`Research this business:

Business: ${a}
Address: ${r}${i?`
Business Type: ${i}`:""}${o?`
Context: ${o}`:""}`}],tools:[{type:"web_search_20250305",name:"web_search"}]})}),u=await l.json();if(u.error)throw Error(u.error.message);let p=(u.content||[]).filter(e=>"text"===e.type).map(e=>e.text).join(""),d=p.replace(/```json\s*|```\s*/g,"").trim();try{s=JSON.parse(d)}catch{let e=d.match(/\{[\s\S]*\}/);if(e)s=JSON.parse(e[0]);else throw Error("Could not parse response")}return t.status(200).json({success:!0,data:s})}async function handlePhotos(e,t){let{name:s,address:a}=e.body;if(!s||!a)return t.status(400).json({error:"name and address required"});let r=process.env.GOOGLE_MAPS_API_KEY;if(!r)return t.status(200).json({success:!0,photos:[],message:"GOOGLE_MAPS_API_KEY not set — using stock photos"});let o=encodeURIComponent(`${s} ${a}`),i=await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${o}&inputtype=textquery&fields=place_id,name,photos&key=${r}`),n=await i.json();if(!n.candidates?.length)return t.status(200).json({success:!0,photos:[]});let c=n.candidates[0],l=await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${c.place_id}&fields=photos&key=${r}`),u=await l.json(),p=(u.result?.photos||c.photos||[]).slice(0,12),d=[];for(let e of p){let t=`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${e.photo_reference}&key=${r}`;try{let s=await fetch(t,{redirect:"manual"}),a=s.headers.get("location");d.push({url:a||t,width:e.width,height:e.height})}catch{d.push({url:t,width:e.width,height:e.height})}}return t.status(200).json({success:!0,place_id:c.place_id,photos:d})}let n=(0,i.l)(a,"default"),c=(0,i.l)(a,"config"),l=new r.PagesAPIRouteModule({definition:{kind:o.x.PAGES_API,page:"/api/mockup",pathname:"/api/mockup",bundlePath:"",filename:""},userland:a})}};var t=require("../../webpack-api-runtime.js");t.C(e);var __webpack_exec__=e=>t(t.s=e),s=t.X(0,[222],()=>__webpack_exec__(2480));module.exports=s})();