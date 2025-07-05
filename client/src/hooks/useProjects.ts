// custom hooks "useProjects" and "useProject"
import { useState, useEffect } from 'react';
import { Project, PaginatedResponse } from '../types';
import { apiService } from '../services/api';

//UseProjects Hook
export const useProjects = (params?: {
  page?: number;
  limit?: number;
  category?: string;
  status?: string;
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: PaginatedResponse<Project> = await apiService.getProjects(params);
      setProjects(response.data);  // Get the projects array from response.data
      setPagination({
        total: response.total,
        page: response.page,
        limit: response.limit,
        totalPages: response.totalPages,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [params?.page, params?.limit, params?.category, params?.status]);

  const refetch = () => {
    fetchProjects();
  };

  return {
    projects,
    pagination,
    loading,
    error,
    refetch,
  };
};

//UseProject Hook
export const useProject = (id: string) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiService.getProject(id);
        setProject(response);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch project');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  return {
    project,
    loading,
    error,
  };
};
