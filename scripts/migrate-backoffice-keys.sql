-- Migrar claves del backoffice de 'configuracion' a 'contenido_multilenguaje'
-- Este script copia los valores existentes de configuracion a contenido_multilenguaje
-- con contexto='backoffice' para que el backoffice pueda editarlos

-- Insertar claves del carrusel (fotos y títulos)
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, texto_en, estado)
SELECT 
  clave,
  'backoffice' as contexto,
  valor as texto_es,
  NULL as texto_en,
  'activo' as estado
FROM configuracion
WHERE clave IN (
  'carrusel_foto_1', 
  'carrusel_foto_2', 
  'carrusel_foto_3',
  'carrusel_titulo_1', 
  'carrusel_titulo_2', 
  'carrusel_titulo_3'
)
ON CONFLICT (clave) DO UPDATE
SET 
  texto_es = EXCLUDED.texto_es,
  contexto = 'backoffice',
  updated_at = NOW();

-- Insertar textos de misión y visión
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, texto_en, estado)
SELECT 
  clave,
  'backoffice' as contexto,
  valor as texto_es,
  NULL as texto_en,
  'activo' as estado
FROM configuracion
WHERE clave IN (
  'descripcion_larga',
  'mision_texto',
  'vision_texto'
)
ON CONFLICT (clave) DO UPDATE
SET 
  texto_es = EXCLUDED.texto_es,
  contexto = 'backoffice',
  updated_at = NOW();

-- Insertar datos de contacto
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, texto_en, estado)
SELECT 
  clave,
  'backoffice' as contexto,
  valor as texto_es,
  NULL as texto_en,
  'activo' as estado
FROM configuracion
WHERE clave IN (
  'contacto_email',
  'contacto_telefono',
  'direccion',
  'facebook_url',
  'instagram_url'
)
ON CONFLICT (clave) DO UPDATE
SET 
  texto_es = EXCLUDED.texto_es,
  contexto = 'backoffice',
  updated_at = NOW();

-- Insertar listas (logros y prensa) - estos son JSON
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, texto_en, estado)
SELECT 
  clave,
  'backoffice' as contexto,
  valor as texto_es,
  NULL as texto_en,
  'activo' as estado
FROM configuracion
WHERE clave IN (
  'logros_list',
  'prensa_list'
)
ON CONFLICT (clave) DO UPDATE
SET 
  texto_es = EXCLUDED.texto_es,
  contexto = 'backoffice',
  updated_at = NOW();

-- Insertar programación de radio
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es, texto_en, estado)
SELECT 
  clave,
  'backoffice' as contexto,
  valor as texto_es,
  NULL as texto_en,
  'activo' as estado
FROM configuracion
WHERE clave IN (
  'radio_dia',
  'radio_mes'
)
ON CONFLICT (clave) DO UPDATE
SET 
  texto_es = EXCLUDED.texto_es,
  contexto = 'backoffice',
  updated_at = NOW();

-- Verificar resultados
SELECT 
  clave, 
  contexto, 
  LEFT(texto_es, 50) as texto_es_preview,
  LEFT(texto_en, 50) as texto_en_preview
FROM contenido_multilenguaje
WHERE contexto = 'backoffice'
ORDER BY clave;
