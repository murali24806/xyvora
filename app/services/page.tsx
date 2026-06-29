import Navbar from "@/components/Navbar";
import Services from "@/components/Services";
import HoverFooter from "@/components/HoverFooter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | XyvorA",
  description: "Explore our range of smart creative solutions and digital marketing services.",
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30 selection:text-white">
      <Navbar />
      <div className="pt-24">
        <Services />
      </div>
      <HoverFooter />
    </main>
  );
}
