import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Research from "../models/Research.js";

const router = express.Router();

// Configure multer for file uploads (match staff logic)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(process.cwd(), "uploads", "research");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

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

// Upload research image
router.post("/upload", (req, res) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      const isSize = err?.message?.toLowerCase().includes("file too large");
      const message = isSize
        ? "Image is too large. Please upload a file up to 5MB."
        : "Failed to upload image. Please select a valid image file.";
      return res.status(400).json({ message });
    }
    if (!req.file) {
      return res.status(400).json({ message: "Please choose an image to upload." });
    }
    const imagePath = `/uploads/research/${req.file.filename}`;
    const absoluteUrl = `${req.protocol}://${req.get("host")}${imagePath}`;
    return res.json({ url: absoluteUrl });
  });
});

// Add new research (expects JSON; image should be an URL string)
router.post("/", async (req, res) => {
  try {
    const researchData = { ...req.body };
    const item = new Research(researchData);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ message: "Could not save project. Please check the form and try again." });
  }
});

// Update research (expects JSON; image should be an URL string)
router.put("/:id", async (req, res) => {
  try {
    const researchData = { ...req.body };
    const item = await Research.findByIdAndUpdate(req.params.id, researchData, { new: true });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: "Could not update project. Please try again." });
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
