import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import itemRoutes from "./routes/itemRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Log every request
app.use((req, res, next) => {
  console.log(`🔁 ${req.method} ${req.originalUrl}`);
  next();
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);

// Root route
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });
app.get("/", (req, res) => {
  res.send({
    activeStatus:true,
    error:false
    })
});

// Start server after DB connected
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("DB Connection Error:", err);
});