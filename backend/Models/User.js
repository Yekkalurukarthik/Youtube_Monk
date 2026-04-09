import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,

  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6 ,
  },

  totalTimeSpent: {
    type: Number,
    default: 0,
  },

  totalActivations: {
    type: Number,
    default: 0,
  },

}, { timestamps: true });

export default mongoose.model("User", userSchema);