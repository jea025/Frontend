-- ============================================
-- Add Programs to Database
-- ============================================
-- Adding all 5 programs from about.json to database
-- ============================================

-- Program 1: Salidas Culturales, Inclusivas e Integradoras
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('program_1_title', 'programs', 'Salidas Culturales, Inclusivas e Integradoras', 'activo'),
('program_1_description', 'programs', 'Salidas gratuitas que incluyen cines-debate, exposiciones y eventos en la Ciudad de Buenos Aires y el Gran Buenos Aires, favoreciendo la integración de jóvenes de distintas realidades socioeconómicas, con el fin de generar espacios de encuentro enriquecedores y promover el intercambio de experiencias en torno a sus carreras y vocaciones. A su vez, organiza actividades con jóvenes con discapacidad.', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- Program 2: Capacitaciones en Oratoria y Comunicación Corporal
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('program_2_title', 'programs', 'Capacitaciones en Oratoria y Comunicación Corporal', 'activo'),
('program_2_description', 'programs', 'Talleres dirigidos a estudiantes secundarios, universitarios y profesionales (presenciales y/o virtuales) que ofrecen herramientas para potenciar su seguridad y favorecer su desarrollo personal, académico, social y profesional.', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- Program 3: Voluntariado
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('program_3_title', 'programs', 'Voluntariado', 'activo'),
('program_3_description', 'programs', 'Actividades de voluntariado -recreativas, culturales, educativas y de promoción de valores- para ayudar a niños y adolescentes de hogares, escuelas y ONG. Los jóvenes voluntarios, entre ellos estudiantes universitarios y profesionales, comparten experiencias y desarrollan habilidades como compromiso, trabajo en equipo y liderazgo. Además, se organizan funciones solidarias de cine-debate de Metegol para 200 chicos que nunca fueron al cine, con el apoyo de empresas y ONG.', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- Program 4: Forestación, Educación y Valores
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('program_4_title', 'programs', 'Forestación, Educación y Valores', 'activo'),
('program_4_description', 'programs', 'Programa federal de triple impacto en el que 25 jóvenes líderes de Argentina -primeros estudiantes universitarios de sus familias- comparten su testimonio de vida inspirador a alumnos secundarios de escuelas de zonas vulnerables, en las localidades de origen de cada joven. Junto con los adolescentes, plantan árboles frutales que darán alimento saludable y contribuyen al cuidado del medio ambiente. Hasta el momento, se plantaron 57 árboles del total de 250 planificados.', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- Program 5: Encuentros Nacionales de Jóvenes Líderes
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('program_5_title', 'programs', 'Encuentros Nacionales de Jóvenes Líderes', 'activo'),
('program_5_description', 'programs', 'Entre 2013 y 2018 se realizaron 10 encuentros con un total de 100 estudiantes universitarios -primeros de sus familias- provenientes de 16 provincias, seleccionados por ONG que los becaban en sus estudios para recibir capacitaciones, adquirir experiencias en empresas e instituciones y participar en actividades culturales y de voluntariado. Los encuentros se llevaron a cabo en la Ciudad Autónoma de Buenos Aires (CABA) y en siete provincias, con el apoyo de un valioso equipo de jóvenes estudiantes universitarios y profesionales, el Departamento de Estado de EE. UU. y su embajada en Argentina, la Fundación Konrad Adenauer, empresas y en alianza con diversas ONG.', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- ============================================
-- SUMMARY
-- ============================================
-- Total new texts: 10 (5 programs x 2 fields each)
-- All programs from about.json now in database
-- ============================================
