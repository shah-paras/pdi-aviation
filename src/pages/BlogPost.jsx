import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft, Calendar, Clock, User, Share2,
  Facebook, Twitter, Linkedin, Link2, ChevronUp
} from 'lucide-react';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';

export default function BlogPost() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');

  const ALL_POSTS = [
    {
      id: '1',
      title: 'Understanding Aircraft Valuations in 2026',
      slug: 'aircraft-valuations-2026',
      excerpt: 'From evolving interest rates to shifting fleet demographics \u2014 how to read the market signals that determine what your aircraft is worth in 2026.',
      category: 'Market Analysis',
      featured_image: '/images/blog/aircraft-valuations-2026.jpg',
      publish_date: '2026-02-10',
      author_name: 'PDI Aviation',
      author_role: 'Aviation Advisory',
      reading_time_min: 8,
      content: `<p class="lead text-xl text-slate-300 leading-relaxed font-light">Aircraft valuations in 2026 sit at a fascinating inflection point. The post-pandemic frenzy has fully unwound, interest rates have eased but not collapsed, and India's private aviation sector has matured into a market that demands rigorous, data-driven analysis rather than gut instinct. Whether you are acquiring your first aircraft or rebalancing a fleet of three, understanding how valuations actually work — and where the standard guides fall short — is the single most consequential piece of due diligence you will undertake.</p>

<div class="not-prose my-10 grid grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">6–8%</div>
    <div class="text-sm text-slate-400 mt-1">Typical Annual Depreciation</div>
  </div>
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">5–15%</div>
    <div class="text-sm text-slate-400 mt-1">Engine Programme Premium</div>
  </div>
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">~6–7%</div>
    <div class="text-sm text-slate-400 mt-1">Current Financing Rates</div>
  </div>
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">60–90 Days</div>
    <div class="text-sm text-slate-400 mt-1">Valuation Guide Lag</div>
  </div>
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">&#8377;35–120 Cr</div>
    <div class="text-sm text-slate-400 mt-1">Active Indian Demand Range</div>
  </div>
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">$3K–6K</div>
    <div class="text-sm text-slate-400 mt-1">Professional Appraisal Fee</div>
  </div>
</div>

<h2>The Post-Pandemic Market Maturation</h2>

<p>To understand where we are in 2026, you need to understand the cycle that brought us here. Between late 2020 and early 2022, the pre-owned aircraft market experienced an unprecedented surge. First-time buyers — many of whom had never considered private aviation — entered the market in waves. Inventory dried up. Brokers found themselves in bidding wars. Light jets that had been depreciating steadily for a decade suddenly appreciated by 15–25% in a matter of months.</p>

<p>The correction was inevitable. Through 2023 and into 2024, inventory levels began to normalise as new deliveries caught up and some pandemic-era buyers exited the market. Sellers who had anchored to peak-era prices found their aircraft sitting on the market for months. Transaction volumes dipped, and the gap between asking prices and closing prices widened to levels not seen since 2018.</p>

<p>By 2026, we have arrived at what the industry increasingly refers to as the <strong>new normal</strong>. Inventory has stabilised at healthy levels — neither the scarcity of 2021 nor the overhang feared in late 2024. Light jets that appreciated during the pandemic have settled approximately 10–15% above their pre-pandemic trajectory, reflecting a genuine structural shift in demand rather than pure speculation. The most resilient category has been mid-size jets, particularly the Bombardier Challenger 350 and Embraer Praetor 500, which have retained value exceptionally well thanks to strong charter demand and favourable operating economics.</p>

<div class="not-prose border-l-4 border-slate-600 bg-white/5 rounded-r-xl p-6 my-8">
  <p class="text-lg text-slate-300 italic leading-relaxed">"The pandemic did not create artificial demand — it accelerated a structural shift. The buyers who entered between 2020 and 2022 have largely stayed. What has normalised is the pace of entry and the willingness to pay premiums above book value."</p>
</div>

<hr class="border-slate-700/50 my-10">

<h2>Key Valuation Drivers</h2>

<p>Every aircraft valuation ultimately distils to a handful of core factors. While published guides provide a starting point, understanding how each driver interacts with the others — and how the Indian market weighs them differently — is where experienced advisory makes the difference.</p>

<h3>Total Time and Cycles</h3>

<p>Airframe total time (TT) and total cycles remain the foundational metrics. An aircraft with 3,500 hours on a type that averages 400–500 hours per year tells a straightforward story. But context matters enormously. A high-cycle, low-time aircraft — common in Indian domestic operations with short sectors — presents a different maintenance profile than a low-cycle, high-time aircraft used for long international legs. Buyers should examine the ratio, not just the headline number.</p>

<h3>Engine Programme Enrolment</h3>

<p>This is the single most under-appreciated valuation lever in the Indian market. Aircraft enrolled on manufacturer-backed engine maintenance programmes — Pratt &amp; Whitney's Eagle Service Plan (ESP Gold), Rolls-Royce's CorporateCare, or Williams International's TAP Elite — command a measurable premium of <strong>5–15% over equivalent non-enrolled aircraft</strong>. The reason is straightforward: programme enrolment transfers the risk and cost of unscheduled engine events from the owner to the manufacturer. For a buyer, it dramatically simplifies cost forecasting and protects residual value at resale.</p>

<h3>Avionics and Safety Equipage</h3>

<p>By 2026, certain avionics standards have moved from competitive advantage to baseline expectation. ADS-B Out compliance is mandatory in most operational airspace. TCAS II Change 7.1 is standard. CPDLC/FANS capability is essential for any aircraft operating international routes. Modern integrated flight decks — Garmin G5000, G3000, or Collins Pro Line Fusion — are now expected on any aircraft built within the last decade. Aircraft still operating legacy analogue panels or early-generation glass cockpits face measurable discounts, often 8–12% below comparable airframes with current avionics.</p>

<h3>Interior Condition and Configuration</h3>

<p>Interior refurbishment costs have increased significantly since 2022, with lead times for premium materials stretching to 16–20 weeks. A well-maintained original interior on a 2018 aircraft can be more valuable than a poorly executed refurbishment on a 2015 airframe. Buyers in the Indian market particularly value configurations that accommodate four passengers in a club arrangement with a full-service galley, reflecting the business-travel use case that dominates domestic operations.</p>

<div class="not-prose overflow-x-auto my-8 rounded-xl border border-white/10">
  <table class="w-full text-sm text-left">
    <thead><tr class="bg-white/5 border-b border-white/10">
      <th class="px-4 py-3 text-sky-400 font-semibold text-xs uppercase tracking-wider">Factor</th>
      <th class="px-4 py-3 text-sky-400 font-semibold text-xs uppercase tracking-wider">Value Impact</th>
      <th class="px-4 py-3 text-sky-400 font-semibold text-xs uppercase tracking-wider">Notes</th>
    </tr></thead>
    <tbody class="divide-y divide-white/5">
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300">Engine Programme Enrolment</td>
        <td class="px-4 py-3 text-slate-300">+5% to +15%</td>
        <td class="px-4 py-3 text-slate-300">ESP Gold, CorporateCare, TAP Elite — transferability is key</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300">Avionics Generation</td>
        <td class="px-4 py-3 text-slate-300">-8% to -12% if legacy</td>
        <td class="px-4 py-3 text-slate-300">G5000/G3000 or Pro Line Fusion now considered baseline</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300">Total Time vs. Type Average</td>
        <td class="px-4 py-3 text-slate-300">Variable, +/-5%</td>
        <td class="px-4 py-3 text-slate-300">High-cycle, low-time profiles common in Indian domestic ops</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300">Interior Condition (1–10 scale)</td>
        <td class="px-4 py-3 text-slate-300">Up to -10% if below 6</td>
        <td class="px-4 py-3 text-slate-300">Refurbishment costs have risen 20–30% since 2022</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300">Paint Condition</td>
        <td class="px-4 py-3 text-slate-300">-2% to -5% if poor</td>
        <td class="px-4 py-3 text-slate-300">Full repaint costs $150K–$350K depending on type</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300">Maintenance Status (time to next event)</td>
        <td class="px-4 py-3 text-slate-300">-5% to -20%</td>
        <td class="px-4 py-3 text-slate-300">Impending hot section or overhaul is a major discount driver</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300">Damage History</td>
        <td class="px-4 py-3 text-slate-300">-10% to -30%</td>
        <td class="px-4 py-3 text-slate-300">Even repaired damage leaves a permanent record discount</td>
      </tr>
    </tbody>
  </table>
</div>

<hr class="border-slate-700/50 my-10">

<h2>Interest Rates and Financing</h2>

<p>The financing environment in 2026 remains a critical variable in the valuation equation — not because it changes what an aircraft is intrinsically worth, but because it determines how many buyers can afford to participate. Rates have eased slightly from the 2024 peaks but remain firmly in the <strong>6–7% range</strong> for well-qualified borrowers financing through established aviation lenders. This is materially higher than the 3.5–4.5% that prevailed through 2020 and early 2021.</p>

<p>The practical impact is twofold. First, monthly holding costs are higher, which compresses the number of buyers for any given price point. An aircraft that a buyer could comfortably finance at 4% may strain their budget at 6.5%. Second, all-cash buyers — and India has a disproportionate share of them relative to Western markets — hold a genuine competitive advantage. They can close faster, negotiate harder, and avoid the inspection and documentation requirements that lenders impose.</p>

<p>For sellers, the elevated rate environment means that pricing must reflect the total cost of ownership, not just the acquisition number. An aircraft priced at $8 million with a $500,000 engine event looming is effectively a $8.5 million proposition — and the financing cost on that additional $500,000 over a five-year term adds another $100,000 or more. Sophisticated buyers model this in detail, and sellers who ignore it find their aircraft lingering on the market.</p>

<hr class="border-slate-700/50 my-10">

<h2>India-Specific Market Dynamics</h2>

<p>The Indian private aviation market operates under a set of constraints and opportunities that make direct comparisons with the US or European markets misleading. Understanding these dynamics is essential for anyone operating in or entering this space.</p>

<p><strong>Import duties and taxation</strong> remain the single largest differentiator. The combined impact of customs duty, IGST, and applicable cess on an imported aircraft can add 20–25% to the landed cost relative to an equivalent US-based acquisition. This significantly affects residual value calculations: an aircraft that depreciates 8% per year in the US market may effectively depreciate faster in India when the duty-inflated acquisition cost is used as the baseline.</p>

<p><strong>DGCA registration requirements</strong> add both time and cost to any transaction. The Certificate of Airworthiness process, while well-established, requires thorough documentation and inspection. Aircraft with complete, well-organised maintenance records — particularly those maintained under an FAA or EASA-approved programme — transition more smoothly to the Indian register.</p>

<p><strong>Domestic MRO capacity</strong> has improved but remains limited for certain types. Operators of popular light and mid-size jets benefit from growing service centre presence in Mumbai, Delhi, and Bengaluru. However, heavy maintenance, engine overhauls, and avionics upgrades frequently require ferry flights to Singapore, Dubai, or the United States, adding both cost and downtime to the ownership equation.</p>

<p><strong>Fractional ownership and multi-owner structures</strong> are gaining traction under evolving regulatory frameworks. The &#8377;35–120 crore acquisition range represents the sweet spot for these arrangements, with two to four principals sharing both costs and utilisation. Properly structured, these arrangements can reduce the per-owner annual cost by 40–60% while maintaining availability for 150–200 hours per principal annually.</p>

<hr class="border-slate-700/50 my-10">

<h2>Working with Professional Appraisers</h2>

<p>The three major valuation guides — Aircraft Bluebook, VREF, and Avac (formerly known as the Airliner Price Guide) — serve as useful starting points but carry an inherent limitation: they are backward-looking by <strong>60 to 90 days</strong>. In a stable market, this lag is manageable. During periods of rapid price movement, it can be dangerously misleading.</p>

<p>These guides aggregate historical transaction data, apply depreciation models, and produce a baseline value for a "standard-equipped" aircraft of a given type, year, and total time. The challenge is that no aircraft is truly standard. The gap between a base Bluebook value and the actual market value of a specific serial number — after accounting for engine programme status, avionics, interior condition, maintenance history, and damage record — can easily exceed 15–20%.</p>

<p>For any transaction above $3 million — which covers virtually every acquisition in the Indian market — a <strong>USPAP-certified independent appraisal</strong> is a non-negotiable step. Professional appraisers with current market access typically charge <strong>$3,000 to $6,000</strong> for a desktop appraisal or $5,000 to $12,000 for a physical inspection. This is a trivial cost relative to the transaction value and the risk of over- or under-paying by hundreds of thousands of dollars.</p>

<p>When engaging an appraiser, prioritise those with active transaction involvement in the specific type you are evaluating. An appraiser who has closed three Phenom 300E transactions in the past six months has market intelligence that no published guide can replicate. Ask for their recent comparable transactions, and verify that their methodology accounts for the India-specific cost factors outlined above.</p>

<div class="not-prose border-l-4 border-sky-400 bg-sky-500/10 rounded-r-xl p-6 my-8">
  <div class="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-2">PDI Aviation Perspective</div>
  <p class="text-slate-300 leading-relaxed">At PDI Aviation, we approach every valuation engagement with the understanding that published guides are a starting point, not a conclusion. Our advisory team maintains an active transaction database spanning the Indian subcontinent, the Middle East, and Southeast Asia, allowing us to benchmark specific serial numbers against actual closed deals — not projected values. For acquisitions in the &#8377;35–120 crore range, we coordinate independent USPAP appraisals alongside our own market analysis, ensuring that our clients enter negotiations with a defensible, data-backed position. Whether you are buying, selling, or restructuring ownership, the valuation is the foundation upon which every subsequent decision rests. We recommend engaging professional advisory before committing to any letter of intent.</p>
</div>`,
      tags: ['valuation', 'market', 'aircraft-pricing', 'india']
    },
    {
      id: '2',
      title: 'Top 5 Light Jets for Indian Operators in 2026',
      slug: 'top-light-jets-india-2026',
      excerpt: 'From the Phenom 300E to the Citation M2 Gen2 \u2014 the five light jets best suited for Indian operations in 2026.',
      category: 'Aircraft Reviews',
      featured_image: '/images/blog/top-light-jets-india.png',
      publish_date: '2026-01-18',
      author_name: 'PDI Aviation',
      author_role: 'Aviation Advisory',
      reading_time_min: 7,
      content: `<p class="lead text-xl text-slate-300 leading-relaxed font-light">India's private aviation sector demands more from a light jet than most markets. Hot-and-high performance at airports like Leh and Kullu, DGCA compliance requirements, limited but growing domestic MRO infrastructure, and sectors that routinely stretch 2.5 to 3 hours — these constraints narrow the field considerably. After evaluating the current production light jet landscape against the specific demands of Indian operations, these are the five aircraft we recommend operators consider in 2026.</p>

<div class="not-prose my-10 grid grid-cols-2 lg:grid-cols-5 gap-4">
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">2,010 nm</div>
    <div class="text-sm text-slate-400 mt-1">Phenom 300E — Best Overall</div>
  </div>
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">2,165 nm</div>
    <div class="text-sm text-slate-400 mt-1">CJ4 Gen2 — Most Reliable</div>
  </div>
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">840 m</div>
    <div class="text-sm text-slate-400 mt-1">PC-24 — Short-Field King</div>
  </div>
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">~130 USG/hr</div>
    <div class="text-sm text-slate-400 mt-1">HondaJet Elite II — Most Efficient</div>
  </div>
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">~$5M</div>
    <div class="text-sm text-slate-400 mt-1">Citation M2 Gen2 — Best Value</div>
  </div>
</div>

<h2>Why India Is Different</h2>

<p>Selecting a light jet for Indian operations is not the same exercise as selecting one for US domestic flying. Several factors unique to the subcontinent fundamentally alter the calculus.</p>

<p><strong>Hot-and-high performance</strong> is non-negotiable. Delhi in May regularly sees ISA+25 conditions. Airports like Udaipur (VAUD, elevation 1,684 ft), Jaipur (VIJP, 1,263 ft), and especially Kullu-Manali (VIBR, 3,573 ft) test takeoff performance limits that are irrelevant in temperate Western markets. An aircraft that performs beautifully at sea level on a standard day may be payload-limited or runway-constrained at a high-elevation Indian airport on a hot afternoon.</p>

<p><strong>DGCA regulatory requirements</strong> govern everything from initial registration to ongoing maintenance surveillance. Aircraft with FAA or EASA type certificates transition more readily to the Indian register. Operators should factor 4–8 weeks for the DGCA import and registration process, including obtaining the Certificate of Airworthiness and operator approval.</p>

<p><strong>MRO availability</strong> continues to improve but remains concentrated. Cessna/Textron and Embraer have the strongest authorised service centre networks in India. Pilatus and Honda Aircraft support is growing but may require maintenance travel to Singapore or Japan for certain events. This is a practical cost that must be factored into the ownership model.</p>

<p>With those constraints in mind, here are the five light jets that best meet the demands of Indian operations in 2026.</p>

<hr class="border-slate-700/50 my-10">

<h2>1. Embraer Phenom 300E — Best Overall</h2>

<p>The Phenom 300E remains the most delivered light jet in the world for good reason. Powered by two Pratt &amp; Whitney Canada PW535E1 engines, it delivers a maximum range of <strong>2,010 nautical miles</strong> at a high-speed cruise of 453 knots — enough to fly Delhi to Dubai nonstop with comfortable reserves. The aircraft seats up to 10 passengers in a cabin that measures 5.1 feet wide and 4.9 feet tall, though a typical Indian business configuration accommodates 7–8 in genuine comfort.</p>

<p>The Garmin Prodigy Touch G3000-based flight deck is one of the most intuitive in the class, with synthetic vision, electronic charts, and full WAAS/LPV approach capability. The cabin standing height of approximately 1.5 metres (4 ft 11 in) is the best in the light jet category, making it genuinely usable for a full business day aloft.</p>

<p>For Indian operators, the Phenom 300E benefits from Embraer's growing service presence in India and a robust <strong>ESP Gold</strong> engine programme that provides cost certainty and protects residual value. The aircraft handles hot-and-high conditions well, with takeoff field length of approximately 3,138 feet at sea level ISA — though operators should always run performance calculations specific to their intended high-elevation airports.</p>

<p>The primary limitation is acquisition cost: new-delivery pricing in the $11–12 million range, with pre-owned examples from 2020–2023 trading between $8–10 million before Indian import duties.</p>

<hr class="border-slate-700/50 my-10">

<h2>2. Cessna Citation CJ4 Gen2 — Most Reliable</h2>

<p>The CJ4 Gen2 is the quiet workhorse of the light jet category. Its two Williams International FJ44-4A engines deliver a class-leading range of <strong>2,165 nautical miles</strong> at a long-range cruise of 415 knots, making it one of the longest-legged light jets available. This range comfortably covers any domestic Indian sector and reaches most Middle Eastern and Southeast Asian destinations.</p>

<p>The Gen2 upgrade brings the <strong>Garmin G3000 NXi</strong> flight deck with enhanced situational awareness, autothrottle, and reduced pilot workload. The cabin seats up to 10 passengers in a 4.8-foot-wide by 4.8-foot-tall cross-section, with a fully enclosed lavatory — a feature that matters more than most buyers initially expect on 2.5+ hour sectors.</p>

<p>Where the CJ4 Gen2 truly excels for Indian operators is <strong>parts and service availability</strong>. Cessna/Textron Aviation has the deepest service network in India of any business jet OEM, with authorised service facilities in multiple cities. This translates directly to reduced downtime, faster parts sourcing, and lower maintenance travel costs. The Williams FJ44-4A engine is enrolled in the <strong>TAP Blue</strong> programme, offering predictable maintenance costs.</p>

<p>The CJ4 Gen2 is single-pilot certified, though most Indian operators fly with two crew for the operational flexibility it provides. Acquisition cost runs in the $10–11 million range for new deliveries, with pre-owned examples offering compelling value.</p>

<hr class="border-slate-700/50 my-10">

<h2>3. Pilatus PC-24 — Short-Field King</h2>

<p>The PC-24 is in a category of its own. Built by Pilatus — the company behind the legendary PC-12 turboprop — the PC-24 was designed from the outset for operations that no other light jet can handle. Its defining capability is a <strong>takeoff distance of just 840 metres (2,756 feet)</strong>, combined with a robust landing gear and trailing-link main gear designed for unprepared and semi-prepared strips.</p>

<p>Powered by two Williams International FJ44-4A engines, the PC-24 offers a range of <strong>2,000 nautical miles</strong> at a high-speed cruise of 440 knots. The cabin is where the aircraft truly differentiates itself: a flat floor throughout, a cross-section of 5.6 feet wide and 5.1 feet tall, and a <strong>large cargo door</strong> (4.1 ft x 4.25 ft) on the aft fuselage that accepts standard LD3 containers. No other light jet offers this combination.</p>

<p>For Indian operators, the PC-24's short-field capability opens up airports that are simply inaccessible to competing light jets. Operations into airstrips at hill stations, industrial sites, and smaller Tier 2/Tier 3 cities become viable. The aircraft is also popular in the <strong>medevac role</strong>, where the large cargo door and flat floor allow rapid reconfiguration for stretcher loading.</p>

<p>The trade-off is a higher acquisition cost — approximately $12–13 million new — and a service network that, while growing in Asia, is not yet as deep as Cessna's or Embraer's in India. Operators should factor in periodic maintenance travel to the Pilatus centre in Stans, Switzerland, or authorised facilities in Singapore.</p>

<hr class="border-slate-700/50 my-10">

<h2>4. HondaJet Elite II — Most Efficient</h2>

<p>The HondaJet Elite II is the most fuel-efficient light jet in production. Its distinctive over-the-wing engine mount (OTWEM) design — placing the two <strong>GE Honda HF120</strong> engines above and forward of the wing — reduces cabin noise, eliminates the need for a traditional aft engine nacelle structure, and maximises interior volume relative to the external dimensions.</p>

<p>The numbers speak for themselves: a fuel burn of approximately <strong>130 US gallons per hour</strong> at cruise, roughly 15–20% lower than competing light jets. This translates to direct operating cost savings that compound significantly for high-utilisation operators flying 300+ hours annually. Range is <strong>1,437 nautical miles</strong> at a long-range cruise of 406 knots — sufficient for most domestic Indian sectors and short international legs to Colombo, Kathmandu, or Muscat.</p>

<p>The cabin seats up to 6 passengers in a cross-section of 5.0 feet wide and 4.8 feet tall. The Garmin G3000-based flight deck includes autothrottle and a full suite of modern avionics. The Elite II upgrade added range, noise reduction, and a galley with a coffee brewer — a small detail that matters on high-frequency short sectors.</p>

<p>The HondaJet is best suited for operators who fly <strong>frequent short sectors</strong> — Mumbai to Ahmedabad, Delhi to Chandigarh, Bengaluru to Chennai — where its fuel efficiency advantage compounds into genuine annual savings. For operators needing 2,000+ nm range or larger cabin volume, the Phenom 300E or CJ4 Gen2 are better choices. Honda Aircraft Company's service presence in India is still developing, with most major maintenance currently routed through Japan or the US.</p>

<hr class="border-slate-700/50 my-10">

<h2>5. Cessna Citation M2 Gen2 — Best Value Entry</h2>

<p>For operators entering private jet ownership for the first time, or for companies seeking a dedicated short-haul domestic shuttle, the Citation M2 Gen2 represents the most compelling value proposition in the light jet category. With a new-delivery acquisition cost of approximately <strong>$5 million</strong>, it sits at a price point that makes outright ownership viable for a broader range of Indian businesses and individuals.</p>

<p>Powered by two Williams International FJ44-1AP-21 engines, the M2 Gen2 delivers a range of <strong>1,550 nautical miles</strong> at a high-speed cruise of 404 knots. The cabin is compact but well-designed, seating up to 7 passengers in a cross-section of 4.8 feet wide and 4.75 feet tall. A refreshed interior with USB charging, LED lighting, and improved soundproofing makes the Gen2 a genuine upgrade over the original M2.</p>

<p>The aircraft is <strong>single-pilot certified</strong>, making it an excellent choice for owner-pilots or operations where crewing flexibility is important. The Garmin G3000 NXi flight deck provides the same modern interface found in larger and more expensive types. The Williams FJ44 engine family is one of the most reliable in aviation, and Cessna's unmatched service network in India ensures that parts and AOG support are readily accessible.</p>

<p>The M2 Gen2 is not the right choice for operators who need transcontinental range or a large stand-up cabin. It is, however, the right choice for operators who have been chartering 100–200 hours annually and want to step into ownership without the &#8377;80+ crore commitment that larger light jets demand. At this price point and operating cost, the break-even against charter typically falls between 200 and 250 hours annually.</p>

<hr class="border-slate-700/50 my-10">

<h2>Comparison Table</h2>

<div class="not-prose overflow-x-auto my-8 rounded-xl border border-white/10">
  <table class="w-full text-sm text-left">
    <thead><tr class="bg-white/5 border-b border-white/10">
      <th class="px-4 py-3 text-sky-400 font-semibold text-xs uppercase tracking-wider">Aircraft</th>
      <th class="px-4 py-3 text-sky-400 font-semibold text-xs uppercase tracking-wider">Range (nm)</th>
      <th class="px-4 py-3 text-sky-400 font-semibold text-xs uppercase tracking-wider">Cruise (kts)</th>
      <th class="px-4 py-3 text-sky-400 font-semibold text-xs uppercase tracking-wider">Cabin Width</th>
      <th class="px-4 py-3 text-sky-400 font-semibold text-xs uppercase tracking-wider">Best For</th>
    </tr></thead>
    <tbody class="divide-y divide-white/5">
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300 font-medium">Embraer Phenom 300E</td>
        <td class="px-4 py-3 text-slate-300">2,010</td>
        <td class="px-4 py-3 text-slate-300">453</td>
        <td class="px-4 py-3 text-slate-300">5.1 ft</td>
        <td class="px-4 py-3 text-slate-300">All-round performer, domestic &amp; regional international</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300 font-medium">Cessna Citation CJ4 Gen2</td>
        <td class="px-4 py-3 text-slate-300">2,165</td>
        <td class="px-4 py-3 text-slate-300">451</td>
        <td class="px-4 py-3 text-slate-300">4.8 ft</td>
        <td class="px-4 py-3 text-slate-300">Long range, best parts network in India</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300 font-medium">Pilatus PC-24</td>
        <td class="px-4 py-3 text-slate-300">2,000</td>
        <td class="px-4 py-3 text-slate-300">440</td>
        <td class="px-4 py-3 text-slate-300">5.6 ft</td>
        <td class="px-4 py-3 text-slate-300">Short-field ops, cargo, medevac versatility</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300 font-medium">HondaJet Elite II</td>
        <td class="px-4 py-3 text-slate-300">1,437</td>
        <td class="px-4 py-3 text-slate-300">422</td>
        <td class="px-4 py-3 text-slate-300">5.0 ft</td>
        <td class="px-4 py-3 text-slate-300">Fuel efficiency, high-frequency short sectors</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300 font-medium">Cessna Citation M2 Gen2</td>
        <td class="px-4 py-3 text-slate-300">1,550</td>
        <td class="px-4 py-3 text-slate-300">404</td>
        <td class="px-4 py-3 text-slate-300">4.8 ft</td>
        <td class="px-4 py-3 text-slate-300">Value entry, owner-pilots, domestic shuttle</td>
      </tr>
    </tbody>
  </table>
</div>

<hr class="border-slate-700/50 my-10">

<div class="not-prose border-l-4 border-sky-400 bg-sky-500/10 rounded-r-xl p-6 my-8">
  <div class="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-2">PDI Aviation Perspective</div>
  <p class="text-slate-300 leading-relaxed">Published performance figures are sea level, ISA conditions. Indian operators must evaluate every aircraft against real-world hot-and-high scenarios — Delhi at ISA+25, Udaipur at elevation with reduced runway length, monsoon-season density altitude at Tier 2 airports. At PDI Aviation, we run detailed performance analyses for every aircraft recommendation using actual airfield data, seasonal temperature profiles, and realistic payload configurations. The right light jet for your operation depends not just on range and speed, but on which airports you need to access, in which months, with how many passengers and bags. We help our clients model these scenarios precisely, ensuring that the aircraft they acquire performs on the routes that matter most to their business.</p>
</div>`,
      tags: ['light-jets', 'aircraft-review', 'india', 'fleet-planning']
    },
    {
      id: '3',
      title: 'DGCA Regulations Every Owner Should Know',
      slug: 'dgca-regulations-guide',
      excerpt: 'Navigating India\u2019s civil aviation regulatory framework is not optional \u2014 it is the foundation of safe, legal, and financially sound aircraft ownership.',
      category: 'Buying Guide',
      featured_image: '/images/blog/dgca-regulations-guide.jpg',
      publish_date: '2025-12-22',
      author_name: 'PDI Aviation',
      author_role: 'Aviation Advisory',
      reading_time_min: 10,
      content: `<p class="lead text-xl text-slate-300 leading-relaxed font-light">India's Directorate General of Civil Aviation governs every dimension of aircraft ownership — from the moment an aircraft is imported and registered to the day-to-day realities of airworthiness, crew licensing, and operational permits. For prospective and current owners, understanding these regulations is not a bureaucratic exercise. It is the difference between an aircraft that flies legally and one that sits grounded, accumulating costs and compliance risk.</p>

<div class="not-prose my-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">VT-</div>
    <div class="text-sm text-slate-400 mt-1">Indian Registration Prefix</div>
  </div>
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">3–6 Months</div>
    <div class="text-sm text-slate-400 mt-1">Type Certificate Validation</div>
  </div>
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">6–12 Months</div>
    <div class="text-sm text-slate-400 mt-1">Foreign Licence Conversion</div>
  </div>
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">51%</div>
    <div class="text-sm text-slate-400 mt-1">Indian Equity Requirement</div>
  </div>
</div>

<h2>Aircraft Registration in India</h2>

<p>Every aircraft operating on the Indian register carries the <strong>VT-</strong> nationality prefix, a convention dating back to the original allocation under the International Telecommunication Union. The legal framework for registration is established under the <strong>Aircraft Act, 1934</strong> and the <strong>Aircraft Rules, 1937</strong>, supplemented by DGCA's Civil Aviation Requirements (CARs) — the binding regulatory instructions that govern virtually every aspect of aviation activity in India.</p>

<p>To register an aircraft in India, the owner must satisfy specific nationality requirements. An individual owner must be an Indian citizen. A company must have its principal place of business in India and maintain a minimum of <strong>51% Indian equity</strong> in its share capital. Government entities and organisations approved by the Central Government are also eligible. These requirements have direct implications for foreign buyers: a non-resident individual cannot register an aircraft on the Indian register in their own name. The typical structure involves an Indian-incorporated company — often a special purpose vehicle — that meets the equity threshold.</p>

<p>The registration process itself involves submitting Form CA-1 to DGCA, along with proof of ownership (bill of sale, import documentation), evidence of deregistration from the previous State of Registry, insurance certificates, and the applicable fees. DGCA assigns the VT- registration marks upon approval, and the Certificate of Registration is issued. This certificate must be carried on board the aircraft at all times during flight.</p>

<div class="not-prose border-l-4 border-slate-600 bg-white/5 rounded-r-xl p-6 my-8">
  <p class="text-lg text-slate-300 italic leading-relaxed">"Registration is not merely administrative. It determines which State's regulations apply to the aircraft, which authority oversees its airworthiness, and which legal jurisdiction governs disputes."</p>
</div>

<p>For owners considering structures that involve leasing from foreign entities, the interplay between the registration requirements and the Cape Town Convention (to which India is a signatory) adds further complexity. The International Registry for aircraft objects provides a framework for securing creditor interests, but the Indian registration requirements remain paramount for operational authority.</p>

<hr class="border-slate-700/50 my-10">

<h2>Certificate of Airworthiness</h2>

<p>A Certificate of Airworthiness (CoA) is the document that permits an aircraft to fly. In India, DGCA issues the CoA only after satisfying itself that the aircraft conforms to its approved type design and is in a condition for safe operation. This is where many first-time owners encounter an important reality: <strong>DGCA does not automatically accept FAA or EASA type certificates.</strong></p>

<p>When an aircraft type is new to the Indian register — or when an individual aircraft is being imported — DGCA conducts its own <strong>Type Certificate Validation</strong>. This is not a rubber-stamp exercise. DGCA's Airworthiness Directorate reviews the original type certificate data, evaluates the aircraft's compliance with Indian environmental and operational requirements, and may impose additional conditions. This validation process typically takes <strong>3 to 6 months</strong>, though complex or uncommon types can take longer. Owners importing aircraft that are already type-validated in India (such as widely operated business jets from Bombardier, Dassault, Gulfstream, or Embraer) will find the process more streamlined, but not instantaneous.</p>

<p>Once issued, the CoA is not permanent. It requires <strong>annual renewal</strong>, contingent on the aircraft maintaining full compliance with its approved maintenance programme, all applicable Airworthiness Directives (ADs) issued by DGCA or the State of Design, and mandated Service Bulletins (SBs). The renewal inspection is conducted by a DGCA-approved organisation, and the results are submitted to DGCA for review before the renewed CoA is issued.</p>

<p>Failure to maintain the CoA — whether through lapsed inspections, non-compliance with an AD, or unresolved maintenance deferrals — renders the aircraft legally unairworthy. It cannot fly, and operating it in that condition exposes the owner and operator to severe regulatory and legal consequences.</p>

<hr class="border-slate-700/50 my-10">

<h2>Non-Scheduled Operator Permits (NSOP)</h2>

<p>If you intend to operate your aircraft for anything beyond purely private use — including charter, air taxi, or corporate transport of third parties — you will need a <strong>Non-Scheduled Operator Permit</strong>. The governing regulation is <strong>CAR Section 8, Series B, Part I</strong>, which establishes the requirements for non-scheduled air transport services.</p>

<p>The distinction between private and commercial operations is critical. A private operation is one where the aircraft is used exclusively by the owner (or the owner's employees and guests) with no charge or remuneration. The moment passengers or cargo are carried for hire or reward, the operation becomes commercial and falls under NSOP requirements.</p>

<p>Obtaining an NSOP requires the applicant to demonstrate:</p>

<ul>
  <li><strong>Minimum fleet size</strong> — DGCA has historically required a minimum number of aircraft, though this has been subject to revision in recent policy discussions</li>
  <li><strong>Crew training compliance</strong> — all flight crew must hold valid DGCA licences, type ratings, and have completed the operator's approved training programme</li>
  <li><strong>Operations Manual</strong> — a comprehensive document covering standard operating procedures, emergency procedures, crew duties, and route-specific requirements</li>
  <li><strong>Maintenance Control Manual</strong> — detailing the maintenance programme, approved maintenance organisations, and procedures for managing airworthiness</li>
  <li><strong>Insurance</strong> — adequate coverage for hull, third-party liability, and passenger liability as prescribed by the Carriage by Air Act, 1972</li>
  <li><strong>Accountable Manager</strong> — a designated individual who has corporate authority to ensure all operations and maintenance are financed and carried out to the required standards</li>
</ul>

<p>The NSOP application process involves document submission, DGCA review, inspection of facilities and aircraft, and a demonstration of operational readiness. The permit, once granted, is subject to ongoing compliance audits and surveillance by DGCA.</p>

<hr class="border-slate-700/50 my-10">

<h2>Crew Licensing and Medical Requirements</h2>

<p>Every pilot operating an Indian-registered aircraft must hold a valid <strong>DGCA-issued licence</strong> — or a DGCA-validated foreign licence — appropriate to the category and type of aircraft. For business aviation, this typically means a Commercial Pilot Licence (CPL) or Airline Transport Pilot Licence (ATPL) with the relevant type rating.</p>

<p>Foreign licence conversion is a significant consideration for owners who employ internationally experienced crews. The process involves verification of the original licence, assessment of the pilot's experience and qualifications against DGCA standards, and in many cases, additional examinations (including Indian Air Regulations and DGCA-specific subjects). The conversion timeline ranges from <strong>6 to 12 months</strong>, depending on the complexity of the case and DGCA processing times. Owners should plan crew transitions well in advance to avoid operational gaps.</p>

<p>Medical certification is equally non-negotiable. Pilots operating commercially must hold a <strong>Class 1 Medical Certificate</strong>, issued by a <strong>DGCA-approved Authorised Medical Examiner (AME)</strong>. Class 1 medicals are valid for 12 months (6 months for pilots over 40 in single-pilot commercial operations). Private pilots may operate with a Class 2 Medical, which has somewhat less stringent requirements but is still issued only by approved AMEs.</p>

<p>DGCA maintains a list of approved AMEs across India. Medical examinations must be conducted in accordance with DGCA's prescribed standards, and the results are submitted directly to DGCA for issuance of the medical certificate.</p>

<hr class="border-slate-700/50 my-10">

<h2>Import Duties and GST</h2>

<p>The fiscal burden of importing an aircraft into India is a material consideration in any acquisition. The applicable duties depend on the category of the aircraft and its intended use.</p>

<div class="not-prose overflow-x-auto my-8 rounded-xl border border-white/10">
  <table class="w-full text-sm text-left">
    <thead><tr class="bg-white/5 border-b border-white/10">
      <th class="px-4 py-3 text-sky-400 font-semibold text-xs uppercase tracking-wider">Import Category</th>
      <th class="px-4 py-3 text-sky-400 font-semibold text-xs uppercase tracking-wider">Basic Customs Duty</th>
      <th class="px-4 py-3 text-sky-400 font-semibold text-xs uppercase tracking-wider">IGST</th>
      <th class="px-4 py-3 text-sky-400 font-semibold text-xs uppercase tracking-wider">Notes</th>
    </tr></thead>
    <tbody class="divide-y divide-white/5">
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300">Aircraft (private use, unladen weight &gt; 2,000 kg)</td>
        <td class="px-4 py-3 text-slate-300">2.5%</td>
        <td class="px-4 py-3 text-slate-300">5%</td>
        <td class="px-4 py-3 text-slate-300">Applicable to most business jets</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300">Aircraft (private use, unladen weight &le; 2,000 kg)</td>
        <td class="px-4 py-3 text-slate-300">2.5% – 5%</td>
        <td class="px-4 py-3 text-slate-300">5%</td>
        <td class="px-4 py-3 text-slate-300">Includes turboprops and light jets</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300">Engines and parts</td>
        <td class="px-4 py-3 text-slate-300">Nil – 7.5%</td>
        <td class="px-4 py-3 text-slate-300">5% – 18%</td>
        <td class="px-4 py-3 text-slate-300">Varies by HS code; engines generally attract lower duty</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300">Ground support equipment</td>
        <td class="px-4 py-3 text-slate-300">Nil</td>
        <td class="px-4 py-3 text-slate-300">12% – 18%</td>
        <td class="px-4 py-3 text-slate-300">GPU, tow bars, specialised tools</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300">Simulators and training devices</td>
        <td class="px-4 py-3 text-slate-300">Nil</td>
        <td class="px-4 py-3 text-slate-300">18%</td>
        <td class="px-4 py-3 text-slate-300">Full flight simulators for approved training organisations</td>
      </tr>
    </tbody>
  </table>
</div>

<p>These rates are subject to change with each Union Budget and through notifications by the Central Board of Indirect Taxes and Customs (CBIC). Additionally, the effective duty may be influenced by bilateral agreements, end-use conditions, and whether the aircraft is being imported on a temporary or permanent basis. Temporary imports (for demonstration, maintenance, or transit) may qualify for reduced or suspended duties under specific customs provisions.</p>

<p>Owners should also account for <strong>Customs Documentation and Assessment</strong> charges, as well as potential anti-dumping or safeguard duties that may apply in specific circumstances. A qualified customs broker with aviation experience is essential for navigating the tariff schedule accurately.</p>

<hr class="border-slate-700/50 my-10">

<h2>Airspace and Overflight Permissions</h2>

<p>Operating in Indian airspace requires compliance with the regulatory framework administered by the <strong>Airports Authority of India (AAI)</strong> and, for military-controlled airspace, the <strong>Indian Air Force (IAF)</strong>.</p>

<p>All flights must file a flight plan through the <strong>NAVIK</strong> system (formerly AFTN-based), India's integrated flight plan processing platform. This applies to both domestic and international operations. For international flights, diplomatic clearances and overflight permissions must be obtained in advance through the Ministry of External Affairs and the relevant foreign authorities. Indian airspace contains numerous restricted and prohibited areas — many associated with military installations, nuclear facilities, and sensitive border zones — and flight planning must account for these restrictions.</p>

<p>Private operators should be aware that certain airports and airfields in India have specific slot allocation requirements, noise restrictions, and curfew hours. Major metros like Mumbai (VABB) and Delhi (VIDP) have heavily congested airspace and slot constraints that can affect scheduling flexibility for business aviation operations. Secondary airports and greenfield developments — such as Navi Mumbai (NMIA), Noida International (Jewar), and expanded facilities at Pune and Goa — are expected to ease some of these constraints over time.</p>

<hr class="border-slate-700/50 my-10">

<h2>Recent Regulatory Developments</h2>

<p>DGCA has been undertaking a significant modernisation effort in recent years, with several developments that directly affect aircraft owners and operators:</p>

<ul>
  <li><strong>P-CAS (Paperless-Civil Aviation Safety) Programme:</strong> DGCA is progressively digitising its approval, certification, and surveillance processes. This includes online applications for licences, permits, and approvals — reducing the reliance on physical document submission and in-person visits to DGCA offices. While the transition is ongoing, owners and operators should ensure their documentation workflows are compatible with the digital platforms.</li>
  <li><strong>National Civil Aviation Policy (NCAP) Updates:</strong> The Ministry of Civil Aviation has been working on revisions to the NCAP framework, including provisions aimed at streamlining NSOP issuance and reducing regulatory burden on smaller operators. Draft proposals have included simplified procedures for operators with modern, well-maintained fleets.</li>
  <li><strong>Fractional Ownership Framework:</strong> Recognising the growing interest in shared aircraft ownership models, DGCA and MoCA have been developing a regulatory framework for fractional ownership. This would establish clear rules for shared ownership structures, operational responsibilities, and maintenance oversight — a model that has been well-established in the United States and Europe but has lacked formal regulatory recognition in India.</li>
  <li><strong>Drone and Urban Air Mobility Regulations:</strong> While not directly related to traditional business aviation, DGCA's evolving regulations for unmanned aircraft systems (UAS) and advanced air mobility (AAM) signal the regulator's broader approach to modernising Indian airspace management.</li>
</ul>

<div class="not-prose border-l-4 border-sky-400 bg-sky-500/10 rounded-r-xl p-6 my-8">
  <div class="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-2">PDI Aviation Perspective</div>
  <p class="text-slate-300 leading-relaxed">India's regulatory environment for aircraft ownership is comprehensive, and compliance demands sustained attention from the point of acquisition through every year of operation. The most common pitfalls we observe — delayed type certificate validation, underestimated licence conversion timelines, and incomplete NSOP documentation — are all preventable with proper planning. At PDI Aviation, we guide owners through every regulatory milestone, from structuring the ownership entity and managing the import process to maintaining continuous airworthiness and NSOP compliance. The regulatory landscape is evolving in a direction that favours prepared, professionally managed operations. Engage with the process early, invest in qualified advisory support, and treat compliance as an operational asset rather than a burden.</p>
</div>`,
      tags: ['regulation', 'dgca', 'india', 'compliance', 'registration']
    },
    {
      id: '4',
      title: 'The Rise of Sustainable Aviation Fuel in 2026',
      slug: 'sustainable-aviation-fuel',
      excerpt: 'SAF is no longer a future aspiration \u2014 it is a present reality reshaping the economics, regulation, and public perception of private aviation.',
      category: 'Industry News',
      featured_image: '/images/blog/sustainable-aviation-fuel.jpg',
      publish_date: '2025-12-05',
      author_name: 'PDI Aviation',
      author_role: 'Aviation Advisory',
      reading_time_min: 5,
      content: `<p class="lead text-xl text-slate-300 leading-relaxed font-light">Sustainable Aviation Fuel has moved from laboratory curiosity to operational reality. For private aviation operators and owners — particularly those with international itineraries — SAF is no longer a question of whether, but when and how it integrates into your operations. The answers vary significantly depending on where you fly, what you fly, and how you report your environmental footprint.</p>

<div class="not-prose my-10 grid grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">Up to 80%</div>
    <div class="text-sm text-slate-400 mt-1">Lifecycle Carbon Reduction</div>
  </div>
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">80%+</div>
    <div class="text-sm text-slate-400 mt-1">SAF from HEFA Pathway</div>
  </div>
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">2–4x</div>
    <div class="text-sm text-slate-400 mt-1">Price Premium (Europe)</div>
  </div>
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">2027–30</div>
    <div class="text-sm text-slate-400 mt-1">India SAF Mandate Target</div>
  </div>
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">Minimal</div>
    <div class="text-sm text-slate-400 mt-1">India FBO Availability</div>
  </div>
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">60–80%</div>
    <div class="text-sm text-slate-400 mt-1">HEFA Emission Reduction</div>
  </div>
</div>

<h2>What SAF Actually Is</h2>

<p>Sustainable Aviation Fuel is not a single product. It is a category of jet fuel produced from non-petroleum feedstocks through several distinct production pathways, each with different feedstock inputs, carbon reduction profiles, and commercial maturity. All approved SAF pathways produce fuel that is <strong>drop-in compatible</strong> with conventional Jet-A/Jet A-1, meaning it can be used in existing engines, fuel systems, and infrastructure without modification — typically blended up to 50% with conventional jet fuel under current ASTM D7566 certification.</p>

<p>The principal production pathways are:</p>

<ul>
  <li><strong>HEFA (Hydroprocessed Esters and Fatty Acids):</strong> The most commercially mature pathway, accounting for over 80% of current global SAF production. Feedstocks include used cooking oil, animal fats, and other waste lipids. HEFA plants are operational in Europe, North America, and Singapore.</li>
  <li><strong>Fischer-Tropsch (FT):</strong> Converts municipal solid waste, agricultural residues, or biomass into synthetic gas, then into liquid hydrocarbons. Fewer commercial-scale plants exist, but the pathway handles a wider range of waste feedstocks.</li>
  <li><strong>Alcohol-to-Jet (AtJ):</strong> Converts ethanol or isobutanol — derived from agricultural waste, cellulosic biomass, or industrial off-gases — into jet fuel. This pathway is particularly relevant for India given the country's substantial ethanol production infrastructure.</li>
  <li><strong>Power-to-Liquid (PtL):</strong> Uses renewable electricity to produce hydrogen via electrolysis, which is then combined with captured CO2 to synthesise liquid hydrocarbons. PtL offers near-zero lifecycle emissions but remains the most expensive pathway and is not yet at commercial scale.</li>
</ul>

<hr class="border-slate-700/50 my-10">

<h2>Carbon Reduction Potential</h2>

<p>The headline figure — up to 80% lifecycle carbon reduction — requires important qualification. Lifecycle emissions are measured on a well-to-wake basis, encompassing feedstock cultivation or collection, processing, transport, and combustion. The actual reduction depends heavily on the production pathway and the specific feedstock used.</p>

<p><strong>HEFA from waste oils typically achieves 60–80% reduction</strong> compared to conventional jet fuel. Fischer-Tropsch from municipal waste ranges from 50–90% depending on the waste composition and process energy source. Alcohol-to-Jet varies widely based on the ethanol feedstock. Power-to-Liquid, when powered entirely by renewable electricity and using direct air capture of CO2, can approach 90%+ reduction — but this pathway is not yet commercially available at scale.</p>

<p>For operators, the practical impact depends on the blend ratio. A 10% SAF blend delivers a modest but verifiable reduction — roughly 6–8% on a lifecycle basis. A 50% blend (the current maximum under ASTM certification) delivers proportionally greater reductions. These figures matter for operators who report emissions under corporate ESG frameworks or who face carbon-related surcharges in regulated airspace.</p>

<hr class="border-slate-700/50 my-10">

<h2>Availability and Cost in 2026</h2>

<p>SAF availability remains unevenly distributed across the world, and pricing continues to reflect the early stage of production scale-up.</p>

<div class="not-prose overflow-x-auto my-8 rounded-xl border border-white/10">
  <table class="w-full text-sm text-left">
    <thead><tr class="bg-white/5 border-b border-white/10">
      <th class="px-4 py-3 text-sky-400 font-semibold text-xs uppercase tracking-wider">Region</th>
      <th class="px-4 py-3 text-sky-400 font-semibold text-xs uppercase tracking-wider">SAF Availability (FBO)</th>
      <th class="px-4 py-3 text-sky-400 font-semibold text-xs uppercase tracking-wider">Price Premium</th>
      <th class="px-4 py-3 text-sky-400 font-semibold text-xs uppercase tracking-wider">Trajectory</th>
    </tr></thead>
    <tbody class="divide-y divide-white/5">
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300">Western Europe</td>
        <td class="px-4 py-3 text-slate-300">Good — multiple FBOs at major hubs</td>
        <td class="px-4 py-3 text-slate-300">2–4x conventional Jet-A</td>
        <td class="px-4 py-3 text-slate-300">Regulatory mandates active (EU ReFuelEU); supply expanding</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300">North America</td>
        <td class="px-4 py-3 text-slate-300">Growing — concentrated at West Coast and major metros</td>
        <td class="px-4 py-3 text-slate-300">1.5–3x conventional Jet-A</td>
        <td class="px-4 py-3 text-slate-300">IRA tax incentives driving investment; LCFS credits in California</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300">Middle East</td>
        <td class="px-4 py-3 text-slate-300">Limited — select FBOs in UAE</td>
        <td class="px-4 py-3 text-slate-300">2–3x conventional Jet-A</td>
        <td class="px-4 py-3 text-slate-300">Abu Dhabi and Dubai investing in production capacity</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300">India &amp; South Asia</td>
        <td class="px-4 py-3 text-slate-300">Minimal — no commercial FBO supply chain for private aviation</td>
        <td class="px-4 py-3 text-slate-300">N/A</td>
        <td class="px-4 py-3 text-slate-300">National policy under development; blending mandate targets 2027–2030</td>
      </tr>
    </tbody>
  </table>
</div>

<p>The price premium remains the single largest barrier to widespread adoption. SAF production is scaling, but current global output remains a fraction of total jet fuel consumption. As production capacity grows — particularly through new HEFA refineries and emerging AtJ facilities — the premium is expected to narrow, but it is unlikely to reach parity with conventional jet fuel within this decade.</p>

<hr class="border-slate-700/50 my-10">

<h2>India's SAF Policy Landscape</h2>

<p>India's approach to SAF is still in its formative stages. The <strong>Ministry of Petroleum and Natural Gas</strong>, in coordination with the <strong>Ministry of Civil Aviation (MoCA)</strong>, has been developing a national SAF policy framework. Discussion drafts have referenced blending mandate targets in the 2027–2030 timeframe, but as of late 2025, <strong>no mandatory SAF blending requirement is in force</strong> for Indian aviation.</p>

<p>India's strength lies in its existing biofuel infrastructure. The country has the world's third-largest ethanol production capacity, driven by the successful Ethanol Blended Petrol (EBP) programme for road transport. The Alcohol-to-Jet pathway represents a natural extension of this infrastructure into aviation. Indian Oil Corporation and other public sector refineries have conducted SAF production trials, and the government's interest in extending its biofuel success story to aviation is clear.</p>

<p>However, the gap between policy ambition and operational reality remains wide. There is currently no commercial SAF supply chain serving private aviation FBOs in India. Operators based in India who wish to use SAF must uplift it at international destinations where it is available — primarily in Western Europe and select North American locations.</p>

<hr class="border-slate-700/50 my-10">

<h2>What Operators Should Do Now</h2>

<p>Even without a domestic SAF supply chain, Indian private aviation operators can take meaningful steps today:</p>

<ol>
  <li><strong>Measure your carbon footprint.</strong> Establish a baseline using recognised methodologies such as ICAO's Carbon Emissions Calculator or IATA's CO2 Connect. Accurate measurement is the prerequisite for any credible sustainability strategy.</li>
  <li><strong>Consider voluntary carbon offsets.</strong> While offsets are not a substitute for emission reductions, verified offset programmes (Gold Standard, Verra VCS) provide an interim mechanism for demonstrating environmental responsibility while SAF supply develops.</li>
  <li><strong>Engage international FBOs on SAF availability.</strong> If your operations regularly touch European or North American airports, enquire about SAF uplift options during your next fuel stop. Several FBO networks — including Signature Aviation and Jetex — now offer SAF at select locations. Even a partial SAF uplift demonstrates commitment and builds operational familiarity.</li>
  <li><strong>Include SAF in your ESG reporting.</strong> For corporate owners, documenting your SAF strategy — even if current usage is limited — signals to stakeholders that aviation sustainability is on the agenda. Many ESG frameworks now include scope 3 transportation emissions, and a credible SAF roadmap strengthens your reporting narrative.</li>
</ol>

<div class="not-prose border-l-4 border-sky-400 bg-sky-500/10 rounded-r-xl p-6 my-8">
  <div class="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-2">PDI Aviation Perspective</div>
  <p class="text-slate-300 leading-relaxed">SAF is moving from optional to expected — and eventually to mandatory. For Indian operators, the domestic supply chain is not yet in place, but the direction of policy is unmistakable. We advise our clients to treat SAF readiness as part of their long-term operational planning: establish your emissions baseline, build SAF uplift into international trip planning where available, and monitor India's evolving blending mandate closely. The operators who engage early will be better positioned when regulatory requirements arrive — and will benefit from the reputational advantage of leading rather than following on aviation sustainability.</p>
</div>`,
      tags: ['sustainability', 'fuel', 'SAF', 'environment', 'india']
    },
    {
      id: '5',
      title: 'eVTOL and Urban Air Mobility: What Indian Operators Need to Know',
      slug: 'evtol-urban-air-mobility',
      excerpt: 'Electric vertical takeoff and landing aircraft are moving from prototype to certification \u2014 here is what the emerging eVTOL landscape means for Indian private aviation.',
      category: 'Technology',
      featured_image: '/images/blog/evtol-urban-air-mobility.jpg',
      publish_date: '2025-11-20',
      author_name: 'PDI Aviation',
      author_role: 'Aviation Advisory',
      reading_time_min: 7,
      content: `<p class="lead text-xl text-slate-300 leading-relaxed font-light">The aviation industry is approaching what may be its most significant technological inflection point since the advent of the jet engine. Electric vertical takeoff and landing aircraft — eVTOLs — are progressing from experimental prototypes to certification-ready platforms, with several manufacturers targeting commercial operations between 2025 and 2027. For Indian private aviation operators, the question is no longer whether this technology will arrive, but when it will become operationally relevant and how to position for it.</p>

<div class="not-prose my-10 grid grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">150-300 km</div>
    <div class="text-sm text-slate-400 mt-1">Typical Range</div>
  </div>
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">4-6 Pax</div>
    <div class="text-sm text-slate-400 mt-1">Typical Capacity</div>
  </div>
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">250-320 km/h</div>
    <div class="text-sm text-slate-400 mt-1">Cruise Speed</div>
  </div>
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">2025-2027</div>
    <div class="text-sm text-slate-400 mt-1">First Commercial Ops (Global)</div>
  </div>
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">$2-4M</div>
    <div class="text-sm text-slate-400 mt-1">Projected Per-Unit Cost</div>
  </div>
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">80-90%</div>
    <div class="text-sm text-slate-400 mt-1">Lower Op Cost vs Helicopter</div>
  </div>
</div>

<h2>The Current State of eVTOL</h2>

<p>After nearly a decade of concept development and billions of dollars in investment, the eVTOL industry is entering its most consequential phase: certification. Several leading manufacturers are now deep in the type certification process with aviation regulators, and the gap between demonstration flights and revenue service is narrowing rapidly. Here is where the key players stand.</p>

<p><strong>Joby Aviation</strong> is widely regarded as the frontrunner. Its S4 aircraft — a five-seat (one pilot, four passengers) tilting-propeller design — has completed over 1,000 test flights. Joby is pursuing FAA Type Certification, which the company expects to secure in 2025. With a range exceeding 150 miles on a single charge and cruise speeds around 200 mph, the S4 is positioned for intercity and airport-to-city routes. Joby has secured a partnership with Delta Air Lines for operations at New York-area airports and has a manufacturing facility in Marina, California scaling toward serial production.</p>

<p><strong>Archer Aviation</strong> is developing the Midnight, a five-seat eVTOL optimised for high-frequency urban routes. With a range of approximately 60 miles, Midnight is designed for rapid turnaround — short hops with quick recharging between flights. Archer is pursuing FAA certification in parallel with a commercial partnership with United Airlines. The company has broken ground on a manufacturing facility in Covington, Georgia, with plans for high-volume production.</p>

<p><strong>Lilium</strong> takes a different technical approach with the Lilium Jet, a seven-seat aircraft powered by 30 ducted electric fans integrated into its canard wings. This configuration gives it a range exceeding 186 miles and a more jet-like flight profile. Lilium is pursuing certification through the European Union Aviation Safety Agency (EASA), and the larger cabin makes it a strong candidate for premium charter-style services. The company has faced financial headwinds but continues to progress through its certification programme.</p>

<p><strong>Volocopter</strong> rounds out the leading contenders with the VoloCity, a two-seat multicopter-style air taxi designed for short urban hops of approximately 35 kilometres. Volocopter has conducted public demonstration flights in several cities and is focused on the urban shuttle market — think airport terminal to city centre in under 15 minutes. The shorter range and smaller capacity make it the most taxi-like proposition in the market.</p>

<hr class="border-slate-700/50 my-10">

<h2>Infrastructure Requirements</h2>

<p>Aircraft are only half the equation. eVTOL operations require an entirely new category of ground infrastructure: <strong>vertiports</strong>. These are not simply helipads with a charging cable. A functional vertiport requires high-capacity electrical charging systems (fast-charge capabilities demanding significant power grid allocation), passenger processing facilities, weather monitoring equipment, and carefully designed approach and departure flight paths that avoid noise-sensitive areas.</p>

<p>Two models are emerging globally. The first is <strong>airport-integrated vertiports</strong> — dedicated eVTOL pads at existing commercial or private airports, leveraging existing airspace management, security infrastructure, and passenger facilities. The second is <strong>standalone urban vertiports</strong> — purpose-built facilities on rooftops or ground-level sites within city centres, which offer the true "last mile" value proposition but face significant real estate, zoning, and airspace challenges.</p>

<p>For India, infrastructure presents both a challenge and an opportunity. The challenge is clear: power grid reliability for fast-charging, urban land availability, and the need for entirely new airspace management frameworks. But India also benefits from building on a relatively blank slate. Unlike mature Western markets that must retrofit eVTOL infrastructure into congested airspace and built environments, Indian cities — particularly those undergoing rapid development — can plan vertiport infrastructure into new urban projects from the outset.</p>

<p>Mumbai, Delhi-NCR, Bengaluru, and Hyderabad are the most logical early markets, given their combination of severe ground traffic congestion, high-net-worth populations, existing aviation ecosystems, and the sheer time-value proposition of aerial urban mobility.</p>

<hr class="border-slate-700/50 my-10">

<h2>Regulatory Landscape in India</h2>

<p>India does not yet have a formal eVTOL certification framework, and it would be premature to expect one in the near term. However, the regulatory groundwork is being laid. The DGCA has developed a progressively sophisticated drone regulatory ecosystem through the Digital Sky platform, including type-certified drone categories, remote pilot licensing, and operational permissions for increasingly complex unmanned operations.</p>

<p>The Ministry of Civil Aviation has signalled interest in Advanced Air Mobility (AAM) as a category, and India has participated in international working groups discussing eVTOL regulation. The likely path forward is that India will adopt a framework substantially aligned with the FAA and EASA certification standards once those are finalised through actual type certifications of production aircraft.</p>

<p>This is a pragmatic approach. Developing an indigenous certification framework from scratch would be enormously expensive and time-consuming, with no guarantee of a better outcome than adapting the work already being done by regulators with deeper technical resources. Indian operators should expect that DGCA will move methodically — validating foreign type certificates against Indian operating conditions, establishing pilot training and licensing requirements, and developing airspace integration protocols specific to Indian conditions.</p>

<hr class="border-slate-700/50 my-10">

<h2>Timeline Expectations for India</h2>

<p>Operators seeking honest timelines should calibrate expectations carefully. Even in the most optimistic scenario, the global eVTOL timeline looks like this:</p>

<ul>
  <li><strong>2025-2026:</strong> First type certifications granted (likely Joby in the US). Initial limited commercial operations in controlled environments — think specific airport-to-city routes in a handful of US and European cities.</li>
  <li><strong>2026-2028:</strong> Gradual expansion of commercial networks in early-adopter markets. Middle East operators (particularly UAE) likely among the first outside the US and Europe.</li>
  <li><strong>2028-2032:</strong> The realistic window for Indian commercial eVTOL operations. This accounts for regulatory framework development (2-3 years after FAA/EASA certification sets precedent), infrastructure buildout, operator training pipeline development, and public acceptance cycles.</li>
</ul>

<p>A 3-5 year lag behind global leaders is neither pessimistic nor unusual — it reflects the legitimate time required for regulatory adaptation, infrastructure construction, and the development of an operational ecosystem. Operators who are told otherwise should scrutinise the claims.</p>

<div class="not-prose border-l-4 border-slate-600 bg-white/5 rounded-r-xl p-6 my-8">
  <p class="text-lg text-slate-300 italic leading-relaxed">"The biggest risk in the eVTOL space is not that the technology will fail — it is that inflated timelines will create premature investment decisions. The aircraft will work. The question is when the full ecosystem — regulation, infrastructure, trained crews, public trust — will be ready to support commercial operations at scale."</p>
</div>

<hr class="border-slate-700/50 my-10">

<h2>Implications for Private Aviation Operators</h2>

<p>For operators and owners currently in the Indian private aviation ecosystem, eVTOL should be understood as a <strong>complementary technology, not a disruptive replacement</strong>. The practical implications vary significantly by current operating profile:</p>

<p><strong>Fixed-wing jet operators</strong> face minimal direct disruption. With ranges of 150-300 kilometres, eVTOLs cannot substitute for even the shortest fixed-wing charter routes in India (Delhi to Jaipur is approximately 260 km, and that is a short hop). Where eVTOL becomes relevant is as a <strong>first-mile and last-mile connector</strong> — transporting passengers from a city-centre vertiport to the airport where their jet is waiting, eliminating the ground transfer that often takes longer than the flight itself.</p>

<p><strong>Helicopter charter operators</strong> face the most direct competitive pressure. The core eVTOL value proposition — urban point-to-point flights at dramatically lower operating costs with significantly less noise — maps almost exactly onto the current helicopter charter market. Operators running helicopter shuttle services (airport transfers, intracity hops) should actively monitor eVTOL developments and consider how their business model will need to adapt.</p>

<p><strong>Charter fleet operators</strong> should evaluate eVTOL as a fleet diversification opportunity in the medium term. Adding eVTOL aircraft to a charter fleet could enable operators to offer seamless door-to-door service: eVTOL from the client's office to the airport, fixed-wing jet to the destination city, eVTOL from the destination airport to the final location. This integrated service model could command significant pricing premiums.</p>

<p><strong>Infrastructure investors</strong> should note that vertiport development may represent the most immediate commercial opportunity in the Indian eVTOL ecosystem. The aircraft will be manufactured by global OEMs, but vertiport infrastructure must be built locally — and early movers in securing strategic urban locations will hold considerable competitive advantage.</p>

<div class="not-prose border-l-4 border-sky-400 bg-sky-500/10 rounded-r-xl p-6 my-8">
  <div class="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-2">PDI Aviation Perspective</div>
  <p class="text-slate-300 leading-relaxed">We advise our clients to stay informed on eVTOL developments without making premature capital commitments. The technology is real and the trajectory is credible, but the operational ecosystem in India is still years from maturity. For now, the practical steps are clear: monitor certification milestones (particularly Joby and Archer with the FAA), track DGCA policy signals on Advanced Air Mobility, and evaluate whether your current operations — particularly helicopter services or urban connectivity routes — sit in the path of eventual eVTOL competition. When the Indian regulatory framework crystallises, operators who have done their homework will be positioned to move decisively. Those who have not will be playing catch-up in what is likely to become a rapidly consolidating market.</p>
</div>`,
      tags: ['evtol', 'urban-air-mobility', 'technology', 'india', 'electric-aviation']
    },
    {
      id: '6',
      title: 'Charter vs Ownership: A Cost Analysis',
      slug: 'charter-vs-ownership',
      excerpt: 'The decision between chartering and owning an aircraft is fundamentally a financial one \u2014 including the costs that sellers rarely discuss.',
      category: 'Ownership Tips',
      featured_image: '/images/blog/charter-vs-ownership.png',
      publish_date: '2025-11-08',
      author_name: 'PDI Aviation',
      author_role: 'Aviation Advisory',
      reading_time_min: 9,
      content: `<p class="lead text-xl text-slate-300 leading-relaxed font-light">Every year, dozens of Indian entrepreneurs and business families reach the point where chartering feels expensive enough to justify buying their own aircraft. The logic seems straightforward: if you are already spending crores on charter, why not own the asset? But the gap between perceived cost and actual cost of ownership is where most miscalculations happen — and where clear-eyed financial analysis matters more than salesmanship.</p>

<div class="not-prose my-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
  <div class="bg-sky-500/10 border border-sky-500/20 rounded-xl p-6">
    <div class="text-lg font-bold text-sky-400 mb-3">Ownership at 150 hrs/yr</div>
    <div class="text-3xl font-bold text-white">&#8377;3.2-5.6 Cr Total</div>
    <div class="text-sm text-slate-400 mt-1">&#8377;2.1-3.7 lakh per flight hour (all-in)</div>
  </div>
  <div class="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6">
    <div class="text-lg font-bold text-emerald-400 mb-3">Charter at 150 hrs/yr</div>
    <div class="text-3xl font-bold text-white">&#8377;2.85-3.3 Cr Total</div>
    <div class="text-sm text-slate-400 mt-1">&#8377;1.9-2.2 lakh per flight hour</div>
  </div>
</div>

<p>Those numbers deserve attention. At 150 flight hours per year — a utilisation level that covers most personal and light business use — charter is not merely competitive with ownership. On a pure cost-per-hour basis, it is often cheaper. Understanding why requires a detailed breakdown of what ownership actually costs in the Indian operating environment.</p>

<h2>The Baseline Scenario</h2>

<p>To make this analysis concrete, we will model a specific and common scenario: an Indian high-net-worth individual or family flying 100-150 hours per year, considering a <strong>pre-owned Embraer Phenom 300E or Cessna Citation CJ4</strong> — both popular light jets in the Indian market. The aircraft is for personal and family travel, not placed on a charter programme to generate offsetting revenue. This is the most common ownership profile we see among first-time buyers in India, and it is also the profile where the charter-vs-ownership math is most frequently misjudged.</p>

<hr class="border-slate-700/50 my-10">

<h2>Fixed Annual Costs of Ownership</h2>

<p>These costs are incurred whether the aircraft flies one hour or one thousand hours. They are the baseline financial commitment of having an aircraft on your NSOP certificate.</p>

<div class="not-prose overflow-x-auto my-8 rounded-xl border border-white/10">
  <table class="w-full text-sm text-left">
    <thead><tr class="bg-white/5 border-b border-white/10">
      <th class="px-4 py-3 text-sky-400 font-semibold text-xs uppercase tracking-wider">Cost Item</th>
      <th class="px-4 py-3 text-sky-400 font-semibold text-xs uppercase tracking-wider">Annual Range</th>
      <th class="px-4 py-3 text-sky-400 font-semibold text-xs uppercase tracking-wider">Notes</th>
    </tr></thead>
    <tbody class="divide-y divide-white/5">
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300">Crew Salaries (2 pilots)</td>
        <td class="px-4 py-3 text-slate-300">&#8377;1.2-1.8 Cr</td>
        <td class="px-4 py-3 text-slate-400">Captain + First Officer, including benefits, recurrent training, type ratings</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300">Hangarage</td>
        <td class="px-4 py-3 text-slate-300">&#8377;20-40 L</td>
        <td class="px-4 py-3 text-slate-400">Base airport dependent; Mumbai/Delhi significantly higher</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300">Insurance (Hull + Liability)</td>
        <td class="px-4 py-3 text-slate-300">&#8377;50-90 L</td>
        <td class="px-4 py-3 text-slate-400">Hull value dependent; typically 1.5-2.5% of insured value</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300">Navigation Subscriptions</td>
        <td class="px-4 py-3 text-slate-300">&#8377;4-8 L</td>
        <td class="px-4 py-3 text-slate-400">Charts, databases, weather services, datalink</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300">Scheduled Maintenance</td>
        <td class="px-4 py-3 text-slate-300">&#8377;30-60 L</td>
        <td class="px-4 py-3 text-slate-400">Calendar-driven inspections regardless of utilisation</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300">Management / NSOP Fees</td>
        <td class="px-4 py-3 text-slate-300">&#8377;25-50 L</td>
        <td class="px-4 py-3 text-slate-400">NSOP operator oversight, compliance, regulatory liaison</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300">Depreciation</td>
        <td class="px-4 py-3 text-slate-300">&#8377;60-120 L</td>
        <td class="px-4 py-3 text-slate-400">Book depreciation; actual market depreciation may differ significantly</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors bg-sky-500/5">
        <td class="px-4 py-3 text-white font-semibold">Total Fixed Costs</td>
        <td class="px-4 py-3 text-sky-400 font-semibold">&#8377;2.0-3.7 Cr</td>
        <td class="px-4 py-3 text-slate-400">Incurred whether the aircraft flies or not</td>
      </tr>
    </tbody>
  </table>
</div>

<p>The crew line item alone often shocks prospective owners. Two qualified pilots on a light jet — with type ratings, recurrent simulator training, medicals, and reasonable compensation — represent a commitment north of a crore annually. This is non-negotiable: DGCA regulations require two pilots for most NSOP operations, and experienced light jet pilots in India command competitive salaries given the relatively small talent pool.</p>

<hr class="border-slate-700/50 my-10">

<h2>Variable Costs Per Flight Hour</h2>

<p>These costs scale with utilisation. They are what it costs each time the aircraft actually flies.</p>

<div class="not-prose overflow-x-auto my-8 rounded-xl border border-white/10">
  <table class="w-full text-sm text-left">
    <thead><tr class="bg-white/5 border-b border-white/10">
      <th class="px-4 py-3 text-sky-400 font-semibold text-xs uppercase tracking-wider">Cost Item</th>
      <th class="px-4 py-3 text-sky-400 font-semibold text-xs uppercase tracking-wider">Per Hour Range</th>
      <th class="px-4 py-3 text-sky-400 font-semibold text-xs uppercase tracking-wider">Notes</th>
    </tr></thead>
    <tbody class="divide-y divide-white/5">
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300">Fuel (Jet A-1, India)</td>
        <td class="px-4 py-3 text-slate-300">&#8377;55,000-75,000</td>
        <td class="px-4 py-3 text-slate-400">~90 USG/hr burn; Indian ATF prices among the highest globally</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300">Engine Reserves (Enrolled)</td>
        <td class="px-4 py-3 text-slate-300">&#8377;12,000-20,000</td>
        <td class="px-4 py-3 text-slate-400">Hourly accrual for future engine overhaul; enrolled programme rates</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300">Landing / Handling / Parking</td>
        <td class="px-4 py-3 text-slate-300">&#8377;8,000-20,000</td>
        <td class="px-4 py-3 text-slate-400">Varies dramatically by airport; metro airports significantly higher</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors">
        <td class="px-4 py-3 text-slate-300">Crew Per Diem</td>
        <td class="px-4 py-3 text-slate-300">&#8377;5,000-10,000</td>
        <td class="px-4 py-3 text-slate-400">Overnight stays, meals, ground transport for crew</td>
      </tr>
      <tr class="hover:bg-white/5 transition-colors bg-sky-500/5">
        <td class="px-4 py-3 text-white font-semibold">Total Variable Costs</td>
        <td class="px-4 py-3 text-sky-400 font-semibold">&#8377;80,000-1,25,000/hr</td>
        <td class="px-4 py-3 text-slate-400">Fuel is the dominant variable; Indian ATF pricing is a structural headwind</td>
      </tr>
    </tbody>
  </table>
</div>

<p>Fuel deserves particular attention in the Indian context. Aviation turbine fuel in India carries one of the highest tax burdens globally, with state-level VAT varying from 1% to 30% depending on jurisdiction. This means the same aircraft burns the same amount of fuel per hour, but the fuel cost in India can be 30-50% higher than in the Middle East or the United States. It is a structural cost disadvantage that no amount of operational efficiency can fully offset.</p>

<hr class="border-slate-700/50 my-10">

<h2>Total Ownership Cost at 150 Hours</h2>

<p>Combining fixed and variable costs at 150 flight hours per year gives us the complete ownership picture:</p>

<div class="not-prose my-10 grid grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">&#8377;2.0-3.7 Cr</div>
    <div class="text-sm text-slate-400 mt-1">Fixed Annual Costs</div>
  </div>
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">&#8377;1.2-1.9 Cr</div>
    <div class="text-sm text-slate-400 mt-1">Variable Costs (150 hrs)</div>
  </div>
  <div class="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
    <div class="text-2xl font-bold text-sky-400">&#8377;3.2-5.6 Cr</div>
    <div class="text-sm text-slate-400 mt-1">Total Annual Cost</div>
  </div>
</div>

<p>Dividing total cost by hours flown yields an <strong>effective cost of &#8377;2.1-3.7 lakh per flight hour</strong>. This is the number that matters — not the charter rate you are comparing against, but the true all-in hourly cost of operating your own aircraft.</p>

<div class="not-prose border-l-4 border-slate-600 bg-white/5 rounded-r-xl p-6 my-8">
  <p class="text-lg text-slate-300 italic leading-relaxed">"The most common reaction when we present prospective owners with a comprehensive cost analysis is genuine surprise. Most have been comparing charter invoices against fuel and maintenance alone — missing the &#8377;2+ crore annual fixed overhead that exists whether they fly or not. The aircraft sitting in the hangar is not free. It is, in fact, extraordinarily expensive."</p>
</div>

<hr class="border-slate-700/50 my-10">

<h2>The Charter Alternative</h2>

<p>Charter rates for a Phenom 300-class light jet in India currently range from <strong>&#8377;1.8-2.5 lakh per flight hour</strong> on an ad hoc basis. This rate is all-inclusive: fuel, crew, insurance, landing fees, and handling are bundled into the quoted price. There are no hidden fixed costs billed separately.</p>

<p>For operators willing to commit to volume, <strong>block charter programmes</strong> offer discounts of 5-15% against ad hoc rates, bringing the effective rate to approximately &#8377;1.55-2.25 lakh per hour depending on the programme structure and commitment level.</p>

<p>At 150 hours per year, the mathematics are straightforward:</p>

<div class="not-prose my-10 grid grid-cols-1 lg:grid-cols-2 gap-4">
  <div class="bg-white/5 border border-white/10 rounded-xl p-6">
    <div class="text-lg font-bold text-slate-300 mb-3">Ad Hoc Charter (150 hrs)</div>
    <div class="text-3xl font-bold text-white">&#8377;2.7-3.75 Cr</div>
    <div class="text-sm text-slate-400 mt-1">At &#8377;1.8-2.5 lakh/hr, no commitment required</div>
  </div>
  <div class="bg-white/5 border border-white/10 rounded-xl p-6">
    <div class="text-lg font-bold text-slate-300 mb-3">Block Programme (150 hrs)</div>
    <div class="text-3xl font-bold text-white">&#8377;2.3-3.4 Cr</div>
    <div class="text-sm text-slate-400 mt-1">5-15% discount with volume commitment</div>
  </div>
</div>

<p>On a pure cost basis, charter is competitive with ownership at 150 hours — and block programmes can be meaningfully cheaper. The charter operator absorbs all the fixed costs (crew, hangar, insurance, maintenance, depreciation) and amortises them across multiple clients and higher total utilisation. That structural efficiency is passed through to the charter rate.</p>

<hr class="border-slate-700/50 my-10">

<h2>When Ownership Makes Financial Sense</h2>

<p>The cost crossover point — where ownership becomes cheaper per hour than charter — typically falls in the <strong>300-400 flight hour per year</strong> range. At that utilisation level, the fixed costs are spread across enough hours that the effective per-hour rate drops below charter pricing. Few personal operators reach this threshold; it is more common among corporate flight departments serving multiple executives or companies with operations across several Indian cities.</p>

<p>Beyond the pure crossover math, ownership makes financial sense in several specific scenarios:</p>

<ul>
  <li><strong>Routing not served by charter:</strong> If you regularly fly routes where charter aircraft are not positioned (tier-2 and tier-3 city pairs), repositioning fees can make charter uneconomical. Ownership eliminates the positioning premium.</li>
  <li><strong>Scheduling flexibility has quantifiable business value:</strong> If being able to depart within 2 hours (rather than 6-12 hours for charter) directly enables business outcomes — closing deals, site inspections, crisis response — the scheduling premium of ownership has tangible financial justification.</li>
  <li><strong>Aircraft placed on a charter programme:</strong> Owners who place their aircraft on a managed charter programme when not using it can offset 30-50% of fixed costs. This fundamentally changes the ownership equation, though it introduces wear, scheduling conflicts, and the need for a professional management structure.</li>
  <li><strong>Non-financial benefits are genuinely valued:</strong> Consistent cabin configuration, onboard security for sensitive conversations, the ability to carry specific equipment, and the intangible pride of ownership are real considerations — provided they are acknowledged as lifestyle choices rather than financial optimisations.</li>
</ul>

<hr class="border-slate-700/50 my-10">

<h2>The Underappreciated Case for Charter</h2>

<p>The financial case for charter at moderate utilisation levels is strong, but the operational advantages are equally significant and often underweighted in the decision process:</p>

<ul>
  <li><strong>Zero maintenance liability:</strong> Engine overhauls, avionics upgrades, airworthiness directives, unscheduled maintenance events — these are the charter operator's problem, not yours. A single unscheduled engine event can cost &#8377;2-5 Cr on a light jet.</li>
  <li><strong>No crew management:</strong> Pilot recruitment, retention, training, scheduling, HR compliance, and the interpersonal dynamics of managing a two-person flight department disappear entirely.</li>
  <li><strong>No regulatory burden:</strong> NSOP compliance, DGCA audits, documentation, safety management systems — the regulatory overhead of aircraft ownership in India is substantial and growing.</li>
  <li><strong>Fleet flexibility:</strong> A light jet for a short domestic hop, a mid-size for a longer route, a large cabin for international travel — charter lets you match the aircraft to the mission. Ownership locks you into one type.</li>
  <li><strong>No residual value risk:</strong> Aircraft depreciation is unpredictable and can be severe. The owner bears the risk that the aircraft may be worth substantially less at sale than projected. Charter clients bear no asset risk whatsoever.</li>
  <li><strong>Capital efficiency:</strong> The &#8377;25-35 Cr acquisition cost of a pre-owned Phenom 300E or CJ4 is capital deployed into a depreciating asset. That same capital invested in your core business or financial markets generates returns rather than incurring carrying costs.</li>
</ul>

<hr class="border-slate-700/50 my-10">

<h2>Making the Decision</h2>

<p>The charter-vs-ownership decision is not a spreadsheet exercise alone — but it must start with one. Too many ownership decisions in India are made on aspiration and rough mental arithmetic, only for the financial reality to become apparent 18 months later when the annual operating bill arrives. Equally, some operators who would genuinely benefit from ownership remain on charter because they have not modelled the full picture including charter's own inefficiencies (positioning fees, availability gaps, cabin inconsistency).</p>

<p>The honest approach is to treat this as a 24-month analytical exercise before committing capital.</p>

<div class="not-prose border-l-4 border-sky-400 bg-sky-500/10 rounded-r-xl p-6 my-8">
  <div class="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-2">PDI Aviation Perspective</div>
  <p class="text-slate-300 leading-relaxed">We recommend every prospective owner complete what we call a <strong>24-month utilisation model</strong> before signing a purchase agreement. The process is straightforward but requires discipline. First, track your actual flight hours over 24 months — not projected, not aspirational, but actual utilisation on charter. Second, add 20% to that number to account for the "ownership effect" (owners fly more because the marginal cost feels lower). Third, build a comprehensive all-in cost-per-hour model using the framework in this article, and compare it honestly against your charter spend. If the ownership cost per hour is within 20-25% of charter and the non-financial benefits — scheduling control, routing flexibility, cabin consistency, privacy — are genuinely important to your operating profile, then ownership deserves serious consideration. If the gap is wider, charter remains the more rational choice, and there is no shame in that conclusion. The goal is not to own an aircraft. The goal is to fly efficiently, and ownership is only one way to achieve that.</p>
</div>`,
      tags: ['ownership', 'charter', 'cost-analysis', 'india', 'economics']
    }
  ];
  const isLoading = false;

  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const heroTitleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
      if (heroTitleRef.current) {
        const rect = heroTitleRef.current.getBoundingClientRect();
        setShowStickyBar(rect.bottom < 0);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const post = ALL_POSTS.find(p => p.slug === slug);
  const relatedPosts = post ? ALL_POSTS.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3) : [];

  const shareUrl = window.location.href;
  
  const handleShare = (platform) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post?.title || '')}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    };
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-white mb-4">Article not found</h2>
        <Link to={createPageUrl('Blog')}>
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>
    );
  }

  const categoryColors = {
    'Industry News': 'bg-blue-500/20 text-blue-300',
    'Aircraft Reviews': 'bg-purple-500/20 text-purple-300',
    'Market Analysis': 'bg-emerald-500/20 text-emerald-300',
    'Buying Guide': 'bg-amber-500/20 text-amber-300',
    'Ownership Tips': 'bg-rose-500/20 text-rose-300',
    'Technology': 'bg-indigo-500/20 text-indigo-300'
  };



  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero — sticky behind content */}
      <div className="sticky top-0 h-[50vh] lg:h-[60vh] min-h-[400px] z-0">
        <img
          src={post.featured_image || 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=2000&q=80'}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

        {/* Back button — top-left overlay */}
        <Link
          to={createPageUrl('Blog')}
          className="absolute top-4 left-4 lg:top-6 lg:left-6 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-sm text-slate-200 hover:text-white hover:bg-black/60 text-sm font-medium transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-12">
          <div className="max-w-4xl mx-auto">
            <Badge className={`${categoryColors[post.category] || 'bg-slate-500/20 text-slate-300'} mb-4`}>
              {post.category}
            </Badge>
            
            <motion.h1
              ref={heroTitleRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl lg:text-5xl font-bold text-white mb-4"
            >
              {post.title}
            </motion.h1>
            
            <div className="flex flex-wrap items-center gap-4 text-slate-300">
              <div className="flex items-center gap-2">
                {post.author_avatar ? (
                  <img src={post.author_avatar} alt={post.author_name} className="w-10 h-10 rounded-full" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-slate-600 flex items-center justify-center">
                    <User className="w-5 h-5 text-slate-300" />
                  </div>
                )}
                <div>
                  <div className="font-medium text-white">{post.author_name}</div>
                  <div className="text-sm text-slate-400">{post.author_role}</div>
                </div>
              </div>
              <span className="w-px h-6 bg-slate-600" />
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {post.publish_date ? format(new Date(post.publish_date), 'MMMM d, yyyy') : 'Draft'}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {post.reading_time_min || 5} min read
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Compact sticky header — appears after scrolling past hero title */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-14 lg:top-16 left-0 right-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-3 h-12">
              <Link
                to={createPageUrl('Blog')}
                className="flex-shrink-0 inline-flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Blog</span>
              </Link>
              <span className="w-px h-5 bg-slate-700 flex-shrink-0" />
              <h2 className="text-sm font-semibold text-white truncate">{post.title}</h2>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content — scrolls over hero */}
      <div className="relative z-10 bg-slate-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-12">
          {/* Article */}
          <article className="flex-1 min-w-0">
            <div 
              className="prose prose-lg prose-slate prose-invert max-w-none prose-headings:font-bold prose-a:text-sky-400 prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-slate-800">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-slate-300 border-slate-700">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Share */}
            <div className="mt-8 pt-8 border-t border-slate-800">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share this article
                </span>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" onClick={() => handleShare('facebook')}>
                    <Facebook className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={() => handleShare('twitter')}>
                    <Twitter className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={() => handleShare('linkedin')}>
                    <Linkedin className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="outline" onClick={copyLink}>
                    <Link2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </article>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Related Articles</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map(related => (
                <Link
                  key={related.id}
                  to={createPageUrl('BlogPost') + `?slug=${related.slug}`}
                  className="group"
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-sky-500/40 hover:shadow-lg hover:shadow-sky-500/5 transition-all">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={related.featured_image || 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=800&q=80'}
                        alt={related.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white group-hover:text-sky-400 transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-sm text-slate-400 mt-2 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {related.reading_time_min || 5} min read
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
      </div>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/25 flex items-center justify-center transition-colors"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}