-- ============================================
-- ROUND 8: Add ALL remaining hardcoded texts from About Us page
-- ============================================
-- This includes:
-- 1. All 11 achievement items (etiqueta + descripcion + link_texto)
-- 2. Full article text "La voz de los chicos comprometidos"
-- 3. Full article text "Jóvenes en acción en Canal 7"
-- 4. Article metadata (author, source)
-- ============================================

-- ============================================
-- ACHIEVEMENTS SECTION (LogrosCombinados)
-- ============================================

-- Achievement 1: 28 años
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('logro_28_etiqueta', 'achievements', 'años', 'activo'),
('logro_28_descripcion', 'achievements', 'trayectoria como Programa Radial en Radio Cultura desde sus inicios.', 'activo');

-- Achievement 2: 24.200 adolescentes y jóvenes
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('logro_24200_etiqueta', 'achievements', 'adolescentes y jóvenes', 'activo'),
('logro_24200_descripcion', 'achievements', 'participaron de 18 provincias y distrito federal', 'activo');

-- Achievement 3: 60 Colegios
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('logro_60_etiqueta', 'achievements', 'Colegios', 'activo'),
('logro_60_descripcion', 'achievements', 'públicos, privados y de distintas confesiones religiosas participaron con sus alumnos secundarios teniendo a cargo la producción y conducción de un espacio.', 'activo');

-- Achievement 4: 20 Universidades
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('logro_20_etiqueta', 'achievements', 'Universidades', 'activo'),
('logro_20_descripcion', 'achievements', 'públicas y privadas de distintas provincias de la Argentina participan por medio de sus alumnos en el programa radial y en los distintos proyectos que realizamos.', 'activo');

-- Achievement 5: 50 ONGs
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('logro_50_etiqueta', 'achievements', 'ONGs', 'activo'),
('logro_50_descripcion', 'achievements', 'dedicadas a la educación, la inclusión laboral, la discapacidad, la inclusión social, el emprendedorismo, la oferta de capacitaciones son aliadas nuestras.', 'activo');

-- Achievement 6: 3 Automóviles
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('logro_3_etiqueta', 'achievements', 'Automóviles', 'activo'),
('logro_3_descripcion', 'achievements', 'último modelo, donamos a Escuelas Técnicas de Salta, Mendoza y San Miguel del Monte (Pcia. de Bs. As.) en alianza con GM, Citroën y Peugeot.', 'activo');

-- Achievement 7: 1.200 Jóvenes
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('logro_1200_etiqueta', 'achievements', 'Jóvenes', 'activo'),
('logro_1200_descripcion', 'achievements', 'participaron en las Salidas Integradoras e Inclusivas (Cines Debate, Salidas al Teatro, Museos, Conciertos, Eventos solidarios, académicos, para el empleo, etc) con alumnos de 5to año del secundario, estudiantes universitarios y jóvenes profesionales de distintas realidades socioeconómicas, en forma gratuita gracias al apoyo de empresas.', 'activo');

-- Achievement 8: 15 Capacitaciones
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('logro_15_etiqueta', 'achievements', 'Capacitaciones', 'activo'),
('logro_15_descripcion', 'achievements', 'en Oratoria y Comunicación Corporal', 'activo');

-- Achievement 9: 2.200 Niños y niñas (cine)
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('logro_2200_etiqueta', 'achievements', 'Niños y niñas', 'activo'),
('logro_2200_descripcion', 'achievements', 'que nunca fueron al cine, participaron en las Funciones Solidarias de Cine Debate de Metegol (desde los valores con el Equipo que hizo la película) gracias a J. J. Campanella y empresas.', 'activo');

-- Achievement 10: 10 Encuentros Nacionales
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('logro_10_etiqueta', 'achievements', 'Encuentros Nacionales', 'activo'),
('logro_10_descripcion', 'achievements', 'de Jóvenes Líderes, participaron 100 jóvenes que son primeros estudiantes universitarios de sus familias, de 16 provincias de Argentina con el apoyo del Departamento de Estado de EEUU, su embajada en Argentina, la Fundación Konrad Adenauer y en alianza con empresas y ONGs', 'activo');

