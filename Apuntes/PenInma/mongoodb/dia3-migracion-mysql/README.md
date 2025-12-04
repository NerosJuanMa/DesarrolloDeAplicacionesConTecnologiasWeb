# 📅 DÍA 3: Migración a MySQL y Proyecto Final

<div style="background: linear-gradient(135deg, #4DB33D 0%, #005A9C 50%, #FFB81C 100%); padding: 20px; border-radius: 10px; color: white; margin: 20px 0;">
  <h2 style="margin: 0;">🔄 De NoSQL a SQL: Migración Completa</h2>
  <p style="margin: 10px 0 0 0;">Dominando ambos mundos de bases de datos</p>
</div>

## 🎯 Objetivos del Día
- Entender las diferencias fundamentales MongoDB vs MySQL
- Diseñar esquemas relacionales desde documentos NoSQL
- Migrar datos preservando la integridad
- Crear un sistema híbrido que use ambas bases de datos

## 📚 Módulos del Día

### 🔄 Módulo 1: MongoDB vs MySQL - Comparativa (9:00 - 10:30)
- **Filosofías**: NoSQL vs SQL
- **Casos de uso**: Cuándo usar cada una
- **Ventajas y desventajas**
- **Diseño de datos**: Documentos vs Tablas

### 🏗️ Módulo 2: Diseño de Esquemas Relacionales (10:30 - 12:00)
- **Normalización**: De documentos a tablas
- **Relaciones**: 1:1, 1:N, N:M
- **Claves foráneas**: Integridad referencial
- **Índices**: Optimización de consultas SQL

### 📤 Módulo 3: Migración de Datos (13:00 - 14:30)
- **Extracción**: Datos desde MongoDB
- **Transformación**: Formato para MySQL
- **Carga**: Inserción masiva en MySQL
- **Validación**: Verificación de integridad

### 🎯 Módulo 4: Proyecto Final Integrado (14:30 - 16:00)
- **API Híbrida**: MongoDB + MySQL
- **Frontend Unificado**: Una interfaz, dos bases de datos
- **Sincronización**: Mantener datos consistentes
- **Decisiones de Arquitectura**: Cuándo usar cada BD

## 📋 Agenda Detallada

| Hora | Actividad | Duración |
|------|-----------|----------|
| 9:00 - 9:15 | 🌅 Repaso y objetivos del día | 15 min |
| 9:15 - 10:15 | 🔄 Comparativa MongoDB vs MySQL | 60 min |
| 10:15 - 10:30 | ☕ Descanso | 15 min |
| 10:30 - 12:00 | 🏗️ Diseño de esquemas relacionales | 90 min |
| 12:00 - 13:00 | 🍽️ Almuerzo | 60 min |
| 13:00 - 14:15 | 📤 Proceso de migración | 75 min |
| 14:15 - 14:30 | ☕ Descanso | 15 min |
| 14:30 - 15:45 | 🎯 Proyecto final híbrido | 75 min |
| 15:45 - 16:00 | 🏆 Demostración y cierre | 15 min |

## 🛠️ Preparación

### Nuevas Herramientas
1. ✅ MySQL Server
2. ✅ MySQL Workbench
3. ✅ Sequelize (ORM para MySQL)

### Instalación de Dependencias
```bash
npm install mysql2 sequelize
npm install --save-dev sequelize-cli
```

## 📊 Esquema de Migración

### 🍃 Desde MongoDB (Documentos)
```javascript
// Documento de canción en MongoDB
{
  "_id": ObjectId("..."),
  "titulo": "Bohemian Rhapsody",
  "artista": {
    "nombre": "Queen",
    "pais": "Reino Unido",
    "biografia": "..."
  },
  "album": {
    "titulo": "A Night at the Opera",
    "año": 1975,
    "canciones": [...]
  },
  "genero": "Rock",
  "reseñas": [
    { "usuario": "Juan", "puntuacion": 5, "comentario": "..." }
  ]
}
```

