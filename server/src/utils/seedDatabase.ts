import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Project, User } from '../models';
import { seedProjects } from './seedProjects';

// Load environment variables
dotenv.config();

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

    // Create sample projects using the comprehensive seed function
    console.log('📋 Creating sample projects...');
    await seedProjects();
    console.log('✅ Projects seeded successfully');

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
    console.log(`   - Projects: seeded from seedProjects.ts`);
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
