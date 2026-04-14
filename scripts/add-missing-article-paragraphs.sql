-- ============================================
-- FIX: Add missing article paragraphs (p2-p11)
-- ============================================
-- The article "La voz de los chicos comprometidos" only has p1 in database
-- This adds the remaining 10 paragraphs
-- ============================================

INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('prensa_article_full_p2', 'press', 'Carmen tenía 18 años la primera vez que se planteó hacer algo con los jóvenes. Desde los 16 era voluntaria de Cáritas y veía que había una juventud sana que no aparecía en los medios de comunicación. Era injusto que sólo apareciera la otra imagen, cuenta. Estudió Trabajo Social y se sumergió en la problemática de la niñez en riesgo. Trabajó en un juzgado de familia, en la Comisión Arquidiocesana de Minoridad y en la asociación Anidar, que se ocupa del tema adopción. Hace 15 años empecé como columnista en un programa que se levantó y armé el mío: Asignatura pendiente , dice. Después llegaría la propuesta de crear un programa para estudiantes secundarios.', 'activo'),

('prensa_article_full_p3', 'press', 'La metodología es la siguiente: los chicos eligen un tema, lo investigan, hacen entrevistas y plantean conclusiones y propuestas. La idea no es que vengan a lamentarse, sino que asuman el desafío de pensar cuáles son los cambios que se deben implementar, agrega. El objetivo es que desarrollen su conciencia ciudadana y cívica, además de ser capaces de ejercer una autocrítica y de buscar qué recursos hay para ofrecer ayuda.', 'activo'),

('prensa_article_full_p4', 'press', 'El programa va los jueves, de 20 a 21, por Radio Cultura FM 97.9. Más allá de la investigación que sale al aire, la producción del programa implica un rico debate previo y un trabajo en equipo. La propuesta es que sea un aprendizaje de vida, un análisis constructivo y un aporte de los chicos, desde su visión y su lenguaje, a la sociedad, considera Carmen.', 'activo'),

('prensa_article_full_p5', 'press', 'Los temas que se desgranan en el programa sirven para poner el foco en lo que preocupa a los jóvenes: drogas, accidentes de tránsito, trabajo infantil, violencia. El 80% de las temáticas que eligen es social.', 'activo'),

('prensa_article_full_p6', 'press', 'No quiere olvidarse: El programa no existiría sin el inicial y constante apoyo de Carmen de Estrada, que sugirió realizar un programa de radio con chicos; del doctor Alberto Olivero, rector del San Tarsicio, que dijo sí al proyecto, y del doctor Pedro Simoncini, asesor del programa.', 'activo'),

('prensa_article_full_p7', 'press', 'Chicos internados en un instituto penal de La Plata, adolescentes con capacidades diferentes y jóvenes que se estaban rehabilitando de su adicción tomaron presencia en el espacio.', 'activo'),

('prensa_article_full_p8', 'press', 'El gran desafío del programa es llegar más lejos: pasaron por el aire de la radio jóvenes de 11 provincias. El otro sueño es que www.jovenesenaccion.net sea un sitio de referencia para todos los jóvenes que buscan crecer y desarrollarse, con valores y compromiso, se sincera Carmen. Por eso en el acto por el aniversario, el programa premió al Grupo de Jóvenes ProVida.', 'activo'),

('prensa_article_full_p9', 'press', 'El efecto va más allá de la radio. Los estudiantes que ganaron el primer concurso literario ¿Qué país queremos tener los jóvenes? eligieron escuelas de Chaco, Mendoza, Jujuy, Santiago del Estero y la Capital que recibirán libros y material de estudio, que viaja con la Fundación Andreani. Para que Jóvenes en acción se abra cada vez más necesitamos contar con el apoyo de empresas, ya que es muy difícil sostener el programa, reconoce Carmen. Para contactarse: correodejovenes@yahoo.com.ar', 'activo'),

('prensa_article_full_p10', 'press', 'El programa radial Jóvenes en acción cumplió diez años y sigue creciendo.', 'activo'),

('prensa_article_full_p11', 'press', 'Participar del programa te deja un aprendizaje muy profundo como persona, dice Jorge Sagrero, un joven que participó cuando estudiaba en una escuela de Villa Lugano y hoy está a un final de terminar la carrera de Periodismo. Lo que hace este espacio es brindar oportunidades para todos, es integrar, es reconocer y aceptar al otro, con sus virtudes y limitaciones, asegura Valeria Donati, coordinadora de la Escuela de Educación Especial Nuestra Luz, de Olivos.', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- ============================================
-- SUMMARY
-- ============================================
-- Total new texts: 10 paragraphs (p2 through p11)
-- This completes the full article text
-- ============================================
