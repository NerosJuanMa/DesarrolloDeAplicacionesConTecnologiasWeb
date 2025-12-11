// models/productos.model.js
import pool from '../config/db.js';

/**
 * ==========================================
 * MODELO DE PRODUCTOS 
 * ==========================================
 * 

 * 
 * 
 * FUNCIONES:
 * - obtenerTodos() - Lista todos los productos activos
 * - obtenerPorId(id) - Obtiene un producto específico
 * - obtenerPorCategoria(categoria) - Filtra productos por categoría
 
 */

/**
 * Obtener todos los productos activos
 * CONSULTA : SELECT  sin JOINs
 */
export async function obtenerTodos() {
  const [rows] = await pool.query(
    `SELECT id, nombre, descripcion, precio, stock, categoria, imagen_url, activo, creado_en
     FROM productos
     WHERE activo = 1
     ORDER BY nombre ASC`
  );
  return rows;
}

/**
 * Obtener un producto específico por ID
 * CONSULTA SIMPLE: WHERE con parámetro
 */
export async function obtenerPorId(id) {
  const [rows] = await pool.query(
    `SELECT id, nombre, descripcion, precio, stock, categoria, imagen_url, activo, creado_en
     FROM productos
     WHERE id = ? AND activo = 1`,
    [id]
  );
  return rows[0]; // undefined si no existe
}

/**
 * Obtener productos filtrados por categoría; la categoría es un string en la propia tabla
 * CONSULTA : Filtro por string de categoría
 */
export async function obtenerPorCategoria(categoria) {
  const [rows] = await pool.query(
    `SELECT id, nombre, descripcion, precio, stock, categoria, imagen_url, activo, creado_en
     FROM productos 
     WHERE activo = 1 AND categoria = ?
     ORDER BY nombre ASC`,
    [categoria]
  );
  return rows;
}

/**
 * Crear un nuevo producto 
 * DATOS REQUERIDOS: {nombre, descripcion, precio, stock, categoria, imagen_url}
 * VALIDACIÓN SIMPLE: Campos obligatorios
 */
export async function crear(datos) {
  const { nombre, descripcion, precio, stock, categoria, imagen_url } = datos;
  
  // Validación simple de campos obligatorios
  if (!nombre || !precio || !categoria) {
    throw new Error('Faltan campos obligatorios: nombre, precio, categoria');
  }
  
  const [result] = await pool.query(
    `INSERT INTO productos (nombre, descripcion, precio, stock, categoria, imagen_url)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [nombre, descripcion || null, precio, stock || 0, categoria, imagen_url || null]
  );
  
  return result.insertId;
}

/**
 * Actualizar un producto existente
 * DATOS OPCIONALES: {nombre, descripcion, precio, stock, categoria, imagen_url}
 * ACTUALIZACIÓN DINÁMICA: Solo actualiza campos proporcionados
 */
export async function actualizar(id, datos) {
  const { nombre, descripcion, precio, stock, categoria, imagen_url } = datos;
  
  // Construir query dinámico solo con campos proporcionados
  let campos = [];
  let valores = [];
  
  if (nombre !== undefined) {
    campos.push('nombre = ?');
    valores.push(nombre);
  }
  if (descripcion !== undefined) {
    campos.push('descripcion = ?');
    valores.push(descripcion);
  }
  if (precio !== undefined) {
    campos.push('precio = ?');
    valores.push(precio);
  }
  if (stock !== undefined) {
    campos.push('stock = ?');
    valores.push(stock);
  }
  if (categoria !== undefined) {
    campos.push('categoria = ?');
    valores.push(categoria);
  }
  if (imagen_url !== undefined) {
    campos.push('imagen_url = ?');
    valores.push(imagen_url);
  }
  
  if (campos.length === 0) {
    throw new Error('No se proporcionaron campos para actualizar');
  }
  
  valores.push(id);
  
  const [result] = await pool.query(
    `UPDATE productos SET ${campos.join(', ')} WHERE id = ?`,
    valores
  );
  
  return result.affectedRows > 0;
}

/**
 * Eliminar un producto (marcar como inactivo)
 * SOFT DELETE: Marca el producto como activo=0
 * BENEFICIO: Mantiene integridad de pedidos anteriores
 */
export async function eliminar(id) {
  const [result] = await pool.query(
    `UPDATE productos SET activo = 0 WHERE id = ?`,
    [id]
  );
  
  return result.affectedRows > 0;
}

/**
 * Obtener todas las categorías únicas disponibles
 * ÚTIL PARA: Mostrar filtros dinámicos en el frontend
 * CONSULTA SIMPLE: DISTINCT de categoria
 */
export async function obtenerCategorias() {
  const [rows] = await pool.query(
    `SELECT DISTINCT categoria 
     FROM productos 
     WHERE activo = 1 AND categoria IS NOT NULL
     ORDER BY categoria ASC`
  );
  return rows.map(row => row.categoria);
}