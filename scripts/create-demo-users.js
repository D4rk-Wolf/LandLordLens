require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const { connectToMongoDB } = require('../lib/mongodb');

async function createDemoUsers() {
  try {
    await connectToMongoDB();

    const demoUsers = [
      {
        email: 'demo-free@landlordlens.com',
        password: 'demo123',
        name: 'Demo Free User',
        role: 'landlord',
        subscription: 'free',
      },
      {
        email: 'demo-premium@landlordlens.com',
        password: 'demo123',
        name: 'Demo Premium User',
        role: 'landlord',
        subscription: 'business',
      },
      {
        email: 'admin@landlordlens.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'admin',
        subscription: 'enterprise',
      },
    ];

    console.log('🚀 Creating/Updating demo users...\n');

    for (const userData of demoUsers) {
      // Upsert user (update if exists, create if not)
      // Note: In a real app we would hash passwords, but User model pre-save hook likely handles it
      // or we rely on the fact these are demo users.
      // Assuming User model has a pre-save hook for password hashing, 
      // but findOneAndUpdate bypasses pre-save hooks. 
      // So we should check if user exists.

      let user = await User.findOne({ email: userData.email });

      if (user) {
        console.log(`🔄 Updating existing user: ${userData.email}`);
        user.name = userData.name;
        user.role = userData.role;
        user.subscription = userData.subscription;
        // Only update password if needed, but for demo script we enforce known password
        user.password = userData.password;
      } else {
        console.log(`✨ Creating new user: ${userData.email}`);
        user = new User(userData);
      }

      await user.save(); // This triggers pre-save hooks (hashing)

      console.log(`✅ ${userData.subscription.toUpperCase()} tier user processed successfully!`);
      console.log(`   Email: ${userData.email}`);
      console.log(`   Password: ${userData.password}`);
      console.log(`   Name: ${userData.name}`);
      console.log(`   Tier: ${userData.subscription}\n`);
    }

    console.log('✨ Demo users setup complete!');
    console.log('\n📝 Login Credentials:');
    console.log('   Free Tier:');
    console.log('     Email: demo-free@landlordlens.com');
    console.log('     Password: demo123');
    console.log('\n   Professional/Business Tier:');
    console.log('     Email: demo-premium@landlordlens.com');
    console.log('     Password: demo123');
    console.log('\n   Admin User:');
    console.log('     Email: admin@landlordlens.com');
    console.log('     Password: admin123');
    console.log('\n⚠️  Please change passwords after first login for production use!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating demo users:', error.message);
    if (error.code === 11000) {
      console.error('   Duplicate email detected. User may already exist.');
    }
    process.exit(1);
  }
}

createDemoUsers();
