import mongoose from "mongoose";

const dailyStatsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  date: {
    type: String, // "2026-04-09"
    required: true,
  },

  timeSpent: {
    type: Number,
    default: 0, // seconds per day
  },

  activations: {
    type: Number,
    default: 0, // how many times monk mode ON
  },

}, { timestamps: true });

// 🔥 VERY IMPORTANT (prevents duplicate day entries)
dailyStatsSchema.index({ user: 1, date: 1 }, { unique: true });

export default mongoose.model("DailyStats", dailyStatsSchema);