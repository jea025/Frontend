-- ============================================
-- FIX: Home page untranslated texts
-- ============================================
-- Fixing texts that are showing mixed languages
-- ============================================

-- About section title (currently "Acerca de nosotros")
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('about_section_title', 'about', 'Acerca de nosotros', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- Mission and Vision titles (currently "MISIÓN" and "VISIÓN")
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('mission_title', 'about', 'MISIÓN', 'activo'),
('vision_title', 'about', 'VISIÓN', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- ============================================
-- SUMMARY
-- ============================================
-- Total new texts: 3
-- These will fix the mixed language issues in Home page
-- ============================================
