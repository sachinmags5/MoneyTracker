import { Router } from "express";
import * as StatsController from "./stats.controller.js";

const router = Router();

/**
 * @swagger
 * /stats/summary:
 *   get:
 *     summary: Get financial summary (income, expense, category totals)
 *     tags: [Stats]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: month
 *         required: true
 *         description: Month number (1–12)
 *         schema:
 *           type: integer
 *           example: 2
 *       - in: query
 *         name: year
 *         required: false
 *         description: Year (default current year)
 *         schema:
 *           type: integer
 *           example: 2026
 *     responses:
 *       200:
 *         description: Summary fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalIncome:
 *                   type: number
 *                   example: 50000
 *                 totalExpense:
 *                   type: number
 *                   example: 20000
 *                 totalBalance:
 *                   type: number
 *                   example: 30000
 *                 categorySummary:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       categoryName:
 *                         type: string
 *                         example: Food
 *                       totalAmount:
 *                         type: number
 *                         example: 5000
 *       401:
 *         description: Unauthorized
 */
router.get("/summary", StatsController.getSummary);

export default router;
