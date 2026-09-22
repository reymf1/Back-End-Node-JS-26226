//Módulos nativos de Node.js
import fs from "fs"; // Improto el módulo fs (gestiona archios, carpetas)

fs.writeFileSync("message.txt", "Hola Node.js ES Modules"); //Genero el archivo, Si el archivo no existe, lo crea. Si el archivo existe, lo sobreescribe

const message = fs.readFileSync("message.txt", "utf-8"); // Leo el mensaje
console.log(message);
