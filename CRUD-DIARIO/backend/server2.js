// server.js
import express from 'express';
import { promises as fs } from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

const ARCHIVO_DIARIO = path.join(__dirname, 'datosdiario.json');

// FUNCIONES (usando fs.promises)
async function leerdiario() {
  try {
    const contenido = await fs.readFile(ARCHIVO_DIARIO, 'utf8');
    const diario = JSON.parse(contenido);
    // aseguramos que sea un array
    return Array.isArray(diario) ? diario : [];
  } catch (e) {
    // si no existe o hay error, devolvemos array vacío
    return [];
  }
}

// async function escribirdiario(array) {
//   const contenidoJSON = JSON.stringify(array, null, 2);
//   await fs.writeFile(ARCHIVO_DIARIO, contenidoJSON, 'utf8');
// }
async function escribirdiario(array) {
  try {
    const contenidoJSON = JSON.stringify(array, null, 2);
    await fs.writeFile(ARCHIVO_DIARIO, contenidoJSON, 'utf8');
    console.log('Archivo diario guardado correctamente.');
  } catch (err) {
    console.error('Error escribiendo diario:', err);
  }
}

// RUTAS
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/api/diario', async (req, res) => {
  const diario = await leerdiario();
  res.json({
    exito: true,
    datos: diario,
    mensaje: `Se encontraron ${diario.length} entradas de diario`
  });
});

app.post('/api/diario', async (req, res) => {
  try {
    const nueva = req.body;
    // validación básica
    if (!nueva || !nueva.dia || !nueva.anotacion || !nueva.estado) {
      return res.status(400).json({ exito: false, mensaje: 'Faltan campos obligatorios' });
    }

    const diario = await leerdiario();
    const maxId = diario.reduce((max, c) => Math.max(max, c.id || 0), 0);
    nueva.id = maxId + 1;

    diario.push(nueva);
    console.log('Recibido en POST /api/diario:', nueva);
    await escribirdiario(diario);

    res.status(201).json({ exito: true, datos: nueva, mensaje: 'Entrada creada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ exito: false, mensaje: 'Error al guardar la entrada' });
  }
});

app.put('/api/diario/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { dia, anotacion, estado } = req.body;

    if (!dia || !anotacion || !estado) {
      return res.status(400).json({ exito: false, mensaje: 'Faltan datos.' });
    }

    const diario = await leerdiario();
    const idx = diario.findIndex(item => item.id === id);
    if (idx === -1) return res.status(404).json({ exito: false, mensaje: 'No encontrado' });

    diario[idx] = { id, dia: dia.trim(), anotacion: anotacion.trim(), estado: estado.trim() };
    await escribirdiario(diario);

    res.json({ exito: true, datos: diario[idx], mensaje: 'Entrada actualizada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ exito: false, mensaje: 'Error al actualizar' });
  }
});

app.delete('/api/diario/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const diario = await leerdiario();
    const idx = diario.findIndex(item => item.id === id);
    if (idx === -1) return res.status(404).json({ exito: false, mensaje: 'No encontrado' });

    const eliminado = diario.splice(idx, 1)[0];
    await escribirdiario(diario);

    res.json({ exito: true, datos: eliminado, mensaje: 'Entrada eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ exito: false, mensaje: 'Error al eliminar' });
  }
});


/**
 * INICIAR SERVIDOR
 * ¿Qué hace? Pone el servidor a "escuchar" en el puerto 3000
 * Es como abrir la puerta de una tienda para que entren clientes
 */
app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log('🎵 DIARIO INICIADO');
    console.log('='.repeat(50));
    console.log(`🌐 URL del sitio web: http://localhost:${PORT}`);
    console.log(`� URL de la API: http://localhost:${PORT}/api/diario`);
    console.log('📁 Sirviendo archivos desde la carpeta frontend');
    console.log('');
    console.log('� Para usar la aplicación:');
    console.log('   1. Abre tu navegador');
    console.log(`   2. Ve a http://localhost:${PORT}`);
    console.log('   3. ¡Disfruta gestionando tu diario!');
    console.log('='.repeat(50));
});

// ===== MANEJO DE ERRORES =====

/**
 * ERRORES NO CAPTURADOS
 * Si algo sale mal en el servidor, estos manejadores nos lo dirán
 */
process.on('uncaughtException', (error) => {
    console.error('❌ ERROR GRAVE EN EL SERVIDOR:', error.message);
    console.error('📍 Revisar el código para encontrar el problema');
});

process.on('unhandledRejection', (reason) => {
    console.error('❌ ERROR EN PROMESA:', reason);
    console.error('📍 Revisar operaciones asíncronas (async/await)');
});

/* 
 * ===== RESUMEN DE LO QUE HACE ESTE SERVIDOR =====
 * 
 * 1. LEER: Puede leer diario del archivo JSON y mostrarlas
 * 2. CREAR: Puede recibir datos de nuevas diario y guardarlas
 * 3. ACTUALIZAR: Puede modificar diario existentes
 * 4. ELIMINAR: Puede borrar diario
 * 5. SERVIR: Puede mostrar la página web a los usuarios
 * 
 * Esto se llama CRUD (Create, Read, Update, Delete) y es la base
 * de casi todas las aplicaciones web.
 * 
 * El servidor "escucha" en el puerto 3000 y responde a diferentes
 * tipos de peticiones HTTP:
 * - GET: Para leer/obtener datos
 * - POST: Para crear nuevos datos  
 * - PUT: Para actualizar datos existentes
 * - DELETE: Para eliminar datos
 */