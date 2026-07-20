/* ==========================================================================
   MAIN.JS
   Portfolio data (projects, logos, testimonials, services, process steps),
   the inline icon system, and small standalone widgets (resume download,
   WhatsApp tooltip). This file also boots up every other module in the
   correct order once the DOM is ready.
   ========================================================================== */

/* ============ PROJECT DATA ============ */
const PROJECTS = [
  {id:1,title:"The Social Bling",category:"Website Design",year:"2026",role:"UI/UX Designer",duration:"4 months",tools:"Figma, Next.js, Tailwind",img:"https://picsum.photos/seed/tsb1/900/1200",problem:"A digital marketing agency needed a multi-page site that felt premium and Gen-Z, not templated.",research:"Audited competitor agency sites and mapped an editorial blog system with SEO structure.",final:"Shipped a fully responsive multi-page static site with a dynamic blog, structured schema and an animated navbar."},
  {id:2,title:"Shobha Motive Digital Hub",category:"Vibe Coding",year:"2026",role:"Product Designer",duration:"6 weeks",tools:"Figma, React, n8n",img:"https://picsum.photos/seed/smh2/1200/900",problem:"Seven separate product category pages made it hard for customers to browse everything in one place.",research:"Mapped a fetch-based aggregation system across categories with region-aware pricing.",final:"Built a dynamic digital products aggregator page with INR/USD override support."},
  {id:3,title:"Alcaline",category:"UI Design",year:"2025",role:"UI/UX Designer",duration:"3 weeks",tools:"Figma",img:"https://picsum.photos/seed/alc3/900/1300",problem:"A software agency needed a dark, premium website UI that signalled technical credibility.",research:"Studied dark-mode SaaS agencies to define a restrained, high-contrast system.",final:"Delivered a full case study across nine slides covering the home, services and work pages."},
  {id:4,title:"Baatien",category:"Product Design",year:"2025",role:"Product Designer",duration:"5 weeks",tools:"Figma, User Research",img:"https://picsum.photos/seed/baa4/1000/900",problem:"Dating apps in the Indian market rarely account for family-oriented matchmaking cues.",research:"Screen-by-screen competitive analysis of regional dating and matchmaking apps.",final:"A 35-screen concept spanning onboarding, matching and chat, presented as a full case study."},
  {id:5,title:"Bloom & Bliss",category:"Branding",year:"2025",role:"Brand & UI Designer",duration:"2 weeks",tools:"Figma, Illustrator",img:"https://picsum.photos/seed/bnb5/900/1100",problem:"An early plant e-commerce concept needed a cohesive identity before the full store existed.",research:"Explored botanical, calm color systems suited to a plant-care audience.",final:"Delivered a homepage concept and identity system, with a roadmap for closing remaining gaps."},
  {id:6,title:"Smitam Lifestyle",category:"Graphic Design",year:"2025",role:"Graphic Designer",duration:"1 month",tools:"Canva, Illustrator",img:"https://picsum.photos/seed/smt6/1100/1400",problem:"A sustainable handcrafted goods brand needed a month of cohesive Instagram content.",research:"Studied slow-fashion and handcraft brand feeds for visual pacing.",final:"A 30-day content calendar delivered as a structured, multi-sheet plan."},
  {id:7,title:"Virtualyyst Design System",category:"UI Design",year:"2024",role:"UI/UX Designer",duration:"Ongoing",tools:"Figma",img:"https://picsum.photos/seed/vrt7/1000/1000",problem:"Design-to-dev handoff was slow with inconsistent components across the site.",research:"Audited every existing screen to catalogue redundant patterns.",final:"Built a reusable component library that now drives web and marketing surfaces."},
  {id:8,title:"Shobha Motive Identity",category:"Branding",year:"2024",role:"Brand Designer",duration:"2 weeks",tools:"Illustrator, Figma",img:"https://picsum.photos/seed/smo8/900/1200",problem:"The studio needed its own identity to feel credible to international clients.",research:"Benchmarked boutique AI-automation studios and premium design consultancies.",final:"A full identity system including logo, palette, and templated deliverables."},
  {id:9,title:"WhatsApp Desktop Redesign",category:"UI Design",year:"2024",role:"UI Designer",duration:"1 week",tools:"Figma",img:"https://picsum.photos/seed/wad9/1300/900",problem:"WhatsApp Desktop's information density felt dated next to modern messaging apps.",research:"Comparative teardown of Telegram, Slack and Discord desktop layouts.",final:"A concept redesign — my first UI project, exploring a cleaner three-pane layout."},
  {id:10,title:"Landing Page Sprint",category:"Landing Pages",year:"2025",role:"UI Designer",duration:"1 week",tools:"Figma, Webflow",img:"https://picsum.photos/seed/lps10/900/1300",problem:"A client needed a high-converting landing page in under a week.",research:"Reviewed conversion patterns across SaaS launch pages.",final:"A single-page launch site with a clear above-the-fold value proposition."},
  {id:11,title:"Creative Canvas Social Kit",category:"Graphic Design",year:"2024",role:"Graphic Designer",duration:"3 weeks",tools:"Photoshop, Canva",img:"https://picsum.photos/seed/ccs11/1100/1300",problem:"An SMB client needed a full social creative kit without a dedicated in-house designer.",research:"Analyzed the client's existing audience and top-performing posts.",final:"A modular creative kit covering posts, stories and promotional assets."},
  {id:12,title:"AI Product Prototype",category:"Vibe Coding",year:"2026",role:"Product Designer",duration:"2 weeks",tools:"Figma, Claude, React",img:"https://picsum.photos/seed/aip12/1000/1250",problem:"A founder wanted to validate an AI product idea before committing engineering time.",research:"Prompted and iterated on functional prototypes to pressure-test the concept.",final:"A working AI-assisted prototype used to secure early user feedback."},
  {id:13,title:"Netflix India — Homepage Redesign",category:"UI Design",year:"2025",role:"UI/UX Designer",duration:"2 weeks",tools:"Figma",img:"assets/images/img-003-9a2ac34266.jpg",problem:"Netflix India's homepage didn't reflect regional content discovery patterns for Indian audiences.",research:"Studied browsing behaviour and content categorisation across regional OTT platforms.",final:"A homepage redesign concept prioritising regional content rows and clearer navigation, presented as a full case study."},
  {id:14,title:"Key Screens & User Flow",category:"Product Design",year:"2025",role:"UI/UX Designer",duration:"2 weeks",tools:"Figma",img:"assets/images/img-004-2561435160.jpg",problem:"A services-based product needed its key screens and primary user flow mapped before development began.",research:"Flow-mapped welcome, sign-up and service-selection journeys against similar service marketplaces.",final:"A key-screens deck covering onboarding, sign-up and service flows, ready for developer handoff."},
  {id:15,title:"MixCommerce — Sign In Experience",category:"Product Design",year:"2025",role:"UX Designer",duration:"1 week",tools:"Figma",img:"assets/images/img-005-9301cbedcc.jpg",problem:"MixCommerce's sign-in flow was confusing new retail customers and hurting conversion.",research:"Reimagined the sign-in experience by auditing drop-off points against modern commerce dashboards.",final:"A cleaner, reimagined sign-in flow that reduced friction for new users, shipped as a UX case study."},
  {id:16,title:"Cloud Raptor — Website Redesign",category:"Website Design",year:"2025",role:"UI/UX Designer",duration:"3 weeks",tools:"Figma",img:"assets/images/img-006-44326f8f15.jpg",problem:"A global tech consultancy's website no longer matched its brand positioning or conversion goals.",research:"A full brand-aligned audit mapping tone, colour and messaging gaps against competitor consultancies.",final:"A complete brand-aligned website redesign with sharper clarity and a stronger, more confident identity."},
  {id:17,title:"Fashion App — List Experience",category:"UI Design",year:"2025",role:"UI Designer",duration:"1 week",tools:"Figma",img:"assets/images/img-007-a64d5f0098.jpg",problem:"Stakeholders couldn't agree on whether the app should lead with promotions or product discovery.",research:"Designed and tested two parallel concepts — a promotion-led list and a discovery-led list.",final:"Both concepts were approved, giving the client flexibility to A/B test promotion vs. discovery on launch."},
  {id:18,title:"Collage — One Page Website",category:"Website Design",year:"2025",role:"UI Designer",duration:"1 week",tools:"Figma, Webflow",img:"assets/images/img-008-fac430dcaa.jpg",problem:"A content creator needed a single scrollable site to showcase work without a full multi-page build.",research:"Reviewed one-page portfolio structures that keep visitors engaged without overwhelming them.",final:"A single-page, collage-style website designed to make the most of a visitor's time and attention."},
  {id:19,title:"Modern Glass Group — Signup & Login",category:"UI Design",year:"2024",role:"UI/UX Designer",duration:"2 weeks",tools:"Figma",img:"assets/images/img-009-723b23ff28.jpg",problem:"Desktop sign-up and login felt disconnected from the brand's premium, modern identity.",research:"A UI/UX design and research approach focused on removing friction from desktop onboarding.",final:"A modern, glass-inspired signup and login flow designed for a seamless desktop onboarding experience."}
];
const CATEGORIES = ["All","Vibe Coding","UI Design","Website Design","Graphic Design","Branding","Product Design","Landing Pages"];

