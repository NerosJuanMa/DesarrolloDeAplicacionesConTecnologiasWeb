// backend/servidor.js
import express from "express";
import cors from "cors";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const PORT = 3001; // 👈 usa 3001 para evitar colisiones

// ── Rutas robustas basadas en ESTE archivo, no en el cwd ──
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);
const DATA_DIR   = path.join(__dirname, "data");
const DATA_PATH  = path.join(DATA_DIR, "libros.json");

// ── Middlewares ──
app.use(cors());//permitimos todos los origenes y todos los métodos

app.use(express.json());

// Identificador + log
app.use((req, res, next) => {
  res.setHeader("X-App", "libros-crud");
  console.log(`${req.method} ${req.url}`);
  next();
});

// ── Asegurar carpeta/archivo ──
async function ensureDataFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DATA_PATH);
  } catch {
    await fs.writeFile(DATA_PATH, "[]", "utf-8");
  }
}
await ensureDataFile();

// ── Helpers ──
async function leerLibros() {
  const text = await fs.readFile(DATA_PATH, "utf-8");
  return JSON.parse(text);
}
async function escribirLibros(libros) {
  await fs.mkdir(DATA_DIR, { recursive: true }); // por si acaso
  const text = JSON.stringify(libros, null, 2);
  await fs.writeFile(DATA_PATH, text, "utf-8");
}
function nextId(libros) {
  return libros.reduce((m, l) => Math.max(m, l.id ?? 0), 0) + 1;
}

// ── Rutas API ──
app.get("/api/libros", async (_req, res, next) => {
  try {
    const libros = await leerLibros();
    res.json(libros);
  } catch (e) { next(e); }
});

app.get("/api/libros/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const libros = await leerLibros();
    const libro = libros.find(l => l.id === id);
    if (!libro) return res.status(404).json({ error: "Libro no encontrado" });
    res.json(libro);
  } catch (e) { next(e); }
});

app.post("/api/libros", async (req, res, next) => {
  try {
    const { titulo, autor, anio } = req.body || {};
    if (!titulo || !autor) {
      return res.status(400).json({ error: "Faltan campos: titulo, autor" });
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
  } catch (e) { next(e); }
});

app.put("/api/libros/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { titulo, autor, anio } = req.body || {};
    const libros = await leerLibros();
    const idx = libros.findIndex(l => l.id === id);
    if (idx === -1) return res.status(404).json({ error: "Libro no encontrado" });

    if (titulo !== undefined && !String(titulo).trim())
      return res.status(400).json({ error: "El titulo no puede estar vacío" });
    if (autor !== undefined && !String(autor).trim())
      return res.status(400).json({ error: "El autor no puede estar vacío" });

    const actualizado = {
      ...libros[idx],
      ...(titulo !== undefined ? { titulo: String(titulo).trim() } : {}),
      ...(autor  !== undefined ? { autor:  String(autor).trim() }  : {}),
      ...(anio   !== undefined ? { anio:   anio ? Number(anio) : null } : {}),
    };
    libros[idx] = actualizado;
    await escribirLibros(libros);
    res.json(actualizado);
  } catch (e) { next(e); }
});

app.delete("/api/libros/:id", async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const libros = await leerLibros();
    if (!libros.some(l => l.id === id))
      return res.status(404).json({ error: "Libro no encontrado" });
    await escribirLibros(libros.filter(l => l.id !== id));
    res.status(204).end();
  } catch (e) { next(e); }
});

// Salud
app.get("/__health", (_req, res) => {
  res.json({ ok: true, app: "libros-crud", file: DATA_PATH });
});

// 404
app.use((_req, res) => res.status(404).json({ error: "Ruta no encontrada" }));

// Manejador de errores
app.use((err, _req, res, _next) => {
  console.error("💥 Error:", err);
  res.status(500).json({ error: "Error interno", details: err.message });
});

app.listen(PORT, () => {
  console.log(`✅ API de Libros escuchando en http://localhost:${PORT}`);
  console.log("📄 JSON:", DATA_PATH);
});
