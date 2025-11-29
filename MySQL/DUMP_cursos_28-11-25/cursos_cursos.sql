CREATE DATABASE  IF NOT EXISTS `cursos` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `cursos`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: cursos
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
-- Table structure for table `cursos`
--

DROP TABLE IF EXISTS `cursos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cursos` (
  `id_curso` int(11) NOT NULL AUTO_INCREMENT,
  `id_especialidad` int(11) DEFAULT NULL,
  `nombre_curso` varchar(150) DEFAULT NULL,
  `fecha_realizacion` varchar(50) DEFAULT NULL,
  `FechaCalculadaAño` year(4) DEFAULT NULL,
  `practicas` tinyint(1) DEFAULT NULL,
  `id_practicas` int(11) DEFAULT NULL,
  `duracion_curso` varchar(50) DEFAULT NULL,
  `conocimientos_adquiridos` varchar(500) DEFAULT NULL,
  `Centro_Estudio` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_curso`),
  KEY `FK_id_especialidad` (`id_especialidad`),
  KEY `FK_id_practicas` (`id_practicas`),
  CONSTRAINT `FK_id_especialidad` FOREIGN KEY (`id_especialidad`) REFERENCES `especialidad` (`id_especialidad`) ON UPDATE CASCADE,
  CONSTRAINT `FK_id_practicas` FOREIGN KEY (`id_practicas`) REFERENCES `practicas` (`id_practica`) ON UPDATE CASCADE
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-28 15:34:54
