import path from "node:path";

const rutaArchivo = path.join('.', 'api', 'path.txt');

console.log('La ruta relativa del archivo es: ', rutaArchivo);

const rutaAbsoluta = path.resolve(rutaArchivo);

console.log(rutaAbsoluta);
