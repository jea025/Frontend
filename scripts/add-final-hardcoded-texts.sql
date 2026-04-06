-- ============================================
-- SQL para agregar textos hardcodeados finales
-- Ejecutar en Supabase SQL Editor
-- ============================================

-- Textos del componente LogrosCombinados
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('logros_title', 'Sección Logros', 'LOGROS E IMPACTO', 'auto'),
('logros_loading', 'Sección Logros', 'Cargando logros...', 'auto');

-- Textos del componente Prensa (artículos faltantes)
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('prensa_article_4_title', 'Sección Prensa', 'Veinte minutos de aire', 'auto'),
('prensa_article_4_date', 'Sección Prensa', '21 de mayo de 2004', 'auto'),
('prensa_awards_title', 'Sección Prensa', 'Premios y Reconocimientos', 'auto'),
('prensa_embajada_title', 'Sección Prensa', 'Reconocimiento de la Embajada de Estados Unidos (2001)', 'auto'),
('prensa_embajada_description_1', 'Sección Prensa', '📍 Embajadora Vilma S. Martinez – Proyecto PLIMIC', 'auto'),
('prensa_embajada_description_2', 'Sección Prensa', '📜 Entrega de diploma y agasajo en la sede diplomática', 'auto'),
('prensa_embajada_description_3', 'Sección Prensa', 'El Proyecto PLIMIC (Programa de Liderazgo Inclusivo, Multimedial y Cultural) fue financiado por el Departamento de Estado de EEUU y supervisado por la Embajada. Jóvenes en Acción recibió un diploma en reconocimiento a su labor.', 'auto'),
('prensa_article_full_title', 'Sección Prensa', 'La voz de los chicos comprometidos', 'auto');

-- Textos del componente Prensa (artículo completo - párrafos)
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('prensa_article_full_p1', 'Artículo Completo', 'Su sueño era mostrar esa juventud que tan poca prensa tenía. Esa que estudia y trabaja por los otros, que critica y que piensa cómo se pueden hacer mejor las cosas. Hoy, el sueño de Carmen Sicardi cumplió diez años: el programa radial Jóvenes en acción dio voz a los temas que interesan y preocupan a los adolescentes. En estos diez años, pasaron por el programa 4600 chicos de más de 70 colegios. Desde el principio apunté a que fuera hecho por jóvenes de todas las realidades, explica.', 'auto'),
('prensa_article_full_author', 'Artículo Completo', 'Por Cynthia Palacios', 'auto'),
('prensa_article_full_source', 'Artículo Completo', 'FUENTE: Redacción de LA NACION', 'auto');

-- Textos de componentes admin (PrensaFields, LogrosFields, etc.)
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('admin_no_items', 'Admin - General', 'No hay elementos agregados', 'auto'),
('admin_click_to_start', 'Admin - General', 'Haz clic en "Agregar" para comenzar', 'auto'),
('admin_no_news', 'Admin - Prensa', 'No hay noticias o premios agregados', 'auto'),
('admin_click_add_news', 'Admin - Prensa', 'Haz clic en "Agregar Noticia/Premio" para comenzar', 'auto'),
('admin_news_number', 'Admin - Prensa', 'Noticia/Premio #', 'auto'),
('admin_no_logros', 'Admin - Logros', 'No hay logros agregados', 'auto'),
('admin_click_add_logro', 'Admin - Logros', 'Haz clic en "Agregar Logro" para comenzar', 'auto'),
('admin_logro_number', 'Admin - Logros', 'Logro #', 'auto'),
('admin_logro_title', 'Admin - Logros', 'Logro/Impacto', 'auto'),
('admin_description_label', 'Admin - General', 'Descripción', 'auto'),
('admin_link_text_label', 'Admin - General', 'Texto del enlace (opcional)', 'auto'),
('admin_link_url_label', 'Admin - General', 'URL del enlace (opcional)', 'auto');

-- Textos de ImageUploader
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('image_uploading', 'Subida de Imágenes', 'Subiendo...', 'auto'),
('image_uploading_message', 'Subida de Imágenes', 'Subiendo imagen...', 'auto');

-- Textos de Navbar
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('nav_language_label', 'Navegación', 'Idioma / Language', 'auto');

