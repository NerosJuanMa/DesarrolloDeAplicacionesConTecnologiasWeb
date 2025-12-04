// server.js
import express from "express";
import mongoose from "mongoose";
import Alumno from "./models/Producto.js";

const app = express();
app.use(express.json());

// Conexión
await mongoose.connect(process.env.MONGO_URI, {
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
});
console.log("✅ Conectado a MongoDB Atlas");

// Ruta de salud
app.get("/", (req, res) => res.json({ ok: true }));

// 👉 CREATE: insertar un alumno
app.post("/alumnos", async (req, res) => {
  try {
    const { nombre, edad, curso, ciudad, activo } = req.body;

    // validación mínima “didáctica”
    if (!nombre || typeof nombre !== "string") {
      return res.status(400).json({ error: "El campo 'nombre' es obligatorio (string)." });
    }

    const nuevo = await Alumno.create({ nombre, edad, curso, ciudad, activo });
    res.status(201).json(nuevo);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "No se pudo crear el alumno", detalle: err.message });
  }
});

// (opcional) listar para comprobar que se insertó:
app.get("/alumnos", async (_req, res) => {
  const todos = await Alumno.find().lean();
  res.json(todos);
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 http://localhost:${PORT}`));
