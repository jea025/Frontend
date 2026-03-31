# Flujo de Traducción Automática desde Backoffice

## 🎯 Objetivo

Cuando el usuario edita un texto en español desde el backoffice, el sistema debe:
1. Detectar que cambió el `texto_es`
2. Traducir automáticamente con DeepL
3. Actualizar el `texto_en` en Supabase
4. Reflejar el cambio en el sitio web inmediatamente

---

## 🏗️ Arquitectura del Sistema

### Componentes

```
┌─────────────────────────────────────────────────────────────┐
│                        BACKOFFICE                            │
│  (Usuario edita texto_es y guarda)                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    SUPABASE TRIGGER                          │
│  Detecta UPDATE en contenido_multilenguaje                  │
│  Si texto_es cambió → llama a Edge Function                 │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                  SUPABASE EDGE FUNCTION                      │
│  1. Recibe texto_es nuevo                                   │
│  2. Llama a DeepL API                                       │
│  3. Actualiza texto_en en la tabla                          │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Cliente)                        │
│  Lee contenido_localizado (VIEW)                            │
│  Muestra texto según idioma seleccionado                    │
└─────────────────────────────────────────────────────────────┘
```

---

## 📝 Implementación Paso a Paso

### PASO 1: Crear Edge Function en Supabase

**Archivo:** `supabase/functions/translate-content/index.ts`

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const DEEPL_API_KEY = Deno.env.get('DEEPL_API_KEY')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

serve(async (req) => {
  try {
    const { record } = await req.json()
    
    // Extraer el texto en español
    const textoEs = record.texto_es
    
    if (!textoEs) {
      return new Response(
        JSON.stringify({ error: 'No hay texto_es para traducir' }),
        { status: 400 }
      )
    }

    // Traducir con DeepL
    const response = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text: textoEs,
        source_lang: 'ES',
        target_lang: 'EN',
      }),
    })

    if (!response.ok) {
      throw new Error(`DeepL API error: ${response.status}`)
    }

    const data = await response.json()
    const textoEn = data.translations[0].text

    // Actualizar en Supabase
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_KEY!)
    
    const { error: updateError } = await supabase
      .from('contenido_multilenguaje')
      .update({ texto_en: textoEn })
      .eq('id', record.id)

    if (updateError) {
      throw updateError
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        texto_en: textoEn,
        message: 'Traducción completada'
      }),
      { status: 200 }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    )
  }
})
```

### PASO 2: Crear Database Trigger

**SQL para ejecutar en Supabase:**

```sql
-- Función que se ejecuta cuando cambia texto_es
CREATE OR REPLACE FUNCTION trigger_translate_content()
RETURNS TRIGGER AS $$
BEGIN
  -- Solo traducir si texto_es cambió
  IF NEW.texto_es IS DISTINCT FROM OLD.texto_es THEN
    -- Llamar a la Edge Function de forma asíncrona
    PERFORM net.http_post(
      url := 'https://[TU-PROJECT-ID].supabase.co/functions/v1/translate-content',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
      ),
      body := jsonb_build_object('record', row_to_json(NEW))
    );
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Crear el trigger
DROP TRIGGER IF EXISTS on_content_update_translate ON contenido_multilenguaje;

CREATE TRIGGER on_content_update_translate
  AFTER UPDATE ON contenido_multilenguaje
  FOR EACH ROW
  EXECUTE FUNCTION trigger_translate_content();
```

### PASO 3: Configurar Variables de Entorno en Supabase

En el dashboard de Supabase → Settings → Edge Functions → Environment Variables:

```env
DEEPL_API_KEY=tu_api_key_aqui
GOOGLE_TRANSLATE_API_KEY=tu_api_key_aqui (fallback)
```

### PASO 4: Actualizar Backoffice para Editar Contenido

**Componente:** `Frontend/components/admin/ContentEditor.tsx`

```typescript
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

interface ContentItem {
  id: string
  clave: string
  contexto: string
  texto_es: string
  texto_en: string
  necesita_revision: boolean
}

