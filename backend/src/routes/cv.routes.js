import { Router } from "express";
import { getCV, createCV, updateCV } from "../controllers/cv.controller.js";

const router = Router();

router.get("/", getCV);
router.post("/", createCV);
router.put("/", updateCV);

export default router;
