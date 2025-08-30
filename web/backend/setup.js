import mongoose from "mongoose";
import Admin from "./models/Admin.js";
import dotenv from "dotenv";

dotenv.config();

const createAdminUser = async () => {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB Atlas");

    // Check if admin already exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    // Create admin user
    const admin = new Admin({
      username: "admin",
      password: "admin123",
      email: "admin@spaceweather.gov.et",
      role: "admin"
    });

    await admin.save();
    console.log("Admin user created successfully!");
    console.log("Username: admin");
    console.log("Password: admin123");
    
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
};

createAdminUser();
