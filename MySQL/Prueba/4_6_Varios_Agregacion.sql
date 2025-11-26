-- JOIN + GROUP BY + HAVING y funciones de agregación
--    • Nota media por alumno: mostrar, para cada alumno con matrículas, su nombre, el número de matrículas y la nota media (AVG).
SELECT 
    a.nombre AS nombre_alumno,
    COUNT(m.id_matricula) AS num_matriculas,
    AVG(m.nota) AS nota_media
FROM alumnos a
JOIN matricula m
    ON a.id_alumno = m.fk_id_alumno
GROUP BY a.id_alumno, a.nombre;

--    • A partir de la consulta anterior, mostrar solo los alumnos con media superior a 7 y al menos dos matrículas, usando HAVING con COUNT y AVG.
SELECT 
    a.nombre AS nombre_alumno,
    COUNT(m.id_matricula) AS num_matriculas,
    AVG(m.nota) AS nota_media
FROM alumnos a
JOIN matricula m
    ON a.id_alumno = m.fk_id_alumno
GROUP BY a.id_alumno, a.nombre
HAVING AVG(m.nota) > 7 AND COUNT(m.id_matricula) >= 2;

--    • Número de alumnos por asignatura: mostrar para cada asignatura el nombre y el número de alumnos matriculados. Incluir únicamente asignaturas con al menos un alumno.
SELECT
    asig.nombre_asignatura,
    COUNT(m.fk_id_alumno) AS num_alumnos
FROM asignaturas asig
JOIN matricula m
    ON asig.id_asignatura = m.fk_id_asignatura
GROUP BY asig.id_asignatura, asig.nombre_asignatura;

--    • Mostrar el número total de alumnos activos e inactivos: agrupar por el campo activo y contar cuántos alumnos hay en cada estado.
SELECT
    activo,
    COUNT(*) AS num_alumnos
FROM alumnos
GROUP BY activo;

--    • Mostrar, para cada profesor con asignaturas, su nombre, el número de asignaturas que imparte, la suma total de horas y la media de horas por asignatura.
SELECT
    p.nombre_profesor,
    COUNT(asig.id_asignatura) AS num_asignaturas,
    SUM(asig.horas) AS total_horas,
    AVG(asig.horas) AS media_horas
FROM profesor p
JOIN asignaturas asig
    ON p.id_profesor = asig.fk_id_profesor
GROUP BY p.id_profesor, p.nombre_profesor;

--    • Mostrar, para cada asignatura con alumnos, el nombre de la asignatura, la nota máxima y la nota mínima.
SELECT
    asig.nombre_asignatura,
    MAX(m.nota) AS nota_maxima,
    MIN(m.nota) AS nota_minima
FROM asignaturas asig
JOIN matricula m
    ON asig.id_asignatura = m.fk_id_asignatura
GROUP BY asig.id_asignatura, asig.nombre_asignatura;

--    • Mostrar un resumen global de la tabla matricula (sin GROUP BY): número total de matrículas, nota media general, nota más alta y nota más baja.
SELECT
    COUNT(*) AS total_matriculas,
    AVG(nota) AS nota_media_general,
    MAX(nota) AS nota_maxima,
    MIN(nota) AS nota_minima
FROM matricula;

--    • Mostrar, para cada asignatura con alumnos matriculados, el nombre de la asignatura, el número de alumnos matriculados y la nota media redondeada a dos decimales. Incluye solo asignaturas que tengan al menos dos alumnos.
SELECT
    asig.nombre_asignatura,
    COUNT(m.fk_id_alumno) AS num_alumnos,
    ROUND(AVG(m.nota), 2) AS nota_media
FROM asignaturas asig
JOIN matricula m
    ON asig.id_asignatura = m.fk_id_asignatura
GROUP BY asig.id_asignatura, asig.nombre_asignatura
HAVING COUNT(m.fk_id_alumno) >= 2;
