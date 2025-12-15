DROP DATABASE IF EXISTS colegio;
CREATE DATABASE  IF NOT EXISTS colegio; 
USE colegio;

DROP TABLE IF EXISTS alumnos;
CREATE TABLE alumnos (
  id_alumno int unsigned auto_increment PRIMARY KEY,
  nombre varchar(50) NOT NULL,
  apellido1 varchar(50) DEFAULT NULL,
  apellido2 varchar(50) DEFAULT NULL,
  fecha_nacimiento date NOT NULL,
  activo bool DEFAULT 1,
  email varchar(150) NOT NULL UNIQUE   
);

DROP TABLE IF EXISTS profesor;
CREATE TABLE profesor (
  id_profesor int unsigned auto_increment PRIMARY KEY,
  nombre_profesor varchar(100) NOT NULL,
  telefono int DEFAULT NULL,
  tipo_profesor ENUM('interino', 'titular', 'sustituto') DEFAULT 'interino'
);

DROP TABLE IF EXISTS asignaturas;
CREATE TABLE asignaturas (
  id_asignatura int unsigned auto_increment PRIMARY KEY,
  nombre_asignatura varchar(50) NOT NULL,
  horas int unsigned NOT NULL,
  fk_id_profesor int unsigned DEFAULT NULL,
  CONSTRAINT fk_id_profesor
	  FOREIGN KEY (fk_id_profesor)
	  REFERENCES colegio.profesor (id_profesor)
	  ON DELETE RESTRICT
	  ON UPDATE CASCADE
);

DROP TABLE IF EXISTS matricula;
CREATE TABLE matricula (
  id_matricula int unsigned auto_increment PRIMARY KEY,
  fk_id_alumno int unsigned NOT NULL,
  fk_id_asignatura int unsigned NOT NULL,
  nota int unsigned DEFAULT NULL,
   CONSTRAINT fk_id_alumno
	  FOREIGN KEY (fk_id_alumno)
	  REFERENCES colegio.alumnos (id_alumno)
	  ON DELETE RESTRICT
	  ON UPDATE CASCADE,
	CONSTRAINT fk_id_asignatura
	  FOREIGN KEY (fk_id_asignatura)
	  REFERENCES colegio.asignaturas (id_asignatura)
	  ON DELETE RESTRICT
	  ON UPDATE CASCADE      
);

INSERT INTO alumnos (nombre, apellido1, apellido2, fecha_nacimiento, activo, email) VALUES
('Inmaculada', 'Contreras', 'Iñiguez', '1977-03-12', 1, 'inmaculada.contreras@ejemplo.com'),
('Jaime', 'Conesa', 'Ponce', '2012-11-05', 1, 'jaime.conesa@ejemplo.com'),
('Manuel', 'Fernandez', 'Fernandez', '2004-07-21', 0, 'manuel.fernandez@ejemplo.com'),
('Marta', 'Guisado', 'Simon', '1982-02-14', 1, 'marta.guisado@ejemplo.com'),
('Monica', 'Jimenez', 'Gambin', '1985-09-30', 1, 'monica.jimenez@ejemplo.com'),
('Jesús', 'Lopez', 'De La Cruz', '1977-04-18', 1, 'jesus.lopez@ejemplo.com'),
('Ruben', 'Martin', 'Mendez', '2004-12-01', 1, 'ruben.martin@ejemplo.com'),
('Juan Manuel', 'Mudarra', 'Pozo', '1979-08-27', 0, 'juanmanuel.mudarra@ejemplo.com'),
('Victor', 'Outeiro', 'Romay', '1979-01-19', 1, 'victor.outeiro@ejemplo.com'),
('Carla', 'Pajuelo', 'Paniagua', '2004-05-10', 1, 'carla.pajuelo@ejemplo.com'),
('Roberto', 'Vazquez', 'Manrique', '2003-06-08', 1, 'roberto.vazquez@ejemplo.com'),
('Pablo', 'Almellones', 'Ramos', '2004-10-16', 1, 'pablo.almellones@ejemplo.com'),
('Miguel', 'Tavera', 'Fernandez', '2008-12-02', 1, 'miguel.tavera@ejemplo.com');

SELECT * FROM alumnos;

INSERT INTO profesor (`nombre_profesor`, `telefono`, `tipo_profesor`) VALUES ('Paqui Barrera', '628779541', 'sustituto');
INSERT INTO profesor (`nombre_profesor`) VALUES ('Manuel Lopez');
INSERT INTO profesor (`nombre_profesor`, `telefono`, `tipo_profesor`) VALUES ('Paco Peña', '628656862', 'titular');
INSERT INTO profesor (`nombre_profesor`, `telefono`) VALUES ('Lucia Dominguez', '555684622');
INSERT INTO profesor (`nombre_profesor`, `telefono`, `tipo_profesor`) VALUES ('Laura Diaz', '333555666', 'titular');