-- Textos de páginas de error/carga
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('error_loading_press', 'Errores', 'Error al cargar la prensa', 'auto'),
('loading_config', 'Carga', 'Cargando configuración...', 'auto'),
('error_loading_contacts', 'Errores', 'Error al cargar contactos', 'auto'),
('no_messages_yet', 'Admin - Contactos', 'No hay mensajes todavía.', 'auto');

-- Textos de página de prueba (test page)
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('test_page_title', 'Página de Prueba', 'Página de Prueba - Configuración', 'auto'),
('test_config_received', 'Página de Prueba', 'Configuración Recibida:', 'auto'),
('test_radio_day', 'Página de Prueba', 'Radio Día:', 'auto'),
('test_radio_month', 'Página de Prueba', 'Radio Mes:', 'auto'),
('test_logros_list', 'Página de Prueba', 'Logros List:', 'auto'),
('test_prensa_list', 'Página de Prueba', 'Prensa List:', 'auto'),
('test_not_found', 'Página de Prueba', 'No encontrado', 'auto');

-- Textos de página principal (home)
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('home_address_title', 'Página Principal', 'Dirección', 'auto'),
('home_address_default', 'Página Principal', 'Av. Principal 123, Ciudad', 'auto'),
('home_social_title', 'Página Principal', 'Síguenos en redes sociales', 'auto');

-- Textos adicionales de Prensa (descripción del artículo destacado)
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('prensa_consudec_description', 'Sección Prensa', 'Artículo especial sobre el impacto y la trayectoria de Jóvenes en Acción publicado en la prestigiosa revista de CONSUDEC (Consejo Superior de Educación Católica).', 'auto'),
('prensa_santa_clara_recognition', 'Sección Prensa', 'Reconocimiento a Jóvenes en Acción por', 'auto'),
('prensa_view_diploma', 'Sección Prensa', '[ver diploma]', 'auto');

-- Textos de artículos adicionales de La Nación
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('prensa_article_5_title', 'Sección Prensa', 'Noticias del mundo social', 'auto'),
('prensa_article_5_date', 'Sección Prensa', '13 de noviembre de 2017', 'auto'),
('prensa_article_6_title', 'Sección Prensa', 'Capacitación para jóvenes del interior del país - LA NACIÓN', 'auto'),
('prensa_article_6_date', 'Sección Prensa', '21 de febrero de 2014', 'auto'),
('prensa_article_7_title', 'Sección Prensa', 'Qué pasó este mes en el sector social - LA NACIÓN', 'auto'),
('prensa_article_7_date', 'Sección Prensa', '2 de marzo de 2013', 'auto');

-- Textos del artículo completo de Jóvenes en Acción en Canal 7 (continuación)
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('prensa_canal7_full_text', 'Artículo Canal 7', 'a presentar por Canal 7, nuevos Protagonistas de La Segunda Argentina. En esta edición, alumnos del Colegio E.M.E.M Nº1 Distrito Escolar Nº 13, VILLA LUGANO participantes del programa radial Jóvenes en acción, tratan el tema de la violencia y la discriminación, algo con lo cual tienen que convivir mientras se esfuerzan por estudiar y trabajar y, en algunos casos de madres solteras, cuidar también de sus hijos.

Participó también Carmen Sicardi, Directora del Programa Jóvenes en Acción y algunos de los jóvenes ganadores del 1er Concurso Literario de JOVENES EN ACCION sobre el tema ¿Qué país queremos tener los jóvenes?

En la parte final del programa, chicos con capacidades especiales pertenecientes a la Escuela NUESTRA LUZ tuvieron a su cargo la parte más emotiva del programa cuando interpretan una canción creada por ellos cuyo tema es en contra de la violencia y que idearon especialmente para el programa radial que realizaron.

El mensaje que trajeron los chicos al programa es que quieren decir basta de violencia en todas sus manifestaciones y propuestas para construir un país mejor.

Como en todos los programas al final del mismo todos los participantes recibieron un pasaporte que los acredita como ciudadanos de La Segunda Argentina y que tiene como propósito invitarlos a conocer el Monumento Nacional a la Bandera, en Rosario, que fue construido simbolizando a la Patria como una nave imaginaria viajando hacia su destino de grandeza.', 'auto');
