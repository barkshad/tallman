import { Photo, ServicePackage, Testimonial } from './types';

export const APP_NAME = "LUMOS";
export const TAGLINE = "Capturing the Soul of the Moment";

export const PORTFOLIO_ITEMS: Photo[] = [
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

export const SERVICES: ServicePackage[] = [
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

export const TESTIMONIALS: Testimonial[] = [
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