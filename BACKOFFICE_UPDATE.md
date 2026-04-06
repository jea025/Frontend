# Actualización del Backoffice para i18n

## 🎯 Cambios Realizados

El backoffice ahora guarda en la tabla `contenido_multilenguaje` en lugar de `configuracion`, lo que permite:
- Editar textos en español desde el backoffice
- Ejecutar `npm run translate` para actualizar automáticamente el inglés
- Mantener sincronización entre backoffice y frontend

---

## 📋 Archivos Modificados

### 1. `Frontend/app/admin/editar-web/api/save/route.ts`
**Cambio:** Ahora guarda en `contenido_multilenguaje` en lugar de `configuracion`

```typescript
// ANTES:
.from('configuracion')
.upsert({ 
  clave: update.clave, 
  valor: update.valor,
  tipo: 'texto',
  seccion: 'General'
})

// AHORA:
.from('contenido_multilenguaje')
.upsert({ 
  clave: update.clave, 
  texto_es: update.valor,
  contexto: 'backoffice',
  estado: 'activo'
})
```

### 2. `Frontend/app/admin/editar-web/page.tsx`
**Cambio:** Lee de `contenido_multilenguaje` con filtro `contexto='backoffice'`

```typescript
// ANTES:
.from('configuracion')
.select('*')

// AHORA:
.from('contenido_multilenguaje')
.select('id, clave, texto_es, texto_en, contexto')
.eq('contexto', 'backoffice')
```

---

## 🚀 Pasos para Aplicar los Cambios

### Paso 1: Ejecutar Migración SQL

Ejecuta el script en Supabase SQL Editor:

```bash
Frontend/scripts/migrate-backoffice-keys.sql
```

Este script:
- Copia datos de `configuracion` a `contenido_multilenguaje`
- Asigna `contexto='backoffice'` a las claves editables
- Usa `texto_es` para el valor en español
- Deja `texto_en` como NULL (se llenará con traducción)

### Paso 2: Traducir los Textos

Después de ejecutar la migración, traduce los textos:

```bash
cd Frontend
npm run translate
```

Esto traducirá automáticamente todos los `texto_es` que no tengan `texto_en`.

### Paso 3: Verificar en el Backoffice

1. Abre el backoffice: `http://localhost:3000/admin/login`
2. Ve a "Editar Contenido del Sitio Web"
3. Verifica que se carguen los textos correctamente
4. Edita un texto (por ejemplo, un título del carrusel)
5. Guarda los cambios
6. Ejecuta `npm run translate` en la terminal
7. Verifica en Supabase que `texto_en` se actualizó
8. Cambia el idioma en el sitio web y verifica la traducción

---

## 🔄 Flujo de Trabajo Actualizado

### Editar Contenido desde Backoffice

1. **Jefa edita texto en backoffice**
   - Abre `/admin/editar-web`
   - Edita "Título Carrusel 1" de "Bienvenidos" a "Bienvenidos a JEA"
   - Click en "Guardar Cambios"

2. **Sistema guarda en Supabase**
   ```sql
   UPDATE contenido_multilenguaje 
   SET texto_es = 'Bienvenidos a JEA'
   WHERE clave = 'carrusel_titulo_1'
   ```

3. **Developer ejecuta traducción**
   ```bash
   npm run translate
   ```

4. **Sistema traduce automáticamente**
   - Lee `texto_es = 'Bienvenidos a JEA'`
   - Llama a DeepL API
   - Actualiza `texto_en = 'Welcome to JEA'`

5. **Frontend refleja cambios**
   - Usuario en español ve: "Bienvenidos a JEA"
   - Usuario en inglés ve: "Welcome to JEA"

---

## 📊 Claves Editables en Backoffice

Las siguientes claves están disponibles para edición en el backoffice (todas con `contexto='backoffice'`):

### Carrusel
- `carrusel_foto_1`, `carrusel_foto_2`, `carrusel_foto_3`
- `carrusel_titulo_1`, `carrusel_titulo_2`, `carrusel_titulo_3`

### Textos Principales
- `descripcion_larga`
- `mision_texto`
- `vision_texto`

### Contacto
- `contacto_email`
- `contacto_telefono`
- `direccion`
- `facebook_url`
- `instagram_url`

### Listas (JSON)
- `logros_list`
- `prensa_list`

### Radio
- `radio_dia`
- `radio_mes`

---

## ⚠️ Notas Importantes

### Contexto 'backoffice'
- Las claves editables desde el backoffice tienen `contexto='backoffice'`
- Esto las diferencia de las claves del frontend que tienen otros contextos
- El backoffice solo muestra y edita claves con `contexto='backoffice'`

### Traducción Manual
- Por ahora, la traducción requiere ejecutar `npm run translate` manualmente
- En el futuro, se puede implementar traducción automática con Supabase Edge Functions y Triggers

### Tabla 'configuracion'
- La tabla `configuracion` sigue existiendo pero ya no se usa para el backoffice
- Puedes mantenerla para compatibilidad con código legacy
- Eventualmente se puede eliminar cuando todo esté migrado

---

## 🧪 Testing

### Test Manual

1. **Editar un texto:**
   ```
   - Abrir backoffice
   - Editar "Misión"
   - Guardar
   - Verificar en Supabase que texto_es cambió
   ```

2. **Traducir:**
   ```bash
   npm run translate
   ```

3. **Verificar traducción:**
   ```
   - Verificar en Supabase que texto_en se actualizó
   - Cambiar idioma en el sitio web
   - Verificar que se ve la traducción nueva
   ```

### Verificar en Supabase

```sql
-- Ver todas las claves del backoffice
SELECT clave, texto_es, texto_en, contexto
FROM contenido_multilenguaje
WHERE contexto = 'backoffice'
ORDER BY clave;

-- Ver una clave específica
SELECT *
FROM contenido_multilenguaje
WHERE clave = 'carrusel_titulo_1';
```

---

## 🔮 Próximos Pasos (Opcional)

### Traducción Automática con Triggers

Para que la traducción sea automática sin necesidad de ejecutar `npm run translate`:

1. Crear Supabase Edge Function para traducir
2. Crear Database Trigger que detecte cambios en `texto_es`
3. Trigger llama a Edge Function automáticamente
4. Edge Function traduce y actualiza `texto_en`

Ver `Frontend/BACKOFFICE_TRANSLATION_FLOW.md` para implementación detallada.

---

**Última actualización:** 6 de abril de 2026  
**Autor:** Kiro AI Assistant
