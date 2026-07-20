# Bittu Rai — Portfolio Website

A production-ready, multi-file portfolio built with vanilla HTML, CSS and JavaScript.
Showcasing UI/UX Design, Web Development, Vibe Coding, Graphic Design and Brand Design work.

🔗 **Live:** [bittu-portfolio-delta.vercel.app](https://bittu-portfolio-delta.vercel.app)
📩 **Contact:** bitturai21126@gmail.com
💼 **LinkedIn:** [linkedin.com/in/bitturai](https://www.linkedin.com/in/bitturai)

---

## ✨ Features

- Fully responsive — mobile, tablet and desktop
- Custom animated cursor + magnetic buttons
- GSAP scroll-triggered entrance animations
- Interactive 3D-tilt service cards with spotlight effect
- Behance project embeds (UI/UX work)
- Live website showcase cards (Web Development)
- Vibe-coded build previews
- Graphic & Brand design gallery with lightbox
- Hero orbit animation with project nodes
- Testimonials carousel
- Resume PDF download
- WhatsApp float button

---

## 🗂️ Project Structure

```
portfolio/
│
├── index.html               Semantic HTML5 markup — no inline CSS/JS
│
├── css/
│   ├── style.css             Design tokens, reset, layout, component styles
│   ├── responsive.css        All @media breakpoints (tablet, mobile, etc.)
│   └── animations.css        @keyframes + hover / interactive states
│
├── js/
│   ├── main.js               Data layer (projects, services, testimonials,
│   │                         process steps, icons) + app bootstrap
│   ├── navigation.js         Sticky nav + mobile hamburger menu
│   ├── cursor.js             Custom cursor, magnetic buttons, hero parallax
│   ├── modal.js              Services modal, gallery lightbox, orbit modal
│   ├── animations.js         Card renders, carousels, marquee, particles
│   └── gsap.js               GSAP entrance timeline + ScrollTrigger reveals
│
├── assets/
│   ├── images/               Project previews, gallery photos, portraits
│   ├── icons/                Client "trusted-by" logos
│   ├── fonts/                (Google Fonts via CDN — see dependencies)
│   ├── videos/               Reserved for future media
│   └── documents/            Résumé PDF (used by download button)
│
└── README.md
```

---

## 🌐 Live Projects Featured

### UI/UX Design (via Behance)
8 case studies embedded directly from Behance.

### Website Development
| Project | Description | Link |
|---|---|---|
| Cloud Raptor | Marketing site for a global cloud & digital-transformation consultancy | [Visit](https://cloud-raptor.com/) |
| Shobha Motive | Brand & product site for an AI automation and web studio | [Visit](https://shobhamotive.in/) |
| HireKra | Talent acquisition platform across India, UAE & United States | [Visit](https://hirekra.netlify.app/) |
| Lakshanam | Business advisory & consultancy site for startup founders | [Visit](https://luminous-sunshine-85e1de.netlify.app/) |

### Vibe Coding (AI-Powered Builds)
| Project | Description | Link |
|---|---|---|
| Social Shobha | AI content engine — plans, writes & schedules social posts | [Visit](https://social-shobha.lovable.app/) |
| ShobhaFlow | All-in-one shop management system for small retail teams | [Visit](https://bizkit-app.lovable.app/) |
| Shobha Motive Song | Daily devotional message product, vibe-coded end to end | [Visit](https://bhakti-vachan-shakti.lovable.app/) |

---

## ⚙️ How It's Wired Together

Every JS module (except `main.js`) only **defines** an `init...()` function.
`main.js` loads last and calls each one in order:

```
initMarquee() → initTestimonials() → initServiceModal() → initServiceCards()
→ initProcessSteps() → initNavigation() → initCursor() → initMagneticButtons()
→ initHeroParallax() → initHeroParticles() → initBackdropParticles()
→ initHeroTimeline() → initScrollReveals() → initOrbitModal() → initHeroOrbit()
```

`openServiceModal` and `openOrbitProject` are shared across files —
`modal.js` exposes them via `window.functionName` so `animations.js` can call them from click handlers.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic) |
| Styling | CSS3 (custom properties, flexbox, grid) |
| Scripting | Vanilla JavaScript (ES6+) |
| Animations | GSAP 3.12.5 + ScrollTrigger |
| Fonts | Google Fonts (Playfair Display, Inter, Space Grotesk, Poppins) |
| Hosting | Vercel |
| No build step | Static site — zero bundlers, zero frameworks |

---

## 🔗 External Dependencies (CDN)

- **Google Fonts:** Playfair Display, Inter, Space Grotesk, Poppins
- **GSAP 3.12.5 + ScrollTrigger** via `cdnjs.cloudflare.com`

The site works correctly (with animations gracefully degraded) if CDN resources are unreachable.

---

## 🚀 Running Locally

No build step required — it's a fully static site.

```bash
git clone https://github.com/YOUR_USERNAME/portfolio.git
cd portfolio
python3 -m http.server 8000
# Open http://localhost:8000
```

> **Note:** Some browsers restrict relative-path loading for `file://` URLs.
> A local server (like above) is recommended over opening `index.html` directly.

---

## 📋 To Add a New Web Dev Project

Open `js/main.js` and add an entry to the `WEBDEV_PROJECTS` array:

```js
{ 
  name: 'Project Name', 
  desc: 'Short description of the project.', 
  tech: ['HTML', 'CSS', 'JavaScript'], 
  url: 'https://your-project-url.com/', 
  live: true, 
  gradient: 'linear-gradient(135deg,#COLOR1,#COLOR2)', 
  img: 'assets/images/your-preview.jpg' 
}
```

Then update the `count` field in `SERVICES` (same file) to reflect the new total.

---

## 📬 Contact

| Channel | Details |
|---|---|
| Email | bitturai21126@gmail.com |
| Phone / WhatsApp | +91 91425 15509 |
| LinkedIn | [linkedin.com/in/bitturai](https://www.linkedin.com/in/bitturai) |
| Portfolio | [bittu-portfolio-delta.vercel.app](https://bittu-portfolio-delta.vercel.app) |

---

*Designed & developed by Bittu Rai — UI/UX Designer & Web Developer based in Delhi, India.*