-- Achievement 11: 150 Plantación de árboles
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('logro_150_arboles_etiqueta', 'achievements', 'Plantación de árboles', 'activo'),
('logro_150_arboles_descripcion', 'achievements', 'frutales en Escuelas y ONGs de distintos rincones de Argentina, liderados por 25 jóvenes líderes (que son los primeros universitarios de sus familias) para inspirar a alumnos secundarios. Ya se plantaron 57 en La Pampa, en Florencio Varela, y San Miguel, Pcia. De Bs. As. y Misiones.', 'activo');

-- Achievement 12: 150 Niños y niñas (hogares) - etiqueta
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('logro_150_ninos_etiqueta', 'achievements', 'Niños y niñas', 'activo');

-- Link text for videos
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('logro_link_video', 'achievements', 'Ver video', 'activo');

-- ============================================
-- PRESS ARTICLES - Full Article Texts
-- ============================================

-- Article: "La voz de los chicos comprometidos" - Full text (split into paragraphs for manageability)
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('prensa_article_full_p1', 'press', 'Su sueño era mostrar esa juventud que tan poca prensa tenía. Esa que estudia y trabaja por los otros, que critica y que piensa cómo se pueden hacer mejor las cosas. Hoy, el sueño de Carmen Sicardi cumplió diez años: el programa radial Jóvenes en acción dio voz a los temas que interesan y preocupan a los adolescentes. En estos diez años, pasaron por el programa 4600 chicos de más de 70 colegios. Desde el principio apunté a que fuera hecho por jóvenes de todas las realidades, explica.', 'activo'),

('prensa_article_full_p2', 'press', 'Carmen tenía 18 años la primera vez que se planteó hacer algo con los jóvenes. Desde los 16 era voluntaria de Cáritas y veía que había una juventud sana que no aparecía en los medios de comunicación. Era injusto que sólo apareciera la otra imagen, cuenta. Estudió Trabajo Social y se sumergió en la problemática de la niñez en riesgo. Trabajó en un juzgado de familia, en la Comisión Arquidiocesana de Minoridad y en la asociación Anidar, que se ocupa del tema adopción. Hace 15 años empecé como columnista en un programa que se levantó y armé el mío: Asignatura pendiente , dice. Después llegaría la propuesta de crear un programa para estudiantes secundarios.', 'activo'),

('prensa_article_full_p3', 'press', 'La metodología es la siguiente: los chicos eligen un tema, lo investigan, hacen entrevistas y plantean conclusiones y propuestas. La idea no es que vengan a lamentarse, sino que asuman el desafío de pensar cuáles son los cambios que se deben implementar, agrega. El objetivo es que desarrollen su conciencia ciudadana y cívica, además de ser capaces de ejercer una autocrítica y de buscar qué recursos hay para ofrecer ayuda.', 'activo'),

('prensa_article_full_p4', 'press', 'El programa va los jueves, de 20 a 21, por Radio Cultura FM 97.9. Más allá de la investigación que sale al aire, la producción del programa implica un rico debate previo y un trabajo en equipo. La propuesta es que sea un aprendizaje de vida, un análisis constructivo y un aporte de los chicos, desde su visión y su lenguaje, a la sociedad, considera Carmen.', 'activo'),

('prensa_article_full_p5', 'press', 'Los temas que se desgranan en el programa sirven para poner el foco en lo que preocupa a los jóvenes: drogas, accidentes de tránsito, trabajo infantil, violencia. El 80% de las temáticas que eligen es social.', 'activo'),

('prensa_article_full_p6', 'press', 'No quiere olvidarse: El programa no existiría sin el inicial y constante apoyo de Carmen de Estrada, que sugirió realizar un programa de radio con chicos; del doctor Alberto Olivero, rector del San Tarsicio, que dijo sí al proyecto, y del doctor Pedro Simoncini, asesor del programa.', 'activo'),

