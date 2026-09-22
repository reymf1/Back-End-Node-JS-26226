//const message = "Hola mundo!";
//console.log(message);

//const turno = {
//paciente: "Lara",
//especialidad: "Clínica",
//hora: "10:30",
//estado: "pendiente",
//};
//console.log(turno);

//const argumentos = process.argv.slice(2); //slice(2) elimina las dos primeras posiciones que agrega Node automáticamente. Esto es un módulo nativo.
//console.log(argumentos);

//--Módulo interno--
//import { mostrarTurno, confirmarTurno } from "./turnos.js"; //Importo //2 funciones del módulo interno creado turnos.js
//
//const turnoPaciente = {
//paciente: "Lara",
//especialidad: "Clínica",
//hora: "10:30",
//estado: "pendiente",
//};
//
////const mensaje = mostrarTurno(turnoPaciente);
////console.log(mensaje);
//
//const turnoConfirmado = confirmarTurno(turnoPaciente);
//
//console.log("Original: ", turnoPaciente);
//console.log("Confirmado: ", turnoConfirmado);
//
//const mensaje = mostrarTurno(turnoPaciente);
//console.log(mensaje);
//----

//--Módulo externo

//import pc from "picocolors";
//
//console.log(pc.red("Agenda iniciada"));

//const cowsay = require("cowsay");
//import cowsay from "cowsay";
//
//console.log(
//cowsay.say({
//text: "I'm a moooodule",
//e: "oO",
//T: "U ",
//}),
//);

//----

//--Módulo interno--

import { mostrarEntorno } from "./sistema.js";

console.log(mostrarEntorno());

//----
