import fs from 'node:fs';

fs.readFile('./NODEJS/ficherocreado.txt', 'utf8',(err, dato) =>{
        if(err){
            console.error('X error al leer el archivo', err);
            return;
        }
        console.log('Contenido de archivos: \n');
        console.log(dato);
    });
