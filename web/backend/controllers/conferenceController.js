import Conference from "../models/Conference.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/conferences"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});

export const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Get all conferences
export const getAllConferences = async (req, res) => {
  try {
    const conferences = await Conference.find({ isActive: true })
      .sort({ date: -1 });
    
    res.json(conferences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get upcoming conferences
export const getUpcomingConferences = async (req, res) => {
  try {
    const currentDate = new Date();
    const conferences = await Conference.find({ 
      isActive: true,
      $or: [
        { endDate: { $exists: true, $ne: null, $gte: currentDate } },
        { endDate: { $exists: false }, date: { $gte: currentDate } },
        { endDate: null, date: { $gte: currentDate } }
      ]
    }).sort({ date: 1 });
    
    res.json(conferences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get past conferences
export const getPastConferences = async (req, res) => {
  try {
    const currentDate = new Date();
    const conferences = await Conference.find({ 
      isActive: true,
      $or: [
        { endDate: { $exists: true, $ne: null, $lt: currentDate } },
        { endDate: { $exists: false }, date: { $lt: currentDate } },
        { endDate: null, date: { $lt: currentDate } }
      ]
    }).sort({ date: -1 });
    
    res.json(conferences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get conference by ID
export const getConferenceById = async (req, res) => {
  try {
    const conference = await Conference.findById(req.params.id);
    if (!conference) {
      return res.status(404).json({ message: "Conference not found" });
    }
    res.json(conference);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new conference
export const createConference = async (req, res) => {
  try {
    const normalizeOrganizers = (input) => {
      if (input == null || input === "") return [];
      if (Array.isArray(input)) return input.filter(Boolean);
      if (typeof input === 'string') {
        try {
          const parsed = JSON.parse(input);
          if (Array.isArray(parsed)) return parsed.filter(Boolean);
        } catch (_) {
          // not JSON, fall through to comma split
        }
        return input.split(',').map(s => s.trim()).filter(Boolean);
      }
      return [];
    };

    const legacySingle = req.body.organizer;
    const normalizedFromArray = normalizeOrganizers(req.body.organizers);
    const organizers = normalizedFromArray && normalizedFromArray.length > 0
      ? normalizedFromArray
      : normalizeOrganizers(legacySingle);

    const conferenceData = {
      ...req.body,
      organizers,
      image: req.file ? `/uploads/conferences/${req.file.filename}` : ""
    };
    
    const conference = new Conference(conferenceData);
    await conference.save();
    res.status(201).json(conference);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update conference
export const updateConference = async (req, res) => {
  try {
    const normalizeOrganizers = (input) => {
      if (input == null || input === "") return undefined; // undefined to avoid unsetting when not provided
      if (Array.isArray(input)) return input.filter(Boolean);
      if (typeof input === 'string') {
        try {
          const parsed = JSON.parse(input);
          if (Array.isArray(parsed)) return parsed.filter(Boolean);
        } catch (_) {
          // not JSON, fall through
        }
        return input.split(',').map(s => s.trim()).filter(Boolean);
      }
      return undefined;
    };

    const conferenceData = { ...req.body };
    const legacySingle = req.body.organizer;
    const normalized = normalizeOrganizers(req.body.organizers) ?? normalizeOrganizers(legacySingle);
    if (normalized !== undefined) {
      conferenceData.organizers = normalized;
    }
    
    if (req.file) {
      conferenceData.image = `/uploads/conferences/${req.file.filename}`;
    }
    
    const conference = await Conference.findByIdAndUpdate(
      req.params.id,
      conferenceData,
      { new: true, runValidators: true }
    );
    
    if (!conference) {
      return res.status(404).json({ message: "Conference not found" });
    }
    
    res.json(conference);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete conference
export const deleteConference = async (req, res) => {
  try {
    const conference = await Conference.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!conference) {
      return res.status(404).json({ message: "Conference not found" });
    }
    
    res.json({ message: "Conference deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hard delete conference
export const hardDeleteConference = async (req, res) => {
  try {
    const conference = await Conference.findByIdAndDelete(req.params.id);
    
    if (!conference) {
      return res.status(404).json({ message: "Conference not found" });
    }
    
    res.json({ message: "Conference permanently deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
