import { Router } from "express";
import {
  getAllCategories,
  getCategoriesById,
} from "../controllers/categories.controller.js";

const router = Router();

router.get("/categorias", getAllCategories);
router.get("/categorias/:id", getCategoriesById);

export default router;
