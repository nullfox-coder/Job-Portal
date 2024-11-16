import express from "express";
import {register, login, updateProfile, logout} from "../controllers/user_controller.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/update").put(isAuthenticated,updateProfile);
router.route("/logout").get(logout);

export default router;