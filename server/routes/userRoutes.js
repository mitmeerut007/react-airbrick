import express from "express";
import * as userController from "../controllers/userControllers.js";
import * as middleware from "../middleware/authenticate.js";

const router = express.Router();

// Define your user CRUD routes here
router.route("/add").post(userController.addUser);
router.route("/login").post(userController.loginUser);

//all user GET routes
router.route("/validuser").get(middleware.authenticate, userController.ValidUser);
router.route("/logout").get(middleware.authenticate, userController.logoutUser);

export default router;
