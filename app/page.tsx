import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import { GraphicSection } from "@/components/sections/Work";
import { UiuxSection, WebSection } from "@/components/sections/Showcase";
import Testimonials from "@/components/sections/Testimonials";
import Intro from "@/components/sections/Intro";
import Cursor from "@/components/motion/Cursor";
import { Marquee } from "@/components/motion/Type";
import { About, Services, Process, Experience, Skills, Education, Certifications, Brands } from "@/components/sections/About";
import Contact, { Footer } from "@/components/sections/Contact";

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
