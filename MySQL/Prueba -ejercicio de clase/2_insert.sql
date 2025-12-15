INSERT INTO alumnos (nombre, apellido1, apellido2, fecha_nacimiento, activo, email) VALUES
('Inmaculada', 'Contreras', 'Iñiguez', '1977-03-12', 1, 'inmaculada.contreras@ejemplo.com'),
('Jaime', 'Conesa', 'Ponce', '2012-11-05', 1, 'jaime.conesa@ejemplo.com'),
('Manuel', 'Fernandez', 'Fernandez', '2004-07-21', 0, 'manuel.fernandez@ejemplo.com'),
('Marta', 'Guisado', 'Simon', '1982-02-14', 1, 'marta.guisado@ejemplo.com'),
('Monica', 'Jimenez', 'Gambin', '1985-09-30', 1, 'monica.jimenez@ejemplo.com'),
('Jesús', 'Lopez', 'De La Cruz', '1977-04-18', 1, 'jesus.lopez@ejemplo.com'),
('Ruben', 'Martin', 'Mendez', '2004-12-01', 1, 'ruben.martin@ejemplo.com'),
('Juan Manuel', 'Mudarra', 'Pozo', '1979-08-27', 0, 'juanmanuel.mudarra@ejemplo.com'),
('Victor', 'Outeiro', 'Romay', '1979-01-19', 1, 'victor.outeiro@ejemplo.com'),
('Carla', 'Pajuelo', 'Paniagua', '2004-05-10', 1, 'carla.pajuelo@ejemplo.com'),
('Roberto', 'Vazquez', 'Manrique', '2003-06-08', 1, 'roberto.vazquez@ejemplo.com'),
('Pablo', 'Almellones', 'Ramos', '2004-10-16', 1, 'pablo.almellones@ejemplo.com'),
('Miguel', 'Tavera', 'Fernandez', '2008-12-02', 1, 'miguel.tavera@ejemplo.com');

SELECT * FROM alumnos;

INSERT INTO profesor (`nombre_profesor`, `telefono`, `tipo_profesor`) VALUES ('Paqui Barrera', '628779541', 'sustituto');
INSERT INTO profesor (`nombre_profesor`) VALUES ('Manuel Lopez');
INSERT INTO profesor (`nombre_profesor`, `telefono`, `tipo_profesor`) VALUES ('Paco Peña', '628656862', 'titular');
INSERT INTO profesor (`nombre_profesor`, `telefono`) VALUES ('Lucia Dominguez', '555684622');
INSERT INTO profesor (`nombre_profesor`, `telefono`, `tipo_profesor`) VALUES ('Laura Diaz', '333555666', 'titular');

SELECT * FROM profesor;

INSERT INTO asignaturas (nombre_asignatura, horas, fk_id_profesor) VALUES 
('Matematicas', 550, 5),
('Lenguaje', 600, 4),
('Fisica', 200, 1),
('Quimica', 300, 1),
('Ingles', 500, 3),
('Diseño', 100, 4);

SELECT * FROM asignaturas;

INSERT INTO matricula (fk_id_alumno, fk_id_asignatura, nota) VALUES 
(1, 1, 4),
(1, 2, 5),
(2, 1, 7),
(2, 5, 3),
(4, 2, 9),
(4, 1, 7),
(6, 6, 8),
(6, 5, 6),
(9, 6, 5),
(9, 1, 4),
(10, 4, 6),
(10, 5, 8),
(12, 2, 7),
(12, 1, 5),
(13, 4, 4),
(13, 5, 4),
(4, 5, 8);

SELECT * FROM matricula;
