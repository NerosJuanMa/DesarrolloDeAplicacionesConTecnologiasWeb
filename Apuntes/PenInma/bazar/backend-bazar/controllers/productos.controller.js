// controllers/productos.controller.js
import * as productosModel from '../models/productos.model.js';

/**
 * ==========================================
 * 📦 CONTROLADOR DE PRODUCTOS
 * ==========================================
 * 
 * Funciones para gestión de productos del bazar
 * - Obtener todos los productos
 * - Obtener producto por ID
 */

/**
 * Obtener todos los productos
 */
export async function getProductos(req, res) {
  try {
    console.log('📦 Obteniendo productos...');
    
    const productos = await productosModel.obtenerTodos();
    
    res.status(200).json({
      success: true,
      message: `Se encontraron ${productos.length} productos`,
      data: productos
    });
    
  } catch (error) {
    console.error('❌ Error al obtener productos:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
}
/**
 * Obtener producto por ID necesario para añadir al carrito, para ver detalles, etc.
 */
export async function getProductoById(req, res) {
  try {
    // 1️⃣ Extraemos el parámetro "id" que viene en la URL.
   /**
   * "req.params"  es  una propiedad que
   * Express añade al objeto "req". Esta propiedad contiene los parámetros dinámicos
   * definidos en la ruta (por ejemplo, /productos/:id). Express detecta esos valores
   * en la URL y los coloca automáticamente dentro de req.params para que podamos
   * acceder a ellos desde el controlador.
   */


    //    Ejemplo: GET /api/productos/15  →  req.params.id = "15"
    const { id } = req.params;
    console.log(`🔍 Buscando producto ID: ${id}`);
    
    // 2️⃣ Llamamos al modelo para buscar ese producto en la base de datos.
    //    productosModel.obtenerPorId(id) devuelve:
    //      - el producto completo (objeto)
    //      - o null si no existe
    const producto = await productosModel.obtenerPorId(id);
    
    // 3️⃣ Si no existe, enviamos respuesta 404 (no encontrado).
    if (!producto) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }
    
    // 4️⃣ Si existe, enviamos el producto con código 200 (OK)
    res.status(200).json({
      success: true,
      message: 'Producto encontrado',
      data: producto
    });
    
  } catch (error) {
    // 5️⃣ Si ocurre algún error inesperado (servidor caído, DB rota, etc.)
    //    devolvemos estado 500 (error del servidor)
    console.error('❌ Error al obtener producto:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor',
      error: error.message
    });
  }
}

