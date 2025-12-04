# Ejercicio: Reservas con MongoDB (Aprende haciendo)

Objetivo: crear un ejercicio didáctico que muestre cómo migrar un CRUD sencillo (antes en JSON) a una base de datos MongoDB usando Express y Mongoose.

Estructura:
```
exercise-reservas-mongo/
  backend/
    package.json
    server.js
    .env.example
  frontend/
    index.html
    script.js
    styles.css
```

Requisitos previos:
- Node.js instalado
- MongoDB local o una cuenta en MongoDB Atlas

Pasos rápidos para ejecutar:
1. Copiar `.env.example` a `.env` en `backend/` y ajustar `MONGO_URL` si usas Atlas.
2. Abrir terminal en `backend/`:

```bash
npm install
# si quieres desarrollo
npm run dev
# o
npm start
```

3. Abrir el navegador en `http://localhost:3001`.

Qué contiene el ejercicio:
- Backend: `server.js` con rutas CRUD en `/api/reservas` usando Mongoose
- Frontend: interfaz simple en `frontend/` que usa las mismas operaciones aprendidas en el CRUD original

Explicaciones incluidas:
- Por qué usamos `express.json()`
- Dónde se aplican `JSON.parse()` y `JSON.stringify()` cuando trabajas con archivos vs bases de datos
- Cómo migrar la lógica `leer/guardar` de archivos a consultas MongoDB

Sugerencias para el profesor:
- Explicar primero el flujo HTTP (fetch → endpoint → respuesta)
- Mostrar cómo crear un documento en MongoDB con Mongoose
- Mostrar cómo ver los documentos con MongoDB Compass o `mongosh`

Notas:
- El objetivo es enseñar el concepto; el código usa métodos simples y patterns didácticos.
- Para producción habría que añadir validación avanzada, manejo de errores más robusto y autenticación.
