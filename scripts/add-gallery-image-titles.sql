-- ============================================
-- ROUND 9: Add Gallery Image Titles
-- ============================================
-- Adding titles for all gallery images (CEOs, Schools, Forestry, Volunteer)
-- ============================================

-- ============================================
-- CEOs and Entrepreneurs Gallery (3 images)
-- ============================================
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('gallery_ceos_img1_title', 'gallery', 'Entrevista con Victor Valle CEO de GOOGLE Argentina', 'activo'),
('gallery_ceos_img2_title', 'gallery', 'Entrevista a Alejandro y Micaela Kelman', 'activo'),
('gallery_ceos_img3_title', 'gallery', 'Entrevista al equipo ganador del 3er puesto del Premio Banco Patagonia Innova del 2013', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- ============================================
-- Schools/Colegios Gallery (2 images)
-- ============================================
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('gallery_schools_img1_title', 'gallery', 'Jóvenes Conductores', 'activo'),
('gallery_schools_img2_title', 'gallery', 'Experiencia Radiofónica', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- ============================================
-- Forestry/Plantación Gallery (3 images)
-- ============================================
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('gallery_forest_img1_title', 'gallery', 'Plantación de Árboles Frutales', 'activo'),
('gallery_forest_img2_title', 'gallery', 'Educación Ambiental', 'activo'),
('gallery_forest_img3_title', 'gallery', 'Compromiso con el Medio Ambiente', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- ============================================
-- Volunteer/Voluntariado Gallery (3 images)
-- ============================================
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado)
VALUES 
('gallery_volunteer_img1_title', 'gallery', 'V H', 'activo'),
('gallery_volunteer_img2_title', 'gallery', 'Cumpleaños Hogar', 'activo'),
('gallery_volunteer_img3_title', 'gallery', 'Festejo Hogar', 'activo')
ON CONFLICT (clave) DO NOTHING;

-- ============================================
-- SUMMARY
-- ============================================
-- Total new texts: 11 image titles
-- - 3 CEOs gallery images
-- - 2 Schools gallery images
-- - 3 Forestry gallery images
-- - 3 Volunteer gallery images
-- ============================================
