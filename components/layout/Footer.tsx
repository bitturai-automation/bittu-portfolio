import Link from "next/link";
import Logo from "@/components/layout/Logo";
import { SITE_URL, site } from "@/lib/data";
import { PROJECT_CATS } from "@/lib/routes";

export default function Footer() {
  const p = site.person;
  return (
    <footer className="sf">
      <div className="sf-top">
        <div className="sf-about">
          <Logo tone="dark" tagline />
          <p>{site.availabilityNote}</p>
        </div>
        <nav aria-label="Pages">
          <h3>Pages</h3>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/projects">Projects</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>
        <nav aria-label="Projects">
          <h3>Projects</h3>
          <ul>{PROJECT_CATS.map((c) => <li key={c.key}><Link href={c.href}>{c.title}</Link></li>)}</ul>
        </nav>
        <div>
          <h3>Connect</h3>
          <ul>
            <li><a href={`mailto:${p.email}`}>{p.email}</a></li>
            <li><a href={p.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
            <li><a href={SITE_URL}>Portfolio: {p.portfolio}</a></li>
            {Object.entries(p.socials).filter(([, u]) => u && !/^\s*todo/i.test(u)).map(([k, u]) => <li key={k}><a href={u} target="_blank" rel="noopener noreferrer" style={{ textTransform: "capitalize" }}>{k}</a></li>)}
          </ul>
        </div>
      </div>
      <div className="sf-bar">
        <span>© {p.year} {p.name}</span>
        <span>Designed &amp; built with AI-assisted workflows · India</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