/* ============ CLIENT LOGOS (trusted-by marquee) ============ */
/* ---- logos.json equivalent ---- */
const LOGOS = [
"assets/icons/logo-001-5bcc234094.png",
"assets/icons/logo-002-0c8679b46e.png",
"assets/icons/logo-003-d7348b1dad.png",
"assets/icons/logo-004-8731f4c12b.png",
"assets/icons/logo-005-1ad018441a.png",
"assets/icons/logo-006-37f1c49083.png",
"assets/icons/logo-007-10a21688d9.png",
"assets/icons/logo-008-4a6415a92d.png",
"assets/icons/logo-009-cee49ae480.png",
"assets/icons/logo-010-d8d0540c14.png",
"assets/icons/logo-011-f087e00499.png",
"assets/icons/logo-012-33b991a2fd.png",
"assets/icons/logo-013-0059374562.png",
"assets/icons/logo-014-f23482a59c.png",
"assets/icons/logo-015-766e5a0b56.png",
"assets/icons/logo-016-16eb2e1981.png",
"assets/icons/logo-017-0bd1362bdf.png",
"assets/icons/logo-018-7454a5a8b7.png",
"assets/icons/logo-019-57f13f9260.png",
"assets/icons/logo-020-23080c5746.png",
"assets/icons/logo-021-7d23101f9b.png",
"assets/icons/logo-022-197c031ba3.png",
"assets/icons/logo-023-939bd74b83.png",
"assets/icons/logo-024-f6dd262f6e.png",
"assets/icons/logo-025-0169976ce9.png",
"assets/icons/logo-026-0573b9133e.png",
"assets/icons/logo-027-ed9cb15a08.png",
"assets/icons/logo-028-21193dac5a.png",
"assets/icons/logo-029-43c11bdf73.png",
"assets/icons/logo-030-cd63ef23ae.png",
"assets/icons/logo-031-f4c2968a79.png",
"assets/icons/logo-032-52c5cb16b8.png",
"assets/icons/logo-033-8e7e5300a6.png",
"assets/icons/logo-034-8ff94bf69c.png",
"assets/icons/logo-035-685210311c.png"
];

