export interface Project {
  id: string;
  title: string;
  category: string;
  badges: string[];
  description: string;
  longDescription: string;
  tags: string[];
  icon: string;
  githubUrl?: string;
  demoUrl?: string;
  codeSnippet?: string;
  features?: string[];
}

export interface SkillGroup {
  title: string;
  icon: string;
  type: 'soft' | 'tech';
  skills?: { name: string; icon?: string; level?: string }[];
  currentLearning?: { name: string; highlight?: boolean }[];
  futureRoadmap?: { name: string; highlight?: boolean }[];
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  institution: string;
  score?: string;
  status: 'current' | 'completed';
  icon: string;
  description?: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  location: string;
  college: string;
  github: string;
  linkedin: string;
}
