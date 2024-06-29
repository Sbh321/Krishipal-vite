import express from "express";
const router = express.Router();
import { googleOauth } from "../controllers/userController.js";

router.post("/google", googleOauth);

export default router;
