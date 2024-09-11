import express from "express";
import {
  currentUser,
  getAllUsers,
  userLogin,
  userRegister,
} from "../controller/userController.js";
import { validateToken } from "../middleware/validateTokenhandler.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/current", validateToken, currentUser);

export default router;
