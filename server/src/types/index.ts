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

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ContactData {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'replied';
  createdAt: Date;
}

export interface UserData {
  id: string;
  email: string;
  name: string;
  role: 'admin';
  createdAt: Date;
}
