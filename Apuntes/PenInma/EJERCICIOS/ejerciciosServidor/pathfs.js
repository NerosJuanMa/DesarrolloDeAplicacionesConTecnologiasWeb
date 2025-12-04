// Importamos los módulos nativos
import fs from 'node:fs';
import path from 'node:path';

// 1️⃣ Construimos la ruta del archivo donde escribiremos
const rutaArchivo = path.join('api', 'path.txt');

// 2️⃣ Texto que queremos escribir (lo crea o sobrescribe)
const contenido = 'hola soy el texto nuevo que has creado otra vez';

// 3️⃣ Escribimos en el archivo (si no existe, lo crea)
fs.writeFile(rutaArchivo, contenido, 'utf8', (err) => {
  if (err) {
    console.error('❌ Error al escribir el archivo:', err);
    return;
  }

  console.log('✅ Archivo creado o sobrescrito correctamente.');

  // 4️⃣ Texto nuevo que queremos añadir cuando termine la escritura por eso esta dentro del callback de writeFile
  const textoNuevo = '\nHola 👋 soy el texto nuevo que has añadido al archivo.';

  // 5️⃣ Añadimos el texto SIN sobrescribir lo anterior
  fs.appendFile(rutaArchivo, textoNuevo, 'utf8', (err) => {
    if (err) {
      console.error('❌ Error al añadir texto:', err);
      return;
    }

    console.log(`📝 Texto añadido correctamente en: ${rutaArchivo}`);
  });
});
