// reset-db.js - Script para resetear completamente la base de datos
import 'dotenv/config';
import pool from './config/db.js';

/**
 * ==========================================
 * SCRIPT DE RESETEO COMPLETO DE BASE DE DATOS
 * ==========================================
 * 
 * PROPÓSITO:
 * Este script elimina completamente la base de datos existente
 * y la recrea desde cero.
 * 
 * ESTRUCTURA SIMPLIFICADA:
 * 1. clientes - Usuarios del sistema
 * 2. productos - Catálogo con categoria como string (más simple)
 * 3. pedidos - Pedidos de los clientes
 * 4. pedidos_productos - Relación many-to-many pedidos-productos
 * 

 */

async function resetearBaseDatos() {
  try {
    console.log("🗑️ RESETEANDO BASE DE DATOS COMPLETAMENTE...");
    
    // 1. Eliminar la base de datos completa
    await pool.query(`DROP DATABASE IF EXISTS bazar`);
    console.log("✅ Base de datos 'bazar' eliminada completamente");
    
    // 2. Crear la base de datos nueva
    await pool.query(`CREATE DATABASE bazar`);
    console.log("✅ Base de datos 'bazar' creada nueva");
    
    // 3. Usar la nueva base de datos
    await pool.query(`USE bazar`);
    console.log("✅ Conectado a la nueva base de datos");

    // 4. Crear las tablas simplificadas
    await crearTablasSimples();
    
    // 5. Insertar datos de ejemplo
    await insertarDatosEjemplo();
    
    console.log("🎉 ¡BASE DE DATOS SIMPLIFICADA CREADA EXITOSAMENTE!");
    console.log("📚 Estructura optimizada para alumnos principiantes");
    console.log("🚀 Lista para usar con el portfolio");
    
    process.exit(0);
    
  } catch (error) {
    console.error("❌ Error reseteando la base de datos:", error);
    process.exit(1);
  }
}

/**
 * Crear estructura de tablas simplificada
 */
async function crearTablasSimples() {
  console.log("🏗️ Creando estructura simplificada...");
  
  // TABLA 1: CLIENTES (usuarios del sistema)
  await pool.query(`
    CREATE TABLE clientes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB COMMENT='Usuarios registrados'
  `);
  console.log("✅ Tabla 'clientes' creada");

  // TABLA 2: PRODUCTOS (catálogo simplificado)
  await pool.query(`
    CREATE TABLE productos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100) NOT NULL,
      descripcion TEXT,
      precio DECIMAL(10,2) NOT NULL,
      stock INT DEFAULT 0,
      categoria VARCHAR(50) DEFAULT 'General',
      imagen_url VARCHAR(500),
      activo BOOLEAN DEFAULT TRUE,
      creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      
      INDEX idx_categoria (categoria),
      INDEX idx_activo (activo)
    ) ENGINE=InnoDB COMMENT='Productos del catálogo'
  `);
  console.log("✅ Tabla 'productos' creada");

  // TABLA 3: PEDIDOS (cabecera de pedidos)
  await pool.query(`
    CREATE TABLE pedidos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      cliente_id INT NOT NULL,
      estado ENUM('pendiente', 'pagado', 'enviado', 'entregado') DEFAULT 'pendiente',
      total DECIMAL(10,2) DEFAULT 0.00,
      fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      
      FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE,
      INDEX idx_cliente (cliente_id),
      INDEX idx_fecha (fecha DESC)
    ) ENGINE=InnoDB COMMENT='Pedidos de los clientes'
  `);
  console.log("✅ Tabla 'pedidos' creada");

  // TABLA 4: PEDIDOS_PRODUCTOS (detalle de pedidos)
  await pool.query(`
    CREATE TABLE pedidos_productos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      pedido_id INT NOT NULL,
      producto_id INT NOT NULL,
      cantidad INT DEFAULT 1,
      precio_unitario DECIMAL(10,2) NOT NULL,
      
      FOREIGN KEY (pedido_id) REFERENCES pedidos(id) ON DELETE CASCADE,
      FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
      INDEX idx_pedido (pedido_id),
      INDEX idx_producto (producto_id)
    ) ENGINE=InnoDB COMMENT='Productos incluidos en cada pedido'
  `);
  console.log("✅ Tabla 'pedidos_productos' creada");
}

