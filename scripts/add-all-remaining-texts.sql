-- ============================================================================
-- SCRIPT: Agregar TODOS los textos hardcodeados restantes a contenido_multilenguaje
-- Fecha: 31 de marzo de 2026
-- Descripción: Este script agrega todos los textos en español que están
--              hardcodeados en componentes para que puedan ser traducidos
-- ============================================================================

-- IMPORTANTE: Ejecutar este SQL en Supabase SQL Editor
-- Después ejecutar: npm run translate

-- ============================================================================
-- 1. FOOTER
-- ============================================================================
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es)
VALUES 
  ('footer_copyright', 'Footer', '© 2026 Jóvenes en Acción. Todos los derechos reservados.'),
  ('footer_sponsors_title', 'Footer', 'Con el apoyo de'),
  ('footer_sponsor_official', 'Footer', 'Patrocinador oficial de Jóvenes en Acción')
ON CONFLICT (clave) DO NOTHING;

-- ============================================================================
-- 2. PÁGINA 404 (NOT FOUND)
-- ============================================================================
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es)
VALUES 
  ('404_title', 'Página 404', 'Página no encontrada'),
  ('404_message', 'Página 404', 'Lo sentimos, la página que buscas no existe o ha sido movida.'),
  ('404_button_home', 'Página 404', 'Volver al inicio'),
  ('404_button_gallery', 'Página 404', 'Ver galería'),
  ('404_contact_message', 'Página 404', 'Si crees que esto es un error, por favor contáctanos.')
ON CONFLICT (clave) DO NOTHING;

-- ============================================================================
-- 3. PÁGINA DE CONTACTO - FORMULARIO
-- ============================================================================
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es)
VALUES 
  ('contact_title', 'Formulario de contacto', 'Contactos'),
  ('contact_form_name', 'Formulario de contacto', 'Nombre'),
  ('contact_form_name_placeholder', 'Formulario de contacto', 'Tu nombre'),
  ('contact_form_email', 'Formulario de contacto', 'Email'),
  ('contact_form_email_placeholder', 'Formulario de contacto', 'tu@email.com'),
  ('contact_form_phone', 'Formulario de contacto', 'Teléfono'),
  ('contact_form_phone_placeholder', 'Formulario de contacto', '+54 11 1234-5678'),
  ('contact_form_phone_optional', 'Formulario de contacto', '(opcional)'),
  ('contact_form_subject', 'Formulario de contacto', 'Asunto'),
  ('contact_form_subject_placeholder', 'Formulario de contacto', 'Ej: Consulta sobre programas'),
  ('contact_form_query_type', 'Formulario de contacto', 'Tipo de consulta'),
  ('contact_form_query_type_select', 'Formulario de contacto', 'Seleccionar...'),
  ('contact_form_query_general', 'Formulario de contacto', 'Consulta general'),
  ('contact_form_query_press', 'Formulario de contacto', 'Prensa / Medios'),
  ('contact_form_query_programs', 'Formulario de contacto', 'Información sobre programas'),
  ('contact_form_query_other', 'Formulario de contacto', 'Otro'),
  ('contact_form_how_found', 'Formulario de contacto', '¿Cómo nos conociste?'),
  ('contact_form_how_found_placeholder', 'Formulario de contacto', 'Ej: Redes sociales, búsqueda en internet...'),
  ('contact_form_message', 'Formulario de contacto', 'Mensaje'),
  ('contact_form_message_placeholder', 'Formulario de contacto', 'Escribí tu mensaje...'),
  ('contact_form_required', 'Formulario de contacto', '*'),
  ('contact_form_submit', 'Formulario de contacto', 'Enviar mensaje'),
  ('contact_form_sending', 'Formulario de contacto', 'Enviando...'),
  ('contact_form_success', 'Formulario de contacto', 'Muchas gracias por dejarnos un mensaje, te contactaremos.'),
  ('contact_form_error', 'Formulario de contacto', 'No se pudo enviar el mensaje. Intentá de nuevo.'),
  ('contact_form_error_connection', 'Formulario de contacto', 'Error de conexión. Intentá de nuevo.')
ON CONFLICT (clave) DO NOTHING;

-- ============================================================================
-- 4. PRENSA - ARTÍCULOS Y PREMIOS
-- ============================================================================
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es)
VALUES 
  ('prensa_section_title', 'Sección Prensa', 'Artículos de Prensa'),
  ('prensa_featured_label', 'Sección Prensa', 'ARTÍCULO DESTACADO'),
  ('prensa_consudec_title', 'Sección Prensa', 'Jóvenes en Acción - Revista CONSUDEC - Agosto 2025'),
  ('prensa_article_1_title', 'Sección Prensa', 'La voz de los invisibles - LA NACIÓN'),
  ('prensa_article_1_date', 'Sección Prensa', '2 de abril de 2011'),
  ('prensa_article_2_title', 'Sección Prensa', 'Distinguen los valores solidarios en medios de comunicación'),
  ('prensa_article_2_date', 'Sección Prensa', '31 de octubre de 2007'),
  ('prensa_article_3_title', 'Sección Prensa', 'La cultura también se hace oír - LA NACIÓN'),
  ('prensa_article_3_date', 'Sección Prensa', '17 de abril de 2005'),
  ('prensa_premio_santa_clara_title', 'Sección Prensa', 'Premio Santa Clara de Asís (2001)'),
  ('prensa_premio_santa_clara_org', 'Sección Prensa', '📍 Otorgado por la Liga de Madres de Familia'),
  ('prensa_premio_santa_clara_alt', 'Sección Prensa', 'Premio Santa Clara de Asís - Ceremonia de entrega'),
  ('prensa_premio_alumnos_alt', 'Sección Prensa', 'Alumnos Santa Clara de Asís'),
  ('prensa_canal7_title', 'Sección Prensa', 'Jóvenes en acción en Canal 7'),
  ('prensa_canal7_description', 'Sección Prensa', 'El Sábado 28 de Junio de 2008 a las 21.15 hs volvió Víctor Hugo Morales'),
  ('prensa_loading', 'Sección Prensa', 'Cargando artículos...')
