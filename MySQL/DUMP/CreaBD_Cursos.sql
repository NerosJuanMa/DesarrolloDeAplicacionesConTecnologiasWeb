DROP SCHEMA IF EXISTS cursos;
CREATE SCHEMA cursos;
use cursos;

DROP TABLE IF EXISTS cursos;
CREATE TABLE `cursos` (
  `id_curso` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `id_especialidad` int DEFAULT NULL ,
  `nombre_curso` varchar(150)  DEFAULT NULL,
  `fecha_realizacion` varchar(50)  DEFAULT NULL,
  `FechaCalculadaAño` year DEFAULT NULL,
  `practicas` tinyint(1) DEFAULT NULL,
  `id_practicas` int DEFAULT NULL ,
  `duracion_curso` varchar(50)  DEFAULT NULL,
  `conocimientos_adquiridos` varchar(500)  DEFAULT NULL,
  `Centro_Estudio` varchar(50)  DEFAULT NULL
) ;

INSERT INTO `cursos` (`id_curso`, `id_especialidad`, `nombre_curso`, `fecha_realizacion`, `FechaCalculadaAño`, `practicas`, `id_practicas`, `duracion_curso`, `conocimientos_adquiridos`, `Centro_Estudio`) VALUES
(1, 2, 'Técnico en Ofimática', 'JUL. 1999', '1999', 0, NULL, '184 horas', NULL, 'Instituto Informático Hispalense'),
(2, 3, 'TÉCNICO EN EQUIPOS INFORMÁTICOS', 'JUN. 2001 ', '2001', 0, NULL, '171 horas', NULL, 'Instituto Informático Hispalense'),
(3, 4, 'TECNICO AUXILIAR DE DISEÑO GRAFICO', 'OCT.03- MAY.04', '2004', 0, NULL, '630 horas.', 'Diseño gráfico, composición, reproducción gráfica, ilustración', 'B.C. PROYECTOS Y SISTEMAS DE CONTROL, S.C.'),
(4, 4, 'DISEÑO DE PAGINAS WEB', 'ENE.- ABR. 2005 ', '2005', 0, NULL, '300 horas', 'Diseño multimedia', 'ACADEMIA E.A.I.G'),
(7, 5, 'TRÁMITES DE CONSTITUCIÓN DEL EMPRESARIO INDIVIDUAL', 'JUN. 2005', '2005', 0, NULL, '8 horas ', 'Pequeña empresa e iniciativa emprendedora ', 'FUNDACIÓN FORJA XXI'),
(8, 5, 'DERECHOS Y OBLIGACIONES, CONTROL DE INGRESOS Y GASTOS DEL EMPRESARIO INDIVIDUAL', 'JUN. 2005', '2005', 0, NULL, '6 horas', 'Pequeña empresa e iniciativa emprendedora ', 'FUNDACIÓN FORJA XXI'),
(9, 1, 'F.P.E. PROGRAMACION PARA SOLUCIONES DE IOT Y SMART CITY APLICABLES A ENTORNOS 5G, (IFCD97)', 'MAY. 2023 — JUN. 2023', '2023', 0, NULL, '150 horas.', 'Formación en tecnología 5G', ' VODAFONE ESPAÑA & INTEGRA CONOCIMIENT');

DROP TABLE IF EXISTS apuntes;
CREATE TABLE `apuntes` (
  `id_apunte` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `id_curso` int DEFAULT NULL ,
  `modulo` varchar(10)  DEFAULT NULL,
  `unidad_formativa` varchar(10)  DEFAULT NULL,
  `tema` varchar(50)  DEFAULT NULL,
  `pdf` longblob,
  `resumen` text 
) ;

DROP TABLE IF EXISTS especialidad;
CREATE TABLE `especialidad` (
  `id_especialidad` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(50)  DEFAULT NULL,
  `familia` varchar(50)  DEFAULT NULL,
  `aplicaciones` text 
);

INSERT INTO `especialidad` (`id_especialidad`, `nombre`, `familia`, `aplicaciones`) VALUES
(1, '5G', 'Informatica', NULL),
(2, 'Ofimatica', 'Administracion', 'Escribir cartas, etc.'),
(3, 'Tecnico Hardware', 'Informatica', NULL),
(4, 'Diseño Gráfico', 'Diseño', NULL),
(5, 'Empresa', 'Administracion', 'Creacion de empresa, tramites, decrechos y obligaciones');

DROP TABLE IF EXISTS practicas;
CREATE TABLE `practicas` (
  `id_practica` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `id_empresa` int NOT NULL,
  `duracion` varchar(10)  DEFAULT NULL,
  `feed-back` text ,
  `aptitudes_adquiridas` text ,
  `observaciones` text 
);

DROP TABLE IF EXISTS empresas;
CREATE TABLE `empresas` (
  `id_empresa` int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `nombre` varchar(50)  DEFAULT NULL,
  `ubicacion` varchar(50)  DEFAULT NULL,
  `telefono` int DEFAULT NULL,
  `web` varchar(50)  DEFAULT NULL,
  `email` varchar(50)  DEFAULT NULL,
  `persona_contacto` varchar(50)  DEFAULT NULL,
  `mobil_contacto` int DEFAULT NULL
);

INSERT INTO `empresas` (`id_empresa`, `nombre`, `ubicacion`, `telefono`, `web`, `email`, `persona_contacto`, `mobil_contacto`) VALUES
(1, 'Laybet', 'Sevilla', NULL, NULL, NULL, 'Laybet Colmenares', NULL);

--- crear foreingkeys
ALTER TABLE `cursos`.`cursos` 
ADD INDEX `FK_id_especialidad_idx` (`id_especialidad` ASC) ,
ADD INDEX `FK_id_practicas_idx` (`id_practicas` ASC) ;
;
ALTER TABLE `cursos`.`cursos` 
ADD CONSTRAINT `FK_id_especialidad`
  FOREIGN KEY (`id_especialidad`)
  REFERENCES `cursos`.`especialidad` (`id_especialidad`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
ADD CONSTRAINT `FK_id_practicas`
  FOREIGN KEY (`id_practicas`)
  REFERENCES `cursos`.`practicas` (`id_practica`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `cursos`.`practicas` 
ADD INDEX `FK_id_empresa_idx` (`id_empresa` ASC);
;
ALTER TABLE `cursos`.`practicas` 
ADD CONSTRAINT `FK_id_empresa`
  FOREIGN KEY (`id_empresa`)
  REFERENCES `cursos`.`empresas` (`id_empresa`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

ALTER TABLE `cursos`.`apuntes` 
ADD INDEX `FK_id_curso_idx` (`id_curso` ASC) VISIBLE;
;
ALTER TABLE `cursos`.`apuntes` 
ADD CONSTRAINT `FK_id_curso`
  FOREIGN KEY (`id_curso`)
  REFERENCES `cursos`.`cursos` (`id_curso`)
  ON DELETE CASCADE
  ON UPDATE CASCADE;

--- Comprueba el motor de cada tabla:
SHOW TABLE STATUS WHERE Name='cursos';
SHOW TABLE STATUS WHERE Name='especialidad';
SHOW TABLE STATUS WHERE Name='apuntes';
SHOW TABLE STATUS WHERE Name='empresas';
SHOW TABLE STATUS WHERE Name='practicas';

