// pages/admin/mockups.js
// TWG Auto Mockup Generator — Admin Only
// Requires: ADMIN_PIN env var

import { useState, useRef, useCallback, useEffect } from "react";
import Head from "next/head";

// ── Fallback stock photos by category (used when Google Places photos unavailable) ──
const STOCK = {
  cafe: [
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&q=80",
    "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
    "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=600&q=80",
    "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&q=80",
    "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80",
    "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=500&q=80",
    "https://images.unsplash.com/photo-1585325701165-351af679e300?w=500&q=80",
    "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&q=80",
    "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=500&q=80",
  ],
  restaurant: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80",
    "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=600&q=80",
    "https://images.unsplash.com/photo-1550966871-3ed3cdb51f3a?w=600&q=80",
    "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80",
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&q=80",
    "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=500&q=80",
    "https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=500&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80",
  ],
  retail: [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&q=80",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80",
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&q=80",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80",
    "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=500&q=80",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=500&q=80",
    "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=500&q=80",
  ],
  salon: [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
    "https://images.unsplash.com/photo-1521590832167-7228f0f12438?w=600&q=80",
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80",
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80",
    "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
    "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=500&q=80",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500&q=80",
    "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=500&q=80",
    "https://images.unsplash.com/photo-1521590832167-7228f0f12438?w=500&q=80",
  ],
  fitness: [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80",
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80",
    "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=80",
    "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&q=80",
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=80",
    "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=500&q=80",
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&q=80",
    "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=500&q=80",
    "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=500&q=80",
  ],
  services: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80",
    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80",
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&q=80",
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&q=80",
  ],
};

// ── Color palettes ──
const PALETTES = {
  warm:    { primary: "#2C1810", accent: "#E8A838", bg: "#FAF6F0", sage: "#7A8B6F", latte: "#D4C4B0", text: "#3A3A3A", white: "#FFFDF9" },
  cool:    { primary: "#1A2332", accent: "#4A90D9", bg: "#F0F4F8", sage: "#6B8E9B", latte: "#B0C4D4", text: "#334155", white: "#FAFCFE" },
  earthy:  { primary: "#3D2B1F", accent: "#C47D3B", bg: "#F5F0EB", sage: "#6B7F5E", latte: "#C9B99A", text: "#3A3A3A", white: "#FDFBF7" },
  modern:  { primary: "#111111", accent: "#FF4D4D", bg: "#F5F5F5", sage: "#666666", latte: "#CCCCCC", text: "#333333", white: "#FFFFFF" },
  elegant: { primary: "#1B1B2F", accent: "#C5A55A", bg: "#F8F6F2", sage: "#8A8A7A", latte: "#D4CCB8", text: "#2D2D2D", white: "#FEFDFB" },
  fresh:   { primary: "#1A3A2A", accent: "#4CAF50", bg: "#F0F7F2", sage: "#7BA68A", latte: "#B8D4C0", text: "#2D3B33", white: "#FBFDF9" },
};

