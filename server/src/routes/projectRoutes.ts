import { Router, Request, Response } from 'express';

const router = Router();

// Sample projects data for demo purposes
const sampleProjects = [
  {
    id: '1',
    title: 'Modern Residential Complex',
    description: 'A sustainable residential complex featuring contemporary design and eco-friendly materials. This project incorporates natural light optimization and energy-efficient systems.',
    category: 'Residential',
    location: 'Berlin, Germany',
    year: 2024,
    status: 'Completed',
    isPublished: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1453&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1453&q=80',
    tags: ['Sustainable', 'Modern', 'Energy Efficient'],
    client: 'Private Developer',
    area: 15000,
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-06-20T15:30:00.000Z'
  },
  {
    id: '2',
    title: 'Corporate Headquarters',
    description: 'State-of-the-art corporate headquarters designed to promote collaboration and innovation. Features glass facades and open-concept workspaces.',
    category: 'Commercial',
    location: 'Frankfurt, Germany',
    year: 2023,
    status: 'Completed',
    isPublished: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    tags: ['Commercial', 'Glass', 'Innovation'],
    client: 'Tech Corporation',
    area: 25000,
    createdAt: '2023-03-10T09:00:00.000Z',
    updatedAt: '2023-12-15T14:20:00.000Z'
  },
  {
    id: '3',
    title: 'Cultural Arts Center',
    description: 'A dynamic cultural hub that brings together art, performance, and community. The design emphasizes natural materials and fluid spaces.',
    category: 'Commercial',
    location: 'Munich, Germany',
    year: 2024,
    status: 'In Progress',
    isPublished: true,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    tags: ['Cultural', 'Arts', 'Community'],
    client: 'City of Munich',
    area: 8000,
    createdAt: '2024-02-20T11:30:00.000Z',
    updatedAt: '2024-06-25T16:45:00.000Z'
  },
  {
    id: '4',
    title: 'Industrial Manufacturing Plant',
    description: 'Efficient and safe manufacturing facility designed for optimal workflow and environmental compliance. Features advanced ventilation and safety systems.',
    category: 'Industrial',
    location: 'Hamburg, Germany',
    year: 2023,
    status: 'Completed',
    isPublished: true,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
    tags: ['Industrial', 'Manufacturing', 'Safety'],
    client: 'Manufacturing Corp',
    area: 30000,
    createdAt: '2023-01-05T08:00:00.000Z',
    updatedAt: '2023-11-30T17:15:00.000Z'
  },
  {
    id: '5',
    title: 'Urban Garden Plaza',
    description: 'A green oasis in the heart of the city, featuring native plants, water features, and community gathering spaces. Designed for biodiversity and sustainability.',
    category: 'Landscape',
    location: 'Stuttgart, Germany',
    year: 2024,
    status: 'In Progress',
    isPublished: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    tags: ['Landscape', 'Sustainable', 'Community'],
    client: 'City of Stuttgart',
    area: 5000,
    createdAt: '2024-04-12T13:20:00.000Z',
    updatedAt: '2024-06-22T10:10:00.000Z'
  },
  {
    id: '6',
    title: 'Luxury Hotel Interior',
    description: 'Sophisticated interior design for a boutique hotel, combining contemporary aesthetics with local cultural elements. Features custom furniture and lighting.',
    category: 'Interior',
    location: 'Cologne, Germany',
    year: 2023,
    status: 'Completed',
    isPublished: true,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    tags: ['Luxury', 'Hospitality', 'Interior'],
    client: 'Boutique Hotels Group',
    area: 2000,
    createdAt: '2023-05-18T12:45:00.000Z',
    updatedAt: '2023-10-25T09:30:00.000Z'
  }
];

// GET /api/v1/projects - Get all projects
router.get('/', (req: Request, res: Response) => {
  res.json({
    status: 'success',
    message: 'Projects retrieved successfully',
    data: sampleProjects
  });
});

// GET /api/v1/projects/:id - Get project by ID
router.get('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const project = sampleProjects.find(p => p.id === id);
  
  if (!project) {
    return res.status(404).json({
      status: 'error',
      message: 'Project not found',
      data: null
    });
  }
  
  return res.json({
    status: 'success',
    message: 'Project retrieved successfully',
    data: project
  });
});

// POST /api/v1/projects - Create new project
router.post('/', (req: Request, res: Response) => {
  res.json({
    status: 'success',
    message: 'Project created',
    data: null
  });
});

// PUT /api/v1/projects/:id - Update project
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    status: 'success',
    message: `Project ${id} updated`,
    data: null
  });
});

// DELETE /api/v1/projects/:id - Delete project
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    status: 'success',
    message: `Project ${id} deleted`
  });
});

export default router;
