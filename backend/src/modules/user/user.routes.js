import { Router } from "express";
import * as UserController from "./user.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { apiLimiter } from "../../middlewares/rateLimiter.middleware.js";

const router = Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sachin
 *               email:
 *                 type: string
 *                 example: sachin@gmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User created
 */
router.post("/register", UserController.register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login user
 *     description: Authenticates user and sets JWT token in HTTP-only cookie
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: appu@gmail.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login successful, JWT stored in cookie
 *         headers:
 *           Set-Cookie:
 *             description: JWT token stored in HTTP-only cookie
 *             schema:
 *               type: string
 *               example: token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 69746b94fc80712b805ec395
 *                 name:
 *                   type: string
 *                   example: appu
 *                 email:
 *                   type: string
 *                   example: appu@gmail.com
 *                 mobilenumber:
 *                   type: number
 *                   example: 8080774411
 *                 role:
 *                   type: string
 *                   example: user
 *                 message:
 *                   type: string
 *                   example: Login successful
 *       401:
 *         description: Invalid email or password
 *       400:
 *         description: Validation error
 */
router.post("/login", UserController.login);

/**
 * @swagger
 * /users/refresh:
 *   post:
 *     summary: Refresh user
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Authenticates user and sets JWT token in HTTP-only cookie
 *       401:
 *          description: Invalid refresh token
 *       400:
 *         description: Invalid refresh token
 */
router.post("/refresh", UserController.refreshToken);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current user
 *     tags: [Users]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Current user data
 */
router.get("/me", apiLimiter, authenticate, UserController.getMe);

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *
 *     responses:
 *       201:
 *         description: User logoedOut
 */
router.post("/logout", authenticate, UserController.logout);

export default router;