// ── HTML Template Generator ──
function buildMockupHTML(data, photoUrls) {
  const p = PALETTES[data.palette] || PALETTES.warm;
  const ph = photoUrls; // array of URLs — index 0 = hero, 1-4 = grid, 5 = about, 6-11 = menu items
  const sigItems = (data.signature_items || []).slice(0, 3);
  const allItems = (data.all_items || []).slice(0, 6);
  const hours = data.hours_detail || [];
  const deliveryText = data.has_delivery && data.delivery_platforms?.length ? data.delivery_platforms.join(" · ") : "";
  const igHandle = data.instagram ? `@${data.instagram.replace(/^@/, "")}` : "";
  const igUrl = data.instagram ? `https://instagram.com/${data.instagram.replace(/^@/, "")}` : "#";
  const firstName = data.name.split(/[\s']/)[0];

  // Rating stars
  const rating = parseFloat(data.rating) || 0;
  const reviewCount = data.review_count || "";
  const ratingHTML = rating > 0 ? `<div style="display:flex;align-items:center;gap:8px;margin-top:20px">
    <span style="font-family:'DM Serif Display',serif;font-size:28px;color:${p.accent}">${rating}</span>
    <span style="font-size:18px;color:${p.accent}">${"★".repeat(Math.round(rating))}${"☆".repeat(5-Math.round(rating))}</span>
    ${reviewCount ? `<span style="font-size:13px;color:${p.sage}">(${reviewCount} reviews)</span>` : ""}
  </div>` : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${data.name} — ${data.address_line1}, ${data.city}</title>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,700;1,400&display=swap" rel="stylesheet">
<style>
:root{--p:${p.primary};--a:${p.accent};--bg:${p.bg};--sage:${p.sage};--latte:${p.latte};--t:${p.text};--w:${p.white}}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',-apple-system,sans-serif;background:var(--w);color:var(--p);-webkit-font-smoothing:antialiased}img{display:block;width:100%;height:100%;object-fit:cover}
nav{position:fixed;top:0;width:100%;z-index:100;padding:18px 48px;display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,0.92);backdrop-filter:blur(12px);border-bottom:1px solid rgba(0,0,0,0.06)}
.nl{font-family:'DM Serif Display',serif;font-size:24px;letter-spacing:-0.5px}.nl span{color:var(--a)}
.nk{display:flex;gap:32px;list-style:none;align-items:center}.nk a{text-decoration:none;color:var(--t);font-size:13px;font-weight:500;letter-spacing:.8px;text-transform:uppercase;transition:color .2s}.nk a:hover{color:var(--a)}
.nc{background:var(--p)!important;color:var(--bg)!important;padding:10px 24px!important;border-radius:24px;transition:background .2s!important}.nc:hover{background:var(--a)!important;color:var(--p)!important}
.hero{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;overflow:hidden}
.hc{display:flex;flex-direction:column;justify-content:center;padding:140px 60px 80px;background:var(--bg);position:relative}
.he{font-size:12px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:var(--sage);margin-bottom:24px}
.hc h1{font-family:'DM Serif Display',serif;font-size:clamp(44px,5vw,76px);line-height:1.02;letter-spacing:-2px}
.hc h1 em{font-family:'Playfair Display',serif;font-style:italic;color:var(--a);font-weight:400}
.hs{margin-top:24px;font-size:17px;line-height:1.7;color:var(--t);max-width:440px;opacity:.8}
.hd{margin-top:44px;display:flex;gap:36px;flex-wrap:wrap}.hdi{display:flex;flex-direction:column;gap:4px}
.hdl{font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--sage)}
.hdv{font-family:'DM Serif Display',serif;font-size:18px}
.hi{position:relative;overflow:hidden}.hi img{min-height:100vh}
.hio{position:absolute;bottom:0;left:0;right:0;padding:32px;background:linear-gradient(to top,rgba(0,0,0,.5),transparent)}.hio p{font-size:14px;color:#fff;font-weight:500}
.ss{background:var(--p);padding:52px 60px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:24px}
.sst{font-family:'DM Serif Display',serif;font-size:26px;color:var(--bg);letter-spacing:-.5px}.sst em{font-family:'Playfair Display',serif;font-style:italic;color:var(--a);font-weight:400}
.si{display:flex;gap:48px}.sii{text-align:center}.sin{font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--a);margin-bottom:4px}.sid{font-size:13px;color:var(--latte)}
.pg{display:grid;grid-template-columns:repeat(4,1fr);gap:4px}.pgi{aspect-ratio:1;overflow:hidden}.pgi img{transition:transform .5s}.pgi:hover img{transform:scale(1.08)}
.ab{padding:100px 60px;display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;max-width:1200px;margin:0 auto}
.abi{aspect-ratio:4/5;border-radius:12px;overflow:hidden;position:relative}
.abb{position:absolute;bottom:20px;left:20px;background:var(--a);color:var(--p);padding:10px 18px;border-radius:20px;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase}
.abc h2{font-family:'DM Serif Display',serif;font-size:40px;letter-spacing:-1px;line-height:1.15;margin-bottom:24px}
.abc p{font-size:16px;line-height:1.8;color:var(--t);opacity:.8;margin-bottom:16px}
.abt{display:inline-block;padding:8px 16px;background:rgba(122,139,111,.1);border-radius:20px;font-size:13px;font-weight:500;color:var(--sage);margin-right:8px;margin-bottom:8px}
.mp{background:var(--bg);padding:100px 60px}
.sh{text-align:center;margin-bottom:64px}.sh h2{font-family:'DM Serif Display',serif;font-size:40px;letter-spacing:-1px;margin-bottom:12px}.sh p{font-size:16px;color:var(--t);opacity:.6}
.mg{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;max-width:1100px;margin:0 auto}
.mc{background:var(--w);border-radius:16px;overflow:hidden;transition:transform .3s,box-shadow .3s;border:1px solid rgba(0,0,0,.04)}
.mc:hover{transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,.08)}
.mci{aspect-ratio:4/3;overflow:hidden}.mci img{transition:transform .5s}.mc:hover .mci img{transform:scale(1.06)}
.mcb{padding:28px 24px}.mcb h3{font-family:'DM Serif Display',serif;font-size:22px;margin-bottom:10px;letter-spacing:-.5px}.mcb p{font-size:14px;line-height:1.7;color:var(--t);opacity:.7}
.mct{display:inline-block;margin-top:14px;padding:6px 14px;background:rgba(232,168,56,.12);border-radius:16px;font-size:11px;font-weight:600;color:var(--a);letter-spacing:.5px;text-transform:uppercase}
.rs{padding:60px;text-align:center}.rs blockquote{font-family:'Playfair Display',serif;font-size:24px;font-style:italic;color:var(--p);max-width:700px;margin:0 auto 16px;line-height:1.5}.rs cite{font-family:'Inter',sans-serif;font-size:13px;color:var(--sage);font-style:normal}
.lo{padding:100px 60px;display:grid;grid-template-columns:1fr 1fr;gap:80px;max-width:1200px;margin:0 auto}
.loi h2{font-family:'DM Serif Display',serif;font-size:40px;letter-spacing:-1px;margin-bottom:32px}
.hg{display:grid;gap:12px;margin-bottom:40px}.hr{display:flex;justify-content:space-between;padding-bottom:12px;border-bottom:1px solid rgba(0,0,0,.06)}
.hrd{font-weight:500;font-size:15px}.hrt{font-size:15px;color:var(--t);opacity:.7}
.la{display:flex;align-items:flex-start;gap:12px;font-size:15px;line-height:1.6;color:var(--t)}.la svg{flex-shrink:0;margin-top:3px}
.lom{border-radius:16px;overflow:hidden;min-height:400px;position:relative}.lom img{min-height:400px;filter:saturate(.5) brightness(.9)}
.ml{position:absolute;bottom:20px;left:20px;background:var(--p);color:var(--bg);padding:12px 20px;border-radius:10px;font-size:14px;font-weight:500}
.ig{background:var(--p);padding:80px 60px}.igt{text-align:center;margin-bottom:48px}
.igt h2{font-family:'DM Serif Display',serif;font-size:40px;color:var(--bg);letter-spacing:-1px;margin-bottom:12px}
.igt p{font-size:16px;color:var(--latte);margin-bottom:28px}
.igb{display:inline-flex;align-items:center;gap:10px;background:var(--a);color:var(--p);padding:14px 32px;border-radius:28px;text-decoration:none;font-weight:600;font-size:15px;transition:transform .2s}.igb:hover{transform:scale(1.04)}
.igg{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;max-width:1000px;margin:0 auto}
.igi{aspect-ratio:1;border-radius:10px;overflow:hidden}.igi img{transition:transform .5s}.igi:hover img{transform:scale(1.08)}
.cb{background:var(--a);padding:48px 60px;text-align:center}
.cb h3{font-family:'DM Serif Display',serif;font-size:28px;color:var(--p);margin-bottom:12px}
.cb p{font-size:15px;color:var(--p);opacity:.8;margin-bottom:24px}
.cb a{display:inline-block;background:var(--p);color:var(--bg);padding:14px 36px;border-radius:28px;text-decoration:none;font-weight:600;font-size:14px;letter-spacing:.5px;transition:transform .2s}.cb a:hover{transform:scale(1.04)}
footer{padding:40px 60px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(0,0,0,.08);flex-wrap:wrap;gap:20px}
.fl{font-family:'DM Serif Display',serif;font-size:20px}.fl span{color:var(--a)}
.fc{font-size:13px;color:var(--t);opacity:.5}.fb{font-size:12px;color:var(--t);opacity:.4;padding:6px 14px;border:1px solid rgba(0,0,0,.1);border-radius:16px}
@media(max-width:900px){
nav{padding:14px 20px}.nk{display:none}.hero{grid-template-columns:1fr}.hc{padding:120px 24px 60px}.hi{max-height:50vh}.hi img{min-height:50vh}
.ss{padding:36px 24px;flex-direction:column;text-align:center}.si{gap:28px;flex-wrap:wrap;justify-content:center}
.pg{grid-template-columns:repeat(2,1fr)}.ab{padding:60px 24px;grid-template-columns:1fr;gap:40px}
.mp{padding:60px 24px}.mg{grid-template-columns:1fr}.lo{padding:60px 24px;grid-template-columns:1fr;gap:40px}
.ig{padding:60px 24px}.igg{grid-template-columns:repeat(2,1fr)}footer{padding:28px 24px;flex-direction:column;text-align:center}
.sh h2,.abc h2,.loi h2,.igt h2{font-size:32px}.cb{padding:36px 24px}
}
</style>
</head>
<body>
<nav><div class="nl">${firstName}<span>'s</span></div>
<ul class="nk"><li><a href="#menu">Menu</a></li><li><a href="#about">About</a></li><li><a href="#hours">Hours</a></li><li><a href="#" class="nc">Order Now</a></li></ul></nav>