/**
 * Insertar datos de ejemplo para principiantes
 */
async function insertarDatosEjemplo() {
  console.log("📝 Insertando datos de ejemplo...");

  try {
    // PRODUCTOS DE EJEMPLO (sencillos y variados)
    await pool.query(`
      INSERT INTO productos (nombre, descripcion, precio, stock, categoria, imagen_url) VALUES 
      ('Camiseta Básica', 'Camiseta de algodón cómoda', 19.99, 50, 'Ropa', 'https://via.placeholder.com/300x300/4CAF50/white?text=Camiseta'),
      ('Pantalón Vaquero', 'Vaqueros clásicos azules', 49.99, 30, 'Ropa', 'https://via.placeholder.com/300x300/2196F3/white?text=Pantalon'),
      ('Zapatillas Sport', 'Zapatillas cómodas para deporte', 79.99, 25, 'Calzado', 'https://via.placeholder.com/300x300/FF9800/white?text=Zapatillas'),
      
      ('El Quijote', 'Clásico de la literatura española', 12.50, 20, 'Libros', 'https://via.placeholder.com/300x300/9C27B0/white?text=Libro'),
      ('Guía JavaScript', 'Manual para programadores', 35.99, 15, 'Libros', 'https://via.placeholder.com/300x300/3F51B5/white?text=JS+Book'),
      
      ('Smartphone Basic', 'Teléfono inteligente sencillo', 199.99, 10, 'Electrónica', 'https://via.placeholder.com/300x300/F44336/white?text=Phone'),
      ('Auriculares', 'Auriculares con buen sonido', 29.99, 40, 'Electrónica', 'https://via.placeholder.com/300x300/795548/white?text=Audio'),
      
      ('Lámpara LED', 'Iluminación eficiente', 25.00, 35, 'Hogar', 'https://via.placeholder.com/300x300/FFEB3B/black?text=Lámpara'),
      ('Cojín Suave', 'Cojín decorativo', 15.50, 45, 'Hogar', 'https://via.placeholder.com/300x300/E91E63/white?text=Cojín'),
      
      ('Pelota Fútbol', 'Balón oficial de fútbol', 25.99, 20, 'Deportes', 'https://via.placeholder.com/300x300/4CAF50/white?text=Pelota')
    `);

    // USUARIO DE PRUEBA (con password hasheado para '123456')
    await pool.query(`
      INSERT INTO clientes (nombre, email, password) VALUES 
      ('Juan Pérez', 'test@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.JfVK7fCQpNpCPq9QdoW6lQk1K6kMSO'),
      ('Ana García', 'ana@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.JfVK7fCQpNpCPq9QdoW6lQk1K6kMSO'),
      ('Carlos López', 'carlos@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.JfVK7fCQpNpCPq9QdoW6lQk1K6kMSO')
    `);

    // PEDIDOS DE EJEMPLO (para mostrar funcionalidad)
    await pool.query(`
      INSERT INTO pedidos (cliente_id, estado, total) VALUES 
      (1, 'pendiente', 69.98),
      (2, 'enviado', 45.48),
      (1, 'entregado', 25.99)
    `);

    // DETALLE DE PEDIDOS (productos en cada pedido)
    await pool.query(`
      INSERT INTO pedidos_productos (pedido_id, producto_id, cantidad, precio_unitario) VALUES 
      (1, 1, 2, 19.99),  -- 2 camisetas en pedido 1
      (1, 8, 1, 25.00),  -- 1 lámpara en pedido 1
      (2, 4, 1, 12.50),  -- 1 libro en pedido 2  
      (2, 9, 2, 15.50),  -- 2 cojines en pedido 2
      (3, 10, 1, 25.99)  -- 1 pelota en pedido 3
    `);

    console.log("✅ Datos de ejemplo insertados correctamente");
    console.log("👥 Usuarios creados: test@example.com, ana@example.com, carlos@example.com");
    console.log("🔑 Contraseña para todos: 123456");
    console.log("📦 10 productos en 5 categorías");
    console.log("🛒 3 pedidos de ejemplo con productos");

  } catch (error) {
    console.error("❌ Error insertando datos:", error.message);
  }
}

// Ejecutar el reseteo
resetearBaseDatos();
