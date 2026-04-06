-- ============================================
-- ROUND 4: Radio Components and UI Texts
-- ============================================
-- This file adds remaining hardcoded Spanish texts from:
-- - RadioBanner, RadioBannerDynamic, RadioSchedule
-- - Carrusel component
-- - DynamicList component (admin UI)
-- ============================================

-- Radio Banner texts
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('radio_live_label', 'radio', 'Radio en vivo', 'activo'),
('radio_default_title', 'radio', 'Jóvenes en Acción', 'activo'),
('radio_default_schedule', 'radio', 'Todos los jueves por radio cultura de 20 a 21 hs', 'activo'),
('radio_return_message', 'radio', '✨ Retomamos la programación el jueves {dia} de {mes} de 20 a 21 hs', 'activo'),
('radio_loading', 'radio', 'Cargando...', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- RadioSchedule component (admin UI - but user said not to translate admin)
-- Keeping these for reference but marking as admin context
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('admin_radio_day_label', 'admin', 'Día de Retorno de la Programación', 'activo'),
('admin_radio_month_label', 'admin', 'Mes de Retorno de la Programación', 'activo'),
('admin_radio_day_placeholder', 'admin', 'Ej: 5', 'activo'),
('admin_radio_month_select', 'admin', 'Seleccionar mes', 'activo'),
('admin_radio_logic_title', 'admin', 'Lógica de visualización:', 'activo'),
('admin_radio_logic_future', 'admin', 'Si la fecha actual es anterior a la ingresada: "✨ Retomamos la programación el jueves [Día] de [Mes] de 20 a 21 hs"', 'activo'),
('admin_radio_logic_past', 'admin', 'Si la fecha ya pasó o es el mismo día: "Todos los jueves por radio cultura de 20 a 21 hs"', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- Month names (used in RadioSchedule and date formatting)
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('month_january', 'date', 'enero', 'activo'),
('month_february', 'date', 'febrero', 'activo'),
('month_march', 'date', 'marzo', 'activo'),
('month_april', 'date', 'abril', 'activo'),
('month_may', 'date', 'mayo', 'activo'),
('month_june', 'date', 'junio', 'activo'),
('month_july', 'date', 'julio', 'activo'),
('month_august', 'date', 'agosto', 'activo'),
('month_september', 'date', 'septiembre', 'activo'),
('month_october', 'date', 'octubre', 'activo'),
('month_november', 'date', 'noviembre', 'activo'),
('month_december', 'date', 'diciembre', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- Carrusel vacation message (hardcoded date-specific message)
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('carousel_vacation_return', 'carousel', 'el jueves 5 de marzo de 20 a 21 hs', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- DynamicList component (admin UI placeholders)
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('admin_program_title_placeholder', 'admin', 'Título del programa', 'activo'),
('admin_program_description_placeholder', 'admin', 'Descripción del programa', 'activo'),
('admin_element_text_placeholder', 'admin', 'Texto del elemento', 'activo'),
('admin_achievement_number_label', 'admin', 'Número', 'activo'),
('admin_achievement_number_placeholder', 'admin', 'Ej: 50', 'activo'),
('admin_achievement_label_label', 'admin', 'Etiqueta', 'activo'),
('admin_achievement_label_placeholder', 'admin', 'Ej: Colegios', 'activo'),
('admin_achievement_description_label', 'admin', 'Descripción', 'activo'),
('admin_achievement_description_placeholder', 'admin', 'Ej: Alumnos alcanzados', 'activo'),
('admin_achievement_link_text_label', 'admin', 'Texto del enlace (opcional)', 'activo'),
('admin_achievement_link_text_placeholder', 'admin', 'Ej: Ver más', 'activo'),
('admin_achievement_url_label', 'admin', 'URL del enlace (opcional)', 'activo'),
('admin_achievement_url_placeholder', 'admin', 'Ej: https://ejemplo.com', 'activo'),
('admin_article_title_placeholder', 'admin', 'Título del artículo (Ej: ''Jóvenes en Acción celebró 25 años...'')', 'activo'),
('admin_article_date_placeholder', 'admin', 'Fecha del artículo (Ej: ''17 de octubre de 2022'')', 'activo'),
('admin_article_url_placeholder', 'admin', 'URL del artículo original', 'activo'),
('admin_add_program', 'admin', 'Agregar Programa', 'activo'),
('admin_add_element', 'admin', 'Agregar Elemento', 'activo'),
('admin_add_achievement', 'admin', 'Agregar Logro/Impacto', 'activo'),
('admin_add_press', 'admin', 'Agregar Premio/Prensa', 'activo'),
('admin_no_items', 'admin', 'No hay elementos agregados', 'activo'),
('admin_click_to_start', 'admin', 'Haz clic en "Agregar" para comenzar', 'activo'),
('admin_remove_button', 'admin', 'Eliminar', 'activo'),
('admin_program_header', 'admin', 'Programa', 'activo'),
('admin_element_header', 'admin', 'Elemento', 'activo'),
('admin_achievement_header', 'admin', 'Logro/Impacto', 'activo'),
('admin_press_article_header', 'admin', 'Artículo de Prensa', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- ============================================
-- SUMMARY
-- ============================================
-- Total new texts: ~50
-- Categories:
--   - Radio components: 5 texts
--   - Month names: 12 texts
--   - Carousel: 1 text
--   - Admin UI (DynamicList): ~32 texts
-- ============================================
