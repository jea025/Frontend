-- Script para agregar textos hardcodeados de la home page a contenido_multilenguaje
-- Ejecutar en Supabase SQL Editor

-- Textos de loading/cargando
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado, necesita_revision)
VALUES 
  ('loading_text', 'ui', 'Cargando...', 'auto', false),
  ('loading_subtitle', 'ui', 'Preparando el contenido', 'auto', false);

-- Textos de la sección de prensa
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, estado, necesita_revision)
VALUES 
  ('prensa_title', 'section', 'Prensa y Premios', 'auto', false),
  ('prensa_articles_title', 'section', 'Artículos de Prensa', 'auto', false);

-- Verificar que se insertaron correctamente
SELECT clave, texto_es, texto_en 
FROM contenido_multilenguaje 
WHERE clave IN ('loading_text', 'loading_subtitle', 'prensa_title', 'prensa_articles_title')
ORDER BY clave;
