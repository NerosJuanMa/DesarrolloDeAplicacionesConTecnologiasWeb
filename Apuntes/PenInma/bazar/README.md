# 🛒 Sistema de Bazar Full-Stack - Proyecto Educativo

## 📋 Descripción General

Este proyecto es un **sistema completo de tienda online** diseñado con propósito educativo que incluye:

- **Backend**: API REST con Node.js, Express y MySQL
- **Frontend React**: Aplicación moderna con Vite y Context API  
- **Frontend HTML**: Versión en HTML/CSS/JS puro para principiantes
- **Funcionalidades**: Gestión de productos, autenticación JWT y sistema de pedidos

> 💡 **Ideal para**: Estudiantes que quieren aprender desarrollo web full-stack desde conceptos básicos hasta tecnologías modernas.

---

## 🏗️ Arquitectura del Sistema

### 📁 Estructura del Proyecto
```
bazar/
├── backend-bazar/           # API REST con Node.js + Express + MySQL
│   ├── config/             # Configuración de base de datos
│   ├── controllers/        # Lógica de negocio
│   ├── middlewares/        # Validaciones y autenticación JWT
│   ├── models/            # Interacción con base de datos
│   ├── routes/            # Definición de endpoints API
│   ├── init-db.js         # Script de inicialización de BD
│   └── server.js          # Servidor principal
├── bazar-frontend/         # Frontend moderno con React + Vite
│   ├── src/
│   │   ├── components/    # Componentes React reutilizables
│   │   ├── context/       # Context API para estado global
│   │   ├── pages/         # Páginas principales de la app
│   │   ├── services/      # Comunicación con API (fetch)
│   │   └── main.jsx       # Punto de entrada React
│   └── public/            # Archivos estáticos
└── frontend-html/          # Frontend tradicional HTML/CSS/JS
    ├── images/            # Sistema de imágenes de productos
    ├── index.html         # Estructura principal
    ├── styles.css         # Estilos responsive
    └── app.js            # Lógica en JavaScript vanilla
```

### 🎯 Propósito Educativo por Nivel

| Nivel | Tecnología | Para Estudiantes que... |
|-------|------------|------------------------|
| **Principiante** | `frontend-html/` | Prefieren HTML/CSS/JS tradicional |
| **Intermedio** | `bazar-frontend/` | Están listos para aprender React |
| **Avanzado** | `backend-bazar/` | Quieren crear APIs y manejar bases de datos |

---

## 🚀 Guía de Instalación

