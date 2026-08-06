import { cn } from "@/lib/utils"
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"

interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
}

export function TestimonialsSection({ 
  title,
  description,
  testimonials,
  className 
}: TestimonialsSectionProps) {
  return (
    <section className={cn(
      "bg-charcoal-950 text-white",
      "py-16 sm:py-24 md:py-32 px-0 relative overflow-hidden",
      className
    )}>
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-purple-600/10 rounded-full blur-[120px] sm:blur-[150px] pointer-events-none" />

      <div className="mx-auto flex max-w-container flex-col items-center gap-6 text-center sm:gap-12 relative z-10">
        <div className="flex flex-col items-center gap-2.5 px-4 sm:gap-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-1 sm:mb-2">
            <span>Verified Client Reviews</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            {title}
          </h2>
          <p className="text-gray-400 text-xs sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Marquee Container with Responsive Gaps and Speeds */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-2 sm:py-4">
          <div className="group flex overflow-hidden p-2 [--gap:1rem] sm:[--gap:1.5rem] [gap:var(--gap)] flex-row [--duration:30s] sm:[--duration:40s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused] active:[animation-play-state:paused]">
              {[...Array(4)].map((_, setIndex) => (
                testimonials.map((testimonial, i) => (
                  <TestimonialCard 
                    key={`${setIndex}-${i}`}
                    {...testimonial}
                  />
                ))
              ))}
            </div>
          </div>

          {/* Left/Right Edge Fades (Mobile & Desktop) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-36 bg-gradient-to-r from-charcoal-950 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-36 bg-gradient-to-l from-charcoal-950 to-transparent z-10" />
        </div>
      </div>
    </section>
  )
}
