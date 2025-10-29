import express from "express";
import cors from "cors";

const app = express();
const PORT = 3000;
app.use(cors());


app.get("/",(req,res)=>{
    res.send("Bienvenido al servidor Express");
});

app.get("/info",(req,res)=>{
    res.json({
        nombre:"Roberto",
        curso:"Desarrollo Web con Express",
        fecha:2025,
    });
});
app.get("/contacto", (req,res)=>{
    res.send('<h1>Esta es la página de contacto</h1><p>Puedes contactarnos en <a href=mailto:contacto@ejemplo.com">contacto@ejemplo.com</a></p>');
});
app.get("/tienda",(req,res)=>{
    res.send("Bienvenido a la tienda");
});

app.use((req,res)=>{
    res.status(404).send("404-Página no encontrada");
});

app.listen(PORT,()=>{
    console.log(`Servidor Express en http://localhost:${PORT}`);
});