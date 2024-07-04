

import mongoose from 'mongoose';
import { DB_NAME } from '../constants.js'; // Adjust the path as per your project structure

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;

    const connectionInstance = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected!! DB Host: ${connectionInstance.connection.host}`);

  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;

