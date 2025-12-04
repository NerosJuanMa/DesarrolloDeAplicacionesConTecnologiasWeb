// promises.js
import { readFile } from "fs/promises";

readFile("datos.txt", "utf8")
  .then((contenido) => {
    console.log("Contenido del archivo:");
    console.log(contenido);
  })
  .catch((error) => {
    console.error("Error al leer el archivo:", error.message);
  });
