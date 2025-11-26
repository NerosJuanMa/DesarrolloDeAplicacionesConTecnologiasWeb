-- Consultas con LIKE 
	-- • alumnos cuyo nombre empieza por una letra concreta
SELECT *
FROM alumnos
WHERE nombre LIKE 'M%';
	-- • alumnos cuyo primer apellido termina en una letra concreta
SELECT *
FROM alumnos
WHERE apellido1 LIKE '%z';

    -- • alumnos cuyo email contenga una subcadena concreta (ajústalo para que al menos aparezca un resultado).
SELECT *
FROM alumnos
WHERE email LIKE '%man%';

    
    