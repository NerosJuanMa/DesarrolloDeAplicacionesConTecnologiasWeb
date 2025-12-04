import fs from 'node:fs';

// Leer el archivo correcto (datos.txt)
fs.readFile('datos.txt', 'utf8', (err, datos) => {
  if (err) {
    console.error('❌ Error al leer el archivo:', err);
    return;
  }

  console.log('📄 Contenido del archivo:\n');
  console.log(datos);
});
