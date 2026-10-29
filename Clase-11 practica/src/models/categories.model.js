const categorias = [
  { id: 1, nombre: "Ficción" },
  { id: 2, nombre: "No Ficción" },
  { id: 3, nombre: "Ciencia" },
];

export const findAllCategories = () => {
  return categorias;
};

export const findCategoryById = (id) => {
  return categorias.find((c) => c.id === Number(id));
};
