import express from "express";
import DailyStats from "../Models/DailyStats.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Track Monk Mode ON/OFF
router.post("/track", auth, async (req, res) => {
  try {
    const { duration } = req.body;
    const userId = req.user._id; // comes from auth middleware

    const today = new Date().toISOString().split("T")[0];

    const stats = await DailyStats.findOneAndUpdate(
      { user: userId, date: today },
      { $inc: { activations: 1, timeSpent: duration || 0 } },
      { upsert: true, new: true }
    );

    res.json({ success: true, stats });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get last 30 days stats
router.get("/last30", auth, async (req, res) => {
  try {
    const userId = req.user._id;

    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const data = await DailyStats.find({
      user: userId,
      createdAt: { $gte: last30Days }
    }).sort({ date: 1 });

    res.json({ success: true, data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;