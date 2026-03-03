'use client'

import { useState, useEffect } from 'react'
import RadioBanner from './RadioBanner'

export default function RadioBannerDynamic() {
  const [radioData, setRadioData] = useState({
    dia: '',
    mes: '',
    titulo: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRadioData() {
      try {
        const { createClient } = await import('@/utils/supabase/client')
        const supabase = createClient()

        // Obtener datos de radio
        const { data: diaData } = await supabase
          .from('configuracion')
          .select('valor')
          .eq('clave', 'radio_dia')
          .single()

        const { data: mesData } = await supabase
          .from('configuracion')
          .select('valor')
          .eq('clave', 'radio_mes')
          .single()

        // No buscar título de carrusel, usar título fijo para la radio
        setRadioData({
          dia: diaData?.valor || '',
          mes: mesData?.valor || '',
          titulo: 'Jóvenes en Acción' // Título fijo para el programa de radio
        })

        console.log('📊 Radio data fetched:', {
          dia: diaData?.valor,
          mes: mesData?.valor,
          titulo: 'Jóvenes en Acción'
        })

      } catch (error) {
        console.error('❌ Error fetching radio data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRadioData()
  }, [])

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg shadow-lg">
        <div className="text-center">
          <div className="text-sm font-medium text-purple-100 mb-1">
            Radio en vivo
          </div>
          <div className="text-lg font-bold mb-2">
            Cargando...
          </div>
          <div className="text-sm text-purple-100">
            Todos los jueves por radio cultura de 20 a 21 hs
          </div>
        </div>
      </div>
    )
  }

  return <RadioBanner dia={radioData.dia} mes={radioData.mes} titulo={radioData.titulo} />
}
