import Producto from "../models/producto.js";

class ProductosController {

  // GET /api/productos - Listar todos
  async listarProductos(req, res) {
    try {
      const productos = await Producto.find();
      res.json({ status: 'ok', data: productos });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Error al listar productos' });
    }
  }

  // GET /api/productos/:id - Obtener uno
  async obtenerProducto(req, res) {
    try {
      const producto = await Producto.findById(req.params.id);
      if (!producto) {
        return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
      }
      res.json({ status: 'ok', data: producto });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Error al obtener producto' });
    }
  }

  // POST /api/productos - Crear
  async crearProducto(req, res) {
    try {
      const doc = await Producto.create(req.body);
      res.status(201)
        .location(`/api/productos/${doc._id}`)
        .json({ status: 'ok', data: doc });
    } catch (error) {
      console.error(error);
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  // PUT /api/productos/:id - Actualizar completo
  async reemplazarProducto(req, res) {
    try {
      const producto = await Producto.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!producto) {
        return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
      }
      res.json({ status: 'ok', data: producto });
    } catch (error) {
      console.error(error);
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  // PATCH /api/productos/:id - Actualizar parcial
  async actualizarProducto(req, res) {
    try {
      const producto = await Producto.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!producto) {
        return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
      }
      res.json({ status: 'ok', data: producto });
    } catch (error) {
      console.error(error);
      res.status(400).json({ status: 'error', message: error.message });
    }
  }

  // DELETE /api/productos/:id - Eliminar
  async eliminarProducto(req, res) {
    try {
      const producto = await Producto.findByIdAndDelete(req.params.id);
      if (!producto) {
        return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
      }
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'Error al eliminar producto' });
    }
  }
}

export default new ProductosController();
