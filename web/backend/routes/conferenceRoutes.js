import express from "express";
import {
  getAllConferences,
  getUpcomingConferences,
  getPastConferences,
  getConferenceById,
  createConference,
  updateConference,
  deleteConference,
  hardDeleteConference,
  upload
} from "../controllers/conferenceController.js";

const router = express.Router();

// Public routes
router.get("/", getAllConferences);
router.get("/upcoming", getUpcomingConferences);
router.get("/past", getPastConferences);
router.get("/:id", getConferenceById);

// Admin routes (you might want to add authentication middleware here)
router.post("/", upload.single("image"), createConference);
router.put("/:id", upload.single("image"), updateConference);
router.delete("/:id", deleteConference);
router.delete("/:id/hard", hardDeleteConference);

export default router;
