CREATE DATABASE  IF NOT EXISTS `colegio` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `colegio`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: colegio
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
  `id_alumno` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido1` varchar(50) DEFAULT NULL,
  `apellido2` varchar(50) DEFAULT NULL,
  `fecha_nacimiento` date NOT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `email` varchar(150) NOT NULL,
  PRIMARY KEY (`id_alumno`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumnos`
--

LOCK TABLES `alumnos` WRITE;
/*!40000 ALTER TABLE `alumnos` DISABLE KEYS */;
INSERT INTO `alumnos` VALUES (1,'Inmaculada','Contreras','Iñiguez','1977-03-12',1,'inmaculada.contreras@ejemplo.com'),(2,'Jaime','Conesa','Ponce','2012-11-05',1,'jaime.conesa@ejemplo.com'),(3,'Manuel','Ibañez','Fernandez','2004-07-21',0,'nuevo_email3@email.com'),(4,'Marta','Guisado','Simon','1982-02-14',1,'marta.guisado@ejemplo.com'),(5,'Monica','Jimenez','Gambin','1985-09-30',1,'monica.jimenez@ejemplo.com'),(6,'Jesús','Lopez','De La Cruz','1977-04-18',1,'jesus.lopez@ejemplo.com'),(7,'Ruben','Martin','Mendez','2004-12-01',1,'ruben.martin@ejemplo.com'),(8,'Juan Manuel','Mudarra','Pozo','1979-08-27',0,'juanmanuel.mudarra@ejemplo.com'),(9,'Victor','Outeiro','Romay','1979-01-19',1,'victor.outeiro@ejemplo.com'),(10,'Carla','Pajuelo','Paniagua','2004-05-10',1,'carla.pajuelo@ejemplo.com'),(11,'Roberto','Vazquez','Manrique','2003-06-08',1,'roberto.vazquez@ejemplo.com'),(12,'Pablo','Almellones','Ramos','2004-10-16',1,'pablo.almellones@ejemplo.com'),(13,'Miguel','Tavera','Fernandez','2008-12-02',1,'miguel.tavera@ejemplo.com');
/*!40000 ALTER TABLE `alumnos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-28 15:34:06
