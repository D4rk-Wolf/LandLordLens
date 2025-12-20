require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const { connectToMongoDB } = require('../lib/mongodb');

async function createAdmin() {
  try {
    await connectToMongoDB();

    const email = process.argv[2] || 'admin@landlordlens.com';
    const password = process.argv[3] || 'admin123';
    const name = process.argv[4] || 'Admin User';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email, role: 'admin' });
    if (existingAdmin) {
      console.log('❌ Admin user already exists with this email');
      process.exit(1);
    }

    // Create admin user
    const admin = new User({
      email,
      password,
      name,
      role: 'admin',
      subscription: 'premium',
    });

    await admin.save();

    console.log('✅ Admin user created successfully!');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log(`   Name: ${name}`);
    console.log('\n⚠️  Please change the password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
    process.exit(1);
  }
}

createAdmin();
