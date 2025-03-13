import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Ensure dotenv is configured at the top

const connectDB = async () => {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("DATABASE_URL is not defined in .env file");
    process.exit(1); // Exit the application if DATABASE_URL is not defined
  }

  try {
    const conn = await mongoose.connect(databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error("Unknown error occurred during MongoDB connection");
    }
    process.exit(1);
  }
};

export default connectDB;
