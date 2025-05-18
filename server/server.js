import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import mentorRoutes from "./routes/mentorRoutes.js";
import SkillSwapRoutes from "./routes/SkillSwapRoutes.js";
import NotificationRoutes from "./routes/NotificationRoutes.js";
import AiRoutes from "./routes/AiRoutes.js";
import {setupSocket} from "./socket.js";
import { createServer } from "http";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const server = createServer(app);

app.use(cors({
  origin: "http://localhost:5173", // Replace with your Vite frontend URL
  methods: ["GET", "POST"]
}));

app.get("/", (req, res) => {
  res.send("Backend is running 🛠️");
});

app.use("/api/auth", authRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/mentors" , mentorRoutes);
app.use("/api/skillmates" , SkillSwapRoutes);
app.use("/api/notifications", NotificationRoutes);
app.use("/api/ai" , AiRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
   server.listen(process.env.PORT, () => {
      console.log("✅ Server running on port", process.env.PORT);
    });
    setupSocket(server);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
