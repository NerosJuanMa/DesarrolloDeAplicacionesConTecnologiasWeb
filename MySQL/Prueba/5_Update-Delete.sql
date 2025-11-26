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
UPDATE matricula
SET nota = nota + 1
WHERE nota < 5;

--    • Revisa las normas de integridad que has definido y realiza una prueba de borrado sobre un registro “padre” que tenga registros “hijo” asociados (por ejemplo, borrar un profesor con asignaturas o un alumno con matrículas). Observa y explica qué ocurre en función de las opciones ON DELETE configuradas.
DELETE FROM profesor
WHERE id_profesor = 1;

DELETE FROM alumnos
WHERE id_alumno = 2;

