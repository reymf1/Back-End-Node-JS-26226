//--Módulo interno--

import os from "node:os"; //Módulo nativo (Sistema operativo)

export function mostrarEntorno() {
  return `Sistema: ${os.platform()} | Arquitectura: ${os.arch()}`;
}
