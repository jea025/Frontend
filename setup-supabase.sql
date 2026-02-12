-- ===================================
-- POLÍTICAS PARA TABLA CONFIGURACION
-- ===================================

-- Habilitar RLS en la tabla configuracion
ALTER TABLE configuracion ENABLE ROW LEVEL SECURITY;

-- Política para permitir lectura a usuarios autenticados
CREATE POLICY "Permitir lectura de configuración a usuarios autenticados"
ON configuracion FOR SELECT
USING (auth.role() = 'authenticated');

-- Política para permitir actualización a usuarios autenticados
CREATE POLICY "Permitir actualización de configuración a usuarios autenticados"
ON configuracion FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- ===================================
-- POLÍTICAS PARA BUCKET IMAGENES_WEB
-- ===================================

-- Crear bucket si no existe (ejecutar solo una vez)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('imagenes_web', 'imagenes_web', true);

-- Políticas para el bucket imagenes_web
CREATE POLICY "Permitir subida de imágenes a usuarios autenticados"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'imagenes_web' AND 
  auth.role() = 'authenticated'
);

CREATE POLICY "Permitir lectura de imágenes a todos"
ON storage.objects FOR SELECT
USING (bucket_id = 'imagenes_web');

CREATE POLICY "Permitir actualización de imágenes a usuarios autenticados"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'imagenes_web' AND 
  auth.role() = 'authenticated'
);

CREATE POLICY "Permitir eliminación de imágenes a usuarios autenticados"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'imagenes_web' AND 
  auth.role() = 'authenticated'
);

-- ===================================
-- DATOS DE EJEMPLO (si los quieres agregar)
-- ===================================

-- Insertar datos de ejemplo (ejecutar solo si la tabla está vacía)
INSERT INTO configuracion (clave, valor, tipo, seccion) VALUES 
('titulo_web', 'Jóvenes en Acción', 'texto', 'Cabecera'),
('descripcion_larga', 'Somos una organización dedicada a empoderar a los jóvenes mediante programas educativos y de desarrollo comunitario.', 'textarea', 'Nosotros'),
('foto_principal', 'https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Jóvenes+en+Acción', 'imagen', 'Inicio'),
('mision', 'Nuestra misión es transformar vidas a través de la educación y el desarrollo de habilidades.', 'textarea', 'Nosotros'),
('vision', 'Ser la organización líder en el desarrollo juvenil de la región.', 'texto', 'Nosotros'),
('contacto_email', 'contacto@jovenesenaccion.org', 'texto', 'Contacto'),
('contacto_telefono', '+54 11 1234-5678', 'texto', 'Contacto'),
('direccion', 'Av. Principal 123, Ciudad', 'texto', 'Contacto'),
('facebook_url', 'https://facebook.com/jovenesenaccion', 'texto', 'Redes'),
('instagram_url', 'https://instagram.com/jovenesenaccion', 'texto', 'Redes'),
('logo_header', 'https://via.placeholder.com/150x50/4F46E5/FFFFFF?text=LOGO', 'imagen', 'Cabecera')
ON CONFLICT (clave) DO NOTHING;
