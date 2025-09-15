import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Import routes (ES module syntax)
import researchRoutes from "./routes/researchRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import staffRoutes from "./routes/staffRoutes.js";
import conferenceRoutes from "./routes/conferenceRoutes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static uploads (serve from project root uploads directory)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Connect to MongoDB Atlas with proper error handling
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("MongoDB Atlas connection error:", error);
    process.exit(1);
  }
};

// Initialize database connection
connectToMongoDB();

// Export mongoose connection for use in other parts of the project
export const db = mongoose.connection;

// Routes
app.use("/api/research", researchRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/conferences", conferenceRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
