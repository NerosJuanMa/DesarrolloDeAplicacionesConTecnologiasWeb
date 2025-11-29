CREATE DATABASE  IF NOT EXISTS `bazar` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `bazar`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: bazar
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
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int(11) DEFAULT 0,
  `categoria` varchar(50) NOT NULL,
  `imagen_url` varchar(500) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `creado_en` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'Camiseta Básica','Camiseta de algodón cómoda',19.99,50,'Ropa','https://via.placeholder.com/300x300/4CAF50/FFFFFF?text=Camiseta',1,'2025-11-28 12:54:36'),(2,'Pantalón Vaquero','Vaqueros clásicos azules',49.99,30,'Ropa','https://via.placeholder.com/300x300/2196F3/FFFFFF?text=Pantalon',1,'2025-11-28 12:54:36'),(3,'Zapatillas Sport','Zapatillas cómodas para deporte',79.99,25,'Ropa','https://via.placeholder.com/300x300/FF9800/FFFFFF?text=Zapatillas',1,'2025-11-28 12:54:36'),(4,'El Quijote','Clásico de la literatura española',12.50,20,'Libros','https://via.placeholder.com/300x300/9C27B0/FFFFFF?text=Libro',1,'2025-11-28 12:54:36'),(5,'Guía JavaScript','Manual para programadores',35.99,15,'Libros','https://via.placeholder.com/300x300/3F51B5/FFFFFF?text=JS+Book',1,'2025-11-28 12:54:36'),(6,'Smartphone Basic','Teléfono inteligente sencillo',199.99,10,'Electrónica','https://via.placeholder.com/300x300/F44336/FFFFFF?text=Phone',1,'2025-11-28 12:54:36'),(7,'Auriculares','Auriculares con buen sonido',29.99,40,'Electrónica','https://via.placeholder.com/300x300/795548/FFFFFF?text=Audio',1,'2025-11-28 12:54:36');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-28 15:35:22
