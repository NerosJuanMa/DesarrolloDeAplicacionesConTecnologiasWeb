-- Creación de dos vistas 
-- Crea dos vistas que faciliten la consulta de información habitual del sistema académico. Cada vista deberá estar correctamente nombrada, incluir únicamente las columnas necesarias y basarse en las tablas creadas previamente (alumnos, profesor, asignaturas y matrícula).

--     • Vista 1: Vista de alumnos con su nota media
-- Diseña y crea una vista que muestre para cada alumno que tenga al menos una matrícula:
-- • el identificador del alumno
-- • su nombre completo (mediante CONCAT)
-- • el número total de asignaturas en las que está matriculado
-- • su nota media (AVG de nota_final)
-- Condiciones:
    -- • Solo deben aparecer alumnos que tengan matrículas (los inactivos sin matrículas no deben salir).
    -- • La vista debe calcular la media directamente, sin necesidad de consultas externas.
    -- • La nota media debe mostrarse con dos decimales.
-- Usando la vista vista_alumnos_nota_media, muestra únicamente los alumnos que tengan:
-- nota media mayor o igual que 7 y estén matriculados en 3 o más asignaturas

CREATE OR REPLACE VIEW vista_alumnos_nota_media AS
SELECT
    a.id_alumno,
    CONCAT(a.nombre, ' ', a.apellido1, ' ', a.apellido2) AS nombre_completo,
    COUNT(m.fk_id_asignatura) AS total_asignaturas,
    ROUND(AVG(m.nota), 2) AS nota_media
FROM alumnos a

JOIN matricula m
    ON a.id_alumno = m.fk_id_alumno
    WHERE a.activo = 1
GROUP BY a.id_alumno, a.nombre, a.apellido1, a.apellido2
HAVING COUNT(m.fk_id_asignatura) > 0;


SELECT *
FROM vista_alumnos_nota_media;

SELECT *
FROM vista_alumnos_nota_media
WHERE nota_media >= 7
  AND total_asignaturas >= 3;


--    • Vista 2: Vista de asignaturas con información del profesor
-- Diseña y crea una vista que muestre para cada asignatura:
    -- • el nombre de la asignatura
    -- • su número de horas
    -- • el nombre completo del profesor responsable
    -- • el tipo de profesor (titular, interino, sustituto)
-- Condiciones:
    -- • La vista debe unir asignaturas con profesores.
    -- • Debe mostrar todas las asignaturas, incluso aquellas sin alumnos matriculados.
	-- • El nombre del profesor debe aparecer formateado con CONCAT.
	-- A partir de la vista vista_asignaturas_profesor, muestra cuántas asignaturas imparte cada tipo de profesor (TITULAR, INTERINO, SUSTITUTO).
    
CREATE OR REPLACE VIEW vista_asignaturas_profesor AS
SELECT
    asig.nombre_asignatura,
    asig.horas,
    CONCAT(p.nombre_profesor) AS nombre_profesor,
    p.tipo_profesor
FROM asignaturas asig
LEFT JOIN profesor p
    ON asig.fk_id_profesor = p.id_profesor;

SELECT * 
FROM vista_asignaturas_profesor;

SELECT
    tipo_profesor,
    COUNT(nombre_asignatura) AS numero_de_asignaturas
FROM
    vista_asignaturas_profesor
GROUP BY
    tipo_profesor;