ON CONFLICT (clave) DO NOTHING;

-- ============================================================================
-- 5. GALERÍA - DESCRIPCIONES Y TÍTULOS
-- ============================================================================
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es)
VALUES 
  ('gallery_jea_title', 'Galería', 'Jóvenes en Acción'),
  ('gallery_radio_cultura', 'Galería', 'RADIO CULTURA'),
  ('gallery_jea_in', 'Galería', 'en'),
  ('gallery_programs_title', 'Galería', 'Programas'),
  ('gallery_programs_with', 'Galería', 'con la'),
  ('gallery_production', 'Galería', 'Producción y Conducción'),
  ('gallery_production_of', 'Galería', 'de'),
  ('gallery_students', 'Galería', 'alumnos secundarios'),
  ('gallery_students_from', 'Galería', 'de'),
  ('gallery_schools', 'Galería', 'distintos Colegios'),
  ('gallery_project_title', 'Galería', 'PROYECTO'),
  ('gallery_project_forestacion', 'Galería', 'FORESTACIÓN'),
  ('gallery_project_educacion', 'Galería', 'EDUCACIÓN'),
  ('gallery_project_valores', 'Galería', 'VALORES'),
  ('gallery_hogar_ninos', 'Galería', 'HOGAR DE NIÑOS'),
  ('gallery_puerta_del_cielo', 'Galería', 'Puerta del Cielo'),
  ('gallery_video_alt', 'Galería', 'Video de Jóvenes en Acción')
ON CONFLICT (clave) DO NOTHING;

-- ============================================================================
-- 6. COMPONENTES ADMIN - PLACEHOLDERS Y LABELS
-- ============================================================================
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es)
VALUES 
  ('admin_logros_numero_placeholder', 'Admin - Logros', 'Número (ej: 60)'),
  ('admin_logros_etiqueta_placeholder', 'Admin - Logros', 'Etiqueta/Título (ej: Colegios)'),
  ('admin_logros_descripcion_placeholder', 'Admin - Logros', 'Descripción del logro/impacto'),
  ('admin_programa_titulo_placeholder', 'Admin - Programas', 'Título del programa'),
  ('admin_programa_descripcion_placeholder', 'Admin - Programas', 'Descripción del programa'),
  ('admin_conocenos_numero_label', 'Admin - Conócenos', 'Número'),
  ('admin_conocenos_descripcion_label', 'Admin - Conócenos', 'Descripción'),
  ('admin_conocenos_link_placeholder', 'Admin - Conócenos', 'Ej: Ver más'),
  ('admin_prensa_articulo_title', 'Admin - Prensa', 'Artículo de Prensa'),
  ('admin_prensa_titulo_placeholder', 'Admin - Prensa', 'Título del artículo (Ej: ''Jóvenes en Acción celebró 25 años...'')'),
  ('admin_prensa_fecha_placeholder', 'Admin - Prensa', 'Fecha del artículo (Ej: ''17 de octubre de 2022'')'),
  ('admin_prensa_url_placeholder', 'Admin - Prensa', 'URL del artículo original')
ON CONFLICT (clave) DO NOTHING;

-- ============================================================================
-- 7. RADIO SCHEDULE - LÓGICA Y MENSAJES
-- ============================================================================
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es)
VALUES 
  ('radio_logic_title', 'Radio Schedule', 'Lógica de visualización:'),
  ('radio_logic_future', 'Radio Schedule', '✨ Retomamos la programación el jueves [Día] de [Mes] de 20 a 21 hs'),
  ('radio_logic_current', 'Radio Schedule', 'Todos los jueves por radio cultura de 20 a 21 hs')
ON CONFLICT (clave) DO NOTHING;

-- ============================================================================
-- 8. METADATA - TÍTULOS Y DESCRIPCIONES DE PÁGINAS
-- ============================================================================
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es)
VALUES 
  ('meta_contact_title', 'Metadata', 'Contacto | JEA'),
  ('meta_contact_description', 'Metadata', 'Ponete en contacto con Jóvenes en Acción'),
  ('meta_gallery_title', 'Metadata', 'Galería | JEA'),
  ('meta_gallery_description', 'Metadata', 'Galería de fotos y videos de Jóvenes en Acción'),
  ('meta_home_title', 'Metadata', 'Jóvenes en Acción | Inicio'),
  ('meta_home_description', 'Metadata', 'Jóvenes en Acción - Educación, valores y comunicación')
ON CONFLICT (clave) DO NOTHING;

-- ============================================================================
-- RESUMEN
-- ============================================================================
-- Total de textos agregados: ~80 nuevos textos
-- 
-- PRÓXIMOS PASOS:
-- 1. Ejecutar este SQL en Supabase
-- 2. Ejecutar: npm run translate
-- 3. Actualizar componentes para consumir de Supabase
-- 
-- COMPONENTES A ACTUALIZAR:
-- - Frontend/components/Footer/Footer.tsx
-- - Frontend/components/Contactos/Contactos.tsx
-- - Frontend/app/not-found.tsx
-- - Frontend/components/Prensa/Prensa.tsx
-- - Frontend/components/Prensa/PrensaDinamica.tsx
-- - Frontend/components/GaleriaCeos/GaleriaCeos.tsx
-- - Frontend/components/RadioSchedule.tsx
-- - Frontend/components/LogrosList.tsx
-- - Frontend/components/DynamicList.tsx
-- ============================================================================
