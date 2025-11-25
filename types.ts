export interface Photo {
  id: number;
  src: string;
  category: string;
  title: string;
  width?: number; // Aspect ratio helper if needed
  height?: number;
}

export interface ServicePackage {
  title: string;
  price: string;
  description: string;
  features: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
}

export interface NavItem {
  label: string;
  path: string;
}