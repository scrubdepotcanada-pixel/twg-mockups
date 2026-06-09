// pages/api/mockup.js
// ENV VARS: ANTHROPIC_API_KEY, GOOGLE_MAPS_API_KEY, ADMIN_PIN, NEON_DATABASE_URL

import { neon } from '@neondatabase/serverless';

function getDb() {
  return neon(process.env.NEON_DATABASE_URL);
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') { res.setHeader('Access-Control-Allow-Origin', '*'); return res.status(200).end(); }
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { action, pin } = req.body;
  if (pin !== process.env.ADMIN_PIN) return res.status(401).json({ error: 'Unauthorized' });

  try {
    if (action === 'research') return await handleResearch(req, res);
    if (action === 'photos') return await handlePhotos(req, res);
    if (action === 'save') return await handleSave(req, res);
    if (action === 'list') return await handleList(req, res);
    if (action === 'delete') return await handleDelete(req, res);
    return res.status(400).json({ error: 'Invalid action' });
  } catch (err) {
    console.error('Mockup API error:', err);
    return res.status(500).json({ error: err.message || 'Internal error' });
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
  const { name, address, notes } = req.body;
  if (!name || !address) return res.status(400).json({ error: 'name and address required' });

  const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_KEY) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set' });

  const systemPrompt = `You are a business researcher for a web design agency. Given a business name and address, search the web to find everything about this business — Google Maps, Yelp, Instagram, review sites, delivery apps, their website (if any).

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

Be accurate. Use real info. If you can't find something, infer reasonably. Return 3 signature_items and 6 all_items.`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [{ role: 'user', content: `Research this business:\n\nBusiness: ${name}\nAddress: ${address}${notes ? `\nContext: ${notes}` : ''}` }],
      tools: [{ type: 'web_search_20250305', name: 'web_search' }],
    }),
  });

  const data = await response.json();
  if (data.error) throw new Error(data.error.message);

  const textBlocks = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
  const cleaned = textBlocks.replace(/```json\s*|```\s*/g, '').trim();

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
