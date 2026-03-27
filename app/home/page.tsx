'use client'

import { useState, useEffect } from 'react'
import Carrusel from '@/components/Carrusel/Carrusel'
import Nosotros from '@/components/Nosotros/Nosotros'
import { createClient } from '@/utils/supabase/client'
import { useI18n } from '@/lib/i18n-simple'
import { useTranslateContent } from '@/hooks/useTranslateContent'

export const dynamic = 'force-dynamic'

interface ConfigData {
  [key: string]: string
}

interface TranslatedConfigData {
  [key: string]: string
}

export default function HomePage() {
  const { locale } = useI18n()
  const { translateContent, translateJSONContent } = useTranslateContent()
  const [config, setConfig] = useState<ConfigData>({})
  const [translatedConfig, setTranslatedConfig] = useState<TranslatedConfigData>({})
  const [loading, setLoading] = useState(true)
  const [translating, setTranslating] = useState(false)

  // Cargar datos de Supabase
  useEffect(() => {
    async function getConfig() {
      const supabase = createClient()
      
      console.log("🔍 HOME PAGE - Cargando configuración...")
      
      const clavesNecesarias = [
        'carrusel_foto_1', 'carrusel_foto_2', 'carrusel_foto_3',
        'carrusel_titulo_1', 'carrusel_titulo_2', 'carrusel_titulo_3',
        'descripcion_larga', 'mision_texto', 'vision_texto',
        'prensa_list'
      ]
      
      const { data, error } = await supabase
        .from('configuracion')
        .select('clave, valor')
        .in('clave', clavesNecesarias)

      if (error) {
        console.error('❌ HOME PAGE - Error:', error)
        setConfig({})
        setLoading(false)
        return
      }

      const newConfig: ConfigData = {}
      data?.forEach(item => {
        newConfig[item.clave] = item.valor
      })

      console.log("✅ HOME PAGE - Config cargado:", newConfig)
      setConfig(newConfig)
      setLoading(false)
    }

    getConfig()
  }, [])

  // Traducir contenido cuando cambia el idioma
  useEffect(() => {
    async function translateConfig() {
      if (locale === 'es' || Object.keys(config).length === 0) {
        setTranslatedConfig(config)
        return
      }

      console.log("🌐 Traduciendo contenido a", locale)
      setTranslating(true)

      try {
        const translated: TranslatedConfigData = {}

        // Traducir textos simples
        const simpleKeys = [
          'carrusel_titulo_1', 'carrusel_titulo_2', 'carrusel_titulo_3',
          'descripcion_larga', 'mision_texto', 'vision_texto'
        ]

        for (const key of simpleKeys) {
          if (config[key]) {
            translated[key] = await translateContent(config[key])
          }
        }

        // Traducir JSON (prensa_list)
        if (config.prensa_list) {
          translated.prensa_list = await translateJSONContent(config.prensa_list)
        }

        // Copiar valores que no se traducen (URLs de fotos)
        translated.carrusel_foto_1 = config.carrusel_foto_1
        translated.carrusel_foto_2 = config.carrusel_foto_2
        translated.carrusel_foto_3 = config.carrusel_foto_3

        console.log("✅ Traducción completada")
        setTranslatedConfig(translated)
      } catch (error) {
        console.error("❌ Error traduciendo:", error)
        setTranslatedConfig(config) // Fallback al original
      } finally {
        setTranslating(false)
      }
    }

    translateConfig()
  }, [locale, config, translateContent, translateJSONContent])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-600">
            {locale === 'es' ? 'Cargando...' : 'Loading...'}
          </div>
          <div className="text-sm text-gray-500 mt-2">
            {locale === 'es' ? 'Preparando el contenido' : 'Preparing content'}
          </div>
        </div>
      </div>
    )
  }

  // Usar config traducido o original según el idioma
  const displayConfig = locale === 'es' ? config : translatedConfig

  return (
    <div className="w-full h-auto overflow-x-hidden">
      {/* Indicador de traducción */}
      {translating && (
        <div className="fixed top-24 right-4 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{locale === 'es' ? 'Traduciendo...' : 'Translating...'}</span>
        </div>
      )}

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

      {/* 3. Prensa - Con contenido traducido */}
      {displayConfig.prensa_list && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              {locale === 'es' ? 'Prensa y Premios' : 'Press and Awards'}
            </h2>
            <div className="prensaContainer">
              <div className="prensaSubsection">
                <h2 className="texto tituloH2">
                  {locale === 'es' ? 'Artículos de Prensa' : 'Press Articles'}
                </h2>
                
                <div className="articulosLista">
                  {(() => {
                    try {
                      const prensa = JSON.parse(displayConfig.prensa_list)
                      return prensa.map((item: any, index: number) => (
                        <div key={index} className="articuloItem">
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="enlaceArticulo">
                            <strong>{item.titulo}</strong>
                            {item.fecha && <span className="text-gray-500 text-sm ml-2">({item.fecha})</span>}
                          </a>
                        </div>
                      ))
                    } catch {
                      return null
                    }
                  })()}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
