# API educativa de productos

API REST para gestionar productos, construida con Node.js, Express y Firebase/Firestore. El proyecto sirve como base educativa para practicar rutas, middlewares, validación, autenticación JWT, separación por capas y pruebas HTTP automatizadas.

Funcionalidades principales:

- CRUD de productos almacenados en Firestore.
- Validación de entradas con Zod.
- Login demostrativo y protección de escrituras mediante JWT.
- Errores centralizados en formato JSON.
- Pruebas con Jest y Supertest sin utilizar Firebase real.

## Tecnologías

- Node.js.
- Express 5.1.
- Firebase 11.10 y Firestore.
- JSON Web Token 9.0.
- Zod 4.4.
- validator.js 13.15.
- Jest 30.4.
- Supertest 7.2.

Las versiones completas declaradas se encuentran en `package.json`.

## Requisitos

- Node.js y npm. El proyecto fue verificado con Node.js 24.14.0.
- Un proyecto de Firebase con Firestore configurado.
- Los valores de configuración web del proyecto Firebase.

No se ha verificado formalmente la compatibilidad con otras versiones de Node.js.

## Instalación

```bash
git clone URL_DEL_REPOSITORIO
cd espacio-entrega-final
npm install
```

Copia la plantilla de variables de entorno:

```bash
cp .env.example .env
```

En PowerShell también puedes usar:

```powershell
Copy-Item .env.example .env
```

Completa `.env` con la configuración de tu proyecto. El archivo `.env` contiene datos locales y no debe subirse al repositorio; `.env.example` solo contiene marcadores seguros y sí debe versionarse.

## Variables de entorno

| Variable | Uso |
| --- | --- |
| `PORT` | Puerto HTTP. Si se omite, la aplicación usa `3001`. |
| `JWT_SECRET` | Clave utilizada para firmar y verificar los JWT. Debe reemplazarse por un valor propio. |
| `FIREBASE_API_KEY` | API key de la configuración web de Firebase. |
| `FIREBASE_AUTH_DOMAIN` | Dominio de autenticación del proyecto Firebase. |
| `FIREBASE_PROJECT_ID` | Identificador del proyecto Firebase. |
| `FIREBASE_STORAGE_BUCKET` | Bucket asociado al proyecto Firebase. |
| `FIREBASE_MESSAGING_SENDER_ID` | Identificador del remitente de Firebase. |
| `FIREBASE_APP_ID` | Identificador de la aplicación Firebase. |

El proyecto todavía no valida automáticamente estas variables al iniciar.

## Scripts

| Comando | Descripción |
| --- | --- |
| `npm start` | Inicia la API con Node.js. |
| `npm run dev` | Inicia la API con nodemon y reinicia ante cambios. |
| `npm test` | Ejecuta una vez los tests con Jest. |
| `npm run test:watch` | Ejecuta Jest en modo observación. |
| `npm run test:coverage` | Ejecuta los tests y genera el informe en `coverage/`. |
| `npm run db:seed` | Crea o actualiza los productos iniciales sin borrar otros documentos. |
| `npm run db:reset` | Elimina toda la colección `products` y vuelve a cargar los datos iniciales. |

Para iniciar en desarrollo:

```bash
npm run dev
```

Por defecto la API queda disponible en `http://localhost:3000`.

## Documentación de la API

Con el servidor iniciado, Swagger UI está disponible en:

```text
http://localhost:3000/api/docs
```

La especificación OpenAPI 3 en formato JSON está disponible en:

```text
http://localhost:3000/api/docs.json
```

Para probar una ruta protegida desde Swagger UI:

1. Ejecuta el endpoint de login.
2. Copia solamente el valor del token recibido.
3. Presiona el botón **Authorize**.
4. Introduce el token, sin escribir manualmente el prefijo `Bearer`.
5. Ejecuta POST, PUT o DELETE de productos.

La documentación se genera a partir de la configuración OpenAPI y las anotaciones JSDoc incluidas en `src/docs/`.

## Estructura

```text
.
├── index.js
├── jest.config.js
├── src/
│   ├── app.js
│   ├── config/
│   ├── controllers/
│   ├── database/
│   ├── docs/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── schemas/
│   └── services/
└── tests/
    ├── auth.test.js
    ├── errors.test.js
    ├── products-query.test.js
    ├── products.test.js
    ├── seed-data.test.js
    ├── swagger.test.js
    └── setup.js
```

- `routes`: define los endpoints y selecciona sus middlewares.
- `controllers`: recibe datos HTTP, llama al service y envía la respuesta.
- `services`: contiene la lógica de la aplicación, como fechas y comprobaciones de existencia.
- `models`: realiza las operaciones de Firebase/Firestore.
- `database`: contiene los datos iniciales y el script de carga controlada.
- `schemas`: define las reglas de validación con Zod.
- `middlewares`: valida cuerpos, comprueba JWT y procesa errores.
- `tests`: comprueba el comportamiento HTTP con el model simulado.
- `src/app.js`: crea y configura Express sin abrir un puerto.
- `index.js`: carga el entorno e inicia el servidor.

