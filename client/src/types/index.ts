export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory;
  status: ProjectStatus;
  images: string[];
  thumbnail?: string;
  client?: string;
  location?: string;
  area?: number;
  year?: number;
  budget?: number;
  tags?: string[];
  features?: string[];
  isPublished: boolean;
  isFeatured: boolean;
  viewCount?: number;
  createdAt: string;
  updatedAt: string;
}

export type ProjectCategory = 
  | 'Residential' 
  | 'Commercial' 
  | 'Industrial' 
  | 'Landscape' 
  | 'Interior' 
  | 'Urban Planning';

export type ProjectStatus = 
  | 'Draft' 
  | 'In Progress' 
  | 'Under Review' 
  | 'Completed' 
  | 'Archived';

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
  status: 'success' | 'fail' | 'error';
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
  subject?: string;
  message: string;
}

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
