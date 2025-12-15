use colegio;
-- Buscar alumnos inactivos sin asignaturas.
select * from alumnos where (activo =0);

-- Localizar profesores sin asignaturas.
SELECT p.*
FROM profesor p
LEFT JOIN asignaturas a
    ON p.id_profesor = a.fk_id_profesor
WHERE a.id_asignatura IS NULL;

-- Localizar asignaturas sin alumnos.
SELECT a.*
FROM asignaturas a
LEFT JOIN matricula m
    ON a.id_asignatura = m.fk_id_asignatura
WHERE m.id_matricula IS NULL;

-- Calcular medias de notas por alumno y por asignatura usando AVG y GROUP BY.
SELECT 
    a.id_alumno,
    a.nombre,
    a.apellido1,
    a.apellido2,
    AVG(m.nota) AS nota_media
FROM alumnos a
JOIN matricula m
    ON a.id_alumno = m.fk_id_alumno
GROUP BY a.id_alumno, a.nombre, a.apellido1, a.apellido2;

SELECT
    asig.id_asignatura,
    asig.nombre_asignatura,
    AVG(m.nota) AS nota_media
FROM asignaturas asig
JOIN matricula m
    ON asig.id_asignatura = m.fk_id_asignatura
GROUP BY asig.id_asignatura, asig.nombre_asignatura;

-- asignaturas sin alumnos matriculados se usa LEFT JOIN
SELECT
    asig.id_asignatura,
    asig.nombre_asignatura,
    AVG(m.nota) AS nota_media
FROM asignaturas asig
LEFT JOIN matricula m
    ON asig.id_asignatura = m.fk_id_asignatura
GROUP BY asig.id_asignatura, asig.nombre_asignatura;

-- Alumnos mayores de 18 años
SELECT *
FROM alumnos
WHERE TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE()) >= 18;

-- Alumnos entre 16 y 20 años
SELECT *
FROM alumnos
WHERE TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE()) BETWEEN 16 AND 20;

-- Alumnos menores de 15 años
SELECT *
FROM alumnos
WHERE TIMESTAMPDIFF(YEAR, fecha_nacimiento, CURDATE()) < 15;

-- Filtrar alumnos por estado (activo / inactivo)
-- Alumnos ACTIVOS
SELECT *
FROM alumnos
WHERE activo = 1;

-- Alumnos INACTIVOS
SELECT *
FROM alumnos
WHERE activo = 0;

-- Filtrar alumnos por nota media
-- Alumnos con nota media mayor o igual que 7
SELECT 
    a.id_alumno,
    a.nombre,
    a.apellido1,
    a.apellido2,
    AVG(m.nota) AS nota_media
FROM alumnos a
JOIN matricula m ON a.id_alumno = m.fk_id_alumno
GROUP BY a.id_alumno, a.nombre, a.apellido1, a.apellido2
HAVING AVG(m.nota) >= 7;

-- Alumnos con nota media menor que 5
SELECT 
    a.id_alumno,
    a.nombre,
    a.apellido1,
    a.apellido2,
    AVG(m.nota) AS nota_media
FROM alumnos a
JOIN matricula m ON a.id_alumno = m.fk_id_alumno
GROUP BY a.id_alumno, a.nombre, a.apellido1, a.apellido2
HAVING AVG(m.nota) < 5;

-- Alumnos con nota media entre 6 y 8
SELECT 
    a.id_alumno,
    a.nombre,
    a.apellido1,
    a.apellido2,
    AVG(m.nota) AS nota_media
FROM alumnos a
JOIN matricula m ON a.id_alumno = m.fk_id_alumno
GROUP BY a.id_alumno, a.nombre, a.apellido1, a.apellido2
HAVING AVG(m.nota) BETWEEN 6 AND 8;

