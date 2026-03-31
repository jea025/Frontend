'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useI18n } from '@/lib/i18n-simple'

interface PrensaItem {
  id: string
  titulo: string
  fecha: string
  url: string
}

export default function PrensaDinamica() {
  const { locale } = useI18n()
  const [prensaItems, setPrensaItems] = useState<PrensaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingText, setLoadingText] = useState('Cargando artículos...')

  useEffect(() => {
    async function fetchPrensa() {
      try {
        const supabase = createClient()
        
        // Cargar texto de loading traducido
        const { data: loadingData } = await supabase
          .from('contenido_localizado')
          .select('texto_es, texto_en')
          .eq('clave', 'prensa_loading')
          .single()

        if (loadingData) {
          setLoadingText(locale === 'es' ? loadingData.texto_es : (loadingData.texto_en || loadingData.texto_es))
        }

        // Intentar cargar de contenido_localizado en lugar de configuracion
        const { data, error } = await supabase
          .from('contenido_localizado')
          .select('texto_es, texto_en')
          .eq('clave', 'prensa_list')
          .single()

        if (error) {
          // Si no existe en contenido_localizado, no hay artículos dinámicos
          console.log('ℹ️ No hay artículos de prensa dinámicos configurados')
          setPrensaItems([])
          return
        }

        if (data) {
          const textoActual = locale === 'es' ? data.texto_es : (data.texto_en || data.texto_es)
          if (textoActual) {
            const parsed = JSON.parse(textoActual)
            setPrensaItems(parsed)
            console.log('✅ Prensa dinámica cargada:', parsed)
          }
        }
      } catch (error) {
        console.log('ℹ️ No hay artículos de prensa dinámicos:', error)
        setPrensaItems([])
      } finally {
        setLoading(false)
      }
    }

    fetchPrensa()
  }, [locale])

  if (loading) {
    return (
      <div className="articulosLista">
        <div className="text-center text-gray-500">{loadingText}</div>
      </div>
    )
  }

  if (prensaItems.length === 0) {
    return null // No mostrar nada si no hay artículos dinámicos
  }

  return (
    <div className="articulosLista">
      {prensaItems.map((item) => (
        <div key={item.id} className="articuloItem">
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="enlaceArticulo">
            <strong>{item.titulo}</strong>
            {item.fecha && <span className="text-gray-500 text-sm ml-2">({item.fecha})</span>}
          </a>
        </div>
      ))}
    </div>
  )
}
