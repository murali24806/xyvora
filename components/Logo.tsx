import React from "react";

export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Left Half (Dark Blue) */}
      <path 
        d="M25 20 L45 20 L50 50 L45 80 L25 80 L30 50 Z" 
        fill="#1e3a5f" 
      />
      {/* Right Half (Light Blue) */}
      <path 
        d="M75 20 L55 20 L50 50 L55 80 L75 80 L70 50 Z" 
        fill="#305e8c" 
      />
      {/* Center Linking Ring */}
      <circle 
        cx="50" 
        cy="50" 
        r="5" 
        stroke="#305e8c" 
        strokeWidth="2" 
        fill="none" 
      />
    </svg>
  );
}
