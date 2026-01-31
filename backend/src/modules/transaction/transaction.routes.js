import { Router } from "express";
import * as TransactionController from "./transaction.controller.js";

const router = Router();

router.post("/", TransactionController.addTransaction);
router.get("/transactions-list", TransactionController.transactionsList);
router.delete("/:id", TransactionController.deleteTransaction);
router.put("/:id", TransactionController.updateTransaction);

export default router;