/* ============ TESTIMONIALS DATA ============ */
/* ---- testimonials.json equivalent ---- */
const TESTIMONIALS = [
  {name:"Devashish Kumar",role:"Senior Engineer",company:"Motherson Technology Services",text:"I had the pleasure of working with Bittu Rai, and I can confidently say he is an exceptional graphic designer. His creativity, attention to detail, and ability to translate ideas into visually stunning designs are truly impressive. He consistently delivers high-quality work, meets deadlines, and brings fresh, innovative perspectives to every project.",rating:5},
  {name:"Aman Sharma",role:"Author of ERASED",company:"",text:"Bittu is one of those rare creatives who just gets it. Every project with him felt effortless because he understands the vision before it is fully explained. Every colour, every layout and every detail has purpose. I highly recommend him.",rating:5},
  {name:"Mubaraka Kachwalla",role:"HR Executive",company:"Bombay Tools Center",text:"Bittu is incredibly talented. His creativity, attention to detail and ability to turn ideas into reality are outstanding. He is always open to feedback and constantly works to improve. Any team would be lucky to have him.",rating:5},
  {name:"Manish Kumar Sahu",role:"Java Software Engineer",company:"",text:"Bittu Rai is an exceptional Graphic Designer with a keen eye for detail and creativity. His ability to merge design with functionality makes him stand out. Highly recommended.",rating:5},
  {name:"Annanya Singh",role:"Graphic & UI Designer",company:"Visuals, Content & Social Media Management",text:"Appreciate your dedication towards your work. Keep it up.",rating:5},
  {name:"Aditya Aryan",role:"Software Developer",company:"",text:"I had the privilege of knowing Bittu Rai during my time at Lingaya's Vidyapeeth. He was always approachable, supportive and willing to share knowledge. His dedication and professionalism continue to inspire me.",rating:5}
];

