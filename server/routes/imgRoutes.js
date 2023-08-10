import express from "express";
import { addImg, getAllTags, getImages, getImagesByTags } from "../controllers/imgController.js";
import multer from "multer";
import path from 'path';

const router = express.Router();

// Set up storage for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now();
    const extension = path.extname(file.originalname);
    const imageName = `img-${uniqueSuffix}${extension}`;
    cb(null, imageName);
  },
});

// Create a multer instance with the storage configuration
const upload = multer({ storage: storage });

// POST route to add an image
router.post("/add", upload.single("image"), addImg);

// GET route to get images by tags
router.get("/filter", getImagesByTags); // Add this route

router.get("/tags", getAllTags); // Add this route

export default router;