<section class="hero"><div class="hc">
<div class="he">${data.address_line1} · ${data.neighbourhood || data.city}</div>
<h1>${data.tagline.replace(/(\w+)[.!]?$/, '<em>$1</em>')}</h1>
<p class="hs">${data.subtitle}</p>
${ratingHTML}
<div class="hd">
<div class="hdi"><span class="hdl">Hours</span><span class="hdv">${data.hours_summary}</span></div>
<div class="hdi"><span class="hdl">Dine In</span><span class="hdv">Walk-ins welcome</span></div>
${deliveryText ? `<div class="hdi"><span class="hdl">Delivery</span><span class="hdv">${deliveryText}</span></div>` : ""}
</div></div>
<div class="hi"><img src="${ph[0]}" alt="${data.name}">
<div class="hio"><p>📍 ${data.neighbourhood || data.city}</p></div></div></section>

<div class="ss"><div class="sst">${sigItems.length ? `Come for the vibe. Stay for <em>${sigItems[0].name}.</em>` : `Welcome to <em>${data.name}.</em>`}</div>
<div class="si">${sigItems.map(s => `<div class="sii"><div class="sin">${s.name}</div><div class="sid">${s.description.split(".")[0]}</div></div>`).join("")}</div></div>

<div class="pg">${[1,2,3,4].map(i => `<div class="pgi"><img src="${ph[i] || ph[0]}" alt="Photo ${i}"></div>`).join("")}</div>

