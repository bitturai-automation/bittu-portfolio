"use client";
import Reveal from "@/components/motion/Reveal";
import { Split } from "@/components/motion/Type";
import { pad, site } from "@/lib/data";

/** Edit the questions and answers here. */
const FAQS: { q: string; a: string }[] = [
  { q: "What kind of work do you take on?", a: "Product UI/UX design, graphic design and visual branding for startups, agencies and NGOs, plus website design and development." },
  { q: "How does your pricing work?", a: "There are three plans. Graphic design is a monthly plan, UI design and website development are priced per project. Each plan has a price range, and the final number depends on the scope. See the pricing section above." },
  { q: "What do I get in the monthly graphic design plan?", a: "Between 10 and 20 static posts, 3 to 6 carousels and 5 to 10 stories every month, all in one consistent brand look." },
  { q: "Do you design and build the website too?", a: "Yes. I design the interface in Figma and can then build it as a live, responsive website, so the design reaches the final product intact." },
  { q: "How many pages are included in a UI design?", a: "A full website UI design covers up to 6 pages. If you need more, tell me and I’ll quote it." },
  { q: "Which tools do you use?", a: "Figma for UI/UX, Adobe Photoshop and Illustrator for graphics, HTML and CSS for websites, and AI tools to explore ideas and move faster without giving up craft." },
  { q: "How do we get started?", a: "Send me a short message by email or WhatsApp about what you need. I’ll reply with questions, a clear scope and a quote." },
  { q: "Can I see your past work and your resume?", a: "Yes. The projects section shows my UI/UX, graphic and website work, and you can download a resume for either role from the top of the page." },
];

export default function Faq() {
  const p = site.person;
  return (
    <section id="faq" className="sec dark fq-sec" aria-labelledby="fq-h">
      <div className="fq-wrap">
        <header className="fq-side">
          <p className="wb-eye"><i aria-hidden />FAQ</p>
          <Split as="h2" text="Questions, answered." className="wb-title fq-title" />
          <Reveal as="p" className="wb-sub" delay={0.1}>Can’t find what you’re looking for? Ask me directly.</Reveal>
          <Reveal className="fq-ask" y={16}>
            <a className="pill dark-pill" href={`mailto:${p.email}`}><span>Email me</span><b aria-hidden>↗</b></a>
            <a className="pr-quiet" href={p.whatsapp} target="_blank" rel="noopener noreferrer">or WhatsApp<span className="sr"> (opens in new tab)</span></a>
          </Reveal>
        </header>
        <h2 id="fq-h" className="sr">Frequently asked questions</h2>
        <ul className="fq-list">
          {FAQS.map((f, i) => (
            <Reveal as="li" key={f.q} y={26} delay={Math.min(i, 5) * 0.05}>
              <details className="fq-item" name="faq">
                <summary><span className="fq-no" aria-hidden>{pad(i + 1)}</span><span className="fq-q">{f.q}</span><i aria-hidden /></summary>
                <p>{f.a}</p>
              </details>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
