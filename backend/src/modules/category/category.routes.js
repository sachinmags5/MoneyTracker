import { Router } from "express";
import * as CategoryController from "./category.controller.js";

const router = Router();

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create category
 *     tags: [Category]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *             properties:
 *               name:
 *                 type: string
 *                 example: Food
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 example: expense
 *     responses:
 *       201:
 *         description: Category created
 */
router.post("/", CategoryController.category);

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Category list
 */
router.get("/category-list", CategoryController.categoryList);

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update category
 *     tags: [Category]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category updated
 */
router.put("/:id", CategoryController.updateCategory);

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete category
 *     tags: [Category]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Category deleted
 */
router.delete("/:id", CategoryController.deleteCategory);

export default router;
