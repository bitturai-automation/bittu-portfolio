import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import { GraphicSection } from "@/components/Work";
import { UiuxSection, WebSection } from "@/components/Showcase";
import Testimonials from "@/components/Testimonials";
import Intro from "@/components/Intro";
import Cursor from "@/components/Cursor";
import { Marquee } from "@/components/Type";
import { About, Services, Process, Experience, Skills, Education, Certifications, Brands } from "@/components/About";
import Contact, { Footer } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Intro />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee items={["Product Design", "UI/UX", "AI-Assisted Websites", "Vibe Coding", "Brand Identity"]} />
        <UiuxSection />
        <WebSection />
        <Marquee tone="paper" dir={-1} items={["Figma to code", "Design systems", "Responsive builds", "Prototypes"]} />
        <GraphicSection />
        <About />
        <Services />
        <Process />
        <Experience />
        <Skills />
        <Education />
        <Certifications />
        <Brands />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
