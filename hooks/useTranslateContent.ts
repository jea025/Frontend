import { useState, useCallback } from 'react'
import { useI18n } from '@/lib/i18n-simple'
import { translateText, translateJSON } from '@/utils/translation-service'

interface UseTranslateContentReturn {
  translateContent: (text: string) => Promise<string>
  translateJSONContent: (jsonString: string) => Promise<string>
  isTranslating: boolean
  error: string | null
}

/**
 * Hook para traducir contenido dinámico de Supabase
 * 
 * Uso:
 * const { translateContent, isTranslating } = useTranslateContent()
 * const translatedTitle = await translateContent(config.titulo_web)
 */
export function useTranslateContent(): UseTranslateContentReturn {
  const { locale } = useI18n()
  const [isTranslating, setIsTranslating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const translateContent = useCallback(
    async (text: string): Promise<string> => {
      // Si el idioma es español o el texto está vacío, retornar original
      if (locale === 'es' || !text || !text.trim()) {
        return text
      }

      setIsTranslating(true)
      setError(null)

      try {
        const translated = await translateText(text, 'es', locale)
        return translated
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
        setError(errorMessage)
        console.error('Error traduciendo contenido:', err)
        return text // Retornar original si falla
      } finally {
        setIsTranslating(false)
      }
    },
    [locale]
  )

  const translateJSONContent = useCallback(
    async (jsonString: string): Promise<string> => {
      // Si el idioma es español o el JSON está vacío, retornar original
      if (locale === 'es' || !jsonString || !jsonString.trim()) {
        return jsonString
      }

      setIsTranslating(true)
      setError(null)

      try {
        const translated = await translateJSON(jsonString, 'es', locale)
        return translated
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido'
        setError(errorMessage)
        console.error('Error traduciendo JSON:', err)
        return jsonString // Retornar original si falla
      } finally {
        setIsTranslating(false)
      }
    },
    [locale]
  )

  return {
    translateContent,
    translateJSONContent,
    isTranslating,
    error,
  }
}
