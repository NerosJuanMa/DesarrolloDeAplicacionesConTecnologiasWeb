# 📚 Cheat Sheet - MongoDB & MySQL

<div style="background: linear-gradient(135deg, #4DB33D 0%, #005A9C 100%); padding: 20px; border-radius: 10px; color: white;">
  <h2 style="margin: 0;">🚀 Referencia Rápida</h2>
  <p style="margin: 10px 0 0 0;">Comandos esenciales para el curso</p>
</div>

## 🍃 MongoDB Cheat Sheet

### 🔧 Comandos Básicos
```javascript
// Conectar a MongoDB
mongosh

// Mostrar bases de datos
show dbs

// Usar/crear base de datos
use musicaDB

// Mostrar colecciones
show collections

// Mostrar base de datos actual
db

// Estadísticas de la base de datos
db.stats()

// Ayuda
help
```

### 📊 Operaciones de Colección
```javascript
// Crear colección
db.createCollection("canciones")

// Eliminar colección
db.canciones.drop()

// Renombrar colección
db.canciones.renameCollection("songs")

// Estadísticas de colección
db.canciones.stats()

// Contar documentos
db.canciones.countDocuments()
```

### ➕ CREATE (Insertar)
```javascript
// Insertar un documento
db.canciones.insertOne({
  titulo: "Bohemian Rhapsody",
  artista: "Queen",
  duracion: 355
})

// Insertar múltiples documentos
db.canciones.insertMany([
  {titulo: "Song 1", artista: "Artist 1"},
  {titulo: "Song 2", artista: "Artist 2"}
])

// Con ID personalizado
db.canciones.insertOne({
  _id: "custom_id",
  titulo: "Custom Song"
})
```

### 🔍 READ (Consultar)
```javascript
// Encontrar todos los documentos
db.canciones.find()

// Encontrar con filtro
db.canciones.find({artista: "Queen"})

// Encontrar uno
db.canciones.findOne({titulo: "Bohemian Rhapsody"})

// Proyección (seleccionar campos)
db.canciones.find({}, {titulo: 1, artista: 1, _id: 0})

// Limitr resultados
db.canciones.find().limit(5)

// Saltar documentos (paginación)
db.canciones.find().skip(10).limit(5)

// Ordenar
db.canciones.find().sort({año: 1})      // ascendente
db.canciones.find().sort({año: -1})     // descendente
```

### 🔄 UPDATE (Actualizar)
```javascript
// Actualizar un documento
db.canciones.updateOne(
  {titulo: "Bohemian Rhapsody"},
  {$set: {favorito: true}}
)

// Actualizar múltiples documentos
db.canciones.updateMany(
  {genero: "Rock"},
  {$set: {categoria: "Clásico"}}
)

// Incrementar valor
db.canciones.updateOne(
  {titulo: "Bohemian Rhapsody"},
  {$inc: {reproducciones: 1}}
)

// Agregar elemento a array
db.canciones.updateOne(
  {titulo: "Bohemian Rhapsody"},
  {$push: {tags: "epic"}}
)

// Upsert (insertar si no existe)
db.canciones.updateOne(
  {titulo: "New Song"},
  {$set: {artista: "New Artist"}},
  {upsert: true}
)
```

### ❌ DELETE (Eliminar)
```javascript
// Eliminar un documento
db.canciones.deleteOne({titulo: "Song to Delete"})

// Eliminar múltiples documentos
db.canciones.deleteMany({año: {$lt: 1960}})

// Eliminar todos los documentos
db.canciones.deleteMany({})
```

### 🔍 Operadores de Consulta
```javascript
// Comparación
db.canciones.find({duracion: {$gt: 300}})        // mayor que
db.canciones.find({año: {$gte: 1970}})           // mayor o igual
db.canciones.find({año: {$lt: 1980}})            // menor que
db.canciones.find({año: {$lte: 1979}})           // menor o igual
db.canciones.find({genero: {$ne: "Pop"}})        // no igual

// Rangos
db.canciones.find({año: {$gte: 1970, $lte: 1980}})

// Arrays
db.canciones.find({genero: {$in: ["Rock", "Pop"]}})
db.canciones.find({genero: {$nin: ["Jazz", "Blues"]}})

// Existencia
db.canciones.find({favorito: {$exists: true}})

// Tipo de dato
db.canciones.find({duracion: {$type: "number"}})

// Expresiones regulares
db.canciones.find({titulo: {$regex: /queen/i}})
```

### 🔗 Operadores Lógicos
```javascript
// AND (implícito)
db.canciones.find({
  genero: "Rock",
  año: {$gte: 1970}
})

// AND explícito
db.canciones.find({
  $and: [
    {genero: "Rock"},
    {año: {$gte: 1970}}
  ]
})

// OR
db.canciones.find({
  $or: [
    {genero: "Rock"},
    {genero: "Pop"}
  ]
})

// NOT
db.canciones.find({
  año: {$not: {$lt: 1970}}
})

// NOR
db.canciones.find({
  $nor: [
    {genero: "Jazz"},
    {año: {$lt: 1960}}
  ]
})
```