### 🗄️ Hacia MySQL (Tablas Relacionales)
```sql
-- Tabla de artistas
CREATE TABLE artistas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(100) NOT NULL,
  pais VARCHAR(50),
  biografia TEXT
);

-- Tabla de álbumes
CREATE TABLE albumes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(100) NOT NULL,
  año INT,
  artista_id INT,
  FOREIGN KEY (artista_id) REFERENCES artistas(id)
);

-- Tabla de canciones
CREATE TABLE canciones (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(100) NOT NULL,
  duracion INT,
  album_id INT,
  FOREIGN KEY (album_id) REFERENCES albumes(id)
);

-- Tabla de reseñas
CREATE TABLE reseñas (
  id INT PRIMARY KEY AUTO_INCREMENT,
  cancion_id INT,
  usuario VARCHAR(50),
  puntuacion INT,
  comentario TEXT,
  FOREIGN KEY (cancion_id) REFERENCES canciones(id)
);
```

## 🎯 Proyecto Final: Sistema Híbrido

### 🏗️ Arquitectura

```
Frontend (React/Vanilla JS)
        ↓
    API Gateway
       ↙ ↘
MongoDB API    MySQL API
     ↓            ↓
   MongoDB      MySQL
```

### 📊 Distribución de Datos

**🍃 MongoDB (Datos Flexibles)**
- Metadatos de canciones
- Logs de reproducción
- Preferencias de usuario
- Búsquedas y recomendaciones

**🗄️ MySQL (Datos Estructurados)**
- Catálogo de artistas
- Información de álbumes
- Transacciones de compra
- Reportes financieros

## 📁 Estructura de Trabajo

```
dia3-migracion-mysql/
├── 📂 migracion/
│   ├── extractor-mongodb.js
│   ├── transformador.js
│   └── cargador-mysql.js
├── 📂 esquemas/
│   ├── mysql-schema.sql
│   └── comparativa.md
├── 📂 material/
│   ├── mongodb-vs-mysql.md
│   └── mejores-practicas.md
└── 📂 proyecto-hibrido/
    ├── backend/
    ├── frontend/
    └── docker-compose.yml
```

## 🎯 Resultados Esperados

Al final del día tendrás:
- ✅ Comprensión clara de cuándo usar MongoDB vs MySQL
- ✅ Esquemas relacionales bien diseñados
- ✅ Datos migrados exitosamente
- ✅ Sistema híbrido funcionando
- ✅ API que maneja ambas bases de datos
- ✅ Frontend que consume datos de ambas fuentes
- ✅ Estrategia de sincronización implementada

## 📈 Casos de Uso del Sistema Híbrido

### 🎵 Gestión de Música
- **MongoDB**: Metadatos, búsquedas, recomendaciones
- **MySQL**: Catálogo, ventas, reportes

### 👤 Gestión de Usuarios
- **MongoDB**: Preferencias, historial, sesiones
- **MySQL**: Datos personales, suscripciones, facturación

### 📊 Analytics
- **MongoDB**: Eventos en tiempo real, logs
- **MySQL**: Reportes consolidados, KPIs

---

<div style="background-color: #4DB33D; padding: 10px; border-radius: 5px; color: white;">
  <strong>💡 Concepto Clave:</strong> No es "MongoDB vs MySQL", es "MongoDB Y MySQL" trabajando juntos.
</div>

## 🏆 Criterios de Éxito

- [ ] Migración completa sin pérdida de datos
- [ ] API híbrida funcionando
- [ ] Frontend conectado a ambas bases de datos
- [ ] Documentación del proceso
- [ ] Estrategia de mantenimiento definida

## 🔗 Enlaces del Día
- [MySQL Download](https://dev.mysql.com/downloads/)
- [Sequelize Documentation](https://sequelize.org/)
- [Database Design Best Practices](https://dev.mysql.com/doc/refman/8.0/en/)
