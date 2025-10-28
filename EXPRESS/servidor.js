// servidor.js
import express from 'express';
import cors from "cors";
import helmet from "helmet";

const app = express();
const PORT = 3000;
app.use ( cors ()); //permitimos todos los origenes y todos los métodos
app.use(helmet());

app.get('/', (req, res) => {
    res.send("🎉 ¡Hola mundo desde Express!");
});

app.listen(PORT, () => {
    console.log("✅ Servidor escuchando en http://localhost:3000")
})

// Ruta "/info" 

app.get("/info", (req, res) => {
    res.json({ 
        nombre: "Luis Gómez", 
        curso: "Desarrollo Web con Express", 
        año: 2025 });
});


app.get((req, res) =>{
    res.status(404).send("404 - Página no encontrada");
});
