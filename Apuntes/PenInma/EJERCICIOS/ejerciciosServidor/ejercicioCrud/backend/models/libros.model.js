// models/libros.model.js
// ✅ Modelo: se encarga de leer y escribir el archivo JSON donde guardamos los libros.

import { readFile, writeFile } from "fs/promises"; 
import path from "path";
import { fileURLToPath } from "url";

// 1. Obtención de la ruta absoluta del archivo libros.json
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RUTA_ARCHIVO = path.join(__dirname, "..", "data", "libros.json");

/**
 * 📖 Lee la lista de libros del archivo JSON.
 * Si el archivo no existe, devuelve un array vacío.
 * @returns {Promise<Array>} Un array de objetos libro.
 */
export async function leerLibros() {
  try {
    const texto = await readFile(RUTA_ARCHIVO, { encoding: "utf8" });
    return JSON.parse(texto);
  } catch (error) {
    // Si el archivo no existe (ENOENT), devolvemos una lista vacía.
    if (error.code === "ENOENT") {
      return [];
    }
    // Para otros errores (JSON roto, etc.), re-lanzamos el error.
    throw error;
  }
}

/**
 * 💾 Guarda la lista de libros en el archivo JSON.
 * @param {Array} listaDeLibros - El array de libros a guardar.
 * @returns {Promise<void>}
 */
export async function guardarLibros(listaDeLibros) {
  // JSON.stringify convierte el array en texto con sangría (formato "bonito")
  const texto = JSON.stringify(listaDeLibros, null, 2);
  
  // Escribimos el archivo con el contenido actualizado
  await writeFile(RUTA_ARCHIVO, texto, { encoding: "utf8" });
}

/**
 * ❌ Elimina un libro por su ID.
 * @param {number} id - El ID del libro a eliminar.
 * @returns {Promise<boolean>} True si el libro fue eliminado, false si no se encontró.
 */
export async function eliminarLibroPorId(id) {
    // 1. Leer la lista completa
    const libros = await leerLibros();
    const idNumerico = Number(id); // Asegurar que sea número
    
    // 2. Encontrar el índice del libro a eliminar
    const indice = libros.findIndex(libro => libro.id === idNumerico);

    if (indice === -1) {
        return false; // El libro no existe
    }

    // 3. Eliminar el libro del array
    libros.splice(indice, 1);
    
    // 4. Guardar la lista modificada
    await guardarLibros(libros);
    return true; // Éxito: el libro fue eliminado y el archivo se actualizó
}