# 🚀 Instrucciones para Ejecutar - Fase 1

## ✅ Lo que YA hice (código actualizado)

1. ✅ Arreglé el error de `PrensaDinamica.tsx` (ya no busca en tabla vacía)
2. ✅ Actualicé `Footer.tsx` para consumir de Supabase
3. ✅ Actualicé `app/not-found.tsx` (página 404) para consumir de Supabase
4. ✅ Actualicé `Contactos.tsx` (formulario completo) para consumir de Supabase
5. ✅ Creé hook reutilizable `hooks/useContent.ts` para simplificar código

## 📋 Lo que VOS tenés que hacer ahora

### PASO 1: Ejecutar SQL en Supabase (5 minutos)

1. Abrir Supabase Dashboard: https://supabase.com/dashboard
2. Ir a tu proyecto
3. Click en "SQL Editor" (menú izquierdo)
4. Click en "New Query"
5. Copiar TODO el contenido del archivo: `Frontend/scripts/add-all-remaining-texts.sql`
6. Pegar en el editor
7. Click en "Run" (o F5)
8. Verificar que dice algo como: "Success. No rows returned"

**¿Qué hace este SQL?**
- Agrega ~80 textos nuevos a la tabla `contenido_multilenguaje`
- Incluye: Footer, 404, Contacto, Prensa, Galería, etc.
- Usa `ON CONFLICT DO NOTHING` para no duplicar

### PASO 2: Traducir Automáticamente (2 minutos)

```bash
cd Frontend
npm run translate
```

**Resultado esperado:**
```
🌐 Iniciando traducción automática de contenido...
📋 Cargando registros de contenido_multilenguaje...
✅ Cargados 177 registros

🔍 Encontrados 80 registros que necesitan traducción

[1/80] Traduciendo: footer_copyright
  📝 ES: © 2026 Jóvenes en Acción. Todos los derechos reservados.
  ✅ EN: © 2026 Youth in Action. All rights reserved.

...

📊 RESUMEN DE TRADUCCIÓN
✅ Exitosas: 80
❌ Errores: 0
```

### PASO 3: Recargar la Página (1 segundo)

1. Ir a http://localhost:3000
2. Hacer hard refresh: `Ctrl + Shift + R` (o `Cmd + Shift + R` en Mac)
3. Cambiar idioma a inglés con el botón EN
4. Verificar que ahora se traduce:
   - ✅ Footer (copyright)
   - ✅ Página 404 (si vas a /asdfasdf)
   - ✅ Formulario de contacto (si vas a /contacto)

---

## 🎯 ¿Qué va a pasar?

### Antes (hardcodeado)
```tsx
<h2>Contactos</h2>
<label>Nombre</label>
<button>Enviar mensaje</button>
```

### Después (desde Supabase)
```tsx
<h2>{content.title}</h2>           // "Contactos" → "Contact"
<label>{content.form_name}</label>  // "Nombre" → "Name"
<button>{content.form_submit}</button> // "Enviar mensaje" → "Send message"
```

---

## 🐛 Si algo falla

### Error: "No se encontraron datos"
**Causa:** El SQL no se ejecutó correctamente  
**Solución:** Verificar en Supabase que los registros existen:
```sql
SELECT COUNT(*) FROM contenido_multilenguaje;
-- Debería dar ~177 registros
```

### Error: "texto_en es null"
**Causa:** No ejecutaste `npm run translate`  
**Solución:** Ejecutar el comando y esperar que termine

### Error: "DEEPL_API_KEY no encontrada"
**Causa:** Falta la API key en `.env.local`  
**Solución:** Ya la tenés configurada, pero verificar que esté

---

## 📊 Verificación Rápida

Después de ejecutar todo, verificar en Supabase:

```sql
-- Ver cuántos textos están traducidos
SELECT 
  COUNT(*) as total,
  COUNT(texto_en) as traducidos,
  COUNT(*) - COUNT(texto_en) as pendientes
FROM contenido_multilenguaje;

-- Ver algunos ejemplos
SELECT clave, texto_es, texto_en 
FROM contenido_multilenguaje 
WHERE clave LIKE 'contact_%'
LIMIT 5;
```

---

## 🎉 Resultado Final Esperado

Después de estos 3 pasos, tu sitio debería tener:

- ✅ **~177 textos en la base de datos**
- ✅ **100% traducidos automáticamente**
- ✅ **Footer traducido**
- ✅ **Página 404 traducida**
- ✅ **Formulario de contacto traducido**
- ✅ **Home page traducido** (ya estaba)
- ✅ **Navbar traducido** (ya estaba)

---

## 🚀 Próximos Pasos (después de esto)

Una vez que verifiques que todo funciona:

1. **Actualizar más componentes** (Galería, Prensa estática, etc.)
2. **Implementar backoffice** para editar sin código
3. **Configurar traducción automática** con triggers de Supabase

---

**¿Dudas?** Avisame si algo no funciona y lo arreglamos juntos.
