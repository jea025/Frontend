-- Agregar título y textos para la sección de testimonios de personalidades
-- Esta sección aparecerá debajo del video de Fundación Barceló en la galería

-- Título de la sección
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, texto_en, estado)
VALUES (
  'gallery_testimonials_title',
  'gallery',
  'Personalidades que han pasado por nuestro espacio y sus testimonios',
  NULL,
  'activo'
)
ON CONFLICT (clave) DO UPDATE
SET 
  texto_es = EXCLUDED.texto_es,
  contexto = 'gallery',
  updated_at = NOW();

-- Texto del botón de Instagram para Victor Valle
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, texto_en, estado)
VALUES (
  'gallery_testimonials_instagram_button',
  'gallery',
  'Ver Reel Victor Valle',
  NULL,
  'activo'
)
ON CONFLICT (clave) DO UPDATE
SET 
  texto_es = EXCLUDED.texto_es,
  contexto = 'gallery',
  updated_at = NOW();

-- Verificar los resultados
SELECT clave, texto_es, texto_en, contexto
FROM contenido_multilenguaje
WHERE clave IN ('gallery_testimonials_title', 'gallery_testimonials_instagram_button')
ORDER BY clave;
