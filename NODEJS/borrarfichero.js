import fs from 'node:fs';

fs.unlinkSync("./nodejs/ficherocreado.txt");



// fs.unlink('./nodejs/ficherocreado.txt', (err) => {
//   if (err) throw err;
//   console.log('Archivo eliminado');
// });