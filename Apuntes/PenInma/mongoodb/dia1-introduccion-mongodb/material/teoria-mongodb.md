# 📚 Material Teórico - Día 1

<div style="background: linear-gradient(135deg, #4DB33D 0%, #3F9A2F 100%); padding: 20px; border-radius: 10px; color: white;">
  <h2 style="margin: 0;">🍃 Fundamentos de MongoDB</h2>
  <p style="margin: 10px 0 0 0;">De archivos JSON a bases de datos NoSQL</p>
</div>

## 🎯 Módulo 1: JSON vs MongoDB

### 📁 Trabajando con Archivos JSON

#### ✅ Ventajas de JSON
- **Simplicidad**: Fácil de leer y escribir
- **Ligereza**: Formato de datos liviano
- **Universalidad**: Soportado por todos los lenguajes
- **Prototipado rápido**: Ideal para pruebas

#### ❌ Limitaciones de JSON para Aplicaciones Grandes

1. **Concurrencia**
   ```javascript
   // ❌ Problema: Múltiples usuarios editando el mismo archivo
   // Usuario A: Lee el archivo → Modifica datos → Guarda
   // Usuario B: Lee el archivo → Modifica datos → Guarda
   // Resultado: Se pierden los cambios del Usuario A
   ```

2. **Performance**
   ```javascript
   // ❌ Problema: Buscar en un archivo grande
   const canciones = JSON.parse(fs.readFileSync('canciones.json'));
   const resultado = canciones.filter(c => c.genero === 'Rock');
   // Debe leer TODO el archivo para encontrar algunas canciones
   ```

3. **Escalabilidad**
   ```javascript
   // ❌ Problema: Archivo de 1GB en memoria
   const millonDeCanciones = JSON.parse(fs.readFileSync('big-data.json'));
   // Consume toda la RAM disponible
   ```

4. **Consultas Complejas**
   ```javascript
   // ❌ Difícil: Buscar canciones por múltiples criterios
   const resultado = canciones.filter(c => 
     c.genero === 'Rock' && 
     c.año >= 1970 && 
     c.año <= 1980 &&
     c.reproducciones > 1000000
   ).sort((a, b) => b.reproducciones - a.reproducciones);
   ```

### 🍃 MongoDB: La Solución NoSQL

#### ✅ Ventajas de MongoDB

1. **Base de Datos Real**
   - Manejo automático de concurrencia
   - Transacciones ACID
   - Backup y recuperación

2. **Performance Optimizada**
   - Índices automáticos
   - Consultas optimizadas
   - Carga bajo demanda

3. **Escalabilidad**
   - Sharding horizontal
   - Replicación
   - Clustering

4. **Consultas Potentes**
   ```javascript
   // ✅ Fácil y rápido
   db.canciones.find({
     genero: "Rock",
     año: { $gte: 1970, $lte: 1980 },
     reproducciones: { $gt: 1000000 }
   }).sort({ reproducciones: -1 })
   ```

---

## 🔧 Módulo 2: Instalación y Configuración

### 📦 Componentes de MongoDB

1. **MongoDB Server** - El motor de base de datos
2. **MongoDB Shell (mongosh)** - Interfaz de línea de comandos
3. **MongoDB Compass** - Interfaz gráfica

### 🖥️ Instalación en Windows

#### Paso 1: Descargar MongoDB
```
https://www.mongodb.com/try/download/community
- Versión: 7.0 Community Server
- OS: Windows
- Package: MSI
```

#### Paso 2: Proceso de Instalación
1. Ejecutar el instalador MSI
2. Seleccionar "Complete" installation
3. ✅ Instalar como servicio de Windows
4. ✅ Instalar MongoDB Compass
5. Finalizar instalación

#### Paso 3: Verificar Instalación
```cmd
# Verificar MongoDB Server
mongod --version

# Verificar MongoDB Shell
mongosh --version
```

#### Paso 4: Configuración del Servicio
```cmd
# Iniciar servicio MongoDB
net start MongoDB

# Detener servicio MongoDB
net stop MongoDB

# Estado del servicio
sc query MongoDB
```

### 🔧 Configuración Básica

#### Archivo de Configuración: `mongod.cfg`
```yaml
# Ubicación típica: C:\Program Files\MongoDB\Server\7.0\bin\mongod.cfg

storage:
  dbPath: C:\data\db
  journal:
    enabled: true

systemLog:
  destination: file
  logAppend: true
  path: C:\data\log\mongod.log

net:
  port: 27017
  bindIp: 127.0.0.1
```

#### Directorios Importantes
```
C:\data\db\       # Almacenamiento de datos
C:\data\log\      # Archivos de log
```

---

## 📊 Módulo 3: MongoDB Compass y Shell

### 🖱️ MongoDB Compass (GUI)

#### Características Principales
- **Explorador visual** de bases de datos
- **Editor de consultas** con autocompletado
- **Visualización de esquemas**
- **Importación/Exportación** de datos
- **Monitor de performance**

#### Navegación Básica
```
Conexión → Bases de Datos → Colecciones → Documentos
```

#### Operaciones Comunes
1. **Conectar**: `mongodb://localhost:27017`
2. **Crear BD**: Click en "Create Database"
3. **Ver datos**: Navegar a colección
4. **Filtrar**: Usar la barra de filtros
5. **Importar**: Documents → Add Data → Import File

### 💻 MongoDB Shell (CLI)

