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
CALL notas_por_alumno(1);

