-- ============================================
-- ROUND 5: Carousel JSON texts
-- ============================================
-- Moving hardcoded texts from carousel.json to database
-- ============================================

-- Carousel slide 1 (Radio)
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('carousel_slide1_category', 'carousel', 'Radio en vivo', 'activo'),
('carousel_slide1_title', 'carousel', 'PROGRAMA MULTIMEDIAL, EDUCATIVO Y SOCIAL', 'activo'),
('carousel_slide1_subtitle', 'carousel', 'Los jueves de 20 a 21 h', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- Carousel slide 2 (Cines)
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('carousel_slide2_category', 'carousel', 'Salidas Culturales, Integradoras e Inclusivas', 'activo'),
('carousel_slide2_title', 'carousel', 'Cines Debates con apoyo de Cinépolis y Mc Donald''s', 'activo'),
('carousel_slide2_subtitle', 'carousel', 'Participaron más de 1.500 jóvenes', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- Carousel slide 3 (Museo)
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado) VALUES
('carousel_slide3_category', 'carousel', 'Salidas Culturales, Integradoras e Inclusivas', 'activo'),
('carousel_slide3_title', 'carousel', 'Visita al Museo de Malvinas', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- ============================================
-- SUMMARY
-- ============================================
-- Total new texts: 8
-- All carousel slide texts now in database
-- ============================================
