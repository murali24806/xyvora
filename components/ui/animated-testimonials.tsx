"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Quote, Star } from "lucide-react";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface AnimatedTestimonialsProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  testimonials?: Testimonial[];
  autoRotateInterval?: number;
  trustedCompanies?: string[];
  trustedCompaniesTitle?: string;
  className?: string;
}

export function AnimatedTestimonials({
  title = "Loved by the community",
  subtitle = "Don't just take our word for it. See what clients and companies have to say about working with XyvorA.",
  badgeText = "Client Testimonials",
  testimonials = [],
  autoRotateInterval = 6000,
  trustedCompanies = [],
  trustedCompaniesTitle = "Trusted by founders and growing brands",
  className,
}: AnimatedTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Refs for scroll animations
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Trigger animations when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Auto rotate testimonials
  useEffect(() => {
    if (autoRotateInterval <= 0 || testimonials.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [autoRotateInterval, testimonials.length]);

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} id="testimonials" className={`py-20 sm:py-24 overflow-hidden relative ${className || ""}`}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid grid-cols-1 gap-12 sm:gap-16 w-full lg:grid-cols-2 lg:gap-20 items-center"
        >
          {/* Left side: Heading and navigation */}
          <motion.div variants={itemVariants} className="flex flex-col justify-center">
            <div className="space-y-4 sm:space-y-6">
              {badgeText && (
                <div className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-[#6366f1]/10 text-[#4f46e5] border border-[#6366f1]/20">
                  <Star className="mr-1.5 h-3.5 w-3.5 fill-[#4f46e5] text-[#4f46e5]" />
                  <span>{badgeText}</span>
                </div>
              )}

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1c1917] leading-tight">
                {title}
              </h2>

              <p className="max-w-[600px] text-[#57534e] text-base sm:text-lg leading-relaxed">
                {subtitle}
              </p>

              <div className="flex items-center gap-3 pt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === index ? "w-10 bg-[#4f46e5]" : "w-2.5 bg-black/20 hover:bg-black/40"
                    }`}
                    aria-label={`View testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right side: Testimonial cards */}
          <motion.div variants={itemVariants} className="relative w-full min-h-[360px] sm:min-h-[380px] md:min-h-[420px]">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 80 }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  x: activeIndex === index ? 0 : 80,
                  scale: activeIndex === index ? 1 : 0.94,
                  pointerEvents: activeIndex === index ? "auto" : "none",
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ zIndex: activeIndex === index ? 10 : 0 }}
              >
                <div className="border border-black/10 shadow-xl rounded-2xl p-6 sm:p-8 h-full flex flex-col justify-between bg-white/90 backdrop-blur-xl">
                  <div>
                    <div className="mb-4 sm:mb-6 flex gap-1.5">
                      {Array(testimonial.rating)
                        .fill(0)
                        .map((_, i) => (
                          <Star key={i} className="h-4 sm:h-5 w-4 sm:w-5 fill-amber-400 text-amber-400" />
                        ))}
                    </div>

                    <div className="relative mb-6">
                      <Quote className="absolute -top-3 -left-2 h-8 w-8 text-[#4f46e5]/15 rotate-180" />
                      <p className="relative z-10 text-base sm:text-lg font-medium leading-relaxed text-[#1c1917]">
                        &quot;{testimonial.content}&quot;
                      </p>
                    </div>
                  </div>

                  <div>
                    <Separator className="my-4 bg-black/10" />

                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border border-black/10">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name || "Testimonial"} />
                        <AvatarFallback className="bg-[#4f46e5]/10 text-[#4f46e5] font-bold">
                          {testimonial.name?.charAt(0) || "X"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-[#1c1917] text-base">{testimonial.name || "Satisfied Client"}</h3>
                        <p className="text-xs sm:text-sm text-[#78716c]">
                          {testimonial.role || "Founder"}, <span className="text-[#4f46e5] font-medium">{testimonial.company || "XyvorA Partner"}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Decorative background aura */}
            <div className="absolute -bottom-6 -left-6 h-28 w-28 rounded-2xl bg-[#6366f1]/10 blur-xl pointer-events-none" />
            <div className="absolute -top-6 -right-6 h-28 w-28 rounded-2xl bg-amber-500/10 blur-xl pointer-events-none" />
          </motion.div>
        </motion.div>

        {/* Logo cloud */}
        {trustedCompanies.length > 0 && (
          <motion.div variants={itemVariants} initial="hidden" animate={controls} className="mt-16 sm:mt-24 text-center">
            <h3 className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#78716c] mb-8">{trustedCompaniesTitle}</h3>
            <div className="flex flex-wrap justify-center items-center gap-x-8 sm:gap-x-14 gap-y-6">
              {trustedCompanies.map((company) => (
                <div key={company} className="text-xl sm:text-2xl font-bold tracking-tight text-[#1c1917]/40 hover:text-[#1c1917]/80 transition-colors">
                  {company}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default AnimatedTestimonials;
