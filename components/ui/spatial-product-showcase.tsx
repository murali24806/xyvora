'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Sliders,
  ChevronRight,
  Zap,
  Bluetooth,
  Wifi,
  Music,
  Layout,
  Smartphone,
  PenTool,
  Palette,
  Camera,
  Video,
  Image as ImageIcon,
  Lightbulb,
  LucideIcon,
  Calendar,
  Sparkles,
} from 'lucide-react';

// =========================================
// 1. CONFIGURATION & DATA TYPES
// =========================================

export type ServiceId = 
  | 'web' 
  | 'app' 
  | 'uiux' 
  | 'logo' 
  | 'adshoot' 
  | 'motion' 
  | 'poster' 
  | 'brand';

export interface FeatureMetric {
  label: string;
  value: number; // 0-100
  icon: LucideIcon;
}

export interface ServiceData {
  id: ServiceId;
  label: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  colors: {
    gradient: string;
    glow: string;
    ring: string;
  };
  stats: {
    connectionStatus: string;
    batteryLevel: number;
    deliverableTime: string;
  };
  features: FeatureMetric[];
}

export const SERVICE_DATA: Record<ServiceId, ServiceData> = {
  web: {
    id: 'web',
    label: 'Web Dev',
    title: 'Website Designing',
    subtitle: 'High-Converting Next.js & Web Apps',
    description: 'Custom, responsive websites built to convert visitors into loyal customers. Fast performance, accessible design, and seamless CMS integration.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    colors: {
      gradient: 'from-blue-600 to-indigo-900',
      glow: 'bg-blue-500',
      ring: 'border-l-blue-500/50',
    },
    stats: { connectionStatus: 'Active Service', batteryLevel: 99, deliverableTime: '5-7 Days' },
    features: [
      { label: 'Page Speed Score', value: 98, icon: Zap },
      { label: 'SEO & Indexing', value: 95, icon: Wifi },
    ],
  },
  app: {
    id: 'app',
    label: 'App Dev',
    title: 'Mobile App Development',
    subtitle: 'iOS & Android Native Experience',
    description: 'High-performance, intuitive mobile applications built with React Native and Expo for smooth gesture interactions and offline sync.',
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    colors: {
      gradient: 'from-purple-600 to-violet-900',
      glow: 'bg-purple-500',
      ring: 'border-r-purple-500/50',
    },
    stats: { connectionStatus: 'Active Service', batteryLevel: 96, deliverableTime: '10-14 Days' },
    features: [
      { label: 'Frame Rate (FPS)', value: 96, icon: Smartphone },
      { label: 'API Latency (ms)', value: 92, icon: Zap },
    ],
  },
  uiux: {
    id: 'uiux',
    label: 'UI/UX Design',
    title: 'UI/UX Product Design',
    subtitle: 'User-Centered Interface Systems',
    description: 'Empathetic, research-backed design systems and interactive prototypes that elevate user engagement and simplify complex user flows.',
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    colors: {
      gradient: 'from-emerald-600 to-teal-900',
      glow: 'bg-emerald-500',
      ring: 'border-b-emerald-500/50',
    },
    stats: { connectionStatus: 'Active Service', batteryLevel: 98, deliverableTime: '3-5 Days' },
    features: [
      { label: 'User Satisfaction', value: 99, icon: PenTool },
      { label: 'System Consistency', value: 97, icon: Sliders },
    ],
  },
  logo: {
    id: 'logo',
    label: 'Logo Design',
    title: 'Logo & Visual Identity',
    subtitle: 'Iconic Brand Marks',
    description: 'Memorable brand marks, vector assets, and typography guidelines that encapsulate your core vision and stand out across print and digital media.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    colors: {
      gradient: 'from-amber-600 to-rose-900',
      glow: 'bg-amber-500',
      ring: 'border-t-amber-500/50',
    },
    stats: { connectionStatus: 'Active Service', batteryLevel: 100, deliverableTime: '2-4 Days' },
    features: [
      { label: 'Vector Versatility', value: 100, icon: Palette },
      { label: 'Brand Recognition', value: 94, icon: Sparkles },
    ],
  },
  adshoot: {
    id: 'adshoot',
    label: 'Ad Shooting',
    title: 'Product Photography & Shoot',
    subtitle: 'Studio-Grade Brand Visuals',
    description: 'Commercial video production, 4K product photography, and directed photo shoots tailored to elevate your ad campaigns and catalog.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    colors: {
      gradient: 'from-cyan-600 to-blue-900',
      glow: 'bg-cyan-500',
      ring: 'border-l-cyan-500/50',
    },
    stats: { connectionStatus: 'Active Service', batteryLevel: 94, deliverableTime: '4-7 Days' },
    features: [
      { label: '4K Ultra HD Clarity', value: 99, icon: Camera },
      { label: 'Lighting Quality', value: 96, icon: Zap },
    ],
  },
  motion: {
    id: 'motion',
    label: 'Motion Ads',
    title: 'Motion Design & Ads',
    subtitle: 'High-Converting Animated Ads',
    description: 'Attention-grabbing 2D/3D motion graphics, 60fps video reels, and promotional ad creatives built to maximize click-through rate.',
    image: 'https://images.unsplash.com/photo-1555529733-0e670560f7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    colors: {
      gradient: 'from-pink-600 to-rose-900',
      glow: 'bg-pink-500',
      ring: 'border-r-pink-500/50',
    },
    stats: { connectionStatus: 'Active Service', batteryLevel: 97, deliverableTime: '3-5 Days' },
    features: [
      { label: 'Engagement Rate', value: 95, icon: Video },
      { label: 'Render Quality', value: 98, icon: Music },
    ],
  },
  poster: {
    id: 'poster',
    label: 'Poster Design',
    title: 'Graphic Poster Design',
    subtitle: 'Print & Social Graphics',
    description: 'Striking key visuals, event posters, social media banners, and print graphics designed to command immediate visual attention.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    colors: {
      gradient: 'from-orange-600 to-amber-900',
      glow: 'bg-orange-500',
      ring: 'border-t-orange-500/50',
    },
    stats: { connectionStatus: 'Active Service', batteryLevel: 95, deliverableTime: '1-3 Days' },
    features: [
      { label: 'Visual Impact', value: 97, icon: ImageIcon },
      { label: 'Print DPI Accuracy', value: 100, icon: Sliders },
    ],
  },
  brand: {
    id: 'brand',
    label: 'Brand Strategy',
    title: 'Brand Positioning & Growth',
    subtitle: 'Comprehensive Identity System',
    description: 'Strategic market positioning, competitor analysis, tone of voice, and long-term roadmap designed to scale your business sustainably.',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    colors: {
      gradient: 'from-indigo-600 to-purple-900',
      glow: 'bg-indigo-500',
      ring: 'border-b-indigo-500/50',
    },
    stats: { connectionStatus: 'Active Service', batteryLevel: 99, deliverableTime: '5-10 Days' },
    features: [
      { label: 'Market Differentiation', value: 96, icon: Lightbulb },
      { label: 'ROI Growth Rate', value: 92, icon: Bluetooth },
    ],
  },
};

