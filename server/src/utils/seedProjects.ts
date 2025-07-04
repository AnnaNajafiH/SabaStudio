import mongoose from 'mongoose';
import Project from '../models/Project';

const sampleProjects = [
  {
    title: "Modern Glass House",
    description: "A stunning contemporary residence featuring floor-to-ceiling glass walls and sustainable design elements.",
    fullDescription: "This modern glass house represents the pinnacle of contemporary residential architecture. The design seamlessly blends indoor and outdoor living spaces through expansive glass walls that offer panoramic views of the surrounding landscape. The home features sustainable materials, energy-efficient systems, and smart home technology integration. The open-plan layout creates a sense of spaciousness while maintaining intimate gathering areas for family life.",
    category: "residential",
    status: "completed",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    thumbnailImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    location: "Los Angeles, CA",
    year: 2023,
    client: "Private Residence",
    area: 450,
    budget: 1200000,
    tags: ["modern", "glass", "sustainable", "luxury"],
    featured: true,
    published: true
  },
  {
    title: "Corporate Headquarters",
    description: "A 12-story office building designed for a tech company, featuring innovative workspace solutions and green building practices.",
    fullDescription: "This corporate headquarters showcases the future of workplace design. The 12-story structure incorporates flexible workspace solutions, from open collaboration areas to private focus pods. The building's facade features a dynamic curtain wall system that responds to environmental conditions, while the interior emphasizes biophilic design with living walls and natural materials. Smart building systems optimize energy usage and create a comfortable working environment for over 2,000 employees.",
    category: "commercial",
    status: "completed",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    thumbnailImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    location: "San Francisco, CA",
    year: 2023,
    client: "TechCorp Inc.",
    area: 15000,
    budget: 45000000,
    tags: ["office", "commercial", "sustainable", "tech"],
    featured: true,
    published: true
  },
  {
    title: "Urban Loft Renovation",
    description: "Complete renovation of a 1920s warehouse into a contemporary living space while preserving historic character.",
    fullDescription: "This urban loft renovation breathes new life into a 1920s warehouse building. The project carefully balances the preservation of historic architectural elements with the needs of modern living. Exposed brick walls, original timber beams, and industrial windows are complemented by contemporary fixtures and finishes. The open-plan design maximizes the dramatic ceiling height while creating distinct living zones through strategic furniture placement and lighting design.",
    category: "renovation",
    status: "completed",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1565182999561-18d7dc61c393?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    thumbnailImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    location: "Brooklyn, NY",
    year: 2022,
    client: "Private Client",
    area: 180,
    budget: 320000,
    tags: ["loft", "renovation", "industrial", "historic"],
    featured: false,
    published: true
  },
  {
    title: "Luxury Hotel Interior",
    description: "Interior design for a 5-star boutique hotel featuring custom furniture and locally sourced materials.",
    fullDescription: "This luxury boutique hotel interior design project creates a unique sense of place through careful selection of materials, colors, and textures that reflect the local culture. Each of the 120 rooms features custom-designed furniture made by local artisans, while the public spaces showcase contemporary art from regional artists. The design philosophy emphasizes creating intimate, comfortable spaces that feel both luxurious and authentic to the destination.",
    category: "interior",
    status: "in-progress",
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    thumbnailImage: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    location: "Miami, FL",
    year: 2024,
    client: "Boutique Hotels Group",
    area: 8500,
    budget: 2800000,
    tags: ["hotel", "interior", "luxury", "boutique"],
    featured: true,
    published: true
  },
  {
    title: "Rooftop Garden Oasis",
    description: "A multi-level rooftop garden that transforms an urban space into a green sanctuary with water features and seating areas.",
    fullDescription: "This rooftop garden project transforms a previously unused urban rooftop into a lush oasis that serves both residential and community needs. The design incorporates multiple levels to create visual interest and maximize planting opportunities. Native and drought-resistant plants were selected to ensure sustainability, while integrated irrigation systems and rainwater collection make the garden environmentally responsible. Seating areas are strategically placed to take advantage of city views while providing intimate spaces for relaxation.",
    category: "landscape",
    status: "completed",
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7f09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1601052904048-4ba3b3c30c8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    thumbnailImage: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    location: "Chicago, IL",
    year: 2023,
    client: "City Residential Complex",
    area: 280,
    budget: 150000,
    tags: ["rooftop", "garden", "urban", "sustainable"],
    featured: false,
    published: true
  },
  {
    title: "Minimalist Beach House",
    description: "A serene coastal retreat emphasizing natural materials and ocean views through thoughtful architectural design.",
    fullDescription: "This minimalist beach house embodies the principles of sustainable coastal architecture. The structure is elevated to protect against flooding while maximizing ocean views from every room. Natural materials like weathered cedar and local stone blend harmoniously with the coastal environment. Large overhangs provide protection from the elements while creating covered outdoor living spaces. The interior features an open plan that encourages natural ventilation and connects seamlessly with multiple outdoor terraces.",
    category: "residential",
    status: "planning",
    images: [
      "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    ],
    thumbnailImage: "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    location: "Malibu, CA",
    year: 2024,
    client: "Private Client",
    area: 320,
    budget: 850000,
    tags: ["beach", "minimalist", "coastal", "sustainable"],
    featured: false,
    published: true
  }
];

// Helper function to generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

export const seedProjects = async (): Promise<void> => {
  try {
    console.log('🌱 Starting project seeding...');
    
    // Clear existing projects
    await Project.deleteMany({});
    console.log('🗑️ Cleared existing projects');
    
    // Generate slugs for each project before inserting
    const projectsWithSlugs = sampleProjects.map(project => ({
      ...project,
      slug: generateSlug(project.title)
    }));
    
    // Insert sample projects
    const insertedProjects = await Project.insertMany(projectsWithSlugs);
    console.log(`✅ Successfully seeded ${insertedProjects.length} projects`);
    
    // Display summary
    const categories = await Project.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    console.log('\n📊 Project Summary:');
    categories.forEach(cat => {
      console.log(`   ${cat._id}: ${cat.count} projects`);
    });
    
    const featuredCount = await Project.countDocuments({ featured: true });
    console.log(`   Featured: ${featuredCount} projects`);
    
  } catch (error) {
    console.error('❌ Error seeding projects:', error);
    throw error;
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/sstudio';
  
  mongoose.connect(mongoUri)
    .then(async () => {
      console.log('📡 Connected to MongoDB');
      await seedProjects();
      console.log('🎉 Seeding completed successfully!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Database connection failed:', error);
      process.exit(1);
    });
}
