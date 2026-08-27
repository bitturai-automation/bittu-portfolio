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
    intro: "Graphic Designer with 4+ years turning brand ideas into posters, packaging, social campaigns and pitch decks that actually get noticed. I've shipped 100+ projects for startups, NGOs and international clients, and lately I've been folding AI tools straight into the process.",
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
      { title: "Website Banner Design", desc: "Web and ad banners, including hero sections, sale creatives and display ads sized for every placement." },
      { title: "Printing Material", desc: "Print-ready flex banners, standees, company profiles and marketing collateral built for bleed, scale and real-world visibility." },
      { title: "AI Video", desc: "AI-generated video content, including short-form reels and motion concepts made with AI video tools, start to finish." },
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
          { title: "Premium Brand", tag: "Social Media · Story", simple: true, bio: "The client wanted their Instagram story to feel classy and premium, so I started by understanding their brand tone before opening any design tool. I picked a darker, minimal colour palette and clean typography to keep the focus on the message rather than clutter. Every choice, including spacing, font weight and contrast, was made to feel expensive without being loud. The result reads as premium within the first two seconds of a scroll.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1787769788/bite_6_ovbkbb.png" },
          { title: "Cafe", tag: "Social Media · Story", simple: true, bio: "This cafe brand needed a story design that puts the food front and centre and stops the scroll. I researched how top cafe brands use warm tones and close-up food shots, then built a simple layout that lets the dish be the hero with minimal text overlay. Typography stays casual and friendly to match a cafe's approachable vibe. The final design is simple, appetising, and easy to read on a phone screen.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786109910/WhatsApp_Image_2026-08-07_at_6.42.02_PM_e1duur.jpg" },
          { title: "Real Estate", tag: "Social Media · Story", simple: true, bio: "The client needed to showcase multiple plots in one story without overwhelming the viewer, so I designed it as a swipeable slide format. I studied how real estate brands typically present layout plans and used clean grid lines and directional cues to guide the eye plot by plot. Typography stays minimal so the plot visuals do the talking. This makes it easy for a potential buyer to compare options in seconds.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786109908/WhatsApp_Image_2026-08-07_at_6.42.02_PM_2_oiiv6q.jpg" },
          { title: "Cafe", tag: "Social Media · Story", simple: true, bio: "Another cafe brand, but this time the brief asked for the opposite: keep it minimal. I stripped the design down to one strong visual, one clean typeface, and lots of negative space so it never feels busy, letting the product photography carry the design instead of heavy graphics or text. It's a good example of how the same brand category can need two very different creative directions depending on the brief.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786109907/WhatsApp_Image_2026-08-07_at_6.42.02_PM_1_ud5ltm.jpg" },
          { title: "Jewellery", tag: "Social Media · Story", simple: true, bio: "A jewellery brand wanted a premium, classy story design that matches the value of the product itself. I researched how luxury jewellery brands use dark backgrounds, gold accents and generous spacing to signal quality, then applied the same principles here. Typography stays elegant and understated so it never competes with the jewellery photography. The final design feels premium without relying on loud colours or effects.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786109905/WhatsApp_Image_2026-08-07_at_6.42.01_PM_2_myvckr.jpg" },
          { title: "Real Estate", tag: "Social Media · Story", simple: true, bio: "This real estate brand wanted their story kept simple, so I focused on one clear message per slide instead of cramming in every detail. I used a clean layout with strong hierarchy, moving from headline to key info to a call-to-action, so a viewer understands the offer in a single glance. The visual style stays consistent with the brand's other social posts for recall. Simplicity here was a deliberate design choice, not a shortcut.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786128462/Homes_that_redefine_unique_architectural_expression_xmpszr.png" }
        ]
      },
      {
        name: "Social Media Design — Post",
        desc: "Feed-ready post creative for campaigns, launches and always-on content.",
        projects: [
          { title: "Zest", tag: "Social Media · Post", simple: true, bio: "Made for my college fest, Zest, this post needed to grab attention among hundreds of other event posts on students' feeds. I kept the design bold and energetic, using bright colours and strong typography, to match the excitement of the fest itself. Key event details were placed in a clear hierarchy so they're readable even as a small thumbnail. This was one of my early lessons in designing for a crowded, fast-scrolling feed.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1787769706/zest_fnjpvt.jpg" },
          { title: "Sponsorship Invitation — Nakash Aziz Live", tag: "Social Media · Post", simple: true, bio: "This was a sponsorship invitation for a live concert at my college fest, Zest, meant to be sent to potential sponsors and brands. Since it had to look credible to a business audience, I kept the layout structured and professional while still carrying the fest's energetic branding. All the essential information, including artist, date, venue and contact, is arranged so it can be scanned in seconds. The goal was to make sponsors take the opportunity seriously at first glance.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1787769699/Sponsorship_Invitation_-_Nakash_Aziz_Live_in_Concert_at_Lingayas_Vidyapeeth_We_are_thrille_zxnmc2.jpg" },
          { title: "FlashAid Ads", tag: "Social Media · Post", simple: true, bio: "This was an ads creative where the client's main requirement was performance, meaning the design needed to convert, not just look good. I focused on a clear value proposition up top, a strong contrast call-to-action, and minimal distractions around it, based on what typically performs well in paid social. Colour and copy hierarchy were arranged so the offer is understood in under two seconds. Designing for ads taught me to prioritise clarity and conversion over pure aesthetics.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1787771287/FLASHAID_ADS_cwmipr.png" },
          { title: "Jewellery", tag: "Social Media · Post", simple: true, bio: "The client wanted a classy, premium look for this post, so I leaned into darker tones, subtle metallic accents and generous spacing, the visual language I use across most of my jewellery and luxury work. I made sure the product stayed the visual focus, with type and graphics playing a supporting role only. Every choice, from font weight to spacing, was made to avoid the design feeling cheap or cluttered. It's a good example of how tone and restraint can make a design feel premium.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786109904/WhatsApp_Image_2026-08-07_at_6.42.01_PM_1_yhiysa.jpg" },
          { title: "Selected Demo Post", tag: "Social Media · Post", simple: true, bio: "This was a demo post I created on my own, without a live client brief, purely to show my design range and get selected for design opportunities. I treated it like a real project, picking a concept, researching references, and refining the layout through multiple iterations before finalising it. It worked well and helped me get selected for actual paid opportunities. It's proof that a strong process matters even on self-initiated work.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786109913/WhatsApp_Image_2026-08-07_at_6.42.00_PM_mxtwuf.jpg" },
          { title: "Natural Product", tag: "Social Media · Post", simple: true, bio: "This brand wanted something unique for their ads, a design that shows the product in enough detail that people understand what it does and why it's different. I researched how similar natural and organic product brands present ingredients and benefits visually, then built a layout that balances product photography with clear, scannable text. Every decision was aimed at making the product's story clear at a glance, not just decorative. The result is a post that informs as much as it attracts.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786105116/img-024-56f2e131a8_hyjyft.jpg" },
          { title: "Stories Shaping Tomorrow", tag: "Social Media · Post", simple: true, bio: "This was a TEDx post made for a founder speaker, and her one clear instruction was to keep it simple with her face as the main focus. I designed the layout around her portrait first, then added minimal supporting text and the TEDx branding without letting it compete with her. Typography stays understated so the focus never shifts away from the speaker. This project taught me how to design around a person's presence rather than around graphics.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786127800/Stories_Shaping_Tomorrow_g6jcbx.png" },
          { title: "Design Post", tag: "Social Media · Post", simple: true, bio: "A jewellery brand wanted their pieces shown in a premium, classy design that reflects the craftsmanship of the product. I built the layout around close, detailed product shots with a dark, neutral background so the jewellery pops without extra noise. Typography and spacing were kept minimal and elegant, consistent with the premium tone the client asked for. The final post positions the jewellery as the centrepiece, exactly as the brief required.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786130895/9_jlsfk0.png" },
          { title: "Real Estate", tag: "Social Media · Post", simple: true, bio: "This real estate brand wanted a premium, unique design that also brings in a sense of nature, moving away from the usual plain floor-plan style post. I researched how upscale real estate brands blend architecture with natural elements like greenery, sky and light, then built a layout combining property visuals with organic textures. The typography stays clean and confident to match the premium tone. It's a good example of pushing beyond a category's usual visual clichés when the brief asks for it.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1787769818/bite_5_x9fm0h.png" }
        ]
      },
      {
        name: "Posters & Banners",
        desc: "Event, retail and outdoor creative designed to be read in three seconds.",
        projects: [
          { title: "One Pager", tag: "Poster · Animated", simple: true, bio: "This one-pager was made for a foreign client who needed something premium, classy, and easy for her own clients to understand the brand at a glance, all in a single animated page. I structured the content in a clear top-to-bottom flow, covering brand intro, offerings and contact, and used subtle motion to draw attention without overwhelming the reader. The animation was built to loop cleanly and work well when shared as a link or GIF. The end result makes a strong first impression in the first few seconds.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1787772063/one_pager_1_sz3gjh.gif" },
          { title: "Zest Collage", tag: "Poster · Collage", simple: true, bio: "This poster for my college fest, Zest, needed to represent every event happening across the fest in a single visual. I approached it like a collage, collecting visuals and details from each event, then arranging them so the poster feels lively and complete without looking cluttered. Hierarchy was used to make sure the fest name and date stand out first, before the individual events. It's one of my favourite examples of managing a lot of information in one composition.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786115036/ZEST_INVITATION.pdf_iidlcq.png" },
          { title: "Influencer Post", tag: "Poster · Influencer", simple: true, bio: "This was made for a friend who needed a design to help showcase her presence and pricing clearly to potential clients. I kept the layout simple and confident, with a strong personal visual up top and pricing and offerings laid out in an easy-to-scan format below. The goal was to make the design feel personal and approachable while still looking professional enough to be taken seriously. It's a good example of designing for a personal brand rather than a company.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786115002/Nuzhath_Khan_AED_e7ie4f.png" }
        ]
      },
      {
        name: "Website Banner Design",
        desc: "Web and ad banners, including hero sections, sale creatives and display ads sized for every placement.",
        projects: [
          { title: "Cloth Banner", tag: "Web Banner · Fashion", simple: true, bio: "This website banner was designed for a clothing brand called Shree, meant to sit right at the top of their homepage. I focused on making the product the hero of the composition, with typography and colour chosen to reflect the brand's fashion identity. Since a hero banner is often the first thing a visitor sees, I kept the layout clean with one clear focal point instead of competing elements. It's built to load fast and look sharp across different screen sizes.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786123576/1_su6eyp.png" },
          { title: "Beauty Brand", tag: "Web Banner · Beauty", simple: true, bio: "This website banner for a beauty brand needed to grab attention right at the top of the site and set the tone for the rest of the visit. I used soft, flattering tones and elegant typography to match the beauty category's visual language, keeping the product as the clear focal point. Spacing and contrast were used deliberately so the banner feels premium rather than crowded with promotional text. It's designed to work as a strong first impression, not just a filler graphic.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786123573/2_tb4syb.png" },
          { title: "Family Spa Brand", tag: "Web Banner · Spa", simple: true, bio: "This banner was made for a family spa brand's homepage, where the goal was to feel warm and inviting rather than clinical. I chose soft, calming colours and gentle typography to reflect relaxation and trust, the key emotions for a spa brand. The layout keeps enough breathing room so it feels peaceful, not busy, which matters a lot for a wellness brand's first impression. It's designed to make a visitor feel instantly at ease.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786123572/3_gstldc.png" }
        ]
      },
      {
        name: "Printing Material",
        desc: "Print-ready flex banners, standees, company profiles and marketing collateral built for bleed, scale and real-world visibility.",
        projects: [
          { title: "Zest Fest Invitation", tag: "Print · Collage Banner", simple: true, bio: "This was my college fest invite poster, designed as a single collage banner bringing together every Zest event into one shareable visual. I approached it the same way as my Zest poster in Posters & Banners, gathering visuals from each event and arranging them with clear hierarchy so the fest name stands out first. It needed to work both as a print banner and a shareable social invite, so I kept text legible at multiple sizes. It's a good example of designing one asset that has to work across two different formats.", img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1787770657/ZEST_INVITATION_bmhfqd.jpg" },
          { title: "INDUS AVIVA", tag: "Marketing Collateral · Company Profile", bio: "Indus Aviva is an Indian water storage tank manufacturer, and the brand wanted a minimal, premium look for their company profile. I started by understanding their positioning as an affordable but quality-focused manufacturer, then researched how similar B2B manufacturing brands present themselves professionally. I kept the layout clean and spacious, using generous white space and a simple grid so the document feels premium and easy to navigate. The final profile reflects the brand's mission of accessibility and quality without feeling cluttered.", role: "Graphic Designer", tools: ["Illustrator", "Photoshop"], img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786132363/17_hvzua1.png", overview: "Welcome to Indus Aviva, where kindness and a desire to make a difference drive our mission. Our name reflects our Indian heritage and our commitment to ushering in a new era of hope and renewal for the common man. The name Aviva, meaning \"a new springtime,\" symbolizes our desire to bring about positive change in the lives of those we serve. The COVID-19 pandemic inspired us to contribute to our society, realizing that earning from business enables us to provide meaningful support. We established Indus Aviva in 2021, focusing on manufacturing superior, affordable, and accessible water storage tanks for all.", gallery: [
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786132363/17_hvzua1.png" },
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786132406/18_f3kgkd.png" }
          ] },
          { title: "Abgelica Enterprises", tag: "Marketing Collateral · Company Profile", bio: "Abgelica Enterprises is a Delhi-headquartered manpower supply company serving clients across India, and the brief was for a very classy, simple design that's easy to understand at a glance. I researched how established B2B service companies structure their profiles, covering services, experience and sectors served, and organised the content in that same logical, scannable order. Typography and colour were kept restrained so the document reads as professional and trustworthy rather than flashy. The result is a company profile a decision-maker can skim in minutes and still walk away with a clear picture of the business.", role: "Graphic Designer", tools: ["Illustrator", "Photoshop"], img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786132409/15_ipmijq.png", overview: "We are one of the reputed manpower supply companies in India, headquartered in Delhi, focused on providing manpower supply services throughout India for the past 12 years. We are the one-stop solution for manpower supply in India, meeting the requirement of general and technical services for all major industrial sectors such as Facilities Management, Manpower & Security Service, and Horticulture & Exhibition Services. With over 12 years of service, we provide skilled and unskilled labour across different industrial sectors. Our goal is to provide quality manpower supply services to all our clients in India.", gallery: [
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786132409/15_ipmijq.png" },
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786132361/16_p9cxpw.png" }
          ] }
        ]
      },
      {
        name: "AI Video",
        desc: "AI-generated video content, including short-form reels and motion concepts made with AI video tools.",
        projects: [
          { title: "AI Video Concept 1", tag: "AI Video", bio: "A short AI-generated video made to show brands what's possible with AI-assisted content. My process starts with a concept and script, then I use Gemini and Google Flow to generate the visuals and motion, refining the prompts multiple times until the output matches the brand feel I'm going for. ChatGPT helps me tighten the script and pacing before generating the final cut. This is meant to show how AI tools can turn a simple idea into brand-ready video, quickly and affordably.", link: "https://res.cloudinary.com/dk1kmgcqn/video/upload/v1785066456/Create_a_realistic_second_v_tzv0el.mp4", video: "https://res.cloudinary.com/dk1kmgcqn/video/upload/v1785066456/Create_a_realistic_second_v_tzv0el.mp4" },
          { title: "AI Video Concept 2", tag: "AI Video", bio: "Another AI-generated video short, built end-to-end using Gemini, Google Flow and ChatGPT. I approach these the same way I'd approach a traditional video project, starting with a concept, iterating on the visual direction, and refining until the pacing and motion feel intentional rather than random. The real difference is the production speed AI tools allow compared to traditional video production. This one focuses on demonstrating fast, AI-assisted motion content that brands can use for social media.", link: "https://res.cloudinary.com/dk1kmgcqn/video/upload/v1785065960/Create_an_exactly_second_VE_ftdlzg.mp4", video: "https://res.cloudinary.com/dk1kmgcqn/video/upload/v1785065960/Create_an_exactly_second_VE_ftdlzg.mp4" },
          { title: "AI Video Concept 3", tag: "AI Video", bio: "A third AI video concept, showing how a simple idea can become brand-ready motion content using AI tools. I used Gemini and Google Flow for the visual generation, going through several rounds of prompting to get consistent style and motion, then used ChatGPT to help shape the narrative flow. These AI video experiments show how I'm expanding what I can offer clients, with fast, affordable motion content that doesn't need a full video production setup, and it's an area I'm continuing to explore.", link: "https://res.cloudinary.com/dk1kmgcqn/video/upload/v1785066615/Create_a_realistic_second_v_1_doyizs.mp4", video: "https://res.cloudinary.com/dk1kmgcqn/video/upload/v1785066615/Create_a_realistic_second_v_1_doyizs.mp4" }
        ]
      },
      {
        name: "Brand Identity",
        desc: "Logos, guidelines and visual systems built to hold up across every touchpoint.",
        projects: [
          { title: "Artham Infrastructure", tag: "Branding · Infrastructure", bio: "Artham Infrastructure needed a complete brand identity, including logo, colours and visual system, to represent a growing infrastructure company. I started by understanding their positioning in a competitive, mostly unbranded industry, then researched how larger infrastructure and construction brands build trust visually through strong, geometric marks and confident colour palettes. The logo and system were designed to feel stable and credible, since trust is everything in this industry. The final identity gives Artham a consistent look across every touchpoint, from documents to signage.", role: "Brand Designer", tools: ["Illustrator", "Photoshop"], img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786131011/15_xmiwvw.png", overview: "Designed a complete brand identity for Artham Infrastructure, including logo mark, colour palette and visual system built to feel solid, trustworthy and consistent across every touchpoint, from stationery to site signage.", gallery: [
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786131109/16_p4c2nh.png" },
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786131051/17_wihqa5.png" },
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786131302/18_h2hspk.png" },
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786131205/19_gfravp.png" }
          ] },
          { title: "Shri Amar Sai Resort", tag: "Branding · Hospitality", bio: "Shri Amar Sai Resort needed a brand identity that reflects hospitality and comfort rather than a corporate feel. I researched how resort and hospitality brands use warmer colours, softer typography and welcoming visual cues to build an emotional connection before a guest even arrives. The logo and colour system were designed to feel inviting and premium at the same time, matching the resort's positioning. This identity now runs consistently across their marketing material and signage.", role: "Brand Designer", tools: ["Illustrator", "Photoshop"], img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786131218/20_sayfit.png", overview: "Designed a complete brand identity for Shri Amar Sai Resort, including logo mark, colour palette and visual system built to feel warm and inviting, carrying the resort's identity consistently across signage, print and digital touchpoints.", gallery: [
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786131173/21_zmjcju.png" },
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786131233/22_egpp84.png" },
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786131296/24_jvlr8q.png" },
            { type: "image", src: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786131332/23_m4rhns.png" }
          ] },
          { title: "Bhavya Construction Management", tag: "Branding · Construction", bio: "Bhavya Construction Management needed a brand identity that communicates reliability and scale, tailored to their specific niche in project management. I researched competitor branding in the construction management space to find a visual gap, since most looked either too corporate or too generic, and designed a logo and colour system that feels modern without losing the industry's sense of seriousness. Every element was built to work at both large (signage) and small (business card) scale. The result positions Bhavya as a credible, professional player in a competitive market.", role: "Brand Designer", tools: ["Illustrator", "Photoshop"], img: "https://res.cloudinary.com/dk1kmgcqn/image/upload/v1786131809/th_uun4hp.png", overview: "Designed a complete brand identity for Bhavya Construction Management, including logo mark, colour palette and visual system built to feel professional and dependable across print, digital and site branding.", gallery: [
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
    intro: "Product Designer with 2+ years designing intuitive web and mobile products, backed by 4+ years in visual design. I take ideas from wireframe to shippable UI in Figma, build design systems that hold together, and hand off clean to developers, increasingly by building the front end myself.",
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
      { title: "Website Development", desc: "From Figma straight to a responsive, HTML/CSS/JS build, with no handoff gap." },
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
        desc: "Interfaces, flows and design systems, from low-fi wireframes to pixel-checked, production-ready screens.",
        mode: "link",
        projects: [
          { title: "Runway — Fashion App", tag: "UI/UX · Behance", bio: "Fashion app UX case study. Open on Behance for the full breakdown.", link: "https://www.behance.net/gallery/251691937/Runway-Fashion-App-UX-Case-Study", embed: "https://www.behance.net/embed/project/251691937?ilo0=1" },
          { title: "Bloom & Bliss — Plant E‑Commerce", tag: "UI/UX · Behance", bio: "Plant e-commerce UX/UI case study. Open on Behance for the full breakdown.", link: "https://www.behance.net/gallery/251696497/Bloom-Bliss-Plant-E-Commerce-UXUI-Case-Study", embed: "https://www.behance.net/embed/project/251696497?ilo0=1" },
          { title: "Cloud Raptor — Website Redesign", tag: "UI/UX · Behance", bio: "Website redesign case study. Open on Behance for the full breakdown.", link: "https://www.behance.net/gallery/251712263/Cloud-Raptor-Website-Redesign-Case-Study", embed: "https://www.behance.net/embed/project/251712263?ilo0=1" },
          { title: "Software Development Agency — Web UI/UX", tag: "UI/UX · Behance", bio: "Agency website UI/UX case study. Open on Behance for the full breakdown.", link: "https://www.behance.net/gallery/251750253/Software-Development-Agency-Web-UIUX-Case-Study", embed: "https://www.behance.net/embed/project/251750253?ilo0=1" },
          { title: "Montra — Personal Budgeting App", tag: "UI/UX · Behance", bio: "Budgeting app UI/UX case study. Open on Behance for the full breakdown.", link: "https://www.behance.net/gallery/253627387/Montra-Personal-Budgeting-App-UIUX-Case-Study", embed: "https://www.behance.net/embed/project/253627387?ilo0=1" },
          { title: "Education Website UI Design", tag: "UI/UX · Behance", bio: "Education website UI design case study. Open on Behance for the full breakdown.", link: "https://www.behance.net/gallery/248206611/Education-Website-UI-Design-Case-Study", embed: "https://www.behance.net/embed/project/248206611?ilo0=1" }
        ]
      },
      {
        name: "Website Development",
        desc: "From Figma straight to a responsive, HTML/CSS/JS build, with no handoff gap.",
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
          { title: "PawVerse", tag: "Demo Project · Pet Store", bio: "Premium pet store concept with shop, vet booking and adoption in one place.", link: "https://pawversepreiumpetstore.netlify.app/", simple: true, img: "img/projects/pawverse.jpg" },
          { title: "HopeRise", tag: "Demo Project · NGO", bio: "NGO concept site for a foundation running education, health and clean-water programs.", link: "https://hoperise-foundation-ngo-website.netlify.app/", simple: true, img: "img/projects/hoperise.jpg" },
          { title: "Lumea Beauty", tag: "Demo Project · Beauty", bio: "Vegan skincare brand concept with a clean, editorial storefront built to convert.", link: "https://lumeabeautybrandwebsite.netlify.app/", simple: true, img: "img/projects/lumea-beauty.jpg" }
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
  phone: "+91 9771604590",
  email: "bittu21126@gmail.com",
  site: "bittu-portfolio-delta.vercel.app",
  location: "India",
  education: [
    { school: "Lingayas Vidyapeeth, Faridabad", detail: "Bachelor of Technology", period: "2021 – 2025" },
    { school: "DAV Public School, Sec 4, Bokaro", detail: "12th", period: "2021" },
    { school: "KV No. 1, Sec 4, Bokaro", detail: "10th", period: "2019" }
  ],
  process: [
    { title: "Understand the Brief", desc: "Get the client's actual need, audience, budget and timeline clear, asking the right questions before opening any design tool." },
    { title: "Market & Audience Research", desc: "Study industry trends and how the target audience thinks and behaves, so the design works for the right people, not just looks nice." },
    { title: "Competitor Research", desc: "See what similar brands are doing, what's working and what's overused, and find a clear way to make the client stand out." },
    { title: "Concept & Moodboard", desc: "Pull references, colour and typography direction together and align with the client before committing to a full design." },
    { title: "Design & Iterate", desc: "Build the real thing in Illustrator, Photoshop or Figma, and refine it against feedback until layout, hierarchy and message all land." },
    { title: "Deliver & Support", desc: "Hand off final, production-ready files in the right formats and sizes, with follow-up support for any last tweaks." }
  ],
  testimonials: [
    { quote: "He is an exceptional graphic designer. His creativity, attention to detail, and ability to translate ideas into visually stunning designs are truly impressive, and he consistently delivers high-quality work, meets deadlines, and brings fresh, innovative perspectives to every project.", name: "Devashish Kumar", company: "Senior Engineer, Motherson Technology Services" },
    { quote: "Bittu is one of those rare creatives who just gets it. He has a sharp ability to understand the vision, sometimes before you've even fully explained it, and then brings it to life with precision and creativity.", name: "Aman Sharma", company: "Author, ERASED · managed Bittu directly" },
    { quote: "Bittu is insanely talented! His creativity, attention to detail, and ability to bring ideas to life are just next level. What I love most is how easy he is to work with: super adaptable, open to feedback, and always putting in the effort to make things even better.", name: "Mubaraka Kachwalla", company: "HR Executive, Bombay Tools Center" },
    { quote: "Bittu Rai is an exceptional Graphic Designer with a keen eye for detail and creativity. His ability to merge design with functionality sets him apart, making him a versatile asset to any team.", name: "Manish Kumar Sahu", company: "Java Software Engineer" }
  ],
  faqs: [
    { q: "What's your typical turnaround time?", a: "Most single assets are ready in 3–5 days. Full brand or product packages usually take 7–10 days, depending on scope. I'll give you a firm timeline before we start." },
    { q: "How many revisions do I get?", a: "Every package includes at least one revision round, with more on the larger tiers. If something's not landing after that, I keep refining until it's right, because I want you happy with the final files." },
    { q: "Do you work with clients outside India?", a: "Yes, I've worked with startups, NGOs and teams across time zones. Communication happens over email, WhatsApp or a quick call, whatever's easiest for you." },
    { q: "Can you handle both design and development?", a: "Yes. On the product side I take work from Figma through to a responsive HTML/CSS/JS build, so there's no handoff gap and nothing gets lost in translation." },
    { q: "How do we get started?", a: "Send a quick brief through the contact form or email: what you need, rough timeline and budget. I'll reply with next steps and a quote, usually within a day." },
    { q: "What if I'm not sure which package fits?", a: "Totally fine, tell me what you're trying to achieve and I'll recommend the right scope, even if it means suggesting something smaller than you asked for." }
  ]
};
