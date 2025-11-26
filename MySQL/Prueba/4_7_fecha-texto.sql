-- Funciones de fecha y texto
--    • Realiza una consulta sobre la tabla alumnos que muestre únicamente a los alumnos menores de 18 años. Debe incluir:
-- nombre completo (usando CONCAT de nombre y apellidos)
-- fecha de nacimiento
-- edad aproximada en años calculada con DATEDIFF(NOW(), fecha_nacimiento) / 365.
-- Filtra para que solo aparezcan alumnos cuya edad calculada sea menor de 18 años.

SELECT
    CONCAT(nombre, ' ', apellido1, ' ', apellido2) AS nombre_completo,
    fecha_nacimiento,
    FLOOR(DATEDIFF(NOW(), fecha_nacimiento) / 365) AS edad_aproximada
FROM alumnos
WHERE (DATEDIFF(NOW(), fecha_nacimiento) / 365) < 18;

