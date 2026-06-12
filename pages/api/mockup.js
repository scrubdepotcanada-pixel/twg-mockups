// pages/api/mockup.js
// ENV VARS: ANTHROPIC_API_KEY, GOOGLE_MAPS_API_KEY, ADMIN_PIN, NEON_DATABASE_URL

import { neon } from '@neondatabase/serverless';

function getDb() {
  return neon(process.env.NEON_DATABASE_URL);
}

function errStr(e) {
  if (typeof e === 'string') return e;
  if (e && typeof e.message === 'string') return e.message;
  try { return JSON.stringify(e); } catch { return 'Unknown error'; }
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') { res.setHeader('Access-Control-Allow-Origin', '*'); return res.status(200).end(); }
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { action, pin } = req.body;
  if (pin !== process.env.ADMIN_PIN) return res.status(401).json({ error: 'Unauthorized' });

  try {
    if (action === 'research') return await handleResearch(req, res);
    if (action === 'refine') return await handleRefine(req, res);
    if (action === 'photos') return await handlePhotos(req, res);
    if (action === 'save') return await handleSave(req, res);
    if (action === 'list') return await handleList(req, res);
    if (action === 'get') return await handleGet(req, res);
    if (action === 'delete') return await handleDelete(req, res);
    return res.status(400).json({ error: 'Invalid action' });
  } catch (err) {
    console.error('Mockup API error:', err);
    return res.status(500).json({ error: errStr(err) || 'Internal error' });
  }
}

// ── SAVE mockup to Neon ──
async function handleSave(req, res) {
  const { slug, business_name, business_data, photo_urls, html } = req.body;
  if (!slug || !html || !business_name) return res.status(400).json({ error: 'slug, business_name, and html required' });

  const sql = getDb();

  // Upsert — if slug exists, update it
  await sql`
    INSERT INTO mockups (slug, business_name, business_data, photo_urls, html)
    VALUES (${slug}, ${business_name}, ${JSON.stringify(business_data || {})}, ${JSON.stringify(photo_urls || [])}, ${html})
    ON CONFLICT (slug) DO UPDATE SET
      business_name = EXCLUDED.business_name,
      business_data = EXCLUDED.business_data,
      photo_urls = EXCLUDED.photo_urls,
      html = EXCLUDED.html,
      created_at = NOW()
  `;

  return res.status(200).json({ success: true, url: `/mockups/${slug}` });
}

// ── LIST all saved mockups ──
async function handleList(req, res) {
  const sql = getDb();
  const rows = await sql`
    SELECT slug, business_name, business_data, created_at
    FROM mockups
    ORDER BY created_at DESC
    LIMIT 50
  `;
  return res.status(200).json({ success: true, mockups: rows });
}

// ── GET a single mockup by slug (full data + photos) ──
async function handleGet(req, res) {
  const { slug } = req.body;
  if (!slug) return res.status(400).json({ error: 'slug required' });

  const sql = getDb();
  const rows = await sql`
    SELECT slug, business_name, business_data, photo_urls, html, created_at
    FROM mockups WHERE slug = ${slug} LIMIT 1
  `;
  if (!rows.length) return res.status(404).json({ error: 'Mockup not found' });

  return res.status(200).json({ success: true, mockup: rows[0] });
}

// ── DELETE a mockup ──
async function handleDelete(req, res) {
  const { slug } = req.body;
  if (!slug) return res.status(400).json({ error: 'slug required' });

  const sql = getDb();
  await sql`DELETE FROM mockups WHERE slug = ${slug}`;
  return res.status(200).json({ success: true });
}

// ── RESEARCH via Claude + web search ──
async function handleResearch(req, res) {
  const { name, address, notes, category, model } = req.body;
  if (!name || !address) return res.status(400).json({ error: 'name and address required' });

  const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_KEY) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set' });

  const isPremium = model === 'premium';
  const modelId = isPremium ? 'claude-fable-5' : 'claude-sonnet-4-20250514';

  const systemPrompt = `You are a business researcher for a web design agency. Given a business name, address, and optionally a business type, search the web to find everything about this business — Google Maps, Yelp, Instagram, review sites, their website (if any), industry directories.

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

Be accurate. Use real info. If you can't find something, infer reasonably. Return ${isPremium ? '4' : '3'} signature_items and ${isPremium ? '9' : '6'} all_items.${isPremium ? ' Write richer, more compelling descriptions. Make the tagline creative and memorable. Write a longer, more engaging about_paragraph.' : ''} Do NOT include any HTML tags, citations, or source references in the JSON values — plain text only.`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: modelId,
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: `Research this business:\n\nBusiness: ${name}\nAddress: ${address}${category ? `\nBusiness Type: ${category}` : ''}${notes ? `\nContext: ${notes}` : ''}` }],
      tools: [{ type: 'web_search_20250305', name: 'web_search' }],
    }),
  });

  if (response.status === 529) throw new Error('Claude API is overloaded — try again in a minute, or switch to Standard model');
  if (response.status === 429) throw new Error('Rate limited — wait a moment and try again');
  if (!response.ok && response.status !== 200) {
    const errBody = await response.text().catch(() => '');
    throw new Error(`API error ${response.status}: ${errBody.slice(0, 200) || 'Unknown error'}`);
  }

  const data = await response.json();
  if (data.error) throw new Error(errStr(data.error));

  const textBlocks = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
  const cleaned = textBlocks.replace(/```json\s*|```\s*/g, '').replace(/<\/?cite[^>]*>/g, '').replace(/<\/?antml:cite[^>]*>/g, '').trim();

  let parsed;
  try { parsed = JSON.parse(cleaned); }
  catch { const m = cleaned.match(/\{[\s\S]*\}/); if (m) parsed = JSON.parse(m[0]); else throw new Error('Could not parse response'); }

  return res.status(200).json({ success: true, data: parsed });
}

