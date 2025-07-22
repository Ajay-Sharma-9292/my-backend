import express from "express";
import { createCategory, deleteCategory, getAllCategories } from "../controllers/categoryController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/", verifyToken, isAdmin, upload.single("image"), createCategory);
router.get("/", getAllCategories);
router.delete("/:id", verifyToken, isAdmin, deleteCategory);

export default router;

