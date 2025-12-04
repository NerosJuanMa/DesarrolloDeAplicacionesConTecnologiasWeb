// backend/servidor.js
import express from "express";
import cors from "cors";
import { promises as fs } from "node:fs";
import path from "node:path";

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Ruta absoluta al archivo JSON
const DATA_PATH = path.resolve("backend/data/libros.json");

// Helpers de lectura/escritura
async function leerLibros() {
  try {
    const text = await fs.readFile(DATA_PATH, "utf-8");
    return JSON.parse(text);
  } catch (err) {
    if (err.code === "ENOENT") return []; // si no existe, devolvemos lista vacía
    throw err;
  }
}

async function escribirLibros(libros) {
  const text = JSON.stringify(libros, null, 2);
  // Escritura “atómica” simple: writeFile directamente
  await fs.writeFile(DATA_PATH, text, "utf-8");
}

// Generar id incremental (seguro mientras sea un único proceso)
function nextId(libros) {
  const max = libros.reduce((m, l) => Math.max(m, l.id ?? 0), 0);
  return max + 1;
}

// ================== RUTAS API ==================

// GET /api/libros  → lista todos
app.get("/api/libros", async (req, res) => {
  const libros = await leerLibros();
  res.json(libros);
});

// GET /api/libros/:id → uno por id
app.get("/api/libros/:id", async (req, res) => {
  const id = Number(req.params.id);
  const libros = await leerLibros();
  const libro = libros.find(l => l.id === id);
  if (!libro) return res.status(404).json({ error: "Libro no encontrado" });
  res.json(libro);
});

// POST /api/libros → crea uno {titulo, autor, anio}
app.post("/api/libros", async (req, res) => {
  const { titulo, autor, anio } = req.body || {};
  if (!titulo || !autor) {
    return res.status(400).json({ error: "Faltan campos obligatorios: titulo, autor" });
  }
  const libros = await leerLibros();
  const nuevo = {
    id: nextId(libros),
    titulo: String(titulo).trim(),
    autor: String(autor).trim(),
    anio: anio ? Number(anio) : null,
  };
  libros.push(nuevo);
  await escribirLibros(libros);
  res.status(201).json(nuevo);
});

// PUT /api/libros/:id → modifica
app.put("/api/libros/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { titulo, autor, anio } = req.body || {};
  const libros = await leerLibros();
  const idx = libros.findIndex(l => l.id === id);
  if (idx === -1) return res.status(404).json({ error: "Libro no encontrado" });

  // validaciones básicas
  if (titulo !== undefined && !String(titulo).trim()) {
    return res.status(400).json({ error: "El titulo no puede estar vacío" });
  }
  if (autor !== undefined && !String(autor).trim()) {
    return res.status(400).json({ error: "El autor no puede estar vacío" });
  }

  const actualizado = {
    ...libros[idx],
    ...(titulo !== undefined ? { titulo: String(titulo).trim() } : {}),
    ...(autor  !== undefined ? { autor:  String(autor).trim() }  : {}),
    ...(anio   !== undefined ? { anio:   anio ? Number(anio) : null } : {}),
  };
  libros[idx] = actualizado;
  await escribirLibros(libros);
  res.json(actualizado);
});

// DELETE /api/libros/:id → borra
app.delete("/api/libros/:id", async (req, res) => {
  const id = Number(req.params.id);
  const libros = await leerLibros();
  const existe = libros.some(l => l.id === id);
  if (!existe) return res.status(404).json({ error: "Libro no encontrado" });

  const filtrados = libros.filter(l => l.id !== id);
  await escribirLibros(filtrados);
  res.status(204).end();
});

// ================== ARRANQUE ==================
app.listen(PORT, () => {
  console.log(`✅ API de Libros escuchando en http://localhost:${PORT}`);
});
