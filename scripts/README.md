# Scripts de Traducción

## translate-content.mjs

Script para traducir automáticamente todo el contenido de la tabla `contenido_localizado` de español a inglés.

### Requisitos

- Node.js instalado
- Variables de entorno configuradas en `.env.local`:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `DEEPL_API_KEY` (recomendado) o `GOOGLE_TRANSLATE_API_KEY`

### Uso

1. Instalar dependencias (si no lo hiciste):
   ```bash
   npm install
   ```

2. Ejecutar el script:
   ```bash
   npm run translate
   ```

### Qué hace el script

1. **Lee** todos los registros de `contenido_localizado`
2. **Identifica** cuáles necesitan traducción:
   - `texto_en` está vacío
   - `texto_en` es igual a `texto_es` (no traducido)
3. **Traduce** usando:
   - DeepL API (primero, mejor calidad)
   - Google Translate API (fallback)
4. **Actualiza** la columna `texto_en` en Supabase
5. **Muestra** progreso en tiempo real

### Salida esperada

```
🌐 Iniciando traducción automática de contenido...

📋 Cargando registros de contenido_localizado...
✅ Cargados 17 registros

🔍 Encontrados 17 registros que necesitan traducción

[1/17] Traduciendo: vision_texto
  📝 ES: El portal Jóvenes en Acción busca ser un espacio...
  ✅ EN: The Youth in Action portal seeks to be a space...

[2/17] Traduciendo: carrusel_titulo_1
  📝 ES: PROGRAMA MULTIMEDIAL, EDUCATIVO Y SOCIAL
  ✅ EN: MULTIMEDIA, EDUCATIONAL AND SOCIAL PROGRAM

...

============================================================
📊 RESUMEN DE TRADUCCIÓN
============================================================
✅ Exitosas: 17
❌ Errores: 0
📝 Total procesados: 17
============================================================

🎉 ¡Traducción completada! Recarga tu aplicación para ver los cambios.
```

### Notas

- El script hace una pausa de 500ms entre traducciones para no saturar las APIs
- Si una traducción falla con DeepL, intenta automáticamente con Google Translate
- Las traducciones se guardan directamente en Supabase
- Puedes ejecutar el script múltiples veces sin problemas (solo traduce lo que falta)

### Solución de problemas

**Error: "Faltan variables de entorno"**
- Verifica que `.env.local` tenga todas las variables necesarias

**Error: "No se pudo traducir el texto"**
- Verifica que las API keys sean válidas
- Revisa que tengas créditos/cuota disponible en DeepL o Google Translate

**Error: "Error al actualizar"**
- Verifica los permisos de Supabase
- Asegúrate de que la tabla `contenido_localizado` exista y sea accesible
