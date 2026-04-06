'use client'

import { useState, useEffect } from 'react'
import RadioBanner from './RadioBanner'
import { useText } from '@/hooks/useContent'

export default function RadioBannerDynamic() {
  const [radioData, setRadioData] = useState({
    dia: '',
    mes: '',
    titulo: ''
  })
  const [loading, setLoading] = useState(true)
  
  const liveLabel = useText('radio_live_label', 'Radio en vivo')
  const loadingText = useText('radio_loading', 'Cargando...')
  const defaultTitle = useText('radio_default_title', 'Jóvenes en Acción')
  const defaultSchedule = useText('radio_default_schedule', 'Todos los jueves por radio cultura de 20 a 21 hs')

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

        setRadioData({
          dia: diaData?.valor || '',
          mes: mesData?.valor || '',
          titulo: defaultTitle
        })

      } catch (error) {
        console.error('❌ Error fetching radio data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRadioData()
  }, [defaultTitle])

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg shadow-lg">
        <div className="text-center">
          <div className="text-sm font-medium text-purple-100 mb-1">
            {liveLabel}
          </div>
          <div className="text-lg font-bold mb-2">
            {loadingText}
          </div>
          <div className="text-sm text-purple-100">
            {defaultSchedule}
          </div>
        </div>
      </div>
    )
  }

  return <RadioBanner dia={radioData.dia} mes={radioData.mes} titulo={radioData.titulo} />
}
