//---Promesas

export function prepararPedido() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        //Da 1 Nº entre 0 y 1
        resolve("Pedido preparado");
      } else {
        reject("Error al preparar el pedido");
      }
    }, 1000);
  }); //La promesa tiene un callback (función) que a suvez tiene 2 parámetros (que son funciones)
}
