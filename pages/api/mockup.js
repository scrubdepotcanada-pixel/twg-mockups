// pages/api/mockup.js
// ENV VARS: ANTHROPIC_API_KEY, GOOGLE_MAPS_API_KEY, ADMIN_PIN

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { action, pin } = req.body;
  if (pin !== process.env.ADMIN_PIN) return res.status(401).json({ error: 'Unauthorized' });

  try {
    if (action === 'research') return await handleResearch(req, res);
    if (action === 'photos') return await handlePhotos(req, res);
    return res.status(400).json({ error: 'Invalid action' });
  } catch (err) {
    console.error('Mockup API error:', err);
    return res.status(500).json({ error: err.message || 'Internal error' });
  }
}

async function handleResearch(req, res) {
  const { name, address, notes, category } = req.body;
  if (!name || !address) return res.status(400).json({ error: 'name and address required' });

  const ANTHROPIC_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_KEY) return res.status(500).json({ error: 'ANTHROPIC_API_KEY not set' });

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
      messages: [{ role: 'user', content: `Research this business:\n\nBusiness: ${name}\nAddress: ${address}${category ? `\nBusiness Type: ${category}` : ''}${notes ? `\nContext: ${notes}` : ''}` }],
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

async function handlePhotos(req, res) {
  const { name, address } = req.body;
  if (!name || !address) return res.status(400).json({ error: 'name and address required' });

  const GMAPS_KEY = process.env.GOOGLE_MAPS_API_KEY;
  if (!GMAPS_KEY) return res.status(200).json({ success: true, photos: [], message: 'GOOGLE_MAPS_API_KEY not set — using stock photos' });

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
