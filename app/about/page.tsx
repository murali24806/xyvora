import Navbar from "@/components/Navbar";
import HoverFooter from "@/components/HoverFooter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | XyvorA",
  description: "Learn more about XyvorA and our mission to elevate brands.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30 selection:text-white">
      <Navbar />
      <div className="pt-24 flex-grow flex items-center">
        <div className="w-full">
          <HoverFooter />
        </div>
      </div>
    </main>
  );
}