#### Comandos Básicos de Navegación
```javascript
// Ver bases de datos disponibles
show dbs

// Usar una base de datos
use musicaDB

// Ver la base de datos actual
db

// Ver colecciones en la BD actual
show collections

// Obtener estadísticas de la BD
db.stats()
```

#### Comandos de Colección
```javascript
// Crear colección
db.createCollection("canciones")

// Ver documentos en una colección
db.canciones.find()

// Contar documentos
db.canciones.countDocuments()

// Obtener estadísticas de colección
db.canciones.stats()
```

---

## 🎵 Módulo 4: Primera Migración

### 📋 Conceptos Clave

#### JSON vs BSON
```javascript
// JSON (JavaScript Object Notation)
{
  "id": 1,
  "titulo": "Bohemian Rhapsody",
  "duracion": 355,
  "fecha": "2024-01-15"
}

// BSON (Binary JSON) - Formato interno de MongoDB
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "titulo": "Bohemian Rhapsody",
  "duracion": NumberInt(355),
  "fecha": ISODate("2024-01-15T00:00:00.000Z")
}
```

#### Tipos de Datos en MongoDB
```javascript
// Tipos básicos
{
  string: "texto",
  number: 123,
  boolean: true,
  date: new Date(),
  array: [1, 2, 3],
  object: { key: "value" },
  null: null
}

// Tipos especiales de MongoDB
{
  objectId: ObjectId("..."),
  decimal: NumberDecimal("123.45"),
  long: NumberLong("9223372036854775807")
}
```

### 🔄 Proceso de Migración

#### Paso 1: Análisis del JSON
```javascript
// Estructura original
{
  "id": 1,                    // → se convertirá en _id o se eliminará
  "titulo": "...",           // → string
  "duracion": 355,           // → number
  "fecha_agregada": "2024-01-15"  // → Date
}
```

#### Paso 2: Transformación
```javascript
// Documento MongoDB optimizado
{
  "_id": ObjectId("..."),              // ID único de MongoDB
  "titulo": "Bohemian Rhapsody",
  "artista": "Queen",
  "album": "A Night at the Opera",
  "duracion": 355,                     // segundos
  "genero": "Rock",
  "año": 1975,
  "reproducciones": 1500000,
  "favorito": true,
  "fecha_agregada": ISODate("2024-01-15T00:00:00.000Z"),
  "metadata": {                        // Información adicional
    "migrado_en": ISODate("2024-10-29T10:00:00.000Z"),
    "fuente": "JSON",
    "version": "1.0"
  }
}
```

#### Paso 3: Validación
```javascript
// Verificar migración exitosa
db.canciones.countDocuments()        // Debe coincidir con el JSON
db.canciones.findOne()              // Ver estructura
db.canciones.find().limit(5)        // Ver varios ejemplos
```

### 🔍 Operaciones CRUD Básicas

#### CREATE (Insertar)
```javascript
// Insertar un documento
db.canciones.insertOne({
  titulo: "Nueva Canción",
  artista: "Nuevo Artista"
})

// Insertar múltiples documentos
db.canciones.insertMany([
  { titulo: "Canción 1", artista: "Artista 1" },
  { titulo: "Canción 2", artista: "Artista 2" }
])
```

#### READ (Consultar)
```javascript
// Encontrar todos
db.canciones.find()

// Encontrar por criterio
db.canciones.find({ genero: "Rock" })

// Encontrar uno
db.canciones.findOne({ titulo: "Bohemian Rhapsody" })

// Consultas con operadores
db.canciones.find({ 
  duracion: { $gt: 300 },        // mayor que 300
  año: { $gte: 1970, $lte: 1980 }  // entre 1970 y 1980
})
```

#### UPDATE (Actualizar)
```javascript
// Actualizar un documento
db.canciones.updateOne(
  { titulo: "Bohemian Rhapsody" },     // filtro
  { $set: { favorito: true } }         // actualización
)

// Actualizar múltiples documentos
db.canciones.updateMany(
  { genero: "Rock" },
  { $inc: { reproducciones: 1000 } }   // incrementar
)
```

#### DELETE (Eliminar)
```javascript
// Eliminar un documento
db.canciones.deleteOne({ titulo: "Canción Temporal" })

// Eliminar múltiples documentos
db.canciones.deleteMany({ año: { $lt: 1960 } })
```

---

## 🎯 Mejores Prácticas

### 📏 Diseño de Documentos
1. **Desnormalización inteligente**: Incluir datos relacionados frecuentemente consultados
2. **Límite de 16MB**: por documento
3. **Campos descriptivos**: Nombres claros y consistentes
4. **Evitar arrays muy grandes**: Usar colecciones separadas si es necesario

### 🔍 Índices
```javascript
// Crear índices para consultas frecuentes
db.canciones.createIndex({ artista: 1 })       // ascendente
db.canciones.createIndex({ genero: 1, año: -1 }) // compuesto
db.canciones.createIndex({ titulo: "text" })   // texto completo
```

### 🛡️ Seguridad Básica
- Usar autenticación en producción
- Crear usuarios con permisos específicos
- Nunca exponer MongoDB directamente a internet

---

<div style="background-color: #4DB33D; padding: 15px; border-radius: 5px; color: white; text-align: center;">
  <strong>🎓 Fin del Material Teórico - Día 1</strong><br>
  Ahora tienes los fundamentos para trabajar con MongoDB
</div>
