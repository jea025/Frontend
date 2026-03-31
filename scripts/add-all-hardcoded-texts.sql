-- ============================================================================
-- SCRIPT: Agregar TODOS los textos hardcodeados a contenido_multilenguaje
-- ============================================================================
-- Este script mueve todos los textos hardcodeados del sitio a la base de datos
-- para que puedan ser traducidos automáticamente y editados desde el backoffice
--
-- INSTRUCCIONES:
-- 1. Copiar todo este contenido
-- 2. Ir a Supabase SQL Editor
-- 3. Pegar y ejecutar
-- 4. Ejecutar: npm run translate
-- ============================================================================

-- ============================================================================
-- FOOTER
-- ============================================================================
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es)
VALUES 
  ('footer_copyright', 'Footer', '© 2026 Jóvenes en Acción. Todos los derechos reservados.'),
  ('footer_social_title', 'Footer', 'Síguenos en nuestras redes sociales')
ON CONFLICT (clave) DO NOTHING;

-- ============================================================================
-- PÁGINA DE CONTACTO - Formulario
-- ============================================================================
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es)
VALUES 
  -- Título y mensajes
  ('contact_title', 'Página de Contacto', 'Contactos'),
  ('contact_success_message', 'Página de Contacto', 'Muchas gracias por dejarnos un mensaje, te contactaremos.'),
  ('contact_error_default', 'Página de Contacto', 'No se pudo enviar el mensaje. Intentá de nuevo.'),
  ('contact_error_connection', 'Página de Contacto', 'Error de conexión. Intentá de nuevo.'),
  
  -- Labels del formulario
  ('contact_label_name', 'Formulario de Contacto', 'Nombre'),
  ('contact_label_email', 'Formulario de Contacto', 'Email'),
  ('contact_label_phone', 'Formulario de Contacto', 'Teléfono'),
  ('contact_label_subject', 'Formulario de Contacto', 'Asunto'),
  ('contact_label_query_type', 'Formulario de Contacto', 'Tipo de consulta'),
  ('contact_label_how_found', 'Formulario de Contacto', '¿Cómo nos conociste?'),
  ('contact_label_message', 'Formulario de Contacto', 'Mensaje'),
  
  -- Placeholders
  ('contact_placeholder_name', 'Formulario de Contacto', 'Tu nombre'),
  ('contact_placeholder_email', 'Formulario de Contacto', 'tu@email.com'),
  ('contact_placeholder_phone', 'Formulario de Contacto', '+54 11 1234-5678'),
  ('contact_placeholder_subject', 'Formulario de Contacto', 'Ej: Consulta sobre programas'),
  ('contact_placeholder_how_found', 'Formulario de Contacto', 'Ej: Redes sociales, búsqueda en internet...'),
  ('contact_placeholder_message', 'Formulario de Contacto', 'Escribí tu mensaje...'),
  
  -- Opciones de tipo de consulta
  ('contact_query_type_select', 'Formulario de Contacto', 'Seleccionar...'),
  ('contact_query_type_general', 'Formulario de Contacto', 'Consulta general'),
  ('contact_query_type_press', 'Formulario de Contacto', 'Prensa / Medios'),
  ('contact_query_type_programs', 'Formulario de Contacto', 'Información sobre programas'),
  ('contact_query_type_other', 'Formulario de Contacto', 'Otro'),
  
  -- Textos auxiliares
  ('contact_optional', 'Formulario de Contacto', '(opcional)'),
  ('contact_required', 'Formulario de Contacto', '*'),
  ('contact_button_submit', 'Formulario de Contacto', 'Enviar mensaje'),
  ('contact_button_sending', 'Formulario de Contacto', 'Enviando...')
ON CONFLICT (clave) DO NOTHING;

-- ============================================================================
-- PÁGINA 404 - Not Found
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
-- COMPONENTE NOSOTROS - Sección "Acerca de"
-- ============================================================================
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es)
VALUES 
  ('about_title', 'Sección Nosotros', 'Acerca de nosotros'),
  ('about_partner_text', 'Sección Nosotros', 'Se consolidó como una organización que tiene el apoyo institucional de la'),
  ('about_partner_selected_by', 'Sección Nosotros', ', y que ha sido seleccionada por'),
  ('about_partner_receive_funds', 'Sección Nosotros', 'para poder recibir fondos desde el exterior, y es miembro de'),
  ('about_impact_text', 'Sección Nosotros', '. Ha impactado en más de 24.000 niños, adolescentes y jóvenes de todo el país.'),
  ('about_program_prefix', 'Sección Nosotros', 'Programa')
