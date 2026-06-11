// pages/admin/mockups.js
// TWG Auto Mockup Generator — Admin Only
// Requires: ADMIN_PIN env var

import { useState, useRef, useCallback, useEffect } from "react";
import Head from "next/head";

// ── Fallback stock photos by category (used when Google Places photos unavailable) ──
const STOCK = {
  dental: [
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80",
    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&q=80",
    "https://images.unsplash.com/photo-1616391182219-e080b4d1043a?w=600&q=80",
    "https://images.unsplash.com/photo-1704455306251-b4634215d98f?w=600&q=80",
    "https://images.unsplash.com/photo-1578152960762-c72eac9db779?w=600&q=80",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&q=80",
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500&q=80",
    "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=500&q=80",
    "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=500&q=80",
  ],
  medical: [
    "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80",
    "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&q=80",
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&q=80",
    "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=600&q=80",
    "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&q=80",
    "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=500&q=80",
    "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=500&q=80",
    "https://images.unsplash.com/photo-1583911860205-72f8ac8ddcbe?w=500&q=80",
    "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=500&q=80",
  ],
  auto: [
    "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80",
    "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=600&q=80",
    "https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f?w=600&q=80",
    "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=600&q=80",
    "https://images.unsplash.com/photo-1613214049841-028ec865d6a3?w=600&q=80",
    "https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?w=600&q=80",
    "https://images.unsplash.com/photo-1632823471565-1ecdf5c6da05?w=500&q=80",
    "https://images.unsplash.com/photo-1542362567-b07e54358753?w=500&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80",
    "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&q=80",
  ],
  bar: [
    "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=600&q=80",
    "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&q=80",
    "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80",
    "https://images.unsplash.com/photo-1574096079513-d8259312b785?w=600&q=80",
    "https://images.unsplash.com/photo-1569924995012-c4c706bfcd51?w=600&q=80",
    "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=500&q=80",
    "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?w=500&q=80",
    "https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=500&q=80",
    "https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&q=80",
  ],
  bakery: [
    "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
    "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80",
    "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=600&q=80",
    "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=600&q=80",
    "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?w=600&q=80",
    "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&q=80",
    "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=500&q=80",
    "https://images.unsplash.com/photo-1464195244916-405fa0a82545?w=500&q=80",
    "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?w=500&q=80",
    "https://images.unsplash.com/photo-1534620808146-d33bb39128b2?w=500&q=80",
  ],
  spa: [
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80",
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80",
    "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80",
    "https://images.unsplash.com/photo-1583416750470-965b2707b355?w=600&q=80",
    "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=600&q=80",
    "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=500&q=80",
    "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=500&q=80",
    "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=500&q=80",
    "https://images.unsplash.com/photo-1620733723572-11c53f73a416?w=500&q=80",
  ],
  legal: [
    "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80",
    "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=600&q=80",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&q=80",
    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&q=80",
    "https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?w=600&q=80",
    "https://images.unsplash.com/photo-1453945619913-79ec89a82c51?w=600&q=80",
    "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=500&q=80",
    "https://images.unsplash.com/photo-1436450412740-6b988f486c6b?w=500&q=80",
    "https://images.unsplash.com/photo-1462826303086-329426d1aef5?w=500&q=80",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80",
  ],
  realestate: [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=500&q=80",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=500&q=80",
    "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=500&q=80",
    "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=500&q=80",
  ],
  construction: [
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&q=80",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80",
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80",
    "https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?w=600&q=80",
    "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=600&q=80",
    "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&q=80",
    "https://images.unsplash.com/photo-1521790797524-b2497295b8a0?w=500&q=80",
    "https://images.unsplash.com/photo-1590725140246-20acdee442be?w=500&q=80",
    "https://images.unsplash.com/photo-1517089596392-fb9a9033e05b?w=500&q=80",
  ],
  cleaning: [
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
    "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=80",
    "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600&q=80",
    "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&q=80",
    "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600&q=80",
    "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&q=80",
    "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?w=500&q=80",
    "https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?w=500&q=80",
    "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500&q=80",
    "https://images.unsplash.com/photo-1622461290544-7d23f17ba6a3?w=500&q=80",
  ],
  pet: [
    "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=800&q=80",
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80",
    "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=80",
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&q=80",
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600&q=80",
    "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=80",
    "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=500&q=80",
    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&q=80",
    "https://images.unsplash.com/photo-1415369629372-26f2fe60c467?w=500&q=80",
    "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=500&q=80",
  ],
  accounting: [
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=600&q=80",
    "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&q=80",
    "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&q=80",
    "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=500&q=80",
    "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=500&q=80",
    "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=500&q=80",
  ],
  photography: [
    "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80",
    "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&q=80",
    "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&q=80",
    "https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=600&q=80",
    "https://images.unsplash.com/photo-1471341971476-ae15ff979fc0?w=600&q=80",
    "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?w=600&q=80",
    "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=500&q=80",
    "https://images.unsplash.com/photo-1495707902641-75cac588d2e9?w=500&q=80",
    "https://images.unsplash.com/photo-1520390138845-fd2d229dd553?w=500&q=80",
    "https://images.unsplash.com/photo-1606986628253-05620e9b0a80?w=500&q=80",
  ],
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
function buildMockupHTML(data, photoUrls, template) {
  const p = PALETTES[data.palette] || PALETTES.warm;
  const ph = photoUrls;
  const fb = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80";
  const img = (src, alt) => `<img src="${src}" alt="${alt}" onerror="this.onerror=null;this.src='${fb}'">`;
  const sigItems = (data.signature_items || []).slice(0, 3);
  const allItems = (data.all_items || []).slice(0, 6);
  const hours = data.hours_detail || [];
  const deliveryText = data.has_delivery && data.delivery_platforms?.length ? data.delivery_platforms.join(" · ") : "";
  const igHandle = data.instagram ? `@${data.instagram.replace(/^@/, "")}` : "";
  const igUrl = data.instagram ? `https://instagram.com/${data.instagram.replace(/^@/, "")}` : "#";
  const firstName = data.name.split(/[\s']/)[0];
  const isFood = ["restaurant","cafe","bar","bakery"].includes(data.category);
  const navLabel = data.items_label || (isFood ? "Menu" : "Services");
  const cta = data.cta_primary || "Contact Us";
  const rating = parseFloat(data.rating) || 0;
  const reviewCount = data.review_count || "";
  const hoursHTML = hours.map(h => `<div style="display:flex;justify-content:space-between;padding-bottom:12px;border-bottom:1px solid rgba(0,0,0,.06)"><span style="font-weight:500;font-size:15px">${h.days}</span><span style="font-size:15px;opacity:.7">${h.time}</span></div>`).join("");
  const head = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${data.name} — ${data.address_line1}, ${data.city}</title><link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,700;1,400&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">`;
  const interactiveJS = `<script>
// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth',block:'start'})})});
// Fade-in on scroll
const obs=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)'}})},{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('section,div[class]>div').forEach(el=>{if(el.closest('nav')||el.closest('footer'))return;el.style.opacity='0';el.style.transform='translateY(24px)';el.style.transition='opacity .7s ease,transform .7s ease';obs.observe(el)});
// Navbar shrink on scroll
const nav=document.querySelector('nav');if(nav){let last=0;window.addEventListener('scroll',()=>{const y=window.scrollY;nav.style.padding=y>80?'12px 48px':'';nav.style.transition='padding .3s ease';last=y},{ passive:true })}
</script>`;
  const d = { p, ph, fb, img, sigItems, allItems, hours, deliveryText, igHandle, igUrl, firstName, isFood, navLabel, cta, rating, reviewCount, head, hoursHTML, interactiveJS };
  if (template === "bold") return templateBold(data, d);
  if (template === "editorial") return templateEditorial(data, d);
  return templateClassic(data, d);
}

// ═════════════════════════════════════════
// TEMPLATE: CLASSIC — Split hero, card grid
// ═════════════════════════════════════════
function templateClassic(data, d) {
  const { p, ph, img, sigItems, allItems, deliveryText, firstName, isFood, navLabel, cta, rating, reviewCount, head, hoursHTML } = d;
  const ratingHTML = rating > 0 ? `<div style="display:flex;align-items:center;gap:8px;margin-top:20px"><span style="font-family:'DM Serif Display',serif;font-size:28px;color:${p.accent}">${rating}</span><span style="font-size:18px;color:${p.accent}">${"★".repeat(Math.round(rating))}${"☆".repeat(5-Math.round(rating))}</span>${reviewCount ? `<span style="font-size:13px;color:${p.sage}">(${reviewCount} reviews)</span>` : ""}</div>` : "";
  return `${head}<style>
:root{--p:${p.primary};--a:${p.accent};--bg:${p.bg};--sage:${p.sage};--latte:${p.latte};--t:${p.text};--w:${p.white}}
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',-apple-system,sans-serif;background:var(--w);color:var(--p);-webkit-font-smoothing:antialiased}img{display:block;width:100%;height:100%;object-fit:cover}
nav{position:fixed;top:0;width:100%;z-index:100;padding:18px 48px;display:flex;justify-content:space-between;align-items:center;background:rgba(255,255,255,0.92);backdrop-filter:blur(12px);border-bottom:1px solid rgba(0,0,0,0.06)}
.nl{font-family:'DM Serif Display',serif;font-size:24px;letter-spacing:-0.5px}.nl span{color:var(--a)}
.nk{display:flex;gap:32px;list-style:none;align-items:center}.nk a{text-decoration:none;color:var(--t);font-size:13px;font-weight:500;letter-spacing:.8px;text-transform:uppercase;transition:color .2s}.nk a:hover{color:var(--a)}
.nc{background:var(--p)!important;color:var(--bg)!important;padding:10px 24px!important;border-radius:24px;transition:background .2s!important}.nc:hover{background:var(--a)!important;color:var(--p)!important}
.hero{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;overflow:hidden}
.hc{display:flex;flex-direction:column;justify-content:center;padding:140px 60px 80px;background:var(--bg)}
.he{font-size:12px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:var(--sage);margin-bottom:24px}
.hc h1{font-family:'DM Serif Display',serif;font-size:clamp(44px,5vw,76px);line-height:1.02;letter-spacing:-2px}
.hc h1 em{font-family:'Playfair Display',serif;font-style:italic;color:var(--a);font-weight:400}
.hs{margin-top:24px;font-size:17px;line-height:1.7;color:var(--t);max-width:440px;opacity:.8}
.hd{margin-top:44px;display:flex;gap:36px;flex-wrap:wrap}.hdi{display:flex;flex-direction:column;gap:4px}
.hdl{font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--sage)}.hdv{font-family:'DM Serif Display',serif;font-size:18px}
.hi{position:relative;overflow:hidden}.hi img{min-height:100vh}
.hio{position:absolute;bottom:0;left:0;right:0;padding:32px;background:linear-gradient(to top,rgba(0,0,0,.5),transparent)}.hio p{font-size:14px;color:#fff;font-weight:500}
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
.mc{background:var(--w);border-radius:16px;overflow:hidden;transition:transform .3s,box-shadow .3s;border:1px solid rgba(0,0,0,.04)}.mc:hover{transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,.08)}
.mci{aspect-ratio:4/3;overflow:hidden}.mci img{transition:transform .5s}.mc:hover .mci img{transform:scale(1.06)}
.mcb{padding:28px 24px}.mcb h3{font-family:'DM Serif Display',serif;font-size:22px;margin-bottom:10px;letter-spacing:-.5px}.mcb p{font-size:14px;line-height:1.7;color:var(--t);opacity:.7}
.mct{display:inline-block;margin-top:14px;padding:6px 14px;background:rgba(232,168,56,.12);border-radius:16px;font-size:11px;font-weight:600;color:var(--a);letter-spacing:.5px;text-transform:uppercase}
@media(max-width:900px){nav{padding:14px 20px}.nk{display:none}.hero{grid-template-columns:1fr}.hc{padding:120px 24px 60px}.hi{max-height:50vh}.hi img{min-height:50vh}.pg{grid-template-columns:repeat(2,1fr)}.ab{padding:60px 24px;grid-template-columns:1fr;gap:40px}.mp{padding:60px 24px}.mg{grid-template-columns:1fr}.sh h2,.abc h2{font-size:32px}}
</style></head><body>
<nav><div class="nl">${firstName}<span>'s</span></div><ul class="nk"><li><a href="#menu">${navLabel}</a></li><li><a href="#about">About</a></li><li><a href="#hours">Hours</a></li><li><a href="#" class="nc">${cta}</a></li></ul></nav>
<section class="hero"><div class="hc"><div class="he">${data.address_line1} · ${data.neighbourhood || data.city}</div><h1>${data.tagline.replace(/(\w+)[.!]?$/, '<em>$1</em>')}</h1><p class="hs">${data.subtitle}</p>${ratingHTML}
<div class="hd"><div class="hdi"><span class="hdl">Hours</span><span class="hdv">${data.hours_summary}</span></div>${isFood ? `<div class="hdi"><span class="hdl">Dine In</span><span class="hdv">Walk-ins welcome</span></div>` : `<div class="hdi"><span class="hdl">Visit</span><span class="hdv">${cta}</span></div>`}${deliveryText ? `<div class="hdi"><span class="hdl">Delivery</span><span class="hdv">${deliveryText}</span></div>` : ""}</div></div>
<div class="hi">${img(ph[0], data.name)}<div class="hio"><p>📍 ${data.neighbourhood || data.city}</p></div></div></section>
<div class="pg">${[1,2,3,4].map(i => `<div class="pgi">${img(ph[i] || ph[0], "Photo " + i)}</div>`).join("")}</div>
<section class="ab" id="about"><div class="abi">${img(ph[5] || ph[0], data.name)}<div class="abb">${data.vibe_tags?.[0] || "Local Favourite"}</div></div><div class="abc"><h2>Our Story.</h2><p>${data.about_paragraph}</p><p>${data.about_paragraph2}</p><div>${(data.vibe_tags || []).map(t => `<span class="abt">${t}</span>`).join("")}</div></div></section>
<section class="mp" id="menu"><div class="sh"><h2>${data.items_label || "What We're Known For"}</h2><p>See what keeps people coming back.</p></div><div class="mg">${allItems.map((item, i) => `<div class="mc"><div class="mci">${img(ph[6+i] || ph[i%5], item.name)}</div><div class="mcb"><h3>${item.emoji||""} ${item.name}</h3><p>${item.description}</p>${item.tag ? `<span class="mct">${item.tag}</span>` : ""}</div></div>`).join("")}</div></section>
${data.review_quote ? `<div style="padding:60px;text-align:center"><blockquote style="font-family:'Playfair Display',serif;font-size:24px;font-style:italic;max-width:700px;margin:0 auto 16px;line-height:1.5">"${data.review_quote}"</blockquote><cite style="font-size:13px;color:${p.sage};font-style:normal">— ${data.review_source || "Customer Review"}</cite></div>` : ""}
<section style="padding:100px 60px;display:grid;grid-template-columns:1fr 1fr;gap:80px;max-width:1200px;margin:0 auto" id="hours"><div><h2 style="font-family:'DM Serif Display',serif;font-size:40px;letter-spacing:-1px;margin-bottom:32px">Find Us</h2><div style="display:grid;gap:12px;margin-bottom:40px">${hoursHTML}</div><div style="font-size:15px;line-height:1.6;color:${p.text}"><strong>${data.address_line1}</strong><br>${data.city}, ${data.province_state} ${data.postal_zip}${data.phone ? `<br><br><strong>Phone:</strong> ${data.phone}` : ""}</div></div><div style="border-radius:16px;overflow:hidden;min-height:400px">${img(ph[4] || ph[0], "Location")}</div></section>
<div style="background:${p.accent};padding:48px 60px;text-align:center"><h3 style="font-family:'DM Serif Display',serif;font-size:28px;color:${p.primary};margin-bottom:12px">Like what you see?</h3><p style="font-size:15px;color:${p.primary};opacity:.8;margin-bottom:24px">This mockup was built for you by The Web Guys. Let's make it real.</p><a href="https://thewebguys.ca" target="_blank" style="display:inline-block;background:${p.primary};color:${p.bg};padding:14px 36px;border-radius:28px;text-decoration:none;font-weight:600;font-size:14px">Get In Touch →</a></div>
<footer style="padding:40px 60px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(0,0,0,.08);flex-wrap:wrap;gap:20px"><div style="font-family:'DM Serif Display',serif;font-size:20px">${firstName}<span style="color:${p.accent}">'s</span></div><span style="font-size:13px;color:${p.text};opacity:.5">© 2026 ${data.name} · ${data.address_line1}, ${data.city}</span><span style="font-size:12px;color:${p.text};opacity:.4;padding:6px 14px;border:1px solid rgba(0,0,0,.1);border-radius:16px">Built by The Web Guys · thewebguys.ca</span></footer>${interactiveJS}</body></html>`;
}


// ═════════════════════════════════════════════════
// TEMPLATE: BOLD — Full-bleed hero, zigzag services
// ═════════════════════════════════════════════════
function templateBold(data, d) {
  const { p, ph, img, sigItems, allItems, hours, firstName, isFood, navLabel, cta, rating, reviewCount, head } = d;
  // Zigzag: alternate image left/right for each service
  const zigzagItems = allItems.slice(0, 4);
  return `${head}<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Space Grotesk','Inter',sans-serif;background:#0a0a0a;color:#fff;-webkit-font-smoothing:antialiased}img{display:block;width:100%;height:100%;object-fit:cover}
.bn{position:fixed;top:0;width:100%;z-index:100;padding:20px 48px;display:flex;justify-content:space-between;align-items:center;background:rgba(10,10,10,0.85);backdrop-filter:blur(16px);border-bottom:1px solid rgba(255,255,255,.05)}
.bnl{font-size:20px;font-weight:700;letter-spacing:-.5px}
.bnk{display:flex;gap:28px;list-style:none;align-items:center}.bnk a{text-decoration:none;color:rgba(255,255,255,.5);font-size:12px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;transition:color .2s}.bnk a:hover{color:#fff}
.bnc{background:${p.accent}!important;color:${p.primary}!important;padding:10px 24px!important;border-radius:6px;font-weight:600!important}
.bh{min-height:100vh;position:relative;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden}
.bh>img{position:absolute;inset:0;min-height:100vh;filter:brightness(.25)}
.bhc{position:relative;z-index:1;max-width:800px;padding:40px}
.bhc h1{font-size:clamp(52px,8vw,100px);font-weight:700;line-height:.95;letter-spacing:-4px;margin-bottom:24px;text-transform:uppercase}
.bhc h1 span{display:block;color:${p.accent};font-style:italic;font-family:'Playfair Display',serif;text-transform:none;letter-spacing:-2px}
.bhp{font-size:18px;line-height:1.6;opacity:.6;max-width:500px;margin:0 auto 36px}
.bbtn{display:inline-block;background:#fff;color:#0a0a0a;padding:18px 48px;text-decoration:none;font-weight:700;font-size:15px;letter-spacing:1px;text-transform:uppercase;transition:background .2s}.bbtn:hover{background:${p.accent}}
.bstat{display:flex;justify-content:center;gap:0;background:#111;border-bottom:1px solid rgba(255,255,255,.06)}
.bsti{flex:1;max-width:300px;padding:36px 40px;text-align:center;border-right:1px solid rgba(255,255,255,.06)}.bsti:last-child{border-right:none}
.bsti h4{font-size:32px;font-weight:700;color:${p.accent};margin-bottom:4px}.bsti p{font-size:12px;text-transform:uppercase;letter-spacing:2px;opacity:.4}
.bzz{display:grid;grid-template-columns:1fr 1fr;min-height:500px}
.bzz.rev{direction:rtl}.bzz.rev>*{direction:ltr}
.bzi{overflow:hidden;min-height:500px}
.bzt{display:flex;flex-direction:column;justify-content:center;padding:80px 60px;background:#111}
.bzz.rev .bzt{background:#0d0d0d}
.bzt h3{font-size:36px;font-weight:700;letter-spacing:-1px;margin-bottom:16px;line-height:1.1}
.bzt p{font-size:16px;line-height:1.8;opacity:.5;margin-bottom:20px;max-width:440px}
.bztg{display:inline-block;padding:6px 16px;background:rgba(255,255,255,.06);border-radius:4px;font-size:11px;font-weight:600;color:${p.accent};letter-spacing:1px;text-transform:uppercase}
.bqt{position:relative;overflow:hidden;padding:120px 60px;text-align:center}
.bqt>img{position:absolute;inset:0;min-height:100%;filter:brightness(.2)}
.bqt>*:not(img){position:relative;z-index:1}
.bqt blockquote{font-family:'Playfair Display',serif;font-size:30px;font-style:italic;max-width:700px;margin:0 auto 20px;line-height:1.5}
.bhr{display:grid;grid-template-columns:1fr 1fr;background:#111}
.bhrl{padding:80px 60px}.bhrr{overflow:hidden;min-height:400px}
.bhrd{display:flex;justify-content:space-between;padding:18px 0;border-bottom:1px solid rgba(255,255,255,.06);font-size:15px}.bhrd span:last-child{opacity:.4}
@media(max-width:900px){.bnk{display:none}.bhc h1{font-size:48px}.bzz,.bzz.rev{grid-template-columns:1fr;direction:ltr}.bzz.rev>*{direction:ltr}.bzi{min-height:300px}.bzt{padding:48px 24px}.bstat{flex-direction:column}.bsti{border-right:none;border-bottom:1px solid rgba(255,255,255,.06)}.bhr{grid-template-columns:1fr}.bhrl{padding:48px 24px}.bqt{padding:60px 24px}}
</style></head><body>
<nav class="bn"><div class="bnl">${data.name}</div><ul class="bnk"><li><a href="#srv">${navLabel}</a></li><li><a href="#about">About</a></li><li><a href="#hrs">Hours</a></li><li><a href="#" class="bnc">${cta}</a></li></ul></nav>
<section class="bh">${img(ph[0], data.name)}<div class="bhc">
<h1>${firstName}'s<span>${data.tagline.split(/\s+/).slice(-2).join(' ')}</span></h1>
<p class="bhp">${data.subtitle}</p>
<a href="#srv" class="bbtn">${cta}</a>
</div></section>
<div class="bstat">${rating > 0 ? `<div class="bsti"><h4>${rating}</h4><p>Rating</p></div>` : ''}<div class="bsti"><h4>${reviewCount || '—'}</h4><p>Reviews</p></div><div class="bsti"><h4>${data.neighbourhood || data.city}</h4><p>Location</p></div></div>
<div id="srv">${zigzagItems.map((item, i) => `<div class="bzz${i % 2 ? ' rev' : ''}"><div class="bzi">${img(ph[6+i] || ph[i%5], item.name)}</div><div class="bzt"><h3>${item.emoji||''} ${item.name}</h3><p>${item.description}</p>${item.tag ? `<span class="bztg">${item.tag}</span>` : ''}</div></div>`).join('')}</div>
<div id="about" style="max-width:700px;margin:0 auto;padding:100px 40px;text-align:center"><h2 style="font-size:40px;font-weight:700;letter-spacing:-1.5px;margin-bottom:24px">About ${firstName}'s</h2><p style="font-size:17px;line-height:1.9;opacity:.5;margin-bottom:12px">${data.about_paragraph}</p><p style="font-size:17px;line-height:1.9;opacity:.5">${data.about_paragraph2}</p><div style="margin-top:24px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap">${(data.vibe_tags || []).map(t => `<span style="padding:6px 14px;border:1px solid rgba(255,255,255,.1);border-radius:4px;font-size:11px;letter-spacing:1px;text-transform:uppercase;opacity:.5">${t}</span>`).join('')}</div></div>
${data.review_quote ? `<section class="bqt">${img(ph[5] || ph[0], 'Ambiance')}<blockquote>"${data.review_quote}"</blockquote><cite style="font-size:13px;opacity:.4;font-style:normal">— ${data.review_source || 'Customer Review'}</cite></section>` : ''}
<div class="bhr" id="hrs"><div class="bhrl"><h2 style="font-size:32px;font-weight:700;letter-spacing:-1px;margin-bottom:36px">Hours & Location</h2>${hours.map(h => `<div class="bhrd"><span>${h.days}</span><span>${h.time}</span></div>`).join('')}<div style="margin-top:32px;font-size:15px;line-height:1.8;opacity:.5"><strong style="opacity:1">${data.address_line1}</strong><br>${data.city}, ${data.province_state} ${data.postal_zip}${data.phone ? `<br>${data.phone}` : ''}</div></div><div class="bhrr">${img(ph[4] || ph[0], 'Location')}</div></div>
<div style="background:${p.accent};padding:48px 60px;text-align:center"><h3 style="font-size:22px;font-weight:700;color:${p.primary};margin-bottom:10px">Like what you see?</h3><p style="font-size:14px;color:${p.primary};opacity:.7;margin-bottom:20px">This mockup was built for you by The Web Guys.</p><a href="https://thewebguys.ca" target="_blank" style="display:inline-block;background:${p.primary};color:#fff;padding:14px 36px;border-radius:4px;text-decoration:none;font-weight:700;font-size:13px">Get In Touch →</a></div>
<footer style="padding:32px 48px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;background:#0a0a0a;border-top:1px solid rgba(255,255,255,.05)"><span style="font-size:18px;font-weight:700">${data.name}</span><span style="font-size:12px;opacity:.2">© 2026 ${data.name}</span><span style="font-size:11px;opacity:.15;padding:6px 12px;border:1px solid rgba(255,255,255,.08);border-radius:4px">Built by The Web Guys</span></footer>${interactiveJS}</body></html>`;
}

// ═══════════════════════════════════════════════════════
// TEMPLATE: EDITORIAL — Typography-driven, single column
// ═══════════════════════════════════════════════════════
function templateEditorial(data, d) {
  const { p, ph, img, allItems, hours, firstName, navLabel, cta, rating, reviewCount, head } = d;
  const stars = rating > 0 ? `${rating} ★ · ${reviewCount} reviews` : '';
  return `${head}<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',-apple-system,sans-serif;background:#FAFAF8;color:#1a1a1a;-webkit-font-smoothing:antialiased}img{display:block;width:100%;height:100%;object-fit:cover}
.en{position:fixed;top:0;width:100%;z-index:100;padding:14px 48px;display:flex;justify-content:space-between;align-items:center;background:rgba(250,250,248,0.95);backdrop-filter:blur(12px);border-bottom:1px solid #eee}
.enl{font-size:11px;font-weight:600;letter-spacing:4px;text-transform:uppercase}
.enk{display:flex;gap:24px;list-style:none;align-items:center}.enk a{text-decoration:none;color:#aaa;font-size:11px;font-weight:500;letter-spacing:2px;text-transform:uppercase;transition:color .2s}.enk a:hover{color:#1a1a1a}
.enc{background:#1a1a1a!important;color:#fff!important;padding:7px 18px!important;border-radius:3px;font-size:10px!important;letter-spacing:1.5px!important}
.eh{min-height:90vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:180px 40px 80px;border-bottom:1px solid #e8e8e4}
.ehl{width:60px;height:1px;background:#1a1a1a;margin:0 auto 40px}
.eh h1{font-family:'Playfair Display',serif;font-size:clamp(56px,9vw,120px);font-weight:700;line-height:.9;letter-spacing:-5px;margin-bottom:28px}
.eh h1 em{font-style:italic;font-weight:400;display:block;color:${p.accent}}
.ehsub{font-size:16px;line-height:1.7;color:#888;max-width:420px;margin:0 auto 40px}
.ehbtn{display:inline-block;border:1.5px solid #1a1a1a;color:#1a1a1a;padding:14px 44px;text-decoration:none;font-size:11px;font-weight:600;letter-spacing:2px;text-transform:uppercase;transition:all .2s}.ehbtn:hover{background:#1a1a1a;color:#fff}
.efull{width:100%;aspect-ratio:2.5/1;overflow:hidden}
.eab{max-width:560px;margin:0 auto;padding:100px 40px;text-align:center}
.eab h2{font-family:'Playfair Display',serif;font-size:14px;font-weight:400;letter-spacing:4px;text-transform:uppercase;color:#aaa;margin-bottom:32px}
.eab p{font-size:17px;line-height:2;color:#555}
.eab .tags{margin-top:28px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
.eab .tags span{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#bbb;padding:4px 12px;border:1px solid #ddd;border-radius:2px}
.edv{height:1px;background:#e8e8e4;max-width:100px;margin:0 auto}
.esg{max-width:800px;margin:0 auto;padding:80px 40px}
.esg h2{font-family:'Playfair Display',serif;font-size:48px;text-align:center;margin-bottom:12px;letter-spacing:-2px}
.esg>p{text-align:center;color:#aaa;font-size:13px;margin-bottom:56px}
.esr{display:grid;grid-template-columns:1fr 1fr;gap:0}
.esi{padding:32px 28px;border-bottom:1px solid #e8e8e4}
.esi:nth-child(odd){border-right:1px solid #e8e8e4}
.esn{font-size:11px;color:${p.accent};font-weight:600;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px}
.esi h3{font-family:'Playfair Display',serif;font-size:22px;margin-bottom:6px;font-weight:700}
.esi p{font-size:13px;line-height:1.6;color:#888}
.egal{display:grid;grid-template-columns:2fr 1fr;gap:4px;margin-top:4px}
.egal>div{overflow:hidden}.egal>div:first-child{grid-row:span 2}
.egal>div img{transition:transform .6s}.egal>div:hover img{transform:scale(1.04)}
.eqt{text-align:center;padding:80px 40px;max-width:600px;margin:0 auto}
.eqt blockquote{font-family:'Playfair Display',serif;font-size:24px;font-style:italic;line-height:1.6;margin-bottom:16px;letter-spacing:-.5px}
.eqt cite{font-size:11px;color:#aaa;font-style:normal;letter-spacing:2px;text-transform:uppercase}
.ehs{max-width:480px;margin:0 auto;padding:80px 40px}
.ehs h2{font-family:'Playfair Display',serif;font-size:14px;font-weight:400;letter-spacing:4px;text-transform:uppercase;color:#aaa;text-align:center;margin-bottom:32px}
.ehr{display:flex;justify-content:space-between;padding:14px 0;border-bottom:1px solid #eee;font-size:14px}.ehr span:last-child{color:#aaa}
.eadr{text-align:center;margin-top:32px;font-size:14px;line-height:1.9;color:#888}
@media(max-width:900px){.enk{display:none}.eh h1{font-size:52px;letter-spacing:-3px}.efull{aspect-ratio:16/9}.esr{grid-template-columns:1fr}.esi{border-right:none!important}.egal{grid-template-columns:1fr;gap:4px}.egal>div:first-child{grid-row:auto}.esg{padding:60px 24px}.eab{padding:60px 24px}.ehs{padding:60px 24px}}
</style></head><body>
<nav class="en"><div class="enl">${data.name}</div><ul class="enk"><li><a href="#srv">${navLabel}</a></li><li><a href="#about">About</a></li><li><a href="#hrs">Hours</a></li><li><a href="#" class="enc">${cta}</a></li></ul></nav>
<section class="eh"><div class="ehl"></div>${stars ? `<p style="font-size:12px;color:#aaa;letter-spacing:2px;margin-bottom:20px">${stars}</p>` : ''}<h1>${firstName}'s<em>${data.tagline.split(/\s+/).slice(-2).join(' ')}</em></h1><p class="ehsub">${data.subtitle}</p><a href="#srv" class="ehbtn">${cta}</a></section>
<div class="efull">${img(ph[0], data.name)}</div>
<div id="about"><section class="eab"><h2>Our Story</h2><p>${data.about_paragraph}</p><p style="margin-top:16px">${data.about_paragraph2}</p><div class="tags">${(data.vibe_tags || []).map(t => `<span>${t}</span>`).join('')}</div></section></div>
<div class="edv"></div>
<section class="esg" id="srv"><h2>${data.items_label || "What We Offer"}</h2><p>What keeps people coming back.</p><div class="esr">${allItems.map((item, i) => `<div class="esi"><div class="esn">${item.tag || ('0' + (i+1)).slice(-2)}</div><h3>${item.emoji||''} ${item.name}</h3><p>${item.description}</p></div>`).join('')}</div></section>
<div class="egal"><div style="min-height:400px">${img(ph[1] || ph[0], 'Gallery 1')}</div><div style="min-height:198px">${img(ph[2] || ph[0], 'Gallery 2')}</div><div style="min-height:198px">${img(ph[3] || ph[0], 'Gallery 3')}</div></div>
${data.review_quote ? `<div class="edv" style="margin-top:0"></div><section class="eqt"><blockquote>"${data.review_quote}"</blockquote><cite>— ${data.review_source || 'Customer Review'}</cite></section><div class="edv"></div>` : '<div class="edv"></div>'}
<section class="ehs" id="hrs"><h2>Visit Us</h2>${hours.map(h => `<div class="ehr"><span>${h.days}</span><span>${h.time}</span></div>`).join('')}<div class="eadr"><strong style="color:#1a1a1a">${data.address_line1}</strong><br>${data.city}, ${data.province_state} ${data.postal_zip}${data.phone ? `<br>${data.phone}` : ''}</div></section>
<div style="background:#1a1a1a;padding:44px 60px;text-align:center"><h3 style="font-family:'Playfair Display',serif;font-size:20px;color:#fff;margin-bottom:8px">Like what you see?</h3><p style="font-size:13px;color:rgba(255,255,255,.4);margin-bottom:18px">This mockup was built for you by The Web Guys.</p><a href="https://thewebguys.ca" target="_blank" style="display:inline-block;border:1px solid rgba(255,255,255,.3);color:#fff;padding:12px 32px;border-radius:3px;text-decoration:none;font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;transition:all .2s">Get In Touch</a></div>
<footer style="padding:28px 48px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;border-top:1px solid #eee"><span style="font-size:10px;letter-spacing:3px;text-transform:uppercase;font-weight:600">${data.name}</span><span style="font-size:11px;color:#ccc">© 2026</span><span style="font-size:10px;color:#ddd">Built by The Web Guys</span></footer>${interactiveJS}</body></html>`;
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
  const [category, setCategory] = useState("");
  const [template, setTemplate] = useState("classic");
  const [model, setModel] = useState("standard");
  const [notes, setNotes] = useState("");

  // State
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("");
  const [mockupHTML, setMockupHTML] = useState("");
  const [businessData, setBusinessData] = useState(null);
  const [cachedPhotos, setCachedPhotos] = useState([]);
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
          photo_urls: cachedPhotos,
          html: mockupHTML,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setPublishedUrl(`${window.location.origin}/mockups/${slug}`);
        loadPublished(storedPin);
      } else {
        setError(typeof data.error === "string" ? data.error : JSON.stringify(data.error) || "Publish failed");
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

  const loadMockup = async (slug) => {
    try {
      setStep("Loading mockup...");
      setLoading(true); setError("");
      const res = await fetch("/api/mockup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "get", pin: storedPin, slug }),
      });
      const data = await res.json();
      if (!data.success || !data.mockup) { setError("Could not load mockup"); setLoading(false); return; }
      const m = data.mockup;
      const biz = typeof m.business_data === "string" ? JSON.parse(m.business_data) : (m.business_data || {});
      const photos = typeof m.photo_urls === "string" ? JSON.parse(m.photo_urls) : (m.photo_urls || []);
      setBusinessData(biz);
      setCachedPhotos(photos);
      setName(biz.name || m.business_name);
      setAddress(biz.address_line1 ? `${biz.address_line1}, ${biz.city}, ${biz.province_state}` : "");
      if (biz.category) setCategory(biz.category);
      setPhotoSource(photos.some(u => u.includes("googleapis")) ? "google" : "stock");
      setPublishedUrl(`${window.location.origin}/mockups/${slug}`);
      const html = buildMockupHTML(biz, photos, template);
      setMockupHTML(html);
      setLoading(false);
    } catch (err) {
      setError(err.message || "Failed to load mockup");
      setLoading(false);
    }
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
        body: JSON.stringify({ action: "research", pin: storedPin, name, address, notes, category, model }),
      });
      const researchData = await researchRes.json();
      if (!researchData.success) throw new Error(typeof researchData.error === "string" ? researchData.error : JSON.stringify(researchData.error) || "Research failed");

      const biz = researchData.data;
      setBusinessData(biz);

      // Step 3: Pick photos — Google Places if available, else category-matched stock
      // Priority: dropdown selection > AI-detected category > neutral services (never cafe)
      const bizCategory = (category && STOCK[category]) ? category : (STOCK[biz.category] ? biz.category : "services");
      const stockPhotos = STOCK[bizCategory] || STOCK.services;
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
      setCachedPhotos(finalPhotos);
      const html = buildMockupHTML(biz, finalPhotos, template);
      setMockupHTML(html);

      // Save to history
      const entry = { name: biz.name, address, notes, template, slug: biz.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"), date: new Date().toISOString(), category: bizCategory, photoSource: googlePhotos.length > 0 ? "google" : "stock" };
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
                    <label style={S.label}>Business Type</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ ...S.input, cursor: "pointer", appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}>
                      <option value="">Auto-detect</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="cafe">Cafe / Coffee Shop</option>
                      <option value="bar">Bar / Pub</option>
                      <option value="bakery">Bakery</option>
                      <option value="dental">Dental Office</option>
                      <option value="medical">Medical / Clinic</option>
                      <option value="auto">Auto Mechanic / Body Shop</option>
                      <option value="salon">Salon / Barbershop</option>
                      <option value="spa">Spa / Wellness</option>
                      <option value="fitness">Fitness / Gym</option>
                      <option value="legal">Law Firm / Legal</option>
                      <option value="realestate">Real Estate</option>
                      <option value="construction">Construction / Trades</option>
                      <option value="retail">Retail Store</option>
                      <option value="cleaning">Cleaning Service</option>
                      <option value="pet">Pet Services / Vet</option>
                      <option value="accounting">Accounting / Financial</option>
                      <option value="photography">Photography / Creative</option>
                    </select>
                  </div>
                  <div>
                    <label style={S.label}>Template Style</label>
                    <div style={{ display: "flex", gap: 10 }}>
                      {[
                        { id: "classic", label: "Classic", desc: "Split hero, cards" },
                        { id: "bold", label: "Bold", desc: "Full-bleed hero, dark" },
                        { id: "editorial", label: "Editorial", desc: "Centered, minimal" },
                      ].map(t => (
                        <button key={t.id} onClick={() => setTemplate(t.id)}
                          style={{ flex: 1, padding: "12px 8px", background: template === t.id ? "#1A2A1A" : "#141414", border: template === t.id ? "2px solid #3EA843" : "1px solid #2A2A2A", borderRadius: 10, cursor: "pointer", textAlign: "center" }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: template === t.id ? "#3EA843" : "#ccc" }}>{t.label}</div>
                          <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{t.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={S.label}>AI Model</label>
                    <div style={{ display: "flex", gap: 10 }}>
                      {[
                        { id: "standard", label: "Standard", desc: "Sonnet 4 · Fast", price: "" },
                        { id: "premium", label: "Premium", desc: "Fable 5 · Best quality", price: "⚡" },
                      ].map(m => (
                        <button key={m.id} onClick={() => setModel(m.id)}
                          style={{ flex: 1, padding: "12px 8px", background: model === m.id ? "#1A1A2A" : "#141414", border: model === m.id ? "2px solid #6B8AFF" : "1px solid #2A2A2A", borderRadius: 10, cursor: "pointer", textAlign: "center" }}>
                          <div style={{ fontSize: 13, fontWeight: 600, color: model === m.id ? "#6B8AFF" : "#ccc" }}>{m.price} {m.label}</div>
                          <div style={{ fontSize: 11, color: "#555", marginTop: 2 }}>{m.desc}</div>
                        </button>
                      ))}
                    </div>
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
                              <div style={{ display: "flex", gap: 8 }}>
                                <button onClick={() => loadMockup(m.slug)} style={{ background: "none", border: "none", color: "#3EA843", fontSize: 11, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>Edit</button>
                                <button onClick={() => deleteMockup(m.slug)} style={{ background: "none", border: "none", color: "#553333", fontSize: 11, cursor: "pointer", fontFamily: "inherit" }}>Delete</button>
                              </div>
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
                            onClick={() => { setName(h.name); setAddress(h.address || ""); setNotes(h.notes || ""); setCategory(h.category || ""); setTemplate(h.template || "classic"); }}>
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
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, flexWrap: "wrap", gap: 16 }}>
                <div>
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{businessData?.name || name}</h2>
                  <p style={{ fontSize: 14, color: "#666" }}>
                    {businessData?.category} · {businessData?.palette} palette · {photoSource === "google" ? "📸 Google Places photos" : photoSource === "mixed" ? "📸 Mixed photos" : "🖼 Stock photos"}
                  </p>
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button onClick={() => { setMockupHTML(""); setBusinessData(null); setPublishedUrl(""); setCachedPhotos([]); }} style={S.actionBtn(false)}>← New</button>
                  <button onClick={generate} disabled={loading} style={S.actionBtn(false)}>🔄 Re-research</button>
                  <button onClick={copyHTML} style={S.actionBtn(false)}>Copy HTML</button>
                  <button onClick={downloadHTML} style={S.actionBtn(false)}>Download</button>
                  <button onClick={publishMockup} disabled={publishing} style={{ ...S.actionBtn(true), opacity: publishing ? 0.6 : 1 }}>
                    {publishing ? "Publishing..." : "Publish Live →"}
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20, flexWrap: "wrap" }}>
                {[
                  { id: "classic", label: "Classic" },
                  { id: "bold", label: "Bold" },
                  { id: "editorial", label: "Editorial" },
                ].map(t => (
                  <button key={t.id} onClick={() => {
                    setTemplate(t.id);
                    if (businessData && cachedPhotos.length) {
                      setMockupHTML(buildMockupHTML(businessData, cachedPhotos, t.id));
                    }
                  }} style={{ padding: "8px 18px", background: template === t.id ? "#1A2A1A" : "#141414", border: template === t.id ? "2px solid #3EA843" : "1px solid #2A2A2A", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: template === t.id ? 600 : 400, color: template === t.id ? "#3EA843" : "#888", fontFamily: "inherit" }}>
                    {t.label}
                  </button>
                ))}
                <select value={businessData?.palette || "warm"} onChange={(e) => {
                  const newPalette = e.target.value;
                  const updated = { ...businessData, palette: newPalette };
                  setBusinessData(updated);
                  if (cachedPhotos.length) {
                    setMockupHTML(buildMockupHTML(updated, cachedPhotos, template));
                  }
                }} style={{ padding: "8px 14px", background: "#141414", border: "1px solid #2A2A2A", borderRadius: 8, color: "#999", fontSize: 13, fontFamily: "inherit", cursor: "pointer", appearance: "none", paddingRight: 28, backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 10 10'%3E%3Cpath fill='%23666' d='M5 7L1 3h8z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center" }}>
                  <option value="warm">🎨 Warm</option>
                  <option value="cool">🎨 Cool</option>
                  <option value="earthy">🎨 Earthy</option>
                  <option value="modern">🎨 Modern</option>
                  <option value="elegant">🎨 Elegant</option>
                  <option value="fresh">🎨 Fresh</option>
                </select>
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
                  {businessData.website && <a href={businessData.website.startsWith("http") ? businessData.website : `https://${businessData.website}`} target="_blank" rel="noopener" style={{ ...S.chip, background: "#0A1A0A", borderColor: "#1A3A1A", color: "#4CAF50", textDecoration: "none", cursor: "pointer" }}>⚠️ {businessData.website}</a>}
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
