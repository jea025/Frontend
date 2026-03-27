import { createClient } from '@/utils/supabase/client'

type TranslationProvider = 'deepl' | 'google'

interface TranslationCache {
  texto_original: string
  texto_traducido: string
  idioma_origen: string
  idioma_destino: string
  proveedor: TranslationProvider
  hash_md5: string
}

/**
 * Genera un hash SHA-256 para el texto (compatible con navegador)
 */
async function generateHash(text: string, sourceLang: string, targetLang: string): Promise<string> {
  const content = `${text}|${sourceLang}|${targetLang}`
  
  // Usar Web Crypto API con SHA-256 (MD5 no está disponible en navegadores)
  const encoder = new TextEncoder()
  const data = encoder.encode(content)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

/**
 * Busca una traducción en caché
 */
async function getCachedTranslation(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string | null> {
  const supabase = createClient()
  const hash = await generateHash(text, sourceLang, targetLang)

  const { data, error } = await supabase
    .from('contenido_multilenguaje')
    .select('texto_traducido')
    .eq('hash_md5', hash)
    .eq('idioma_origen', sourceLang)
    .eq('idioma_destino', targetLang)
    .single()

  if (error || !data) {
    return null
  }

  return data.texto_traducido
}

/**
 * Guarda una traducción en caché
 */
async function saveCachedTranslation(
  text: string,
  translatedText: string,
  sourceLang: string,
  targetLang: string,
  provider: TranslationProvider
): Promise<void> {
  const supabase = createClient()
  const hash = await generateHash(text, sourceLang, targetLang)

  const cacheEntry: TranslationCache = {
    texto_original: text,
    texto_traducido: translatedText,
    idioma_origen: sourceLang,
    idioma_destino: targetLang,
    proveedor: provider,
    hash_md5: hash,
  }

  await supabase.from('contenido_multilenguaje').upsert(cacheEntry, {
    onConflict: 'hash_md5',
  })
}

/**
 * Traduce usando DeepL API
 */
async function translateWithDeepL(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_DEEPL_API_KEY

  if (!apiKey) {
    throw new Error('DeepL API key not configured')
  }

  const response = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      auth_key: apiKey,
      text: text,
      source_lang: sourceLang.toUpperCase(),
      target_lang: targetLang.toUpperCase(),
    }),
  })

  if (!response.ok) {
    throw new Error(`DeepL API error: ${response.status}`)
  }

  const data = await response.json()
  return data.translations[0].text
}

/**
 * Traduce usando Google Translate API
 */
async function translateWithGoogle(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY

  if (!apiKey) {
    throw new Error('Google Translate API key not configured')
  }

  const response = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
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
}

/**
 * Función principal de traducción con caché y fallback
 */
export async function translateText(
  text: string,
  sourceLang: string,
  targetLang: string
): Promise<string> {
  console.log(`🔤 translateText llamado: "${text.substring(0, 30)}..." (${sourceLang} → ${targetLang})`)
  
  // Si el texto está vacío o los idiomas son iguales, retornar el original
  if (!text || !text.trim() || sourceLang === targetLang) {
    console.log("⏭️ Retornando original (vacío o mismo idioma)")
    return text
  }

  try {
    // 1. Buscar en caché
    console.log("🔍 Buscando en caché...")
    const cached = await getCachedTranslation(text, sourceLang, targetLang)
    if (cached) {
      console.log('✅ Traducción encontrada en caché:', cached.substring(0, 30) + '...')
      return cached
    }

    console.log('🔄 No encontrado en caché, traduciendo con API...')

    // 2. Intentar con DeepL
    try {
      console.log("🌐 Intentando con DeepL...")
      const translated = await translateWithDeepL(text, sourceLang, targetLang)
      await saveCachedTranslation(text, translated, sourceLang, targetLang, 'deepl')
      console.log('✅ Traducido con DeepL:', translated.substring(0, 30) + '...')
      return translated
    } catch (deeplError) {
      console.warn('⚠️ DeepL falló, intentando con Google Translate:', deeplError)

      // 3. Fallback a Google Translate
      console.log("🌐 Intentando con Google Translate...")
      const translated = await translateWithGoogle(text, sourceLang, targetLang)
      await saveCachedTranslation(text, translated, sourceLang, targetLang, 'google')
      console.log('✅ Traducido con Google Translate:', translated.substring(0, 30) + '...')
      return translated
    }
  } catch (error) {
    console.error('❌ Error en traducción:', error)
    // Si todo falla, retornar el texto original
    return text
  }
}

/**
 * Traduce un objeto JSON (útil para prensa_list, logros_list, etc.)
 */
export async function translateJSON(
  jsonString: string,
  sourceLang: string,
  targetLang: string
): Promise<string> {
  if (!jsonString || !jsonString.trim()) {
    return jsonString
  }

  try {
    const data = JSON.parse(jsonString)

    // Si es un array, traducir cada elemento
    if (Array.isArray(data)) {
      const translatedArray = await Promise.all(
        data.map(async (item) => {
          const translatedItem: any = {}
          for (const [key, value] of Object.entries(item)) {
            if (typeof value === 'string' && value.trim()) {
              translatedItem[key] = await translateText(value, sourceLang, targetLang)
            } else {
              translatedItem[key] = value
            }
          }
          return translatedItem
        })
      )
      return JSON.stringify(translatedArray)
    }

    // Si es un objeto, traducir cada propiedad string
    const translatedObj: any = {}
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string' && value.trim()) {
        translatedObj[key] = await translateText(value, sourceLang, targetLang)
      } else {
        translatedObj[key] = value
      }
    }
    return JSON.stringify(translatedObj)
  } catch (error) {
    console.error('❌ Error traduciendo JSON:', error)
    return jsonString
  }
}