ON CONFLICT (clave) DO NOTHING;

-- ============================================================================
-- COMPONENTE NOSOTROS - Sección Radio
-- ============================================================================
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es)
VALUES 
  ('radio_section_title', 'Sección Radio', 'Radio Jóvenes en Acción'),
  ('radio_section_description', 'Sección Radio', 'Escuchá nuestro programa radial todos los días')
ON CONFLICT (clave) DO NOTHING;

-- ============================================================================
-- COMPONENTE NOSOTROS - Sección Video
-- ============================================================================
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es)
VALUES 
  ('video_section_title', 'Sección Video', 'Conocé más sobre nuestro trabajo')
ON CONFLICT (clave) DO NOTHING;

-- ============================================================================
-- GALERÍA - Sección CEOs y Emprendedores
-- ============================================================================
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es)
VALUES 
  ('gallery_ceos_title_1', 'Galería - CEOs', 'Jóvenes en Acción'),
  ('gallery_ceos_title_2', 'Galería - CEOs', 'en'),
  ('gallery_ceos_title_3', 'Galería - CEOs', 'RADIO CULTURA'),
  ('gallery_ceos_subtitle_1', 'Galería - CEOs', 'Entrevistas a'),
  ('gallery_ceos_subtitle_2', 'Galería - CEOs', 'CEOS de Empresas'),
  ('gallery_ceos_subtitle_3', 'Galería - CEOs', 'Emprendedores'),
  ('gallery_ceos_subtitle_4', 'Galería - CEOs', 'y'),
  ('gallery_ceos_subtitle_5', 'Galería - CEOs', 'Especialistas'),
  ('gallery_ceos_description', 'Galería - CEOs', 'Descubre los momentos más inspiradores de nuestro programa radial, donde jóvenes tienen la oportunidad única de entrevistar a líderes empresariales, emprendedores exitosos y especialistas de diversas áreas, creando un puente generacional lleno de aprendizaje y motivación.'),
  
  -- Títulos de imágenes CEOs
  ('gallery_ceos_img1_title', 'Galería - CEOs', 'Entrevista con Victor Valle CEO de GOOGLE Argentina'),
  ('gallery_ceos_img2_title', 'Galería - CEOs', 'Entrevista a Alejandro y Micaela Kelman'),
  ('gallery_ceos_img3_title', 'Galería - CEOs', 'Entrevista al equipo ganador del 3er puesto del Premio Banco Patagonia Innova del 2013'),
  
  -- Texto overlay
  ('gallery_click_to_enlarge', 'Galería - General', 'Toca para ampliar')
ON CONFLICT (clave) DO NOTHING;

-- ============================================================================
-- GALERÍA - Sección Colegios
-- ============================================================================
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es)
VALUES 
  ('gallery_schools_title_1', 'Galería - Colegios', 'Programas'),
  ('gallery_schools_title_2', 'Galería - Colegios', 'con la'),
  ('gallery_schools_title_3', 'Galería - Colegios', 'Producción y Conducción'),
  ('gallery_schools_title_4', 'Galería - Colegios', 'de'),
  ('gallery_schools_title_5', 'Galería - Colegios', 'alumnos secundarios'),
  ('gallery_schools_title_6', 'Galería - Colegios', 'de'),
  ('gallery_schools_title_7', 'Galería - Colegios', 'distintos Colegios'),
  
  -- Títulos de imágenes Colegios
  ('gallery_schools_img1_title', 'Galería - Colegios', 'Jóvenes Conductores'),
  ('gallery_schools_img2_title', 'Galería - Colegios', 'Experiencia Radiofónica')
ON CONFLICT (clave) DO NOTHING;

-- ============================================================================
-- GALERÍA - Sección Eventos (Colectivo Saludable)
-- ============================================================================
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es)
VALUES 
  ('gallery_events_title', 'Galería - Eventos', 'Eventos en los que participamos:'),
  ('gallery_events_bus_description', 'Galería - Eventos', '¡Presentes en el lanzamiento del primer'),
  ('gallery_events_bus_name', 'Galería - Eventos', '"Colectivo Saludable y Sustentable"'),
  ('gallery_events_bus_description_2', 'Galería - Eventos', 'de Argentina! Contó con la colaboración de Fundación Barceló y otras universidades, donde nuestra integrante'),
  ('gallery_events_member_name', 'Galería - Eventos', 'Francesca Simonotto'),
  ('gallery_events_member_description', 'Galería - Eventos', '(alumna de Medicina de Barceló) representó a Jóvenes en Acción.'),
  ('gallery_events_video_error', 'Galería - Eventos', 'Tu navegador no soporta videos.'),
  ('gallery_events_instagram_button', 'Galería - Eventos', 'Ver Reel completo')
