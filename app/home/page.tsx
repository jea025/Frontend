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
      
      console.log("🔍 HOME PAGE - Cargando configuración...")
      console.log("📋 Buscando en tabla: contenido_localizado")
      
      // Buscar en contenido_localizado con las columnas correctas
      const { data, error } = await supabase
        .from('contenido_localizado')
        .select('clave, texto_es, texto_en')

      console.log("📊 Respuesta de Supabase - data:", data?.length, "registros, error:", error)

      if (error) {
        console.error('❌ HOME PAGE - Error:', error)
        setConfig({})
        setLoading(false)
        return
      }

      if (!data || data.length === 0) {
        console.error('❌ HOME PAGE - No se encontraron datos en contenido_localizado')
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
        console.log(`  ✓ ${item.clave}: ${item.texto_es?.substring(0, 30)}...`)
      })

      console.log("✅ HOME PAGE - Config cargado con", Object.keys(newConfig).length, "claves")
      setConfig(newConfig)
      setLoading(false)
    }

    getConfig()
  }, [])

  // Cambiar idioma cuando cambia el locale
  useEffect(() => {
    const configKeys = Object.keys(config)
    console.log("🔄 useEffect idioma - locale:", locale, "config keys:", configKeys.length)
    
    // Si no hay config cargado, esperar
    if (configKeys.length === 0) {
      console.log("⏭️ Saltando cambio de idioma (config vacío)")
      return
    }
    
    // Si el idioma es español, usar config original (texto_es)
    if (locale === 'es') {
      console.log("⏭️ Usando textos en español")
      setTranslatedConfig(config)
      return
    }

    // Si el idioma es inglés, usar las versiones _en
    console.log("🌐 Cambiando a inglés")
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
        console.log(`  ✓ ${key}: usando ${enKey}`)
      } else {
        // Si no existe, usar el español (fallback)
        translated[key] = config[key]
        console.log(`  ⚠️ ${key}: no hay traducción, usando español`)
      }
    })

    console.log("✅ CAMBIO DE IDIOMA COMPLETADO")
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

      {/* 3. Prensa - Con contenido traducido */}
      {displayConfig.prensa_list && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              {displayConfig.prensa_title || (locale === 'es' ? 'Prensa y Premios' : 'Press and Awards')}
            </h2>
            <div className="prensaContainer">
              <div className="prensaSubsection">
                <h2 className="texto tituloH2">
                  {displayConfig.prensa_articles_title || (locale === 'es' ? 'Artículos de Prensa' : 'Press Articles')}
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
