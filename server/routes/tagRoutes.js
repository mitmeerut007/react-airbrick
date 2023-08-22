import express from "express";
import { addTags, getTags } from "../controllers/tagsController.js";
const router = express.Router();

router.post("/add", addTags);
router.get("/get", getTags);

export default router;
