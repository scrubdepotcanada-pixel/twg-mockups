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
  const mapQ = encodeURIComponent(`${data.address_line1}, ${data.city}, ${data.province_state} ${data.postal_zip}`);
  const mapEmbed = `<iframe src="https://maps.google.com/maps?q=${mapQ}&t=&z=15&ie=UTF8&iwloc=&output=embed" style="width:100%;height:100%;border:none;filter:grayscale(0.3)" loading="lazy" allowfullscreen></iframe>`;
  const premiumJS = `<script>
// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a=>{a.addEventListener('click',e=>{e.preventDefault();const t=document.querySelector(a.getAttribute('href'));if(t)t.scrollIntoView({behavior:'smooth',block:'start'})})});
// Scroll reveal with stagger
const obs=new IntersectionObserver((entries)=>{entries.forEach((e,i)=>{if(e.isIntersecting){setTimeout(()=>{e.target.style.opacity='1';e.target.style.transform='translateY(0)'},i*80)}})},{threshold:0.08});
document.querySelectorAll('[data-reveal]').forEach(el=>{el.style.opacity='0';el.style.transform='translateY(40px)';el.style.transition='opacity .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1)';obs.observe(el)});
// Parallax hero
const hero=document.querySelector('.ph-hero img');if(hero){window.addEventListener('scroll',()=>{hero.style.transform='translateY('+window.scrollY*0.3+'px)'},{ passive:true })}
// Animated counters
document.querySelectorAll('[data-count]').forEach(el=>{const target=parseFloat(el.dataset.count);let current=0;const step=target/40;const timer=setInterval(()=>{current+=step;if(current>=target){current=target;clearInterval(timer)}el.textContent=Number.isInteger(target)?Math.round(current):current.toFixed(1)},30)});
// Navbar
const nav=document.querySelector('nav');if(nav){window.addEventListener('scroll',()=>{nav.style.padding=scrollY>80?'10px 48px':'';nav.style.transition='padding .3s'},{ passive:true })}
</script>`;
  const d = { p, ph, fb, img, sigItems, allItems, hours, deliveryText, igHandle, igUrl, firstName, isFood, navLabel, cta, rating, reviewCount, head, hoursHTML, interactiveJS, mapEmbed, premiumJS };
  if (template === "premium") return templatePremium(data, d);
  return templateStandard(data, d);
}

// ═══════════════════════════════════════════════════════════════════════════
// STANDARD — "Squarespace starter / Wix template" look
// Goal: looks like a $500 small-business website. Clean, functional, generic.
// ═══════════════════════════════════════════════════════════════════════════
function templateStandard(data, d) {
  const { p, ph, img, sigItems, allItems, hours, firstName, isFood, navLabel, cta, rating, reviewCount, head, interactiveJS } = d;
  const ratingHTML = rating > 0 ? `<div style="display:flex;align-items:center;gap:6px;color:#f5a623;font-size:14px;margin-bottom:16px">${'★'.repeat(Math.round(rating))}${'☆'.repeat(5-Math.round(rating))} <span style="color:#666;font-size:13px;margin-left:4px">${rating} (${reviewCount} reviews)</span></div>` : '';

  return `${head}<style>
*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Inter',-apple-system,Arial,sans-serif;background:#fff;color:#333;line-height:1.6;-webkit-font-smoothing:antialiased}img{display:block;max-width:100%;height:auto}
.container{max-width:1140px;margin:0 auto;padding:0 24px}
header{padding:18px 0;border-bottom:1px solid #eee;background:#fff;position:sticky;top:0;z-index:50}
.hdr{display:flex;justify-content:space-between;align-items:center}
.logo{font-size:22px;font-weight:700;color:${p.primary}}
.nav{display:flex;gap:28px;align-items:center;list-style:none}
.nav a{text-decoration:none;color:#444;font-size:14px;font-weight:500}
.nav a:hover{color:${p.accent}}
.nav .btn{background:${p.accent};color:#fff;padding:9px 22px;border-radius:4px}
.nav .btn:hover{opacity:.9;color:#fff}
.hero{padding:80px 0;background:#f8f8f8;text-align:center}
.hero h1{font-size:42px;font-weight:700;color:${p.primary};margin-bottom:16px;line-height:1.2}
.hero p{font-size:18px;color:#666;max-width:600px;margin:0 auto 24px}
.btn-primary{display:inline-block;background:${p.accent};color:#fff;padding:14px 32px;border-radius:4px;text-decoration:none;font-weight:600;font-size:15px}
.btn-primary:hover{opacity:.9}
.hero-img{margin-top:48px;max-width:900px;margin-left:auto;margin-right:auto;border-radius:8px;overflow:hidden}
.hero-img img{width:100%;height:auto;display:block}
section{padding:64px 0}
.section-title{text-align:center;margin-bottom:40px}
.section-title h2{font-size:32px;font-weight:700;color:${p.primary};margin-bottom:8px}
.section-title p{color:#777;font-size:16px}
.about{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
.about-img{border-radius:8px;overflow:hidden;aspect-ratio:4/3}
.about-img img{width:100%;height:100%;object-fit:cover}
.about-text h2{font-size:30px;color:${p.primary};margin-bottom:16px;font-weight:700}
.about-text p{margin-bottom:14px;color:#555}
.services{background:#fafafa}
.svc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.svc-card{background:#fff;border:1px solid #eee;border-radius:8px;overflow:hidden}
.svc-card-img{aspect-ratio:4/3;overflow:hidden}
.svc-card-img img{width:100%;height:100%;object-fit:cover}
.svc-card-body{padding:20px}
.svc-card-body h3{font-size:18px;color:${p.primary};margin-bottom:8px;font-weight:600}
.svc-card-body p{font-size:14px;color:#666}
.gallery{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.gallery div{aspect-ratio:1;overflow:hidden;border-radius:6px}
.gallery img{width:100%;height:100%;object-fit:cover}
.contact{background:${p.primary};color:#fff}
.contact .section-title h2{color:#fff}
.contact .section-title p{color:rgba(255,255,255,.7)}
.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;color:#fff}
.contact-info p{margin-bottom:10px;color:rgba(255,255,255,.85)}
.contact-info strong{color:#fff}
.hours-list{list-style:none}
.hours-list li{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.1);font-size:14px;color:rgba(255,255,255,.85)}
.cta-bottom{background:${p.accent};text-align:center;padding:48px 24px}
.cta-bottom h2{color:#fff;font-size:28px;margin-bottom:16px}
.cta-bottom .btn-primary{background:#fff;color:${p.accent}}
footer{background:#1a1a1a;color:#888;padding:32px 0;text-align:center;font-size:13px}
footer a{color:${p.accent};text-decoration:none}
@media(max-width:768px){.nav{display:none}.hero h1{font-size:32px}.hero p{font-size:16px}.about{grid-template-columns:1fr}.svc-grid{grid-template-columns:1fr}.gallery{grid-template-columns:repeat(2,1fr)}.contact-grid{grid-template-columns:1fr}}
</style></head><body>
<header><div class="container hdr">
<div class="logo">${data.name}</div>
<ul class="nav"><li><a href="#about">About</a></li><li><a href="#services">${navLabel}</a></li><li><a href="#gallery">Gallery</a></li><li><a href="#contact">Contact</a></li><li><a href="#contact" class="btn">${cta}</a></li></ul>
</div></header>

<section class="hero"><div class="container">
<h1>${data.tagline}</h1>
<p>${data.subtitle}</p>
${ratingHTML}
<a href="#contact" class="btn-primary">${cta}</a>
<div class="hero-img">${img(ph[0], data.name)}</div>
</div></section>

<section id="about"><div class="container about">
<div class="about-img">${img(ph[5] || ph[0], data.name)}</div>
<div class="about-text">
<h2>About Us</h2>
<p>${data.about_paragraph}</p>
<p>${data.about_paragraph2}</p>
</div>
</div></section>

<section id="services" class="services"><div class="container">
<div class="section-title"><h2>${data.items_label || 'Our Services'}</h2><p>What we offer</p></div>
<div class="svc-grid">${allItems.slice(0,6).map((item, i) => `<div class="svc-card"><div class="svc-card-img">${img(ph[6+i] || ph[i%5], item.name)}</div><div class="svc-card-body"><h3>${item.name}</h3><p>${item.description}</p></div></div>`).join('')}</div>
</div></section>

<section id="gallery"><div class="container">
<div class="section-title"><h2>Gallery</h2><p>Take a look around</p></div>
<div class="gallery">${[1,2,3,4].map(i => `<div>${img(ph[i] || ph[0], 'Gallery ' + i)}</div>`).join('')}</div>
</div></section>

<section id="contact" class="contact"><div class="container">
<div class="section-title"><h2>Get In Touch</h2><p>We'd love to hear from you</p></div>
<div class="contact-grid">
<div class="contact-info">
<h3 style="margin-bottom:16px;font-size:20px">Location</h3>
<p><strong>${data.address_line1}</strong></p>
<p>${data.city}, ${data.province_state} ${data.postal_zip}</p>
${data.phone ? `<p style="margin-top:12px"><strong>Phone:</strong> ${data.phone}</p>` : ''}
${data.instagram ? `<p><strong>Instagram:</strong> @${data.instagram}</p>` : ''}
</div>
<div>
<h3 style="margin-bottom:16px;font-size:20px">Hours</h3>
<ul class="hours-list">${hours.map(h => `<li><span>${h.days}</span><span>${h.time}</span></li>`).join('')}</ul>
</div>
</div>
</div></section>

<div class="cta-bottom"><h2>Ready to ${cta.toLowerCase()}?</h2><a href="tel:${data.phone || ''}" class="btn-primary">${data.phone || cta}</a></div>

<footer><div class="container">© 2026 ${data.name} · Website by <a href="https://thewebguys.ca" target="_blank">The Web Guys</a></div></footer>
${interactiveJS}</body></html>`;
}

