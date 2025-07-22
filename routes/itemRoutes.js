import express from "express";
import { createItem, deleteItem, getAllItems } from "../controllers/itemController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/", verifyToken, isAdmin, upload.single("image"), createItem);
router.get("/", getAllItems);
router.delete("/:id", verifyToken, isAdmin, deleteItem);

export default router;


