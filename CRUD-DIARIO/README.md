# 🗂️ CRUD Diario — Gestor de Tareas, Notas y Citas
📎 *Proyecto Full Stack con Node.js, Express y JSON*  
🔗 [Mi Portfolio](https://nerosjuanma.github.io/JuanManuel-MudarraPozo.github.io/)

![Vista previa del proyecto](/frontend/assets/preview.png) 
---

## 🌟 Introducción
Este proyecto representa un paso importante en mi evolución como desarrollador web Full Stack.  
He creado una aplicación completa para **gestionar tareas diarias, notas personales y citas**, donde el **frontend** y el **backend** se comunican mediante una **API REST**.  

El CRUD Diario permite **crear, leer, actualizar y eliminar** registros almacenados en un archivo JSON, sirviendo como base de datos local.  
Más allá del código, este proyecto demuestra mi capacidad para conectar conceptos, resolver problemas y documentar mi propio progreso profesional.  

---

## 🎯 Objetivos
El principal objetivo de este ejercicio ha sido **entender de forma práctica la arquitectura cliente-servidor** y el ciclo completo de una aplicación web moderna.  

A través de este proyecto he buscado:  
- Comprender el funcionamiento de un CRUD completo mediante peticiones HTTP (`GET`, `POST`, `PUT`, `DELETE`).  
- Practicar la manipulación del **DOM** y el intercambio de datos en **JSON**.  
- Aprender a estructurar y documentar un servidor **Node.js con Express**.  
- Consolidar buenas prácticas de desarrollo y documentación profesional.  
- Desarrollar una interfaz funcional, clara y accesible.  

---

## 🧠 Conceptos Técnicos Aplicados
Este proyecto integra los fundamentos esenciales del desarrollo web Full Stack:  
- **CRUD completo**: operaciones Create, Read, Update y Delete sobre un archivo JSON.  
- **API REST con Express**: rutas y controladores para gestionar los datos desde el servidor.  
- **Frontend dinámico con JavaScript nativo**: manipulación del DOM, manejo de eventos y renderizado de datos en tiempo real.  
- **Persistencia local**: almacenamiento en archivos `.json` con el módulo `fs.promises`.  
- **Middlewares**: uso de `express.json()` y `cors()` para el manejo de datos y la comunicación entre orígenes.  
- **Validación y control de errores** básicos para garantizar un flujo seguro entre cliente y servidor.  

---

## ⚙️ Guía de Instalación y Ejecución
### 🔧 Requisitos Previos
- Node.js versión 18 o superior  
- Visual Studio Code  
- Navegador actualizado (Chrome, Edge o Firefox)  
- Extensión “Live Server” (recomendada para visualizar el frontend)  

### 🚀 Ejecución en Local
1️⃣ **Clonar el repositorio**
```bash
git clone https://github.com/NerosJuanMa/CRUD-DIARIO-GIT.git
cd CRUD-DIARIO-GIT/backend
```
2️⃣ **Instalar dependencias**
```bash
npm install

```
📋 **Inicializar un proyecto con Node:**
```bash
npm init -y
```
📋 **Instalar Express con sus dependencias básicas (middlewares):**
```bash
npm i express cors morgan helmet compression
```
📋 **Para usar import. Añadir en package.json:**
```bash
"type": "module"
```
📋 **Instalar nodemon:**
```bash
npm install -D nodemon
```
📋 **Añadir los scripts de ejecución. dejar start y añadir dev:**
```bash
"scripts":{
"dev": "nodemon servidor.js" 
}
```
3️⃣ **Iniciar el servidor, sobre server.js (Run Code)**
```bash
npm run dev
```
El servidor Express se ejecutará en:
```
http://localhost:3000/api/diario
```
4️⃣ **Abrir el frontend**
Abre el archivo `frontend/index.html` desde el navegador o mediante “Open with Live Server” en VS Code.  

5️⃣ **Probar las funcionalidades**
Desde la interfaz podrás:  
- Crear nuevas tareas, notas o citas.  
- Editarlas y eliminarlas fácilmente.  
- Ver los cambios reflejados automáticamente en los archivos JSON del backend.  

✅ Si todo funciona correctamente, podrás realizar las operaciones CRUD completas de forma local.  

---

## 🛠️ Aprendizaje Progresivo
Antes de este proyecto no había comprendido plenamente cómo se comunican el **frontend** y el **backend**.  
Ahora domino la lógica de las **rutas REST**, el flujo de **peticiones y respuestas HTTP**, y el manejo asíncrono de datos.  

Aprendí a:  
- Implementar rutas y controladores en Express.  
- Trabajar con archivos JSON como persistencia local.  
- Gestionar errores y estados HTTP (`200`, `201`, `404`, `500`).  
- Conectar una interfaz dinámica con el servidor.  

El mayor reto fue coordinar correctamente las rutas del backend con las peticiones `fetch()` del frontend.  
Superarlo me permitió entender el valor de una arquitectura bien estructurada y modular.  

Este proyecto simboliza mi transición de simples páginas HTML y CSS a **una aplicación Full Stack funcional**, donde el código cobra vida y los datos fluyen entre cliente y servidor.  

---

## 🧩 Tecnologías Usadas
**Frontend:**  
- HTML5  
- CSS3  
- JavaScript (DOM, Fetch API)  

**Backend:**  
- Node.js  
- Express  
- fs.promises  
- CORS  
- Nodemon  

**Estructura Modular Full Stack:**  
- Peticiones `fetch()` → Rutas REST en Express → Persistencia en JSON  

---

## 📁 Estructura del Proyecto
```
CRUD-DIARIO-GIT/
├── backend/
│   ├── node_modules/
│   ├── datosdiario.json
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── styles.css
│
├── .gitignore
└── README.md
```

---

## 🚀 Mejoras Futuras
- Conectar con una base de datos real (MongoDB o SQLite).  
- Añadir autenticación de usuario (registro y login).  
- Incorporar validaciones más completas y mensajes de error personalizados.  
- Subir y gestionar archivos adjuntos o imágenes.  
- Mejorar la interfaz y la accesibilidad.  

---

## 💬 Reflexión y Conclusión
El **CRUD Diario** ha sido mucho más que un ejercicio técnico: ha sido mi primer proyecto Full Stack real, donde el backend y el frontend trabajan de manera coordinada.  

A través de él comprendí cómo fluye la información en una **API REST**, cómo manejar datos estructurados en JSON y cómo construir un servidor Express desde cero.  
Más allá de la técnica, he aprendido a **documentar mi trabajo**, a explicar decisiones técnicas y a desarrollar una mentalidad profesional orientada a la mejora continua.  

Este proyecto marca un antes y un después en mi aprendizaje: ahora no solo escribo código, sino que construyo sistemas coherentes, funcionales y mantenibles.  

---

## 📫 Contacto
📧 Juan Manuel Mudarra Pozo — [jmmudarra@gmail.com](mailto:jmmudarra@gmail.com)  
💼 [LinkedIn](https://www.linkedin.com/in/nerosjuanma/)  
🌐 [Portfolio](https://nerosjuanma.github.io/JuanManuel-MudarraPozo.github.io/)
