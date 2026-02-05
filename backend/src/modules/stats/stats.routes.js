import { Router } from "express";
import * as StatsController from "./stats.controller.js";

const router = Router();

router.get("/summary", StatsController.getSummary);

export default router;
