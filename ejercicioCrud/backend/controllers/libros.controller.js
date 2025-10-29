// controllers/libros.controller.js
import { leerLibros, guardarLibros, eliminarLibroPorId } from "../models/libros.model.js";

// La función de controlador debe ser ASÍNCRONA si el modelo lo es
// -----------------------------------------------------------------

/** GET /libros */
export async function getAll(req, res) {
  try {
    const libros = await leerLibros();
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los libros." });
  }
}

/** GET /libros/:id */
export async function getOne(req, res) {
  const id = Number(req.params.id);
  const libros = await leerLibros();
  const libro = libros.find(l => l.id === id);
  
  if (!libro) return res.status(404).json({ error: "Libro no encontrado" });
  res.json(libro);
}

/** POST /libros */
export async function create(req, res) {
  const { titulo, autor, anio } = req.body;
  
  // Validación más concisa
  if (!titulo || !autor) {
    return res.status(400).json({ error: "Los campos 'titulo' y 'autor' son obligatorios" });
  }

  const libros = await leerLibros();
  
  // Cálculo del ID simplificado (usando el operador de encadenamiento nulo '?.' si está disponible)
  const maxId = libros?.length ? Math.max(...libros.map(l => l.id ?? 0)) : 0;
  const id = maxId + 1;
  
  const nuevo = { id, titulo, autor, anio: Number(anio) || null };

  libros.push(nuevo);
  await guardarLibros(libros); // Esperar que se guarde
  
  res.status(201).json(nuevo);
}



/** DELETE /libros/:id */
export async function remove(req, res) {
    const id = Number(req.params.id);

    // Delegamos la lógica de buscar, eliminar y guardar al modelo
    const eliminado = await eliminarLibroPorId(id); 

    if (!eliminado) {
        return res.status(404).json({ error: "Libro no encontrado" });
    }

    // La función del modelo ya guardó los cambios; solo respondemos al cliente
    res.json({ ok: true, mensaje: `Libro con ID ${id} eliminado con éxito` });
}