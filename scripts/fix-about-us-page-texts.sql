-- ============================================
-- FIX: About Us page untranslated texts
-- ============================================
-- Adding missing texts from Prensa and LogrosCombinados components
-- ============================================

-- Press article: AICA (missing from database)
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('prensa_aica_title', 'prensa', 'Jóvenes en Acción celebró 25 años en el desarrollo de valores para brindar oportunidades - AICA.org', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- Press article: La voz de los chicos comprometidos (full article title)
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('prensa_article_full_title', 'prensa', 'La voz de los chicos comprometidos', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- Achievements/Logros texts (hardcoded in LogrosCombinados)
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('logro_ninos_hogares_description', 'logros', 'que viven en Hogares, por causas de abandono familiar, se les ha festejado su Cumpleaños con los voluntarios de Jóvenes en Acción desde 2022', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- ============================================
-- SUMMARY
-- ============================================
-- Total new texts: 3
-- These will fix the remaining untranslated texts in About Us page
-- ============================================