// =========================================
// 2. ANIMATION VARIANTS
// =========================================

const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 15, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 120, damping: 20 },
    },
    exit: { opacity: 0, y: -10, filter: 'blur(4px)' },
  },
  image: (isLeft: boolean): Variants => ({
    initial: {
      opacity: 0,
      scale: 1.15,
      filter: 'blur(12px)',
      rotate: isLeft ? -12 : 12,
      x: isLeft ? -40 : 40,
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      rotate: 0,
      x: 0,
      transition: { type: 'spring', stiffness: 220, damping: 22 },
    },
    exit: {
      opacity: 0,
      scale: 0.75,
      filter: 'blur(15px)',
      transition: { duration: 0.25 },
    },
  }),
};

// =========================================
// 3. SUB-COMPONENTS
// =========================================

const BackgroundGradient = ({ isLeft }: { isLeft: boolean }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <motion.div
      animate={{
        background: isLeft
          ? 'radial-gradient(circle at 10% 50%, rgba(109, 40, 217, 0.18), transparent 60%)'
          : 'radial-gradient(circle at 90% 50%, rgba(16, 185, 129, 0.18), transparent 60%)',
      }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0"
    />
  </div>
);

const ProductVisual = ({ data, isLeft }: { data: ServiceData; isLeft: boolean }) => (
  <motion.div layout="position" className="relative group shrink-0 my-2 md:my-0">
    {/* Animated Rings */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
      className={`absolute inset-[-10%] xs:inset-[-15%] sm:inset-[-20%] rounded-full border border-dashed border-white/10 ${data.colors.ring}`}
    />
    <motion.div
      animate={{ scale: [1, 1.04, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className={`absolute inset-0 rounded-full bg-gradient-to-br ${data.colors.gradient} blur-2xl opacity-35`}
    />

    {/* Image Container */}
    <div className="relative h-56 w-56 xs:h-64 xs:w-64 sm:h-80 sm:w-80 md:h-[380px] md:w-[380px] lg:h-[420px] lg:w-[420px] rounded-3xl border border-white/10 shadow-2xl flex items-center justify-center overflow-hidden bg-black/40 backdrop-blur-md">
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
        className="relative z-10 w-full h-full flex items-center justify-center p-2.5 sm:p-4"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={data.id}
            src={data.image}
            alt={data.title}
            variants={ANIMATIONS.image(isLeft)}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full object-cover rounded-2xl drop-shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
            draggable={false}
          />
        </AnimatePresence>
      </motion.div>
    </div>

    {/* Status Label */}
    <motion.div
      layout="position"
      className="absolute -bottom-5 sm:-bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap z-20"
    >
      <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs uppercase tracking-widest text-zinc-300 bg-zinc-950/90 px-3 sm:px-4 py-1.5 rounded-full border border-white/10 backdrop-blur shadow-lg">
        <span className={`h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full ${data.colors.glow} animate-pulse`} />
        <span>{data.stats.connectionStatus}</span>
        <span className="text-zinc-600">•</span>
        <span className="text-primary font-mono">{data.stats.deliverableTime}</span>
      </div>
    </motion.div>
  </motion.div>
);

const ProductDetails = ({ 
  data, 
  isLeft,
  onBookSlot,
}: { 
  data: ServiceData; 
  isLeft: boolean;
  onBookSlot?: (title: string) => void;
}) => {
  const alignClass = isLeft ? 'items-start text-left' : 'items-start md:items-end text-left md:text-right';
  const flexDirClass = isLeft ? 'flex-row' : 'flex-row md:flex-row-reverse';
  const barColorClass = isLeft ? 'left-0 bg-primary' : 'right-0 md:left-auto bg-purple-500';

  return (
    <motion.div
      variants={ANIMATIONS.container}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`flex flex-col ${alignClass} w-full`}
    >
      <motion.h2 variants={ANIMATIONS.item} className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-primary mb-1.5 sm:mb-2">
        {data.subtitle}
      </motion.h2>
      <motion.h1 variants={ANIMATIONS.item} className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2.5 sm:mb-3 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400">
        {data.title}
      </motion.h1>
      <motion.p variants={ANIMATIONS.item} className={`text-zinc-400 text-xs sm:text-base mb-5 sm:mb-6 leading-relaxed max-w-md ${isLeft ? 'mr-auto' : 'ml-auto'}`}>
        {data.description}
      </motion.p>

      {/* Feature Grid */}
      <motion.div variants={ANIMATIONS.item} className="w-full space-y-4 sm:space-y-5 bg-zinc-900/60 p-4 sm:p-6 rounded-2xl border border-white/10 backdrop-blur-md shadow-xl">
        {data.features.map((feature, idx) => (
          <div key={feature.label} className="group">
            <div className={`flex items-center justify-between mb-2 text-xs sm:text-sm ${flexDirClass}`}>
              <div className={`flex items-center gap-2 ${feature.value > 50 ? 'text-zinc-200' : 'text-zinc-400'}`}>
                <feature.icon size={16} className="text-primary" /> <span>{feature.label}</span>
              </div>
              <span className="font-mono text-xs text-zinc-400">{feature.value}%</span>
            </div>
            <div className="relative h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${feature.value}%` }}
                transition={{ duration: 1, delay: 0.3 + idx * 0.15 }}
                className={`absolute top-0 bottom-0 ${barColorClass} opacity-90`}
              />
            </div>
          </div>
        ))}

        <div className={`pt-2 sm:pt-3 flex ${isLeft ? 'justify-start' : 'justify-start md:justify-end'} gap-3 flex-wrap`}>
          {onBookSlot && (
            <button
              type="button"
              onClick={() => onBookSlot(data.title)}
              className="w-full xs:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white text-xs sm:text-sm font-semibold hover:shadow-[0_0_20px_rgba(109,40,217,0.4)] transition-all group"
            >
              <Calendar size={15} /> Book Slot
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const Switcher = ({ 
  activeId, 
  onToggle 
}: { 
  activeId: ServiceId; 
  onToggle: (id: ServiceId) => void 
}) => {
  const options = Object.values(SERVICE_DATA).map(p => ({ id: p.id, label: p.label }));
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full flex justify-center mt-6 sm:mt-10 z-30 px-2">
      <div 
        ref={scrollRef}
        className="flex items-center gap-1 sm:gap-1.5 p-1.5 rounded-full bg-zinc-900/90 backdrop-blur-2xl border border-white/10 shadow-2xl overflow-x-auto max-w-full touch-pan-x scrollbar-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {options.map((opt) => (
          <motion.button
            key={opt.id}
            onClick={() => onToggle(opt.id)}
            whileTap={{ scale: 0.95 }}
            className="relative px-3 sm:px-4 h-8 sm:h-11 rounded-full flex items-center justify-center text-[11px] sm:text-xs font-medium focus:outline-none whitespace-nowrap shrink-0 transition-colors"
          >
            {activeId === opt.id && (
              <motion.div
                layoutId="service-island-surface"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-purple-600 shadow-md"
                transition={{ type: 'spring', stiffness: 250, damping: 24 }}
              />
            )}
            <span className={`relative z-10 transition-colors duration-300 ${activeId === opt.id ? 'text-white font-semibold' : 'text-zinc-400 hover:text-zinc-200'}`}>
              {opt.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

// =========================================
// 4. MAIN COMPONENT
// =========================================

interface SpatialServiceShowcaseProps {
  onBookSlot?: (serviceTitle: string) => void;
}

export default function SpatialServiceShowcase({ onBookSlot }: SpatialServiceShowcaseProps) {
  const [activeSide, setActiveSide] = useState<ServiceId>('web');
  
  const currentData = SERVICE_DATA[activeSide];
  const isLeft = activeSide === 'web' || activeSide === 'uiux' || activeSide === 'adshoot' || activeSide === 'poster';

  return (
    <div className="relative min-h-[580px] sm:min-h-[620px] w-full bg-transparent text-zinc-100 selection:bg-primary/30 flex flex-col items-center justify-center py-4 sm:py-6">
      
      <BackgroundGradient isLeft={isLeft} />

      <main className="relative z-10 w-full px-3 xs:px-4 sm:px-6 flex flex-col justify-center max-w-7xl mx-auto">
        <motion.div
          layout
          transition={{ type: 'spring', bounce: 0, duration: 0.8 }}
          className={`flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-8 md:gap-16 lg:gap-24 w-full ${
            isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
          }`}
        >
          {/* Visual Column */}
          <ProductVisual data={currentData} isLeft={isLeft} />

          {/* Details Column */}
          <motion.div layout="position" className="w-full max-w-lg">
            <AnimatePresence mode="wait">
              <ProductDetails 
                key={activeSide}
                data={currentData} 
                isLeft={isLeft}
                onBookSlot={onBookSlot}
              />
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </main>

      <Switcher activeId={activeSide} onToggle={setActiveSide} />
    </div>
  );
}
