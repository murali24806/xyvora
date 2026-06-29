import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import HoverFooter from "@/components/HoverFooter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | XyvorA",
  description: "Get in touch with XyvorA for your next creative project.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30 selection:text-white">
      <Navbar />
      <div className="pt-24">
        <Contact />
      </div>
      <HoverFooter />
    </main>
  );
}
