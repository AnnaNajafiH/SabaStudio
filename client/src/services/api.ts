import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  Project, 
  Contact, 
  User, 
  ApiResponse, 
  PaginatedResponse, 
  ContactFormData,
  ProjectFormData 
} from '../types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: (import.meta as any).env?.VITE_API_URL || 'http://localhost:3003/api/v1',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized access
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/admin/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Health check
  async healthCheck(): Promise<ApiResponse> {
    const response: AxiosResponse<ApiResponse> = await this.api.get('/health');
    return response.data;
  }

  // Projects API
  async getProjects(params?: {
    page?: number;
    limit?: number;
    category?: string;
    status?: string;
  }): Promise<PaginatedResponse<Project>> {
    const response: AxiosResponse<ApiResponse<PaginatedResponse<Project>>> = 
      await this.api.get('/projects', { params });
    return response.data.data!;
  }

  async getProject(id: string): Promise<Project> {
    const response: AxiosResponse<ApiResponse<Project>> = 
      await this.api.get(`/projects/${id}`);
    return response.data.data!;
  }

  async createProject(data: ProjectFormData): Promise<Project> {
    const response: AxiosResponse<ApiResponse<Project>> = 
      await this.api.post('/projects', data);
    return response.data.data!;
  }

  async updateProject(id: string, data: Partial<ProjectFormData>): Promise<Project> {
    const response: AxiosResponse<ApiResponse<Project>> = 
      await this.api.put(`/projects/${id}`, data);
    return response.data.data!;
  }

  async deleteProject(id: string): Promise<void> {
    await this.api.delete(`/projects/${id}`);
  }

  // Contact API
  async submitContact(data: ContactFormData): Promise<Contact> {
    const response: AxiosResponse<ApiResponse<Contact>> = 
      await this.api.post('/contact', data);
    return response.data.data!;
  }

  async getContacts(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<PaginatedResponse<Contact>> {
    const response: AxiosResponse<ApiResponse<PaginatedResponse<Contact>>> = 
      await this.api.get('/contact', { params });
    return response.data.data!;
  }

  // Auth API
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const response: AxiosResponse<ApiResponse<{ user: User; token: string }>> = 
      await this.api.post('/auth/login', { email, password });
    return response.data.data!;
  }

  async getProfile(): Promise<User> {
    const response: AxiosResponse<ApiResponse<User>> = 
      await this.api.get('/auth/profile');
    return response.data.data!;
  }

  async logout(): Promise<void> {
    await this.api.post('/auth/logout');
  }

  // File upload
  async uploadFiles(files: FileList): Promise<string[]> {
    const formData = new FormData();
    Array.from(files).forEach(file => {
      formData.append('images', file);
    });

    const response: AxiosResponse<ApiResponse<{ files: Array<{ url: string }> }>> = 
      await this.api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

    return response.data.data!.files.map(file => file.url);
  }
}

export const apiService = new ApiService();
export default apiService;
