DROP DATABASE IF EXISTS colegio;
CREATE DATABASE  IF NOT EXISTS colegio; 
USE colegio;

DROP TABLE IF EXISTS alumnos;
CREATE TABLE alumnos (
  id_alumno int unsigned auto_increment PRIMARY KEY,
  nombre varchar(50) NOT NULL,
  apellido1 varchar(50) DEFAULT NULL,
  apellido2 varchar(50) DEFAULT NULL,
  fecha_nacimiento date NOT NULL,
  activo bool DEFAULT 1,
  email varchar(150) NOT NULL UNIQUE   
);

DROP TABLE IF EXISTS profesor;
CREATE TABLE profesor (
  id_profesor int unsigned auto_increment PRIMARY KEY,
  nombre_profesor varchar(100) NOT NULL,
  telefono int DEFAULT NULL,
  tipo_profesor ENUM('interino', 'titular', 'sustituto') DEFAULT 'interino'
);

DROP TABLE IF EXISTS asignaturas;
CREATE TABLE asignaturas (
  id_asignatura int unsigned auto_increment PRIMARY KEY,
  nombre_asignatura varchar(50) NOT NULL,
  horas int unsigned NOT NULL,
  fk_id_profesor int unsigned DEFAULT NULL,
  CONSTRAINT fk_id_profesor
	  FOREIGN KEY (fk_id_profesor)
	  REFERENCES colegio.profesor (id_profesor)
	  ON DELETE RESTRICT
	  ON UPDATE CASCADE
);

DROP TABLE IF EXISTS matricula;
CREATE TABLE matricula (
  id_matricula int unsigned auto_increment PRIMARY KEY,
  fk_id_alumno int unsigned NOT NULL,
  fk_id_asignatura int unsigned NOT NULL,
  nota int unsigned DEFAULT NULL,
   CONSTRAINT fk_id_alumno
	  FOREIGN KEY (fk_id_alumno)
	  REFERENCES colegio.alumnos (id_alumno)
	  ON DELETE RESTRICT
	  ON UPDATE CASCADE,
	CONSTRAINT fk_id_asignatura
	  FOREIGN KEY (fk_id_asignatura)
	  REFERENCES colegio.asignaturas (id_asignatura)
	  ON DELETE RESTRICT
	  ON UPDATE CASCADE      
);


