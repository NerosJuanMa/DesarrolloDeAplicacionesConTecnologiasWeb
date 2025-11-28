
INSERT INTO cursos (id_curso, id_especialidad, nombre_curso, fecha_realizacion, FechaCalculadaAño, practicas, id_practicas, duracion_curso, conocimientos_adquiridos, Centro_Estudio) VALUES
(1, 2, 'Técnico en Ofimática', 'JUL. 1999', '1999', 0, NULL, '184 horas', NULL, 'Instituto Informático Hispalense'),
(2, 3, 'TÉCNICO EN EQUIPOS INFORMÁTICOS', 'JUN. 2001 ', '2001', 0, NULL, '171 horas', NULL, 'Instituto Informático Hispalense'),
(3, 4, 'TECNICO AUXILIAR DE DISEÑO GRAFICO', 'OCT.03- MAY.04', '2004', 0, NULL, '630 horas.', 'Diseño gráfico, composición, reproducción gráfica, ilustración', 'B.C. PROYECTOS Y SISTEMAS DE CONTROL, S.C.'),
(4, 4, 'DISEÑO DE PAGINAS WEB', 'ENE.- ABR. 2005 ', '2005', 0, NULL, '300 horas', 'Diseño multimedia', 'ACADEMIA E.A.I.G'),
(7, 5, 'TRÁMITES DE CONSTITUCIÓN DEL EMPRESARIO INDIVIDUAL', 'JUN. 2005', '2005', 0, NULL, '8 horas ', 'Pequeña empresa e iniciativa emprendedora ', 'FUNDACIÓN FORJA XXI'),
(8, 5, 'DERECHOS Y OBLIGACIONES, CONTROL DE INGRESOS Y GASTOS DEL EMPRESARIO INDIVIDUAL', 'JUN. 2005', '2005', 0, NULL, '6 horas', 'Pequeña empresa e iniciativa emprendedora ', 'FUNDACIÓN FORJA XXI'),
(9, 1, 'F.P.E. PROGRAMACION PARA SOLUCIONES DE IOT Y SMART CITY APLICABLES A ENTORNOS 5G, (IFCD97)', 'MAY. 2023 — JUN. 2023', '2023', 0, NULL, '150 horas.', 'Formación en tecnología 5G', ' VODAFONE ESPAÑA & INTEGRA CONOCIMIENT');

INSERT INTO especialidad (id_especialidad, nombre, familia, aplicaciones) VALUES
(1, '5G', 'Informatica', NULL),
(2, 'Ofimatica', 'Administracion', 'Escribir cartas, etc.'),
(3, 'Tecnico Hardware', 'Informatica', NULL),
(4, 'Diseño Gráfico', 'Diseño', NULL),
(5, 'Empresa', 'Administracion', 'Creacion de empresa, tramites, decrechos y obligaciones');

INSERT INTO empresas (id_empresa, nombre, ubicacion, telefono, web, email, persona_contacto, mobil_contacto) VALUES
(1, 'Laybet', 'Sevilla', NULL, NULL, NULL, 'Laybet Colmenares', NULL);
