-- ============================================
-- ROUND 8: Add ONLY missing achievement texts
-- ============================================
-- Adding only the achievement (logros) texts that are still hardcoded
-- Article texts were already added in add-final-hardcoded-texts.sql
-- ============================================

-- ============================================
-- ACHIEVEMENTS SECTION (LogrosCombinados)
-- ============================================

-- Achievement 1: 28 años
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('logro_28_etiqueta', 'achievements', 'años', 'activo'),
('logro_28_descripcion', 'achievements', 'trayectoria como Programa Radial en Radio Cultura desde sus inicios.', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- Achievement 2: 24.200 adolescentes y jóvenes
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('logro_24200_etiqueta', 'achievements', 'adolescentes y jóvenes', 'activo'),
('logro_24200_descripcion', 'achievements', 'participaron de 18 provincias y distrito federal', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- Achievement 3: 60 Colegios
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('logro_60_etiqueta', 'achievements', 'Colegios', 'activo'),
('logro_60_descripcion', 'achievements', 'públicos, privados y de distintas confesiones religiosas participaron con sus alumnos secundarios teniendo a cargo la producción y conducción de un espacio.', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- Achievement 4: 20 Universidades
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('logro_20_etiqueta', 'achievements', 'Universidades', 'activo'),
('logro_20_descripcion', 'achievements', 'públicas y privadas de distintas provincias de la Argentina participan por medio de sus alumnos en el programa radial y en los distintos proyectos que realizamos.', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- Achievement 5: 50 ONGs
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('logro_50_etiqueta', 'achievements', 'ONGs', 'activo'),
('logro_50_descripcion', 'achievements', 'dedicadas a la educación, la inclusión laboral, la discapacidad, la inclusión social, el emprendedorismo, la oferta de capacitaciones son aliadas nuestras.', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- Achievement 6: 3 Automóviles
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('logro_3_etiqueta', 'achievements', 'Automóviles', 'activo'),
('logro_3_descripcion', 'achievements', 'último modelo, donamos a Escuelas Técnicas de Salta, Mendoza y San Miguel del Monte (Pcia. de Bs. As.) en alianza con GM, Citroën y Peugeot.', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- Achievement 7: 1.200 Jóvenes
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('logro_1200_etiqueta', 'achievements', 'Jóvenes', 'activo'),
('logro_1200_descripcion', 'achievements', 'participaron en las Salidas Integradoras e Inclusivas (Cines Debate, Salidas al Teatro, Museos, Conciertos, Eventos solidarios, académicos, para el empleo, etc) con alumnos de 5to año del secundario, estudiantes universitarios y jóvenes profesionales de distintas realidades socioeconómicas, en forma gratuita gracias al apoyo de empresas.', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- Achievement 8: 15 Capacitaciones
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('logro_15_etiqueta', 'achievements', 'Capacitaciones', 'activo'),
('logro_15_descripcion', 'achievements', 'en Oratoria y Comunicación Corporal', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- Achievement 9: 2.200 Niños y niñas (cine)
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('logro_2200_etiqueta', 'achievements', 'Niños y niñas', 'activo'),
('logro_2200_descripcion', 'achievements', 'que nunca fueron al cine, participaron en las Funciones Solidarias de Cine Debate de Metegol (desde los valores con el Equipo que hizo la película) gracias a J. J. Campanella y empresas.', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- Achievement 10: 10 Encuentros Nacionales
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('logro_10_etiqueta', 'achievements', 'Encuentros Nacionales', 'activo'),
('logro_10_descripcion', 'achievements', 'de Jóvenes Líderes, participaron 100 jóvenes que son primeros estudiantes universitarios de sus familias, de 16 provincias de Argentina con el apoyo del Departamento de Estado de EEUU, su embajada en Argentina, la Fundación Konrad Adenauer y en alianza con empresas y ONGs', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- Achievement 11: 150 Plantación de árboles
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('logro_150_arboles_etiqueta', 'achievements', 'Plantación de árboles', 'activo'),
('logro_150_arboles_descripcion', 'achievements', 'frutales en Escuelas y ONGs de distintos rincones de Argentina, liderados por 25 jóvenes líderes (que son los primeros universitarios de sus familias) para inspirar a alumnos secundarios. Ya se plantaron 57 en La Pampa, en Florencio Varela, y San Miguel, Pcia. De Bs. As. y Misiones.', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- Achievement 12: 150 Niños y niñas (hogares) - etiqueta only (description already exists as logro_ninos_hogares_description)
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('logro_150_ninos_etiqueta', 'achievements', 'Niños y niñas', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- Link text for videos
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('logro_link_video', 'achievements', 'Ver video', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- ============================================
-- CANAL 7 ARTICLE - Full text paragraphs (missing from previous scripts)
-- ============================================

INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('prensa_canal7_full_p1', 'press', 'a presentar por Canal 7, nuevos Protagonistas de La Segunda Argentina. En esta edición, alumnos del Colegio E.M.E.M Nº1 Distrito Escolar Nº 13, VILLA LUGANO participantes del programa radial Jóvenes en acción, tratan el tema de la violencia y la discriminación, algo con lo cual tienen que convivir mientras se esfuerzan por estudiar y trabajar y, en algunos casos de madres solteras, cuidar también de sus hijos.', 'activo'),

('prensa_canal7_full_p2', 'press', 'Participó también Carmen Sicardi, Directora del Programa Jóvenes en Acción y algunos de los jóvenes ganadores del 1er Concurso Literario de JOVENES EN ACCION sobre el tema ¿Qué país queremos tener los jóvenes?', 'activo'),

('prensa_canal7_full_p3', 'press', 'En la parte final del programa, chicos con capacidades especiales pertenecientes a la Escuela NUESTRA LUZ tuvieron a su cargo la parte más emotiva del programa cuando interpretan una canción creada por ellos cuyo tema es en contra de la violencia y que idearon especialmente para el programa radial que realizaron.', 'activo'),

('prensa_canal7_full_p4', 'press', 'El mensaje que trajeron los chicos al programa es que quieren decir basta de violencia en todas sus manifestaciones y propuestas para construir un país mejor.', 'activo'),

('prensa_canal7_full_p5', 'press', 'Como en todos los programas al final del mismo todos los participantes recibieron un pasaporte que los acredita como ciudadanos de La Segunda Argentina y que tiene como propósito invitarlos a conocer el Monumento Nacional a la Bandera, en Rosario, que fue construido simbolizando a la Patria como una nave imaginaria viajando hacia su destino de grandeza.', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- ============================================
-- SUMMARY
-- ============================================
-- Total new texts: ~28
-- - 11 achievements x 2 fields (etiqueta + descripcion) = 22 texts
-- - 1 link text (Ver video)
-- - 5 Canal 7 article paragraphs
-- ============================================
