CREATE DATABASE  IF NOT EXISTS `colegio` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `colegio`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: colegio
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
-- Table structure for table `alumnos`
--

DROP TABLE IF EXISTS `alumnos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumnos` (
  `id_alumno` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido1` varchar(50) DEFAULT NULL,
  `apellido2` varchar(50) DEFAULT NULL,
  `fecha_nacimiento` date NOT NULL,
  `activo` tinyint(1) DEFAULT '1',
  `email` varchar(150) NOT NULL,
  PRIMARY KEY (`id_alumno`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT INTO `alumnos` VALUES (1,'Inmaculada','Contreras','Iñiguez','1977-03-12',1,'inmaculada.contreras@ejemplo.com'),(2,'Jaime','Conesa','Ponce','2009-11-05',1,'jaime.conesa@ejemplo.com'),(3,'Manuel','Ibañez','Fernandez','2004-07-21',0,'nuevo_email3@email.com'),(4,'Marta','Guisado','Simon','1982-02-14',1,'marta.guisado@ejemplo.com'),(5,'Monica','Jimenez','Gambin','1985-09-30',1,'monica.jimenez@ejemplo.com'),(6,'Jesús','Lopez','De La Cruz','1977-04-18',1,'jesus.lopez@ejemplo.com'),(7,'Ruben','Martin','Mendez','2004-12-01',1,'ruben.martin@ejemplo.com'),(8,'Juan Manuel','Mudarra','Pozo','1979-08-27',1,'juanmanuel.mudarra@ejemplo.com'),(9,'Victor','Outeiro','Romay','1979-01-19',1,'victor.outeiro@ejemplo.com'),(10,'Carla','Pajuelo','Paniagua','2004-05-10',1,'carla.pajuelo@ejemplo.com'),(11,'Roberto','Vazquez','Manrique','2003-06-08',1,'roberto.vazquez@ejemplo.com'),(12,'Pablo','Almellones','Ramos','2004-10-16',1,'pablo.almellones@ejemplo.com'),(13,'Miguel','Tavera','Fernandez','2008-12-02',1,'miguel.tavera@ejemplo.com');
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignaturas`
--

DROP TABLE IF EXISTS `asignaturas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignaturas` (
  `id_asignatura` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre_asignatura` varchar(50) NOT NULL,
  `horas` int unsigned NOT NULL,
  `fk_id_profesor` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id_asignatura`),
  KEY `fk_id_profesor` (`fk_id_profesor`),
  CONSTRAINT `fk_id_profesor` FOREIGN KEY (`fk_id_profesor`) REFERENCES `profesor` (`id_profesor`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignaturas`
--

LOCK TABLES `asignaturas` WRITE;
/*!40000 ALTER TABLE `asignaturas` DISABLE KEYS */;
INSERT INTO `asignaturas` VALUES (1,'Matematicas',550,5),(2,'Lenguaje',600,4),(3,'Fisica',200,1),(4,'Quimica',300,1),(5,'Ingles',500,3),(6,'Diseño',100,4);
/*!40000 ALTER TABLE `asignaturas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `matricula`
--

DROP TABLE IF EXISTS `matricula`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `matricula` (
  `id_matricula` int unsigned NOT NULL AUTO_INCREMENT,
  `fk_id_alumno` int unsigned NOT NULL,
  `fk_id_asignatura` int unsigned NOT NULL,
  `nota` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id_matricula`),
  KEY `fk_id_alumno` (`fk_id_alumno`),
  KEY `fk_id_asignatura` (`fk_id_asignatura`),
  CONSTRAINT `fk_id_alumno` FOREIGN KEY (`fk_id_alumno`) REFERENCES `alumnos` (`id_alumno`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_id_asignatura` FOREIGN KEY (`fk_id_asignatura`) REFERENCES `asignaturas` (`id_asignatura`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `matricula`
--

LOCK TABLES `matricula` WRITE;
/*!40000 ALTER TABLE `matricula` DISABLE KEYS */;
INSERT INTO `matricula` VALUES (1,1,1,5),(2,1,2,5),(3,2,1,7),(4,2,5,4),(5,4,2,9),(6,4,5,3),(7,6,6,8),(8,6,5,6),(9,9,6,5),(10,9,1,5),(11,10,4,6),(12,10,5,10),(13,12,2,7),(14,12,1,5),(15,13,4,5),(16,13,5,5),(17,4,1,8),(18,4,6,10);
/*!40000 ALTER TABLE `matricula` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesor`
--

DROP TABLE IF EXISTS `profesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `profesor` (
  `id_profesor` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre_profesor` varchar(100) NOT NULL,
  `telefono` int DEFAULT NULL,
  `tipo_profesor` enum('interino','titular','sustituto') DEFAULT 'interino',
  PRIMARY KEY (`id_profesor`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesor`
--

LOCK TABLES `profesor` WRITE;
/*!40000 ALTER TABLE `profesor` DISABLE KEYS */;
INSERT INTO `profesor` VALUES (1,'Paqui Barrera',628779541,'sustituto'),(2,'Manuel Lopez',NULL,'interino'),(3,'Paco Peña',628656862,'titular'),(4,'Lucia Dominguez',555684622,'interino'),(5,'Laura Diaz',333555666,'titular');
/*!40000 ALTER TABLE `profesor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `vista_alumnos_nota_media`
--

DROP TABLE IF EXISTS `vista_alumnos_nota_media`;
/*!50001 DROP VIEW IF EXISTS `vista_alumnos_nota_media`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_alumnos_nota_media` AS SELECT 
 1 AS `id_alumno`,
 1 AS `nombre_completo`,
 1 AS `total_asignaturas`,
 1 AS `nota_media`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `vista_asignaturas_profesor`
--

DROP TABLE IF EXISTS `vista_asignaturas_profesor`;
/*!50001 DROP VIEW IF EXISTS `vista_asignaturas_profesor`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `vista_asignaturas_profesor` AS SELECT 
 1 AS `nombre_asignatura`,
 1 AS `horas`,
 1 AS `nombre_profesor`,
 1 AS `tipo_profesor`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `vista_alumnos_nota_media`
--

/*!50001 DROP VIEW IF EXISTS `vista_alumnos_nota_media`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_alumnos_nota_media` AS select `a`.`id_alumno` AS `id_alumno`,concat(`a`.`nombre`,' ',`a`.`apellido1`,' ',`a`.`apellido2`) AS `nombre_completo`,count(`m`.`fk_id_asignatura`) AS `total_asignaturas`,round(avg(`m`.`nota`),2) AS `nota_media` from (`alumnos` `a` join `matricula` `m` on((`a`.`id_alumno` = `m`.`fk_id_alumno`))) where (`a`.`activo` = 1) group by `a`.`id_alumno`,`a`.`nombre`,`a`.`apellido1`,`a`.`apellido2` having (count(`m`.`fk_id_asignatura`) > 0) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vista_asignaturas_profesor`
--

/*!50001 DROP VIEW IF EXISTS `vista_asignaturas_profesor`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_asignaturas_profesor` AS select `asig`.`nombre_asignatura` AS `nombre_asignatura`,`asig`.`horas` AS `horas`,concat(`p`.`nombre_profesor`) AS `nombre_profesor`,`p`.`tipo_profesor` AS `tipo_profesor` from (`asignaturas` `asig` left join `profesor` `p` on((`asig`.`fk_id_profesor` = `p`.`id_profesor`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-26 22:14:04
