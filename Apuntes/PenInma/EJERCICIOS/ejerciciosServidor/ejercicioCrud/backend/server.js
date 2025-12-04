// server.js
import express from "express";
import librosRouter from "./routes/libros.routes.js";
import cors from "cors";      
import morgan from "morgan";  

const app = express();
const PORT = 3000;

// Middlewares globales
app.use(express.json());     // ← parsea JSON entrante a req.body
app.use(cors());
app.use(morgan("dev"));

// Montar rutas MVC
app.use("/api/libros", librosRouter);

// 404
app.use((req, res) => res.status(404).json({ error: "Ruta no encontrada" }));

app.listen(PORT, () => console.log(`📚 API Libros en http://localhost:${PORT}`));
