const mongoose = require('mongoose');
const dns = require('dns');
require('dotenv').config();

dns.setServers(['8.8.8.8', '1.1.1.1']);

const User = require('./src/models/User');

async function testDirect() {
  try {
    console.log('Connecting to Mongo...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Mongoose Connection ReadyState:', mongoose.connection.readyState);

    const testEmail = `direct_${Date.now()}@example.com`;
    console.log('Running User.findOne for', testEmail);
    const existing = await User.findOne({ email: testEmail });
    console.log('Existing user found:', existing);

    console.log('Running User.create...');
    const newUser = await User.create({
      fullName: 'Direct User',
      email: testEmail,
      password: 'hashedpassword',
      role: 'job_seeker'
    });
    console.log('User created successfully:', newUser._id);
    process.exit(0);
  } catch (err) {
    console.error('Direct Test Error:', err);
    process.exit(1);
  }
}

testDirect();
