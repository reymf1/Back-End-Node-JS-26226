const books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    available: true,
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    available: false,
  },
  { id: 3, title: "1984", author: "George Orwell", available: true },
];

export const findAllBooks = () => {
  return books;
};

export const findBookById = (id) => {
  return books.find((b) => b.id === Number(id));
};
export const addBook = ({ title, author, available }) => {
  const newBook = { id: books.length + 1, title, author, available };
  books.push(newBook);
  return newBook;
};
