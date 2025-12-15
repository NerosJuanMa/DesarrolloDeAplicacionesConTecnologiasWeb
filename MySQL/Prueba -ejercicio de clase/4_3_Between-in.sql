-- BETWEEN e IN
	-- • Mostrar id_alumno, id_asignatura y nota_final de las filas de matricula donde la nota esté entre 5 y 8 (ambos inclusive).
SELECT
    fk_id_alumno AS id_alumno,
    fk_id_asignatura AS id_asignatura,
    nota AS nota_final
FROM matricula
WHERE nota BETWEEN 5 AND 8;

	-- • Mostrar id_alumno, id_asignatura y nota_final de las matrículas correspondientes a un conjunto de asignaturas concreto (por ejemplo, ids 1, 2 y 4), usando IN.
SELECT
    fk_id_alumno AS id_alumno,
    fk_id_asignatura AS id_asignatura,
    nota AS nota_final
FROM matricula
WHERE fk_id_asignatura IN (1, 2, 4);
