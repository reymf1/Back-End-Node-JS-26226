import { Router } from "express";
import {
  getBooks,
  getBooksById,
  createBook,
} from "../controllers/books.controller.js";

const router = Router();

router.get("/books", getBooks);
router.get("/books/:id", getBooksById);
router.post("/books", createBook);

export default router;
