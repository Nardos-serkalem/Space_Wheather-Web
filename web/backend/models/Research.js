import mongoose from "mongoose";

const researchSchema = new mongoose.Schema({
  type: { type: String, enum: ["project", "publication"], required: true }, 
  title: { type: String, required: true },
  description: String,

  // For projects
  category: String,
  image: String,

  // For publications
  authors: String,
  date: Date,
  link: String,
});

export default mongoose.model("Research", researchSchema);
