export interface Project {
  _id: string;
  title: string;
  description: string;
  fullDescription?: string;
  category: ProjectCategory;
  status: ProjectStatus;
  images: string[];
  thumbnailImage: string;
  client?: string;
  location: string;
  area?: number;
  year: number;
  budget?: number;
  tags: string[];
  featured: boolean;
  published: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export type ProjectCategory = 
  | 'residential' 
  | 'commercial' 
  | 'interior' 
  | 'landscape' 
  | 'renovation';

export type ProjectStatus = 
  | 'completed' 
  | 'in-progress' 
  | 'planning' 
  | 'on-hold';

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  subject?: string;
  status: ContactStatus;
  priority?: ContactPriority;
  source?: string;
  createdAt: string;
  updatedAt: string;
}

export type ContactStatus = 'new' | 'read' | 'replied' | 'closed';
export type ContactPriority = 'low' | 'medium' | 'high';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin';
  avatar?: string;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType?: ProjectType | '';
  budget?: BudgetRange | '';
  timeline?: Timeline | '';
  location?: string;
  subject?: string;
  message: string;
}

// Contact form specific types
export type ProjectType = 
  | 'Residential Design'
  | 'Commercial Architecture'
  | 'Interior Design'
  | 'Landscape Architecture'
  | 'Planning & Consulting'
  | 'Renovation/Addition'
  | 'Other';

export type BudgetRange = 
  | 'Under $100k'
  | '$100k - $250k'
  | '$250k - $500k'
  | '$500k - $1M'
  | '$1M - $2M'
  | 'Over $2M'
  | 'To be determined';

export type Timeline = 
  | 'ASAP'
  | '1-3 months'
  | '3-6 months'
  | '6-12 months'
  | '1+ years'
  | 'Flexible';

// Form submission status type for UI feedback
export type FormStatus = 'idle' | 'success' | 'error';

export interface ProjectFormData {
  title: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory;
  status: ProjectStatus;
  client?: string;
  location?: string;
  area?: number;
  year?: number;
  budget?: number;
  tags?: string[];
  features?: string[];
  isPublished: boolean;
  isFeatured: boolean;
}