/* ============ SERVICES DATA ============ */
/* ============================================================
   SERVICES SECTION
   ============================================================ */
const SERVICES = [
  { id:'uiux', icon:'layout', title:'UI/UX Designing',
    desc:'Modern web & mobile experiences designed to be beautiful, functional and user-focused.',
    count:'8+ Projects', world:'uiux', modal:'behance' },
  { id:'webdev', icon:'code', title:'Website Development',
    desc:'Fast, responsive and modern websites shipped using the latest technologies.',
    count:'3+ Sites Shipped', world:'webdev', modal:'showcase' },
  { id:'vibe', icon:'cpu', title:'Vibe Coding',
    desc:'AI-powered products, MVPs and creative coding builds — designed, shipped and live.',
    count:'3 Live Builds', world:'vibe', modal:'vibecards' },
  { id:'graphic', icon:'image', title:'Graphic Designing',
    desc:'Posters, social media, marketing creatives, print design and visual communication.',
    count:'15+ Designs', world:'graphic', modal:'gallery' },
  { id:'brand', icon:'award', title:'Brand Designing',
    desc:'Logo design, brand identity, packaging, brand guidelines and visual systems.',
    count:'3+ Brands', world:'brand', modal:'gallery' }
];

const BEHANCE_PROJECTS = [
  'https://www.behance.net/embed/project/251712263?ilo0=1',
  'https://www.behance.net/embed/project/251751393?ilo0=1',
  'https://www.behance.net/embed/project/251750253?ilo0=1',
  'https://www.behance.net/embed/project/251749097?ilo0=1',
  'https://www.behance.net/embed/project/251730679?ilo0=1',
  'https://www.behance.net/embed/project/251753023?ilo0=1',
  'https://www.behance.net/embed/project/251696497?ilo0=1',
  'https://www.behance.net/embed/project/248206611?ilo0=1'
];

