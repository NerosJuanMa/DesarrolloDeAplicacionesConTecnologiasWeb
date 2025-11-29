-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-11-2025 a las 15:52:39
-- Versión del servidor: 8.0.44
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `colegio4`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `Cod_Alumno` int UNSIGNED NOT NULL,
  `Nombre` varchar(80) COLLATE latin1_spanish_ci NOT NULL,
  `Apellido1` varchar(45) COLLATE latin1_spanish_ci NOT NULL,
  `Apellido2` varchar(45) COLLATE latin1_spanish_ci NOT NULL,
  `DNI` varchar(12) COLLATE latin1_spanish_ci NOT NULL,
  `FechaN` date DEFAULT NULL,
  `Direccion` varchar(150) COLLATE latin1_spanish_ci NOT NULL,
  `Localidad` varchar(45) COLLATE latin1_spanish_ci NOT NULL,
  `Provincia` varchar(45) COLLATE latin1_spanish_ci NOT NULL,
  `CP` int NOT NULL,
  `Telefono` varchar(9) COLLATE latin1_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`Cod_Alumno`, `Nombre`, `Apellido1`, `Apellido2`, `DNI`, `FechaN`, `Direccion`, `Localidad`, `Provincia`, `CP`, `Telefono`) VALUES
(1, 'Pepe', 'Ruiz', 'Carmona', '30123123k', '1980-10-20', 'C/Mayor, 25', 'Lucena', 'Córdoba', 14001, '630141414'),
(2, 'María', 'Haz', 'García', '45387589Z', '1981-05-20', 'C/Constitución, 18', 'Majadahonda', 'Madrid', 23765, '918251378'),
(3, 'Jorge', 'Pez', 'Torrero', '22458763B', '1980-01-02', 'C/Baleares, 15', 'Tres Cantos', 'Madrid', 21523, '918034210'),
(4, 'Guillermo', 'Tira', 'Ruiz', '03512478C', '1982-10-12', 'C/Alfonso Trece, 15', 'Tres Cantos', 'Madrid', 21523, '918524569'),
(5, 'Elisa', 'Alto', 'Medina', '03512378P', '1980-05-07', 'C/Quinta, 3', 'Getafe', 'Madrid', 21223, '918401235'),
(6, 'Enrique', 'López', 'Medina', '51285741B', '1981-04-10', 'C/Fresnedoso, 10', 'Leganés', 'Madrid', 24723, '916571485'),
(7, 'Arturo', 'Naranjo', 'Sevilla', '51654321A', '1982-02-20', 'C/Alcalá, 38', 'Fuenlabrada', 'Madrid', 21023, '914852001'),
(8, 'Maria', 'Carmona', 'López', '51657321L', '1980-03-25', 'C/Roma, 38', 'Sevilla', 'Sevilla', 15300, '914852001'),
(9, 'Manuela', 'Márquez', 'Alonso', '32646147H', '1980-08-09', 'C/ Calvario, 5- 4B', 'Sevilla', 'Sevilla', 15300, '916579841'),
(10, 'Lucía', 'Jimenez', 'Arroyo', '36514684E', '1980-06-15', 'C/ Arganda, 73', 'Baena', 'Córdoba', 14003, '957178877'),
(11, 'pablo', 's', 's', '1231457L', NULL, 'nn', 'nn', 'nn', 1, '11211');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alum_asig`
--

CREATE TABLE `alum_asig` (
  `Cod_Alumno` int UNSIGNED NOT NULL,
  `Cod_Asignatura` int UNSIGNED NOT NULL,
  `NotaMedia` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `alum_asig`
--

INSERT INTO `alum_asig` (`Cod_Alumno`, `Cod_Asignatura`, `NotaMedia`) VALUES
(1, 1, 5.50),
(1, 3, 6.00),
(1, 4, 6.70),
(2, 1, 6.70),
(2, 2, 8.00),
(3, 1, 3.80),
(3, 2, 8.00),
(3, 3, 4.00),
(3, 4, 7.90),
(3, 5, 9.00),
(4, 1, 8.00),
(4, 2, 2.80),
(5, 3, 6.40),
(5, 4, 7.90),
(5, 5, 5.90),
(6, 3, 4.00),
(7, 4, 7.90),
(7, 5, 9.00),
(8, 1, 8.00),
(9, 1, 2.80),
(9, 2, 8.40),
(10, 2, 4.80),
(10, 3, 9.40);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignaturas`
--

CREATE TABLE `asignaturas` (
  `Codigo` int UNSIGNED NOT NULL,
  `Nombre` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  `Creditos` tinyint UNSIGNED DEFAULT NULL,
  `Cod_Departamento` int UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `asignaturas`
--

INSERT INTO `asignaturas` (`Codigo`, `Nombre`, `Creditos`, `Cod_Departamento`) VALUES
(1, 'Administración de Base de Datos', 20, 1),
(2, 'Sistemas Operativos distribuidos', 15, 2),
(3, 'Metodología de la programación I', 18, 3),
(4, 'Bases de Datos Distribuídas', 12, 1),
(5, 'Sistemas Multiproceso', 12, 2),
(6, 'Sistemas Expertos', 10, 4),
(7, 'Ingeniería del Software I', 15, 1),
(8, 'Ingeniería del Software II', 14, 1),
(9, 'Matemáticas Discretas', 13, 5),
(10, 'Metodología de la programación II', 15, 3),
(11, 'Fisica', 10, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departamento`
--

CREATE TABLE `departamento` (
  `Cod_Departamento` int UNSIGNED NOT NULL,
  `Nombre_Dep` varchar(100) COLLATE latin1_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;

--
-- Volcado de datos para la tabla `departamento`
--

INSERT INTO `departamento` (`Cod_Departamento`, `Nombre_Dep`) VALUES
(1, 'Base de Datos'),
(2, 'Sistemas Operativos'),
(3, 'Programación de Sistemas'),
(4, 'Inteligencia Artificial'),
(5, 'Matemáticas'),
(6, 'nnnnn');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`Cod_Alumno`);

--
-- Indices de la tabla `alum_asig`
--
ALTER TABLE `alum_asig`
  ADD PRIMARY KEY (`Cod_Alumno`,`Cod_Asignatura`),
  ADD KEY `idx_asig` (`Cod_Asignatura`);

--
-- Indices de la tabla `asignaturas`
--
ALTER TABLE `asignaturas`
  ADD PRIMARY KEY (`Codigo`),
  ADD KEY `idx_departa` (`Cod_Departamento`);

--
-- Indices de la tabla `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`Cod_Departamento`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alum_asig`
--
ALTER TABLE `alum_asig`
  ADD CONSTRAINT `fk_alum` FOREIGN KEY (`Cod_Alumno`) REFERENCES `alumnos` (`Cod_Alumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_asig` FOREIGN KEY (`Cod_Asignatura`) REFERENCES `asignaturas` (`Codigo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `asignaturas`
--
ALTER TABLE `asignaturas`
  ADD CONSTRAINT `fk_dep` FOREIGN KEY (`Cod_Departamento`) REFERENCES `departamento` (`Cod_Departamento`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