// ═══════════════════════════════════════════════════════════════════════════
// PREMIUM — "Award-winning agency" look
// Goal: feels like a real brand. Custom design, conversion-optimized, trust-built.
// Includes: FAQ, multiple CTAs, reviews integrated, custom icons, animations,
// trust badges, featured services, local SEO blocks, interactive map.
// ═══════════════════════════════════════════════════════════════════════════
function templatePremium(data, d) {
  const { p, ph, img, sigItems, allItems, hours, firstName, isFood, navLabel, cta, rating, reviewCount, head, mapEmbed, premiumJS } = d;
  const reviewCountNum = parseInt(reviewCount) || 0;

  // Custom SVG icons by category
  const iconMap = {
    dental: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2c-3 0-5 2-5 4 0 1 .5 2 .5 4s-.5 4-.5 6 1 6 2 6 1-3 2-5c.3-.6.7-1 1-1s.7.4 1 1c1 2 1 5 2 5s2-4 2-6-.5-4-.5-6 .5-3 .5-4c0-2-2-4-5-4z"/></svg>',
    restaurant: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 2v8c0 1 .5 2 2 2h0v10M9 2v6M5 2v6M17 2c-2 0-3 4-3 8 0 1 1 2 3 2v10"/></svg>',
    cafe: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 10h12v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-6zM16 13h2a3 3 0 0 1 0 6h-2M7 3v3M11 3v3M15 3v3"/></svg>',
    auto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 12l2-5h14l2 5v6h-3a2 2 0 0 1-4 0H10a2 2 0 0 1-4 0H3v-6zM5 12h14"/></svg>',
    salon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4L8 16M14 10l6 10"/></svg>',
    default: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>'
  };
  const icon = iconMap[data.category] || iconMap.default;

  // Build FAQ from business data
  const faqs = [
    { q: `What makes ${firstName}'s different?`, a: data.about_paragraph },
    { q: `Where are you located?`, a: `We're at ${data.address_line1}, ${data.city}, ${data.province_state} ${data.postal_zip}${data.neighbourhood ? ` in the ${data.neighbourhood} neighbourhood` : ''}. ${data.phone ? `Call us at ${data.phone}.` : ''}` },
    { q: `What are your hours?`, a: data.hours_summary + '. ' + (hours.length ? `Full schedule: ${hours.map(h => `${h.days} ${h.time}`).join('; ')}.` : '') },
    { q: `Do you offer ${data.has_delivery ? 'delivery' : 'walk-ins'}?`, a: data.has_delivery ? `Yes — we deliver via ${(data.delivery_platforms || []).join(', ') || 'major platforms'}.` : `Yes, walk-ins are welcome. ${data.cta_primary ? `You can also ${data.cta_primary.toLowerCase()}.` : ''}` },
  ];

  // Multiple synthesized reviews for the testimonials strip
  const testimonials = [
    { quote: data.review_quote || `Best ${data.category} in ${data.city}. Highly recommend.`, source: data.review_source || 'Google Reviews', initials: 'JL' },
    { quote: `${(sigItems[0]?.name || 'Their service')} was incredible. Worth every penny.`, source: 'Yelp Review', initials: 'SM' },
    { quote: `Came back three times this month. They've earned a loyal customer.`, source: 'Google Reviews', initials: 'AR' },
  ];

  return `${head}<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--p:${p.primary};--a:${p.accent};--bg:${p.bg};--w:${p.white};--ink:#0d0d0d;--mute:#6b6b6b}
body{font-family:'Inter',-apple-system,sans-serif;background:var(--w);color:var(--ink);-webkit-font-smoothing:antialiased;overflow-x:hidden}
img{display:block;width:100%;height:100%;object-fit:cover}
.wrap{max-width:1320px;margin:0 auto;padding:0 32px}

/* ── NAV (translucent, sophisticated) ── */
nav{position:fixed;top:0;width:100%;z-index:100;padding:18px 0;background:rgba(255,255,255,.7);backdrop-filter:blur(20px);border-bottom:1px solid rgba(0,0,0,.04);transition:padding .3s}
.nav-row{display:flex;justify-content:space-between;align-items:center}
.brand{display:flex;align-items:center;gap:10px;font-family:'DM Serif Display',serif;font-size:22px;letter-spacing:-.5px}
.brand-mark{width:32px;height:32px;background:var(--ink);color:var(--w);display:flex;align-items:center;justify-content:center;border-radius:50%;font-family:'Inter';font-weight:700;font-size:13px;letter-spacing:0}
.nav-links{display:flex;gap:32px;list-style:none;align-items:center}
.nav-links a{text-decoration:none;color:var(--ink);font-size:13px;font-weight:500;letter-spacing:.3px;position:relative}
.nav-links a::after{content:'';position:absolute;left:0;right:0;bottom:-4px;height:1px;background:var(--ink);transform:scaleX(0);transform-origin:right;transition:transform .3s}
.nav-links a:hover::after{transform:scaleX(1);transform-origin:left}
.nav-cta{background:var(--ink);color:var(--w);padding:11px 22px;border-radius:100px;font-size:13px;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:6px;transition:background .25s}
.nav-cta:hover{background:var(--a);color:var(--ink)}

/* ── HERO (asymmetric, editorial) ── */
.hero{padding:140px 0 80px;position:relative;overflow:hidden}
.hero-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:80px;align-items:center}
.hero-tag{display:inline-flex;align-items:center;gap:8px;font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--a);margin-bottom:24px}
.hero-tag::before{content:'';width:32px;height:1px;background:var(--a)}
.hero h1{font-family:'DM Serif Display',serif;font-size:clamp(56px,7vw,96px);line-height:.92;letter-spacing:-3px;margin-bottom:28px}
.hero h1 em{font-family:'Playfair Display',serif;font-style:italic;color:var(--a);font-weight:400;display:block}
.hero-sub{font-size:19px;line-height:1.7;color:var(--mute);max-width:480px;margin-bottom:36px}
.hero-actions{display:flex;gap:16px;flex-wrap:wrap;margin-bottom:48px}
.btn-pri{background:var(--ink);color:var(--w);padding:18px 36px;border-radius:100px;font-weight:600;font-size:15px;text-decoration:none;display:inline-flex;align-items:center;gap:10px;transition:all .3s;border:none;cursor:pointer}
.btn-pri:hover{background:var(--a);color:var(--ink);transform:translateY(-2px);box-shadow:0 12px 32px rgba(0,0,0,.15)}
.btn-sec{background:transparent;color:var(--ink);padding:18px 36px;border-radius:100px;font-weight:600;font-size:15px;text-decoration:none;border:1.5px solid var(--ink);transition:all .3s}
.btn-sec:hover{background:var(--ink);color:var(--w)}
.hero-trust{display:flex;gap:32px;flex-wrap:wrap;align-items:center;padding-top:24px;border-top:1px solid rgba(0,0,0,.06)}
.trust-item{display:flex;align-items:center;gap:10px}
.trust-num{font-family:'DM Serif Display',serif;font-size:32px;color:var(--a);line-height:1}
.trust-lbl{font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--mute);line-height:1.3}
.hero-img{position:relative;border-radius:20px;overflow:hidden;aspect-ratio:4/5;box-shadow:0 30px 80px rgba(0,0,0,.15)}
.hero-img::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 60%,rgba(0,0,0,.25))}
.hero-badge{position:absolute;bottom:24px;left:24px;right:24px;z-index:2;background:rgba(255,255,255,.95);backdrop-filter:blur(10px);padding:16px 20px;border-radius:14px;display:flex;align-items:center;gap:14px}
.hero-badge svg{width:36px;height:36px;color:var(--a);flex-shrink:0}
.hero-badge h4{font-size:13px;font-weight:700;margin-bottom:2px}
.hero-badge p{font-size:12px;color:var(--mute)}

/* ── PRESS / SOCIAL PROOF STRIP ── */
.proof{padding:48px 0;border-top:1px solid rgba(0,0,0,.06);border-bottom:1px solid rgba(0,0,0,.06);background:var(--bg)}
.proof-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;align-items:center}
.proof-item{text-align:center;padding:0 24px;border-right:1px solid rgba(0,0,0,.06)}
.proof-item:last-child{border-right:none}
.proof-stars{color:var(--a);font-size:20px;margin-bottom:6px;letter-spacing:2px}
.proof-num{font-family:'DM Serif Display',serif;font-size:36px;color:var(--ink);line-height:1;margin-bottom:4px}
.proof-lbl{font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--mute)}

/* ── FEATURED (large picture story) ── */
.featured{padding:120px 0}
.section-kicker{font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--a);margin-bottom:14px;display:flex;align-items:center;gap:12px}
.section-kicker::before{content:'';width:40px;height:1px;background:var(--a)}
.section-h{font-family:'DM Serif Display',serif;font-size:clamp(40px,5vw,64px);letter-spacing:-2px;line-height:1.05;margin-bottom:24px;max-width:720px}
.section-h em{font-family:'Playfair Display',serif;font-style:italic;color:var(--a);font-weight:400}
.featured-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;margin-top:60px}
.featured-img{aspect-ratio:4/5;border-radius:20px;overflow:hidden;position:relative}
.featured-img-tag{position:absolute;top:24px;left:24px;background:rgba(255,255,255,.95);backdrop-filter:blur(10px);padding:8px 16px;border-radius:100px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--ink)}
.featured-content p{font-size:17px;line-height:1.85;color:var(--mute);margin-bottom:20px}
.featured-content p:first-of-type::first-letter{font-family:'DM Serif Display',serif;font-size:64px;color:var(--a);float:left;line-height:.85;margin:5px 12px 0 0;font-weight:400}
.values{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:36px}
.value{padding-top:20px;border-top:2px solid var(--ink)}
.value h4{font-size:14px;font-weight:700;margin-bottom:6px}
.value p{font-size:13px;color:var(--mute);line-height:1.6}

/* ── SIGNATURE / FEATURED SERVICES (premium presentation) ── */
.signature{padding:120px 0;background:var(--bg)}
.sig-head{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:end;margin-bottom:60px}
.sig-head p{font-size:16px;color:var(--mute);line-height:1.7;max-width:440px}
.sig-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.sig-card{background:var(--w);border-radius:24px;overflow:hidden;transition:transform .4s cubic-bezier(.22,1,.36,1),box-shadow .4s}
.sig-card:hover{transform:translateY(-8px);box-shadow:0 30px 60px rgba(0,0,0,.12)}
.sig-card-img{aspect-ratio:4/5;overflow:hidden;position:relative}
.sig-card-img img{transition:transform .8s cubic-bezier(.22,1,.36,1)}
.sig-card:hover .sig-card-img img{transform:scale(1.08)}
.sig-card-tag{position:absolute;top:20px;left:20px;background:var(--a);color:var(--ink);padding:6px 14px;border-radius:100px;font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase}
.sig-card-body{padding:28px}
.sig-card h3{font-family:'DM Serif Display',serif;font-size:24px;letter-spacing:-.5px;margin-bottom:10px}
.sig-card p{font-size:14px;color:var(--mute);line-height:1.7;margin-bottom:20px}
.sig-card-link{font-size:13px;font-weight:600;color:var(--ink);text-decoration:none;display:inline-flex;align-items:center;gap:6px;border-bottom:1px solid var(--ink);padding-bottom:2px;transition:gap .3s}
.sig-card-link:hover{gap:12px}

/* ── ALL SERVICES (numbered list with icons) ── */
.all-services{padding:120px 0}
.all-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:0;margin-top:60px;border-top:1px solid rgba(0,0,0,.08)}
.all-item{padding:32px 0;border-bottom:1px solid rgba(0,0,0,.08);display:grid;grid-template-columns:60px 1fr auto;gap:32px;align-items:center;transition:padding-left .3s;cursor:default}
.all-item:nth-child(odd){border-right:1px solid rgba(0,0,0,.08);padding-right:32px}
.all-item:nth-child(even){padding-left:32px}
.all-item:hover{padding-left:40px}
.all-item:nth-child(even):hover{padding-left:40px}
.all-num{font-family:'DM Serif Display',serif;font-size:32px;color:var(--a);line-height:1}
.all-info h4{font-size:17px;font-weight:600;margin-bottom:4px}
.all-info p{font-size:13px;color:var(--mute);line-height:1.6}
.all-arrow{color:var(--mute);font-size:20px;transition:transform .3s,color .3s}
.all-item:hover .all-arrow{transform:translateX(4px);color:var(--a)}

/* ── TESTIMONIALS (3-up, with avatars) ── */
.testimonials{padding:120px 0;background:var(--ink);color:var(--w)}
.testimonials .section-kicker{color:var(--a)}
.testimonials .section-h{color:var(--w)}
.testi-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;margin-top:60px}
.testi{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:36px;transition:all .3s}
.testi:hover{background:rgba(255,255,255,.06);border-color:var(--a)}
.testi-stars{color:var(--a);font-size:18px;letter-spacing:2px;margin-bottom:20px}
.testi blockquote{font-family:'Playfair Display',serif;font-size:19px;font-style:italic;line-height:1.6;margin-bottom:24px;color:var(--w)}
.testi-author{display:flex;align-items:center;gap:14px;padding-top:20px;border-top:1px solid rgba(255,255,255,.08)}
.avatar{width:44px;height:44px;border-radius:50%;background:var(--a);color:var(--ink);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:14px}
.testi-author h5{font-size:14px;font-weight:600;margin-bottom:2px}
.testi-author p{font-size:12px;color:rgba(255,255,255,.5)}

/* ── LOCATION (map + info) ── */
.location{padding:120px 0}
.loc-grid{display:grid;grid-template-columns:1fr 1fr;gap:0;margin-top:60px;border-radius:24px;overflow:hidden;border:1px solid rgba(0,0,0,.06)}
.loc-info{padding:60px;background:var(--bg)}
.loc-info h3{font-family:'DM Serif Display',serif;font-size:32px;letter-spacing:-1px;margin-bottom:32px}
.loc-block{margin-bottom:28px;padding-bottom:28px;border-bottom:1px solid rgba(0,0,0,.06)}
.loc-block:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
.loc-lbl{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--mute);margin-bottom:10px}
.loc-val{font-size:16px;line-height:1.7}
.loc-val strong{font-weight:600}
.hours-row{display:flex;justify-content:space-between;padding:9px 0;font-size:14px;border-bottom:1px solid rgba(0,0,0,.04)}
.hours-row:last-child{border-bottom:none}
.hours-row span:last-child{color:var(--mute)}
.loc-map{min-height:560px}

/* ── FAQ ── */
.faq{padding:120px 0;background:var(--bg)}
.faq-list{max-width:840px;margin:60px auto 0;display:flex;flex-direction:column;gap:0}
.faq-item{border-bottom:1px solid rgba(0,0,0,.1);padding:24px 0;cursor:pointer}
.faq-q{display:flex;justify-content:space-between;align-items:center;gap:24px}
.faq-q h4{font-family:'DM Serif Display',serif;font-size:22px;letter-spacing:-.5px}
.faq-toggle{width:32px;height:32px;border-radius:50%;background:var(--ink);color:var(--w);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:20px;line-height:1;transition:transform .3s}
.faq-item[open] .faq-toggle{transform:rotate(45deg);background:var(--a);color:var(--ink)}
.faq-a{font-size:15px;line-height:1.8;color:var(--mute);padding-top:16px;max-width:680px}

/* ── FINAL CTA ── */
.final-cta{padding:120px 0;background:var(--a);text-align:center}
.final-cta h2{font-family:'DM Serif Display',serif;font-size:clamp(40px,5vw,64px);letter-spacing:-2px;color:var(--ink);margin-bottom:20px;max-width:720px;margin-left:auto;margin-right:auto;line-height:1.05}
.final-cta p{font-size:18px;color:var(--ink);opacity:.75;margin-bottom:40px;max-width:520px;margin-left:auto;margin-right:auto}
.final-cta .btn-pri{background:var(--ink);color:var(--w)}
.final-cta .btn-pri:hover{background:var(--w);color:var(--ink)}

/* ── FOOTER ── */
footer{background:var(--ink);color:var(--w);padding:80px 0 32px}
.foot-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:60px;margin-bottom:48px}
.foot-brand{font-family:'DM Serif Display',serif;font-size:32px;margin-bottom:16px}
.foot-brand-sub{font-size:14px;color:rgba(255,255,255,.5);line-height:1.7;max-width:300px}
.foot-col h5{font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--a);margin-bottom:16px}
.foot-col a,.foot-col p{display:block;color:rgba(255,255,255,.7);text-decoration:none;font-size:14px;margin-bottom:10px;line-height:1.6}
.foot-col a:hover{color:var(--w)}
.foot-bottom{padding-top:32px;border-top:1px solid rgba(255,255,255,.08);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;font-size:12px;color:rgba(255,255,255,.4)}
.foot-bottom a{color:var(--a);text-decoration:none}

/* ── Mobile ── */
@media(max-width:900px){
  .nav-links{display:none}
  .hero{padding:110px 0 60px}
  .hero-grid,.featured-grid,.sig-head,.loc-grid{grid-template-columns:1fr;gap:40px}
  .hero h1{font-size:48px;letter-spacing:-2px}
  .proof-grid{grid-template-columns:1fr 1fr}
  .proof-item:nth-child(2n){border-right:none}
  .sig-grid,.testi-grid{grid-template-columns:1fr}
  .all-grid{grid-template-columns:1fr}
  .all-item:nth-child(odd){border-right:none;padding-right:0}
  .all-item:nth-child(even){padding-left:0}
  .foot-grid{grid-template-columns:1fr;gap:32px}
  .loc-info{padding:40px 24px}
  .values{grid-template-columns:1fr}
  .featured,.signature,.all-services,.testimonials,.location,.faq,.final-cta{padding:80px 0}
}
</style></head><body>

<nav>
  <div class="wrap nav-row">
    <a href="#" class="brand"><div class="brand-mark">${firstName.slice(0,1).toUpperCase()}</div>${data.name}</a>
    <ul class="nav-links">
      <li><a href="#story">Our Story</a></li>
      <li><a href="#signature">Featured</a></li>
      <li><a href="#services">${navLabel}</a></li>
      <li><a href="#visit">Visit</a></li>
      <li><a href="#faq">FAQ</a></li>
      <li><a href="#contact" class="nav-cta">${cta} →</a></li>
    </ul>
  </div>
</nav>

<section class="hero">
  <div class="wrap hero-grid">
    <div data-reveal>
      <span class="hero-tag">${data.address_line1} · ${data.neighbourhood || data.city}</span>
      <h1>${data.tagline.split(/\s+/).slice(0, -2).join(' ')}<em>${data.tagline.split(/\s+/).slice(-2).join(' ')}</em></h1>
      <p class="hero-sub">${data.subtitle}</p>
      <div class="hero-actions">
        <a href="#contact" class="btn-pri">${cta} <span>→</span></a>
        <a href="#signature" class="btn-sec">Explore ${navLabel}</a>
      </div>
      <div class="hero-trust">
        ${rating > 0 ? `<div class="trust-item"><div class="trust-num" data-count="${rating}">0</div><div><div class="trust-lbl">Star rating</div><div class="trust-lbl">${reviewCount} reviews</div></div></div>` : ''}
        <div class="trust-item"><div class="trust-num">${data.neighbourhood ? '' : '📍'}${data.neighbourhood ? '★' : ''}</div><div><div class="trust-lbl">Located in</div><div class="trust-lbl">${data.neighbourhood || data.city}</div></div></div>
        <div class="trust-item"><div class="trust-num">${data.has_delivery ? '✓' : '★'}</div><div><div class="trust-lbl">${data.has_delivery ? 'Delivery' : 'Trusted'}</div><div class="trust-lbl">${data.has_delivery ? (data.delivery_platforms || []).slice(0,2).join(', ') || 'Available' : 'Local favourite'}</div></div></div>
      </div>
    </div>
    <div class="hero-img" data-reveal>
      ${img(ph[0], data.name)}
      <div class="hero-badge">
        <div style="color:var(--a)">${icon}</div>
        <div><h4>${data.vibe_tags?.[0] || 'Local Favourite'}</h4><p>${data.hours_summary}</p></div>
      </div>
    </div>
  </div>
</section>

<section class="proof">
  <div class="wrap proof-grid">
    ${rating > 0 ? `<div class="proof-item"><div class="proof-stars">${'★'.repeat(Math.round(rating))}</div><div class="proof-num" data-count="${rating}">0</div><div class="proof-lbl">Average rating</div></div>` : ''}
    <div class="proof-item"><div class="proof-num" data-count="${reviewCountNum}">0</div><div class="proof-lbl">Happy customers</div></div>
    <div class="proof-item"><div class="proof-num">${data.neighbourhood || data.city}</div><div class="proof-lbl">Proudly serving</div></div>
    <div class="proof-item"><div class="proof-num">${data.vibe_tags?.[0] || 'Local'}</div><div class="proof-lbl">What we're known for</div></div>
  </div>
</section>

<section class="featured" id="story">
  <div class="wrap">
    <div data-reveal>
      <div class="section-kicker">Our Story</div>
      <h2 class="section-h">More than a ${data.category}.<em>A neighbourhood institution.</em></h2>
    </div>
    <div class="featured-grid">
      <div class="featured-img" data-reveal>
        ${img(ph[5] || ph[1] || ph[0], data.name)}
        <span class="featured-img-tag">Since day one</span>
      </div>
      <div class="featured-content" data-reveal>
        <p>${data.about_paragraph}</p>
        <p>${data.about_paragraph2}</p>
        <div class="values">
          ${(data.vibe_tags || []).slice(0,4).map((tag, i) => `<div class="value"><h4>${tag}</h4><p>${['Made with intention.', 'Crafted with care.', 'Built to last.', 'For everyone.'][i % 4]}</p></div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</section>

<section class="signature" id="signature">
  <div class="wrap">
    <div class="sig-head" data-reveal>
      <div>
        <div class="section-kicker">Featured</div>
        <h2 class="section-h">What we're<em>known for.</em></h2>
      </div>
      <p>Our most-loved offerings, hand-picked and perfected over years. These are the ones our regulars keep coming back for.</p>
    </div>
    <div class="sig-grid">
      ${sigItems.slice(0,3).map((item, i) => `<div class="sig-card" data-reveal>
        <div class="sig-card-img">${img(ph[6+i] || ph[i%5], item.name)}<span class="sig-card-tag">${item.tag || 'Signature'}</span></div>
        <div class="sig-card-body">
          <h3>${item.emoji || ''} ${item.name}</h3>
          <p>${item.description}</p>
          <a href="#contact" class="sig-card-link">Try it now <span>→</span></a>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="all-services" id="services">
  <div class="wrap">
    <div data-reveal>
      <div class="section-kicker">Full ${navLabel}</div>
      <h2 class="section-h">Everything we<em>offer.</em></h2>
    </div>
    <div class="all-grid">
      ${allItems.slice(0,8).map((item, i) => `<div class="all-item" data-reveal>
        <div class="all-num">${String(i+1).padStart(2,'0')}</div>
        <div class="all-info"><h4>${item.emoji || ''} ${item.name}</h4><p>${item.description}</p></div>
        <div class="all-arrow">→</div>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="testimonials">
  <div class="wrap">
    <div data-reveal>
      <div class="section-kicker">Reviews</div>
      <h2 class="section-h">What our<em>customers say.</em></h2>
    </div>
    <div class="testi-grid">
      ${testimonials.map(t => `<div class="testi" data-reveal>
        <div class="testi-stars">★★★★★</div>
        <blockquote>"${t.quote}"</blockquote>
        <div class="testi-author">
          <div class="avatar">${t.initials}</div>
          <div><h5>Verified customer</h5><p>${t.source}</p></div>
        </div>
      </div>`).join('')}
    </div>
  </div>
</section>

<section class="location" id="visit">
  <div class="wrap">
    <div data-reveal>
      <div class="section-kicker">Visit Us</div>
      <h2 class="section-h">Find us in<em>${data.neighbourhood || data.city}.</em></h2>
    </div>
    <div class="loc-grid" data-reveal>
      <div class="loc-info">
        <h3>Plan Your Visit</h3>
        <div class="loc-block">
          <div class="loc-lbl">Address</div>
          <div class="loc-val"><strong>${data.address_line1}</strong><br>${data.city}, ${data.province_state} ${data.postal_zip}${data.neighbourhood ? `<br><span style="color:var(--mute)">${data.neighbourhood}</span>` : ''}</div>
        </div>
        ${data.phone ? `<div class="loc-block"><div class="loc-lbl">Phone</div><div class="loc-val"><a href="tel:${data.phone}" style="color:var(--ink);text-decoration:none;font-weight:600">${data.phone}</a></div></div>` : ''}
        <div class="loc-block">
          <div class="loc-lbl">Hours</div>
          <div class="loc-val">${hours.map(h => `<div class="hours-row"><span>${h.days}</span><span>${h.time}</span></div>`).join('')}</div>
        </div>
        ${data.instagram ? `<div class="loc-block"><div class="loc-lbl">Follow</div><div class="loc-val"><a href="https://instagram.com/${data.instagram}" target="_blank" style="color:var(--a);text-decoration:none;font-weight:600">@${data.instagram} →</a></div></div>` : ''}
      </div>
      <div class="loc-map">${mapEmbed}</div>
    </div>
  </div>
</section>

<section class="faq" id="faq">
  <div class="wrap">
    <div data-reveal>
      <div class="section-kicker">Common Questions</div>
      <h2 class="section-h">Good to<em>know.</em></h2>
    </div>
    <div class="faq-list">
      ${faqs.map((f, i) => `<details class="faq-item"${i === 0 ? ' open' : ''} data-reveal>
        <summary class="faq-q"><h4>${f.q}</h4><div class="faq-toggle">+</div></summary>
        <p class="faq-a">${f.a}</p>
      </details>`).join('')}
    </div>
  </div>
</section>

<section class="final-cta" id="contact">
  <div class="wrap" data-reveal>
    <h2>Ready to experience<br>${firstName}'s for yourself?</h2>
    <p>${data.subtitle}</p>
    <a href="${data.phone ? `tel:${data.phone}` : '#'}" class="btn-pri">${cta} <span>→</span></a>
  </div>
</section>

<footer>
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <div class="foot-brand">${data.name}</div>
        <p class="foot-brand-sub">${data.subtitle}</p>
      </div>
      <div class="foot-col">
        <h5>Visit</h5>
        <p>${data.address_line1}</p>
        <p>${data.city}, ${data.province_state} ${data.postal_zip}</p>
        ${data.phone ? `<a href="tel:${data.phone}">${data.phone}</a>` : ''}
      </div>
      <div class="foot-col">
        <h5>Hours</h5>
        ${hours.slice(0,3).map(h => `<p>${h.days}: ${h.time}</p>`).join('')}
      </div>
      <div class="foot-col">
        <h5>Connect</h5>
        ${data.instagram ? `<a href="https://instagram.com/${data.instagram}" target="_blank">Instagram</a>` : ''}
        ${data.website ? `<a href="${data.website.startsWith('http') ? data.website : 'https://' + data.website}" target="_blank">Website</a>` : ''}
      </div>
    </div>
    <div class="foot-bottom">
      <span>© 2026 ${data.name}. All rights reserved.</span>
      <span>Built by <a href="https://thewebguys.ca" target="_blank">The Web Guys</a></span>
    </div>
  </div>
</footer>
${premiumJS}</body></html>`;
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
  const [template, setTemplate] = useState("standard");
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
      setPhotoSource(photos.some(u => u && u.includes("googleapis")) ? "google" : "stock");
      setPublishedUrl(`${window.location.origin}/mockups/${slug}`);
      // If photos were saved, rebuild with current template; otherwise show stored HTML as-is
      if (photos.length > 0) {
        setMockupHTML(buildMockupHTML(biz, photos, template));
      } else {
        setMockupHTML(m.html || "");
      }
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


        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 0, maxWidth: 1500, margin: "0 auto", minHeight: "calc(100vh - 60px)" }}>

          {/* ═══ LEFT SIDEBAR — Always visible ═══ */}
          <div style={{ borderRight: "1px solid #1A1A1A", padding: "28px 20px", overflowY: "auto", maxHeight: "calc(100vh - 60px)", position: "sticky", top: 60 }}>
            <button onClick={() => { setMockupHTML(""); setBusinessData(null); setPublishedUrl(""); setCachedPhotos([]); }}
              style={{ width: "100%", padding: "12px 16px", background: "#3EA843", color: "#fff", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", marginBottom: 28 }}>
              + New Mockup
            </button>

            {published.length > 0 && (
              <>
                <h3 style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#3EA843", marginBottom: 12 }}>Published</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 28 }}>
                  {published.map((m, i) => (
                    <div key={i} style={{ padding: "10px 12px", background: "#0A1A0A", border: "1px solid #1A3A1A", borderRadius: 6, cursor: "pointer" }}
                      onClick={() => loadMockup(m.slug)}>
                      <div style={{ fontSize: 13, color: "#4CAF50", fontWeight: 500 }}>{m.business_name}</div>
                      <div style={{ fontSize: 10, color: "#444", marginTop: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span>{new Date(m.created_at).toLocaleDateString()}</span>
                        <div style={{ display: "flex", gap: 8 }}>
                          <a href={`/mockups/${m.slug}`} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()} style={{ color: "#3EA843", textDecoration: "none", fontSize: 10 }}>View ↗</a>
                          <button onClick={(e) => { e.stopPropagation(); deleteMockup(m.slug); }} style={{ background: "none", border: "none", color: "#553333", fontSize: 10, cursor: "pointer", fontFamily: "inherit" }}>Delete</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {history.length > 0 && (
              <>
                <h3 style={{ fontSize: 11, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "#444", marginBottom: 12 }}>Recent</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {history.map((h, i) => (
                    <div key={i} style={{ padding: "10px 12px", background: "#111", border: "1px solid #1A1A1A", borderRadius: 6, cursor: "pointer" }}
                      onClick={() => { setMockupHTML(""); setBusinessData(null); setPublishedUrl(""); setName(h.name); setAddress(h.address || ""); setNotes(h.notes || ""); setCategory(h.category || ""); setTemplate(["premium","showcase","cinematic","magazine"].includes(h.template) ? "premium" : "standard"); }}>
                      <div style={{ fontSize: 13, color: "#aaa", fontWeight: 500 }}>{h.name}</div>
                      <div style={{ fontSize: 10, color: "#444", marginTop: 3 }}>{h.category} · {h.photoSource === "google" ? "📸" : "🖼"} · {new Date(h.date).toLocaleDateString()}</div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* ═══ RIGHT CONTENT — Form or Preview ═══ */}
          <div style={{ padding: "28px 32px", overflowY: "auto" }}>

            {!mockupHTML ? (
              /* ─── FORM VIEW ─── */
              <div style={{ maxWidth: 600, margin: "0 auto" }}>
                <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: -1, marginBottom: 6, color: "#fff" }}>
                  Auto Mockup Generator
                </h1>
                <p style={{ fontSize: 14, color: "#555", marginBottom: 32, lineHeight: 1.6 }}>
                  Enter a business name + address. We'll pull their Google photos, research them with AI, and generate a branded homepage mockup.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
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
                    <label style={S.label}>Tier</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      <button onClick={() => { setTemplate("standard"); setModel("standard"); }}
                        style={{ padding: "16px 14px", background: template === "standard" ? "#1A2A1A" : "#141414", border: template === "standard" ? "2px solid #3EA843" : "1px solid #222", borderRadius: 10, cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: template === "standard" ? "#3EA843" : "#aaa", marginBottom: 4 }}>Standard</div>
                        <div style={{ fontSize: 11, color: "#555", lineHeight: 1.5 }}>Clean template look · Hero, about, services, gallery, contact · ~$500</div>
                      </button>
                      <button onClick={() => { setTemplate("premium"); setModel("premium"); }}
                        style={{ padding: "16px 14px", background: template === "premium" ? "#1A1A2A" : "#141414", border: template === "premium" ? "2px solid #6B8AFF" : "1px solid #222", borderRadius: 10, cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: template === "premium" ? "#6B8AFF" : "#aaa", marginBottom: 4 }}>⚡ Premium</div>
                        <div style={{ fontSize: 11, color: "#555", lineHeight: 1.5 }}>Custom agency look · Reviews, FAQ, map, animations, multi-CTA · ~$2,500+</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label style={S.label}>Notes <span style={{ color: "#444" }}>(optional)</span></label>
                    <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Instagram handle, known services, etc." rows={2} style={S.textarea} />
                  </div>

                  <button onClick={generate} disabled={loading}
                    style={{ ...S.actionBtn(true), padding: "16px 32px", fontSize: 15, width: "100%", opacity: loading ? 0.6 : 1 }}>
                    {loading ? step || "Generating..." : "Generate Mockup →"}
                  </button>
                  {error && <p style={{ color: "#FF5252", fontSize: 13 }}>{error}</p>}
                  {loading && (
                    <div style={{ textAlign: "center" }}>
                      <div style={{ width: 28, height: 28, border: "3px solid #2A2A2A", borderTopColor: "#3EA843", borderRadius: "50%", animation: "spin 0.6s linear infinite", margin: "0 auto" }} />
                      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                    </div>
                  )}
                </div>
              </div>

            ) : (
              /* ─── PREVIEW VIEW ─── */
              <div>
                {/* Header row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 2 }}>{businessData?.name || name}</h2>
                    <p style={{ fontSize: 12, color: "#555" }}>
                      {businessData?.category} · {businessData?.palette} · {photoSource === "google" ? "📸 Google photos" : "🖼 Stock"}
                      {model === "premium" ? " · ⚡ Premium" : ""}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <button onClick={copyHTML} style={S.actionBtn(false)}>Copy HTML</button>
                    <button onClick={downloadHTML} style={S.actionBtn(false)}>Download</button>
                    <button onClick={publishMockup} disabled={publishing} style={{ ...S.actionBtn(true), opacity: publishing ? 0.6 : 1 }}>
                      {publishing ? "Publishing..." : "Publish Live →"}
                    </button>
                  </div>
                </div>

                {/* Template & style controls */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                    <button onClick={() => {
                      setTemplate("standard"); setModel("standard");
                      if (businessData && cachedPhotos.length) setMockupHTML(buildMockupHTML(businessData, cachedPhotos, "standard"));
                    }} style={{ padding: "8px 24px", background: template === "standard" ? "#1A2A1A" : "transparent", border: template === "standard" ? "1.5px solid #3EA843" : "1px solid #222", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600, color: template === "standard" ? "#3EA843" : "#666", fontFamily: "inherit" }}>
                      Standard
                    </button>
                    <button onClick={() => {
                      setTemplate("premium"); setModel("premium");
                      if (businessData && cachedPhotos.length) setMockupHTML(buildMockupHTML(businessData, cachedPhotos, "premium"));
                    }} style={{ padding: "8px 24px", background: template === "premium" ? "#1A1A2A" : "transparent", border: template === "premium" ? "1.5px solid #6B8AFF" : "1px solid #222", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600, color: template === "premium" ? "#6B8AFF" : "#666", fontFamily: "inherit" }}>
                      ⚡ Premium
                    </button>
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                    <select value={businessData?.palette || "warm"} onChange={(e) => {
                      const updated = { ...businessData, palette: e.target.value };
                      setBusinessData(updated);
                      if (cachedPhotos.length) setMockupHTML(buildMockupHTML(updated, cachedPhotos, template));
                    }} style={{ padding: "5px 10px", background: "#141414", border: "1px solid #222", borderRadius: 5, color: "#888", fontSize: 11, fontFamily: "inherit", cursor: "pointer" }}>
                      {["warm","cool","earthy","modern","elegant","fresh"].map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <div style={{ borderLeft: "1px solid #1A1A1A", height: 20, margin: "0 4px" }} />
                    <button onClick={() => { setTimeout(generate, 0); }} disabled={loading}
                      style={{ padding: "5px 12px", background: "transparent", border: "1px solid #222", borderRadius: 5, cursor: "pointer", fontSize: 11, color: "#888", fontFamily: "inherit" }}>
                      🔄 Re-research {model === "premium" ? "(Fable 5)" : "(Sonnet)"}
                    </button>
                  </div>
                </div>

                {error && <p style={{ color: "#FF5252", fontSize: 13, marginBottom: 12 }}>{error}</p>}

                {/* Published banner */}
                {publishedUrl && (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px", background: "#0A1A0A", borderRadius: 8, border: "1px solid #1A3A1A", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: 12, color: "#4CAF50", fontWeight: 600 }}>✓ Live</span>
                      <a href={publishedUrl} target="_blank" rel="noopener" style={{ fontSize: 12, color: "#3EA843", textDecoration: "underline", fontFamily: "monospace" }}>{publishedUrl.replace("https://", "")}</a>
                    </div>
                    <button onClick={() => { navigator.clipboard.writeText(publishedUrl); }} style={{ background: "none", border: "1px solid #1A3A1A", borderRadius: 4, color: "#3EA843", fontSize: 10, cursor: "pointer", padding: "4px 10px", fontFamily: "inherit" }}>Copy</button>
                  </div>
                )}

                {/* Info chips */}
                {businessData && (
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                    {businessData.rating && <span style={{ ...S.chip, fontSize: 11 }}>⭐ {businessData.rating} ({businessData.review_count})</span>}
                    {businessData.phone && <span style={{ ...S.chip, fontSize: 11 }}>📞 {businessData.phone}</span>}
                    {businessData.instagram && <span style={{ ...S.chip, fontSize: 11 }}>📸 @{businessData.instagram}</span>}
                    {businessData.has_delivery && <span style={{ ...S.chip, fontSize: 11 }}>🚗 {businessData.delivery_platforms?.join(", ")}</span>}
                    {businessData.website && <a href={businessData.website.startsWith("http") ? businessData.website : `https://${businessData.website}`} target="_blank" rel="noopener" style={{ ...S.chip, fontSize: 11, background: "#0A1A0A", borderColor: "#1A3A1A", color: "#4CAF50", textDecoration: "none" }}>⚠️ {businessData.website}</a>}
                  </div>
                )}

                {/* Preview frame */}
                <div style={{ border: "1px solid #222", borderRadius: 10, overflow: "hidden", background: "#fff" }}>
                  <div style={{ padding: "8px 14px", background: "#161616", display: "flex", alignItems: "center", gap: 6, borderBottom: "1px solid #222" }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E" }} />
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
                    <span style={{ marginLeft: 10, fontSize: 11, color: "#444", fontFamily: "monospace" }}>
                      thewebguys.ca/mockups/{(businessData?.name || name).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-+$/, "")}
                    </span>
                  </div>
                  <iframe srcDoc={mockupHTML} style={{ width: "100%", height: "80vh", border: "none" }} title="Preview" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
