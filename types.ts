import { LucideIcon } from 'lucide-react';

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  tags: string[];
  category: 'ai' | 'mobile' | 'backend';
  imageUrl: string;
  link: string;
  year: string;
  client: string;
  role: string;
  challenges: string;
  solution: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullDescription: string;
  icon: string;
  features: string[];
  process: {
    title: string;
    description: string;
  }[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: LucideIcon;
}

export interface NavItem {
  label: string;
  path: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  content: string;
  category: string;
  imageUrl?: string;
}

export interface ContentData {
  hero: {
    greeting: string;
    title: string;
    subtitle: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    roles: string[];
  };
  about: {
    bio: string;
    experience: {
      year: string;
      role: string;
      company: string;
    }[];
    skills: {
      name: string;
      level: number;
      category: string;
    }[];
  };
  stats: {
    label: string;
    value: string;
    suffix?: string;
  }[];
  socials: SocialLink[];
  contact: {
    email: string;
    phone: string;
    address: string;
  };
}