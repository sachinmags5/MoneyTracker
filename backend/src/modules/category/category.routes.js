import { Router } from "express";
import * as CategoryController from "./category.controller.js";

const router = Router();

router.post("/", CategoryController.category);
router.get("/category-list", CategoryController.categoryList);
router.delete("/:id", CategoryController.deleteCategory);
router.put("/:id", CategoryController.updateCategory);

export default router;
