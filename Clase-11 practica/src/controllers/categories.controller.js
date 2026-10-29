import * as categoriesModel from "../models/categories.model.js";

export const getAllCategories = (req, res) => {
  const categories = categoriesModel.findAllCategories();
  res.json(categories);
};

export const getCategoriesById = (req, res) => {
  const categoryId = parseInt(req.params.id);
  const category = categoriesModel.findCategoryById(categoryId);
  if (!category) {
    return res.status(404).json({ message: "Categoría no encontrada" });
  }
  res.json(category);
};
