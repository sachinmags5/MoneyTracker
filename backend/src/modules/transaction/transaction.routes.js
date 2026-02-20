import { Router } from "express";
import * as TransactionController from "./transaction.controller.js";

const router = Router();

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create transaction
 *     tags: [Transaction]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - type
 *               - categoryId
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 500
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               categoryId:
 *                 type: string
 *                 example: 65f2c3b8e9a123456789abcd
 *               note:
 *                 type: string
 *                 example: Grocery
 *     responses:
 *       201:
 *         description: Transaction created
 */
router.post("/", TransactionController.addTransaction);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transaction]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Transaction list
 */
router.get("/transactions-list", TransactionController.transactionsList);

/**
 * @swagger
 * /transactions/{id}:
 *   put:
 *     summary: Update transaction
 *     tags: [Transaction]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Transaction ID
 *         schema:
 *           type: string
 *           example: 65f2c3b8e9a123456789abcd
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 1000
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 example: expense
 *               categoryId:
 *                 type: string
 *                 example: 65f2c3b8e9a123456789abcd
 *               note:
 *                 type: string
 *                 example: Updated grocery expense
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-02-20
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *       404:
 *         description: Transaction not found
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", TransactionController.updateTransaction);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transaction]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Transaction list
 */
router.delete("/:id", TransactionController.deleteTransaction);

export default router;