export default function ContentEditor() {
  const [items, setItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState<string | null>(null)

  useEffect(() => {
    loadContent()
  }, [])

  async function loadContent() {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('contenido_multilenguaje')
      .select('*')
      .order('contexto', { ascending: true })

    if (!error && data) {
      setItems(data)
    }
    setLoading(false)
  }

  async function saveItem(item: ContentItem) {
    setSaving(item.id)
    const supabase = createClient()
    
    // Actualizar solo texto_es
    // El trigger se encargará de traducir automáticamente
    const { error } = await supabase
      .from('contenido_multilenguaje')
      .update({ 
        texto_es: item.texto_es,
        necesita_revision: false 
      })
      .eq('id', item.id)

    if (error) {
      alert('Error al guardar: ' + error.message)
    } else {
      alert('✅ Guardado! La traducción se actualizará automáticamente.')
      // Recargar para ver la traducción actualizada
      setTimeout(loadContent, 2000)
    }
    
    setSaving(null)
  }

  if (loading) return <div>Cargando...</div>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Editor de Contenido</h1>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 bg-white shadow">
            <div className="mb-2">
              <span className="font-semibold">{item.clave}</span>
              <span className="text-sm text-gray-500 ml-2">({item.contexto})</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Español - EDITABLE */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  🇪🇸 Español
                </label>
                <textarea
                  value={item.texto_es}
                  onChange={(e) => {
                    const updated = items.map(i => 
                      i.id === item.id ? { ...i, texto_es: e.target.value } : i
                    )
                    setItems(updated)
                  }}
                  className="w-full p-2 border rounded"
                  rows={3}
                />
              </div>

              {/* Inglés - SOLO LECTURA */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  🇬🇧 Inglés (auto-traducido)
                </label>
                <textarea
                  value={item.texto_en || 'Pendiente de traducción...'}
                  disabled
                  className="w-full p-2 border rounded bg-gray-50"
                  rows={3}
                />
              </div>
            </div>

            <button
              onClick={() => saveItem(item)}
              disabled={saving === item.id}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {saving === item.id ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## 🔄 Flujo Completo de Usuario

### Escenario: Usuario edita "Misión" en el backoffice

1. **Usuario abre backoffice**
   - Ve lista de todos los textos
   - Encuentra "mision_texto"
   - Texto actual: "Promover la educación en valores..."

2. **Usuario edita el texto en español**
   - Cambia a: "Fomentar la educación integral..."
   - Click en "Guardar"

3. **Sistema guarda en Supabase**
   ```sql
   UPDATE contenido_multilenguaje 
   SET texto_es = 'Fomentar la educación integral...'
   WHERE clave = 'mision_texto'
   ```

4. **Trigger detecta el cambio**
   - Se ejecuta `trigger_translate_content()`
   - Compara OLD.texto_es vs NEW.texto_es
   - Son diferentes → llama a Edge Function

5. **Edge Function traduce**
   - Recibe: "Fomentar la educación integral..."
   - Llama a DeepL API
   - Recibe: "Promote comprehensive education..."
   - Actualiza `texto_en` en la tabla

6. **Frontend refleja el cambio**
   - Usuario en español ve: "Fomentar la educación integral..."
   - Usuario en inglés ve: "Promote comprehensive education..."
   - Sin necesidad de recargar (si usa real-time subscriptions)

---

## ⚡ Optimizaciones

### 1. Caché de Traducciones

Para evitar traducir el mismo texto múltiples veces:

```sql
-- Antes de traducir, verificar si ya existe en caché
SELECT texto_en FROM traduciones_cache 
WHERE hash_md5 = MD5('texto en español');

-- Si existe, usar esa traducción
-- Si no existe, traducir y guardar en caché
```

### 2. Real-time Updates

Usar Supabase Realtime para actualizar el frontend automáticamente:

```typescript
// En el componente del frontend
useEffect(() => {
  const supabase = createClient()
  
  const channel = supabase
    .channel('content-changes')
    .on(
      'postgres_changes',
      {
        event: 'UPDATE',
        schema: 'public',
        table: 'contenido_multilenguaje'
      },
      (payload) => {
        console.log('Contenido actualizado:', payload)
        // Actualizar estado local
        loadContent()
      }
    )
    .subscribe()

  return () => {
    supabase.removeChannel(channel)
  }
}, [])
```

### 3. Queue para Traducciones Masivas

Si el usuario edita muchos textos a la vez:

```typescript
// En lugar de traducir uno por uno, agregar a una cola
// Procesar en batch cada 5 segundos
```

---

## 🧪 Testing

### Test Manual

1. Editar un texto en el backoffice
2. Verificar que se guardó en `texto_es`
3. Esperar 2-3 segundos
4. Verificar que `texto_en` se actualizó
5. Cambiar idioma en el frontend
6. Verificar que se ve la traducción nueva

### Test Automatizado

```typescript
// tests/integration/translation-flow.test.ts
describe('Translation Flow', () => {
  it('should auto-translate when texto_es changes', async () => {
    // 1. Update texto_es
    await supabase
      .from('contenido_multilenguaje')
      .update({ texto_es: 'Nuevo texto' })
      .eq('clave', 'test_key')

    // 2. Wait for trigger + edge function
    await new Promise(resolve => setTimeout(resolve, 3000))

    // 3. Verify texto_en was updated
    const { data } = await supabase
      .from('contenido_multilenguaje')
      .select('texto_en')
      .eq('clave', 'test_key')
      .single()

    expect(data.texto_en).toBe('New text')
  })
})
```

---

## 📊 Monitoreo

### Logs de Traducción

Agregar tabla para auditoría:

```sql
CREATE TABLE translation_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content_id UUID REFERENCES contenido_multilenguaje(id),
  texto_es_old TEXT,
  texto_es_new TEXT,
  texto_en_old TEXT,
  texto_en_new TEXT,
  translation_service TEXT, -- 'deepl' o 'google'
  success BOOLEAN,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Dashboard de Métricas

- Total de traducciones hoy
- Tasa de éxito/error
- Tiempo promedio de traducción
- Costo de API (DeepL cobra por caracteres)

---

## 💰 Costos

### DeepL API Pricing

- **Free:** 500,000 caracteres/mes
- **Pro:** $5.49 por 1M caracteres

### Estimación

- Promedio 100 caracteres por texto
- 100 textos en la BD
- 10 ediciones por día
- = 1,000 caracteres/día
- = 30,000 caracteres/mes
- **Costo:** GRATIS (dentro del plan free)

---

## 🚀 Deployment

### Checklist

- [ ] Crear Edge Function en Supabase
- [ ] Configurar variables de entorno (DEEPL_API_KEY)
- [ ] Ejecutar SQL para crear trigger
- [ ] Probar en staging
- [ ] Desplegar a producción
- [ ] Monitorear logs por 24 horas

---

## 📚 Referencias

- [Supabase Edge Functions](https://supabase.com/docs/guides/functions)
- [Supabase Database Triggers](https://supabase.com/docs/guides/database/postgres/triggers)
- [DeepL API Documentation](https://www.deepl.com/docs-api)
- [Supabase Realtime](https://supabase.com/docs/guides/realtime)

---

**Última actualización:** 31 de marzo de 2026  
**Mantenido por:** Kiro AI Assistant
