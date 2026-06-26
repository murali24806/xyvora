import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import HoverFooter from "@/components/HoverFooter";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30 selection:text-white">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Testimonials />
      <CTA />
      <Contact />
      <HoverFooter />
    </main>
  );
}
