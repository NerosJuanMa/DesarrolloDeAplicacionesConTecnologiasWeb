// Importamos el módulo nativo 'path'
import path from 'node:path';

//  Unimos carpetas y archivo con path.join()
// Esto crea una ruta válida en cualquier sistema operativo
const rutaArchivo = path.join('api', 'path.txt');

console.log('🧩 Ruta relativa unida:', rutaArchivo);

// i queremos la ruta ABSOLUTA (completa)
const rutaAbsoluta = path.resolve('api', 'path.txt');

console.log('📍 Ruta absoluta:', rutaAbsoluta);
