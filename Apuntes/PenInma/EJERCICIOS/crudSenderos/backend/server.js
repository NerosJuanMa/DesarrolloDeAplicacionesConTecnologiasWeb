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
app.get('/api/senderos', (peticion, respuesta) => {
  console.log('📡 Solicitud: Dame todas las rutas de senderos!');
    
    // Leer los senderos del archivo
    const senderos = leerSenderos();

    // Enviar los senderos como respuesta
    respuesta.json(senderos);
});
    
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    })

// funcion escribir senderos (POST /api/senderos)

function escribirSenderos(senderos) {
  try {
      const contenido = JSON.stringify(senderos, null, 2);
      fs.writeFileSync(ARCHIVO_SENDEROS, contenido, 'utf-8');
  } catch (error) {
      console.error('Error al escribir en el archivo de senderos:', error);
  }
}

app.post('/api/senderos', (peticion, respuesta) => {
  console.log('📡 Solicitud: Añadir un nuevo sendero!');
  const nuevoSendero = peticion.body;

  // Leer los senderos existentes
  const senderos = leerSenderos();

  // Asignar un nuevo ID
  nuevoSendero.id = senderos.length > 0 ? senderos[senderos.length - 1].id + 1 : 1;

  // Añadir el nuevo sendero a la lista
  senderos.push(nuevoSendero);

  // Escribir los senderos actualizados
  escribirSenderos(senderos);

  // Enviar respuesta
  respuesta.status(201).json(nuevoSendero);
});

// RUTA DELETE - Borrar sendero (MUY SIMPLE)
app.delete('/api/senderos/:id', (peticion, respuesta) => {
  console.log('🗑️ Solicitud: Borrar sendero ID:', peticion.params.id);
  
  const id = parseInt(peticion.params.id);
  const senderos = leerSenderos();
  
  // Encontrar índice del sendero
  const indice = senderos.findIndex(s => s.id === id);
  
  if (indice === -1) {
    return respuesta.status(404).json({ error: 'Sendero no encontrado' });
  }
  
  // Eliminar del array
  senderos.splice(indice, 1);
  
  // Guardar
  escribirSenderos(senderos);
  
  respuesta.json({ mensaje: 'Sendero borrado' });
});

// RUTA PUT - Editar sendero (MUY SIMPLE)
app.put('/api/senderos/:id', (peticion, respuesta) => {
  console.log('✏️ Solicitud: Editar sendero ID:', peticion.params.id);
  
  const id = parseInt(peticion.params.id);
  const senderos = leerSenderos();
  
  // Encontrar sendero
  const sendero = senderos.find(s => s.id === id);
  
  if (!sendero) {
    return respuesta.status(404).json({ error: 'Sendero no encontrado' });
  }
  
  // Actualizar datos (manteniendo el ID)
  sendero.nombre = peticion.body.nombre;
  sendero.zona = peticion.body.zona;
  sendero.descripcion = peticion.body.descripcion;
  
  // Guardar
  escribirSenderos(senderos);
  
  respuesta.json(sendero);
});