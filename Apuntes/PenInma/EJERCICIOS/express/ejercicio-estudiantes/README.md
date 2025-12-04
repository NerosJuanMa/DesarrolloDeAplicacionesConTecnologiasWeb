# 📚 Ejercicio de Gestión de Estudiantes - CRUD Completo

## 🎯 Objetivo del Ejercicio

Este ejercicio está diseñado para que los estudiantes principiantes aprendan a crear una aplicación web completa con operaciones CRUD (Crear, Leer, Actualizar, Eliminar) utilizando:

- **Backend**: Node.js con Express
- **Frontend**: HTML, CSS y JavaScript vanilla
- **Datos**: Array en memoria (simulando una base de datos)

## 📁 Estructura del Proyecto

```
ejercicio-estudiantes/
├── package.json          # Dependencias y scripts
├── servidor.js           # Servidor backend con Express
├── README.md             # Este archivo
└── public/               # Archivos del frontend
    ├── index.html        # Estructura HTML
    ├── styles.css        # Estilos CSS
    └── app.js            # Lógica JavaScript
```

## 🚀 Cómo Ejecutar el Proyecto

### 1. Instalar dependencias
```bash
npm install
```

### 2. Iniciar el servidor
```bash
npm start
```
o para desarrollo con auto-reinicio:
```bash
npm run dev
```

### 3. Abrir en el navegador
```
http://localhost:3000
```

## 🔧 Funcionalidades Implementadas

### Backend (servidor.js)
- ✅ **GET /api/estudiantes** - Obtener todos los estudiantes
- ✅ **GET /api/estudiantes/:id** - Obtener un estudiante por ID
- ✅ **POST /api/estudiantes** - Crear un nuevo estudiante
- ✅ **PUT /api/estudiantes/:id** - Actualizar un estudiante
- ✅ **DELETE /api/estudiantes/:id** - Eliminar un estudiante
- ✅ Validaciones de datos
- ✅ Manejo de errores
- ✅ Middleware CORS y JSON
- ✅ Servir archivos estáticos

### Frontend (HTML/CSS/JS)
- ✅ **Interfaz de usuario intuitiva** con formularios
- ✅ **Lista de estudiantes** con tarjetas visuales
- ✅ **Operaciones CRUD completas**:
  - Agregar nuevos estudiantes
  - Ver lista de estudiantes
  - Editar estudiantes existentes
  - Eliminar estudiantes (con confirmación)
- ✅ **Validaciones en el frontend**
- ✅ **Mensajes de éxito y error**
- ✅ **Diseño responsive**
- ✅ **Animaciones y efectos visuales**

## 🎓 Conceptos que Aprenderán los Estudiantes

### Backend
1. **Servidor Express**: Configuración y middleware
2. **Rutas HTTP**: GET, POST, PUT, DELETE
3. **Manejo de JSON**: Recibir y enviar datos
4. **Validaciones**: Verificar datos antes de procesarlos
5. **Arrays**: Manipulación de datos en memoria
6. **Códigos de estado HTTP**: 200, 201, 404, 400, 500

### Frontend
1. **DOM Manipulation**: Acceso y modificación de elementos
2. **Fetch API**: Realizar peticiones HTTP desde JavaScript
3. **Eventos**: Manejo de formularios y clicks
4. **Async/Await**: Programación asíncrona
5. **Validaciones**: Verificar datos en el cliente
6. **CSS Grid/Flexbox**: Layouts modernos

## 📚 Datos de Ejemplo

El servidor incluye 4 estudiantes de ejemplo:

```javascript
[
  {
    id: 1,
    nombre: "Ana García",
    edad: 20,
    carrera: "Ingeniería en Sistemas",
    promedio: 8.5
  },
  {
    id: 2,
    nombre: "Carlos López",
    edad: 22,
    carrera: "Diseño Gráfico",
    promedio: 9.0
  },
  // ... más estudiantes
]
```

## 🧪 Ejercicios Propuestos para los Estudiantes

### Nivel Básico
1. **Agregar un nuevo estudiante** usando el formulario
2. **Editar la información** de un estudiante existente
3. **Eliminar un estudiante** de la lista
4. **Cargar y ver** la lista completa de estudiantes

### Nivel Intermedio
5. **Buscar estudiantes** por nombre o carrera
6. **Filtrar por promedio** (excelente, bueno, regular, bajo)
7. **Ordenar la lista** por nombre, edad o promedio
8. **Agregar más campos** (email, teléfono, etc.)

### Nivel Avanzado
9. **Persistencia**: Guardar datos en un archivo JSON
10. **Paginación**: Mostrar estudiantes de 5 en 5
11. **Subir foto**: Permitir imagen de perfil
12. **Exportar datos**: Generar archivo CSV o Excel

## 🎨 Características de la Interfaz

- **Colores**: Esquema moderno con gradientes
- **Tipografía**: Segoe UI para mejor legibilidad
- **Iconos**: Emojis para una interfaz amigable
- **Responsive**: Se adapta a móviles y tablets
- **Animaciones**: Efectos hover y transiciones suaves
- **Accesibilidad**: Contrastes adecuados y navegación por teclado

## 🔍 Endpoints de la API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/estudiantes` | Obtener todos los estudiantes |
| GET | `/api/estudiantes/:id` | Obtener estudiante por ID |
| POST | `/api/estudiantes` | Crear nuevo estudiante |
| PUT | `/api/estudiantes/:id` | Actualizar estudiante |
| DELETE | `/api/estudiantes/:id` | Eliminar estudiante |

## 💡 Consejos para el Profesor

1. **Explicar paso a paso** cada función del código
2. **Mostrar las herramientas de desarrollador** del navegador
3. **Enseñar a leer errores** en la consola
4. **Practicar con Postman** para probar el API
5. **Modificar los datos** para ver los cambios en tiempo real
6. **Experimentar** con diferentes validaciones

## 🚫 Posibles Errores Comunes

1. **Puerto ocupado**: Cambiar el puerto en `servidor.js`
2. **CORS**: Ya configurado en el servidor
3. **JSON malformado**: Verificar sintaxis en peticiones
4. **Campos requeridos**: Implementar validaciones
5. **IDs duplicados**: El servidor maneja la generación automática

## 📈 Extensiones Sugeridas

- **Base de datos**: Conectar con MongoDB o MySQL
- **Autenticación**: Agregar login y registro
- **Roles**: Profesor vs Estudiante
- **Notificaciones**: Alertas en tiempo real
- **API REST completa**: Seguir estándares REST
- **Testing**: Pruebas unitarias con Jest

## 🤝 Contribuciones

Este ejercicio está diseñado para ser educativo. Los estudiantes pueden:
- Proponer mejoras
- Añadir nuevas funcionalidades
- Mejorar el diseño
- Optimizar el código

---

💻 **¡Feliz programación!** 🎉
