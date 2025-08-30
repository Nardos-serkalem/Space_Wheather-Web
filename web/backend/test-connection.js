import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const testConnection = async () => {
  try {
    console.log("Testing MongoDB Atlas connection...");
    console.log("Database:", "space-weather");
    
    // Connect to MongoDB Atlas
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB Atlas successfully!");
    
    // Get database instance
    const db = mongoose.connection.db;
    
    // List all collections in the space-weather database
    const collections = await db.listCollections().toArray();
    
    if (collections.length === 0) {
      console.log("📚 No collections found in space-weather database");
    } else {
      console.log("📚 Collections in space-weather database:");
      collections.forEach((collection, index) => {
        console.log(`   ${index + 1}. ${collection.name}`);
      });
    }
    
    // Close connection
    await mongoose.disconnect();
    console.log("🔌 Connection closed successfully");
    
  } catch (error) {
    console.error("❌ MongoDB Atlas connection failed:");
    console.error(error.message);
    
    // Provide helpful error messages
    if (error.message.includes("ENOTFOUND")) {
      console.log("\n💡 Tip: Check your cluster URL in the connection string");
    } else if (error.message.includes("Authentication failed")) {
      console.log("\n💡 Tip: Check your username and password");
    } else if (error.message.includes("ECONNREFUSED")) {
      console.log("\n💡 Tip: Check if your IP is whitelisted in Network Access");
    } else if (error.message.includes("MongoNetworkError")) {
      console.log("\n💡 Tip: Check your internet connection and cluster status");
    }
  }
};

// Run the test
testConnection();
