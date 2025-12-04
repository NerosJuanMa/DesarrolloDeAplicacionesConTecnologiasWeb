// controllers/libros.controller.js
import { leerLibros, guardarLibros } from "../models/libros.model.js";

// GET /libros - Obtener todos los libros
export async function getAll(req, res) {
  try {
    const libros = await leerLibros();
    res.json(libros);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los libros" });
  }
}

// GET /libros/:id - Obtener un libro por ID
export async function getOne(req, res) {
  try {
    const id = Number(req.params.id);
    const libros = await leerLibros();
    const libro = libros.find(l => l.id === id);
    
    if (!libro) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }
    res.json(libro);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el libro" });
  }
}

// POST /libros - Crear un nuevo libro
export async function create(req, res) {
  try {
    const { titulo, autor, anio } = req.body;
    
    if (!titulo || !autor) {
      return res.status(400).json({ error: "Título y autor son obligatorios" });
    }

    const libros = await leerLibros();
    const maxId = libros.length > 0 ? Math.max(...libros.map(l => l.id)) : 0;
    
    const nuevoLibro = {
      id: maxId + 1,
      titulo,
      autor,
      anio: anio ? Number(anio) : null
    };

    libros.push(nuevoLibro);
    await guardarLibros(libros);
    
    res.status(201).json(nuevoLibro);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el libro" });
  }
}

// PUT /libros/:id - Actualizar un libro
export async function update(req, res) {
  try {
    const id = Number(req.params.id);
    const { titulo, autor, anio } = req.body;
    
    if (!titulo || !autor) {
      return res.status(400).json({ error: "Título y autor son obligatorios" });
    }

    const libros = await leerLibros();
    const indice = libros.findIndex(l => l.id === id);
    
    if (indice === -1) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    libros[indice] = {
      id,
      titulo,
      autor,
      anio: anio ? Number(anio) : null
    };

    await guardarLibros(libros);
    res.json(libros[indice]);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el libro" });
  }
}

// DELETE /libros/:id - Eliminar un libro
export async function remove(req, res) {
  try {
    const id = Number(req.params.id);
    const libros = await leerLibros();
    const indice = libros.findIndex(l => l.id === id);
    
    if (indice === -1) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    libros.splice(indice, 1);
    await guardarLibros(libros);
    
    res.json({ message: `Libro con ID ${id} eliminado correctamente` });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el libro" });
  }
}