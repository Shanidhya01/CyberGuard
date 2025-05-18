require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 5000;

// Enhanced connection options
const connectionOptions = {
  serverSelectionTimeoutMS: 10000,  // 10 seconds
  socketTimeoutMS: 45000,          // 45 seconds
  connectTimeoutMS: 10000,         // 10 seconds
};

// Debug log the connection string (remove in production)
console.log('Using MongoDB URI:', process.env.MONGODB_URI.replace(/:[^@]+@/, ':*****@'));

mongoose.connect(process.env.MONGODB_URI, connectionOptions)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🔗 http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:');
    console.error(err);
    console.log('\nTroubleshooting steps:');
    console.log('1. Verify your cluster name is correct: cluster0.ip6arjr.mongodb.net');
    console.log('2. Check your password contains the right special characters');
    console.log('3. Ensure your IP is whitelisted in MongoDB Atlas');
    console.log('4. Try connecting with MongoDB Compass using the same credentials');
    process.exit(1);
  });

// Connection event handlers
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB cluster');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed');
  process.exit(0);
});