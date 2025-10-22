import fs from 'node:fs';

fs.readFile('./NODEJS/datos.txt', 'utf8',(errrx, RESPUESTA) =>{
    if(errrx){
        console.error('X error al leer el archivo', errrx);
        return;
    }
    console.log('Contenido de archivos: \n');
    console.log(RESPUESTA);
});

  