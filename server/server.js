import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import mentorRoutes from "./routes/mentorRoutes.js";
import SkillSwapRoutes from "./routes/SkillSwapRoutes.js";
import NotificationRoutes from "./routes/NotificationRoutes.js";
import AiRoutes from "./routes/AiRoutes.js";
import { setupSocket } from "./socket.js";
import { createServer } from "http";

dotenv.config();
const app = express();
const server = createServer(app);

// ─── CORS Setup ───────────────────────────────────────────────────────────────
const corsOrigins = [
  process.env.CORS_ORIGIN, 
  "http://localhost:5173", 
];

app.use(cors({
  origin: corsOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// ─── Routes ────────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.send("Backend is running 🛠️");
});

app.use("/api/auth", authRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/mentors", mentorRoutes);
app.use("/api/skillmates", SkillSwapRoutes);
app.use("/api/notifications", NotificationRoutes);
app.use("/api/ai", AiRoutes);

// ─── Database & Server ─────────────────────────────────────────────────────────
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
