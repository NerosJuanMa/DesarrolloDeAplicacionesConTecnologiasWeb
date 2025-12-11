

---

 🎵 CRUD Canciones — Gestor Musical con Node.js y Express

> “Detrás de cada línea de código hay una historia de aprendizaje, de ensayo y error, de superación.”

---

 📘 Índice

1. [Descripción General](-descripción-general)
2. [Tecnologías Utilizadas](-tecnologías-utilizadas)
3. [Objetivos del Proyecto](-objetivos-del-proyecto)
4. [Arquitectura y Estructura](-arquitectura-y-estructura)
5. [Funcionalidades Principales](-funcionalidades-principales)
6. [Instalación y Ejecución](-instalación-y-ejecución)
7. [Ejemplo de Datos](-ejemplo-de-datos)
8. [Aprendizaje y Retos Superados](-aprendizaje-y-retos-superados)
9. [Conceptos Técnicos Destacados](-conceptos-técnicos-destacados)
10. [Mejoras Futuras](-mejoras-futuras)
11. [Resultado Visual](-resultado-visual)
12. [Conclusión](-conclusión)
13. [Autora](-autora)

---

 🚀 Descripción General

CRUD Canciones es una aplicación Full Stack desarrollada como parte del módulo UF1844: Desarrollo de aplicaciones web en el entorno servidor.
Permite crear, listar, editar y eliminar canciones, gestionadas desde un backend en Node.js y Express y almacenadas en un archivo JSON local.

A través de este proyecto consolidé los fundamentos del desarrollo web moderno:
la comunicación cliente-servidor, el uso de APIs REST, y la importancia de una documentación clara y profesional.


---

 ⚙️ Tecnologías Utilizadas

| Categoría        | Tecnologías                              |
| ---------------- | ---------------------------------------- |
| Frontend     | HTML5, CSS3, JavaScript (DOM, Fetch API) |
| Backend      | Node.js, Express.js                      |
| Comunicación | API REST, CORS                           |
| Persistencia | Archivos JSON                            |
| Entorno      | Visual Studio Code, Nodemon, GitHub      |

---

 🎯 Objetivos del Proyecto

* Comprender el flujo completo cliente-servidor con peticiones HTTP reales.
* Implementar un CRUD funcional utilizando rutas REST en Express.
* Manejar persistencia de datos con JSON y validación básica.
* Practicar asincronía y manipulación dinámica del DOM.
* Documentar el proyecto con un README profesional, útil para reclutadores.

---

 🧩 Arquitectura y Estructura

```
crudCanciones/
├── backend/                 🖥️ Lógica del servidor
│   ├── server.js            Rutas y controladores Express
│   ├── canciones.json       “Base de datos” local (JSON)
│   ├── package.json         Dependencias y scripts npm
│   └── package-lock.json    Versiones exactas
│
├── frontend/                🌐 Interfaz de usuario
│   ├── index.html           Estructura del contenido
│   ├── script.js            Lógica del cliente (Fetch + DOM)
│   └── styles.css           Diseño visual y accesible
│
└── README.md                Documentación del proyecto
```

---

 🔧 Funcionalidades Principales

 🎧 Backend — `server.js`

| Método     | Ruta                 | Descripción                     |
| ---------- | -------------------- | ------------------------------- |
| GET    | `/api/canciones`     | Devuelve todas las canciones    |
| POST   | `/api/canciones`     | Añade una nueva canción         |
| PUT    | `/api/canciones/:id` | Actualiza una canción existente |
| DELETE | `/api/canciones/:id` | Elimina una canción             |

 💻 Frontend — `index.html`, `script.js`, `styles.css`

* Lista dinámica de canciones
* Formulario para añadir o editar
* Botones con confirmación de eliminación
* Validaciones simples y mensajes de depuración
* Estilo limpio y accesible

---

 ⚡ Instalación y Ejecución

 🔹 Requisitos previos

* Node.js ≥ 18
* Navegador actualizado
* Visual Studio Code (recomendado)

 🔹 Pasos para ejecutar

```bash
 1️⃣ Clonar el repositorio
git clone https://github.com/inma2709/crudCanciones.git
cd crudCanciones/backend

 2️⃣ Instalar dependencias
npm install

 3️⃣ Iniciar el servidor
npm run dev
 → Servidor activo en http://localhost:3001/api/canciones
```

 🔹 Abrir el frontend

Abre `frontend/index.html` desde tu navegador
(o usa “Open with Live Server” en VS Code).

> 💡 Si cambias el puerto, actualiza la variable `API_URL` en `frontend/script.js`.

---

 📊 Ejemplo de Datos

```json
[
  {
    "id": 1,
    "titulo": "Mediterráneo",
    "artista": "Joan Manuel Serrat",
    "anio": 1971
  },
  {
    "id": 2,
    "titulo": "Con Altura",
    "artista": "Rosalía",
    "anio": 2019
  }
]
```

---

 🧠 Aprendizaje y Retos Superados

Antes de este proyecto no comprendía del todo cómo se comunican el navegador y el servidor.
Implementar rutas en Express y trabajar con peticiones Fetch me ayudó a entender el ciclo completo de una API REST.

Aprendí a usar archivos JSON como sistema de persistencia, controlando errores de lectura y escritura, y a manejar los estados HTTP (200, 201, 404, 500) de forma clara.

Este ejercicio marcó un salto técnico y personal:
pasé de proyectos estáticos (HTML y CSS), a interactivos (JavaScript), y finalmente a una aplicación Full Stack funcional con Node.js y Express.

---

 🧱 Conceptos Técnicos Destacados

* CRUD completo con rutas REST
* Fetch API para comunicación cliente-servidor
* Manipulación del DOM dinámica
* Persistencia local con `fs.promises`
* Uso de `cors()` y `express.json()`
* Manejo de errores y validaciones
* Código comentado, accesible y mantenible

---

 🔮 Mejoras Futuras

* Conectar con una base de datos real (MongoDB, SQLite).
* Implementar autenticación de usuarios.
* Añadir buscador o filtros de canciones.
* Subir archivos (audio, portada).
* Mejorar interfaz y accesibilidad (`aria-live`, notificaciones).
* Desplegar backend (Render) y frontend (Vercel o Netlify).

---

 

 🧭 Conclusión

CRUD Canciones es mi primer proyecto Full Stack completo.
Me permitió integrar los conocimientos de HTML, CSS, JavaScript, Node y Express, y comprender cómo todas las piezas del desarrollo web encajan entre sí.

Además de programar, aprendí a documentar de forma profesional, estructurar el código y reflejar mi progreso de forma clara y ordenada.

---

 ✨ Autora

👩‍💻 María Inmaculada Contreras Iñíguez
📍 Desarrolladora Web en formación
📬 [GitHub](https://github.com/inma2709) · [LinkedIn](https://www.linkedin.com/) *(añádelo cuando quieras)*

> “Escuchar es el comienzo, practicar es el camino, repetir es el secreto.” 🎶

