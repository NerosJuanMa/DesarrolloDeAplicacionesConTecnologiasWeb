// servidor.js
import express from "express";

const app = express();

// Ruta principal
app.get("/", (req, res) => {
  res.send("🎉 ¡Hola mundo desde Express!");
});
app.get("/contacto", (req, res) => {
  res.send("Esta es la página de Contacto.");

  app.use((req, res) => {
    res.status(404).send("404 - Página no encontrada");
  });   
});
// Iniciar servidor
app.listen(3000, () => {
  console.log("✅ Servidor escuchando en http://localhost:3000");
});
