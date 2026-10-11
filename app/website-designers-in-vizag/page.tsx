import Navbar from "@/components/Navbar";
import HoverFooter from "@/components/HoverFooter";
import Contact from "@/components/Contact";
import VizagLocalSEO from "@/components/VizagLocalSEO";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Laptop, Smartphone, Search, Compass, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Best Website Designers in Vizag | Top Web Design Company Visakhapatnam",
  description: "Looking for the best website designers in Vizag? XyvorA provides custom website design, web development, e-commerce, UI/UX, and local SEO services in Visakhapatnam.",
  keywords: [
    "best website designers in vizag",
    "website designers in vizag",
    "web design company in vizag",
    "visakhapatnam website developer",
    "web development services vizag",
    "top web design agency vizag",
    "ecommerce website design vizag",
    "freelance web designer vizag"
  ],
  alternates: {
    canonical: "https://www.xyvora.co.in/website-designers-in-vizag",
  },
};

export default function VizagLandingPage() {
  const serviceList = [
    {
      title: "Custom Corporate & Business Websites",
      desc: "Pixel-perfect, hyper-fast responsive websites tailored to convert visitors into clients across Visakhapatnam and Andhra Pradesh.",
      icon: Laptop,
    },
    {
      title: "E-Commerce Store Development",
      desc: "Robust online shopping stores with integrated payment gateways (UPI, Razorpay, Stripe) and inventory management.",
      icon: Smartphone,
    },
    {
      title: "Local Search Engine Optimization (SEO)",
      desc: "Dominating local search results so customers searching for your services in Vizag find you right at the top of Google.",
      icon: Search,
    },
    {
      title: "UI/UX & Creative Digital Branding",
      desc: "High-end visual design, brand guidelines, logo creation, and seamless interactive user flows.",
      icon: Compass,
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/30 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-[#0b0f4a] via-slate-950 to-background">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm font-semibold mb-6">
            <span>#1 Website Design & Digital Solutions in Visakhapatnam</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
            Best Website Designers in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              Vizag
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Grow your business with Visakhapatnam’s premier web design and creative agency. We build lightning-fast, conversion-focused websites that look stunning and rank at the top of Google search.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-base shadow-xl transition-all w-full sm:w-auto"
            >
              <span>Get a Free Vizag Website Quote</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+917382183616"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 backdrop-blur-md transition-all w-full sm:w-auto"
            >
              <span>Call Us: +91 73821 83616</span>
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Why Businesses in Vizag Choose XyvorA
          </h2>
          <p className="mt-3 text-gray-400">
            We don’t just create templates. We craft tailored digital experiences engineered to generate leads, calls, and sales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceList.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-purple-500/50 transition-all shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{service.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Vizag Local SEO Content & FAQ Section */}
      <VizagLocalSEO />

      {/* Contact Form */}
      <div id="contact">
        <Contact />
      </div>

      <HoverFooter />
    </main>
  );
}