/* Reusable — add more entries here any time */
const WEBDEV_PROJECTS = [
  { name:'Cloud Raptor', desc:'Marketing site for a global cloud & digital-transformation consultancy.', tech:['Webflow','GSAP','SEO'], url:'https://cloud-raptor.com/', live:true, gradient:'linear-gradient(135deg,#304E3B,#F37B3A)', img:'assets/images/img-006-44326f8f15.jpg' },
  { name:'Shobha Motive', desc:'Brand & product site for an AI automation and web studio.', tech:['React','Tailwind','Framer Motion'], url:'https://shobhamotive.in/', live:true, gradient:'linear-gradient(135deg,#F2A623,#304E3B)', img:'assets/images/img-010-2db376d35e.jpg' },
  { name:'HireKra', desc:'Talent acquisition platform connecting top talent with organizations across India, UAE and the United States.', tech:['HTML','CSS','JavaScript','Netlify'], url:'https://hirekra.netlify.app/', live:true, gradient:'linear-gradient(135deg,#0A1628,#1565C0)', img:'assets/images/hirekra-preview.jpg' },
  { name:'Lakshanam', desc:'Business advisory & consultancy website for a founder-led firm offering new venture advisory and startup support services.', tech:['HTML','CSS','JavaScript','Netlify'], url:'https://luminous-sunshine-85e1de.netlify.app/', live:true, gradient:'linear-gradient(135deg,#1a237e,#F2A623)', img:'assets/images/lakshanam-preview.jpg' }
];

/* 3 separate vibe-coded builds */
const VIBE_PROJECTS = [
  { name:'Social Shobha', tagline:'Stop guessing your content. Start growing with AI.', desc:'AI content engine that plans, writes and schedules social posts.', url:'https://social-shobha.lovable.app/', gradient:'linear-gradient(135deg,#304E3B,#F2A623)', img:'assets/images/img-011-11638bde48.jpg' },
  { name:'ShobhaFlow', tagline:'Run your business, beautifully.', desc:'All-in-one shop management system for small retail teams.', url:'https://bizkit-app.lovable.app/', gradient:'linear-gradient(135deg,#F37B3A,#111111)', img:'assets/images/img-012-7474e56d87.jpg' },
  { name:'Shobha Motive Song', tagline:'Daily devotional messages.', desc:'A gentle daily-message product, vibe-coded end to end.', url:'https://bhakti-vachan-shakti.lovable.app/', gradient:'linear-gradient(135deg,#111111,#F2A623)', img:'assets/images/img-013-7b4984451b.jpg' }
];

/* Placeholder galleries — swap these src URLs for your own work anytime */
const GRAPHIC_GALLERY = [
  'assets/images/img-014-a9b7de4754.jpg',
  'assets/images/img-015-fbeccefc64.jpg',
  'assets/images/img-016-1008a55aaf.jpg',
  'assets/images/img-017-584ca27eae.jpg',
  'assets/images/img-018-363db1ebb7.jpg',
  'assets/images/img-019-37823d1d8b.jpg',
  'assets/images/img-020-008266139e.jpg',
  'assets/images/img-021-c41daa09aa.jpg',
  'assets/images/img-022-2aa01d9a39.jpg',
  'assets/images/img-023-ee5fff31a1.jpg',
  'assets/images/img-024-56f2e131a8.jpg',
  'assets/images/img-025-bf32367c06.jpg',
  'assets/images/img-026-63b838755e.jpg',
  'assets/images/img-027-c08029998f.jpg',
  'assets/images/img-028-f6b3f55d1b.jpg',
  'assets/images/img-029-068786a41d.jpg',
  'assets/images/img-030-6217608e48.jpg',
  'assets/images/img-031-3e20930095.jpg',
  'assets/images/img-032-ef0df28754.jpg',
  'assets/images/img-033-b7e6b84490.jpg',
  'assets/images/img-034-8a1cb39bdb.jpg',
  'assets/images/img-035-ffabb6910b.jpg',
  'assets/images/img-036-f5fba455ae.jpg'
];
const BRAND_GALLERY = [
  'assets/images/img-037-8d11117336.jpg',
  'assets/images/img-038-3dd6fe21fb.jpg',
  'assets/images/img-039-4e0ee4d729.jpg',
  'assets/images/img-040-da11f1f50c.jpg',
  'assets/images/img-041-9aa647ce6e.jpg',
  'assets/images/img-042-c7d49aa689.jpg'
];

