-- =============================================
-- LIMPIEZA TOTAL DE SUPABASE - JEA Frontend
-- =============================================
-- Ejecutar este código en el SQL Editor de Supabase
-- para eliminar las claves innecesarias (SIN TOCAR CONTACTO)

-- CLAVES A ELIMINAR (ya no se usan en el sistema):
DELETE FROM configuracion WHERE clave IN (
    'titulo_web',
    'logo_ong', 
    'foto_principal',
    'conocenos_list',
    'programas_list'
);

-- CLAVES QUE SE MANTIENEN (esenciales para el sistema):
-- carrusel_foto_1, carrusel_foto_2, carrusel_foto_3
-- carrusel_titulo_1, carrusel_titulo_2, carrusel_titulo_3  
-- radio_dia, radio_mes
-- descripcion_larga, mision_texto, vision_texto
-- logros_list, prensa_list

-- CLAVES DE CONTACTO (NO TOCAR - QUEDAN INTACTAS):
-- contacto_email, contacto_telefono, direccion
-- facebook_url, instagram_url

-- Verificación: Mostrar las claves restantes
SELECT clave, valor, tipo, seccion 
FROM configuracion 
ORDER BY seccion, clave;

-- =============================================
-- RESULTADO ESPERADO:
-- 13 claves esenciales + 5 claves de contacto = 18 filas totales
-- =============================================
