import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import eventRoutes from "./routes/eventRoutes";
import dataRoutes from "./routes/dataRoutes"; 
import tradeRoutes from "./routes/tradeRoutes"; 
import { adminRoutes } from "./routes/adminRoutes";
import errorMiddleware from "./middlewares/errorMiddleware";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/data", dataRoutes); 
app.use("/api/trades", tradeRoutes); 
app.use("/api/admin", adminRoutes);

// Error handling middleware
app.use(errorMiddleware);

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL as string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

connectDB();

export default app;
