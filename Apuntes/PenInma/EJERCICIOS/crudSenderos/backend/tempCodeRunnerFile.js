// Express: Es como el "motor" de nuestro servidor web
import express from 'express';

// fs (File System): Nos permite leer y escribir archivos
import fs from 'fs';

// path: Nos ayuda a manejar rutas de archivos de forma correcta
import path from 'path';

// cors: Permite que nuestro frontend se comunique con el backend
import cors from 'cors';

// fileURLToPath: Necesario para obtener la carpeta actual en módulos ES6
import { fileURLToPath } from 'url';
// Obtener la ruta de la carpeta actual (equivalente a __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ARCHIVO_SENDEROS = path.join(__dirname, 'senderos.json');

// Crear la aplicación de Express

const app = express();
app.use(cors());
app.use(express.json()); // Para entender JSON en las solicitudes
app.use(express.static(path.join(__dirname, '../frontend')));


// funcion leer senderos (GET /api/senderos)

function leerSenderos() {
try {
    const contenido = fs.readFileSync(ARCHIVO_SENDEROS, 'utf-8');
    const senderos = JSON.parse(contenido);
    
    return senderos;
} catch (error) {
    console.error('Error al leer el archivo de senderos:', error);
    return [];
}
}

const PORT=3001;


//creamos ruta
app.get('/senderos', (peticion, respuesta) => {
    console.log('� Solicitud: Dame todas las rutas de senderos!');
    
    // Leer los senderos del archivo
    const senderos = leerSenderos();

    // Enviar los senderos como respuesta
    respuesta.json(senderos);
});
    
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });

   // POST /api/senderos - Crea un sendero
app.post('/api/senderos', (peticion, respuesta) => {
  console.log('➕ Solicitud: Crear nuevo sendero');
  const { nombre, zona, descripcion } = peticion.body || {};

  // Validaciones básicas
  if (!nombre || !zona || !descripcion) {
    return respuesta.status(400).json({
      exito: false,
      mensaje: 'Faltan datos. Se necesita: nombre, zona y descripcion'
    });
  }

  // Leer, crear, guardar
  const senderos = leerSenderos();
  const nuevo = {
    id: obtenerSiguienteId(senderos),
    nombre: String(nombre).trim(),
    zona: String(zona).trim(),
    descripcion: String(descripcion).trim()
  };

  senderos.push(nuevo);

  if (!guardarSenderos(senderos)) {
    return respuesta.status(500).json({
      exito: false,
      mensaje: 'Error al guardar el sendero en el archivo'
    });
  }

  return respuesta.status(201).json({
    exito: true,
    datos: nuevo,
    mensaje: `Sendero "${nuevo.nombre}" creado exitosamente`
  });
});
// === helpers muy simples ===
function guardarSenderos(senderos) {
  try {
    const json = JSON.stringify(senderos, null, 2);
    fs.writeFileSync(ARCHIVO_SENDEROS, json);
    return true;
  } catch (e) {
    console.error('❌ Error al guardar senderos:', e.message);
    return false;
  }
}

function obtenerSiguienteId(lista) {
  if (!Array.isArray(lista) || lista.length === 0) return 1;
  return Math.max(...lista.map(it => Number(it.id) || 0)) + 1;
}
