/* eslint-disable @next/next/no-img-element */
"use client"

import { motion, useScroll, useTransform, MotionValue } from "framer-motion"
import ReactLenis from "lenis/react"
import { useRef } from "react"

const projects = [
  {
    title: "Project 1",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
  },
  {
    title: "Project 2",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    title: "Project 3",
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
  },
  {
    title: "Project 4",
    src: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&q=80",
  },
  {
    title: "Project 5",
    src: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=800&q=80",
  },
]

const StickyCard_001 = ({
  i,
  title,
  src,
  progress,
  range,
  targetScale,
}: {
  i: number
  title: string
  src: string
  progress: MotionValue<number>
  range: [number, number]
  targetScale: number
}) => {
  const container = useRef<HTMLDivElement>(null)

  const scale = useTransform(progress, range, [1, targetScale])

  return (
    <div ref={container} className="sticky top-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 15 + 200}px)`,
        }}
        className="rounded-2xl sm:rounded-3xl lg:rounded-4xl relative -top-1/4 flex origin-top flex-col overflow-hidden
                   h-[200px] w-[280px] 
                   sm:h-[240px] sm:w-[360px] 
                   md:h-[280px] md:w-[420px] 
                   lg:h-[300px] lg:w-[500px]"
      >
        <img src={src || "/placeholder.svg"} alt={title} className="h-full w-full object-cover" />
      </motion.div>
    </div>
  )
}

const ImagesScrollingAnimation = () => {
  const container = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  })

  return (
    <ReactLenis root>
      <main
        ref={container}
        className="relative flex w-full flex-col items-center justify-center 
                                     pb-[50vh] pt-[5vh] 
                                     sm:pb-[60vh] sm:pt-[8vh] 
                                     lg:pb-[70vh] lg:pt-[10vh]"
      >
        {projects.map((project, i) => {
          const targetScale = Math.max(0.6, 1 - (projects.length - i - 1) * 0.08)
          return (
            <StickyCard_001
              key={`p_${i}`}
              i={i}
              {...project}
              progress={scrollYProgress}
              range={[i * 0.2, 1]}
              targetScale={targetScale}
            />
          )
        })}
      </main>
    </ReactLenis>
  )
}

export { ImagesScrollingAnimation, StickyCard_001 }
