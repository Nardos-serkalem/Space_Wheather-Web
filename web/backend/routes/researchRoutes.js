import express from "express";
import Research from "../models/Research.js";

const router = express.Router();

// Get all research (projects + publications)
router.get("/", async (req, res) => {
  try {
    const items = await Research.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all publications
router.get("/publications", async (req, res) => {
  try {
    const publications = await Research.find({ type: "publication" });
    res.json(publications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all projects
router.get("/projects", async (req, res) => {
  try {
    const projects = await Research.find({ type: "project" });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get by id
router.get("/:id", async (req, res) => {
  try {
    const item = await Research.findById(req.params.id);
    res.json(item);
  } catch (err) {
    res.status(404).json({ error: "Not found" });
  }
});

// Add new research
router.post("/", async (req, res) => {
  try {
    const item = new Research(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update research
router.put("/:id", async (req, res) => {
  try {
    const item = await Research.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete research
router.delete("/:id", async (req, res) => {
  try {
    await Research.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
