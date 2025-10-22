import fs from 'node:fs';

fs.writeFile('./NODEJS/ficherocreado.txt', 'Hello este es el texto dentro del fichero que estoy leyendo', 'utf-8',(err) => {
  if (err) throw err;
  console.log('el fichero se ha creado');
});
        
