'use client'

import { useState, useEffect } from 'react'
import Carrusel from '@/components/Carrusel/Carrusel'
import Nosotros from '@/components/Nosotros/Nosotros'
import { createClient } from '@/utils/supabase/client'
import { useI18n } from '@/lib/i18n-simple'

export const dynamic = 'force-dynamic'

interface ConfigData {
  [key: string]: string
}

export default function HomePage() {
  const { locale } = useI18n()
  const [config, setConfig] = useState<ConfigData>({})
  const [translatedConfig, setTranslatedConfig] = useState<ConfigData>({})
  const [loading, setLoading] = useState(true)

  // Cargar datos de Supabase
  useEffect(() => {
    async function getConfig() {
      const supabase = createClient()
      
      // Buscar en contenido_localizado con las columnas correctas
      const { data, error } = await supabase
        .from('contenido_localizado')
        .select('clave, texto_es, texto_en')

      if (error) {
        console.error('Error loading configuration:', error)
        setConfig({})
        setLoading(false)
        return
      }

      if (!data || data.length === 0) {
        console.error('No data found in contenido_localizado')
        setConfig({})
        setLoading(false)
        return
      }

      // Mapear texto_es y texto_en
      const newConfig: ConfigData = {}
      data?.forEach(item => {
        newConfig[item.clave] = item.texto_es
        // También guardamos la versión en inglés si existe
        if (item.texto_en) {
          newConfig[`${item.clave}_en`] = item.texto_en
        }
      })

      setConfig(newConfig)
      setLoading(false)
    }

    getConfig()
  }, [])

  // Cambiar idioma cuando cambia el locale
  useEffect(() => {
    const configKeys = Object.keys(config)
    
    // Si no hay config cargado, esperar
    if (configKeys.length === 0) {
      return
    }
    
    // Si el idioma es español, usar config original (texto_es)
    if (locale === 'es') {
      setTranslatedConfig(config)
      return
    }

    // Si el idioma es inglés, usar las versiones _en
    const translated: ConfigData = {}
    
    // Para cada clave, buscar su versión _en
    Object.keys(config).forEach(key => {
      if (key.endsWith('_en')) {
        // Saltar las claves _en, las usaremos desde las claves base
        return
      }
      
      const enKey = `${key}_en`
      if (config[enKey]) {
        // Si existe traducción en inglés, usarla
        translated[key] = config[enKey]
      } else {
        // Si no existe, usar el español (fallback)
        translated[key] = config[key]
      }
    })

    setTranslatedConfig(translated)
  }, [locale, config])

  // Usar config traducido o original según el idioma
  const displayConfig = locale === 'es' ? config : translatedConfig

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-600">
            {displayConfig.loading_text || (locale === 'es' ? 'Cargando...' : 'Loading...')}
          </div>
          <div className="text-sm text-gray-500 mt-2">
            {displayConfig.loading_subtitle || (locale === 'es' ? 'Preparando el contenido' : 'Preparing content')}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-auto overflow-x-hidden">
      {/* 1. Hero/Carrusel con texto dinámico traducido */}
      <div className="w-full h-auto overflow-x-hidden">
        <Carrusel 
          foto_principal={displayConfig.carrusel_foto_1}
          titulo_web={displayConfig.carrusel_titulo_1}
          carrusel_titulo_1={displayConfig.carrusel_titulo_1}
          carrusel_titulo_2={displayConfig.carrusel_titulo_2}
          carrusel_titulo_3={displayConfig.carrusel_titulo_3}
        />
      </div>
      
      {/* 2. Sección Nosotros - Con contenido traducido */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <Nosotros 
            descripcion_larga={displayConfig.descripcion_larga}
            mision_texto={displayConfig.mision_texto}
            vision_texto={displayConfig.vision_texto}
            programas_list=""
            conocenos_list=""
            prensa_list=""
          />
        </div>
      </section>
    </div>
  );
}
