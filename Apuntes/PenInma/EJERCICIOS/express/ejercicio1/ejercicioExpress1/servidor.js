// servidor.js
import express from "express";  // Importamos el módulo Express
import cors from "cors";

const app = express();          // Creamos la aplicación (servidor)
app.use(cors());//permitimos todos los origenes y todos los métodos
const port = 3000;


// Ruta principal "/"
app.get("/", (req, res) => {
  res.send("Otro servidor Express 👋");
});

// Ruta "/info"
app.get("/info", (req, res) => {
  res.json({
    nombre: "Luis Gómez",
    curso: "Desarrollo Web con Express",
    año: 2025
  });
});
//nueva ruta declarada con función desarrollada
app.get("/contacto", (req, res) => {
  res.send("<h3>Esta es la página de Contacto.</h3>"
    + "<p>Puedes contactarnos a través de <a href='mailto:contacto@ejemplo.com'>contacto@ejemplo.com</a>.</p>"
  );

});
//nuevas rutas desarrolladas con funciones flechas 
app.get("/", (req, res) => res.send("Inicio 🏠"));
app.get("/tienda", (req, res) => res.send("Bienvenido a la tienda 🛍️"));
app.use((req, res) => res.status(404).send("❌ Ruta no encontrada"));

// Manejo de rutas no definidas (404) que devuelve un mensaje HTML
app.use((req, res) => {
  res.status(404).send(`
    <h1>❌ Error 404</h1>
    <p>La página que buscas no existe.</p>
    
  `);
});


// Iniciar el servidor en el puerto 3000 que es el declarado arriba
app.listen(port, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${port}`);
});
