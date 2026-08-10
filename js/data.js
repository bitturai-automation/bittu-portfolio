/* ============================================================
   BITTU RAI — PORTFOLIO DATA
   Two identities, one designer. Edit these objects to update
   copy, projects, or experience without touching markup.
   ============================================================ */

const PORTFOLIO_DATA = {

  graphic: {
    key: "graphic",
    label: "Graphic Designer",
    shortLabel: "Graphic",
    roleWords: ["Graphic Designer", "Brand Identity Designer", "Visual Designer"],
    eyebrow: "Brand Identity · Visual Design",
    intro: "Graphic Designer with 4+ years turning brand ideas into posters, packaging, social campaigns and pitch decks that actually get noticed. I've shipped 100+ projects for startups, NGOs and international clients — and lately I've been folding AI tools straight into the process.",
    resumeFile: "resume/Bittu_Rai_Graphic_Designer_Resume.pdf",
    heroTags: ["Branding", "Illustrator", "Photoshop", "Social Media", "Print Design", "AI Workflows"],
    stats: [
      { value: 100, suffix: "+", label: "Design Projects" },
      { value: 12, suffix: "+", label: "Clients & Brands" },
      { value: 4, suffix: "+", label: "Years Designing" },
      { value: 7, suffix: "", label: "Teams Worked With" }
    ],
    skills: [
      "Adobe Illustrator", "Adobe Photoshop", "Adobe InDesign", "CorelDRAW", "Canva",
      "Figma", "FigJam", "Brand Identity", "Logo Design",
      "Typography", "Color Theory", "Layout & Grid Systems", "Print Production",
      "Social Media Design", "AI-Assisted Design", "Prompt Engineering"
    ],
    favoriteTools: [
      { name: "Adobe Illustrator", img: "img/tools-graphic/illustrator.png" },
      { name: "Figma", img: "img/tools-graphic/figma.png" },
      { name: "Canva", img: "img/tools-graphic/canva.png" },
      { name: "Adobe Photoshop", img: "img/tools-graphic/photoshop.png" },
      { name: "Gemini", img: "img/tools-graphic/gemini.png" },
      { name: "ChatGPT", img: "img/tools-graphic/chatgpt.png" },
      { name: "Google Whisk", img: "img/tools-graphic/whisk.png" },
      { name: "Adobe Firefly", img: "img/tools-graphic/firefly.png" }
    ],
    services: [
      { title: "Social Media Design", desc: "Scroll-stopping creative for campaigns, launches and always-on content." },
      { title: "Posters & Banners", desc: "Event, retail and outdoor creative designed to be read in three seconds." },
      { title: "Website Banner Design", desc: "Web and ad banners — hero sections, sale creatives and display ads sized for every placement." },
      { title: "Printing Material", desc: "Print-ready flex banners, standees, company profiles and marketing collateral built for bleed, scale and real-world visibility." },
      { title: "AI Video", desc: "AI-generated video content — short-form reels and motion concepts made with AI video tools, start to finish." },
      { title: "Brand Identity", desc: "Logos, guidelines and visual systems built to hold up across every touchpoint." }
    ],
    /* Each category alternates dark / light background automatically (see app.js).
       Every project card opens a details popup on click — add "img" (path to a real
       photo) to any project to replace the placeholder initials thumbnail. */
    projectCategories: [
      {
        name: "Social Media Design — Story",
        desc: "Scroll-stopping story creative for campaigns, launches and always-on content.",
        projects: [
          { title: "Real Estate", tag: "Social Media · Story", simple: true, img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786109916/WhatsApp_Image_2026-08-07_at_6.42.03_PM_1_mfqooa.jpg" },
          { title: "Cafe", tag: "Social Media · Story", simple: true, img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786109910/WhatsApp_Image_2026-08-07_at_6.42.02_PM_e1duur.jpg" },
          { title: "Real Estate", tag: "Social Media · Story", simple: true, img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786109908/WhatsApp_Image_2026-08-07_at_6.42.02_PM_2_oiiv6q.jpg" },
          { title: "Cafe", tag: "Social Media · Story", simple: true, img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786109907/WhatsApp_Image_2026-08-07_at_6.42.02_PM_1_ud5ltm.jpg" },
          { title: "Jewellery", tag: "Social Media · Story", simple: true, img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786109905/WhatsApp_Image_2026-08-07_at_6.42.01_PM_2_myvckr.jpg" },
          { title: "Real Estate", tag: "Social Media · Story", simple: true, img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786128462/Homes_that_redefine_unique_architectural_expression_xmpszr.png" }
        ]
      },
      {
        name: "Social Media Design — Post",
        desc: "Feed-ready post creative for campaigns, launches and always-on content.",
        projects: [
          { title: "Jewellery", tag: "Social Media · Post", simple: true, img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786109904/WhatsApp_Image_2026-08-07_at_6.42.01_PM_1_yhiysa.jpg" },
          { title: "Jewellery", tag: "Social Media · Post", simple: true, img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786109913/WhatsApp_Image_2026-08-07_at_6.42.00_PM_mxtwuf.jpg" },
          { title: "Natural Product", tag: "Social Media · Post", simple: true, img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786105116/img-024-56f2e131a8_hyjyft.jpg" },
          { title: "Stories Shaping Tomorrow", tag: "Social Media · Post", simple: true, img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786127800/Stories_Shaping_Tomorrow_g6jcbx.png" },
          { title: "Design Post", tag: "Social Media · Post", simple: true, img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786130895/9_jlsfk0.png" },
          { title: "Luxury Living", tag: "Social Media · Post", simple: true, img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786131582/Luxury_Living_Is_Taking_Shape_3_nrupuv.png" }
        ]
      },
      {
        name: "Posters & Banners",
        desc: "Event, retail and outdoor creative designed to be read in three seconds.",
        projects: [
          { title: "Zest Collage", tag: "Poster · Collage", simple: true, img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786115036/ZEST_INVITATION.pdf_iidlcq.png" },
          { title: "Influencer Post", tag: "Poster · Influencer", simple: true, img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786115002/Nuzhath_Khan_AED_e7ie4f.png" }
        ]
      },
      {
        name: "Website Banner Design",
        desc: "Web and ad banners — hero sections, sale creatives and display ads sized for every placement.",
        projects: [
          { title: "Cloth Banner", tag: "Web Banner · Fashion", simple: true, img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786123576/1_su6eyp.png" },
          { title: "Beauty Brand", tag: "Web Banner · Beauty", simple: true, img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786123573/2_tb4syb.png" },
          { title: "Family Spa Brand", tag: "Web Banner · Spa", simple: true, img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786123572/3_gstldc.png" }
        ]
      },
      {
        name: "Printing Material",
        desc: "Print-ready flex banners, standees, company profiles and marketing collateral built for bleed, scale and real-world visibility.",
        projects: [
          { title: "INDUS AVIVA", tag: "Marketing Collateral · Company Profile", bio: "Company profile for Indus Aviva — an Indian water storage tank manufacturer.", role: "Graphic Designer", tools: ["Illustrator", "Photoshop"], img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786132363/17_hvzua1.png", overview: "Welcome to Indus Aviva, where kindness and a desire to make a difference drive our mission. Our name reflects our Indian heritage and our commitment to ushering in a new era of hope and renewal for the common man. The name Aviva, meaning \"a new springtime,\" symbolizes our desire to bring about positive change in the lives of those we serve. The COVID-19 pandemic inspired us to contribute to our society, realizing that earning from business enables us to provide meaningful support. We established Indus Aviva in 2021, focusing on manufacturing superior, affordable, and accessible water storage tanks for all.", gallery: [
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786132363/17_hvzua1.png" },
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786132406/18_f3kgkd.png" }
          ] },
          { title: "Abgelica Enterprises", tag: "Marketing Collateral · Company Profile", bio: "Company profile for a Delhi-headquartered manpower supply company serving all of India.", role: "Graphic Designer", tools: ["Illustrator", "Photoshop"], img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786132409/15_ipmijq.png", overview: "We are one of the reputed manpower supply companies in India, headquartered in Delhi, focused on providing manpower supply services throughout India for the past 12 years. We are the one-stop solution for manpower supply in India, meeting the requirement of general and technical services for all major industrial sectors such as Facilities Management, Manpower & Security Service, and Horticulture & Exhibition Services. With over 12 years of service, we provide skilled and unskilled labour across different industrial sectors. Our goal is to provide quality manpower supply services to all our clients in India.", gallery: [
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786132409/15_ipmijq.png" },
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786132361/16_p9cxpw.png" }
          ] },
          { title: "Premium Z n Infra", tag: "Marketing Collateral · Company Profile", bio: "Company profile for an infrastructure & construction contracting firm.", role: "Graphic Designer", tools: ["Illustrator", "Photoshop"], img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786132395/19_bcchd9.png", overview: "One of the rarest contracting firms, started & run by two energetic & experienced engineers — Zuber Khan & Nizam Khan. We want to establish our name in the field of Infrastructure & Construction Projects.", gallery: [
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786132395/19_bcchd9.png" },
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786132379/20_u1uesf.png" }
          ] }
        ]
      },
      {
        name: "AI Video",
        desc: "AI-generated video content — short-form reels and motion concepts made with AI video tools.",
        projects: [
          { title: "AI Video Concept 1", tag: "AI Video", bio: "AI-generated video short — motion concept created end to end with AI tools.", link: "https://res.cloudinary.com/dk1kmgcqn/video/upload/v1785066456/Create_a_realistic_second_v_tzv0el.mp4", video: "https://res.cloudinary.com/dk1kmgcqn/video/upload/v1785066456/Create_a_realistic_second_v_tzv0el.mp4" },
          { title: "AI Video Concept 2", tag: "AI Video", bio: "AI-generated video short — motion concept created end to end with AI tools.", link: "https://res.cloudinary.com/dk1kmgcqn/video/upload/v1785065960/Create_an_exactly_second_VE_ftdlzg.mp4", video: "https://res.cloudinary.com/dk1kmgcqn/video/upload/v1785065960/Create_an_exactly_second_VE_ftdlzg.mp4" },
          { title: "AI Video Concept 3", tag: "AI Video", bio: "AI-generated video short — motion concept created end to end with AI tools.", link: "https://res.cloudinary.com/dk1kmgcqn/video/upload/v1785066615/Create_a_realistic_second_v_1_doyizs.mp4", video: "https://res.cloudinary.com/dk1kmgcqn/video/upload/v1785066615/Create_a_realistic_second_v_1_doyizs.mp4" }
        ]
      },
      {
        name: "Brand Identity",
        desc: "Logos, guidelines and visual systems built to hold up across every touchpoint.",
        projects: [
          { title: "Artham Infrastructure", tag: "Branding · Infrastructure", bio: "Brand identity for Artham Infrastructure — logo, colour and visual system for an infrastructure company.", role: "Brand Designer", tools: ["Illustrator", "Photoshop"], img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786131011/15_xmiwvw.png", overview: "Designed a complete brand identity for Artham Infrastructure — logo mark, colour palette and visual system built to feel solid, trustworthy and consistent across every touchpoint, from stationery to site signage.", gallery: [
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786131109/16_p4c2nh.png" },
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786131051/17_wihqa5.png" },
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786131302/18_h2hspk.png" },
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786131205/19_gfravp.png" }
          ] },
          { title: "Shri Amar Sai Resort", tag: "Branding · Hospitality", bio: "Brand identity for Shri Amar Sai Resort — logo, colour and visual system for a hospitality brand.", role: "Brand Designer", tools: ["Illustrator", "Photoshop"], img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786131218/20_sayfit.png", overview: "Designed a complete brand identity for Shri Amar Sai Resort — logo mark, colour palette and visual system built to feel warm and inviting, carrying the resort's identity consistently across signage, print and digital touchpoints.", gallery: [
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786131173/21_zmjcju.png" },
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786131233/22_egpp84.png" },
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786131296/24_jvlr8q.png" },
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786131332/23_m4rhns.png" }
          ] },
          { title: "Bhavya Construction Management", tag: "Branding · Construction", bio: "Brand identity for Bhavya Construction Management — logo, colour and visual system for a construction firm.", role: "Brand Designer", tools: ["Illustrator", "Photoshop"], img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786131809/th_uun4hp.png", overview: "Designed a complete brand identity for Bhavya Construction Management — logo mark, colour palette and visual system built to feel professional and dependable across print, digital and site branding.", gallery: [
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786131177/11_qcfbil.png" },
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786130990/13_cmrino.png" },
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786131059/14_u4mewq.png" }
          ] }
        ]
      }
    ],
    experience: [
      { role: "Freelance Graphic Designer", company: "Independent", period: "Ongoing", points: ["Delivered 100+ branding and graphic design projects for startups and global clients.", "Designed logos, social media creatives, websites, pitch decks and marketing assets."] },
      { role: "Graphic Designer", company: "Virtualyyst", period: "2026", points: ["Designed marketing creatives, landing pages and product visuals using Figma.", "Collaborated with developers and marketing teams to maintain brand consistency."] },
      { role: "Graphic Designer", company: "Adsstill Group · Part-time", period: "2025", points: ["Designed high-quality social media campaigns and advertising creatives.", "Produced promotional materials, banners, posters and digital marketing assets."] },
      { role: "Creative Partner", company: "Creative Canvas · Part-time", period: "2024", points: ["Developed brand identities and visual assets for startups.", "Designed logos, marketing materials and social media creatives."] },
      { role: "Graphic Designer", company: "StartupAccel · Part-time", period: "2023", points: ["Designed branding, social media creatives and promotional graphics.", "Created digital assets for startup marketing campaigns."] },
      { role: "Graphic Designer", company: "Suvidha Foundation · Part-time", period: "2022", points: ["Designed NGO campaigns, event creatives and awareness posters.", "Created engaging social media graphics for outreach initiatives."] },
      { role: "Graphic Designer", company: "Aashman Foundation", period: "2022", points: ["Created campaign posters, banners and promotional creatives.", "Supported NGO branding through impactful visual communication."] }
    ]
  },

  product: {
    key: "product",
    label: "Product Designer",
    shortLabel: "Product",
    roleWords: ["Product Designer", "UI/UX Designer", "Design Engineer"],
    eyebrow: "UI/UX · Design Systems",
    intro: "Product Designer with 2+ years designing intuitive web and mobile products, backed by 4+ years in visual design. I take ideas from wireframe to shippable UI in Figma, build design systems that hold together, and hand off clean to developers — increasingly by building the front end myself.",
    resumeFile: "resume/Bittu_Rai_UIUX_Resume.pdf",
    heroTags: ["Figma", "UI Design", "UX Research", "Design Systems", "Prototyping", "Responsive Dev", "HTML/CSS/JS", "Vibe Coding"],
    stats: [
      { value: 10, suffix: "+", label: "UI/UX & Design Projects" },
      { value: 5, suffix: "+", label: "Products Shipped" },
      { value: 2, suffix: "+", label: "Years in Product" },
      { value: 10, suffix: "+", label: "Happy Clients" }
    ],
    skills: [
      "Figma", "FigJam", "Wireframing", "User Research", "Design Systems",
      "Prototyping", "Interaction Design", "Responsive Design", "HTML", "CSS",
      "JavaScript", "Tailwind CSS", "Design-to-Development Handoff", "GSAP",
      "AI-Assisted Design", "Vibe Coding", "Usability Basics", "Accessibility (WCAG)"
    ],
    favoriteTools: [
      { name: "Figma", img: "img/tools/figma.png" },
      { name: "HTML5", img: "img/tools/html5.png" },
      { name: "CSS3", img: "img/tools/css3.png" },
      { name: "JavaScript", img: "img/tools/javascript.png" },
      { name: "ChatGPT", img: "img/tools/openai.png" },
      { name: "Claude AI", img: "img/tools/claude-ai.png" },
      { name: "Lovable", img: "img/tools/lovable.png" },
      { name: "Blackbox AI", img: "img/tools/blackbox-ai.png" }
    ],
    services: [
      { title: "UI Design", desc: "High-fidelity interfaces for web and mobile, pixel-checked and ready to build." },
      { title: "UX & Wireframing", desc: "Flows and low-fi structure that get the logic right before the pixels." },
      { title: "Design Systems", desc: "Reusable components, tokens and variants that keep teams shipping fast." },
      { title: "Website Development", desc: "From Figma straight to a responsive, HTML/CSS/JS build — no handoff gap." },
      { title: "Dashboards & SaaS", desc: "Data-dense interfaces that stay legible, from admin panels to analytics." },
      { title: "AI / Vibe-Coded Products", desc: "Prototype-to-production using AI tooling, without losing design intent." }
    ],
    /* mode:"popup" (default) → card/button opens a details popup with the full write-up.
       mode:"link" → card/button redirects straight to each project's "link" URL in a
       new tab instead of opening a popup. Swap the placeholder "#" links below for the
       real project / live-site URLs whenever they're ready. */
    /* Consolidated into 3 sections per request: UI/UX Design, Website Development,
       Vibe Coded Tools. mode:"popup" (default) → card/button opens a details popup.
       mode:"link" → card/button redirects to each project's "link" URL in a new tab
       instead. Swap the placeholder "#" links below for real project/live URLs. */
    projectCategories: [
      {
        name: "UI/UX Design",
        desc: "Interfaces, flows and design systems — from low-fi wireframes to pixel-checked, production-ready screens.",
        mode: "link",
        projects: [
          { title: "Runway — Fashion App", tag: "UI/UX · Behance", bio: "Fashion app UX case study — open on Behance for the full breakdown.", link: "https://www.behance.net/gallery/251691937/Runway-Fashion-App-UX-Case-Study", embed: "https://www.behance.net/embed/project/251691937?ilo0=1" },
          { title: "Bloom & Bliss — Plant E‑Commerce", tag: "UI/UX · Behance", bio: "Plant e-commerce UX/UI case study — open on Behance for the full breakdown.", link: "https://www.behance.net/gallery/251696497/Bloom-Bliss-Plant-E-Commerce-UXUI-Case-Study", embed: "https://www.behance.net/embed/project/251696497?ilo0=1" },
          { title: "Cloud Raptor — Website Redesign", tag: "UI/UX · Behance", bio: "Website redesign case study — open on Behance for the full breakdown.", link: "https://www.behance.net/gallery/251712263/Cloud-Raptor-Website-Redesign-Case-Study", embed: "https://www.behance.net/embed/project/251712263?ilo0=1" },
          { title: "Software Development Agency — Web UI/UX", tag: "UI/UX · Behance", bio: "Agency website UI/UX case study — open on Behance for the full breakdown.", link: "https://www.behance.net/gallery/251750253/Software-Development-Agency-Web-UIUX-Case-Study", embed: "https://www.behance.net/embed/project/251750253?ilo0=1" },
          { title: "Montra — Personal Budgeting App", tag: "UI/UX · Behance", bio: "Budgeting app UI/UX case study — open on Behance for the full breakdown.", link: "https://www.behance.net/gallery/253627387/Montra-Personal-Budgeting-App-UIUX-Case-Study", embed: "https://www.behance.net/embed/project/253627387?ilo0=1" },
          { title: "Education Website UI Design", tag: "UI/UX · Behance", bio: "Education website UI design case study — open on Behance for the full breakdown.", link: "https://www.behance.net/gallery/248206611/Education-Website-UI-Design-Case-Study", embed: "https://www.behance.net/embed/project/248206611?ilo0=1" }
        ]
      },
      {
        name: "Website Development",
        desc: "From Figma straight to a responsive, HTML/CSS/JS build — no handoff gap.",
        mode: "link",
        projects: [
          { title: "Cloud Raptor", tag: "Live Client Project · Tech", bio: "Marketing site for a global cloud & digital-transformation consultancy.", link: "https://cloud-raptor.com/", img: "img/projects/cloud-raptor.jpg", simple: true },
          { title: "The Social Bling", tag: "Live Client Project · Marketing Agency", bio: "Multi-page site for a digital marketing agency, with a dynamic filterable blog and SEO-structured pages.", link: "https://thesocialbling.com/", simple: true, img: "img/projects/the-social-bling.jpg" },
          { title: "Shobha Motive", tag: "Live Client Project · AI Studio", bio: "Brand & product site for an AI automation and web studio.", link: "https://shobhamotive.in/", simple: true, img: "img/projects/shobha-motive.jpg" }
        ]
      },
      {
        name: "Demo Projects",
        desc: "Concept builds made to explore layout, copy and interaction ideas outside client scope.",
        mode: "link",
        projects: [
          { title: "PawVerse", tag: "Demo Project · Pet Store", bio: "Premium pet store concept — shop, vet booking and adoption in one place.", link: "https://pawversepreiumpetstore.netlify.app/", simple: true, img: "img/projects/pawverse.jpg" },
          { title: "HopeRise", tag: "Demo Project · NGO", bio: "NGO concept site for a foundation running education, health and clean-water programs.", link: "https://hoperise-foundation-ngo-website.netlify.app/", simple: true, img: "img/projects/hoperise.jpg" },
          { title: "Lumea Beauty", tag: "Demo Project · Beauty", bio: "Vegan skincare brand concept — clean, editorial storefront built to convert.", link: "https://lumeabeautybrandwebsite.netlify.app/", simple: true, img: "img/projects/lumea-beauty.jpg" }
        ]
      },
      {
        name: "Vibe Coded Tools",
        desc: "Prototype-to-production using AI tooling, without losing design intent.",
        mode: "link",
        projects: [
          { title: "Social Shobha", tag: "AI · Vibe Coding", bio: "AI content assistant that plans, writes and schedules social posts.", link: "https://social-shobha.lovable.app/", simple: true, img: "img/projects/social-shobha.jpg" },
          { title: "ShobhaFlow", tag: "AI · Vibe Coding", bio: "All-in-one shop management dashboard for modern retail teams.", link: "https://bizkit-app.lovable.app/", simple: true, img: "img/projects/shobhaflow.jpg" },
          { title: "Shobha Motive Song", tag: "AI · Vibe Coding", bio: "Daily Hindu devotional messages, quotes and WhatsApp status in 15 languages.", link: "https://bhakti-vachan-shakti.lovable.app/", simple: true, img: "img/projects/shobha-motive-song.jpg" }
        ]
      }
    ],
    experience: [
      { role: "Freelance UI/UX & Product Designer", company: "Independent", period: "Ongoing", points: ["Delivered 100+ UI/UX and branding projects for startups and global clients.", "Designed user flows, wireframes, prototypes and high-fidelity UI in Figma.", "Built responsive websites, dashboards and mobile app interfaces.", "Collaborated with founders and developers for end-to-end product delivery."] },
      { role: "UI/UX & Graphic Designer", company: "Virtualyyst", period: "2026", points: ["Designed responsive web and product interfaces in Figma.", "Created reusable design systems and UI component libraries.", "Worked with developers for smooth design-to-development handoff."] },
      { role: "Graphic Designer", company: "Adsstill Group · Part-time", period: "2025", points: ["Designed brand identities and marketing assets.", "Developed website visuals and social media creatives."] },
      { role: "Creative Partner", company: "Creative Canvas · Part-time", period: "2024", points: ["Designed branding, social media and promotional creatives.", "Supported startup marketing campaigns with visual content."] },
      { role: "Graphic Designer", company: "StartupAccel · Part-time", period: "2023", points: ["Created awareness campaign and social media designs.", "Maintained consistent branding across NGO initiatives."] },
      { role: "Graphic Designer", company: "Suvidha Foundation · Part-time", period: "2022", points: ["Designed campaign creatives and promotional materials.", "Collaborated with teams to deliver impactful visual content."] },
      { role: "Graphic Designer", company: "Aashman Foundation", period: "2022", points: ["Designed campaign creatives and promotional materials.", "Collaborated with teams to deliver impactful visual content."] }
    ]
  }
};

const SITE_META = {
  name: "Bittu Rai",
  phone: "+91 9142515509",
  email: "bitturai21126@gmail.com",
  site: "bittu-portfolio-delta.vercel.app",
  location: "India",
  education: [
    { school: "Lingayas Vidyapeeth, Faridabad", detail: "Bachelor of Technology", period: "2021 – 2025" },
    { school: "DAV Public School, Sec 4, Bokaro", detail: "12th", period: "2021" },
    { school: "KV No. 1, Sec 4, Bokaro", detail: "10th", period: "2019" }
  ],
  process: [
    { title: "Discover", desc: "Understand the brief, the audience, and what success looks like." },
    { title: "Research", desc: "Look at references, competitors and constraints before opening any tool." },
    { title: "Wireframe / Sketch", desc: "Get structure or layout logic right before the visual layer." },
    { title: "Design", desc: "Build the real thing — on-brand, considered, detailed." },
    { title: "Develop", desc: "Where needed, take it from design file to working build." },
    { title: "Deliver", desc: "Handoff, feedback, and a final pass for polish." }
  ],
  testimonials: [
    { quote: "He is an exceptional graphic designer. His creativity, attention to detail, and ability to translate ideas into visually stunning designs are truly impressive — and he consistently delivers high-quality work, meets deadlines, and brings fresh, innovative perspectives to every project.", name: "Devashish Kumar", company: "Senior Engineer, Motherson Technology Services" },
    { quote: "Bittu is one of those rare creatives who just gets it. He has a sharp ability to understand the vision — sometimes before you've even fully explained it — and then brings it to life with precision and creativity.", name: "Aman Sharma", company: "Author, ERASED · managed Bittu directly" },
    { quote: "Bittu is insanely talented! His creativity, attention to detail, and ability to bring ideas to life are just next level. What I love most is how easy he is to work with — super adaptable, open to feedback, and always putting in the effort to make things even better.", name: "Mubaraka Kachwalla", company: "HR Executive, Bombay Tools Center" },
    { quote: "Bittu Rai is an exceptional Graphic Designer with a keen eye for detail and creativity. His ability to merge design with functionality sets him apart, making him a versatile asset to any team.", name: "Manish Kumar Sahu", company: "Java Software Engineer" }
  ],
  faqs: [
    { q: "What's your typical turnaround time?", a: "Most single assets are ready in 3–5 days. Full brand or product packages usually take 7–10 days, depending on scope. I'll give you a firm timeline before we start." },
    { q: "How many revisions do I get?", a: "Every package includes at least one revision round, with more on the larger tiers. If something's not landing after that, I keep refining until it's right — I want you happy with the final files." },
    { q: "Do you work with clients outside India?", a: "Yes — I've worked with startups, NGOs and teams across time zones. Communication happens over email, WhatsApp or a quick call, whatever's easiest for you." },
    { q: "Can you handle both design and development?", a: "Yes. On the product side I take work from Figma through to a responsive HTML/CSS/JS build, so there's no handoff gap and nothing gets lost in translation." },
    { q: "How do we get started?", a: "Send a quick brief through the contact form or email — what you need, rough timeline and budget. I'll reply with next steps and a quote, usually within a day." },
    { q: "What if I'm not sure which package fits?", a: "Totally fine — tell me what you're trying to achieve and I'll recommend the right scope, even if it means suggesting something smaller than you asked for." }
  ]
};
