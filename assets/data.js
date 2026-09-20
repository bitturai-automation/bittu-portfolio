/* ============================================================
   BITTU RAI — PORTFOLIO DATA
   Single source of truth. Edit this file to update content
   without touching markup, styles, or animation code.
   All entries below are sourced directly from Bittu Rai's
   resumes. No client names, results, or testimonials have
   been invented — empty arrays render an honest empty state.
   ============================================================ */

const SITE_DATA = {

  /* Shown as a scrolling strip under the hero to signal remote/global
     availability — not a claim of physical offices, just reach. */
  availability: [
    "India", "United States", "United Kingdom", "Canada", "Australia",
    "UAE", "Singapore", "Germany", "Netherlands", "France",
  ],

  person: {
    name: "Bittu Rai",
    roles: [
      "Brand Maker",
      "Product Designer",
      "UI/UX Designer",
      "Graphic Designer",
      "Visual Designer",
      "Design Engineer",
    ],
    location: "India",
    year: "2026",
    phone: "+91 97716 04590",
    phoneHref: "tel:+919771604590",
    email: "bittu21126@gmail.com",
    portfolio: "bittu-portfolio-delta.vercel.app",
    whatsapp: "https://wa.me/919771604590",
    socials: {
      linkedin: "https://www.linkedin.com/in/bitttudesigner/",
      behance: "https://www.behance.net/bitttudesigner",
      github: "https://github.com/bitturai-automation",
    },
  },

  stats: [
    { value: 4, suffix: "+", label: "Years", sub: "Visual Design" },
    { value: 2, suffix: "+", label: "Years", sub: "Product Design" },
    { value: 100, suffix: "+", label: "Branding & Graphic Projects" },
    { value: 10, suffix: "+", label: "UI/UX & Product Projects" },
  ],

  bio: {
    positioning:
      "I work across Graphic Design, UI/UX, branding, marketing design and web experiences.",
    body:
      "With 4+ years in visual design and 2+ in product design, I've worked with startups, founders, developers, agencies, NGOs and international clients. Whatever the format, the job is the same: take a brief that's still messy and make it clear, consistent and easy to remember.",
  },

  services: [
    { n: "01", title: "Brand Identity", blurb: "Build a visual system people can recognize and remember.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1789236092/1_rlq3m2.png" },
    { n: "02", title: "Social Media Design", blurb: "Create story, post and campaign visuals that stop the scroll and keep every platform on-brand.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1789236093/2_znvxpx.png" },
    { n: "03", title: "Marketing Creatives", blurb: "Create campaign visuals that communicate quickly and capture attention.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1789236094/3_j7l5ld.png" },
    { n: "04", title: "Posters & Banners", blurb: "Make an event, offer or campaign clear in a single glance.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1789236094/4_vdjb6o.png" },
    { n: "05", title: "UI/UX Design", blurb: "Turn complex ideas into clear and intuitive digital experiences.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1789236095/6_r2pqqm.png" },
    { n: "06", title: "Print & Packaging Design", blurb: "Carry the brand into the physical world with print-ready collateral and packaging.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1789236095/7_i4utnp.png" },
    { n: "07", title: "AI-Assisted Design & Development", blurb: "Move an idea from concept to a working build with prompt-driven workflows.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1789236095/5_cdxw8t.png" },
  ],

  /* Real project case studies are merged in from assets/projects-data.js
     (loaded right after this file) so the long project list doesn't
     clutter this main data file. This array is the fallback/schema
     reference if projects-data.js is ever removed.
     Schema: title, category ("graphic"|"uiux"), subcategory, year, client,
     role, tools[], description, challenge, approach, outcome, images[],
     video, link, linkMode, featured, aspectRatio */
  projects: [],

  /* Audiences shown in the "Who I help" section. */
  whoIHelp: [
    "Startups",
    "Early-Stage Founders",
    "Growing Businesses",
    "D2C & Consumer Brands",
    "Marketing Agencies",
    "Product Teams",
  ],

  graphicCategories: [
    "Social Media Design — Story",
    "Social Media Design — Post",
    "Posters & Banners",
    "Website Banner Design",
    "Printing Material",
    "AI Video",
    "Brand Identity",
  ],

  uiuxCategories: [
    "UI/UX Design",
    "Website Development",
    "Demo Projects",
    "Vibe Coded Tools",
  ],

  /* Real client/brand logos, shipped in assets/img/brands/. */
  brands: Array.from({length:35}, (_,i)=> `assets/img/brands/brand-${String(i+1).padStart(2,'0')}.png`),

  process: [
    { n: "01", title: "Discover", text: "Understand the problem, audience, goals and context." },
    { n: "02", title: "Define", text: "Turn the messy brief into a clear direction." },
    { n: "03", title: "Design", text: "Explore concepts, systems, layouts and interactions." },
    { n: "04", title: "Refine", text: "Test, iterate and polish." },
    { n: "05", title: "Deliver", text: "Prepare final assets, prototypes and development-ready files." },
  ],

  education: [
    { school: "Lingayas Vidyapeeth, Faridabad", program: "Bachelor of Technology", period: "2021–2025" },
    { school: "DAV Public School, Sector 4, Bokaro", program: "12th", period: "Completed 2021" },
    { school: "KV No. 1, Sector 4, Bokaro", program: "10th", period: "Completed 2019" },
  ],

  experience: [
    {
      year: "2022",
      role: "Graphic Designer",
      org: "Suvidha Foundation",
      note: "Part-time",
      bullets: [
        "Designed NGO campaigns, event creatives, and awareness posters.",
        "Created engaging social media graphics for outreach initiatives.",
      ],
    },
    {
      year: "2022",
      role: "Graphic Designer",
      org: "Aashman Foundation",
      note: "",
      bullets: [
        "Created campaign posters, banners, and promotional creatives.",
        "Supported NGO branding through impactful visual communication.",
      ],
    },
    {
      year: "2023",
      role: "Graphic Designer",
      org: "StartupAccel",
      note: "Part-time",
      bullets: [
        "Designed branding, social media creatives, and promotional graphics.",
        "Created digital assets for startup marketing campaigns.",
      ],
    },
    {
      year: "2024",
      role: "Creative Partner",
      org: "Creative Canvas",
      note: "Part-time",
      bullets: [
        "Developed brand identities and visual assets for startups.",
        "Designed logos, marketing materials, and social media creatives.",
      ],
    },
    {
      year: "2025",
      role: "Graphic Designer",
      org: "Adsstill Group",
      note: "Part-time",
      bullets: [
        "Designed high-quality social media campaigns and advertising creatives.",
        "Produced promotional materials, banners, posters, and digital marketing assets.",
        "Managed multiple client projects while maintaining brand consistency.",
      ],
    },
    {
      year: "2026",
      role: "UI/UX & Graphic Designer",
      org: "Virtualyyst",
      note: "",
      bullets: [
        "Designed responsive web and product interfaces in Figma.",
        "Created reusable design systems and UI component libraries.",
        "Worked with developers for smooth design-to-development handoff.",
        "Designed landing pages, dashboards, and marketing assets.",
      ],
    },
    {
      year: "Ongoing",
      role: "Freelance Product, UI/UX & Graphic Designer",
      org: "Independent",
      note: "",
      bullets: [
        "Delivered 100+ branding and graphic design projects for startups and global clients.",
        "Delivered 10+ UI/UX and branding projects for startups and global clients.",
        "Designed logos, social media creatives, websites, pitch decks, and marketing assets.",
        "Designed user flows, wireframes, prototypes, and high-fidelity UI in Figma.",
      ],
    },
  ],

  certifications: [
    { title: "Data Analytics Job Simulation", org: "Deloitte" },
    { title: "Graphic Designer", org: "LinkedIn" },
    { title: "Brand New Brand", org: "Coursera" },
    { title: "UI and UX Design", org: "ITRONIX" },
    { title: "Introduction to Graphic Design / Basics of UI/UX", org: "" },
    { title: "Advanced Prompt Engineering with ChatGPT", org: "UpGrad" },
    { title: "Element of Social Media Marketing", org: "CareerNinja" },
  ],

  tools: [
    { name: "Figma", icon: "assets/img/tools/figma.png" },
    { name: "Adobe Illustrator", icon: "assets/img/tools/illustrator.png" },
    { name: "Adobe Photoshop", icon: "assets/img/tools/photoshop.png" },
    { name: "Canva", icon: "assets/img/tools/canva.png" },
    { name: "HTML5", icon: "assets/img/tools/html5.png" },
    { name: "CSS3", icon: "assets/img/tools/css3.png" },
    { name: "JavaScript", icon: "assets/img/tools/javascript.png" },
    { name: "WordPress", icon: "assets/img/tools/wordpress.svg" },
    { name: "Webflow", icon: "assets/img/tools/webflow.svg" },
    { name: "ChatGPT", icon: "assets/img/tools/chatgpt.png" },
    { name: "Claude", icon: "assets/img/tools/claude-ai.png" },
    { name: "Gemini", icon: "assets/img/tools/gemini.png" },
    { name: "OpenAI", icon: "assets/img/tools/openai.png" },
    { name: "Lovable", icon: "assets/img/tools/lovable.png" },
    { name: "Adobe Firefly", icon: "assets/img/tools/firefly.png" },
    { name: "Whisk", icon: "assets/img/tools/whisk.png" },
    { name: "Blackbox AI", icon: "assets/img/tools/blackbox-ai.png" },
  ],

  testimonials: [
    {
      name: "Rohan Mehta",
      quote: "Bittu understood the kind of clean and modern look we wanted. The final website design felt fresh, simple and very easy to navigate. He was also open to feedback throughout the process.",
    },
    {
      name: "Ananya Kapoor",
      quote: "What I really liked was how Bittu translated a fairly complex AI concept into something that felt simple and easy to understand. The interface looked modern and the user journey was very clear.",
    },
    {
      name: "Aditya Sharma",
      quote: "Bittu did a great job of making our product communication feel much more user-friendly. He paid attention to the small details and made sure the design looked clean without making it boring.",
    },
    {
      name: "Rahul Jain",
      quote: "Since Bittu started working on our creatives, our social media has started looking much more premium and consistent. His designs have a very classy feel, and he understands the real estate audience really well.",
    },
    {
      name: "Neha Verma",
      quote: "Bittu brought a completely different energy to our creatives. The designs became more attractive and engaging, and we started getting much better attention on our campaigns. He is genuinely creative and understands what works visually.",
    },
    {
      name: "Riya Agarwal",
      quote: "We wanted our social media to look more premium, and Bittu really understood that direction. The designs feel elegant, polished and much more aligned with our jewellery brand. Our overall social presence has improved noticeably.",
    },
    {
      name: "Amit Kulkarni",
      quote: "Bittu has handled everything from social media creatives to banners, standees and AI videos for us. What I appreciate most is that he maintains the same quality and brand feel across completely different formats.",
    },
  ],
};
