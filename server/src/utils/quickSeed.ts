import mongoose from 'mongoose';
import Project from '../models/Project';
import { connectDatabase } from '../config/database';

const sampleProjects = [
  {
    title: "Modern Glass House",
    description: "A stunning contemporary residence featuring floor-to-ceiling glass walls and sustainable design elements.",
    fullDescription: "This modern glass house represents the pinnacle of contemporary residential architecture.",
    category: "residential",
    status: "completed",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    thumbnailImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    location: "Los Angeles, CA",
    year: 2023,
    client: "Private Residence",
    area: 450,
    tags: ["modern", "glass", "sustainable"],
    featured: true,
    published: true
  },
  {
    title: "Urban Office Complex",
    description: "A modern commercial building designed for productivity and employee wellness.",
    fullDescription: "This urban office complex features sustainable design and modern amenities.",
    category: "commercial",
    status: "completed",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    thumbnailImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    location: "New York, NY",
    year: 2024,
    client: "Corporate Client",
    area: 1200,
    tags: ["commercial", "urban", "modern"],
    featured: false,
    published: true
  },
  {
    title: "Minimalist Interior",
    description: "Clean, modern interior design emphasizing space and light.",
    fullDescription: "A minimalist approach to interior design focusing on functionality and aesthetics.",
    category: "interior",
    status: "completed",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    thumbnailImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    location: "San Francisco, CA",
    year: 2023,
    client: "Private Client",
    area: 200,
    tags: ["interior", "minimalist", "modern"],
    featured: false,
    published: true
  }
];

const seedProjects = async () => {
  try {
    console.log('🌱 Starting to seed projects...');
    
    await connectDatabase();
    
    // Clear existing projects
    await Project.deleteMany({});
    console.log('🗑️ Cleared existing projects');
    
    // Insert sample projects
    const insertedProjects = await Project.insertMany(sampleProjects);
    console.log(`✅ Inserted ${insertedProjects.length} projects`);
    
    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding projects:', error);
    process.exit(1);
  }
};

seedProjects();
