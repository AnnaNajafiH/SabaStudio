//This script is meant to:1.Fix broken or leftover indexes (like username_1 that caused errors). 2.Ensure only the correct index (on email) is applied. 3.Prevent future duplicate key errors during user signup. 4.Clean up development/test databases quickly.

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDatabase } from '../config/database';

// Load environment variables
dotenv.config();

async function fixIndexes() {
  try {
    // Connect to database
    await connectDatabase();
    console.log('📦 Connected to database');

    // Get the User collection
    const userCollection = mongoose.connection.collection('users');

    // Drop all indexes except _id
    await userCollection.dropIndexes();
    console.log('✅ Successfully dropped all indexes');

    // Create the proper email index
    await userCollection.createIndex(
      { email: 1 }, 
      { 
        unique: true,
        collation: { locale: 'en', strength: 2 },
        background: true
      }
    );
    console.log('✅ Successfully created email index');

    console.log('🎉 All indexes fixed successfully!');
  } catch (error: any) {
    console.error('❌ Error fixing indexes:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📦 Disconnected from database');
  }
}

// Run the fix
fixIndexes();