### 📈 Agregaciones Básicas
```javascript
// Contar por grupo
db.canciones.aggregate([
  {$group: {_id: "$genero", total: {$sum: 1}}}
])

// Promedio
db.canciones.aggregate([
  {$group: {_id: null, promedio: {$avg: "$duracion"}}}
])

// Máximo y mínimo
db.canciones.aggregate([
  {$group: {
    _id: "$genero",
    max_duracion: {$max: "$duracion"},
    min_duracion: {$min: "$duracion"}
  }}
])

// Pipeline completo
db.canciones.aggregate([
  {$match: {año: {$gte: 1970}}},
  {$group: {_id: "$genero", total: {$sum: 1}}},
  {$sort: {total: -1}}
])
```

### 🔍 Índices
```javascript
// Crear índice simple
db.canciones.createIndex({artista: 1})

// Crear índice compuesto
db.canciones.createIndex({genero: 1, año: -1})

// Índice de texto
db.canciones.createIndex({titulo: "text", artista: "text"})

// Ver índices
db.canciones.getIndexes()

// Eliminar índice
db.canciones.dropIndex({artista: 1})

// Explicar consulta (ver si usa índice)
db.canciones.find({artista: "Queen"}).explain()
```

---

## 🗄️ MySQL Cheat Sheet

### 🔧 Comandos Básicos
```sql
-- Conectar a MySQL
mysql -u root -p

-- Mostrar bases de datos
SHOW DATABASES;

-- Usar base de datos
USE musicaDB;

-- Mostrar tablas
SHOW TABLES;

-- Describir tabla
DESCRIBE canciones;

-- Ver usuario actual
SELECT USER();
```

### 📊 Gestión de Base de Datos
```sql
-- Crear base de datos
CREATE DATABASE musicaDB;

-- Eliminar base de datos
DROP DATABASE musicaDB;

-- Crear tabla
CREATE TABLE canciones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    artista VARCHAR(100),
    duracion INT,
    año INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Eliminar tabla
DROP TABLE canciones;

-- Modificar tabla (agregar columna)
ALTER TABLE canciones ADD COLUMN genero VARCHAR(50);

-- Modificar tabla (eliminar columna)
ALTER TABLE canciones DROP COLUMN genero;
```

### ➕ CREATE (Insertar)
```sql
-- Insertar un registro
INSERT INTO canciones (titulo, artista, duracion, año)
VALUES ('Bohemian Rhapsody', 'Queen', 355, 1975);

-- Insertar múltiples registros
INSERT INTO canciones (titulo, artista, duracion, año) VALUES
('Hotel California', 'Eagles', 391, 1976),
('Imagine', 'John Lennon', 183, 1971);

-- Insertar desde otra tabla
INSERT INTO canciones_backup 
SELECT * FROM canciones WHERE año > 1970;
```

### 🔍 READ (Consultar)
```sql
-- Seleccionar todo
SELECT * FROM canciones;

-- Seleccionar columnas específicas
SELECT titulo, artista FROM canciones;

-- Con condición
SELECT * FROM canciones WHERE artista = 'Queen';

-- Ordenar
SELECT * FROM canciones ORDER BY año ASC;
SELECT * FROM canciones ORDER BY año DESC;

-- Limitar resultados
SELECT * FROM canciones LIMIT 5;

-- Paginación
SELECT * FROM canciones LIMIT 5 OFFSET 10;

-- Contar registros
SELECT COUNT(*) FROM canciones;

-- Agrupar
SELECT genero, COUNT(*) as total 
FROM canciones 
GROUP BY genero;

-- Promedio
SELECT AVG(duracion) as promedio_duracion FROM canciones;
```

### 🔄 UPDATE (Actualizar)
```sql
-- Actualizar un registro
UPDATE canciones 
SET genero = 'Rock' 
WHERE artista = 'Queen';

-- Actualizar múltiples campos
UPDATE canciones 
SET genero = 'Rock', favorito = TRUE 
WHERE año BETWEEN 1970 AND 1980;

-- Incrementar valor
UPDATE canciones 
SET reproducciones = reproducciones + 1 
WHERE titulo = 'Bohemian Rhapsody';
```

### ❌ DELETE (Eliminar)
```sql
-- Eliminar registro específico
DELETE FROM canciones WHERE id = 1;

-- Eliminar con condición
DELETE FROM canciones WHERE año < 1960;

-- Eliminar todos los registros (mantener estructura)
DELETE FROM canciones;

-- Truncar tabla (más rápido)
TRUNCATE TABLE canciones;
```

