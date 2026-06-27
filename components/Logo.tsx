import React from "react";
import Image from "next/image";

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <Image 
      src="/logo.svg" 
      alt="Xyvora Logo" 
      width={120} 
      height={120} 
      className={`object-contain ${className}`}
      priority
    />
  );
}
