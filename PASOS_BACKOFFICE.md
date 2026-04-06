# 🚀 Pasos para Actualizar el Backoffice

## ✅ Cambios Completados

He actualizado el backoffice para que guarde en `contenido_multilenguaje` en lugar de `configuracion`.

---

## 📝 Pasos que Debes Seguir

### Paso 1: Ejecutar Migración SQL en Supabase

1. Abre Supabase Dashboard
2. Ve a SQL Editor
3. Copia y pega el contenido de: `Frontend/scripts/migrate-backoffice-keys.sql`
4. Ejecuta el script (botón "Run")
5. Verifica que aparezcan los registros al final

**¿Qué hace este script?**
- Copia las claves del backoffice de `configuracion` a `contenido_multilenguaje`
- Asigna `contexto='backoffice'` para identificarlas
- Usa `texto_es` para el valor en español
- Deja `texto_en` vacío (se llenará con traducción)

### Paso 2: Traducir los Textos

Después de ejecutar la migración SQL, ejecuta en tu terminal:

```bash
cd Frontend
npm run translate
```

Esto traducirá automáticamente todos los textos del backoffice al inglés.

### Paso 3: Probar el Backoffice

1. Abre el backoffice: `http://localhost:3000/admin/login`
2. Ve a "Editar Contenido del Sitio Web"
3. Deberías ver los mismos campos que antes
4. Edita un título del carrusel (por ejemplo, quita los números)
5. Guarda los cambios
6. Ejecuta `npm run translate` en la terminal
7. Verifica en Supabase que `texto_en` se actualizó
8. Cambia el idioma en el sitio web y verifica la traducción

---

## 🔍 Verificar en Supabase

Después de ejecutar la migración, verifica en Supabase:

```sql
-- Ver todas las claves del backoffice
SELECT clave, texto_es, texto_en, contexto
FROM contenido_multilenguaje
WHERE contexto = 'backoffice'
ORDER BY clave;
```

Deberías ver aproximadamente 15-20 registros con `contexto='backoffice'`.

---

## 🎯 Resultado Esperado

**ANTES:**
- Backoffice guardaba en `configuracion` (tabla vieja)
- Frontend leía de `contenido_multilenguaje` (tabla nueva)
- Cambios en backoffice NO aparecían en el sitio web ❌

**AHORA:**
- Backoffice guarda en `contenido_multilenguaje` (tabla nueva)
- Frontend lee de `contenido_multilenguaje` (tabla nueva)
- Cambios en backoffice SÍ aparecen en el sitio web ✅
- Ejecutar `npm run translate` actualiza el inglés automáticamente

---

## ⚠️ Importante

- La tabla `configuracion` sigue existiendo pero ya no se usa
- Todas las ediciones del backoffice ahora van a `contenido_multilenguaje`
- Después de editar en el backoffice, ejecuta `npm run translate` para actualizar el inglés
- Los cambios se reflejan inmediatamente en el sitio web

---

## 📞 Si Algo Sale Mal

Si después de la migración el backoffice no muestra datos:

1. Verifica que ejecutaste el script SQL correctamente
2. Verifica en Supabase que existen registros con `contexto='backoffice'`
3. Revisa la consola del navegador para ver errores
4. Avísame y te ayudo a resolverlo

---

**¿Listo para empezar?** Ejecuta el Paso 1 (migración SQL) y avísame cómo te va! 🚀
