import { ArrowRight, MapPin, CheckCircle2, Star, Sparkles, Code2, Palette, Rocket, Search } from "lucide-react";
import Link from "next/link";

export default function VizagLocalSEO() {
  const highlights = [
    {
      title: "Top-Rated Web Designers in Vizag",
      desc: "Delivering responsive, ultra-fast, and custom-crafted websites built on Next.js, React, and Tailwind CSS for Visakhapatnam businesses.",
      icon: Code2,
    },
    {
      title: "Custom UI/UX & Brand Identity",
      desc: "Transforming startups, shops, and enterprises across Vizag with striking logos, motion designs, and high-conversion landing pages.",
      icon: Palette,
    },
    {
      title: "Local SEO & High Google Ranking",
      desc: "Built-in speed optimization, local schema markup, and search engine strategies so Vizag customers discover your business first.",
      icon: Search,
    },
    {
      title: "End-to-End Digital Solutions",
      desc: "From e-commerce stores to custom business apps, video ads, and posters — we cover all digital growth needs under one roof.",
      icon: Rocket,
    },
  ];

  const popularSearches = [
    "Website Designers in Vizag",
    "Best Web Design Company in Visakhapatnam",
    "App Development Agency Vizag",
    "UI/UX Design Studio Vizag",
    "E-commerce Website Developers Vizag",
    "Digital Marketing & SEO Services Vizag",
    "Freelance Web Developer Vizag",
    "Poster & Logo Design Visakhapatnam",
  ];

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-[#070b24] to-background border-t border-white/5 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-[400px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs sm:text-sm font-medium mb-4">
            <MapPin className="w-3.5 h-3.5 text-purple-400" />
            <span>Serving Visakhapatnam (Vizag) & Global Brands</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Best Website Designers & Digital Agency in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              Vizag
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-300 font-normal leading-relaxed">
            Looking to dominate Google search and attract high-paying customers in Visakhapatnam? 
            XyvorA designs high-speed, modern websites and digital campaigns tailored specifically for business growth.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-purple-500/40 transition-all duration-300 shadow-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Local Keywords & Services Cloud for Google SEO */}
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-white/10 backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                Popular Web & Digital Services in Visakhapatnam
              </h3>
              <p className="text-sm text-gray-400 mt-1">
                Whether you run a local retail shop, restaurant, real estate agency, tech startup, or clinic in Vizag:
              </p>
            </div>
            <Link
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-sm shadow-lg transition-all"
            >
              <span>Get Free Vizag Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-2">
            {popularSearches.map((term, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm text-gray-300 hover:text-white hover:border-purple-400/50 hover:bg-purple-950/30 transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                {term}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
