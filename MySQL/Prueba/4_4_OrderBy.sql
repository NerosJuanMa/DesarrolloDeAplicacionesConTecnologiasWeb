-- ORDER BY
--    • Mostrar todos los alumnos ordenados alfabéticamente por nombre.
SELECT *
FROM alumnos
ORDER BY nombre ASC;

--    • Mostrar los alumnos ordenados primero por apellido1 y, en caso de coincidencia, por apellido2.
SELECT *
FROM alumnos
ORDER BY apellido1 ASC, apellido2 ASC;

--    • Mostrar únicamente el nombre de los alumnos, ordenándolos por fecha_nacimiento de mayor a menor (más joven primero). La columna fecha_nacimiento no debe aparecer en el SELECT.
SELECT nombre
FROM alumnos
ORDER BY fecha_nacimiento DESC;

--    • Mostrar las asignaturas ordenadas alfabéticamente por nombre en orden descendente.
SELECT *
FROM asignaturas
ORDER BY nombre_asignatura DESC;

--    • Mostrar todas las matrículas ordenadas por nota_final de mayor a menor.
SELECT *
FROM matricula
ORDER BY nota DESC;
