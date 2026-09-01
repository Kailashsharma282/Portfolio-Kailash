export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription?: string;
  tags: string[];
  features: string[];
  metrics?: string;
  githubUrl: string;
  liveUrl?: string;
  category: 'ai' | 'backend' | 'systems' | 'fullstack';
  badge: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string;
  highlights: string[];
  technologies: string[];
  iconName: string;
  color: string;
}

export interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  organization: string;
  description: string;
  stat: string;
  statLabel: string;
  badge: string;
  color: string;
}

export interface CPProfile {
  platform: 'LeetCode' | 'Codeforces' | 'CodeChef';
  handle: string;
  maxRating: number | string;
  currentRating?: number | string;
  rank?: string;
  url: string;
  color: string;
  badge: string;
  stats: {
    label: string;
    value: string;
  }[];
}

export interface SkillCategory {
  title: string;
  iconName: string;
  color: string;
  skills: {
    name: string;
    level: number; // 0 - 100
    badge?: string;
  }[];
}

export interface Education {
  institution: string;
  degree: string;
  specialization: string;
  period: string;
  grade: string;
  location: string;
  highlights: string[];
  coursework?: string[];
}
