import express from "express";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      imageUrl: req.file.path,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ success: false, message: "Upload failed" });
  }
});

export default router;
