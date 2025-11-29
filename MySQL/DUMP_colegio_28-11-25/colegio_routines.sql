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
-- Final view structure for view `vista_asignaturas_profesor`
--

/*!50001 DROP VIEW IF EXISTS `vista_asignaturas_profesor`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_asignaturas_profesor` AS select `asig`.`nombre_asignatura` AS `nombre_asignatura`,`asig`.`horas` AS `horas`,concat(`p`.`nombre_profesor`) AS `nombre_profesor`,`p`.`tipo_profesor` AS `tipo_profesor` from (`asignaturas` `asig` left join `profesor` `p` on(`asig`.`fk_id_profesor` = `p`.`id_profesor`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `vista_alumnos_nota_media`
--

/*!50001 DROP VIEW IF EXISTS `vista_alumnos_nota_media`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `vista_alumnos_nota_media` AS select `a`.`id_alumno` AS `id_alumno`,concat(`a`.`nombre`,' ',`a`.`apellido1`,' ',`a`.`apellido2`) AS `nombre_completo`,count(`m`.`fk_id_asignatura`) AS `total_asignaturas`,round(avg(`m`.`nota`),2) AS `nota_media` from (`alumnos` `a` join `matricula` `m` on(`a`.`id_alumno` = `m`.`fk_id_alumno`)) where `a`.`activo` = 1 group by `a`.`id_alumno`,`a`.`nombre`,`a`.`apellido1`,`a`.`apellido2` having count(`m`.`fk_id_asignatura`) > 0 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Dumping events for database 'colegio'
--

--
-- Dumping routines for database 'colegio'
--
/*!50003 DROP PROCEDURE IF EXISTS `listar_alumnos_menores` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `listar_alumnos_menores`()
BEGIN
    SELECT
        CONCAT(nombre, ' ', apellido1, ' ', apellido2) AS nombre_completo,
        fecha_nacimiento,
        FLOOR(DATEDIFF(NOW(), fecha_nacimiento) / 365) AS edad_aproximada
    FROM alumnos
    WHERE (DATEDIFF(NOW(), fecha_nacimiento) / 365) < 18
    ORDER BY edad_aproximada ASC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `notas_por_alumno` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `notas_por_alumno`(IN p_id_alumno INT)
BEGIN
    SELECT
        CONCAT(a.nombre, ' ', a.apellido1, ' ', a.apellido2) AS nombre_completo,
        asig.nombre_asignatura,
        m.nota AS nota_final,
        CASE 
            WHEN m.nota >= 5 THEN 'Aprobado'
            ELSE 'Suspenso'
        END AS valoracion
    FROM alumnos a
    JOIN matricula m
        ON a.id_alumno = m.fk_id_alumno
    JOIN asignaturas asig
        ON m.fk_id_asignatura = asig.id_asignatura
    WHERE a.id_alumno = p_id_alumno
    ORDER BY m.nota DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `resumen_asignaturas` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `resumen_asignaturas`()
BEGIN
    SELECT
        asig.nombre_asignatura,
        COUNT(m.fk_id_alumno) AS num_alumnos,
        ROUND(AVG(m.nota), 2) AS nota_media
    FROM asignaturas asig
    JOIN matricula m
        ON asig.id_asignatura = m.fk_id_asignatura
    GROUP BY asig.id_asignatura, asig.nombre_asignatura
    HAVING COUNT(m.fk_id_alumno) > 0
    ORDER BY nota_media DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-28 15:34:06
