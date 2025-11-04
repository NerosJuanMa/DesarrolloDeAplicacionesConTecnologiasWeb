import express from 'express';
// import fs from 'fs/promises';
import { promises as fs } from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

// 🧭 Configuración de __dirname y __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

const ARCHIVO_DIARIO = path.join(__dirname, 'datosdiario.json');

// 🧩 FUNCIONES AUXILIARES

async function leerDiario() {
  try {
    const contenido = await fs.readFile(ARCHIVO_DIARIO, 'utf8');
    return JSON.parse(contenido);
  } catch (e) {
    return [];
  }
}

// 🏠 RUTAS

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Obtener todas las entradas
app.get('/api/diario', async (req, res) => {
  const diario = await leerDiario();
  res.json({
    exito: true,
    datos: diario,
    mensaje: `Se encontraron ${diario.length} entradas de diario`
  });
});

async function escribirDiario(nueva) {
  await fs.writeFile(ARCHIVO_DIARIO, JSON.stringify(nueva, null, 2), 'utf8');

}
// Crear nueva entrada
app.post('/api/diario', async (req, res) => {
  try {
    const nueva = {
      dia: req.body.dia,
      anotacion: req.body.anotacion,
      estado: req.body.estado
    };
    const diario = await leerDiario();
    const maxId = diario.reduce((max, c) => Math.max(max, c.id || 0), 0);
    nueva.id = maxId + 1;

    if (!nueva.dia || !nueva.anotacion || !nueva.estado) {
      return res.status(400).json({
        exito: false,
        mensaje: 'Faltan datos (dia, anotacion, estado)'
      });
    }
    diario.push(nueva);
    await escribirDiario(diario);

    res.json({
      exito: true,
      datos: nueva,
      mensaje: 'Entrada creada correctamente'
    });
  } catch (error) {
    console.error('❌ Error al guardar entrada:', error);
    res.status(500).json({ exito: false, mensaje: 'Error al guardar entrada' });
  }
});


// Actualizar entrada
app.put('/api/diario/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const { dia, anotacion, estado } = req.body;

  if (!dia || !anotacion || !estado) {
    return res.status(400).json({
      exito: false,
      mensaje: 'Faltan datos (dia, anotacion, estado)'
    });
  }

  const diario = await leerDiario();
  const indice = diario.findIndex(c => c.id === id);

  if (indice === -1) {
    return res.status(404).json({
      exito: false,
      mensaje: `No se encontró entrada con ID ${id}`
    });
  }

  diario[indice] = { id, dia, anotacion, estado };
  await escribirDiario(diario);

  res.json({
    exito: true,
    datos: diario[indice],
    mensaje: `Entrada actualizada correctamente`
  });
});

// Eliminar entrada
app.delete('/api/diario/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const diario = await leerDiario();

  const indice = diario.findIndex(c => c.id === id);
  if (indice === -1) {
    return res.status(404).json({
      exito: false,
      mensaje: `No se encontró entrada con ID ${id}`
    });
  }

  const eliminado = diario.splice(indice, 1)[0];
  await escribirDiario(diario);

  res.json({
    exito: true,
    datos: eliminado,
    mensaje: `Entrada "${eliminado.dia}" eliminada correctamente`
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('📔 DIARIO INICIADO');
  console.log('='.repeat(50));
  console.log(`🌐 http://localhost:${PORT}`);
  console.log(`📡 API: http://localhost:${PORT}/api/diario`);
});

process.on('uncaughtException', e => console.error('❌ ERROR:', e.message));
process.on('unhandledRejection', r => console.error('❌ PROMESA:', r));
