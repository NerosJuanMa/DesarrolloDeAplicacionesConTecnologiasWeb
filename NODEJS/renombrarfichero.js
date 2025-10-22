// RENOMBRAR es igual que mover, pero hay que cambiarle el nombre al archivo de destino.
import fs from 'node:fs';

fs.copyFile('./nodejs/ficherocreado.txt', './nodejs/ficherocreado2.txt', err => {
  if(err){
            console.error('X error archivo no copiado', err);
            return;
        }
  console.log('Archivo copiado');}
);