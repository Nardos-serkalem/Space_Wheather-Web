import express from "express";
import Staff from "../models/Staff.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(process.cwd(), "uploads", "staff");
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
const upload = multer({ storage });

const router = express.Router();

// GET all staff
router.get("/", async (req, res) => {
	try {
		const staff = await Staff.find().sort({ createdAt: -1 });
		res.json(staff);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
});

// GET one staff by id
router.get("/:id", async (req, res) => {
	try {
		const staff = await Staff.findById(req.params.id);
		if (!staff) return res.status(404).json({ error: "Not found" });
		res.json(staff);
	} catch (err) {
		res.status(404).json({ error: "Not found" });
	}
});

// POST create staff
router.post("/", async (req, res) => {
	try {
		const staff = new Staff(req.body);
		await staff.save();
		res.status(201).json(staff);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// PUT update staff
router.put("/:id", async (req, res) => {
	try {
		const staff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
		res.json(staff);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

// DELETE staff
router.delete("/:id", async (req, res) => {
	try {
		await Staff.findByIdAndDelete(req.params.id);
		res.json({ message: "Deleted" });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

export default router;

// Upload staff image
router.post("/upload", upload.single("image"), async (req, res) => {
    try {
        const relPath = `/uploads/staff/${req.file.filename}`;
        const absoluteUrl = `${req.protocol}://${req.get("host")}${relPath}`;
        res.json({ url: absoluteUrl });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


