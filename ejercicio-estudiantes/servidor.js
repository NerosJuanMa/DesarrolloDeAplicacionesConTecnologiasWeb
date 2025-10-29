// SERVIDOR BACKEND - Ejercicio de Estudiantes
// Este archivo maneja la lógica del servidor y las rutas API

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json()); // Para poder recibir datos JSON
app.use(express.static('public')); // Servir archivos estáticos desde la carpeta public

// DATOS - Array de estudiantes (simulando una base de datos)
let estudiantes = [
    {
        id: 1,
        nombre: "Ana García",
        edad: 20,
        carrera: "Ingeniería en Sistemas",
        promedio: 8.5
    },
    {
        id: 2,
        nombre: "Carlos López",
        edad: 22,
        carrera: "Diseño Gráfico",
        promedio: 9.0
    },
    {
        id: 3,
        nombre: "María Rodríguez",
        edad: 19,
        carrera: "Administración",
        promedio: 7.8
    },
    {
        id: 4,
        nombre: "Juan Pérez",
        edad: 21,
        carrera: "Ingeniería Civil",
        promedio: 8.2
    }
];

// RUTAS DEL API

// 1. Obtener todos los estudiantes (GET)
app.get('/api/estudiantes', (req, res) => {
    console.log('📚 Solicitando lista de estudiantes...');
    res.json({
        success: true,
        data: estudiantes,
        mensaje: 'Estudiantes obtenidos correctamente'
    });
});

// 2. Obtener un estudiante por ID (GET)
app.get('/api/estudiantes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const estudiante = estudiantes.find(est => est.id === id);
    
    if (estudiante) {
        console.log(`👤 Estudiante encontrado: ${estudiante.nombre}`);
        res.json({
            success: true,
            data: estudiante,
            mensaje: 'Estudiante encontrado'
        });
    } else {
        console.log(`❌ Estudiante con ID ${id} no encontrado`);
        res.status(404).json({
            success: false,
            mensaje: 'Estudiante no encontrado'
        });
    }
});

// 3. Crear un nuevo estudiante (POST)
app.post('/api/estudiantes', (req, res) => {
    const { nombre, edad, carrera, promedio } = req.body;
    
    // Validaciones básicas
    if (!nombre || !edad || !carrera || !promedio) {
        return res.status(400).json({
            success: false,
            mensaje: 'Todos los campos son requeridos: nombre, edad, carrera, promedio'
        });
    }
    
    // Generar nuevo ID
    const nuevoId = estudiantes.length > 0 ? Math.max(...estudiantes.map(e => e.id)) + 1 : 1;
    
    const nuevoEstudiante = {
        id: nuevoId,
        nombre: nombre.trim(),
        edad: parseInt(edad),
        carrera: carrera.trim(),
        promedio: parseFloat(promedio)
    };
    
    estudiantes.push(nuevoEstudiante);
    console.log(`✅ Nuevo estudiante creado: ${nuevoEstudiante.nombre}`);
    
    res.status(201).json({
        success: true,
        data: nuevoEstudiante,
        mensaje: 'Estudiante creado exitosamente'
    });
});

// 4. Actualizar un estudiante (PUT)
app.put('/api/estudiantes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, edad, carrera, promedio } = req.body;
    
    const indice = estudiantes.findIndex(est => est.id === id);
    
    if (indice === -1) {
        return res.status(404).json({
            success: false,
            mensaje: 'Estudiante no encontrado'
        });
    }
    
    // Actualizar los datos
    estudiantes[indice] = {
        id: id,
        nombre: nombre || estudiantes[indice].nombre,
        edad: edad ? parseInt(edad) : estudiantes[indice].edad,
        carrera: carrera || estudiantes[indice].carrera,
        promedio: promedio ? parseFloat(promedio) : estudiantes[indice].promedio
    };
    
    console.log(`📝 Estudiante actualizado: ${estudiantes[indice].nombre}`);
    
    res.json({
        success: true,
        data: estudiantes[indice],
        mensaje: 'Estudiante actualizado exitosamente'
    });
});

// 5. Eliminar un estudiante (DELETE)
app.delete('/api/estudiantes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indice = estudiantes.findIndex(est => est.id === id);
    
    if (indice === -1) {
        return res.status(404).json({
            success: false,
            mensaje: 'Estudiante no encontrado'
        });
    }
    
    const estudianteEliminado = estudiantes.splice(indice, 1)[0];
    console.log(`🗑️ Estudiante eliminado: ${estudianteEliminado.nombre}`);
    
    res.json({
        success: true,
        data: estudianteEliminado,
        mensaje: 'Estudiante eliminado exitosamente'
    });
});

// Ruta para servir el frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log('\n🚀 ===============================================');
    console.log('   SERVIDOR DE ESTUDIANTES INICIADO');
    console.log('===============================================');
    console.log(`🌐 Servidor corriendo en: http://localhost:${PORT}`);
    console.log(`📱 Frontend disponible en: http://localhost:${PORT}`);
    console.log(`🔗 API disponible en: http://localhost:${PORT}/api/estudiantes`);
    console.log('===============================================\n');
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.message);
    res.status(500).json({
        success: false,
        mensaje: 'Error interno del servidor'
    });
});

// Ruta para manejar rutas no encontradas
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        mensaje: 'Ruta no encontrada'
    });
});
