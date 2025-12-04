const express = require('express');
const router = express.Router();
const Cancion = require('../models/Cancion');

// 📝 MANUAL: Rutas API - CRUD Operations
// GET = Leer datos
// POST = Crear nuevos datos  
// PUT = Actualizar datos completos
// DELETE = Eliminar datos

// 📖 GET /api/canciones - Obtener todas las canciones
// 💡 Equivalente a: const canciones = JSON.parse(fs.readFileSync('canciones.json'))
router.get('/', async (req, res) => {
  try {
    // 🔍 Buscar todas las canciones en la base de datos
    const canciones = await Cancion.find();
    
    // 📊 Información adicional sobre la consulta
    res.json({
      success: true,
      count: canciones.length,
      data: canciones
    });
  } catch (error) {
    console.error('Error al obtener canciones:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// 📖 GET /api/canciones/:id - Obtener una canción específica
router.get('/:id', async (req, res) => {
  try {
    // 🔍 Buscar canción por ID
    const cancion = await Cancion.findById(req.params.id);
    
    if (!cancion) {
      return res.status(404).json({
        success: false,
        message: 'Canción no encontrada'
      });
    }
    
    res.json({
      success: true,
      data: cancion
    });
  } catch (error) {
    console.error('Error al obtener canción:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// 🔍 GET /api/canciones/buscar/:artista - Buscar por artista
router.get('/buscar/:artista', async (req, res) => {
  try {
    const artista = req.params.artista;
    
    // 🔍 Búsqueda case-insensitive usando regex
    const canciones = await Cancion.find({
      artista: { $regex: artista, $options: 'i' }
    });
    
    res.json({
      success: true,
      count: canciones.length,
      artista: artista,
      data: canciones
    });
  } catch (error) {
    console.error('Error en búsqueda:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// ➕ POST /api/canciones - Crear nueva canción
// 💡 Equivalente a: agregar elemento al array y escribir JSON
router.post('/', async (req, res) => {
  try {
    // 📝 Crear nueva instancia del modelo
    const nuevaCancion = new Cancion(req.body);
    
    // 💾 Guardar en la base de datos
    const cancionGuardada = await nuevaCancion.save();
    
    res.status(201).json({
      success: true,
      message: 'Canción creada exitosamente',
      data: cancionGuardada
    });
  } catch (error) {
    console.error('Error al crear canción:', error);
    
    // 🚫 Error de validación
    if (error.name === 'ValidationError') {
      const errores = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errores: errores
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// ✏️ PUT /api/canciones/:id - Actualizar canción
router.put('/:id', async (req, res) => {
  try {
    // 🔄 Actualizar y retornar el documento actualizado
    const cancionActualizada = await Cancion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { 
        new: true, // Retorna el documento actualizado
        runValidators: true // Ejecuta las validaciones del schema
      }
    );
    
    if (!cancionActualizada) {
      return res.status(404).json({
        success: false,
        message: 'Canción no encontrada'
      });
    }
    
    res.json({
      success: true,
      message: 'Canción actualizada exitosamente',
      data: cancionActualizada
    });
  } catch (error) {
    console.error('Error al actualizar canción:', error);
    
    if (error.name === 'ValidationError') {
      const errores = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Error de validación',
        errores: errores
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

// 🗑️ DELETE /api/canciones/:id - Eliminar canción
router.delete('/:id', async (req, res) => {
  try {
    const cancionEliminada = await Cancion.findByIdAndDelete(req.params.id);
    
    if (!cancionEliminada) {
      return res.status(404).json({
        success: false,
        message: 'Canción no encontrada'
      });
    }
    
    res.json({
      success: true,
      message: 'Canción eliminada exitosamente',
      data: cancionEliminada
    });
  } catch (error) {
    console.error('Error al eliminar canción:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor'
    });
  }
});

module.exports = router;
