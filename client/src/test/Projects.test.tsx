import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Projects from '../pages/Projects';
import * as useProjectsHook from '../hooks/useProjects';
import { Project } from '../types';

// Mock the useProjects hook
vi.mock('../hooks/useProjects');

// Mock project data
const mockProjects: Project[] = [
  {
    _id: '1',
    title: 'Modern Glass House',
    description: 'A stunning glass house with modern architecture',
    category: 'residential',
    slug: 'modern-glass-house',
    images: ['https://example.com/image1.jpg'],
    thumbnailImage: 'https://example.com/thumb1.jpg',
    featured: true,
    status: 'completed',
    location: 'Los Angeles, CA',
    year: 2023,
    area: 2500,
    tags: ['modern', 'glass', 'sustainable'],
    client: 'John Doe',
    fullDescription: 'A full description of the project',
    published: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  },
  {
    _id: '2',
    title: 'Urban Office Complex',
    description: 'Contemporary office space in downtown',
    category: 'commercial',
    slug: 'urban-office-complex',
    images: ['https://example.com/image2.jpg'],
    thumbnailImage: 'https://example.com/thumb2.jpg',
    featured: false,
    status: 'in-progress',
    location: 'New York, NY',
    year: 2024,
    area: 15000,
    tags: ['commercial', 'urban', 'office'],
    client: 'ABC Corp',
    fullDescription: 'A modern office complex',
    published: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  },
  {
    _id: '3',
    title: 'Luxury Resort',
    description: 'Five-star resort with ocean views',
    category: 'interior',
    slug: 'luxury-resort',
    images: ['https://example.com/image3.jpg'],
    thumbnailImage: 'https://example.com/thumb3.jpg',
    featured: false,
    status: 'planning',
    location: 'Miami, FL',
    year: 2022,
    area: 50000,
    tags: ['luxury', 'resort', 'hospitality'],
    client: 'Resort Group',
    fullDescription: 'A luxury resort experience',
    published: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z'
  }
];

// Component wrapper with Router
const ProjectsWrapper = () => (
  <BrowserRouter>
    <Projects />
  </BrowserRouter>
);

