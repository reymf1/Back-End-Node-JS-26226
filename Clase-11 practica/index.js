import express from "express";
import booksRouter from "./src/routes/books.router.js";
import categoriesRouter from "./src/routes/categories.router.js";

const app = express();

app.use(express.json());

app.use("/api", booksRouter);
app.use("/api", categoriesRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