<section class="ab" id="about"><div class="abi"><img src="${ph[5] || ph[0]}" alt="${data.name}">
<div class="abb">${data.vibe_tags?.[0] || "Local Favourite"}</div></div>
<div class="abc"><h2>Our Story.</h2><p>${data.about_paragraph}</p><p>${data.about_paragraph2}</p>
<div>${(data.vibe_tags || []).map(t => `<span class="abt">${t}</span>`).join("")}</div></div></section>

<section class="mp" id="menu"><div class="sh"><h2>What We're Known For</h2><p>See what keeps people coming back.</p></div>
<div class="mg">${allItems.map((item, i) => `<div class="mc"><div class="mci"><img src="${ph[6+i] || ph[i%5]}" alt="${item.name}"></div>
<div class="mcb"><h3>${item.emoji||""} ${item.name}</h3><p>${item.description}</p>${item.tag ? `<span class="mct">${item.tag}</span>` : ""}</div></div>`).join("")}</div></section>

${data.review_quote ? `<div class="rs"><blockquote>"${data.review_quote}"</blockquote><cite>— ${data.review_source || "Customer Review"}</cite></div>` : ""}

<section class="lo" id="hours"><div class="loi"><h2>Find Us</h2>
<div class="hg">${hours.map(h => `<div class="hr"><span class="hrd">${h.days}</span><span class="hrt">${h.time}</span></div>`).join("")}</div>
<div class="la"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
<div><strong>${data.address_line1}</strong><br>${data.city}, ${data.province_state} ${data.postal_zip}<br>${data.neighbourhood || ""}${data.phone ? `<br><br><strong>Phone:</strong> ${data.phone}` : ""}</div></div></div>
<div class="lom"><img src="${ph[4] || ph[0]}" alt="Location"><div class="ml">📍 ${data.address_line1} — Walk-ins welcome</div></div></section>

