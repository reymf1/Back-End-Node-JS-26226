//Este proceso es asincrónico
//console.log("Inicio");
//setTimeout(() => console.log("Resultado demorado"), 1000);
//console.log("Fin");

// --- Callback

//function prepararPedido(callback) {
//setTimeout(() => callback("Pedido preparado"), 1000); //setTimeout recibe 2 argumentos: el 1º es una función (callback) y el segundo el tiempo
//}
//prepararPedido((mensaje) => console.log(mensaje)); //Paso una función como parámetro(callback)

//---Promesas

//import { prepararPedido } from "./tareas.js";

//console.log(prepararPedido()); //La promesa va estar pendiente, ya que no se resolvió hasta ahora

//prepararPedido()
//.then((mensaje) => console.log(mensaje))
//.catch((error) => console.log(error));

//async function ejecutarPedido() {
//try {
//const mensaje = await prepararPedido(); //Espero a que la promesa se resuelva. Una vez que se resuelve se obtiene el resultado en //mensaje
//console.log(mensaje);
//} catch (error) {
//console.log(error);
//}
//}

//ejecutarPedido();

//---fetch

const url = "https://jsonplaceholder.typicode.com/users/2";

//fetch(url)
//.then((response) => response.json()) //Devuelve la promesa transformado a json
//.then((data) => console.log(data)) //Capturo la promesa. Me trae el dato (el usuario)
//.catch((error) => console.log(error));

async function obtenerUsuarios() {
  try {
    const response = await fetch(url); //Devuelve la promesa
    if (!response.ok) {
      //Hay error?
      throw new Error("Error al obtener los usuarios");
    }
    const usuarios = await response.json(); //Transformo la respuesta a json
    console.log(usuarios);
  } catch (error) {
    console.log(error);
  } finally {
    console.log("Proceso de obtención de usuarios finalizado");
  }
}

obtenerUsuarios();
