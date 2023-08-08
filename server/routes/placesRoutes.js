import express from "express";
import * as placeController from "../controllers/placesController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 }, // Limit file size to 15MB
});

// Define your user CRUD routes here
router.post("/add", upload.array("placeImgs"), placeController.addPlace);

export default router;
