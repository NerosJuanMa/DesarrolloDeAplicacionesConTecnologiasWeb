// Importar el módulo nativo fs (File System)
import fs from 'node:fs';

// Contenido que queremos escribir dentro del archivo
const contenido = 'Hola 👋, este archivo fue creado con Node.js usando el módulo fs.';

// Crear un nuevo archivo en la misma ruta
fs.writeFile('nuevo.txt', contenido, 'utf8', (err) => {
  if (err) {
    console.error('❌ Error al crear el archivo:', err);
    return;
  }

  console.log('✅ Archivo "nuevo.txt" creado correctamente en la misma carpeta.');
});
