
import fs from 'node:fs';

fs.copyFile('./nodejs/ficherocreado.txt', './ficherocreado.txt', err => {
  if(err){
            console.error('X error al leer el archivo', err);
            return;
        }
  console.log(' Archivo  movido');}
);

// RENOMBRAR es igual pero hay que cambiarle el nombre al archivo de destino.
// fs.copyFile('./nodejs/ficherocreado.txt', './ficherocreado2.txt', err => {
//   if (err) throw err;
//   console.log('ERROR, Archivo no movido');}
// );