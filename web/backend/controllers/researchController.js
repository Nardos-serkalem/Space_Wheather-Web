import Research from "../models/Research.js";

// Get all researches
export const getAllResearch = async (req, res) => {
  try {
    const researches = await Research.find();
    res.json(researches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get research by ID
export const getResearchById = async (req, res) => {
  try {
    const research = await Research.findById(req.params.id);
    if (!research) return res.status(404).json({ message: "Not found" });
    res.json(research);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add new research
export const addResearch = async (req, res) => {
  try {
    const newResearch = new Research(req.body);
    const saved = await newResearch.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update research
export const updateResearch = async (req, res) => {
  try {
    const updated = await Research.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete research
export const deleteResearch = async (req, res) => {
  try {
    const deleted = await Research.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
