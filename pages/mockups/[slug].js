// pages/mockups/[slug].js
// Serves the saved mockup HTML directly — no wrapper, no Next.js chrome
// URL: mockups.thewebguys.ca/mockups/bobbys-breakfast

import { neon } from '@neondatabase/serverless';

export async function getServerSideProps({ params, res }) {
  try {
    const sql = neon(process.env.NEON_DATABASE_URL);
    const rows = await sql`SELECT html FROM mockups WHERE slug = ${params.slug} LIMIT 1`;

    if (!rows.length) {
      return { notFound: true };
    }

    // Serve raw HTML — NEVER cache, so republishes show immediately
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.write(rows[0].html);
    res.end();

    return { props: {} };
  } catch (err) {
    console.error('Mockup serve error:', err);
    return { notFound: true };
  }
}

export default function MockupPage() {
  // This never renders — HTML is served directly in getServerSideProps
  return null;
}
