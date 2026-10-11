import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
import "./fluxora.css";
import SmoothScrollProvider from "@/components/providers/smooth-scroll-provider";

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.xyvora.co.in'),
  title: {
    default: "Best Website Designers in Vizag | XyvorA Web Design & Digital Agency",
    template: "%s | XyvorA",
  },
  description: "Looking for the best website designers in Vizag? XyvorA delivers high-converting website design, web development, app development, UI/UX, and digital branding in Visakhapatnam.",
  keywords: [
    "best website designers in vizag",
    "website designers in vizag",
    "web design company in vizag",
    "web developers in vizag",
    "website design visakhapatnam",
    "web development services vizag",
    "app development vizag",
    "ui ux designer vizag",
    "digital marketing agency vizag",
    "freelance web designer vizag",
    "ecommerce website design vizag",
    "XyvorA",
    "XyvorA Vizag",
  ],
  authors: [{ name: "XyvorA" }],
  creator: "XyvorA",
  publisher: "XyvorA",
  alternates: {
    canonical: 'https://www.xyvora.co.in',
  },
  openGraph: {
    title: "Best Website Designers in Vizag | XyvorA Agency",
    description: "Top-rated website design and development agency in Visakhapatnam (Vizag). Pixel-perfect web apps, brand identity, and high-converting websites.",
    url: "https://www.xyvora.co.in",
    siteName: "XyvorA",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Website Designers in Vizag | XyvorA",
    description: "Top-rated website design and digital solutions agency in Visakhapatnam (Vizag).",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "LocalBusiness"],
  "@id": "https://www.xyvora.co.in/#business",
  "name": "XyvorA - Best Website Designers in Vizag",
  "alternateName": "XyvorA Creative Studio & Web Agency",
  "url": "https://www.xyvora.co.in",
  "logo": "https://www.xyvora.co.in/icon.svg",
  "image": "https://www.xyvora.co.in/og-image.jpg",
  "telephone": "+91-7382183616",
  "email": "saipatnala248@gmail.com",
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Visakhapatnam",
    "addressLocality": "Visakhapatnam",
    "addressRegion": "Andhra Pradesh",
    "postalCode": "530001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "17.6868",
    "longitude": "83.2185"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Visakhapatnam"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Andhra Pradesh"
    },
    {
      "@type": "Country",
      "name": "India"
    }
  ],
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "20:00"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Web Design & Digital Services in Vizag",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Website Designing in Vizag",
          "description": "Custom, responsive, modern website design and web development in Visakhapatnam."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Web & Mobile App Development Vizag",
          "description": "Full-stack web apps and mobile applications built with Next.js, React, and modern technologies."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "UI/UX Design Vizag",
          "description": "High-converting product design, wireframing, and Figma prototypes for startups and businesses."
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Digital Marketing & Local SEO Vizag",
          "description": "Search engine optimization and digital marketing to rank local businesses on top of Google."
        }
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${jakarta.variable} ${outfit.variable} font-sans bg-background text-foreground antialiased selection:bg-primary/40 selection:text-white`}>
        <SmoothScrollProvider>
          {children}
          <GoogleAnalytics gaId="G-6Z2J40B37H" />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

