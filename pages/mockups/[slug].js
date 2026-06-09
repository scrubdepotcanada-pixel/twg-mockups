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

    // Serve raw HTML directly
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
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
