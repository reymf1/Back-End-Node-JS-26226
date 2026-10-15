import express from "express";

const app = express();

const courses = [
  {
    id: 1,
    title: "Introducción a JavaScript",
    description: "Aprende los fundamentos de JavaScript",
    featured: true,
  },
  {
    id: 2,
    title: "Desarrollo Web con Node.js",
    description: "Construye aplicaciones web con Node.js",
    featured: true,
  },
  {
    id: 3,
    title: "Base de datos SQL",
    description: "Manejo de bases de datos relacionales",
    featured: false,
  },
];

const schedule = [
  {
    id: 1,
    title: "Introducción a JavaScript",
    description: "Aprende los fundamentos de JavaScript",
    date: "2023-10-01",
  },
  {
    id: 2,
    title: "Desarrollo Web con Node.js",
    description: "Construye aplicaciones web con Node.js",
    date: "2023-10-08",
  },
];

app.get("/", (req, res) => {
  res.json({ message: "Cartelera de cursos" });
});

app.get("/api/courses", (req, res) => {
  res.json(courses);
});

app.get("/api/courses/schedule", (req, res) => {
  res.json(schedule);
});

app.get("/api/courses/featured", (req, res) => {
  const featuredCourses = courses.filter((course) => course.featured);
  res.json(featuredCourses);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`API disponible en http://localhost:${PORT}`);
});
