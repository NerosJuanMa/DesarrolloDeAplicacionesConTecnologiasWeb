// 📝 MANUAL: Servidor Express + MongoDB
// Este archivo es el punto de entrada de nuestra aplicación

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

// 📁 Importar rutas
const cancionesRoutes = require('./routes/canciones');

// 🚀 Crear instancia de Express
const app = express();
const PORT = process.env.PORT || 3000;

// 📝 MANUAL: ¿Qué es middleware?
// Son funciones que se ejecutan entre la petición y la respuesta
// Se ejecutan en orden y pueden modificar req/res

// 🔧 Middleware para parsear JSON
// Permite que Express entienda JSON en el body de las peticiones
app.use(express.json());

// 📁 Servir archivos estáticos (HTML, CSS, JS del frontend)
app.use(express.static(path.join(__dirname, 'public')));

// 📝 MANUAL: Conexión a MongoDB
// MongoDB Atlas (nube) vs MongoDB local
// Para este ejercicio usaremos MongoDB local

const MONGODB_URI = 'mongodb://localhost:27017/ejercicio_canciones';

async function conectarBaseDatos() {
  try {
    // 🔗 Conectar a MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Conectado a MongoDB exitosamente');
    console.log('📁 Base de datos: ejercicio_canciones');
    
    // 📊 Opcional: Poblar con datos iniciales
    await poblarDatosIniciales();
    
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    console.log('\n📋 Instrucciones para instalar MongoDB:');
    console.log('1. Descarga MongoDB Community: https://www.mongodb.com/try/download/community');
    console.log('2. Instala MongoDB');
    console.log('3. Ejecuta: mongod');
    console.log('4. Reinicia este servidor\n');
    
    // No terminar el proceso, permitir que funcione sin BD
    // process.exit(1);
  }
}

// 🎵 Función para poblar datos iniciales
async function poblarDatosIniciales() {
  try {
    const Cancion = require('./models/Cancion');
    
    // 🔍 Verificar si ya hay canciones
    const count = await Cancion.countDocuments();
    
    if (count === 0) {
      console.log('📥 Poblando base de datos con datos iniciales...');
      
      // 📖 Leer datos del archivo JSON
      const fs = require('fs');
      const cancionesIniciales = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'data', 'canciones.json'), 'utf8')
      );
      
      // 💾 Insertar canciones (sin el campo 'id' porque MongoDB usa '_id')
      const cancionesSinId = cancionesIniciales.map(cancion => {
        const { id, ...cancionSinId } = cancion;
        return cancionSinId;
      });
      
      await Cancion.insertMany(cancionesSinId);
      console.log(`✅ ${cancionesSinId.length} canciones insertadas exitosamente`);
    } else {
      console.log(`📊 Base de datos ya contiene ${count} canciones`);
    }
  } catch (error) {
    console.error('❌ Error poblando datos iniciales:', error.message);
  }
}

// 🛣️ Configurar rutas
app.use('/api/canciones', cancionesRoutes);

// 📝 Ruta principal - servir el frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 🔧 Middleware para manejar rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  });
});

// 🚫 Middleware para manejo global de errores
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor'
  });
});

// 🚀 Iniciar servidor
async function iniciarServidor() {
  await conectarBaseDatos();
  
  app.listen(PORT, () => {
    console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log('📁 Frontend disponible en: http://localhost:${PORT}');
    console.log('🔗 API disponible en: http://localhost:${PORT}/api/canciones');
    console.log('\n📝 Endpoints disponibles:');
    console.log('   GET    /api/canciones           - Obtener todas las canciones');
    console.log('   GET    /api/canciones/:id       - Obtener canción por ID');
    console.log('   GET    /api/canciones/buscar/:artista - Buscar por artista');
    console.log('   POST   /api/canciones           - Crear nueva canción');
    console.log('   PUT    /api/canciones/:id       - Actualizar canción');
    console.log('   DELETE /api/canciones/:id       - Eliminar canción');
    console.log('\n🛑 Para detener el servidor: Ctrl + C');
  });
}

// 🏁 Punto de entrada
iniciarServidor();