### 🔍 Operadores y Funciones
```sql
-- Operadores de comparación
SELECT * FROM canciones WHERE duracion > 300;
SELECT * FROM canciones WHERE año >= 1970;
SELECT * FROM canciones WHERE genero != 'Pop';
SELECT * FROM canciones WHERE genero <> 'Pop';

-- Rangos
SELECT * FROM canciones WHERE año BETWEEN 1970 AND 1980;

-- Listas
SELECT * FROM canciones WHERE genero IN ('Rock', 'Pop');
SELECT * FROM canciones WHERE genero NOT IN ('Jazz', 'Blues');

-- Patrones (LIKE)
SELECT * FROM canciones WHERE titulo LIKE '%Queen%';
SELECT * FROM canciones WHERE titulo LIKE 'B%';  -- Empieza con B
SELECT * FROM canciones WHERE titulo LIKE '%y';  -- Termina con y

-- Valores NULL
SELECT * FROM canciones WHERE genero IS NULL;
SELECT * FROM canciones WHERE genero IS NOT NULL;
```

### 🔗 JOINs (Relaciones)
```sql
-- INNER JOIN
SELECT c.titulo, a.nombre as artista
FROM canciones c
INNER JOIN artistas a ON c.artista_id = a.id;

-- LEFT JOIN
SELECT c.titulo, a.nombre as artista
FROM canciones c
LEFT JOIN artistas a ON c.artista_id = a.id;

-- RIGHT JOIN
SELECT c.titulo, a.nombre as artista
FROM canciones c
RIGHT JOIN artistas a ON c.artista_id = a.id;

-- Múltiples JOINs
SELECT c.titulo, a.nombre as artista, al.titulo as album
FROM canciones c
INNER JOIN artistas a ON c.artista_id = a.id
INNER JOIN albumes al ON c.album_id = al.id;
```

### 📈 Funciones de Agregación
```sql
-- Contar
SELECT COUNT(*) FROM canciones;
SELECT COUNT(DISTINCT genero) FROM canciones;

-- Suma
SELECT SUM(duracion) FROM canciones;

-- Promedio
SELECT AVG(duracion) FROM canciones;

-- Máximo y mínimo
SELECT MAX(año) FROM canciones;
SELECT MIN(año) FROM canciones;

-- Agrupar con HAVING
SELECT genero, COUNT(*) as total
FROM canciones
GROUP BY genero
HAVING COUNT(*) > 5;
```

### 🔍 Índices y Performance
```sql
-- Crear índice
CREATE INDEX idx_artista ON canciones(artista);

-- Índice compuesto
CREATE INDEX idx_genero_año ON canciones(genero, año);

-- Índice único
CREATE UNIQUE INDEX idx_titulo_artista ON canciones(titulo, artista);

-- Ver índices
SHOW INDEX FROM canciones;

-- Eliminar índice
DROP INDEX idx_artista ON canciones;

-- Explicar consulta
EXPLAIN SELECT * FROM canciones WHERE artista = 'Queen';
```

---

## 🔄 Equivalencias MongoDB ↔ MySQL

| Concepto | MongoDB | MySQL |
|----------|---------|-------|
| **Base de datos** | `database` | `database` |
| **Tabla/Colección** | `collection` | `table` |
| **Fila/Documento** | `document` | `row` |
| **Columna/Campo** | `field` | `column` |
| **ID único** | `_id` | `PRIMARY KEY` |
| **Índice** | `index` | `index` |

### Operaciones Equivalentes
```javascript
// MongoDB
db.canciones.find({artista: "Queen"})

// MySQL
SELECT * FROM canciones WHERE artista = 'Queen';
```

```javascript
// MongoDB
db.canciones.updateOne(
  {titulo: "Bohemian Rhapsody"},
  {$set: {favorito: true}}
)

// MySQL
UPDATE canciones 
SET favorito = TRUE 
WHERE titulo = 'Bohemian Rhapsody';
```

---

## 🔧 Comandos de Sistema

### MongoDB
```bash
# Iniciar MongoDB
net start MongoDB

# Detener MongoDB
net stop MongoDB

# Estado del servicio
sc query MongoDB

# Conectar al shell
mongosh

# Backup
mongodump --db musicaDB --out ./backup

# Restore
mongorestore --db musicaDB ./backup/musicaDB
```

### MySQL
```bash
# Iniciar MySQL
net start MySQL80

# Detener MySQL
net stop MySQL80

# Conectar
mysql -u root -p

# Backup
mysqldump -u root -p musicaDB > backup.sql

# Restore
mysql -u root -p musicaDB < backup.sql
```

---

<div style="background-color: #4DB33D; padding: 15px; border-radius: 5px; color: white; text-align: center;">
  <strong>📖 Cheat Sheet Completo</strong><br>
  Mantén esta referencia a mano durante todo el curso
</div>
