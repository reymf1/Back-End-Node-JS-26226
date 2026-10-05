import http from "http";

const server = http.createServer((req, res) => {
    res.statusCode = 200;

  res.setHeader("Content-Type", "text/plain");

  res.end("Hola, mundo!");
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