El flujo general de una solicitud es:

```text
Cliente
→ Router
→ Middleware
→ Controller
→ Service
→ Model
→ Firebase
→ Respuesta JSON
```

No todas las rutas necesitan todos los middlewares. Por ejemplo, las consultas de productos son públicas, mientras que las escrituras requieren JWT.

## Contrato de producto

Un producto devuelto por la API tiene esta forma:

```json
{
  "id": "product-id",
  "name": "Café",
  "price": 10,
  "stock": 5,
  "description": "Café molido",
  "createdAt": "2026-07-22T20:45:35.972Z",
  "updatedAt": "2026-07-22T20:45:35.972Z"
}
```

Reglas principales:

- `id` es generado por Firebase.
- `name` es obligatorio y debe tener entre 2 y 100 caracteres.
- `price` debe ser un número mayor que cero. El string `"10"` no es aceptado como número.
- `stock` debe ser un entero mayor o igual a cero.
- `description` es opcional, no puede quedar vacía y admite hasta 500 caracteres.
- `createdAt` y `updatedAt` son cadenas ISO generadas por la aplicación; el cliente no debe enviarlas.
- Las propiedades desconocidas se eliminan antes de llegar al controller.
- En una actualización todos los campos son opcionales, pero debe enviarse al menos uno válido.

## Autenticación

### Login

```http
POST /api/auth/login
Content-Type: application/json
```

Cuerpo:

```json
{
  "email": "user@email.com",
  "password": "strongPass123!"
}
```

Respuesta exitosa, estado `200`:

```json
{
  "token": "TOKEN"
}
```

Credenciales incorrectas, estado `401`:

```json
{
  "error": "Las credenciales no son correctas"
}
```

La contraseña debe tener al menos 8 caracteres e incluir una mayúscula, una minúscula, un número y un símbolo.

> La autenticación actual es demostrativa: el usuario y la contraseña están definidos en el código. No es un mecanismo adecuado para producción y todavía no existen registro, hashing ni persistencia de usuarios.

Para acceder a una ruta protegida, envía el token así:

```http
Authorization: Bearer TOKEN
```

## Endpoints

| Método | Ruta | Protegida | Descripción |
| --- | --- | :---: | --- |
| `GET` | `/` | No | Mensaje de bienvenida. |
| `POST` | `/api/auth/login` | No | Valida credenciales y genera un JWT. |
| `GET` | `/api/products` | No | Busca, filtra, ordena y pagina productos. |
| `GET` | `/api/products/:id` | No | Devuelve un producto por ID. |
| `POST` | `/api/products` | Sí | Crea un producto. |
| `PUT` | `/api/products/:id` | Sí | Actualiza parcialmente un producto. |
| `DELETE` | `/api/products/:id` | Sí | Elimina un producto. |

### Respuestas principales

| Operación | Éxito | Errores principales |
| --- | --- | --- |
| Login | `200` con token | `400` por validación; `401` por credenciales incorrectas. |
| Obtener productos | `200` con `data` y `pagination` | `400` por queries inválidas; `500` ante un fallo interno. |
| Obtener por ID | `200` con producto | `404` si no existe; `500` ante un fallo interno. |
| Crear | `201` con producto creado | `400`, `401`, `403` o `500`. |
| Actualizar | `200` con producto actualizado | `400`, `401`, `403`, `404` o `500`. |
| Eliminar | `204` sin cuerpo | `401`, `403`, `404` o `500`. |

Un token faltante devuelve `401`. La implementación actual devuelve `403` cuando el token enviado es inválido o está expirado.

## Ejemplos con curl

