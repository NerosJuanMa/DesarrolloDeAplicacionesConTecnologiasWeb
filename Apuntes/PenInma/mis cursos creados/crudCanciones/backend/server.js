/* 
 * SERVER.JS - SERVIDOR WEB PARA GESTIÓN DE CANCIONES
 * ===================================================
 * 
 * Este archivo es el SERVIDOR de nuestra aplicación web.
 * Un servidor es como un "camarero digital" que:
 * 1. Escucha cuando alguien le pide algo (una página web, datos, etc.)
 * 2. Busca lo que le piden
 * 3. Se lo devuelve
 * 
 * En nuestro caso, el servidor puede:
 * - Mostrar la página web (HTML)
 * - Dar la lista de canciones
 * - Agregar nuevas canciones
 * - Modificar canciones existentes
 * - Borrar canciones
 */

// ===== PASO 1: IMPORTAR LAS HERRAMIENTAS QUE NECESITAMOS =====

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

// ===== PASO 2: CONFIGURACIÓN INICIAL =====

// Obtener la ruta de la carpeta actual (equivalente a __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear nuestra aplicación web usando Express
const app = express();

// Puerto donde correrá nuestro servidor (como una dirección)
const PUERTO = 3000;

// Ruta al archivo donde guardamos las canciones
const ARCHIVO_CANCIONES = path.join(__dirname, 'canciones.json');

// ===== PASO 3: CONFIGURAR EL SERVIDOR =====

// CORS: Permite que el frontend (que corre en el navegador) 
// pueda hablar con nuestro backend (que corre en el servidor)
app.use(cors());

// express.json(): Permite que nuestro servidor entienda datos en formato JSON
// JSON es como el "idioma" que usan las aplicaciones web para intercambiar datos
app.use(express.json());

// express.static(): Dice al servidor dónde están nuestros archivos HTML, CSS y JS
// Cuando alguien visite nuestro sitio, le daremos estos archivos
app.use(express.static(path.join(__dirname, '../frontend')));

// ===== PASO 4: FUNCIONES AUXILIARES =====
// Estas son funciones que usaremos varias veces

/**
 * LEER CANCIONES - Lee las canciones del archivo JSON
 * ¿Qué hace? Abre el archivo canciones.json y convierte su contenido en un array de JavaScript
 */
async function leerCanciones() {
    try {
        // Leer el archivo como texto
        const contenido = await fs.promises.readFile(ARCHIVO_CANCIONES, 'utf8');
        
        // Convertir el texto JSON en un array de JavaScript
        // Express.json analiza (parsea) el cuerpo de las peticiones HTTP que lleguen desde el cliente (frontend).
        // Aquí estás leyendo un archivo del disco duro, no una petición del cliente.
        const canciones = JSON.parse(contenido);
        
        console.log(`📖 Se leyeron ${canciones.length} canciones del archivo`);
        return canciones;
    } catch (error) {
        // Si hay un error (archivo no existe, está corrupto, etc.), devolver array vacío
        console.error('❌ Error al leer canciones:', error.message);
        return [];
    }
}


// ===== PASO 5: RUTAS DEL SERVIDOR =====
// Las rutas son como "direcciones" que el servidor puede manejar

/**
 * RUTA: GET / 
 * ¿Qué hace? Cuando alguien visita http://localhost:3000/ le damos la página principal
 */
app.get('/', (peticion, respuesta) => {
    console.log('🏠 Alguien visitó la página principal');
    respuesta.sendFile(path.join(__dirname, '../frontend/index.html'));
});

/**
 * RUTA: GET /api/canciones
 * ¿Qué hace? Devuelve TODAS las canciones en formato JSON
 * Es como preguntar: "¿Me puedes dar la lista completa de canciones?"
 */
app.get('/api/canciones', (peticion, respuesta) => {
    console.log('� Solicitud: Dame todas las canciones');
    
    // Leer las canciones del archivo
    const canciones = leerCanciones();
    
    // Devolver las canciones en formato JSON
    respuesta.json({
        exito: true,
        datos: canciones,
        mensaje: `Se encontraron ${canciones.length} canciones`
    });
});

/**
 * RUTA: POST /api/canciones
 * ¿Qué hace? CREA una nueva canción
 * El navegador nos envía los datos de la nueva canción y nosotros la guardamos
 */

async function crearCancion(peticion, respuesta) {
    console.log('➕ Solicitud: Crear nueva canción');
    console.log('📦 Datos recibidos:', peticion.body);
    
    // Extraer los datos que nos envió el navegador
    const { titulo, artista, año } = peticion.body;
    
    // Validar que todos los campos estén presentes
    if (!titulo || !artista || !año) {
        return respuesta.status(400).json({
            exito: false,
            mensaje: 'Faltan datos. Se necesita: titulo, artista y año'
        });
    }
    
    // Leer las canciones actuales
    const canciones =  leerCanciones();
    
    // Crear la nueva canción
    const nuevaCancion = {
        id: obtenerSiguienteId(canciones),
        titulo: titulo.trim(), // trim() quita espacios al inicio y final
        artista: artista.trim(),
        año: parseInt(año) // Asegurar que sea un número
    };
    
    // Agregar la nueva canción al array
    canciones.push(nuevaCancion);
    
    // Guardar todo en el archivo
    if (guardarCanciones(canciones)) {
        respuesta.status(201).json({
            exito: true,
            datos: nuevaCancion,
            mensaje: `Canción "${nuevaCancion.titulo}" creada exitosamente`
        });
    } else {
        respuesta.status(500).json({
            exito: false,
            mensaje: 'Error al guardar la canción en el archivo'
        });
    }
}

