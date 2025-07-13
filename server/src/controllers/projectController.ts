import express, { Request, Response, NextFunction } from 'express';
import Project, { IProject } from '../models/Project';
import { PaginatedResponse } from '../types';

// Get all projects with filtering and pagination
export const getProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      page = 1,
      limit = 12,
      category,
      status,
      featured,
      published = 'true',
      search,
      year,
      sort = '-year'
    } = req.query;

    // Build filter object
    const filter: any = {};

    // Only show published projects by default (unless explicitly requested otherwise)
    if (published !== 'all') {
      filter.published = published === 'true';
    }

    if (category) {
      filter.category = category;
    }

    if (status) {
      filter.status = status;
    }

    if (featured) {
      filter.featured = featured === 'true';
    }

    if (year) {
      filter.year = parseInt(year as string);
    }

    // Handle search
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search as string, 'i')] } }
      ];
    }

    // Calculate pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    // Execute query with pagination
    const [projects, total] = await Promise.all([
      Project.find(filter)
        .sort(sort as string)
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Project.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / limitNum);

    const response: PaginatedResponse<IProject> = {
      data: projects,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1
    };

    res.status(200).json({
      success: true,
      message: 'Projects retrieved successfully',
      data: response
    });
  } catch (error) {
    next(error);
  }
};

//==========================================================================
// Get single project by ID or slug
//==========================================================================
export const getProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    // Try to find by MongoDB ID first, then by slug
    let project = await Project.findById(id);
    
    if (!project) {
      project = await Project.findOne({ slug: id });
    }

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found'
      });
      return;
    }

    // Only show published projects to non-admin users
    if (!project.published) {
      res.status(404).json({
        success: false,
        message: 'Project not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Project retrieved successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

// Get featured projects
export const getFeaturedProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { limit = 6 } = req.query;
    const limitNum = parseInt(limit as string);

    const projects = await Project.find({ featured: true, published: true })
      .sort({ year: -1 })
      .limit(limitNum)
      .lean();

    res.status(200).json({
      success: true,
      message: 'Featured projects retrieved successfully',
      data: projects
    });
  } catch (error) {
    next(error);
  }
};

//==========================================================================
// Get projects by category
//==========================================================================
export const getProjectsByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { category } = req.params;
    const { page = 1, limit = 12 } = req.query;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const [projects, total] = await Promise.all([
      Project.find({ category, published: true })
        .sort('-year')
        .skip(skip)
        .limit(limitNum)
        .lean(),
      Project.countDocuments({ category, published: true })
    ]);

    const totalPages = Math.ceil(total / limitNum);

    res.status(200).json({
      success: true,
      message: 'Projects retrieved successfully',
      data: {
        projects,
        total,
        page: pageNum,
        totalPages,
        hasNextPage: pageNum < totalPages,
        hasPrevPage: pageNum > 1
      }
    });
  } catch (error) {
    next(error);
  }
};

//==========================================================================
// Get distinct project categories
//==========================================================================
export const getProjectCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const categories = await Project.distinct('category', { published: true });
    
    res.status(200).json({
      success: true,
      message: 'Categories retrieved successfully',
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

// Create new project
export const createProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const projectData = req.body;
    
    const project = new Project(projectData);
    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

//==========================================================================
// Update project
//==========================================================================
export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const project = await Project.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    next(error);
  }
};

//==========================================================================
// Delete project
//==========================================================================
export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found'
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

//==========================================================================
// Toggle project featured status
//==========================================================================
export const toggleFeatured = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found'
      });
      return;
    }

    project.featured = !project.featured;
    await project.save();

    res.status(200).json({
      success: true,
      message: `Project ${project.featured ? 'featured' : 'unfeatured'} successfully`,
      data: project
    });
  } catch (error) {
    next(error);
  }
};

//==========================================================================
// Toggle project published status
//==========================================================================
export const togglePublished = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      res.status(404).json({
        success: false,
        message: 'Project not found'
      });
      return;
    }

    project.published = !project.published;
    await project.save();

    res.status(200).json({
      success: true,
      message: `Project ${project.published ? 'published' : 'unpublished'} successfully`,
      data: project
    });
  } catch (error) {
    next(error);
  }
};