ON CONFLICT (clave) DO NOTHING;

-- ============================================================================
-- GALERÍA - Sección Forestación
-- ============================================================================
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es)
VALUES 
  ('gallery_forest_title_1', 'Galería - Forestación', 'PROYECTO'),
  ('gallery_forest_title_2', 'Galería - Forestación', 'FORESTACIÓN'),
  ('gallery_forest_title_3', 'Galería - Forestación', 'EDUCACIÓN'),
  ('gallery_forest_title_4', 'Galería - Forestación', 'y'),
  ('gallery_forest_title_5', 'Galería - Forestación', 'VALORES'),
  
  -- Títulos de imágenes Forestación
  ('gallery_forest_img1_title', 'Galería - Forestación', 'Plantación de Árboles Frutales'),
  ('gallery_forest_img2_title', 'Galería - Forestación', 'Educación Ambiental'),
  ('gallery_forest_img3_title', 'Galería - Forestación', 'Compromiso con el Medio Ambiente')
ON CONFLICT (clave) DO NOTHING;

-- ============================================================================
-- GALERÍA - Sección Voluntariado
-- ============================================================================
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es)
VALUES 
  ('gallery_volunteer_title_1', 'Galería - Voluntariado', 'VOLUNTARIADO'),
  ('gallery_volunteer_title_2', 'Galería - Voluntariado', 'en'),
  ('gallery_volunteer_title_3', 'Galería - Voluntariado', 'HOGAR'),
  ('gallery_volunteer_title_4', 'Galería - Voluntariado', 'DE'),
  ('gallery_volunteer_title_5', 'Galería - Voluntariado', 'NIÑOS'),
  ('gallery_volunteer_title_6', 'Galería - Voluntariado', '"Puerta'),
  ('gallery_volunteer_title_7', 'Galería - Voluntariado', 'del'),
  ('gallery_volunteer_title_8', 'Galería - Voluntariado', 'Cielo"'),
  
  -- Títulos de imágenes Voluntariado
  ('gallery_volunteer_img1_title', 'Galería - Voluntariado', 'V H'),
  ('gallery_volunteer_img2_title', 'Galería - Voluntariado', 'Cumpleaños Hogar'),
  ('gallery_volunteer_img3_title', 'Galería - Voluntariado', 'Festejo Hogar')
ON CONFLICT (clave) DO NOTHING;

-- ============================================================================
-- GALERÍA - Modal de imagen
-- ============================================================================
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es)
VALUES 
  ('gallery_modal_close', 'Galería - Modal', 'Cerrar modal'),
  ('gallery_modal_previous', 'Galería - Modal', 'Imagen anterior'),
  ('gallery_modal_next', 'Galería - Modal', 'Imagen siguiente'),
  ('gallery_modal_counter', 'Galería - Modal', 'de')
ON CONFLICT (clave) DO NOTHING;

-- ============================================================================
-- METADATA - Páginas
-- ============================================================================
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es)
VALUES 
  ('meta_contact_title', 'Metadata', 'Contacto | JEA'),
  ('meta_contact_description', 'Metadata', 'Ponete en contacto con Jóvenes en Acción')
ON CONFLICT (clave) DO NOTHING;

-- ============================================================================
-- RESUMEN
-- ============================================================================
-- Total de textos agregados: ~100+ claves
-- 
-- Distribución por contexto:
-- - Footer: 2 textos
-- - Contacto: 25 textos
-- - 404: 5 textos
-- - Nosotros: 6 textos
-- - Radio: 2 textos
-- - Video: 1 texto
-- - Galería CEOs: 13 textos
-- - Galería Colegios: 9 textos
-- - Galería Eventos: 8 textos
-- - Galería Forestación: 8 textos
-- - Galería Voluntariado: 11 textos
-- - Galería Modal: 4 textos
-- - Metadata: 2 textos
--
-- PRÓXIMOS PASOS:
-- 1. Ejecutar este SQL en Supabase
-- 2. Ejecutar: npm run translate
-- 3. Actualizar componentes para consumir estos textos desde Supabase
-- ============================================================================