SELECT * FROM profesor;

INSERT INTO asignaturas (nombre_asignatura, horas, fk_id_profesor) VALUES 
('Matematicas', 550, 5),
('Lenguaje', 600, 4),
('Fisica', 200, 1),
('Quimica', 300, 1),
('Ingles', 500, 3),
('Diseño', 100, 4);

SELECT * FROM asignaturas;

INSERT INTO matricula (fk_id_alumno, fk_id_asignatura, nota) VALUES 
(1, 1, 4),
(1, 2, 5),
(2, 1, 7),
(2, 5, 3),
(4, 2, 9),
(4, 1, 7),
(6, 6, 8),
(6, 5, 6),
(9, 6, 5),
(9, 1, 4),
(10, 4, 6),
(10, 5, 8),
(12, 2, 7),
(12, 1, 5),
(13, 4, 4),
(13, 5, 4),
(4, 5, 8);




    -- Procedimientos almacenados
-- Crea los siguientes procedimientos en la base de datos colegio.
--    • Procedure sin parámetros listar_alumnos_menores:
-- Debe mostrar todos los alumnos menores de 18 años.
-- Debe mostrar nombre completo (usando CONCAT), fecha de nacimiento y edad aproximada calculada con DATEDIFF(NOW(), fecha_nacimiento) / 365.
-- El listado debe estar ordenado de menor a mayor edad (más joven primero).
DELIMITER //

CREATE PROCEDURE listar_alumnos_menores()
BEGIN
    SELECT
        CONCAT(nombre, ' ', apellido1, ' ', apellido2) AS nombre_completo,
        fecha_nacimiento,
        FLOOR(DATEDIFF(NOW(), fecha_nacimiento) / 365) AS edad_aproximada
    FROM alumnos
    WHERE (DATEDIFF(NOW(), fecha_nacimiento) / 365) < 18
    ORDER BY edad_aproximada ASC;
END //

DELIMITER ;

--    • Procedure sin parámetros resumen_asignaturas:
-- Debe mostrar, para cada asignatura que tenga alumnos, el nombre de la asignatura, el número de alumnos matriculados y la nota media redondeada a dos decimales.
-- Debe utilizar JOIN, GROUP BY, HAVING y ROUND.
-- Los resultados deben aparecer ordenados por nota media descendente.
DELIMITER //

CREATE PROCEDURE resumen_asignaturas()
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
END //

DELIMITER ;

--    • Procedure con parámetro notas_por_alumno (parámetro de entrada: id de alumno):
-- Debe mostrar, para el alumno indicado, su nombre completo, el nombre de cada asignatura y la nota final.
-- Debe incluir una columna adicional valoracion con el texto “Aprobado” si la nota es mayor o igual que 5 y “Suspenso” en caso contrario.
-- Debe ordenar los resultados por nota_final de mayor a menor.
DELIMITER //

CREATE PROCEDURE notas_por_alumno(IN p_id_alumno INT)
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
END //

DELIMITER ;


-- 1. Listar alumnos menores
CALL listar_alumnos_menores();

-- 2. Resumen de asignaturas
CALL resumen_asignaturas();

-- 3. Notas por alumno (ejemplo id_alumno = 3)
CALL notas_por_alumno(4);

-- UPDATE y DELETE
--    • Actualizar varias columnas: para el alumno con id_alumno = 3, cambia el email a nuevo_email3@email.com, cambia el primer apellido a “Ibañez” y establece el estado activo a 0 (inactivo), todo en una misma sentencia UPDATE.
UPDATE alumnos
SET 
    email = 'nuevo_email3@email.com',
    apellido1 = 'Ibañez',
    activo = 0
WHERE id_alumno = 3;
SELECT * FROM alumnos;

--    • Actualizar notas con condición: en la tabla matricula, aumenta en 1 punto la nota_final de todos los alumnos que tengan una nota inferior a 5 en alguna asignatura.
select * from matricula WHERE nota < 5;
SET SQL_SAFE_UPDATES = 0; -- Desactiva el modo seguro
UPDATE matricula
SET nota = (nota + 1)
WHERE nota < 5;
SET SQL_SAFE_UPDATES = 1; -- Activa el modo seguro
select * from matricula WHERE nota < 5;

--    • Revisa las normas de integridad que has definido y realiza una prueba de borrado sobre un registro “padre” que tenga registros “hijo” asociados (por ejemplo, borrar un profesor con asignaturas o un alumno con matrículas). Observa y explica qué ocurre en función de las opciones ON DELETE configuradas.
DELETE FROM profesor
WHERE id_profesor = 1;

DELETE FROM alumnos
WHERE id_alumno = 2;


