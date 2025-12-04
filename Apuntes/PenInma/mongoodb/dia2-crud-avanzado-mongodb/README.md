# 📅 DÍA 2: CRUD Avanzado en MongoDB

<div style="background: linear-gradient(135deg, #4DB33D 0%, #3F9A2F 100%); padding: 20px; border-radius: 10px; color: white; margin: 20px 0;">
  <h2 style="margin: 0;">🚀 Operaciones Avanzadas y Desarrollo Web</h2>
  <p style="margin: 10px 0 0 0;">Construyendo aplicaciones robustas con MongoDB</p>
</div>

## 🎯 Objetivos del Día
- Dominar operaciones CRUD complejas
- Trabajar con agregaciones y pipelines
- Implementar relaciones entre documentos
- Crear una aplicación web conectada a MongoDB

## 📚 Módulos del Día

### 📝 Módulo 1: CRUD Completo (9:00 - 10:30)
- **Operadores avanzados**: $regex, $in, $or, $and
- **Proyecciones**: Seleccionar campos específicos
- **Paginación**: limit() y skip()
- **Ordenamiento**: sort() avanzado

### 🔍 Módulo 2: Consultas Avanzadas y Agregaciones (10:30 - 12:00)
- **Pipeline de agregación**: $match, $group, $sort
- **Operadores de agregación**: $sum, $avg, $max, $min
- **Búsqueda de texto**: Índices de texto y $text
- **Consultas geoespaciales**: Básicas

### 🔗 Módulo 3: Relaciones y Referencias (13:00 - 14:30)
- **Documentos embebidos** vs **Referencias**
- **Populate** con Node.js
- **Diseño de esquemas relacionales**
- **Integridad referencial**

### 🎨 Módulo 4: Aplicación Web (14:30 - 16:00)
- **API REST** con Express.js
- **Mongoose ODM**: Modelos y esquemas
- **Frontend**: HTML/CSS/JavaScript
- **Conexión completa**: Frontend ↔ API ↔ MongoDB

## 📋 Agenda Detallada

| Hora | Actividad | Duración |
|------|-----------|----------|
| 9:00 - 9:15 | 🌅 Repaso Día 1 y objetivos | 15 min |
| 9:15 - 10:15 | 📝 CRUD Avanzado | 60 min |
| 10:15 - 10:30 | ☕ Descanso | 15 min |
| 10:30 - 12:00 | 🔍 Agregaciones y consultas | 90 min |
| 12:00 - 13:00 | 🍽️ Almuerzo | 60 min |
| 13:00 - 14:15 | 🔗 Relaciones y esquemas | 75 min |
| 14:15 - 14:30 | ☕ Descanso | 15 min |
| 14:30 - 15:45 | 🎨 Desarrollo de aplicación web | 75 min |
| 15:45 - 16:00 | 📝 Recap y preparación Día 3 | 15 min |

## 🛠️ Preparación

### Antes de Empezar
1. ✅ MongoDB funcionando del Día 1
2. ✅ Base de datos `musicaDB` con datos
3. ✅ Node.js y npm instalados
4. ✅ Editor de código configurado

### Nuevas Dependencias
```bash
npm init -y
npm install express mongoose cors
npm install --save-dev nodemon
```

## 📁 Estructura de Trabajo

```
dia2-crud-avanzado-mongodb/
├── 📂 ejercicios/
│   ├── consultas-avanzadas.md
│   ├── agregaciones.js
│   └── esquemas-relacionales.js
├── 📂 proyecto-web/
│   ├── backend/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── frontend/
│   │   ├── css/
│   │   ├── js/
│   │   └── index.html
│   └── package.json
└── 📂 material/
    ├── agregaciones-guia.md
    └── mongoose-fundamentos.md
```

## 🎯 Resultados Esperados

Al final del día tendrás:
- ✅ Consultas MongoDB expertas
- ✅ Pipeline de agregación funcional
- ✅ Esquemas relacionales implementados
- ✅ API REST completa con Express + Mongoose
- ✅ Frontend conectado a la API
- ✅ CRUD completo desde la interfaz web

## 🔄 Datos de Trabajo

Expandiremos el modelo de canciones con:
- 👤 **Artistas**: Información detallada
- 💿 **Álbumes**: Colección de canciones
- ⭐ **Reseñas**: Opiniones de usuarios
- 🏷️ **Géneros**: Categorización avanzada

---

<div style="background-color: #3F9A2F; padding: 10px; border-radius: 5px; color: white;">
  <strong>💡 Tip del Día:</strong> Hoy construiremos una aplicación real. ¡Mantén tu entusiasmo!
</div>

## 🔗 Enlaces del Día
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Aggregation Pipeline](https://docs.mongodb.com/manual/core/aggregation-pipeline/)
- [Express.js Guide](https://expressjs.com/)
