/**
 * Type declarations for Ambot365 Engineering application
 */

export interface ConstructionStage {
  id: number;
  name: string;
  description: string;
  depth: string; // e.g. "0m - 15m Base"
  progress: number; // 0 to 1
  stats: {
    label: string;
    value: string;
  }[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details: string[];
  techSpec: string;
  renderMode: 'wireframe' | 'xray' | 'thermal' | 'solid' | 'hologram';
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  location: string;
  completionYear: string;
  height: string;
  floors: string;
  investment: string;
  description: string;
  blueprintColor: string;
}

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  avatarUrl: string;
  rating: number;
}

export interface TimelineMilestone {
  id: number;
  title: string;
  phase: string;
  duration: string;
  details: string;
  activeDepth: number; // scroll percentage mark
}
