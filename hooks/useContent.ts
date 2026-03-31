'use client'

import { useState, useEffect } from 'react'
import { useI18n } from '@/lib/i18n-simple'
import { createClient } from '@/utils/supabase/client'

interface UseContentOptions {
  keys?: string[]        // Claves específicas a cargar: ['footer_copyright', 'nav_home']
  prefix?: string        // Prefijo para filtrar: 'contact_' carga todos los contact_*
  context?: string       // Contexto para filtrar (futuro)
  removePrefix?: boolean // Si true, remueve el prefijo de las claves en el resultado
}

interface ContentResult {
  content: Record<string, string>
  loading: boolean
  error: Error | null
}

/**
 * Hook para cargar contenido traducido desde Supabase
 * 
 * @example
 * // Cargar claves específicas
 * const { content } = useContent({ keys: ['footer_copyright', 'nav_home'] })
 * console.log(content.footer_copyright) // "© 2026 Jóvenes en Acción..."
 * 
 * @example
 * // Cargar por prefijo
 * const { content } = useContent({ prefix: 'contact_', removePrefix: true })
 * console.log(content.form_name) // "Nombre" (sin el prefijo contact_)
 * 
 * @example
 * // Cargar por prefijo sin remover
 * const { content } = useContent({ prefix: '404_' })
 * console.log(content['404_title']) // "Página no encontrada"
 */
export function useContent(options: UseContentOptions = {}): ContentResult {
  const { locale } = useI18n()
  const [content, setContent] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function loadContent() {
      try {
        setLoading(true)
        setError(null)

        const supabase = createClient()
        let query = supabase
          .from('contenido_localizado')
          .select('clave, texto_es, texto_en')

        // Aplicar filtros
        if (options.keys && options.keys.length > 0) {
          query = query.in('clave', options.keys)
        } else if (options.prefix) {
          query = query.like('clave', `${options.prefix}%`)
        }

        const { data, error: queryError } = await query

        if (queryError) {
          throw queryError
        }

        if (data) {
          const mapped: Record<string, string> = {}
          data.forEach(item => {
            // Determinar la clave a usar
            let key = item.clave
            if (options.removePrefix && options.prefix) {
              key = key.replace(options.prefix, '')
            }
            
            // Seleccionar texto según idioma con fallback
            const text = locale === 'es' 
              ? item.texto_es 
              : (item.texto_en || item.texto_es)
            
            mapped[key] = text
          })
          setContent(mapped)
        }
      } catch (err) {
        console.error('Error loading content:', err)
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [locale, JSON.stringify(options.keys), options.prefix, options.removePrefix])

  return { content, loading, error }
}

/**
 * Hook simplificado para cargar un solo texto
 * 
 * @example
 * const copyright = useText('footer_copyright')
 * console.log(copyright) // "© 2026 Jóvenes en Acción..."
 */
export function useText(key: string, fallback: string = ''): string {
  const { content, loading } = useContent({ keys: [key] })
  
  if (loading) return fallback
  return content[key] || fallback
}
