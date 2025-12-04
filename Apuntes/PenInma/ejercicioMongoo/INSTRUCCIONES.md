# 🎯 Manual de Implementación Paso a Paso

## 📋 Instrucciones para el Alumno

### 1. Preparación del Entorno

#### Instalar MongoDB localmente:

**Windows:**
1. Descarga MongoDB Community desde: https://www.mongodb.com/try/download/community
2. Instala MongoDB siguiendo el wizard
3. Ejecuta MongoDB: `mongod` en una terminal
4. En otra terminal, verifica la conexión: `mongo`

**Mac/Linux:**
```bash
# Mac (con Homebrew)
brew install mongodb-community
brew services start mongodb-community

# Ubuntu/Debian
sudo apt-get install mongodb
sudo systemctl start mongodb
```

#### Instalar dependencias del proyecto:
```bash
npm install
```

### 2. Ejecutar el Proyecto

```bash
# Desarrollo (con recarga automática)
npm run dev

# Producción
npm start
```

### 3. Probar la Aplicación

1. **Frontend:** http://localhost:3000
2. **API Endpoints:** http://localhost:3000/api/canciones

## 🔬 Ejercicios Prácticos

### Ejercicio 1: Exploración Básica
1. Inicia el servidor
2. Observa cómo se poblaron los datos iniciales desde JSON
3. Usa el frontend para ver todas las canciones
4. Busca canciones por artista

### Ejercicio 2: Operaciones CRUD
1. Agrega 3 canciones nuevas usando el formulario
2. Edita una canción existente
3. Elimina una canción
4. Verifica los cambios en la base de datos

### Ejercicio 3: API Testing
Usa herramientas como Postman o curl para probar:

```bash
# Ver todas las canciones
curl http://localhost:3000/api/canciones

# Buscar por artista
curl http://localhost:3000/api/canciones/buscar/Queen

# Crear nueva canción
curl -X POST http://localhost:3000/api/canciones \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Don't Stop Me Now","artista":"Queen","genero":"Rock"}'

# Actualizar canción (usar ID real)
curl -X PUT http://localhost:3000/api/canciones/[ID] \
  -H "Content-Type: application/json" \
  -d '{"año":1978}'

# Eliminar canción (usar ID real)
curl -X DELETE http://localhost:3000/api/canciones/[ID]
```

## 📚 Conceptos Clave a Entender

### 1. Schema vs JSON Structure
```javascript
// JSON (estructura libre)
{
  "titulo": "Bohemian Rhapsody",
  "artist": "Queen",  // ¡Error de tipo!
  "year": "1975"      // ¡Debería ser número!
}

// MongoDB Schema (estructura controlada)
{
  titulo: { type: String, required: true },
  artista: { type: String, required: true },
  año: { type: Number, min: 1900 }
}
```

### 2. Operaciones de Base de Datos
```javascript
// Leer archivo JSON
const data = JSON.parse(fs.readFileSync('file.json'));

// vs MongoDB
const data = await Cancion.find();
```

### 3. Validaciones
```javascript
// Sin validación (JSON)
canciones.push(cualquierDato); // ¡Acepta cualquier cosa!

// Con validación (MongoDB)
const cancion = new Cancion(datos); // ¡Valida automáticamente!
await cancion.save();
```

## 🚀 Desafíos Adicionales

### Desafío 1: Nuevos Campos
Agrega estos campos al schema:
- `fechaLanzamiento` (Date)
- `popularidad` (Number, 1-10)
- `tags` (Array de Strings)

### Desafío 2: Validaciones Avanzadas
- Título no puede tener números
- Artista debe tener al menos 2 palabras
- Duración debe estar entre 0:30 y 20:00

### Desafío 3: Búsquedas Avanzadas
Implementa endpoints para:
- Buscar por género
- Filtrar por rango de años
- Ordenar por popularidad

### Desafío 4: Frontend Mejorado
- Implementar edición real (no solo copiar al formulario)
- Paginación de resultados
- Filtros en tiempo real

## 🔧 Solución de Problemas

### Error: "Cannot connect to MongoDB"
1. Verifica que MongoDB esté corriendo: `ps aux | grep mongo`
2. Inicia MongoDB: `mongod` o `brew services start mongodb-community`
3. Verifica el puerto: MongoDB usa el puerto 27017 por defecto

### Error: "ValidationError"
- Lee el mensaje de error cuidadosamente
- Verifica que los datos cumplan con el schema
- Campos requeridos deben estar presentes

### Error: "Cannot POST /api/canciones"
- Verifica que Express esté parseando JSON: `app.use(express.json())`
- Verifica la ruta en el archivo de rutas
- Confirma que el Content-Type sea 'application/json'

## 📖 Recursos Adicionales

### Documentación Oficial:
- [MongoDB Manual](https://docs.mongodb.com/)
- [Mongoose Guide](https://mongoosejs.com/docs/guide.html)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)

### Herramientas Útiles:
- **MongoDB Compass**: GUI para visualizar datos
- **Postman**: Testing de APIs
- **Robo 3T**: Cliente MongoDB alternativo

## ✅ Lista de Verificación

- [ ] MongoDB instalado y corriendo
- [ ] Dependencias instaladas (`npm install`)
- [ ] Servidor iniciado sin errores
- [ ] Datos iniciales poblados correctamente
- [ ] Frontend carga sin errores
- [ ] Puede agregar canciones
- [ ] Puede buscar canciones
- [ ] Puede eliminar canciones
- [ ] Entiende la diferencia entre JSON y MongoDB
- [ ] Ha probado los endpoints con curl/Postman

¡Felicidades! 🎉 Ahora dominas los conceptos básicos de MongoDB con Node.js.
