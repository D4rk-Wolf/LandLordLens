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
        subscription: 'premium',
      },
    ];

    console.log('🚀 Creating demo users...\n');

    for (const userData of demoUsers) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: userData.email });
      if (existingUser) {
        console.log(`⚠️  User already exists: ${userData.email}`);
        console.log(`   Skipping creation...\n`);
        continue;
      }

      // Create user
      const user = new User({
        email: userData.email,
        password: userData.password,
        name: userData.name,
        role: userData.role,
        subscription: userData.subscription,
      });

      await user.save();

      console.log(`✅ ${userData.subscription.toUpperCase()} tier user created successfully!`);
      console.log(`   Email: ${userData.email}`);
      console.log(`   Password: ${userData.password}`);
      console.log(`   Name: ${userData.name}`);
      console.log(`   Subscription: ${userData.subscription}\n`);
    }

    console.log('✨ Demo users setup complete!');
    console.log('\n📝 Login Credentials:');
    console.log('   Free Tier:');
    console.log('     Email: demo-free@landlordlens.com');
    console.log('     Password: demo123');
    console.log('\n   Premium Tier:');
    console.log('     Email: demo-premium@landlordlens.com');
    console.log('     Password: demo123');
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