('prensa_article_full_p7', 'press', 'Chicos internados en un instituto penal de La Plata, adolescentes con capacidades diferentes y jóvenes que se estaban rehabilitando de su adicción tomaron presencia en el espacio.', 'activo'),

('prensa_article_full_p8', 'press', 'El gran desafío del programa es llegar más lejos: pasaron por el aire de la radio jóvenes de 11 provincias. El otro sueño es que www.jovenesenaccion.net sea un sitio de referencia para todos los jóvenes que buscan crecer y desarrollarse, con valores y compromiso, se sincera Carmen. Por eso en el acto por el aniversario, el programa premió al Grupo de Jóvenes ProVida.', 'activo'),

('prensa_article_full_p9', 'press', 'El efecto va más allá de la radio. Los estudiantes que ganaron el primer concurso literario ¿Qué país queremos tener los jóvenes? eligieron escuelas de Chaco, Mendoza, Jujuy, Santiago del Estero y la Capital que recibirán libros y material de estudio, que viaja con la Fundación Andreani. Para que Jóvenes en acción se abra cada vez más necesitamos contar con el apoyo de empresas, ya que es muy difícil sostener el programa, reconoce Carmen. Para contactarse: correodejovenes@yahoo.com.ar', 'activo'),

('prensa_article_full_p10', 'press', 'El programa radial Jóvenes en acción cumplió diez años y sigue creciendo.', 'activo'),

('prensa_article_full_p11', 'press', 'Participar del programa te deja un aprendizaje muy profundo como persona, dice Jorge Sagrero, un joven que participó cuando estudiaba en una escuela de Villa Lugano y hoy está a un final de terminar la carrera de Periodismo. Lo que hace este espacio es brindar oportunidades para todos, es integrar, es reconocer y aceptar al otro, con sus virtudes y limitaciones, asegura Valeria Donati, coordinadora de la Escuela de Educación Especial Nuestra Luz, de Olivos.', 'activo');

-- Article metadata
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('prensa_article_full_author', 'press', 'Por Cynthia Palacios', 'activo'),
('prensa_article_full_source', 'press', 'FUENTE: Redacción de LA NACION', 'activo');

-- ============================================
-- CANAL 7 ARTICLE - Full text (after title)
-- ============================================

INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('prensa_canal7_full_p1', 'press', 'a presentar por Canal 7, nuevos Protagonistas de La Segunda Argentina. En esta edición, alumnos del Colegio E.M.E.M Nº1 Distrito Escolar Nº 13, VILLA LUGANO participantes del programa radial Jóvenes en acción, tratan el tema de la violencia y la discriminación, algo con lo cual tienen que convivir mientras se esfuerzan por estudiar y trabajar y, en algunos casos de madres solteras, cuidar también de sus hijos.', 'activo'),

('prensa_canal7_full_p2', 'press', 'Participó también Carmen Sicardi, Directora del Programa Jóvenes en Acción y algunos de los jóvenes ganadores del 1er Concurso Literario de JOVENES EN ACCION sobre el tema ¿Qué país queremos tener los jóvenes?', 'activo'),

('prensa_canal7_full_p3', 'press', 'En la parte final del programa, chicos con capacidades especiales pertenecientes a la Escuela NUESTRA LUZ tuvieron a su cargo la parte más emotiva del programa cuando interpretan una canción creada por ellos cuyo tema es en contra de la violencia y que idearon especialmente para el programa radial que realizaron.', 'activo'),

('prensa_canal7_full_p4', 'press', 'El mensaje que trajeron los chicos al programa es que quieren decir basta de violencia en todas sus manifestaciones y propuestas para construir un país mejor.', 'activo'),

('prensa_canal7_full_p5', 'press', 'Como en todos los programas al final del mismo todos los participantes recibieron un pasaporte que los acredita como ciudadanos de La Segunda Argentina y que tiene como propósito invitarlos a conocer el Monumento Nacional a la Bandera, en Rosario, que fue construido simbolizando a la Patria como una nave imaginaria viajando hacia su destino de grandeza.', 'activo');
