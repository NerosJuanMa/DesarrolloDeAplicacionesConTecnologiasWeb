-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-12-2025 a las 09:32:48
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

DROP SCHEMA IF EXISTS fotos;
CREATE SCHEMA IF NOT EXISTS fotos;
USE fotos;
--
-- Base de datos: `fotos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `nombre`) VALUES
(1, 'General'),
(2, 'Privada'),
(3, 'Animales'),
(4, 'Paisajes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL COMMENT 'Nombre completo del cliente',
  `email` varchar(150) NOT NULL COMMENT 'Email único para login',
  `password` varchar(255) NOT NULL COMMENT 'Contraseña hasheada con bcrypt',
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Fecha de registro'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Usuarios registrados en el sistema';

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `email`, `password`, `creado_en`) VALUES
(1, 'Usuario Prueba', 'test@example.com', '$2a$10$N9qo8uLOickgx2ZMRZoMye.JfVK7fCQpNpCPq9QdoW6lQk1K6kMSO', '2025-12-12 08:35:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL COMMENT 'Nombre de la Imagen',
  `descripcion` text DEFAULT NULL COMMENT 'Descripción detallada de la imagen',
  `precio` decimal(10,2) NOT NULL COMMENT 'Precio unitario en euros',
  `stock` int(11) DEFAULT 0 COMMENT 'Cantidad disponible en inventario',
  `categoria` varchar(50) DEFAULT 'General' COMMENT 'Categoría de la imagen',
  `categoria_id` int(11) DEFAULT NULL,
  `ruta_imagen` varchar(512) NOT NULL COMMENT 'URL/ruta de la imagen',
  `activo` tinyint(1) DEFAULT 1 COMMENT 'foto disponible para venta',
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Fecha de subida'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Catálogo de fotos disponibles en la tienda';

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id`, `titulo`, `descripcion`, `precio`, `stock`, `categoria`, `categoria_id`, `ruta_imagen`, `activo`, `creado_en`) VALUES
(1, 'Pajaro volando', 'Se ven varios pajaros de varios colores', 19.99, 50, 'Naturaleza', NULL, 'https://via.placeholder.com/300x300?text=Camiseta', 1, '2025-12-12 08:35:08'),
(2, 'perro negro', 'perro negro sentado', 49.99, 30, 'Naturaleza', NULL, 'https://via.placeholder.com/300x300?text=Pantalon', 1, '2025-12-12 08:35:08'),
(3, 'caballos corriendo', 'caballos corriendo en la playa', 79.99, 20, 'Naturaleza', NULL, 'https://via.placeholder.com/300x300?text=Chaqueta', 1, '2025-12-12 08:35:08'),
(4, 'Cara sonriente', 'se ve a una persona sonriendo', 89.99, 25, 'Varios', NULL, 'https://via.placeholder.com/300x300?text=Zapatos', 1, '2025-12-12 08:35:08'),
(5, 'Smartphone XL', 'Teléfono inteligente con pantalla de 6.5 pulgadas', 299.99, 15, 'Varios', NULL, 'https://via.placeholder.com/300x300?text=Smartphone', 1, '2025-12-12 08:35:08'),
(6, 'Auriculares Bluetooth', 'Auriculares inalámbricos con cancelación de ruido', 89.99, 20, 'Varios', NULL, 'https://via.placeholder.com/300x300?text=Auriculares', 1, '2025-12-12 08:35:08'),
(7, 'Tablet 10\"', 'Tablet con pantalla de alta resolución', 199.99, 18, 'Varios', NULL, 'https://via.placeholder.com/300x300?text=Tablet', 1, '2025-12-12 08:35:08'),
(8, 'Cargador Inalámbrico', 'Base de carga rápida para dispositivos', 35.99, 40, 'Varios', NULL, 'https://via.placeholder.com/300x300?text=Cargador', 1, '2025-12-12 08:35:08'),
(9, 'Lámpara LED', 'Lámpara de escritorio con regulador de intensidad', 35.00, 25, 'Hogar', NULL, 'https://via.placeholder.com/300x300?text=Lampara', 1, '2025-12-12 08:35:08'),
(10, 'Cojín Decorativo', 'Cojín suave para sofá en varios colores', 18.50, 30, 'Hogar', NULL, 'https://via.placeholder.com/300x300?text=Cojin', 1, '2025-12-12 08:35:08'),
(11, 'Espejo de Pared', 'Espejo decorativo para salón', 45.00, 12, 'Hogar', NULL, 'https://via.placeholder.com/300x300?text=Espejo', 1, '2025-12-12 08:35:08'),
(12, 'Maceta Cerámica', 'Maceta artesanal para plantas de interior', 22.99, 35, 'Hogar', NULL, 'https://via.placeholder.com/300x300?text=Maceta', 1, '2025-12-12 08:35:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL COMMENT 'ID del cliente que realizó el pedido',
  `estado` enum('pendiente','pagado','enviado','entregado','cancelado') DEFAULT 'pendiente' COMMENT 'Estado actual del pedido',
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'Fecha y hora de creación del pedido'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Cabecera de pedidos realizados por clientes';

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos_imagenes`
--

CREATE TABLE `pedidos_imagenes` (
  `id` int(11) NOT NULL,
  `pedido_id` int(11) NOT NULL COMMENT 'ID del pedido padre',
  `imagen_id` int(11) NOT NULL COMMENT 'ID de la imagen incluido',
  `cantidad` int(11) DEFAULT 1 COMMENT 'Cantidad de unidades de la foto'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Líneas de pedido - imagenes específicas en cada pedido';

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_email` (`email`) COMMENT 'Índice para optimizar login por email';

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoria_id` (`categoria_id`),
  ADD KEY `idx_categoria` (`categoria`) COMMENT 'Índice para filtros por categoría',
  ADD KEY `idx_activo` (`activo`) COMMENT 'Índice para fotos activos',
  ADD KEY `idx_precio` (`precio`) COMMENT 'Índice para ordenación por precio';

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_cliente_fecha` (`cliente_id`,`fecha`) COMMENT 'Índice para consultas de pedidos por cliente',
  ADD KEY `idx_estado` (`estado`) COMMENT 'Índice para filtros por estado';

--
-- Indices de la tabla `pedidos_imagenes`
--
ALTER TABLE `pedidos_imagenes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_pedido_imagen` (`pedido_id`,`imagen_id`) COMMENT 'Evita duplicados de la misma imagen en un pedido',
  ADD KEY `idx_pedido` (`pedido_id`) COMMENT 'Índice para consultar líneas de un pedido',
  ADD KEY `idx_imagen` (`imagen_id`) COMMENT 'Índice para estadísticas por foto';

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedidos_imagenes`
--
ALTER TABLE `pedidos_imagenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD CONSTRAINT `imagenes_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id_categoria`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedidos_imagenes`
--
ALTER TABLE `pedidos_imagenes`
  ADD CONSTRAINT `pedidos_imagenes_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pedidos_imagenes_ibfk_2` FOREIGN KEY (`imagen_id`) REFERENCES `imagenes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

