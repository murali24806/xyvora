import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import HoverFooter from "@/components/HoverFooter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio | XyvorA",
  description: "View our recent projects and creative work.",
};

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30 selection:text-white">
      <Navbar />
      <div className="pt-24">
        <Portfolio />
      </div>
      <HoverFooter />
    </main>
  );
}
