import express from "express";
import cors from "cors";
import helmet from "helmet";

const app = express(); //Función de HTTP
const PORT = 3000; //Puerto
app.use(cors()); //CORS seguridad
app.use(helmet()); // Añade cabeceras

//Añade urls
app.get("/", (req,res)=>{
    res.send("Hola desde Express");
});
//Nueva url
app.get("/info", (req,res)=>{
    res.json({
        //Esto es un objeto
        nombre:"Luis Gómez",
        curso :"Desarrollo Web con Express",
        año:2025
    });
});

app.listen(PORT, ()=>{
    console.log(`Servidor Express en http://localhost:${PORT}`);
});