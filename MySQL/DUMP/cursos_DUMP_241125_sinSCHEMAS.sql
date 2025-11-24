-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: cursos
-- ------------------------------------------------------
-- Server version	8.0.44

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `alum_asig`
--

DROP TABLE IF EXISTS `alum_asig`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alum_asig` (
  `Cod_Alumno` int unsigned NOT NULL,
  `Cod_Asignatura` int unsigned NOT NULL,
  `NotaMedia` decimal(5,2) DEFAULT NULL,
  PRIMARY KEY (`Cod_Alumno`,`Cod_Asignatura`),
  KEY `idx_asig` (`Cod_Asignatura`),
  CONSTRAINT `fk_alum` FOREIGN KEY (`Cod_Alumno`) REFERENCES `alumnos` (`Cod_Alumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_asig` FOREIGN KEY (`Cod_Asignatura`) REFERENCES `asignaturas` (`Codigo`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alum_asig`
--

LOCK TABLES `alum_asig` WRITE;
/*!40000 ALTER TABLE `alum_asig` DISABLE KEYS */;
INSERT INTO `alum_asig` VALUES (1,1,5.50),(1,3,6.00),(1,4,6.70),(2,1,6.70),(2,2,8.00),(3,1,3.80),(3,2,8.00),(3,3,4.00),(3,4,7.90),(3,5,9.00),(4,1,8.00),(4,2,2.80),(5,3,6.40),(5,4,7.90),(5,5,5.90),(6,3,4.00),(7,4,7.90),(7,5,9.00),(8,1,8.00),(9,1,2.80),(9,2,8.40),(10,2,4.80),(10,3,9.40);
/*!40000 ALTER TABLE `alum_asig` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumnos` (
  `Cod_Alumno` int unsigned NOT NULL,
  `Nombre` varchar(80) COLLATE latin1_spanish_ci NOT NULL,
  `Apellido1` varchar(45) COLLATE latin1_spanish_ci NOT NULL,
  `Apellido2` varchar(45) COLLATE latin1_spanish_ci NOT NULL,
  `DNI` varchar(12) COLLATE latin1_spanish_ci NOT NULL,
  `FechaN` date DEFAULT NULL,
  `Direccion` varchar(150) COLLATE latin1_spanish_ci NOT NULL,
  `Localidad` varchar(45) COLLATE latin1_spanish_ci NOT NULL,
  `Provincia` varchar(45) COLLATE latin1_spanish_ci NOT NULL,
  `CP` int NOT NULL,
  `Telefono` varchar(9) COLLATE latin1_spanish_ci NOT NULL,
  PRIMARY KEY (`Cod_Alumno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT INTO `alumnos` VALUES (1,'Pepe','Ruiz','Carmona','30123123k','1980-10-20','C/Mayor, 25','Lucena','Córdoba',14001,'630141414'),(2,'María','Haz','García','45387589Z','1981-05-20','C/Constitución, 18','Majadahonda','Madrid',23765,'918251378'),(3,'Jorge','Pez','Torrero','22458763B','1980-01-02','C/Baleares, 15','Tres Cantos','Madrid',21523,'918034210'),(4,'Guillermo','Tira','Ruiz','03512478C','1982-10-12','C/Alfonso Trece, 15','Tres Cantos','Madrid',21523,'918524569'),(5,'Elisa','Alto','Medina','03512378P','1980-05-07','C/Quinta, 3','Getafe','Madrid',21223,'918401235'),(6,'Enrique','López','Medina','51285741B','1981-04-10','C/Fresnedoso, 10','Leganés','Madrid',24723,'916571485'),(7,'Arturo','Naranjo','Sevilla','51654321A','1982-02-20','C/Alcalá, 38','Fuenlabrada','Madrid',21023,'914852001'),(8,'Maria','Carmona','López','51657321L','1980-03-25','C/Roma, 38','Sevilla','Sevilla',15300,'914852001'),(9,'Manuela','Márquez','Alonso','32646147H','1980-08-09','C/ Calvario, 5- 4B','Sevilla','Sevilla',15300,'916579841'),(10,'Lucía','Jimenez','Arroyo','36514684E','1980-06-15','C/ Arganda, 73','Baena','Córdoba',14003,'957178877'),(11,'pablo','s','s','1231457L',NULL,'nn','nn','nn',1,'11211');
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `apuntes`
--

DROP TABLE IF EXISTS `apuntes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apuntes` (
  `id_apunte` int NOT NULL AUTO_INCREMENT,
  `id_curso` int DEFAULT NULL COMMENT 'FK cursos',
  `modulo` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `unidad_formativa` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `tema` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `pdf` longblob,
  `resumen` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id_apunte`),
  KEY `fk_id_curso_idx` (`id_curso`),
  CONSTRAINT `fk_id_curso` FOREIGN KEY (`id_curso`) REFERENCES `cursos` (`id_curso`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apuntes`
--

LOCK TABLES `apuntes` WRITE;
/*!40000 ALTER TABLE `apuntes` DISABLE KEYS */;
/*!40000 ALTER TABLE `apuntes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignaturas`
--

DROP TABLE IF EXISTS `asignaturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignaturas` (
  `Codigo` int unsigned NOT NULL,
  `Nombre` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  `Creditos` tinyint unsigned DEFAULT NULL,
  `Cod_Departamento` int unsigned NOT NULL,
  PRIMARY KEY (`Codigo`),
  KEY `idx_departa` (`Cod_Departamento`),
  CONSTRAINT `fk_dep` FOREIGN KEY (`Cod_Departamento`) REFERENCES `departamento` (`Cod_Departamento`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignaturas`
--

LOCK TABLES `asignaturas` WRITE;
/*!40000 ALTER TABLE `asignaturas` DISABLE KEYS */;
INSERT INTO `asignaturas` VALUES (1,'Administración de Base de Datos',20,1),(2,'Sistemas Operativos distribuidos',15,2),(3,'Metodología de la programación I',18,3),(4,'Bases de Datos Distribuídas',12,1),(5,'Sistemas Multiproceso',12,2),(6,'Sistemas Expertos',10,4),(7,'Ingeniería del Software I',15,1),(8,'Ingeniería del Software II',14,1),(9,'Matemáticas Discretas',13,5),(10,'Metodología de la programación II',15,3),(11,'Fisica',10,5);
/*!40000 ALTER TABLE `asignaturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cursos`
--

DROP TABLE IF EXISTS `cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cursos` (
  `id_curso` int NOT NULL AUTO_INCREMENT,
  `id_especialidad` int DEFAULT NULL COMMENT 'ForenKey de id_especialidad',
  `nombre_curso` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fecha_realizacion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `FechaCalculadaAño` year DEFAULT NULL,
  `practicas` tinyint(1) DEFAULT NULL,
  `id_practicas` int DEFAULT NULL COMMENT 'ForenKey de practicas',
  `duracion_curso` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `conocimientos_adquiridos` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Centro_Estudio` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id_curso`),
  KEY `fk_id_practicas_idx` (`id_practicas`),
  KEY `fk_id_especialidad_idx` (`id_especialidad`),
  CONSTRAINT `fk_id_especialidad` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidad` (`id_especialidad`),
  CONSTRAINT `fk_id_practicas` FOREIGN KEY (`id_practicas`) REFERENCES `practicas` (`id_practica`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cursos`
--

LOCK TABLES `cursos` WRITE;
/*!40000 ALTER TABLE `cursos` DISABLE KEYS */;
INSERT INTO `cursos` VALUES (1,2,'Técnico en Ofimática','JUL. 1999',1999,0,NULL,'184 horas',NULL,'Instituto Informático Hispalense'),(2,3,'TÉCNICO EN EQUIPOS INFORMÁTICOS','JUN. 2001 ',2001,0,NULL,'171 horas',NULL,'Instituto Informático Hispalense'),(3,4,'TECNICO AUXILIAR DE DISEÑO GRAFICO','OCT.03- MAY.04',2004,0,NULL,'630 horas.','Diseño gráfico, composición, reproducción gráfica, ilustración','B.C. PROYECTOS Y SISTEMAS DE CONTROL, S.C.'),(4,4,'DISEÑO DE PAGINAS WEB','ENE.- ABR. 2005 ',2005,0,NULL,'300 horas','Diseño multimedia','ACADEMIA E.A.I.G'),(7,5,'TRÁMITES DE CONSTITUCIÓN DEL EMPRESARIO INDIVIDUAL','JUN. 2005',2005,0,NULL,'8 horas ','Pequeña empresa e iniciativa emprendedora ','FUNDACIÓN FORJA XXI'),(8,5,'DERECHOS Y OBLIGACIONES, CONTROL DE INGRESOS Y GASTOS DEL EMPRESARIO INDIVIDUAL','JUN. 2005',2005,0,NULL,'6 horas','Pequeña empresa e iniciativa emprendedora ','FUNDACIÓN FORJA XXI'),(9,1,'F.P.E. PROGRAMACION PARA SOLUCIONES DE IOT Y SMART CITY APLICABLES A ENTORNOS 5G, (IFCD97)','MAY. 2023 — JUN. 2023',2023,0,NULL,'150 horas.','Formación en tecnología 5G',' VODAFONE ESPAÑA & INTEGRA CONOCIMIENT');
/*!40000 ALTER TABLE `cursos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departamento`
--

DROP TABLE IF EXISTS `departamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departamento` (
  `Cod_Departamento` int unsigned NOT NULL,
  `Nombre_Dep` varchar(100) COLLATE latin1_spanish_ci NOT NULL,
  PRIMARY KEY (`Cod_Departamento`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_spanish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departamento`
--

LOCK TABLES `departamento` WRITE;
/*!40000 ALTER TABLE `departamento` DISABLE KEYS */;
INSERT INTO `departamento` VALUES (1,'Base de Datos'),(2,'Sistemas Operativos'),(3,'Programación de Sistemas'),(4,'Inteligencia Artificial'),(5,'Matemáticas'),(6,'nnnnn');
/*!40000 ALTER TABLE `departamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `empresas`
--

DROP TABLE IF EXISTS `empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empresas` (
  `id_empresa` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ubicacion` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `telefono` int DEFAULT NULL,
  `web` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `persona_contacto` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `mobil_contacto` int DEFAULT NULL,
  PRIMARY KEY (`id_empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empresas`
--

LOCK TABLES `empresas` WRITE;
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
INSERT INTO `empresas` VALUES (1,'Laybet','Sevilla',NULL,NULL,NULL,'Laybet Colmenares',NULL);
/*!40000 ALTER TABLE `empresas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialidad`
--

DROP TABLE IF EXISTS `especialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialidad` (
  `id_especialidad` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `familia` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `aplicaciones` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id_especialidad`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidad`
--

LOCK TABLES `especialidad` WRITE;
/*!40000 ALTER TABLE `especialidad` DISABLE KEYS */;
INSERT INTO `especialidad` VALUES (1,'5G','Informatica',NULL),(2,'Ofimatica','Administracion','Escribir cartas, etc.'),(3,'Tecnico Hardware','Informatica',NULL),(4,'Diseño Gráfico','Diseño',NULL),(5,'Empresa','Administracion','Creacion de empresa, tramites, decrechos y obligaciones');
/*!40000 ALTER TABLE `especialidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `practicas`
--

DROP TABLE IF EXISTS `practicas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `practicas` (
  `id_practica` int NOT NULL AUTO_INCREMENT,
  `id_empresa` int NOT NULL COMMENT 'ForenKey de empresas',
  `duracion` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `feed-back` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `aptitudes_adquiridas` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `observaciones` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`id_practica`),
  KEY `fk_id_empresa_idx` (`id_empresa`),
  CONSTRAINT `fk_id_empresa` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id_empresa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `practicas`
--

LOCK TABLES `practicas` WRITE;
/*!40000 ALTER TABLE `practicas` DISABLE KEYS */;
/*!40000 ALTER TABLE `practicas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-24 15:23:06
