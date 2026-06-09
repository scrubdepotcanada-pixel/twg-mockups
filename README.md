# TWG Mockup Generator

Auto-generates branded homepage mockups for cold outreach. Enter a business name + address, and it researches them via Claude AI + pulls real photos from Google Places.

## Live URLs
- **Generator:** `mockups.thewebguys.ca/admin`
- **Mockups:** `mockups.thewebguys.ca/mockups/[slug].html`

## Env Vars (Vercel)
```
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_MAPS_API_KEY=AIza...
ADMIN_PIN=7291
```

## Adding Mockups
Drop `.html` files in `/public/mockups/` — they're instantly live at `/mockups/filename.html`.

## Stack
Next.js 14 · Vercel · Claude API (web search) · Google Places API
