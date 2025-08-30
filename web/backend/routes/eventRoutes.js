import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// GET all events
router.get("/", async (req, res) => {
  const data = await Event.find();
  res.json(data);
});

// GET single event
router.get("/:id", async (req, res) => {
  const data = await Event.findById(req.params.id);
  res.json(data);
});

// POST add new event
router.post("/", async (req, res) => {
  const newEvent = new Event(req.body);
  const saved = await newEvent.save();
  res.json(saved);
});

// PUT update event
router.put("/:id", async (req, res) => {
  const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// DELETE event
router.delete("/:id", async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted" });
});

export default router;
