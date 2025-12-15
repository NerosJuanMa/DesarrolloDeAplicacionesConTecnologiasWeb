-- Consultas básicas SELECT
-- 1. Mostrar todos los datos de la tabla alumnos
SELECT *
FROM alumnos;

-- 2. Mostrar sólo los alumnos activos (campo activo = 1)
SELECT *
FROM alumnos
WHERE activo = 1;

-- 3. Mostrar los tres primeros profesores registrados (Usamos LIMIT 3)

SELECT *
FROM profesor
ORDER BY id_profesor
LIMIT 3;

-- 4. De la tabla matricula, mostrar campos renombrados y literal “Excelente” si nota >= 9
SELECT 
    fk_id_alumno AS alumno,
    fk_id_asignatura AS asignatura,
    nota AS calificacion,
    'Excelente' AS valoracion
FROM matricula
WHERE nota >= 9;

-- 5. Mostrar alumnos que cumplan al menos una de estas condiciones:

--  Están activos
--  Nacieron después de 2005

SELECT *
FROM alumnos
WHERE activo = 1
   OR fecha_nacimiento > '2005-12-31';
   

-- 6. De la tabla matricula, mostrar columnas calculadas

-- nota_doble = nota × 2

-- nota_incrementada = nota + 1.5

SELECT
    fk_id_alumno AS id_alumno,
    fk_id_asignatura AS id_asignatura,
    nota AS nota_final,
    nota * 2 AS nota_doble,
    nota + 1.5 AS nota_incrementada
FROM matricula;
