# Solución: Detección de Cambios con Hash MD5

## 🐛 Problema Original

Cuando editabas un texto en el backoffice y ejecutabas `npm run translate`, la traducción NO se actualizaba porque:

1. El script `translate-content.mjs` solo traducía registros donde `texto_en` estaba vacío
2. Cuando migramos de `configuracion`, algunos registros ya tenían `texto_en` con valores viejos
3. Al editar en el backoffice, `texto_es` cambiaba pero `texto_en` seguía con el valor viejo
4. El script no detectaba que necesitaba re-traducir

**Ejemplo:**
- Editaste "Título 1" → "Título 57" en español
- `texto_en` seguía siendo "Title 1" (valor viejo)
- El script no lo re-traducía porque `texto_en` no estaba vacío

---

## ✅ Solución Implementada

Ahora usamos el campo `hash_md5` para detectar cuando `texto_es` cambió:

### 1. Al Guardar desde Backoffice
Cuando guardas un texto en el backoffice, el sistema:
- Calcula el hash MD5 del nuevo `texto_es`
- Guarda el hash en el campo `hash_md5`
- Esto marca que el texto cambió

### 2. Al Ejecutar `npm run translate`
El script ahora:
- Lee el `hash_md5` guardado en la base de datos
- Calcula el hash MD5 actual del `texto_es`
- Si los hashes NO coinciden → significa que `texto_es` cambió → re-traduce
- Después de traducir, actualiza `hash_md5` con el nuevo valor

---

## 🔄 Flujo Completo

### Paso 1: Editar en Backoffice
```
Usuario edita: "Título 1" → "Título 57"
```

### Paso 2: Sistema Guarda
```typescript
// API calcula hash del nuevo texto
const hash = crypto.createHash('md5').update("Título 57").digest('hex')
// hash = "a1b2c3d4..."

// Guarda en Supabase
UPDATE contenido_multilenguaje 
SET 
  texto_es = 'Título 57',
  hash_md5 = 'a1b2c3d4...'
WHERE clave = 'carrusel_titulo_1'
```

### Paso 3: Ejecutar Traducción
```bash
npm run translate
```

### Paso 4: Script Detecta Cambio
```typescript
// Script lee de Supabase:
// texto_es = "Título 57"
// texto_en = "Title 1" (viejo)
// hash_md5 = "a1b2c3d4..." (nuevo)

// Calcula hash actual de texto_es
const currentHash = crypto.createHash('md5').update("Título 57").digest('hex')
// currentHash = "a1b2c3d4..."

// Compara hashes
if (hash_md5 === currentHash) {
  // ✅ Hashes coinciden → texto_es NO cambió → NO traducir
} else {
  // 🔄 Hashes NO coinciden → texto_es SÍ cambió → RE-TRADUCIR
}
```

### Paso 5: Sistema Traduce
```typescript
// Traduce con DeepL
const translatedText = await translateWithDeepL("Título 57")
// translatedText = "Title 57"

// Actualiza en Supabase
UPDATE contenido_multilenguaje 
SET 
  texto_en = 'Title 57',
  hash_md5 = 'a1b2c3d4...'
WHERE clave = 'carrusel_titulo_1'
```

---

## 📋 Archivos Modificados

### 1. `Frontend/app/admin/editar-web/api/save/route.ts`
**Cambio:** Ahora calcula y guarda `hash_md5` al guardar

```typescript
// ANTES:
.upsert({ 
  clave: update.clave, 
  texto_es: update.valor,
  contexto: 'backoffice',
  estado: 'activo'
})

// AHORA:
const hash = crypto.createHash('md5').update(update.valor).digest('hex')

.upsert({ 
  clave: update.clave, 
  texto_es: update.valor,
  hash_md5: hash,  // ← NUEVO
  contexto: 'backoffice',
  estado: 'activo'
})
```

### 2. `Frontend/scripts/translate-content.mjs`
**Cambio:** Ahora detecta cambios comparando hashes

```javascript
// ANTES:
const needsTranslation = records.filter(record => {
  return !record.texto_en || record.texto_en.trim() === ''
})

// AHORA:
const needsTranslation = records.filter(record => {
  // Caso 1: texto_en vacío
  if (!record.texto_en || record.texto_en.trim() === '') {
    return true
  }
  
  // Caso 2: Hash cambió (texto_es fue editado)
  const currentHash = crypto.createHash('md5').update(record.texto_es).digest('hex')
  if (record.hash_md5 && record.hash_md5 !== currentHash) {
    console.log(`🔄 Detectado cambio en: ${record.clave}`)
    return true
  }
  
  return false
})
```

---

## 🧪 Cómo Probar

### Test 1: Editar y Re-traducir

1. **Editar en backoffice:**
   - Abre `/admin/editar-web`
   - Edita "Título Carrusel 1"
   - Cambia de "Bienvenidos" a "Bienvenidos 2024"
   - Guarda

2. **Verificar en Supabase:**
   ```sql
   SELECT clave, texto_es, texto_en, hash_md5
   FROM contenido_multilenguaje
   WHERE clave = 'carrusel_titulo_1';
   ```
   - `texto_es` debe ser "Bienvenidos 2024"
   - `texto_en` todavía es "Welcome" (viejo)
   - `hash_md5` debe tener un valor nuevo

3. **Ejecutar traducción:**
   ```bash
   npm run translate
   ```
   - Deberías ver: "🔄 Detectado cambio en: carrusel_titulo_1"
   - Deberías ver: "✅ EN: Welcome 2024..."

4. **Verificar resultado:**
   ```sql
   SELECT clave, texto_es, texto_en, hash_md5
   FROM contenido_multilenguaje
   WHERE clave = 'carrusel_titulo_1';
   ```
   - `texto_en` ahora debe ser "Welcome 2024"

5. **Verificar en el sitio web:**
   - Cambia idioma a inglés
   - Verifica que se vea "Welcome 2024"

---

## 💡 Ventajas de Esta Solución

### 1. Detección Automática de Cambios
- No necesitas marcar manualmente qué textos cambiaron
- El hash MD5 detecta automáticamente cualquier cambio en `texto_es`

### 2. Eficiencia
- Solo re-traduce textos que realmente cambiaron
- No desperdicia llamadas a la API de traducción

### 3. Cache Inteligente
- El hash MD5 actúa como cache
- Si el texto no cambió, no se re-traduce

### 4. Trazabilidad
- Puedes ver en los logs qué textos se detectaron como cambiados
- Útil para debugging

---

## 🔮 Próximos Pasos (Opcional)

### Traducción Automática con Triggers

Para que la traducción sea completamente automática (sin ejecutar `npm run translate`):

1. Crear Supabase Edge Function que traduce
2. Crear Database Trigger que detecta cuando `hash_md5` cambia
3. Trigger llama a Edge Function automáticamente
4. Edge Function traduce y actualiza `texto_en`

Ver `Frontend/BACKOFFICE_TRANSLATION_FLOW.md` para implementación detallada.

---

## 📊 Resumen Técnico

**Campo `hash_md5`:**
- Tipo: `TEXT`
- Propósito: Detectar cambios en `texto_es`
- Cálculo: `MD5(texto_es)`
- Actualización: Cada vez que se guarda `texto_es`

**Lógica de Re-traducción:**
```
SI texto_en está vacío → TRADUCIR
SI hash_md5 ≠ MD5(texto_es) → RE-TRADUCIR
SI NO → NO TRADUCIR (ya está actualizado)
```

---

**Última actualización:** 6 de abril de 2026  
**Autor:** Kiro AI Assistant
