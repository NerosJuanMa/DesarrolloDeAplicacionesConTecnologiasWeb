// importamos modulos para lectura de archivos
import { readFile, writeFile } from "fs/promises"; 
//importamos las rutas
import path from "path";
import { fileURLToPath } from "url";

//decirle a nuestro archivo modelo donde encuentra los datos 
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RUTA_ARCHIVO = path.join(__dirname, "..,data,libros.json");

// Leer libros del archivo JSON
export async function leerLibros() {
  try {
    const texto = await readFile(RUTA_ARCHIVO, "utf8");
    return JSON.parse(texto);
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

// Guardar libros en el archivo JSON
export async function guardarLibros(libros) {
  const texto = JSON.stringify(libros, null, 2);
  await writeFile(RUTA_ARCHIVO, texto, "utf8");
}