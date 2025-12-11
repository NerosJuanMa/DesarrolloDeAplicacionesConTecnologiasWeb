import pool from "../config/db";
/**esta funcion crea un nuevo pedido en la base de datos */

export async function crearPedido(clienteId) {
  // Ejecutar INSERT en la tabla pedidos
  // MySQL asignará automáticamente el ID y la fecha actual
  const [result] = await pool.query(
    "INSERT INTO pedidos (cliente_id) VALUES (?)",
    [clienteId]
  );

  // Devolver la información del pedido creado
  return {
    id: result.insertId,      // ID generado automáticamente por MySQL
    cliente_id: clienteId,    // ID del cliente que creó el pedido
    estado: "pendiente"     // Estado por defecto
  };
}

/**esta funcion agrega un producto a un pedido existente */
export async function agregarProductoAPedido({ pedidoId, productoId, cantidad }) {
  // Insertar línea de pedido en la tabla pedidos_productos
  const [result] = await pool.query(
    "INSERT INTO pedidos_productos (pedido_id, producto_id, cantidad) VALUES (?, ?, ?)",
    [pedidoId, productoId, cantidad]
  );

  // Devolver información de la línea de pedido creada
  return {
    id: result.insertId,     // ID de la línea de pedido
    pedido_id: pedidoId,     // ID del pedido padre
    producto_id: productoId, // ID del producto agregado
    cantidad,                // Cantidad del producto
  };
}
/**esta funcion obtiene un pedido por su id */
export async function obtenerPedidoPorId(id) {
  const [rows] = await pool.query(
    `SELECT p.id, p.cliente_id, p.estado, p.fecha
     FROM pedidos p
     WHERE p.id = ?`,
    [id]
  );
   // Devolver el primer resultado (o undefined si no hay resultados)
  return rows[0];
}
/**esta funcion obtiene las lineas de un pedido por su id y los productos asociados */
export async function obtenerLineasDePedido(idPedido) {
  const [rows] = await pool.query(
    `SELECT 
        pp.id,
        pp.cantidad,
        pr.id AS producto_id,
        pr.nombre AS producto_nombre,
        pr.precio AS producto_precio,
        pr.imagen_url AS producto_imagen
      FROM pedidos_productos pp
      JOIN productos pr ON pp.producto_id = pr.id
      WHERE pp.pedido_id = ?`,
    [idPedido]
  );
  
  return rows;
}
export async function obtenerPedidosDeCliente(clienteId) {
  const [rows] = await pool.query(
    `SELECT id, cliente_id, estado, fecha
     FROM pedidos
     WHERE cliente_id = ?
     ORDER BY fecha DESC`,
    [clienteId]
  );
  
  return rows;
}
/**
 * Crear pedido completo con productos
 * ==========================================
 * 
 * PROPÓSITO:
 * Crea un pedido completo con sus productos en una sola operación.
 * Esta función maneja la transacción completa:
 * 1. Crear la cabecera del pedido
 * 2. Agregar todos los productos al pedido
 * 
 * PARÁMETROS:
 * @param {Object} datos - Datos del pedido
 *   @param {number} datos.cliente_id - ID del cliente
 *   @param {Array} datos.productos - Array de productos
 *     @param {number} datos.productos[].producto_id - ID del producto
 *     @param {number} datos.productos[].cantidad - Cantidad del producto
 * 
 * RETORNA:
 * @returns {Object} - Pedido creado con sus productos
 * 
 * EJEMPLO DE USO:
 * const pedido = await crear({
 *   cliente_id: 123,
 *   productos: [
 *     { producto_id: 1, cantidad: 2 },
 *     { producto_id: 3, cantidad: 1 }
 *   ]
 * });
 */

/**
 * Represents a book.
 * @constructor
 * @param {string} title - pues si funciona
 * @param {string} author - juanma
 */
function Book(title, author) {
}
export async function crear({ cliente_id, productos = [] }) {
  try {
    // Paso 1: Crear la cabecera del pedido
    const pedido = await crearPedido(cliente_id);
    
    // Paso 2: Agregar productos al pedido (si hay productos)
    const productosAgregados = [];
    //recorre el array de productos que llega del frontend
    for (const producto of productos) {
      const lineaPedido = await agregarProductoAPedido({
        pedidoId: pedido.id,
        productoId: producto.producto_id,
        cantidad: producto.cantidad
      });
      productosAgregados.push(lineaPedido);
    }
    
    // Paso 3: Devolver el pedido completo
    return {
      id: pedido.id,
      cliente_id: pedido.cliente_id,
      estado: pedido.estado,
      productos: productosAgregados,
      total_productos: productosAgregados.length
    };
    
  } catch (error) {
    console.error('Error al crear pedido completo:', error);
    throw error;
  }
}

/**
 * Alias para compatibilidad con el controlador
 */
export const obtenerPorCliente = obtenerPedidosDeCliente;