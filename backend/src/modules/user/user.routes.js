import { Router } from "express";
import * as UserController from "./user.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.get("/me", authenticate, UserController.getMe);
router.post("/logout", authenticate, UserController.logout);

export default router;