### 1. Iniciar sesión

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@email.com","password":"strongPass123!"}'
```

Guarda el valor recibido para utilizarlo conceptualmente como `TOKEN`.

### 2. Obtener todos los productos

```bash
curl http://localhost:3000/api/products
```

La respuesta siempre contiene los productos y los metadatos de paginación:

```json
{
  "data": [
    {
      "id": "product-id",
      "name": "Café",
      "price": 10,
      "stock": 5,
      "description": "Café molido",
      "createdAt": "2026-07-22T20:45:35.972Z",
      "updatedAt": "2026-07-22T20:45:35.972Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPreviousPage": false
  }
}
```

Valores predeterminados: `page=1`, `limit=10`, `sort=name` y `order=asc`.

Parámetros disponibles:

| Parámetro | Descripción |
| --- | --- |
| `page` | Página, entero mayor o igual a 1. |
| `limit` | Elementos por página, entre 1 y 100. |
| `name` | Búsqueda parcial que ignora mayúsculas y acentos. |
| `minPrice` | Precio mínimo incluido. |
| `maxPrice` | Precio máximo incluido. |
| `inStock` | `true` para stock mayor que cero; `false` para stock igual a cero. |
| `sort` | `name`, `price`, `stock`, `createdAt` o `updatedAt`. |
| `order` | `asc` o `desc`. |

Ejemplos:

```bash
curl "http://localhost:3000/api/products?page=1&limit=5"
curl "http://localhost:3000/api/products?name=cafe"
curl "http://localhost:3000/api/products?minPrice=10&maxPrice=100"
curl "http://localhost:3000/api/products?inStock=true"
curl "http://localhost:3000/api/products?sort=price&order=desc"
curl "http://localhost:3000/api/products?name=cafe&inStock=true&sort=price&order=asc&page=1&limit=5"
```

La búsqueda, los filtros, el ordenamiento y la paginación se realizan actualmente en memoria después de obtener todos los productos. Es una solución clara para este proyecto educativo y colecciones pequeñas. Para grandes volúmenes conviene trasladar estas operaciones a consultas nativas y paginación por cursores de Firestore.

### 3. Obtener un producto

```bash
curl http://localhost:3000/api/products/ID_DEL_PRODUCTO
```

### 4. Crear un producto

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Café","price":10,"stock":5,"description":"Café molido"}'
```

La respuesta utiliza estado `201` e incluye `id`, `createdAt` y `updatedAt`.

### 5. Actualizar parcialmente

```bash
curl -X PUT http://localhost:3000/api/products/ID_DEL_PRODUCTO \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"price":12,"stock":4}'
```

### 6. Eliminar

```bash
curl -X DELETE http://localhost:3000/api/products/ID_DEL_PRODUCTO \
  -H "Authorization: Bearer TOKEN"
```

Una eliminación exitosa devuelve `204 No Content`, sin JSON ni otro cuerpo.

### 7. Provocar un error de validación

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Café","price":-1,"stock":5}'
```

## Errores

Los errores generales usan este formato:

```json
{
  "error": "Mensaje comprensible"
}
```

Una validación puede incluir detalles:

```json
{
  "error": "Datos inválidos",
  "details": [
    {
      "field": "price",
      "message": "El precio debe ser mayor que cero"
    }
  ]
}
```

Otros ejemplos reales:

| Situación | Estado | Respuesta |
| --- | ---: | --- |
| JSON malformado | `400` | `{"error":"JSON inválido"}` |
| Token faltante | `401` | `{"error":"Token no proporcionado"}` |
| Token inválido o expirado | `403` | `{"error":"Token inválido o expirado"}` |
| Producto inexistente | `404` | `{"error":"Producto no encontrado"}` |
| Ruta inexistente | `404` | `{"error":"Ruta no encontrada"}` |
| Error interno | `500` | `{"error":"Error interno del servidor"}` |

Los detalles técnicos y mensajes internos de Firebase se registran durante el desarrollo, pero no se exponen al cliente.

## Datos iniciales

El proyecto incluye 18 productos fijos con IDs conocidos, precios variados, fechas progresivas y productos con y sin stock. Ambos comandos utilizan la configuración Firebase de `.env` y trabajan directamente con Firestore; no inician Express.

### Cargar o actualizar productos iniciales

```bash
npm run db:seed
```

Este comando:

- crea o actualiza los 18 documentos iniciales;
- utiliza IDs deterministas y no genera duplicados;
- conserva cualquier otro documento existente en `products`;
- valida todos los datos antes de escribir.

### Reiniciar la colección

```bash
npm run db:reset
```

> **ADVERTENCIA — operación destructiva:** elimina todos los documentos actuales de la colección `products` y luego carga nuevamente los 18 productos iniciales. No ejecutar contra una base de datos de producción. Debe utilizarse únicamente en desarrollo, clases o demostraciones.

El borrado y la escritura se dividen en batches de hasta 400 operaciones. El nombre de la colección está fijado internamente y no puede recibirse desde la terminal.

## Testing

Ejecutar todos los tests:

```bash
npm test
```

Modo observación:

```bash
npm run test:watch
```

Informe de cobertura:

```bash
npm run test:coverage
```

Jest ejecuta las pruebas y Supertest realiza solicitudes HTTP directamente sobre `src/app.js`, sin iniciar manualmente el servidor. El model de productos se reemplaza por mocks ESM, por lo que los tests no se conectan a Firebase ni crean, modifican o eliminan documentos reales.

El último resultado verificado es de 62 tests distribuidos en 6 suites. La cobertura sirve para localizar código no ejercitado, pero no garantiza por sí sola la calidad del proyecto.

## Limitaciones actuales

- La autenticación es demostrativa y utiliza credenciales definidas en el código.
- No hay registro, hashing ni persistencia de usuarios.
- El acceso a Firebase no tiene tests propios con emulador.
- Los documentos antiguos de la colección pueden no cumplir el contrato actual.
- La paginación y los filtros se ejecutan en memoria y no están diseñados para colecciones grandes.
- No hay integración continua.
- La configuración del entorno no se valida automáticamente al iniciar.

## Mejoras futuras

- Persistir usuarios e incorporar registro y hashing con bcrypt.
- Probar el model mediante Firebase Emulator.
- Validar las variables de entorno al iniciar.
- Incorporar GitHub Actions para ejecutar la suite automáticamente.
- Revisar y actualizar las dependencias de forma controlada.
