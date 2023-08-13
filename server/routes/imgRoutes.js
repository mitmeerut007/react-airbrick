import express from "express";
import { addImg, getAllTags, getAllProjects, getImagesByTags } from "../controllers/imgController.js";

const router = express.Router();

// POST route to add an image
router.post("/add", addImg);

// GET route to get images by tags
router.get("/filter", getImagesByTags); // Add this route
router.get("/project", getAllProjects); // Add this route
router.get("/tags", getAllTags); // Add this route

export default router;