${igHandle ? `<section class="ig"><div class="igt"><h2>Follow Along</h2><p>Catch the daily specials and behind-the-scenes moments.</p>
<a href="${igUrl}" class="igb" target="_blank"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>${igHandle}</a></div>
<div class="igg">${[0,1,2,3].map(i => `<div class="igi"><img src="${ph[i+1] || ph[0]}" alt="Post ${i+1}"></div>`).join("")}</div></section>` : ""}

<div class="cb"><h3>Like what you see?</h3><p>This mockup was built for you by The Web Guys. Let's make it real.</p>
<a href="https://thewebguys.ca" target="_blank">Get In Touch →</a></div>

<footer><div class="fl">${firstName}<span>'s</span></div>
<span class="fc">© 2026 ${data.name} · ${data.address_line1}, ${data.city}</span>
<span class="fb">Built by The Web Guys · thewebguys.ca</span></footer>
</body></html>`;
}

// ── Styles ──
const S = {
  page: { minHeight: "100vh", background: "#0A0A0A", color: "#E5E5E5", fontFamily: "'Inter', -apple-system, sans-serif" },
  header: { padding: "16px 32px", borderBottom: "1px solid #1A1A1A", display: "flex", alignItems: "center", justifyContent: "space-between" },
  logo: { display: "flex", alignItems: "center", gap: 12 },
  logoIcon: { width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #3EA843, #2B4C9B)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff" },
  label: { display: "block", fontSize: 12, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "#666", marginBottom: 8 },
  input: { width: "100%", padding: "14px 16px", background: "#141414", border: "1px solid #2A2A2A", borderRadius: 10, color: "#fff", fontSize: 16, outline: "none", fontFamily: "inherit" },
  textarea: { width: "100%", padding: "14px 16px", background: "#141414", border: "1px solid #2A2A2A", borderRadius: 10, color: "#fff", fontSize: 15, outline: "none", fontFamily: "inherit", resize: "vertical" },
  btn: (active) => ({ marginTop: 8, padding: "16px 32px", background: active ? "linear-gradient(135deg, #3EA843, #2B9B4C)" : "#222", color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: active ? "pointer" : "not-allowed", fontFamily: "inherit", opacity: active ? 1 : 0.4, width: "100%" }),
  chip: { padding: "6px 12px", background: "#141414", border: "1px solid #222", borderRadius: 16, fontSize: 12, color: "#888" },
  actionBtn: (primary) => ({ padding: "10px 20px", background: primary ? "linear-gradient(135deg, #3EA843, #2B9B4C)" : "#1A1A1A", border: primary ? "none" : "1px solid #2A2A2A", borderRadius: 8, color: primary ? "#fff" : "#999", fontSize: 13, fontWeight: primary ? 600 : 500, cursor: "pointer", fontFamily: "inherit" }),
};

// ── Component ──
export default function MockupAdmin() {
  const [authed, setAuthed] = useState(false);
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [storedPin, setStoredPin] = useState("");

  // Form
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  // State
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("");
  const [mockupHTML, setMockupHTML] = useState("");
  const [businessData, setBusinessData] = useState(null);
  const [photoSource, setPhotoSource] = useState(""); // "google" or "stock"
  const [error, setError] = useState("");

  // History & Published
  const [history, setHistory] = useState([]);
  const [published, setPublished] = useState([]);
  const [publishing, setPublishing] = useState(false);
  const [publishedUrl, setPublishedUrl] = useState("");

  const loadPublished = async (p) => {
    try {
      const res = await fetch("/api/mockup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "list", pin: p }),
      });
      const data = await res.json();
      if (data.success) setPublished(data.mockups || []);
    } catch {}
  };

  const publishMockup = async () => {
    if (!mockupHTML || !businessData) return;
    setPublishing(true); setPublishedUrl("");
    const slug = (businessData.name || name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
    try {
      const res = await fetch("/api/mockup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save", pin: storedPin, slug,
          business_name: businessData.name || name,
          business_data: businessData,
          photo_urls: [],
          html: mockupHTML,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPublishedUrl(`${window.location.origin}/mockups/${slug}`);
        loadPublished(storedPin);
      }
    } catch (err) {
      setError(err.message);
    } finally { setPublishing(false); }
  };

  const deleteMockup = async (slug) => {
    if (!confirm(`Delete mockup "${slug}"?`)) return;
    try {
      await fetch("/api/mockup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", pin: storedPin, slug }),
      });
      loadPublished(storedPin);
    } catch {}
  };

  useEffect(() => {
    const saved = localStorage.getItem("twg_mockup_pin");
    if (saved) { setStoredPin(saved); setAuthed(true); setPin(saved); loadPublished(saved); }
    const hist = localStorage.getItem("twg_mockup_history");
    if (hist) try { setHistory(JSON.parse(hist)); } catch {}
  }, []);

  const handleAuth = async () => {
    try {
      const res = await fetch("/api/mockup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "research", pin, name: "test", address: "test" }),
      });
      if (res.status === 401) { setPinError("Wrong PIN"); return; }
      localStorage.setItem("twg_mockup_pin", pin);
      setStoredPin(pin);
      setAuthed(true);
      loadPublished(pin);
    } catch {
      setPinError("Connection error");
    }
  };

  const steps = ["Searching Google Places...", "Fetching business photos...", "Researching with Claude AI...", "Analyzing reviews & vibe...", "Building the mockup..."];

  const generate = useCallback(async () => {
    if (!name.trim() || !address.trim()) return;
    setLoading(true); setError(""); setMockupHTML(""); setBusinessData(null);

    let stepIdx = 0;
    setStep(steps[0]);
    const interval = setInterval(() => { stepIdx++; if (stepIdx < steps.length) setStep(steps[stepIdx]); }, 3500);

    try {
      // Step 1: Get Google Places photos
      let googlePhotos = [];
      try {
        const photoRes = await fetch("/api/mockup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "photos", pin: storedPin, name, address }),
        });
        const photoData = await photoRes.json();
        if (photoData.success && photoData.photos?.length > 0) {
          googlePhotos = photoData.photos.map((p) => p.url);
        }
      } catch (e) {
        console.warn("Google Photos failed, will use stock:", e);
      }

      // Step 2: Research with Claude
      const researchRes = await fetch("/api/mockup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "research", pin: storedPin, name, address, notes }),
      });
      const researchData = await researchRes.json();
      if (!researchData.success) throw new Error(researchData.error || "Research failed");

      const biz = researchData.data;
      setBusinessData(biz);

      // Step 3: Pick photos — Google Places if available, else stock
      const category = biz.category || "cafe";
      const stockPhotos = STOCK[category] || STOCK.cafe;
      let finalPhotos;

      if (googlePhotos.length >= 6) {
        finalPhotos = googlePhotos;
        setPhotoSource("google");
      } else if (googlePhotos.length > 0) {
        // Mix: use Google photos first, fill remainder with stock
        finalPhotos = [...googlePhotos];
        let stockIdx = 0;
        while (finalPhotos.length < 12) {
          finalPhotos.push(stockPhotos[stockIdx % stockPhotos.length]);
          stockIdx++;
        }
        setPhotoSource("mixed");
      } else {
        finalPhotos = stockPhotos;
        setPhotoSource("stock");
      }

      // Step 4: Generate HTML
      const html = buildMockupHTML(biz, finalPhotos);
      setMockupHTML(html);

      // Save to history
      const entry = { name: biz.name, slug: biz.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), date: new Date().toISOString(), category, photoSource: googlePhotos.length > 0 ? "google" : "stock" };
      const newHist = [entry, ...history].slice(0, 20);
      setHistory(newHist);
      localStorage.setItem("twg_mockup_history", JSON.stringify(newHist));

    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      clearInterval(interval); setLoading(false); setStep("");
    }
  }, [name, address, notes, storedPin, history]);

  const downloadHTML = () => {
    if (!mockupHTML) return;
    const slug = (businessData?.name || name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "");
    const blob = new Blob([mockupHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = `${slug}-mockup.html`; a.click();
    URL.revokeObjectURL(url);
  };

  const copyHTML = () => { if (mockupHTML) navigator.clipboard.writeText(mockupHTML); };

  // ── PIN Screen ──
  if (!authed) {
    return (
      <>
        <Head><title>TWG Mockup Generator — Admin</title></Head>
        <div style={{ ...S.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 360, textAlign: "center" }}>
            <div style={{ ...S.logoIcon, width: 48, height: 48, fontSize: 20, margin: "0 auto 24px", borderRadius: 12 }}>W</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 8 }}>Admin Access</h2>
            <p style={{ fontSize: 14, color: "#666", marginBottom: 32 }}>Enter your PIN to access the mockup generator.</p>
            <input
              type="password"
              value={pin}
              onChange={(e) => { setPin(e.target.value); setPinError(""); }}
              onKeyDown={(e) => e.key === "Enter" && handleAuth()}
              placeholder="Enter PIN"
              style={{ ...S.input, textAlign: "center", fontSize: 24, letterSpacing: 8, marginBottom: 16 }}
            />
            {pinError && <p style={{ color: "#FF6B6B", fontSize: 13, marginBottom: 12 }}>{pinError}</p>}
            <button onClick={handleAuth} style={{ ...S.btn(pin.length > 0), marginTop: 0 }}>Unlock</button>
          </div>
        </div>
      </>
    );
  }

  // ── Main UI ──
  return (
    <>
      <Head><title>TWG Mockup Generator</title></Head>
      <div style={S.page}>
        {/* Header */}
        <div style={S.header}>
          <div style={S.logo}>
            <div style={S.logoIcon}>W</div>
            <span style={{ fontSize: 15, fontWeight: 600, letterSpacing: -0.3 }}>Mockup Generator</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 12, color: "#444" }}>ADMIN</span>
            <button onClick={() => { setAuthed(false); localStorage.removeItem("twg_mockup_pin"); }} style={{ ...S.actionBtn(false), fontSize: 11 }}>Logout</button>
          </div>
        </div>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 32px" }}>
          {!mockupHTML ? (
            <div style={{ display: "grid", gridTemplateColumns: (history.length || published.length) ? "1fr 300px" : "1fr", gap: 48, maxWidth: (history.length || published.length) ? 900 : 560, margin: "0 auto" }}>
              {/* Form */}
              <div>
                <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: -1, marginBottom: 8, color: "#fff" }}>
                  Auto Mockup Generator
                </h1>
                <p style={{ fontSize: 15, color: "#666", marginBottom: 36, lineHeight: 1.6 }}>
                  Enter a business name + address. We'll pull their Google photos, research them with AI, and generate a branded homepage mockup.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div>
                    <label style={S.label}>Business Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Bobby's Breakfast Cafe & Bar" style={S.input} />
                  </div>
                  <div>
                    <label style={S.label}>Full Address</label>
                    <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="810 College St, Toronto, ON M6G 1C8" style={S.input} />
                  </div>
                  <div>
                    <label style={S.label}>Notes <span style={{ color: "#444" }}>(optional — Instagram handle, known menu items, etc.)</span></label>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="e.g. Instagram @bobbystoronto, known for The Lazy Apple" rows={3} style={S.textarea} />
                  </div>
                  <button onClick={generate} disabled={loading || !name.trim() || !address.trim()} style={S.btn(!loading && name.trim() && address.trim())}>
                    {loading ? "Generating..." : "Generate Mockup →"}
                  </button>
                  {error && <div style={{ padding: "14px 18px", background: "#1A0A0A", border: "1px solid #3A1515", borderRadius: 10, color: "#FF6B6B", fontSize: 14 }}>{error}</div>}
                </div>

                {loading && (
                  <div style={{ marginTop: 48, textAlign: "center" }}>
                    <div style={{ display: "inline-block", width: 44, height: 44, border: "3px solid #222", borderTopColor: "#3EA843", borderRadius: "50%", animation: "spin .8s linear infinite" }} />
                    <p style={{ marginTop: 16, fontSize: 15, color: "#3EA843", fontWeight: 500 }}>{step}</p>
                    <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                  </div>
                )}
              </div>

              {/* History sidebar */}
              {(history.length > 0 || published.length > 0) && (
                <div>
                  {published.length > 0 && (
                    <>
                      <h3 style={{ fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "#3EA843", marginBottom: 16 }}>Published Live</h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                        {published.map((m, i) => (
                          <div key={i} style={{ padding: "12px 14px", background: "#0A1A0A", border: "1px solid #1A3A1A", borderRadius: 8 }}>
                            <a href={`/mockups/${m.slug}`} target="_blank" rel="noopener" style={{ fontSize: 14, color: "#4CAF50", fontWeight: 500, textDecoration: "none" }}>{m.business_name}</a>
                            <div style={{ fontSize: 11, color: "#555", marginTop: 4, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span>{new Date(m.created_at).toLocaleDateString()}</span>
                              <button onClick={() => deleteMockup(m.slug)} style={{ background: "none", border: "none", color: "#553333", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>Delete</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                  {history.length > 0 && (
                    <>
                      <h3 style={{ fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", color: "#555", marginBottom: 16 }}>Recent</h3>
                      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        {history.map((h, i) => (
                          <div key={i} style={{ padding: "12px 14px", background: "#111", border: "1px solid #1A1A1A", borderRadius: 8, cursor: "pointer" }}
                            onClick={() => { setName(h.name); setAddress(""); }}>
                            <div style={{ fontSize: 14, color: "#ccc", fontWeight: 500 }}>{h.name}</div>
                            <div style={{ fontSize: 11, color: "#555", marginTop: 4 }}>{h.category} · {h.photoSource === "google" ? "📸 Real photos" : "🖼 Stock"} · {new Date(h.date).toLocaleDateString()}</div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* Preview */
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 16 }}>
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{businessData?.name || name}</h2>
                  <p style={{ fontSize: 14, color: "#666" }}>
                    {businessData?.category} · {businessData?.palette} palette · {photoSource === "google" ? "📸 Google Places photos" : photoSource === "mixed" ? "📸 Mixed photos" : "🖼 Stock photos"}
                  </p>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={() => { setMockupHTML(""); setBusinessData(null); setPublishedUrl(""); }} style={S.actionBtn(false)}>← New</button>
                  <button onClick={copyHTML} style={S.actionBtn(false)}>Copy HTML</button>
                  <button onClick={downloadHTML} style={S.actionBtn(false)}>Download</button>
                  <button onClick={publishMockup} disabled={publishing} style={{ ...S.actionBtn(true), opacity: publishing ? 0.6 : 1 }}>
                    {publishing ? "Publishing..." : "Publish Live →"}
                  </button>
                </div>
              </div>

              {publishedUrl && (
                <div style={{ padding: "14px 18px", background: "#0A1A0A", border: "1px solid #1A3A1A", borderRadius: 10, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ fontSize: 13, color: "#4CAF50", fontWeight: 600 }}>✓ Published!</span>
                    <a href={publishedUrl} target="_blank" rel="noopener" style={{ marginLeft: 12, fontSize: 13, color: "#3EA843", textDecoration: "underline", fontFamily: "monospace" }}>{publishedUrl}</a>
                  </div>
                  <button onClick={() => { navigator.clipboard.writeText(publishedUrl); }} style={{ ...S.actionBtn(false), fontSize: 11 }}>Copy Link</button>
                </div>
              )}

              {businessData && (
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                  {businessData.rating && <span style={S.chip}>⭐ {businessData.rating} ({businessData.review_count} reviews)</span>}
                  {businessData.phone && <span style={S.chip}>📞 {businessData.phone}</span>}
                  {businessData.instagram && <span style={S.chip}>📸 @{businessData.instagram}</span>}
                  {businessData.has_delivery && <span style={S.chip}>🚗 {businessData.delivery_platforms?.join(", ")}</span>}
                  {businessData.website && <span style={{ ...S.chip, background: "#0A1A0A", borderColor: "#1A3A1A", color: "#4CAF50" }}>⚠️ Has existing site</span>}
                </div>
              )}

              <div style={{ border: "1px solid #2A2A2A", borderRadius: 12, overflow: "hidden", background: "#fff" }}>
                <div style={{ padding: "10px 16px", background: "#1A1A1A", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #2A2A2A" }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57" }} />
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFBD2E" }} />
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840" }} />
                  <span style={{ marginLeft: 12, fontSize: 12, color: "#555", fontFamily: "monospace" }}>
                    thewebguys.ca/mockups/{(businessData?.name || name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}
                  </span>
                </div>
                <iframe srcDoc={mockupHTML} style={{ width: "100%", height: "80vh", border: "none" }} title="Preview" />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
