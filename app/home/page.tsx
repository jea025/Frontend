'use client'

import { useState, useEffect } from 'react'
import Carrusel from '@/components/Carrusel/Carrusel'
import Nosotros from '@/components/Nosotros/Nosotros'
import { createClient } from '@/utils/supabase/client'

export const dynamic = 'force-dynamic'

interface ConfigData {
  [key: string]: string
}

export default function HomePage() {
  const [config, setConfig] = useState<ConfigData>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getConfig() {
      const supabase = createClient()
      
      console.log("🔍 HOME PAGE - Consulta COMPLETA para debugging...")
      
      // Primero, ver qué claves existen realmente
      const { data: allData, error: allError } = await supabase
        .from('configuracion')
        .select('clave, valor')
        .limit(50)

      console.log("🗃️ TODAS las claves en BD:", allData)
      
      if (allError) {
        console.error('❌ Error obteniendo todas las claves:', allError)
        setConfig({})
        setLoading(false)
        return
      }

      // Ahora buscar las claves que necesitamos
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
      
      console.log("📊 HOME PAGE - DATOS FILTRADOS:", data)

      // Mapeo seguro - crear objeto con claves esenciales
      const newConfig: ConfigData = {}
      data?.forEach(item => {
        newConfig[item.clave] = item.valor
        console.log(`✅ HOME PAGE - ${item.clave}:`, item.valor)
      })

      console.log("🔥 HOME PAGE - Config final:", newConfig)
      setConfig(newConfig)
      setLoading(false)
    }

    getConfig()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-600">Cargando...</div>
          <div className="text-sm text-gray-500 mt-2">Preparando el contenido</div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-auto overflow-x-hidden">
      {/* 1. Hero/Carrusel con texto dinámico en primera foto */}
      <div className="w-full h-auto overflow-x-hidden">
        <Carrusel 
          foto_principal={config.carrusel_foto_1}
          titulo_web={config.carrusel_titulo_1}
          carrusel_titulo_1={config.carrusel_titulo_1}
          carrusel_titulo_2={config.carrusel_titulo_2}
          carrusel_titulo_3={config.carrusel_titulo_3}
        />
      </div>
      
      {/* 2. Sección Nosotros - Usando el componente Nosotros completo */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <Nosotros 
            descripcion_larga={config.descripcion_larga}
            mision_texto={config.mision_texto}
            vision_texto={config.vision_texto}
            programas_list=""
            conocenos_list=""
            prensa_list=""
          />
        </div>
      </section>

      {/* 3. Prensa */}
      {config.prensa_list && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Prensa y Premios</h2>
            {/* Importar y usar el componente Prensa correcto */}
            <div className="prensaContainer">
              {/* Sección de Prensa */}
              <div className="prensaSubsection">
                <h2 className="texto tituloH2">Artículos de Prensa</h2>
                
                <div className="articulosLista">
                  {(() => {
                    try {
                      const prensa = JSON.parse(config.prensa_list)
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
