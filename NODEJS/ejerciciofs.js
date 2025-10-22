import fs from 'node:fs';

fs.readFile('datos.txt', 'utf8',(err, datos) =>{
    if(err){
        console.error('X error al leer el archivo', err);
        return;
    }
    console.log('Contenido de archivos: \n');
    console.log(datos);
});

