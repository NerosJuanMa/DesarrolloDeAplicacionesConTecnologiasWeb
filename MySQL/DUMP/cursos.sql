-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-11-2025 a las 15:50:44
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
-- Base de datos: `cursos`
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
-- Estructura de tabla para la tabla `apuntes`
--

CREATE TABLE `apuntes` (
  `id_apunte` int NOT NULL,
  `id_curso` int DEFAULT NULL COMMENT 'FK cursos',
  `modulo` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `unidad_formativa` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tema` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `pdf` longblob,
  `resumen` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `id_curso` int NOT NULL,
  `id_especialidad` int DEFAULT NULL COMMENT 'ForenKey de id_especialidad',
  `nombre_curso` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fecha_realizacion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `FechaCalculadaAño` year DEFAULT NULL,
  `practicas` tinyint(1) DEFAULT NULL,
  `id_practicas` int DEFAULT NULL COMMENT 'ForenKey de practicas',
  `duracion_curso` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `conocimientos_adquiridos` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Centro_Estudio` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`id_curso`, `id_especialidad`, `nombre_curso`, `fecha_realizacion`, `FechaCalculadaAño`, `practicas`, `id_practicas`, `duracion_curso`, `conocimientos_adquiridos`, `Centro_Estudio`) VALUES
(1, 2, 'Técnico en Ofimática', 'JUL. 1999', '1999', 0, NULL, '184 horas', NULL, 'Instituto Informático Hispalense'),
(2, 3, 'TÉCNICO EN EQUIPOS INFORMÁTICOS', 'JUN. 2001 ', '2001', 0, NULL, '171 horas', NULL, 'Instituto Informático Hispalense'),
(3, 4, 'TECNICO AUXILIAR DE DISEÑO GRAFICO', 'OCT.03- MAY.04', '2004', 0, NULL, '630 horas.', 'Diseño gráfico, composición, reproducción gráfica, ilustración', 'B.C. PROYECTOS Y SISTEMAS DE CONTROL, S.C.'),
(4, 4, 'DISEÑO DE PAGINAS WEB', 'ENE.- ABR. 2005 ', '2005', 0, NULL, '300 horas', 'Diseño multimedia', 'ACADEMIA E.A.I.G'),
(7, 5, 'TRÁMITES DE CONSTITUCIÓN DEL EMPRESARIO INDIVIDUAL', 'JUN. 2005', '2005', 0, NULL, '8 horas ', 'Pequeña empresa e iniciativa emprendedora ', 'FUNDACIÓN FORJA XXI'),
(8, 5, 'DERECHOS Y OBLIGACIONES, CONTROL DE INGRESOS Y GASTOS DEL EMPRESARIO INDIVIDUAL', 'JUN. 2005', '2005', 0, NULL, '6 horas', 'Pequeña empresa e iniciativa emprendedora ', 'FUNDACIÓN FORJA XXI'),
(9, 1, 'F.P.E. PROGRAMACION PARA SOLUCIONES DE IOT Y SMART CITY APLICABLES A ENTORNOS 5G, (IFCD97)', 'MAY. 2023 — JUN. 2023', '2023', 0, NULL, '150 horas.', 'Formación en tecnología 5G', ' VODAFONE ESPAÑA & INTEGRA CONOCIMIENT');

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas`
--

CREATE TABLE `empresas` (
  `id_empresa` int NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ubicacion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `telefono` int DEFAULT NULL,
  `web` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `persona_contacto` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mobil_contacto` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empresas`
--

INSERT INTO `empresas` (`id_empresa`, `nombre`, `ubicacion`, `telefono`, `web`, `email`, `persona_contacto`, `mobil_contacto`) VALUES
(1, 'Laybet', 'Sevilla', NULL, NULL, NULL, 'Laybet Colmenares', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidad`
--

CREATE TABLE `especialidad` (
  `id_especialidad` int NOT NULL,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `familia` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `aplicaciones` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especialidad`
--

INSERT INTO `especialidad` (`id_especialidad`, `nombre`, `familia`, `aplicaciones`) VALUES
(1, '5G', 'Informatica', NULL),
(2, 'Ofimatica', 'Administracion', 'Escribir cartas, etc.'),
(3, 'Tecnico Hardware', 'Informatica', NULL),
(4, 'Diseño Gráfico', 'Diseño', NULL),
(5, 'Empresa', 'Administracion', 'Creacion de empresa, tramites, decrechos y obligaciones');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `practicas`
--

CREATE TABLE `practicas` (
  `id_practica` int NOT NULL,
  `id_empresa` int NOT NULL COMMENT 'ForenKey de empresas',
  `duracion` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `feed-back` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `aptitudes_adquiridas` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `observaciones` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Indices de la tabla `apuntes`
--
ALTER TABLE `apuntes`
  ADD PRIMARY KEY (`id_apunte`),
  ADD KEY `fk_id_curso_idx` (`id_curso`);

--
-- Indices de la tabla `asignaturas`
--
ALTER TABLE `asignaturas`
  ADD PRIMARY KEY (`Codigo`),
  ADD KEY `idx_departa` (`Cod_Departamento`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`id_curso`),
  ADD KEY `fk_id_practicas_idx` (`id_practicas`),
  ADD KEY `fk_id_especialidad_idx` (`id_especialidad`);

--
-- Indices de la tabla `departamento`
--
ALTER TABLE `departamento`
  ADD PRIMARY KEY (`Cod_Departamento`);

--
-- Indices de la tabla `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`id_empresa`);

--
-- Indices de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  ADD PRIMARY KEY (`id_especialidad`);

--
-- Indices de la tabla `practicas`
--
ALTER TABLE `practicas`
  ADD PRIMARY KEY (`id_practica`),
  ADD KEY `fk_id_empresa_idx` (`id_empresa`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `apuntes`
--
ALTER TABLE `apuntes`
  MODIFY `id_apunte` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `id_curso` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `empresas`
--
ALTER TABLE `empresas`
  MODIFY `id_empresa` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `especialidad`
--
ALTER TABLE `especialidad`
  MODIFY `id_especialidad` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `practicas`
--
ALTER TABLE `practicas`
  MODIFY `id_practica` int NOT NULL AUTO_INCREMENT;

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
-- Filtros para la tabla `apuntes`
--
ALTER TABLE `apuntes`
  ADD CONSTRAINT `fk_id_curso` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`);

--
-- Filtros para la tabla `asignaturas`
--
ALTER TABLE `asignaturas`
  ADD CONSTRAINT `fk_dep` FOREIGN KEY (`Cod_Departamento`) REFERENCES `departamento` (`Cod_Departamento`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD CONSTRAINT `fk_id_especialidad` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidad` (`id_especialidad`),
  ADD CONSTRAINT `fk_id_practicas` FOREIGN KEY (`id_practicas`) REFERENCES `practicas` (`id_practica`);

--
-- Filtros para la tabla `practicas`
--
ALTER TABLE `practicas`
  ADD CONSTRAINT `fk_id_empresa` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id_empresa`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