/**
 * GUARDAR CANCIONES - Guarda las canciones en el archivo JSON
 * ¿Qué hace? Toma un array de canciones y lo guarda en el archivo
 */
function guardarCanciones(canciones) {
    try {
        // Convertir el array de JavaScript a texto JSON (bonito y formateado)
        const contenidoJSON = JSON.stringify(canciones, null, 2);
        
        // Escribir el contenido al archivo
        fs.writeFileSync(ARCHIVO_CANCIONES, contenidoJSON);
        
        console.log(`💾 Se guardaron ${canciones.length} canciones en el archivo`);
        return true;
    } catch (error) {
        console.error('❌ Error al guardar canciones:', error.message);
        return false;
    }
}

/**
 * OBTENER SIGUIENTE ID - Calcula el próximo ID para una nueva canción
 * ¿Qué hace? Mira todas las canciones, encuentra el ID más alto, y suma 1
 */
function obtenerSiguienteId(canciones) {
    // Si no hay canciones, el primer ID es 1
    if (canciones.length === 0) {
        return 1;
    }
    
    // Buscar el ID más alto y sumarle 1
    const ids = canciones.map(cancion => cancion.id); // Extraer solo los IDs
    const idMasAlto = Math.max(...ids); // Encontrar el mayor
    return idMasAlto + 1;
}

//aqui termina la funcion
/**
 * RUTA: PUT /api/canciones/:id
 * ¿Qué hace? ACTUALIZA una canción existente
 * Ejemplo: PUT /api/canciones/3 actualiza la canción con ID 3
 */
app.put('/api/canciones/:id', (peticion, respuesta) => {
    const id = parseInt(peticion.params.id);
    console.log(`✏️ Solicitud: Actualizar canción con ID ${id}`);
    console.log('📦 Nuevos datos:', peticion.body);
    
    const { titulo, artista, año } = peticion.body;
    
    // Validar datos
    if (!titulo || !artista || !año) {
        return respuesta.status(400).json({
            exito: false,
            mensaje: 'Faltan datos. Se necesita: titulo, artista y año'
        });
    }
    
    // Leer canciones actuales
    const canciones = leerCanciones();
    
    // Buscar la posición de la canción a actualizar
    const indice = canciones.findIndex(c => c.id === id);
    
    if (indice === -1) {
        return respuesta.status(404).json({
            exito: false,
            mensaje: `No se encontró una canción con ID ${id}`
        });
    }
    
    // Actualizar la canción (mantenemos el ID original)
    canciones[indice] = {
        id: id, // Mantener el ID original
        titulo: titulo.trim(),
        artista: artista.trim(),
        año: parseInt(año)
    };
    
    // Guardar los cambios
    if (guardarCanciones(canciones)) {
        respuesta.json({
            exito: true,
            datos: canciones[indice],
            mensaje: `Canción "${canciones[indice].titulo}" actualizada exitosamente`
        });
    } else {
        respuesta.status(500).json({
            exito: false,
            mensaje: 'Error al guardar los cambios'
        });
    }
});

/**
 * RUTA: DELETE /api/canciones/:id
 * ¿Qué hace? ELIMINA una canción
 * Ejemplo: DELETE /api/canciones/3 elimina la canción con ID 3
 */
app.delete('/api/canciones/:id', (peticion, respuesta) => {
    const id = parseInt(peticion.params.id);
    console.log(`🗑️ Solicitud: Eliminar canción con ID ${id}`);
    
    // Leer canciones actuales
    const canciones = leerCanciones();
    
    // Buscar la posición de la canción a eliminar
    const indice = canciones.findIndex(c => c.id === id);
    
    if (indice === -1) {
        return respuesta.status(404).json({
            exito: false,
            mensaje: `No se encontró una canción con ID ${id}`
        });
    }
    
    // Guardar referencia a la canción que vamos a eliminar
    const cancionEliminada = canciones[indice];
    
    // Eliminar la canción del array
    canciones.splice(indice, 1);
    
    // Guardar los cambios
    if (guardarCanciones(canciones)) {
        respuesta.json({
            exito: true,
            datos: cancionEliminada,
            mensaje: `Canción "${cancionEliminada.titulo}" eliminada exitosamente`
        });
    } else {
        respuesta.status(500).json({
            exito: false,
            mensaje: 'Error al guardar los cambios'
        });
    }
});

// ===== PASO 6: INICIAR EL SERVIDOR =====

/**
 * INICIAR SERVIDOR
 * ¿Qué hace? Pone el servidor a "escuchar" en el puerto 3000
 * Es como abrir la puerta de una tienda para que entren clientes
 */
app.listen(PUERTO, () => {
    console.log('='.repeat(50));
    console.log('🎵 SERVIDOR DE CANCIONES INICIADO');
    console.log('='.repeat(50));
    console.log(`🌐 URL del sitio web: http://localhost:${PUERTO}`);
    console.log(`� URL de la API: http://localhost:${PUERTO}/api/canciones`);
    console.log('📁 Sirviendo archivos desde la carpeta frontend');
    console.log('');
    console.log('� Para usar la aplicación:');
    console.log('   1. Abre tu navegador');
    console.log(`   2. Ve a http://localhost:${PUERTO}`);
    console.log('   3. ¡Disfruta gestionando canciones!');
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
 * 1. LEER: Puede leer canciones del archivo JSON y mostrarlas
 * 2. CREAR: Puede recibir datos de nuevas canciones y guardarlas
 * 3. ACTUALIZAR: Puede modificar canciones existentes
 * 4. ELIMINAR: Puede borrar canciones
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