"use client";

import React from "react";
import {
  ImageItem,
  PhoneCarousel,
} from "@/components/ui/phone-mockups-1-utils/phone-carousel";

const exampleImages: ImageItem[] = [
  {
    src: "https://res.cloudinary.com/harshitproject/image/upload/v1746774805/Behance-screen.png",
    alt: "Behance app on iPhone",
    title: "Behance Portfolio App",
    category: "Mobile Design & UI/UX",
    description: "Showcasing creative portfolios with modern fluid gestures.",
  },
  {
    src: "https://res.cloudinary.com/harshitproject/image/upload/v1746774805/Notion-screen.png",
    alt: "Notion app on iPhone",
    title: "Notion Workspace Dashboard",
    category: "Productivity & SaaS",
    description: "Minimalist workspace layout for document collaboration.",
  },
  {
    src: "https://res.cloudinary.com/harshitproject/image/upload/v1746774806/One-screen.png",
    alt: "One app on iPhone",
    title: "One Mobile Banking",
    category: "Fintech Platform",
    description: "Secure, modern financial transactions and card management.",
  },
  {
    src: "https://res.cloudinary.com/harshitproject/image/upload/v1746774807/Reddit-nj7hwh.png",
    alt: "Reddit app on iPhone",
    title: "Reddit Community App",
    category: "Social Media & Tech",
    description: "High-density content feed with dark theme styling.",
  },
];

export default function PhoneMockupBasic() {
  return <PhoneCarousel images={exampleImages} />;
}
