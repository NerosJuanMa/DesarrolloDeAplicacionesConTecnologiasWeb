# 🦉 Senderos CRUD - Instrucciones de uso

## ¿Cómo ejecutar la aplicación?

### Paso 1: Iniciar el servidor
1. Navega a la carpeta `backend`
2. Ejecuta **uno** de estos comandos:
   - **Opción A (más fácil):** Doble clic en `iniciar-servidor.bat`
   - **Opción B (línea de comandos):** 
     ```cmd
     cd backend
     node server.js
     ```

### Paso 2: Abrir la aplicación
1. Abre tu navegador web
2. Ve a: **http://localhost:3001**

## ¿Qué debería pasar?
- ✅ Verás el título "🦉🌳Listado de senderos 🍀🍀"
- ✅ Se cargarán las tarjetas de senderos existentes
- ✅ Podrás añadir nuevos senderos con el formulario

## ¿Problemas comunes?

### Error 404 o "Failed to load resource"
- **Causa:** El servidor no está iniciado
- **Solución:** Ejecuta `iniciar-servidor.bat` en la carpeta `backend`

### Error "CORS" o conexión
- **Causa:** Problema de permisos o puerto ocupado
- **Solución:** 
  1. Cierra otros servidores que usen el puerto 3001
  2. Reinicia el servidor

### La página se carga pero no aparecen senderos
- **Causa:** El archivo `senderos.json` puede estar corrupto
- **Solución:** Revisa la consola del navegador (F12) para ver errores detallados

## Estructura de archivos
```
backend/
├── server.js              # Servidor principal
├── senderos.json          # Base de datos en JSON
├── iniciar-servidor.bat   # Script para iniciar fácilmente
└── package.json

frontend/
├── index.html             # Página principal
├── script.js             # Lógica del frontend  
└── styles.css            # Estilos
```

## ¿Cómo funciona?
1. **Backend:** Express.js sirve una API REST en `/api/senderos`
2. **Frontend:** HTML + JavaScript vanilla que consume la API
3. **Datos:** Se guardan en `backend/senderos.json`

## Rutas de la API
- `GET /api/senderos` - Obtener lista de senderos
- `POST /api/senderos` - Crear nuevo sendero

¡Disfruta explorando los senderos! 🌿🥾
