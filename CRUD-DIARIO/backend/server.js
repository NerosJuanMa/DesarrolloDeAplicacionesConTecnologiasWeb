import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

// 🧭 Esto reemplaza a __dirname y __filename en ES Modules:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Declaramos servidor y puerto
const app = express();
const PORT = 3000;
//Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));
//Path

const ARCHIVO_DIARIO = path.join(__dirname, 'datosdiario.json');

                //FUNCIONES NECESARIAS:
function leerDiario() {
    try {
        // Leer el archivo como texto
        const contenido = fs.readFileSync(ARCHIVO_DIARIO, 'utf8');
        // Convertir el texto JSON en un array de JavaScript
        const diario = JSON.parse(contenido);

        console.log(`📖 Se leyeron ${diario.length} entradas del diario`);
        return diario;
    }
    catch (error) {        
        console.error('❌ Error al leerDiario:', error.message);
        return [];
    }
}      

function guardardiario(diario) {
    try {
        // Convertir el array de JavaScript a texto JSON (bonito y formateado)
        const contenidoJSON = JSON.stringify(diario, null, 2);
        
        // Escribir el contenido al archivo
        fs.writeFileSync(ARCHIVO_DIARIO, contenidoJSON);
        
        console.log(`💾 Se guardaron ${diario.length} entradas de diario en el archivo`);
        return true;
    } catch (error) {
        console.error('❌ Error al guardar diario:', error.message);
        return false;
    }
}

function obtenerSiguienteId(diario) {
    // Si no hay diario, el primer ID es 1
    if (diario.length === 0) {
        return 1;
    }
    
    // Buscar el ID más alto y sumarle 1
    const ids = diario.map(diario => diario.id); // Extraer solo los IDs
    const idMasAlto = Math.max(...ids); // Encontrar el mayor
    return idMasAlto + 1;
}

//Rutas
app.get('/', (peticion, respuesta) => {
    console.log('🏠 Alguien visitó la página principal');
    respuesta.sendFile(path.join(__dirname, '../frontend/index.html'));
});
app.get('/api/diario', (peticion, respuesta) => {
    console.log('� Solicitud: Dame todas las entradas de diario');
       // Leer las entradas del archivo
    const diario = leerDiario();
        // Devolver las entradas en formato JSON
    respuesta.json({
        exito: true,
        datos: diario,
        mensaje: `Se encontraron ${diario.length} entradas de diario`
    });
});
            //  POST CREAR ENTRADA DE DIARIO

app.post('/api/diario', (peticion, respuesta) => {
    console.log('➕ Solicitud: Crear nueva entrada al diario');
    console.log('📦 Datos recibidos:', peticion.body);
    
    // Extraer los datos que nos envió el navegador
    const { Dia, Anotacion, Estado } = peticion.body;
    
    // Validar que todos los campos estén presentes
    if (!Dia || !Anotacion || !Estado) {
        return respuesta.status(400).json({
            exito: false,
            mensaje: 'Faltan datos. Se necesita: Dia, Anotacion y estado'
        });
    }
    
    // Leer las entradas a diario actuales
    const diario = leerdiario();
    
    // Crear la nueva entrada de diario
    const nuevaEntrada = {
        id: obtenerSiguienteId(diario),
        Dia: Dia.trim(), // trim() quita espacios al inicio y final
        Anotacion: Anotacion.trim(),
        Estado: Estado.trim()
    };
    
    // Agregar la nueva entrada de diario al array
    diario.push(nuevaEntrada);
    
    // Guardar todo en el archivo
    if (guardardiario(diario)) {
        respuesta.status(201).json({
            exito: true,
            datos: nuevaEntrada,
            mensaje: `Entrada a diario "${nuevaEntrada.Dia}" creada exitosamente`
        });
    } 
    else {
        respuesta.status(500).json({
            exito: false,
            mensaje: 'Error al guardar la entrada a diario en el archivo'
        });
    }
});

            //PUT - ACTUALIZAR ENTRADA DE DIARIO

app.put('/api/diario/:id', (peticion, respuesta) => {
    const id = parseInt(peticion.params.id);
    console.log(`✏️ Solicitud: Actualizar diario con ID ${id}`);
    console.log('📦 Nuevos datos:', peticion.body);
    
   
    const { Dia, Anotacion, Estado } = peticion.body;
    
    // Validar datos
    if (!Dia || !Anotacion || !Estado) {
        return respuesta.status(400).json({
            exito: false,
            mensaje: 'Faltan datos. Se necesita: Dia, Anotacion y estado'
        });
    }
    
    // Leer diario actuales
    const diario = leerdiario();
    
    // Buscar la posición de la entrada del diario a actualizar
    const indice = diario.findIndex(c => c.id === id);
    
    if (indice === -1) {
        return respuesta.status(404).json({
            exito: false,
            mensaje: `No se encontró una entrada de diario con ID ${id}`
        });
    }
    
    // Actualizar la entrada del diario (mantenemos el ID original)
    diario[indice] = {
        id: id, // Mantener el ID original        
        Dia: Dia.trim(), // trim() quita espacios al inicio y final
        Anotacion: Anotacion.trim(),
        Estado: Estado.trim()
    };
        
    // Guardar los cambios
    
   if (guardardiario(diario)) {
        respuesta.json({
            exito: true,
            datos: diario[indice],
            mensaje: `Entrada a diario "${diario[indice].Dia}" actualizada exitosamente`
        });
    } 
    else {
        respuesta.status(500).json({
            exito: false,
            mensaje: 'Error al guardar los cambios'
        });
    }
    
});
// DELETE - BORRAR ENTRADA DE DIARIO

app.delete('/api/diario/:id', (peticion, respuesta) => {
    const id = parseInt(peticion.params.id);
    console.log(`🗑️ Solicitud: Eliminar entrada de diario con ID ${id}`);
    
    // Leer diario actuales
    const diario = leerdiario();
    
    // Buscar la posición de la canción a eliminar
    const indice = diario.findIndex(c => c.id === id);
    
    if (indice === -1) {
        return respuesta.status(404).json({
            exito: false,
            mensaje: `No se encontró una entrada de diario con ID ${id}`
        });
    }
    
    // Guardar referencia a la canción que vamos a eliminar
    const entradaDiarioEleminada = diario[indice];
    
    // Eliminar la canción del array
    diario.splice(indice, 1);
    
    // Guardar los cambios
    if (guardardiario(diario)) {
        respuesta.json({
            exito: true,
            datos: entradaDiarioEleminada,
            mensaje: `Entrada de diario "${entradaDiarioEleminada.Dia}" eliminada exitosamente`
        });
    } else {
        respuesta.status(500).json({
            exito: false,
            mensaje: 'Error al guardar los cambios'
        });
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