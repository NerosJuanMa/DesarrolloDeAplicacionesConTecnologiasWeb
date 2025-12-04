# 🎵 Ejercicios Prácticos - Día 1

<div style="background: linear-gradient(135deg, #4DB33D 0%, #3F9A2F 100%); padding: 15px; border-radius: 8px; color: white;">
  <h2 style="margin: 0;">🚀 Ejercicios Paso a Paso</h2>
</div>

## 📋 Ejercicio 1: Análisis del Archivo JSON

### 🎯 Objetivo
Analizar las limitaciones de trabajar con archivos JSON

### 📝 Tareas
1. Abrir el archivo `canciones.json`
2. Identificar problemas potenciales:
   - ¿Qué pasa si queremos buscar por género?
   - ¿Cómo manejamos concurrencia?
   - ¿Qué sucede con archivos grandes?

### 💡 Reflexiones
Escribe 3 limitaciones que encuentres:
```
1. _________________________________
2. _________________________________
3. _________________________________
```

---

## 📋 Ejercicio 2: Instalación de MongoDB

### 🎯 Objetivo
Configurar MongoDB en tu sistema

### 📝 Checklist de Instalación
- [ ] Descargar MongoDB Community Server
- [ ] Instalar MongoDB
- [ ] Configurar variables de entorno
- [ ] Verificar instalación con `mongod --version`
- [ ] Instalar MongoDB Compass

### 🔧 Comandos de Verificación
```bash
# Verificar MongoDB
mongod --version

# Verificar Mongo Shell
mongosh --version
```

### ✅ Resultado Esperado
```
MongoDB 7.x.x Community Server
```

---

## 📋 Ejercicio 3: Primera Conexión

### 🎯 Objetivo
Conectar a MongoDB y crear tu primera base de datos

### 📝 Pasos en MongoDB Compass
1. Abrir MongoDB Compass
2. Conectar a `mongodb://localhost:27017`
3. Crear base de datos `musicaDB`
4. Crear colección `canciones`

### 📝 Pasos en MongoDB Shell
```javascript
// Conectar a la base de datos
use musicaDB

// Verificar la base de datos actual
db

// Mostrar colecciones
show collections
```

---

## 📋 Ejercicio 4: Migración de Datos

### 🎯 Objetivo
Migrar datos del archivo JSON a MongoDB

### 📝 Método 1: MongoDB Compass
1. Ir a la colección `canciones`
2. Hacer clic en "ADD DATA" > "Import JSON or CSV file"
3. Seleccionar `canciones.json`
4. Importar los datos

### 📝 Método 2: MongoDB Shell
```javascript
// Cambiar a la base de datos
use musicaDB

// Insertar datos (copiar desde canciones.json)
db.canciones.insertMany([
  // ... pegar aquí el contenido del JSON
])

// Verificar la inserción
db.canciones.countDocuments()
```

### ✅ Verificación
```javascript
// Debe retornar 10
db.canciones.countDocuments()

// Ver todas las canciones
db.canciones.find().pretty()
```

---

## 📋 Ejercicio 5: CRUD Básico

### 🎯 Objetivo
Realizar operaciones básicas de Create, Read, Update, Delete

### 📝 CREATE - Insertar Nueva Canción
```javascript
db.canciones.insertOne({
  titulo: "Stairway to Heaven",
  artista: "Led Zeppelin",
  album: "Led Zeppelin IV",
  duracion: 482,
  genero: "Rock",
  año: 1971,
  reproducciones: 0,
  favorito: false,
  fecha_agregada: new Date()
})
```

### 📝 READ - Consultas
```javascript
// Buscar todas las canciones
db.canciones.find()

// Buscar por artista
db.canciones.find({ artista: "Queen" })

// Buscar canciones favoritas
db.canciones.find({ favorito: true })

// Buscar por género y ordenar por año
db.canciones.find({ genero: "Rock" }).sort({ año: 1 })
```

### 📝 UPDATE - Actualizar
```javascript
// Marcar una canción como favorita
db.canciones.updateOne(
  { titulo: "Stairway to Heaven" },
  { $set: { favorito: true } }
)

// Incrementar reproducciones
db.canciones.updateOne(
  { titulo: "Bohemian Rhapsody" },
  { $inc: { reproducciones: 1000 } }
)
```

### 📝 DELETE - Eliminar
```javascript
// Eliminar una canción específica
db.canciones.deleteOne({ titulo: "Stairway to Heaven" })

// Eliminar todas las canciones de un año específico
// db.canciones.deleteMany({ año: 1965 })
```

---

## 📋 Ejercicio 6: Consultas Avanzadas Básicas

### 🎯 Objetivo
Practicar consultas más complejas

### 📝 Tareas
```javascript
// 1. Canciones con más de 300 segundos de duración
db.canciones.find({ duracion: { $gt: 300 } })

// 2. Canciones de los años 70 (1970-1979)
db.canciones.find({ 
  año: { $gte: 1970, $lte: 1979 } 
})

// 3. Canciones favoritas ordenadas por reproducciones
db.canciones.find({ favorito: true }).sort({ reproducciones: -1 })

// 4. Contar canciones por género
db.canciones.aggregate([
  { $group: { _id: "$genero", total: { $sum: 1 } } }
])

// 5. Promedio de duración de todas las canciones
db.canciones.aggregate([
  { $group: { _id: null, promedio: { $avg: "$duracion" } } }
])
```

---

## 🏆 Ejercicio Final: Validación

### 🎯 Objetivo
Verificar que todo funciona correctamente

### 📝 Checklist Final
- [ ] MongoDB está ejecutándose
- [ ] Base de datos `musicaDB` existe
- [ ] Colección `canciones` tiene 10+ documentos
- [ ] Puedes insertar nuevas canciones
- [ ] Puedes hacer consultas complejas
- [ ] Puedes actualizar documentos
- [ ] Puedes eliminar documentos

### 🔍 Comando de Verificación Final
```javascript
// Este comando debe mostrar estadísticas de tu colección
db.canciones.stats()
```

---

<div style="background-color: #4DB33D; padding: 15px; border-radius: 5px; color: white; text-align: center;">
  <strong>🎉 ¡Felicidades! Has completado el Día 1</strong><br>
  Ya sabes trabajar con MongoDB básico. ¡Mañana seguimos con operaciones avanzadas!
</div>

## 📝 Tarea para Casa
1. Practicar las consultas vistas hoy
2. Agregar 5 canciones más a tu colección
3. Experimentar con diferentes tipos de consultas
4. Leer sobre agregaciones en MongoDB
