Perfecto 🙌
Aquí tienes un README.md completo, claro y profesional para tu proyecto backend con Node.js + Express + Mongoose, siguiendo buenas prácticas de documentación y con estilo didáctico (para que tus alumnos o colaboradores entiendan cada parte).

---

````markdown
# 🧩 Proyecto Backend — API REST con Node.js + Express + Mongoose

Este proyecto forma parte del Manual “Mongoo” y tiene como objetivo crear una API REST educativa conectada a MongoDB Atlas usando Mongoose.  
A través de este proyecto, aprenderás los fundamentos del desarrollo backend moderno: conexión a base de datos, creación de modelos, rutas, controladores y operaciones CRUD.

---

 🚀 Características principales

- Framework Express.js para la creación del servidor y gestión de rutas.  
- ORM Mongoose para modelar datos de MongoDB.  
- Configuración con variables de entorno mediante dotenv.  
- Estructura modular (MVC simplificado).  
- CRUD completo (Create, Read, Update, Delete) sobre la colección `productos`.  
- Soporte para filtros, búsquedas y consultas con parámetros (`?nombre=camiseta&activo=true`).  
- Preparado para ampliarse con más modelos (usuarios, pedidos, etc.).

---

 🗂️ Estructura del proyecto

```bash
backend/
├─ src/
│  ├─ config/
│  │  └─ db.js              # Conexión a MongoDB con Mongoose
│  ├─ controllers/
│  │  └─ productos.controller.js
│  ├─ models/
│  │  └─ Producto.js        # Esquema y modelo de productos
│  ├─ routes/
│  │  └─ productos.routes.js
│  ├─ server.js             # Punto de entrada del servidor Express
│  └─ app.js                # Configuración del servidor (middlewares, rutas, etc.)
├─ .env                     # Variables de entorno (no subir a Git)
├─ .gitignore
├─ package.json
└─ README.md
````

---

 ⚙️ Instalación y configuración

1. Clona el repositorio

   ```bash
   git clone https://github.com/usuario/nombre-del-repo.git
   cd nombre-del-repo
   ```

2. Instala las dependencias

   ```bash
   npm install
   ```

3. Crea un archivo `.env` con tus credenciales de MongoDB Atlas:

   ```bash
   MONGO_URI="mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net"
   MONGO_USER="<tu_usuario>"
   MONGO_PASS="<tu_contraseña>"
   MONGODB_DB="tienda"
   PORT=3000
   ```

4. Inicia el servidor

   ```bash
   npm run dev
   ```

   *(Usa nodemon para recarga automática durante el desarrollo.)*

---

 🧠 Explicación pedagógica

Este proyecto permite al alumno visualizar la transición práctica entre:

* la consola de `mongosh` (Tema 7 del Manual Mongoo) y
* el entorno programado con Mongoose (Tema 8).

Cada módulo del proyecto refuerza un concepto:

| Carpeta        | Aprendizaje asociado                      |
| -------------- | ----------------------------------------- |
| `config/`      | Conexión y variables de entorno           |
| `models/`      | Definición de esquemas y validaciones     |
| `controllers/` | Lógica de negocio y operaciones CRUD      |
| `routes/`      | API REST y endpoints públicos             |
| `server.js`    | Inicialización del servidor y middlewares |

---

 🧩 Endpoints principales

| Método   | Ruta                                                | Descripción                     |
| -------- | --------------------------------------------------- | ------------------------------- |
| `GET`    | `/api/productos`                                    | Lista todos los productos       |
| `GET`    | `/api/productos/:id`                                | Muestra un producto por ID      |
| `GET`    | `/api/productos/buscar?nombre=camiseta&activo=true` | Busca por campos o filtros      |
| `POST`   | `/api/productos`                                    | Crea un nuevo producto          |
| `PUT`    | `/api/productos/:id`                                | Actualiza un producto existente |
| `DELETE` | `/api/productos/:id`                                | Elimina un producto             |

> 📘 Nota: la ruta `/buscar` debe declararse antes de `/id` para evitar conflictos de coincidencia de rutas.

---

 🧱 Ejemplo de modelo Mongoose

```js
// src/models/Producto.js
import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true, trim: true },
  precio: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 0 },
  activo: { type: Boolean, default: true },
}, {
  timestamps: true
});

export default mongoose.model("Producto", productoSchema);
```

---

 🧪 Ejemplo de uso con fetch o Postman

# Crear un producto

```bash
POST http://localhost:3000/api/productos
Content-Type: application/json

{
  "nombre": "Camiseta verde Mongo",
  "precio": 19.99,
  "stock": 20
}
```

# Buscar productos activos

```bash
GET http://localhost:3000/api/productos/buscar?activo=true
```

---

 🧰 Scripts útiles

| Comando       | Descripción                                  |
| ------------- | -------------------------------------------- |
| `npm run dev` | Inicia el servidor con nodemon               |
| `npm start`   | Inicia el servidor normal                    |
| `npm test`    | (Reservado para pruebas automáticas futuras) |

---

 🧭 Próximos pasos (nivel intermedio)

* Añadir validaciones avanzadas y mensajes personalizados.
* Integrar datos ficticios con Faker.js para poblar la base de datos.
* Crear relaciones entre modelos (por ejemplo, `Pedido` y `Usuario`).
* Probar peticiones con Axios desde un frontend React.

---

 👩‍🏫 Autoría

Proyecto didáctico desarrollado para el Manual “Mongoo”
por Inmaculada Contreras (inma2709).

💚 Inspirado en el aprendizaje activo, la accesibilidad y la conexión entre MongoDB y MySQL.

---

 🪪 Licencia

Distribuido bajo licencia MIT.
Puedes usarlo libremente con fines educativos y no comerciales.

---

```

---

¿Quieres que te lo adapte con capturas o badges (Node, Express, MongoDB, License) al estilo de GitHub profesional (por ejemplo: ![Node.js](https://img.shields.io/badge/Node.js-18-green) etc.)?  
Puedo añadirlos arriba del README para darle un aspecto más visual y moderno.
```
