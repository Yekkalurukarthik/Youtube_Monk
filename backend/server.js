import authRoutes from "./routes/auth.js";
import dailystatsRoutes from "./routes/dailystats.js";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to Database");
}).catch((err) => {
    console.log("MongoDB connection error:", err);
});


app.get("/", (req, res) => {
    res.send("Hello, World! This is new project.");
});

app.use("/api/auth", authRoutes);
app.use("/api/monk", dailystatsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
