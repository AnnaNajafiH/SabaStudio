import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Project, User } from '../models';

// Load environment variables
dotenv.config();

// Helper function to generate slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim();
};

const seedData = async () => {
  try {
    // Connect to database
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/sstudio';
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB');

    // Clear existing data (optional - remove this in production)
    console.log('🗑️ Clearing existing data...');
    await Project.deleteMany({});
    await User.deleteMany({});

    // Create sample projects
    console.log('📋 Creating sample projects...');
    const sampleProjects = [
      {
        title: 'Modern Residential Complex',
        description: 'A sustainable residential complex featuring contemporary design and eco-friendly materials. This project incorporates natural light optimization and energy-efficient systems.',
        fullDescription: 'This innovative residential complex represents the future of sustainable living. Designed with eco-friendly materials and energy-efficient systems, the building features solar panels, rainwater harvesting, and green roofs. The contemporary design maximizes natural light through strategically placed windows and skylights, reducing the need for artificial lighting during the day.',
        category: 'residential',
        status: 'completed',
        images: [
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1453&q=80',
          'https://images.unsplash.com/photo-1600607687644-aac4c5191e2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
        ],
        thumbnailImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1453&q=80',
        location: 'Berlin, Germany',
        year: 2024,
        client: 'Private Developer',
        area: 15000,
        budget: 2500000,
        tags: ['sustainable', 'modern', 'energy-efficient', 'residential'],
        featured: true,
        published: true
      },
      {
        title: 'Corporate Headquarters',
        description: 'State-of-the-art corporate headquarters designed to promote collaboration and innovation. Features glass facades and open-concept workspaces.',
        fullDescription: 'This cutting-edge corporate headquarters embodies the future of workplace design. The building features floor-to-ceiling glass facades that flood the interior with natural light, while open-concept workspaces promote collaboration and creativity. Advanced HVAC systems ensure optimal air quality, and smart building technology adapts to usage patterns.',
        category: 'commercial',
        status: 'completed',
        images: [
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
          'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80'
        ],
        thumbnailImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        location: 'Frankfurt, Germany',
        year: 2023,
        client: 'Tech Corporation',
        area: 25000,
        budget: 5000000,
        tags: ['commercial', 'glass', 'innovation', 'headquarters'],
        featured: true,
        published: true
      },
      {
        title: 'Cultural Arts Center',
        description: 'A dynamic cultural hub that brings together art, performance, and community. The design emphasizes natural materials and fluid spaces.',
        fullDescription: 'This cultural arts center serves as a vibrant community hub, bringing together various artistic disciplines under one roof. The architecture emphasizes natural materials like wood and stone, creating warm, inviting spaces. Fluid, interconnected galleries allow for flexible exhibition layouts, while the performance hall features state-of-the-art acoustics.',
        category: 'commercial',
        status: 'in-progress',
        images: [
          'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
          'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
        ],
        thumbnailImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        location: 'Munich, Germany',
        year: 2024,
        client: 'City of Munich',
        area: 8000,
        budget: 3200000,
        tags: ['cultural', 'arts', 'community', 'performance'],
        featured: false,
        published: true
      },
      {
        title: 'Urban Garden Plaza',
        description: 'A green oasis in the heart of the city, featuring native plants, water features, and community gathering spaces. Designed for biodiversity and sustainability.',
        fullDescription: 'This urban plaza transforms a concrete cityscape into a thriving green ecosystem. Native plants and trees provide habitat for local wildlife, while integrated water features create a soothing ambiance. Community gathering spaces include outdoor amphitheater seating, walking paths, and interactive educational installations about local ecology.',
        category: 'landscape',
        status: 'in-progress',
        images: [
          'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
          'https://images.unsplash.com/photo-1544737151406-6b998fcf0bb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
        ],
        thumbnailImage: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        location: 'Stuttgart, Germany',
        year: 2024,
        client: 'City of Stuttgart',
        area: 5000,
        budget: 800000,
        tags: ['landscape', 'sustainable', 'community', 'biodiversity'],
        featured: true,
        published: true
      },
      {
        title: 'Luxury Hotel Interior',
        description: 'Sophisticated interior design for a boutique hotel, combining contemporary aesthetics with local cultural elements. Features custom furniture and lighting.',
        fullDescription: 'This boutique hotel interior seamlessly blends contemporary design with local cultural heritage. Custom-designed furniture pieces reflect regional craftsmanship, while carefully curated lighting creates intimate, welcoming atmospheres throughout the space. Each room tells a unique story through thoughtfully selected art and materials.',
        category: 'interior',
        status: 'completed',
        images: [
          'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
          'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
        ],
        thumbnailImage: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
        location: 'Cologne, Germany',
        year: 2023,
        client: 'Boutique Hotels Group',
        area: 2000,
        budget: 1200000,
        tags: ['luxury', 'hospitality', 'interior', 'boutique'],
        featured: false,
        published: true
      }
    ];

    // Generate slugs for each project before inserting
    const projectsWithSlugs = sampleProjects.map(project => ({
      ...project,
      slug: generateSlug(project.title)
    }));

    await Project.insertMany(projectsWithSlugs);
    console.log(`✅ Created ${projectsWithSlugs.length} sample projects`);

    // Create admin user
    console.log('👤 Creating admin user...');
    const adminUser = new User({
      username: 'admin',
      email: 'admin@sstudio.com',
      password: 'admin123456', // Will be hashed automatically
      firstName: 'Admin',
      lastName: 'Studio',
      role: 'admin',
      isActive: true
    });

    await adminUser.save();
    console.log('✅ Created admin user');

    console.log('\n🎉 Database seeded successfully!');
    console.log('📋 Summary:');
    console.log(`   - Projects: ${sampleProjects.length}`);
    console.log(`   - Users: 1 (admin)`);
    console.log('\n🔐 Admin Login:');
    console.log('   Email: admin@sstudio.com');
    console.log('   Password: admin123456');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
};

// Run the seeding function
seedData();