// ── REFINE existing mockup: tweak business_data based on user request ──
async function handleRefine(req, res) {
  const { business_data, request, model } = req.body;
  if (!business_data || !request) return res.status(400).json({ error: 'business_data and request required' });

  const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_KEY) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set' });

  const modelId = model === 'premium' ? 'claude-fable-5' : 'claude-sonnet-4-20250514';

  const systemPrompt = `You are editing a business website's content. The user will give you the current business JSON and a change request. Return ONLY valid JSON with the same schema, applying their requested changes. No markdown fences, no preamble, no explanation.

Rules:
- Keep ALL existing fields. Only modify what the user asked for.
- Preserve the original structure (signature_items, all_items, hours_detail, etc.).
- If the request is about visual styling (colors, layout, fonts, spacing) rather than content, DO NOT change the JSON — instead set a field "_styling_note" with a brief description of what they want, and return the original JSON otherwise unchanged.
- If they ask to add something not in the schema, find the most relevant existing field to put it in.
- Keep all values plain text. No HTML tags, no citations.`;

  const userPrompt = `Current business data:\n${JSON.stringify(business_data, null, 2)}\n\nChange request: ${request}\n\nReturn the updated JSON.`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-api-key': ANTHROPIC_KEY, 'anthropic-version': '2023-06-01' },
    body: JSON.stringify({ model: modelId, max_tokens: 4096, system: systemPrompt, messages: [{ role: 'user', content: userPrompt }] }),
  });

  if (response.status === 529) throw new Error('Claude API is overloaded — try again in a minute');
  if (response.status === 429) throw new Error('Rate limited — wait a moment and try again');
  if (!response.ok) { const t = await response.text().catch(() => ''); throw new Error(`API error ${response.status}: ${t.slice(0, 200)}`); }

  const data = await response.json();
  if (data.error) throw new Error(errStr(data.error));

  const textBlocks = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
  const cleaned = textBlocks.replace(/```json\s*|```\s*/g, '').replace(/<\/?cite[^>]*>/g, '').replace(/<\/?antml:cite[^>]*>/g, '').trim();

  let parsed;
  try { parsed = JSON.parse(cleaned); }
  catch { const m = cleaned.match(/\{[\s\S]*\}/); if (m) parsed = JSON.parse(m[0]); else throw new Error('Could not parse response'); }

  return res.status(200).json({ success: true, data: parsed });
}

// ── PHOTOS from Google Places ──
async function handlePhotos(req, res) {
  const { name, address } = req.body;
  if (!name || !address) return res.status(400).json({ error: 'name and address required' });

  const GMAPS_KEY = process.env.GOOGLE_MAPS_API_KEY;
  if (!GMAPS_KEY) return res.status(200).json({ success: true, photos: [], message: 'No Google Maps key — using stock photos' });

  const query = encodeURIComponent(`${name} ${address}`);
  const findRes = await fetch(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${query}&inputtype=textquery&fields=place_id,name,photos&key=${GMAPS_KEY}`);
  const findData = await findRes.json();

  if (!findData.candidates?.length) return res.status(200).json({ success: true, photos: [] });

  const place = findData.candidates[0];
  const detailRes = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${place.place_id}&fields=photos&key=${GMAPS_KEY}`);
  const detailData = await detailRes.json();

  const photoRefs = (detailData.result?.photos || place.photos || []).slice(0, 12);
  const photos = [];

  for (const photo of photoRefs) {
    const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photo_reference=${photo.photo_reference}&key=${GMAPS_KEY}`;
    try {
      const r = await fetch(photoUrl, { redirect: 'manual' });
      const direct = r.headers.get('location');
      photos.push({ url: direct || photoUrl, width: photo.width, height: photo.height });
    } catch {
      photos.push({ url: photoUrl, width: photo.width, height: photo.height });
    }
  }

  return res.status(200).json({ success: true, place_id: place.place_id, photos });
}
