-- =============================================
-- LIMPIEZA DE PRENSA - JEA Frontend
-- =============================================
-- Ejecutar este código en el SQL Editor de Supabase
-- para limpiar la clave prensa_list antes de cargar nuevos datos

-- ELIMINAR DATOS VIEJOS (formato antiguo con 'descripcion')
DELETE FROM configuracion WHERE clave = 'prensa_list';

-- INSERTAR DATOS DE EJEMPLO (nuevo formato: titulo, fecha, url)
INSERT INTO configuracion (clave, valor, seccion, tipo) VALUES 
('prensa_list', '[
  {
    "id": "1",
    "titulo": "Jóvenes en Acción celebró 25 años en el desarrollo de valores para brindar oportunidades",
    "fecha": "17 de octubre de 2022",
    "url": "https://aica.org/noticia-jovenes-en-accion-celebro-25-anos-en-el-desarrollo-de-valores-para-brindar-oportunidades"
  }
]', 'prensa', 'lista_prensa');

-- Verificar que se insertó correctamente
SELECT clave, LENGTH(valor) as longitud, LEFT(valor, 100) as preview 
FROM configuracion 
WHERE clave = 'prensa_list';
