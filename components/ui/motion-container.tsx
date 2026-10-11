"use client";

import React from "react";
import { motion, HTMLMotionProps, Variants } from "framer-motion";

interface FadeInProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
  className?: string;
  viewportOnce?: boolean;
}

export const fadeInVariants = (
  direction: "up" | "down" | "left" | "right" | "none" = "up",
  distance: number = 24
): Variants => {
  return {
    hidden: {
      opacity: 0,
      x: direction === "left" ? distance : direction === "right" ? -distance : 0,
      y: direction === "up" ? distance : direction === "down" ? -distance : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  };
};

export function FadeIn({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up",
  distance = 24,
  className = "",
  viewportOnce = true,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: viewportOnce, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      variants={fadeInVariants(direction, distance)}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export function StaggerContainer({
  children,
  className = "",
  viewportOnce = true,
  ...props
}: HTMLMotionProps<"div"> & { viewportOnce?: boolean }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: viewportOnce, margin: "-50px" }}
      variants={staggerContainerVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function HoverScale({
  children,
  scale = 1.03,
  tapScale = 0.97,
  className = "",
  ...props
}: HTMLMotionProps<"div"> & { scale?: number; tapScale?: number }) {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: tapScale }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
