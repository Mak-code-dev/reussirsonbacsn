export interface Lesson {
  id: string;
  title: string;
  content: string; // Will store the fully cleaned lowercase text with proper HTML structural layout or custom display
  sections?: {
    subtitle?: string;
    paragraphs: string[];
  }[];
}

export type SubjectKey = 'hg' | 'philo' | 'francais' | 'anglais' | 'egen' | 'math' | 'svt' | 'pc';

export interface Subject {
  key: SubjectKey;
  label: string;
  badge: string;
  icon: string; // Lucide icon name
  color: string; // Tailwind class
  bgColor: string; // Tailwind bg class
  description: string;
  lessons: Lesson[];
}
