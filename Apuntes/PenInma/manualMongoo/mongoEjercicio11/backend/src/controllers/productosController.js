// src/controllers/productosController.js
import Producto from "../models/Producto.js";

class ProductosController {

  

  // -------------------------------------------
  // GET /api/productos/:id  → obtener por id
  // -------------------------------------------

async obtenerProducto(req, res) {
  try {
    const { id } = req.params;                 // 1) Capturamos el id de la URL
    const producto = await Producto.findById(id); // 2) Buscamos en MongoDB por _id

    if (!producto) {                           // 3) Si no existe → 404
      return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
    }

    res.json({ status: 'ok', data: producto }); // 4) Si existe → 200 + datos
  } catch (error) {
    if (error.name === 'CastError') {          // 5) id con formato inválido → 400
      return res.status(400).json({ status: 'error', message: 'ID inválido' });
    }
    console.error(error);                      // 6) Cualquier otro fallo → 500
    res.status(500).json({ status: 'error', message: 'Error en obtenerProducto' });
  }
}
  // -------------------------------------------
  // GET /api/productos  → listar con filtros, paginación y orden; si no se le ponen filtros los devuelve todos
  // -------------------------------------------

async listarProductos(req, res) {
  try {
    // 1) Leemos parámetros opcionales de la URL
    const { q, activo, minPrecio, maxPrecio, page = 1, limit = 10, sort } = req.query;

    // 2) Construimos el filtro dinámico
    const filter = {};
    if (q) filter.nombre = { $regex: q, $options: 'i' };   // 'i' → ignora may/min
    if (activo !== undefined) filter.activo = (activo === 'true');
    if (minPrecio || maxPrecio) {
      filter.precio = {};
      if (minPrecio) filter.precio.$gte = Number(minPrecio); // ≥
      if (maxPrecio) filter.precio.$lte = Number(maxPrecio); // ≤
    }

    // 3) Calculamos paginación
    const skip = (Number(page) - 1) * Number(limit);

    // 4) Calculamos orden
    //    p.ej. sort="-precio,nombre" → { precio:-1, nombre:1 }
    const order = sort
      ? sort.split(',').reduce((acc, field) => {
          const f = field.trim();
          acc[f.replace('-', '')] = f.startsWith('-') ? -1 : 1;
          return acc;
        }, {})
      : { createdAt: -1 };

    // 5) Consultamos datos y total en paralelo (más rápido)
    const [items, total] = await Promise.all([
      Producto.find(filter).sort(order).skip(skip).limit(Number(limit)),
      Producto.countDocuments(filter)
    ]);

    // 6) Respondemos con datos + metadatos de paginación
    res.json({
      status: 'ok',
      meta: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      },
      data: items
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error en listarProductos' });
  }
}

// src/controllers/productosController.js
async buscarPorCampos(req, res) {
  try {
    const { nombre, activo } = req.query;
    const filter = {};
    if (nombre) filter.nombre = { $regex: nombre, $options: "i" };
    if (activo !== undefined) filter.activo = (activo === "true");

    const resultados = await Producto.find(filter);
    if (resultados.length === 0) {
      return res.status(404).json({ status: "error", message: "No se encontraron productos" });
    }
    res.json({ status: "ok", total: resultados.length, data: resultados });
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: "error", message: "Error en buscarPorCampos" });
  }
}

  // -------------------------------------------
  // POST /api/productos  → crear
  // -------------------------------------------
  async crearProducto(req, res) {
    try {
      const { nombre, precio } = req.body;
      if (!nombre || precio === undefined) {
        return res.status(400).json({ status: "error", message: 'Los campos "nombre" y "precio" son obligatorios' });
      }
      const doc = await Producto.create(req.body);
      res.status(201).location(`/api/productos/${doc._id}`).json({ status: "ok", data: doc });
    } catch (e) {
      if (e.name === "ValidationError") {
        return res.status(400).json({ status: "error", message: e.message });
      }
      if (e.code === 11000) {
        return res.status(409).json({ status: "error", message: "Duplicado: ya existe un producto con ese valor único" });
      }
      console.error(e);
      res.status(500).json({ status: "error", message: "Error en crearProducto" });
    }
  }

  // -------------------------------------------
  // PUT /api/productos/:id  → reemplazo completo
  // Requiere TODOS los campos esperados del esquema
  // Usa overwrite:true para comportamiento PUT clásico.
  // -------------------------------------------
  async reemplazarProducto(req, res) { // PUT
    try {
      const { id } = req.params;
      // Validación mínima de presencia (ajusta si añades más campos al schema)
      const { nombre, precio, stock, activo } = req.body;
      if (
        nombre === undefined ||
        precio === undefined ||
        stock === undefined ||
        activo === undefined
      ) {
        return res.status(400).json({
          status: "error",
          message: 'PUT requiere "nombre", "precio", "stock" y "activo"',
        });
      }

      const doc = await Producto.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        overwrite: true, // reemplazo total del documento
      });

      if (!doc) return res.status(404).json({ status: "error", message: "Producto no encontrado" });
      res.json({ status: "ok", data: doc });
    } catch (e) {
      if (e.name === "ValidationError") return res.status(400).json({ status: "error", message: e.message });
      if (e.name === "CastError") return res.status(400).json({ status: "error", message: "ID inválido" });
      console.error(e);
      res.status(500).json({ status: "error", message: "Error en reemplazarProducto" });
    }
  }

  // -------------------------------------------
  // PATCH /api/productos/:id  → actualización parcial
  // -------------------------------------------
  async actualizarProducto(req, res) { // PATCH
    try {
      const { id } = req.params;
      const doc = await Producto.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!doc) return res.status(404).json({ status: "error", message: "Producto no encontrado" });
      res.json({ status: "ok", data: doc });
    } catch (e) {
      if (e.name === "ValidationError") return res.status(400).json({ status: "error", message: e.message });
      if (e.name === "CastError") return res.status(400).json({ status: "error", message: "ID inválido" });
      console.error(e);
      res.status(500).json({ status: "error", message: "Error en actualizarProducto" });
    }
  }

  // -------------------------------------------
  // DELETE /api/productos/:id  → eliminar
  // -------------------------------------------
  async eliminarProducto(req, res) {
    try {
      const { id } = req.params;
      const doc = await Producto.findByIdAndDelete(id);
      if (!doc) return res.status(404).json({ status: "error", message: "Producto no encontrado" });
      res.status(204).send();
    } catch (e) {
      if (e.name === "CastError") return res.status(400).json({ status: "error", message: "ID inválido" });
      console.error(e);
      res.status(500).json({ status: "error", message: "Error en eliminarProducto" });
    }
  }
}

export default new ProductosController();
