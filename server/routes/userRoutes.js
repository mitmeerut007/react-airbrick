import express from "express";
import * as userController from "../controllers/userControllers.js";

const router = express.Router();

// Define your user CRUD routes here
router.post("/add", userController.addUser);


export default router;
