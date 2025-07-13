import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  Project, 
  Contact, 
  User, 
  ApiResponse, 
  PaginatedResponse, 
  ContactFormData,
  ProjectFormData,
  AuthResponse 
} from '../types';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({    
      baseURL: (import.meta as any).env?.VITE_API_URL || 'http://localhost:3003/api/v1',
      headers: {
        'Content-Type': 'application/json',   
      },
      withCredentials: true, // Important for cookies
    });

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error);
        return Promise.reject(error);
      }
    );
  }

  // Projects
  async getProjects(params?: {
    page?: number;
    limit?: number;
    category?: string;
    status?: string;
  }): Promise<PaginatedResponse<Project>> {
    const response = await this.api.get<ApiResponse<PaginatedResponse<Project>>>('/projects', { params });
    return response.data.data!;
  }

  async getProject(id: string): Promise<Project> {
    const response = await this.api.get<ApiResponse<Project>>(`/projects/${id}`);
    return response.data.data!;
  }

  private isFile(value: any): value is File {
    return value instanceof Blob && 'name' in value;
  }

  private appendFormData(formData: FormData, key: string, value: any): void {
    if (this.isFile(value)) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (this.isFile(item)) {
          formData.append(`${key}[${index}]`, item);
        } else if (item !== undefined) {
          formData.append(`${key}[${index}]`, String(item));
        }
      });
    } else if (value !== undefined) {
      formData.append(key, String(value));
    }
  }

  async createProject(data: ProjectFormData): Promise<Project> {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      this.appendFormData(formData, key, value);
    });

    const response = await this.api.post<ApiResponse<Project>>('/projects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data!;
  }

  async updateProject(id: string, data: Partial<ProjectFormData>): Promise<Project> {
    const formData = new FormData();
    
    Object.entries(data).forEach(([key, value]) => {
      this.appendFormData(formData, key, value);
    });

    const response = await this.api.put<ApiResponse<Project>>(`/projects/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data!;
  }

  async deleteProject(id: string): Promise<void> {
    await this.api.delete(`/projects/${id}`);
  }

  // Auth
  async signup(name: string, email: string, password: string, confirmPassword: string): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/signup', {
      name,
      email,
      password,
      confirmPassword
    });
    return response.data;
  }

  async signin(email: string, password: string): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>('/auth/login', {
      email,
      password
    });
    return response.data;
  }

  async signout(): Promise<void> {
    await this.api.post('/auth/logout');
  }

  async getProfile(): Promise<AuthResponse> {
    const response = await this.api.get<AuthResponse>('/auth/profile');
    return response.data;
  }

  // Contacts
  async submitContact(data: ContactFormData): Promise<Contact> {
    const response = await this.api.post<ApiResponse<Contact>>('/contact', data);
    return response.data.data!;
  }

  async getContacts(params?: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<PaginatedResponse<Contact>> {
    const response = await this.api.get<ApiResponse<PaginatedResponse<Contact>>>('/contact', { params });
    return response.data.data!;
  }
}

// Create a singleton instance
export const apiService = new ApiService();

// Also export the class for testing/mocking
export default ApiService;
