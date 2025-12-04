# 📚 Ejercicio MongoDB - De JSON a Base de Datos

## 🎯 Objetivo del Ejercicio
En este ejercicio aprenderás a migrar de leer archivos JSON a usar una base de datos MongoDB real. Partiremos de tus conocimientos previos con archivos JSON y Node.js + Express para introducir conceptos de bases de datos.

## 🛠️ Tecnologías que usaremos
- **Node.js** - Entorno de ejecución de JavaScript
- **Express.js** - Framework web para Node.js  
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM (Object Document Mapper) para MongoDB

## 📋 Prerrequisitos
- Conocimientos básicos de JavaScript
- Experiencia previa leyendo archivos JSON en Node.js
- Node.js instalado en tu sistema

## 🚀 Configuración Inicial

### Paso 1: Instalar dependencias
```bash
npm init -y
npm install express mongoose
npm install -D nodemon
```

### Paso 2: Configurar scripts en package.json
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

## 📊 ¿Qué vamos a construir?
Un sistema simple de gestión de canciones que te permitirá:
- ✅ Ver todas las canciones
- ✅ Buscar canciones por artista
- ✅ Agregar nuevas canciones
- ✅ Actualizar información de canciones
- ✅ Eliminar canciones

## 📁 Estructura del Proyecto
```
ejercicioMongoo/
├── README.md
├── package.json
├── server.js
├── models/
│   └── Cancion.js
├── routes/
│   └── canciones.js
├── data/
│   └── canciones.json
└── public/
    ├── index.html
    ├── style.css
    └── script.js
```

## 🎓 Manual Paso a Paso

### Conceptos Clave

#### 1. **Diferencia entre JSON y MongoDB**
- **Archivo JSON**: Datos estáticos en un archivo
- **MongoDB**: Base de datos dinámica que permite operaciones CRUD

#### 2. **¿Qué es MongoDB?**
- Base de datos NoSQL (No Relacional)
- Almacena documentos en formato similar a JSON (BSON)
- Escalable y flexible

#### 3. **¿Qué es Mongoose?**
- Biblioteca que facilita el trabajo con MongoDB
- Permite definir esquemas y modelos
- Proporciona validación de datos

## 📝 Progreso del Ejercicio

### ✅ Etapa 1: Configuración básica
### ✅ Etapa 2: Modelo de datos
### ✅ Etapa 3: Rutas API
### ✅ Etapa 4: Frontend básico
### ✅ Etapa 5: Conectar con MongoDB

---

**¡Empecemos a construir!** 🚀
