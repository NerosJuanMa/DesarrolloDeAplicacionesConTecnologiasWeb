const { MongoClient } = require('mongodb');
const fs = require('fs');

// Configuración de conexión
const url = 'mongodb://localhost:27017';
const dbName = 'musicaDB';
const collectionName = 'canciones';

// Colores MongoDB para los logs
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

async function migrarCancionesJson() {
  const client = new MongoClient(url);

  try {
    console.log(`${colors.green}🍃 Iniciando migración de JSON a MongoDB${colors.reset}`);
    
    // Conectar a MongoDB
    await client.connect();
    console.log(`${colors.blue}✅ Conectado a MongoDB${colors.reset}`);

    // Seleccionar base de datos
    const db = client.db(dbName);
    
    // Leer archivo JSON
    console.log(`${colors.yellow}📁 Leyendo archivo canciones.json...${colors.reset}`);
    const jsonData = fs.readFileSync('./canciones.json', 'utf8');
    const canciones = JSON.parse(jsonData);
    
    console.log(`${colors.blue}📊 Encontradas ${canciones.length} canciones en el archivo JSON${colors.reset}`);

    // Obtener colección
    const collection = db.collection(collectionName);

    // Limpiar colección existente (opcional)
    await collection.deleteMany({});
    console.log(`${colors.yellow}🧹 Colección limpiada${colors.reset}`);

    // Preparar datos para MongoDB
    const cancionesMongoDB = canciones.map(cancion => ({
      ...cancion,
      _id: undefined, // Dejar que MongoDB genere el _id
      fecha_agregada: new Date(cancion.fecha_agregada),
      metadata: {
        migrado_en: new Date(),
        fuente: 'JSON',
        version: '1.0'
      }
    }));

    // Insertar documentos
    const resultado = await collection.insertMany(cancionesMongoDB);
    
    console.log(`${colors.green}🎉 Migración completada exitosamente!${colors.reset}`);
    console.log(`${colors.blue}📊 Documentos insertados: ${resultado.insertedCount}${colors.reset}`);

    // Verificación
    const totalDocumentos = await collection.countDocuments();
    console.log(`${colors.green}✅ Total de documentos en la colección: ${totalDocumentos}${colors.reset}`);

    // Mostrar algunos ejemplos
    console.log(`${colors.yellow}\n📋 Ejemplos de documentos migrados:${colors.reset}`);
    const ejemplos = await collection.find().limit(3).toArray();
    ejemplos.forEach((doc, index) => {
      console.log(`${colors.blue}${index + 1}. ${doc.titulo} - ${doc.artista}${colors.reset}`);
    });

    // Crear índices básicos
    await collection.createIndex({ artista: 1 });
    await collection.createIndex({ genero: 1 });
    await collection.createIndex({ año: 1 });
    console.log(`${colors.green}🔍 Índices creados para optimizar consultas${colors.reset}`);

  } catch (error) {
    console.error(`${colors.red}❌ Error durante la migración:${colors.reset}`, error);
  } finally {
    await client.close();
    console.log(`${colors.blue}🔌 Conexión cerrada${colors.reset}`);
  }
}

// Función para verificar la migración
async function verificarMigracion() {
  const client = new MongoClient(url);
  
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    console.log(`${colors.green}\n🔍 VERIFICACIÓN DE MIGRACIÓN${colors.reset}`);
    
    // Estadísticas básicas
    const total = await collection.countDocuments();
    const favoritos = await collection.countDocuments({ favorito: true });
    const generos = await collection.distinct('genero');
    
    console.log(`${colors.blue}📊 Total de canciones: ${total}${colors.reset}`);
    console.log(`${colors.blue}⭐ Canciones favoritas: ${favoritos}${colors.reset}`);
    console.log(`${colors.blue}🎵 Géneros disponibles: ${generos.join(', ')}${colors.reset}`);

    // Consulta de ejemplo
    const cancionMasReproducida = await collection.findOne(
      {}, 
      { sort: { reproducciones: -1 } }
    );
    
    if (cancionMasReproducida) {
      console.log(`${colors.yellow}🏆 Canción más reproducida: ${cancionMasReproducida.titulo} - ${cancionMasReproducida.reproducciones.toLocaleString()} reproducciones${colors.reset}`);
    }

  } catch (error) {
    console.error(`${colors.red}❌ Error durante la verificación:${colors.reset}`, error);
  } finally {
    await client.close();
  }
}

// Ejecutar si el archivo se ejecuta directamente
if (require.main === module) {
  console.log(`${colors.green}🍃 SCRIPT DE MIGRACIÓN - JSON A MONGODB 🍃${colors.reset}\n`);
  
  migrarCancionesJson()
    .then(() => verificarMigracion())
    .then(() => {
      console.log(`${colors.green}\n🎉 ¡Migración completada! Ahora puedes usar MongoDB Compass o el shell para explorar tus datos.${colors.reset}`);
    })
    .catch(error => {
      console.error(`${colors.red}❌ Error fatal:${colors.reset}`, error);
    });
}

module.exports = {
  migrarCancionesJson,
  verificarMigracion
};