/* ============ PROCESS STEPS DATA ============ */

const PROCESS = [
  {name:"Discover",desc:"Understand the goal, users and constraints.",icon:"search"},
  {name:"Research",desc:"Competitive audits, interviews, data.",icon:"bar-chart-2"},
  {name:"Wireframe",desc:"Low-fidelity structure and flows.",icon:"edit-3"},
  {name:"Prototype",desc:"Clickable flows for early validation.",icon:"layers"},
  {name:"Design",desc:"High-fidelity UI and design systems.",icon:"palette"},
  {name:"Testing",desc:"Usability passes and iteration.",icon:"check-circle"},
  {name:"Delivery",desc:"Developer handoff and QA.",icon:"send"}
];


/* ============ INLINE ICON SYSTEM ============ */
/* ---- inline lucide-style icon set ---- */
const ICONS = {
  mail:'<path d="M4 4h16v16H4z" opacity="0"/><path d="M22 6.5 12 13 2 6.5"/><rect x="2" y="4" width="20" height="16" rx="2"/>',
  'message-circle':'<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
  download:'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  'map-pin':'<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  phone:'<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>',
  'calendar-check':'<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="m9 16 2 2 4-4"/>',
  check:'<polyline points="20 6 9 17 4 12"/>',
  linkedin:'<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
  star:'<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  search:'<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  'bar-chart-2':'<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  'edit-3':'<path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>',
  layers:'<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  palette:'<path d="M12 2a10 10 0 1 0 0 20c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.4-.3-.4-.5-.9-.5-1.4 0-1.1.9-2 2-2h2.3c2.3 0 4.2-1.9 4.2-4.2C21.5 6.1 17.2 2 12 2z"/><circle cx="6.5" cy="11.5" r="1.3"/><circle cx="9.5" cy="7.5" r="1.3"/><circle cx="14.5" cy="7.5" r="1.3"/><circle cx="17.5" cy="11.5" r="1.3"/>',
  'check-circle':'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  send:'<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
  zap:'<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  'shopping-bag':'<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  'arrow-up-right':'<line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/>',
  code:'<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  x:'<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  'chevron-left':'<polyline points="15 18 9 12 15 6"/>',
  'chevron-right':'<polyline points="9 18 15 12 9 6"/>',
  'arrow-down':'<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>',
  layout:'<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/>',
  image:'<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>',
  award:'<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>',
  cpu:'<rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/>',
  'external-link':'<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  maximize:'<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>',
  clock:'<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'
};
function renderIcons(){
  document.querySelectorAll('.icon[data-icon]').forEach(el=>{
    const key = el.dataset.icon;
    if(ICONS[key]) el.innerHTML = `<svg viewBox="0 0 24 24">${ICONS[key]}</svg>`;
  });
}
renderIcons();

/* ============ RESUME DOWNLOAD ============ */
document.querySelectorAll('.js-download-resume').forEach(btn => {
  btn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'assets/documents/Bittu_Rai_Resume.pdf';
    link.download = 'Bittu_Rai_UIUX_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
});

/* ============ WHATSAPP FLOAT TOOLTIP (mobile tap) ============ */
const waFloat = document.getElementById('wa-float');
waFloat.addEventListener('touchstart', () => waFloat.classList.toggle('tt-show'));

/* ============ APP BOOTSTRAP ============ */
/* Renders every dynamic section and wires up every module, in the same
   order the original single-file build executed them in. Each module
   exposes its own init function (see navigation.js, cursor.js, modal.js,
   animations.js, gsap.js). */
renderIcons();
initMarquee();
initTestimonials();
initServiceModal();
initServiceCards();
initProcessSteps();
renderIcons();
initNavigation();
initCursor();
initMagneticButtons();
initHeroParallax();
initHeroParticles();
initBackdropParticles();
initHeroTimeline();
initScrollReveals();
initOrbitModal();
initHeroOrbit();
