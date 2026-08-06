"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ImageItem {
  src: string;
  alt: string;
  title?: string;
  category?: string;
  description?: string;
}

interface PhoneCarouselProps {
  images: ImageItem[];
  autoPlayInterval?: number;
  autoPlay?: boolean;
  showControls?: boolean;
  className?: string;
}

export function PhoneCarousel({
  images,
  autoPlayInterval = 3500,
  autoPlay = true,
  showControls = true,
  className = "",
}: PhoneCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [direction, setDirection] = useState(1);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      handleNext();
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [isPlaying, autoPlayInterval, handleNext]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x < -swipeThreshold) {
      handleNext();
    } else if (info.offset.x > swipeThreshold) {
      handlePrev();
    }
  };

  const activeItem = images[currentIndex] || images[0];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0.2,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0.2,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  return (
    <div className={`flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-2 sm:px-4 ${className}`}>
      {/* Dynamic Item Header / Info */}
      {activeItem && (
        <div className="text-center mb-4 sm:mb-6 max-w-xl mx-auto min-h-[64px] sm:min-h-[70px] flex flex-col justify-center px-4">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {activeItem.category && (
              <span className="inline-block text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-primary mb-1">
                {activeItem.category}
              </span>
            )}
            <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground leading-tight">
              {activeItem.title || activeItem.alt}
            </h4>
            {activeItem.description && (
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
                {activeItem.description}
              </p>
            )}
          </motion.div>
        </div>
      )}

      {/* Main Mockup Carousel Container */}
      <div className="relative flex items-center justify-center w-full py-2 sm:py-4">
        {/* Navigation Arrow Left */}
        {showControls && (
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute left-1 sm:left-6 md:left-12 lg:left-24 z-20 rounded-full h-9 w-9 sm:h-11 sm:w-11 border-neutral-800 bg-background/80 backdrop-blur-md hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 shadow-xl shrink-0"
          >
            <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6" />
          </Button>
        )}

        {/* iPhone Mockup Frame with Swipe Gestures */}
        <div className="relative z-10 w-[230px] xs:w-[260px] sm:w-[300px] md:w-[320px] aspect-[9/19] rounded-[40px] sm:rounded-[48px] bg-neutral-950 p-2.5 sm:p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_8px_#1c1c1e,0_0_0_9px_#2c2c2e] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_12px_#1c1c1e,0_0_0_13px_#2c2c2e] border border-neutral-800/60 overflow-hidden group touch-pan-y">
          {/* Dynamic Island Notch */}
          <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 z-30 h-4 sm:h-5 w-20 sm:w-24 bg-black rounded-full flex items-center justify-between px-2 sm:px-2.5 shadow-inner">
            <div className="h-2 sm:h-2.5 w-2 sm:w-2.5 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center">
              <div className="h-0.5 sm:h-1 w-0.5 sm:w-1 rounded-full bg-blue-900/60" />
            </div>
            <div className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-neutral-900/80" />
          </div>

          {/* Screen Container */}
          <div className="relative w-full h-full rounded-[32px] sm:rounded-[38px] overflow-hidden bg-neutral-900 select-none cursor-grab active:cursor-grabbing">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src={activeItem.src}
                  alt={activeItem.alt}
                  className="w-full h-full object-cover object-top pointer-events-none"
                  loading="lazy"
                />
              </motion.div>
            </AnimatePresence>

            {/* Screen Glass Glare Sheen Overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent z-20" />
          </div>
        </div>

        {/* Navigation Arrow Right */}
        {showControls && (
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute right-1 sm:right-6 md:right-12 lg:right-24 z-20 rounded-full h-9 w-9 sm:h-11 sm:w-11 border-neutral-800 bg-background/80 backdrop-blur-md hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200 shadow-xl shrink-0"
          >
            <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6" />
          </Button>
        )}
      </div>

      {/* Pagination Indicators & Play Toggle */}
      <div className="flex items-center gap-3 mt-4 sm:mt-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>

        <div className="flex items-center gap-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                idx === currentIndex
                  ? "w-6 sm:w-8 h-2 sm:h-2.5 bg-primary"
                  : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-neutral-700 hover:bg-neutral-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
