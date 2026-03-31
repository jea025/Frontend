#!/usr/bin/env node

/**
 * Script para traducir automáticamente el contenido de contenido_localizado
 * 
 * Este script:
 * 1. Lee todos los registros de la tabla contenido_localizado
 * 2. Identifica cuáles necesitan traducción (texto_en vacío o igual a texto_es)
 * 3. Traduce usando DeepL (o Google Translate como fallback)
 * 4. Actualiza la columna texto_en en Supabase
 * 
 * Uso: node scripts/translate-content.mjs
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Cargar variables de entorno
dotenv.config({ path: join(__dirname, '../.env.local') })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const DEEPL_API_KEY = process.env.DEEPL_API_KEY
const GOOGLE_TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY

// Validar variables de entorno
if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Error: Faltan variables de entorno de Supabase')
  console.error('   Asegúrate de tener NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local')
  process.exit(1)
}

if (!DEEPL_API_KEY && !GOOGLE_TRANSLATE_API_KEY) {
  console.error('❌ Error: Falta al menos una API key de traducción')
  console.error('   Necesitas DEEPL_API_KEY o GOOGLE_TRANSLATE_API_KEY en .env.local')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

/**
 * Traduce texto usando DeepL API
 */
async function translateWithDeepL(text, sourceLang = 'ES', targetLang = 'EN') {
  try {
    const response = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text: text,
        source_lang: sourceLang,
        target_lang: targetLang,
      }),
    })

    if (!response.ok) {
      throw new Error(`DeepL API error: ${response.status}`)
    }

    const data = await response.json()
    return data.translations[0].text
  } catch (error) {
    console.error('  ⚠️  Error con DeepL:', error.message)
    return null
  }
}

/**
 * Traduce texto usando Google Translate API
 */
async function translateWithGoogle(text, sourceLang = 'es', targetLang = 'en') {
  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_TRANSLATE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          source: sourceLang,
          target: targetLang,
          format: 'text',
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`Google Translate API error: ${response.status}`)
    }

    const data = await response.json()
    return data.data.translations[0].translatedText
  } catch (error) {
    console.error('  ⚠️  Error con Google Translate:', error.message)
    return null
  }
}

/**
 * Traduce texto usando el mejor servicio disponible
 */
async function translateText(text) {
  // Intentar con DeepL primero
  if (DEEPL_API_KEY) {
    const translation = await translateWithDeepL(text)
    if (translation) return translation
  }

  // Fallback a Google Translate
  if (GOOGLE_TRANSLATE_API_KEY) {
    const translation = await translateWithGoogle(text)
    if (translation) return translation
  }

  throw new Error('No se pudo traducir el texto con ningún servicio')
}

/**
 * Función principal
 */
async function main() {
  console.log('🌐 Iniciando traducción automática de contenido...\n')

  // 1. Obtener todos los registros
  console.log('📋 Cargando registros de contenido_multilenguaje...')
  const { data: records, error, status, statusText } = await supabase
    .from('contenido_multilenguaje')
    .select('id, clave, texto_es, texto_en')

  console.log('🔍 Debug - Status:', status, statusText)
  console.log('🔍 Debug - Error:', error)
  console.log('🔍 Debug - Records count:', records?.length || 0)
  
  if (records && records.length > 0) {
    console.log('🔍 Debug - First record:', records[0])
  }

  if (error) {
    console.error('❌ Error al cargar registros:', error)
    process.exit(1)
  }

  console.log(`✅ Cargados ${records.length} registros\n`)

  // 2. Filtrar registros que necesitan traducción
  const needsTranslation = records.filter(record => {
    // Necesita traducción si texto_en está vacío o es igual a texto_es
    return !record.texto_en || record.texto_en.trim() === '' || record.texto_en === record.texto_es
  })

  console.log(`🔍 Encontrados ${needsTranslation.length} registros que necesitan traducción\n`)

  if (needsTranslation.length === 0) {
    console.log('✅ Todos los registros ya están traducidos')
    return
  }

  // 3. Traducir cada registro
  let successCount = 0
  let errorCount = 0

  for (let i = 0; i < needsTranslation.length; i++) {
    const record = needsTranslation[i]
    const progress = `[${i + 1}/${needsTranslation.length}]`

    console.log(`${progress} Traduciendo: ${record.clave}`)
    console.log(`  📝 ES: ${record.texto_es.substring(0, 60)}...`)

    try {
      // Traducir
      const translatedText = await translateText(record.texto_es)
      console.log(`  ✅ EN: ${translatedText.substring(0, 60)}...`)

      // Actualizar en Supabase usando id en vez de clave
      const { error: updateError } = await supabase
        .from('contenido_multilenguaje')
        .update({ texto_en: translatedText })
        .eq('id', record.id)

      if (updateError) {
        console.error(`  ❌ Error al actualizar: ${updateError.message}`)
        errorCount++
      } else {
        successCount++
      }

      // Pequeña pausa para no saturar las APIs
      await new Promise(resolve => setTimeout(resolve, 500))

    } catch (error) {
      console.error(`  ❌ Error: ${error.message}`)
      errorCount++
    }

    console.log('') // Línea en blanco
  }

  // 4. Resumen
  console.log('\n' + '='.repeat(60))
  console.log('📊 RESUMEN DE TRADUCCIÓN')
  console.log('='.repeat(60))
  console.log(`✅ Exitosas: ${successCount}`)
  console.log(`❌ Errores: ${errorCount}`)
  console.log(`📝 Total procesados: ${needsTranslation.length}`)
  console.log('='.repeat(60))

  if (successCount > 0) {
    console.log('\n🎉 ¡Traducción completada! Recarga tu aplicación para ver los cambios.')
  }
}

// Ejecutar
main().catch(error => {
  console.error('❌ Error fatal:', error)
  process.exit(1)
})
