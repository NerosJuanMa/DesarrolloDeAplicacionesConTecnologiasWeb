-- JOIN y LEFT JOIN
--    • Consulta con INNER JOIN: mostrar únicamente los alumnos que estén matriculados en alguna asignatura. Debe mostrarse el nombre del alumno, el nombre de la asignatura y la nota_final.
SELECT 
    a.nombre AS nombre_alumno,
    asig.nombre_asignatura,
    m.nota AS nota_final
FROM alumnos a
INNER JOIN matricula m
    ON a.id_alumno = m.fk_id_alumno
INNER JOIN asignaturas asig
    ON m.fk_id_asignatura = asig.id_asignatura;

--    • Consulta con LEFT JOIN desde alumnos hacia matricula: mostrar todos los alumnos junto con sus asignaturas si las tienen. Debe aparecer el nombre del alumno, el id_asignatura y la nota_final. Los alumnos sin matrículas deben aparecer igualmente, con los campos de asignatura y nota vacíos.
SELECT 
    a.nombre AS nombre_alumno,
    m.fk_id_asignatura,
    m.nota AS nota_final
FROM alumnos a
LEFT JOIN matricula m
    ON a.id_alumno = m.fk_id_alumno;

--    • Consulta con LEFT JOIN desde profesor hacia asignaturas: mostrar todos los profesores y las asignaturas que imparten (si las tienen). Debe aparecer el nombre del profesor y el nombre de la asignatura; debe ser posible identificar a los profesores sin asignaturas.
SELECT 
    p.nombre_profesor,
    asig.nombre_asignatura
FROM profesor p
LEFT JOIN asignaturas asig
    ON p.id_profesor = asig.fk_id_profesor;

