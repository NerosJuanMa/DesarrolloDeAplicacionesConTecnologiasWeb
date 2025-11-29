DROP SCHEMA IF EXISTS cursos;
CREATE SCHEMA cursos;
use cursos;

DROP TABLE IF EXISTS especialidad;
CREATE TABLE especialidad (
  id_especialidad int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre varchar(50)  DEFAULT NULL,
  familia varchar(50)  DEFAULT NULL,
  aplicaciones text 
);

DROP TABLE IF EXISTS empresas;
CREATE TABLE empresas (
  id_empresa int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  nombre varchar(50)  DEFAULT NULL,
  ubicacion varchar(50)  DEFAULT NULL,
  telefono int DEFAULT NULL,
  web varchar(50)  DEFAULT NULL,
  email varchar(50)  DEFAULT NULL,
  persona_contacto varchar(50)  DEFAULT NULL,
  mobil_contacto int DEFAULT NULL
);

DROP TABLE IF EXISTS practicas;
CREATE TABLE practicas (
  id_practica int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_empresa int NOT NULL,
  duracion varchar(10)  DEFAULT NULL,
  feedback text ,
  aptitudes_adquiridas text ,
  observaciones text ,
  CONSTRAINT FK_id_empresa
	  FOREIGN KEY (id_empresa)
	  REFERENCES cursos.empresas (id_empresa)
	  ON DELETE RESTRICT
	  ON UPDATE CASCADE
);


DROP TABLE IF EXISTS cursos;
CREATE TABLE cursos (
  id_curso int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_especialidad int DEFAULT NULL ,
  nombre_curso varchar(150)  DEFAULT NULL,
  fecha_realizacion varchar(50)  DEFAULT NULL,
  FechaCalculadaAño year DEFAULT NULL,
  practicas tinyint(1) DEFAULT NULL,
  id_practicas int DEFAULT NULL ,
  duracion_curso varchar(50)  DEFAULT NULL,
  conocimientos_adquiridos varchar(500)  DEFAULT NULL,
  Centro_Estudio varchar(50)  DEFAULT NULL,
  CONSTRAINT FK_id_especialidad
	  FOREIGN KEY (id_especialidad)
	  REFERENCES cursos.especialidad (id_especialidad)
	  ON DELETE RESTRICT
	  ON UPDATE CASCADE,
  CONSTRAINT FK_id_practicas
	  FOREIGN KEY (id_practicas)
	  REFERENCES cursos.practicas (id_practica)
	  ON DELETE RESTRICT
	  ON UPDATE CASCADE
) ;

DROP TABLE IF EXISTS apuntes;
CREATE TABLE apuntes (
  id_apunte int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  id_curso int DEFAULT NULL ,
  modulo varchar(10)  DEFAULT NULL,
  unidad_formativa varchar(10)  DEFAULT NULL,
  tema varchar(50)  DEFAULT NULL,
  pdf longblob,
  resumen text, 
  CONSTRAINT FK_id_curso
	  FOREIGN KEY (id_curso)
	  REFERENCES cursos.cursos (id_curso)
	  ON DELETE RESTRICT
	  ON UPDATE CASCADE  
) ;



--- Comprueba el motor de cada tabla:
SHOW TABLE STATUS WHERE Name='cursos';
SHOW TABLE STATUS WHERE Name='especialidad';
SHOW TABLE STATUS WHERE Name='apuntes';
SHOW TABLE STATUS WHERE Name='empresas';
SHOW TABLE STATUS WHERE Name='practicas';

