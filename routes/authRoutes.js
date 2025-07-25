import express from "express";
import { register, login, logoutUser } from "../controllers/authController.js";

const router = express.Router();

// router.post("/signup", signupUser);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logoutUser);
export default router;

