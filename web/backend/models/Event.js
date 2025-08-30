import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: String,
  description: String,
});

export default mongoose.model("Event", eventSchema);
