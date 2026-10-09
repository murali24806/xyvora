import { cn } from "@/lib/utils"
import { Avatar, AvatarImage } from "@/components/ui/avatar"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({ 
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  const Card = href ? 'a' : 'div'
  
  return (
    <Card
      {...(href ? { href, target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "flex flex-col justify-between rounded-2xl border border-black/5",
        "bg-white/60 backdrop-blur-md",
        "p-5 sm:p-6 text-start",
        "hover:border-purple-200 hover:bg-white hover:shadow-[0_10px_30px_rgba(168,85,247,0.1)]",
        "w-[280px] xs:w-[320px] sm:w-[360px] shrink-0",
        "transition-all duration-300 group cursor-pointer select-none",
        className
      )}
    >
      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-5 font-normal">
        &quot;{text}&quot;
      </p>
      
      <div className="flex items-center gap-3 pt-3.5 sm:pt-4 border-t border-gray-100">
        <Avatar className="h-10 w-10 sm:h-11 sm:w-11 border border-black/5 shadow-sm flex-shrink-0">
          <AvatarImage src={author.avatar} alt={author.name} />
        </Avatar>
        <div className="flex flex-col items-start min-w-0">
          <h3 className="text-xs sm:text-sm font-bold text-[#1f1f1f] leading-none group-hover:text-purple-600 transition-colors truncate w-full">
            {author.name}
          </h3>
          <p className="text-[11px] sm:text-xs text-indigo-500 mt-1 font-medium truncate w-full">
            {author.handle}
          </p>
        </div>
      </div>
    </Card>
  )
}
