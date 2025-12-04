# Instrucciones para probar la aplicación

## 🚀 Cómo ejecutar el proyecto

### 1. Backend (API)
```bash
cd backend
npm start
```
El servidor estará disponible en: http://localhost:3000

### 2. Frontend
Abrir en el navegador: `frontend/index_simple.html`

## 🧪 Pruebas de la API

### Obtener todos los libros
```bash
GET http://localhost:3000/api/libros
```

### Obtener un libro por ID
```bash
GET http://localhost:3000/api/libros/1
```

### Crear un libro
```bash
POST http://localhost:3000/api/libros
Content-Type: application/json

{
  "titulo": "El Quijote",
  "autor": "Miguel de Cervantes",
  "anio": 1605
}
```

### Actualizar un libro
```bash
PUT http://localhost:3000/api/libros/1
Content-Type: application/json

{
  "titulo": "Don Quijote de la Mancha",
  "autor": "Miguel de Cervantes",
  "anio": 1605
}
```

### Eliminar un libro
```bash
DELETE http://localhost:3000/api/libros/1
```

## 📁 Estructura del proyecto simplificada

```
ejercicioCrud/
├── backend/
│   ├── server.js              # Servidor Express
│   ├── package.json           # Dependencias
│   ├── controllers/
│   │   └── libros.controller.js  # Lógica de negocio
│   ├── models/
│   │   └── libros.model.js       # Acceso a datos
│   ├── routes/
│   │   └── libros.routes.js      # Rutas de la API
│   └── data/
│       └── libros.json           # Base de datos JSON
└── frontend/
    ├── index_simple.html      # Interfaz de usuario
    ├── script.js              # JavaScript del frontend
    ├── styles_simple.css      # Estilos CSS
    └── libro.png              # Imagen por defecto
```

## ✅ Funcionalidades

- ✅ Crear libros (título, autor, año)
- ✅ Listar todos los libros
- ✅ Obtener un libro por ID
- ✅ Actualizar libros
- ✅ Eliminar libros
- ✅ Validación de datos
- ✅ Manejo de errores
- ✅ Interfaz web responsive

## 🔧 Mejoras realizadas

1. **Backend simplificado**: Código más limpio y mantenible
2. **Frontend optimizado**: JavaScript más eficiente y comprensible
3. **HTML minimalista**: Sin elementos innecesarios
4. **CSS responsive**: Diseño moderno y adaptable
5. **Manejo de errores**: Mejor experiencia de usuario

¡La aplicación está lista para usar! 🎉