describe('Projects Component', () => {
  const mockUseProjects = vi.mocked(useProjectsHook.useProjects);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Loading State', () => {
    it('should display loading spinner when loading is true', () => {
      mockUseProjects.mockReturnValue({
        projects: [],
        pagination: { total: 0, page: 1, limit: 12, totalPages: 0 },
        loading: true,
        error: null,
        refetch: vi.fn()
      });

      render(<ProjectsWrapper />);
      
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('should display error message when there is an error', () => {
      mockUseProjects.mockReturnValue({
        projects: [],
        pagination: { total: 0, page: 1, limit: 12, totalPages: 0 },
        loading: false,
        error: 'Failed to fetch projects',
        refetch: vi.fn()
      });

      render(<ProjectsWrapper />);
      
      expect(screen.getByText('Unable to load projects')).toBeInTheDocument();
      expect(screen.getByText('Please try again later or contact support if the problem persists.')).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('should display no projects message when there are no projects', () => {
      mockUseProjects.mockReturnValue({
        projects: [],
        pagination: { total: 0, page: 1, limit: 12, totalPages: 0 },
        loading: false,
        error: null,
        refetch: vi.fn()
      });

      render(<ProjectsWrapper />);
      
      expect(screen.getByText('No projects found')).toBeInTheDocument();
      expect(screen.getByText('Try adjusting your search or filter criteria.')).toBeInTheDocument();
    });
  });

  describe('Projects Display', () => {
    beforeEach(() => {
      mockUseProjects.mockReturnValue({
        projects: mockProjects,
        pagination: { total: 3, page: 1, limit: 60, totalPages: 1 },
        loading: false,
        error: null,
        refetch: vi.fn()
      });
    });

    it('should render the hero section', () => {
      render(<ProjectsWrapper />);
      
      expect(screen.getByText('Our Projects')).toBeInTheDocument();
      expect(screen.getByText(/Explore our portfolio of innovative architectural solutions/)).toBeInTheDocument();
    });

    it('should display all projects', () => {
      render(<ProjectsWrapper />);
      
      expect(screen.getByText('Modern Glass House')).toBeInTheDocument();
      expect(screen.getByText('Urban Office Complex')).toBeInTheDocument();
      expect(screen.getByText('Luxury Resort')).toBeInTheDocument();
    });

    it('should display project details correctly', () => {
      render(<ProjectsWrapper />);
      
      // Check first project details
      expect(screen.getByText('Modern Glass House')).toBeInTheDocument();
      expect(screen.getByText('A stunning glass house with modern architecture')).toBeInTheDocument();
      expect(screen.getByText('Los Angeles, CA')).toBeInTheDocument();
      expect(screen.getByText('2023')).toBeInTheDocument();
      expect(screen.getByText('residential')).toBeInTheDocument();
      expect(screen.getByText('Featured')).toBeInTheDocument(); // Only one project is featured now
      expect(screen.getByText('completed')).toBeInTheDocument();
    });

    it('should display project tags', () => {
      render(<ProjectsWrapper />);
      
      // Check tags for first project
      expect(screen.getByText('modern')).toBeInTheDocument();
      expect(screen.getByText('glass')).toBeInTheDocument();
      expect(screen.getByText('sustainable')).toBeInTheDocument();
    });

    it('should display results count', () => {
      render(<ProjectsWrapper />);
      
      expect(screen.getByText('Showing 3 of 3 projects')).toBeInTheDocument();
    });
  });

  describe('Search Functionality', () => {
    beforeEach(() => {
      mockUseProjects.mockReturnValue({
        projects: mockProjects,
        pagination: { total: 3, page: 1, limit: 60, totalPages: 1 },
        loading: false,
        error: null,
        refetch: vi.fn()
      });
    });

    it('should render search input', () => {
      render(<ProjectsWrapper />);
      
      const searchInput = screen.getByPlaceholderText('Search projects...');
      expect(searchInput).toBeInTheDocument();
    });

    it('should filter projects by search term in title', async () => {
      render(<ProjectsWrapper />);
      
      const searchInput = screen.getByPlaceholderText('Search projects...');
      fireEvent.change(searchInput, { target: { value: 'Modern' } });

      await waitFor(() => {
        expect(screen.getByText('Modern Glass House')).toBeInTheDocument();
        expect(screen.queryByText('Urban Office Complex')).not.toBeInTheDocument();
        expect(screen.queryByText('Luxury Resort')).not.toBeInTheDocument();
      });
    });

    it('should filter projects by search term in description', async () => {
      render(<ProjectsWrapper />);
      
      const searchInput = screen.getByPlaceholderText('Search projects...');
      fireEvent.change(searchInput, { target: { value: 'office' } });

      await waitFor(() => {
        expect(screen.queryByText('Modern Glass House')).not.toBeInTheDocument();
        expect(screen.getByText('Urban Office Complex')).toBeInTheDocument();
        expect(screen.queryByText('Luxury Resort')).not.toBeInTheDocument();
      });
    });

    it('should filter projects by search term in tags', async () => {
      render(<ProjectsWrapper />);
      
      const searchInput = screen.getByPlaceholderText('Search projects...');
      fireEvent.change(searchInput, { target: { value: 'luxury' } });

      await waitFor(() => {
        expect(screen.queryByText('Modern Glass House')).not.toBeInTheDocument();
        expect(screen.queryByText('Urban Office Complex')).not.toBeInTheDocument();
        expect(screen.getByText('Luxury Resort')).toBeInTheDocument();
      });
    });
  });

  describe('Category Filtering', () => {
    beforeEach(() => {
      mockUseProjects.mockReturnValue({
        projects: mockProjects,
        pagination: { total: 3, page: 1, limit: 60, totalPages: 1 },
        loading: false,
        error: null,
        refetch: vi.fn()
      });
    });

    it('should render category filter buttons', () => {
      render(<ProjectsWrapper />);
      
      expect(screen.getByText('All')).toBeInTheDocument();
      expect(screen.getByText('Residential')).toBeInTheDocument();
      expect(screen.getByText('Commercial')).toBeInTheDocument();
      expect(screen.getByText('Interior')).toBeInTheDocument();
      expect(screen.getByText('Landscape')).toBeInTheDocument();
      expect(screen.getByText('Renovation')).toBeInTheDocument();
    });

    it('should filter projects by category', async () => {
      render(<ProjectsWrapper />);
      
      const commercialButton = screen.getByText('Commercial');
      fireEvent.click(commercialButton);

      await waitFor(() => {
        expect(screen.queryByText('Modern Glass House')).not.toBeInTheDocument();
        expect(screen.getByText('Urban Office Complex')).toBeInTheDocument();
        expect(screen.queryByText('Luxury Resort')).not.toBeInTheDocument();
      });
    });

    it('should show all projects when "All" is selected', async () => {
      render(<ProjectsWrapper />);
      
      // First filter by commercial
      const commercialButton = screen.getByText('Commercial');
      fireEvent.click(commercialButton);

      // Then click "All"
      const allButton = screen.getByText('All');
      fireEvent.click(allButton);

      await waitFor(() => {
        expect(screen.getByText('Modern Glass House')).toBeInTheDocument();
        expect(screen.getByText('Urban Office Complex')).toBeInTheDocument();
        expect(screen.getByText('Luxury Resort')).toBeInTheDocument();
      });
    });

    it('should highlight selected category button', async () => {
      render(<ProjectsWrapper />);
      
      const residentialButton = screen.getByText('Residential');
      fireEvent.click(residentialButton);

      await waitFor(() => {
        expect(residentialButton).toHaveClass('bg-primary-900', 'text-white');
      });
    });
  });

  describe('Load More Functionality', () => {
    it('should show load more buttons when there are more projects than displayed', () => {
      // Create array of 15 projects to test pagination
      const manyProjects: Project[] = Array.from({ length: 15 }, (_, i) => ({
        ...mockProjects[0],
        _id: `project-${i}`,
        title: `Project ${i + 1}`,
        slug: `project-${i + 1}`
      }));

      mockUseProjects.mockReturnValue({
        projects: manyProjects,
        pagination: { total: 15, page: 1, limit: 60, totalPages: 1 },
        loading: false,
        error: null,
        refetch: vi.fn()
      });

      render(<ProjectsWrapper />);
      
      // Should show first 12 projects by default
      expect(screen.getByText(/Showing 12 of 15 projects/)).toBeInTheDocument();
      expect(screen.getByText(/3 more available/)).toBeInTheDocument();
      expect(screen.getByText('Load 12 More Projects')).toBeInTheDocument();
      expect(screen.getByText('Show All Projects (15)')).toBeInTheDocument();
    });

    it('should load more projects when "Load More" is clicked', async () => {
      const manyProjects: Project[] = Array.from({ length: 15 }, (_, i) => ({
        ...mockProjects[0],
        _id: `project-${i}`,
        title: `Project ${i + 1}`,
        slug: `project-${i + 1}`
      }));

      mockUseProjects.mockReturnValue({
        projects: manyProjects,
        pagination: { total: 15, page: 1, limit: 60, totalPages: 1 },
        loading: false,
        error: null,
        refetch: vi.fn()
      });

      render(<ProjectsWrapper />);
      
      const loadMoreButton = screen.getByText('Load 12 More Projects');
      fireEvent.click(loadMoreButton);

      await waitFor(() => {
        expect(screen.getByText('Showing 15 of 15 projects')).toBeInTheDocument();
      });
    });

    it('should show all projects when "Show All" is clicked', async () => {
      const manyProjects: Project[] = Array.from({ length: 25 }, (_, i) => ({
        ...mockProjects[0],
        _id: `project-${i}`,
        title: `Project ${i + 1}`,
        slug: `project-${i + 1}`
      }));

      mockUseProjects.mockReturnValue({
        projects: manyProjects,
        pagination: { total: 25, page: 1, limit: 60, totalPages: 1 },
        loading: false,
        error: null,
        refetch: vi.fn()
      });

      render(<ProjectsWrapper />);
      
      const showAllButton = screen.getByText('Show All Projects (25)');
      fireEvent.click(showAllButton);

      await waitFor(() => {
        expect(screen.getByText('Showing 25 of 25 projects')).toBeInTheDocument();
        expect(screen.queryByText('Load 12 More Projects')).not.toBeInTheDocument();
      });
    });
  });

  describe('Project Links', () => {
    beforeEach(() => {
      mockUseProjects.mockReturnValue({
        projects: mockProjects,
        pagination: { total: 3, page: 1, limit: 60, totalPages: 1 },
        loading: false,
        error: null,
        refetch: vi.fn()
      });
    });

    it('should create correct project links using project ID', () => {
      render(<ProjectsWrapper />);
      
      const projectLinks = screen.getAllByRole('link');
      const projectLink = projectLinks.find(link => 
        link.getAttribute('href') === '/projects/1'
      );
      
      expect(projectLink).toBeInTheDocument();
    });
  });

  describe('Call to Action Section', () => {
    beforeEach(() => {
      mockUseProjects.mockReturnValue({
        projects: mockProjects,
        pagination: { total: 3, page: 1, limit: 60, totalPages: 1 },
        loading: false,
        error: null,
        refetch: vi.fn()
      });
    });

    it('should render call to action section', () => {
      render(<ProjectsWrapper />);
      
      expect(screen.getByText('Have a Project in Mind?')).toBeInTheDocument();
      expect(screen.getByText(/We'd love to discuss your vision/)).toBeInTheDocument();
      expect(screen.getByText('Start Your Project')).toBeInTheDocument();
    });

    it('should have correct link to contact page', () => {
      render(<ProjectsWrapper />);
      
      const contactLink = screen.getByRole('link', { name: 'Start Your Project' });
      expect(contactLink).toHaveAttribute('href', '/contact');
    });
  });

  describe('Combined Filters', () => {
    beforeEach(() => {
      mockUseProjects.mockReturnValue({
        projects: mockProjects,
        pagination: { total: 3, page: 1, limit: 60, totalPages: 1 },
        loading: false,
        error: null,
        refetch: vi.fn()
      });
    });

    it('should apply both search and category filters', async () => {
      render(<ProjectsWrapper />);
      
      // Filter by residential category
      const residentialButton = screen.getByText('Residential');
      fireEvent.click(residentialButton);

      // Then search for "modern"
      const searchInput = screen.getByPlaceholderText('Search projects...');
      fireEvent.change(searchInput, { target: { value: 'modern' } });

      await waitFor(() => {
        expect(screen.getByText('Modern Glass House')).toBeInTheDocument();
        expect(screen.queryByText('Urban Office Complex')).not.toBeInTheDocument();
        expect(screen.queryByText('Luxury Resort')).not.toBeInTheDocument();
      });
    });

    it('should reset display limit when filters change', async () => {
      const manyProjects: Project[] = Array.from({ length: 15 }, (_, i) => ({
        ...mockProjects[0],
        _id: `project-${i}`,
        title: `Project ${i + 1}`,
        slug: `project-${i + 1}`,
        category: 'residential' as const
      }));

      mockUseProjects.mockReturnValue({
        projects: manyProjects,
        pagination: { total: 15, page: 1, limit: 60, totalPages: 1 },
        loading: false,
        error: null,
        refetch: vi.fn()
      });

      render(<ProjectsWrapper />);
      
      // Load more projects first
      const loadMoreButton = screen.getByText('Load 12 More Projects');
      fireEvent.click(loadMoreButton);

      // Then change filter
      const residentialButton = screen.getByText('Residential');
      fireEvent.click(residentialButton);

      await waitFor(() => {
        // Should reset to showing 12 projects again
        expect(screen.getByText(/Showing 12 of 15 projects/)).toBeInTheDocument();
      });
    });
  });
});
