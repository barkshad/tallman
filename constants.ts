import { Photo, ServicePackage, Testimonial, SiteContent } from './types';

export const APP_NAME = "LUMOS";

// --- DEFAULT DATA (Fallbacks) ---

const DEFAULT_PORTFOLIO_ITEMS: Photo[] = [
  { id: 1, src: "https://picsum.photos/seed/101/800/1200", category: "Portrait", title: "Ethereal Gaze" },
  { id: 2, src: "https://picsum.photos/seed/205/1200/800", category: "Landscape", title: "Midnight Dunes" },
  { id: 3, src: "https://picsum.photos/seed/309/800/1000", category: "Fashion", title: "Urban Noir" },
  { id: 4, src: "https://picsum.photos/seed/412/800/1200", category: "Portrait", title: "Raw Emotion" },
  { id: 5, src: "https://picsum.photos/seed/550/1200/800", category: "Architecture", title: "Concrete Dreams" },
  { id: 6, src: "https://picsum.photos/seed/611/800/800", category: "Fashion", title: "Vogue Fall" },
  { id: 7, src: "https://picsum.photos/seed/732/800/1200", category: "Editorial", title: "The Artisan" },
  { id: 8, src: "https://picsum.photos/seed/898/1200/800", category: "Landscape", title: "Silent Peaks" },
  { id: 9, src: "https://picsum.photos/seed/999/800/1000", category: "Portrait", title: "Studio Light" },
];

const DEFAULT_SERVICES: ServicePackage[] = [
  {
    title: "Portrait Session",
    price: "$350",
    description: "Perfect for individuals, couples, or professional headshots.",
    features: ["2 Hour Session", "20 Retouched High-Res Images", "Online Gallery", "2 Outfit Changes"]
  },
  {
    title: "Event Coverage",
    price: "$1,200",
    description: "Comprehensive coverage for corporate events, parties, or galas.",
    features: ["Up to 6 Hours Coverage", "Full Event Gallery", "Next-Day Teasers", "Print Release"]
  },
  {
    title: "Editorial / Brand",
    price: "$2,500+",
    description: "High-end production for brands requiring a cinematic look.",
    features: ["Full Day Shoot", "Creative Direction", "Commercial Usage Rights", "Team Coordination"]
  }
];

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Art Director, Vogue",
    text: "Lumos has an incredible eye for light and composition. The photos delivered were nothing short of breathtaking."
  },
  {
    id: 2,
    name: "Marcus Thorne",
    role: "CEO, TechFlow",
    text: "Professional, punctual, and highly creative. We've used Lumos for all our corporate branding and couldn't be happier."
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Model",
    text: "I felt so comfortable during the shoot. The direction was clear, and the results speak for themselves."
  }
];

const DEFAULT_CONTENT: SiteContent = {
  tagline: "Capturing the Soul of the Moment",
  aboutImage: "https://picsum.photos/id/338/800/1200",
  contactEmail: "hello@lumos.photography",
  aboutText: [
    "Founded in 2018, LUMOS began with a simple philosophy: photography should feel less like a record and more like a memory. We strip away the unnecessary, focusing on raw emotion, composition, and the natural interplay of light.",
    "Our approach is distinctly minimalist and cinematic. Whether it's a high-fashion editorial or an intimate wedding, we bring a director's eye to every shoot. We don't just take pictures; we craft scenes that stand the test of time.",
    "Based in Los Angeles but available worldwide, we are seekers of beauty in the brutalist and the organic alike."
  ]
};

// --- STORAGE KEYS ---
export const KEYS = {
  PORTFOLIO: 'LUMOS_PORTFOLIO',
  SERVICES: 'LUMOS_SERVICES',
  TESTIMONIALS: 'LUMOS_TESTIMONIALS',
  CONTENT: 'LUMOS_CONTENT'
};

// --- LOAD DATA (With LocalStorage check) ---

const loadData = <T>(key: string, fallback: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (e) {
    console.error("Failed to load data from storage", e);
    return fallback;
  }
};

export const PORTFOLIO_ITEMS: Photo[] = loadData(KEYS.PORTFOLIO, DEFAULT_PORTFOLIO_ITEMS);
export const SERVICES: ServicePackage[] = loadData(KEYS.SERVICES, DEFAULT_SERVICES);
export const TESTIMONIALS: Testimonial[] = loadData(KEYS.TESTIMONIALS, DEFAULT_TESTIMONIALS);
export const SITE_CONTENT: SiteContent = loadData(KEYS.CONTENT, DEFAULT_CONTENT);
export const TAGLINE = SITE_CONTENT.tagline; // Backwards compatibility helper