### 1. Prerrequisitos
- **Node.js** v18+ ([Descargar](https://nodejs.org))
- **MySQL** v8+ ([Descargar](https://dev.mysql.com/downloads/))
- **npm** (incluido con Node.js)

### 2. Configuración del Backend (Obligatorio)

```bash
# 1. Navegar al backend
cd backend-bazar

# 2. Instalar dependencias
npm install

# 3. Configurar base de datos
# Crear archivo .env con:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=bazar
JWT_SECRET=tu_clave_secreta_super_segura

# 4. Inicializar base de datos
node init-db.js

# 5. Iniciar servidor
npm start
# 🌐 Servidor corriendo en http://localhost:3000
```

### 3A. Frontend React (Opción Avanzada)

```bash
# 1. Navegar al frontend React
cd bazar-frontend

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
# 🚀 App disponible en http://localhost:5173
```

### 3B. Frontend HTML (Opción Principiante)

```bash
# ¡Solo abrir el archivo!
# 1. Navegar a frontend-html/
# 2. Doble clic en index.html
# 3. O usar Live Server en VS Code

# ✨ Funciona inmediatamente sin instalación
```

---

## ⭐ Características del Sistema

### 🔐 **Autenticación Completa**
- Registro de usuarios con validación
- Login con JWT (JSON Web Tokens)
- Sesiones persistentes en localStorage
- Middleware de protección de rutas

### 📦 **Gestión de Productos**
- Catálogo dinámico desde base de datos
- Filtros por categoría (Electrónicos, Ropa, Hogar)
- Sistema de stock e inventario
- Imágenes con fallback automático

### 🛒 **Carrito y Pedidos**
- Carrito de compras interactivo
- Creación de pedidos con múltiples productos
- Historial de pedidos por usuario
- Estados de pedido (pendiente, pagado, enviado)

### 📱 **Interfaz Responsive**
- Diseño móvil-first
- Compatible con tablets y desktop
- Animaciones suaves y UX moderna
- Feedback visual inmediato

---

## 🖼️ Sistema de Imágenes (Frontend HTML)

### Implementación Inteligente
```javascript
// El sistema busca imágenes en este orden:
1. images/producto-{id}.jpg    // Imagen local específica
2. Base de datos imagen_url    // URL desde BD
3. Placeholder automático      // Fallback con nombre
```

### Imágenes de Productos:

El sistema utiliza una imagen predeterminada para todos los productos:
```bash
# Ubicación de la imagen:
frontend-html/images/foto.png

# Para personalizar:
- Reemplaza foto.png con tu imagen preferida
- Tamaño recomendado: 400x400px (cuadrado)
- Formato: PNG, JPG, WEBP
```

---

## 🔌 API Endpoints

### Productos (Públicos)
```http
GET /api/productos              # Todos los productos
GET /api/productos?categoria=X  # Filtrar por categoría
GET /api/productos/:id          # Producto específico
```

### Autenticación
```http
POST /api/auth/register    # Registrar usuario
POST /api/auth/login       # Iniciar sesión
```

### Pedidos (Protegidos - Requieren JWT)
```http
POST /api/pedidos              # Crear pedido
GET /api/pedidos/mis-pedidos   # Mis pedidos
```

### Ejemplo de Uso
```javascript
// Registrar usuario
const response = await fetch('/api/auth/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    nombre: "Juan Pérez",
    email: "juan@ejemplo.com", 
    password: "mipassword123"
  })
});

// Crear pedido (con token)
const pedido = await fetch('/api/pedidos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    productos: [
      { id: 1, cantidad: 2 },
      { id: 3, cantidad: 1 }
    ]
  })
});
```

---

## 🎓 Comparación Educativa

### HTML/CSS/JS vs React

| Concepto | Frontend HTML | Frontend React |
|----------|---------------|----------------|
| **Estado** | `let globalState = {}` | `useState()` |
| **Renderizado** | `element.innerHTML = ...` | `return <JSX>` |
| **Eventos** | `addEventListener()` | `onClick={handler}` |
| **Efectos** | `DOMContentLoaded` | `useEffect()` |
| **Componentes** | Funciones → HTML strings | Componentes JSX |
| **Enrutamiento** | Una sola página | React Router |

### Progresión de Aprendizaje
1. **Empezar con HTML**: Entender conceptos fundamentales
2. **Migrar a React**: Aplicar lo aprendido con herramientas modernas  
3. **Crear el Backend**: Completar el stack full-stack

---

## 🛠️ Personalización y Desarrollo

### Cambiar URL de la API
```javascript
// En frontend-html/app.js (línea 25)
const API_URL = "http://localhost:3000/api";

// En bazar-frontend/src/services/api.js (línea 42)  
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
```

### Agregar Nuevos Productos
```sql
-- Ejecutar en MySQL
INSERT INTO productos (nombre, precio, stock, categoria, activo, imagen_url) 
VALUES ('Mi Nuevo Producto', 99.99, 10, 'Electrónicos', 1, 'images/producto-13.jpg');
```

### Modificar Estilos
```css
/* En styles.css */
:root {
  --primary-color: #4299e1;    /* Color principal */
  --secondary-color: #718096;   /* Color secundario */
}
```

---

## 🐛 Debugging y Herramientas

### Frontend HTML - Developer Tools
```javascript
// Abrir consola del navegador (F12)
window.bazarDebug.state()        // Ver estado actual
window.bazarDebug.clearCart()    // Limpiar carrito
window.bazarDebug.clearSession() // Cerrar sesión
window.bazarDebug.showState()    // Mostrar estado en tabla
```

### Logs del Sistema
- ✅ **Operaciones exitosas** (verde)
- ❌ **Errores y fallos** (rojo)
- 📦 **Datos cargados** (azul)
- 🔑 **Autenticación** (amarillo)

### Problemas Comunes

| Error | Causa | Solución |
|-------|-------|----------|
| `CORS error` | Backend no corriendo | Ejecutar `npm start` en backend-bazar |
| `globalState.products.map is not a function` | Problema de estructura de datos | Verificar que API devuelva array en `data` |
| `401 Unauthorized` | Token expirado | Cerrar y abrir sesión nuevamente |
| Imágenes no cargan | Archivo mal nombrado | Verificar nombres: `producto-{id}.jpg` |

---

## 📞 Soporte y Recursos

### 📚 Recursos de Aprendizaje
- [MDN Web Docs](https://developer.mozilla.org) - JavaScript, HTML, CSS
- [React Documentation](https://react.dev) - Guías oficiales de React
- [Node.js Docs](https://nodejs.org/docs) - Documentación del backend
- [MySQL Tutorial](https://dev.mysql.com/doc/) - Base de datos

### 🌐 Imágenes Gratuitas
- [Unsplash](https://unsplash.com) - Fotos de alta calidad
- [Pixabay](https://pixabay.com) - Imágenes sin copyright
- [Pexels](https://pexels.com) - Stock photos gratis

### 💡 Proyectos Sugeridos

#### Para Principiantes (HTML)
1. Agregar búsqueda de productos
2. Implementar wishlist/favoritos
3. Mejorar validaciones de formularios
4. Agregar más categorías

#### Para Intermedios (React)  
1. Implementar React Router
2. Agregar tests con Jest
3. Optimizar con React.memo
4. Implementar PWA (Progressive Web App)

#### Para Avanzados (Full-Stack)
1. Agregar sistema de roles (admin/user)
2. Implementar pagos con Stripe
3. Agregar notificaciones en tiempo real
4. Crear panel de administración

---

## 📊 Base de Datos

### Estructura de Tablas

#### `clientes`
```sql
CREATE TABLE clientes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### `productos`
```sql
CREATE TABLE productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  categoria VARCHAR(100) NOT NULL,
  imagen_url VARCHAR(500),
  activo BOOLEAN DEFAULT 1,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### `pedidos`
```sql
CREATE TABLE pedidos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id INT NOT NULL,
  estado ENUM('pendiente', 'pagado', 'enviado', 'entregado', 'cancelado') DEFAULT 'pendiente',
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cliente_id) REFERENCES clientes(id)
);
```

#### `pedidos_productos`
```sql
CREATE TABLE pedidos_productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  pedido_id INT NOT NULL,
  producto_id INT NOT NULL,
  cantidad INT NOT NULL DEFAULT 1,
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
  FOREIGN KEY (producto_id) REFERENCES productos(id)
);
```

---

## 📄 Licencia y Créditos

### 📜 Licencia
Este proyecto es de **uso educativo libre**. Puedes:
- ✅ Usarlo para aprender
- ✅ Modificarlo para proyectos personales  
- ✅ Compartirlo con otros estudiantes
- ✅ Crear proyectos derivados

### 👥 Contribuciones
¡Las contribuciones son bienvenidas!
1. Fork del repositorio
2. Crear rama para tu feature
3. Commit de cambios
4. Pull request con descripción clara

### 🙏 Agradecimientos  
Creado con 💜 para la comunidad de estudiantes que quieren aprender desarrollo web full-stack de manera práctica y progresiva.

---

**¡Happy Coding! 🚀**

*¿Tienes preguntas? ¡Revisa la documentación específica en cada carpeta o abre un issue en el repositorio!*
