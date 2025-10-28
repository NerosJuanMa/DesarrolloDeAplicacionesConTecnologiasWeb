// servidor.js
import express from 'express';
import cors from "cors";
import helmet from "helmet";
const app = express();
const PORT = 3000;

app.use(cors());
app.get('/', (req,res) =>{
    res.send('“Inicio 🏠” o “Bienvenido al servidor Express 👋”')
});

app.get('/info', (req,res) =>{
    res.json({ 
        nombre: "JuanMa Mudarra", 
        curso: "Desarrollo Web con Express", 
        año: 2025 })
});

app.get('/contacto', (req,res) =>{
    res.send('<h1>CONTACTO</h1> <br> <p>Puedes contactarnos en <a href="mailto:contacto@ejemplo.com">contacto@ejemplo.com</a></p>')
});

app.get('/tienda', (req,res) =>{
    res.send("“Bienvenido a la tienda 🛍️”")
});

// app.use((err,req, res, next) =>{
//     res.send("❌ Error 404. - Página no encontrada");
//     res.status(404).json({ error: '“❌ Error 404”. - Página no encontrada' });
// });

// app.use((err, req, res, next) => {
//   console.error('💥 Error:', err);
//   res.status(404).json({ error: '“❌ Error 404”. - Página no encontrada' });
app.get((req, res) =>{
    res.status(404).send("404 - Página no encontrada");
});

app.listen(PORT,() => {
    console.log("✅ Servidor escuchando en http://localhost:3000")
});