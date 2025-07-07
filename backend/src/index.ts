import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

import { connectDB } from "./utils/db";
import snapshotRoutes from "./routes/snapshot/snapshot";
import uploadRoute from "./routes/upload/upload";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/userUploads", express.static(path.join(__dirname, "userUploads")));

// Routes
app.use("/api/snapshot", snapshotRoutes);
app.use("/api/upload", uploadRoute);

// Health check
app.get("/", (_req, res) => {
  res.send("✅ Server is up and running");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});
