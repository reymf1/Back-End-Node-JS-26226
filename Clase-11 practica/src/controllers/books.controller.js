import * as booksModel from "../models/books.model.js";

export const getBooks = (req, res) => {
  res.json(booksModel.findAllBooks());
};

export const getBooksById = (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = booksModel.findBookById(bookId);
  if (!book) {
    return res.status(404).json({ message: "Libro no encontrado" });
  }
  res.json(book);
};

export const createBook = (req, res) => {
  const { title, author, available = true } = req.body || {};
  if (!title || !author || typeof available !== "boolean") {
    return res.status(400).json({ message: "Faltan datos del libro" });
  }
  const newBook = booksModel.addBook({ title, author, available });
  res.status(201).json(newBook);
};
