import express from "express";
//import cors from "cors";

const app = express();
app.use(express.json()); //Configura Express para analizar el cuerpo de las solicitudes entrantes en formato JSON. Esto permite que los datos enviados en el cuerpo de la solicitud se puedan acceder como un objeto JavaScript a través de req.body.

//app.use(cors()); //Configura CORS (Cross-Origin Resource Sharing) para permitir solicitudes desde diferentes dominios. Esto es útil cuando el frontend y el backend están en dominios diferentes, ya que permite que el frontend haga solicitudes al backend sin restricciones de origen.

const tasks = [
  { id: 1, title: "Tarea 1", completed: false },
  { id: 2, title: "Tarea 2", completed: true },
  { id: 3, title: "Tarea 3", completed: false },
  { id: 4, title: "Tarea 4", completed: true },
];
app.get("/", (req, res) => {
  res.json({ message: "Task API" });
});

app.get("/api/tasks", (req, res) => {
  const { completed } = req.query;
  if (completed === undefined) {
    res.json(tasks);
  } else {
    if (completed !== "true" && completed !== "false") {
      return res
        .status(400)
        .json({ error: "El parámetro 'completed' debe ser 'true' o 'false'" });
    }
    const booleanCompleted = completed === "true"; //Compara el valor del parámetro completed con la cadena "true". Si son iguales, booleanCompleted será true; de lo contrario, será false. Esto convierte el valor de la cadena en un valor booleano que se puede usar para filtrar las tareas.
    const filteredTasks = tasks.filter(
      (task) => task.completed === booleanCompleted,
    );
    return res.json(filteredTasks);
  }
});

app.get("/api/tasks/:id", (req, res) => {
  const taskID = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskID);
  if (!task) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }
  res.json({ parametros: req.params, taskID: task.id, task: task });
});

app.post("/api/tasks", (req, res) => {
  const { title, completed } = req.body;
  if (!title || completed === undefined) {
    return res.status(422).json({ error: "Faltan datos de la tarea" });
  }
  const newTask = {
    id: tasks.length + 1,
    title,
    completed: completed === "true",
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.use((req, res, next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
}); //Siempre que se hace una solicitud a una ruta que no está definida en el servidor, se ejecuta este middleware. Envía una respuesta con un código de estado 404 (No encontrado) y un mensaje de error en formato JSON. Va al final de todas las rutas para capturar cualquier solicitud que no coincida con las rutas definidas anteriormente.

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
