'use client'

import { useText } from '@/hooks/useContent'

interface RadioBannerProps {
  dia?: string
  mes?: string
  titulo?: string
}

export default function RadioBanner({ dia, mes, titulo }: RadioBannerProps) {
  const liveLabel = useText('radio_live_label', 'Radio en vivo')
  const defaultTitle = useText('radio_default_title', 'Jóvenes en Acción')
  const defaultSchedule = useText('radio_default_schedule', 'Todos los jueves por radio cultura de 20 a 21 hs')
  const returnMessageTemplate = useText('radio_return_message', '✨ Retomamos la programación el jueves {dia} de {mes} de 20 a 21 hs')
  
  const getRadioMessage = () => {
    if (!dia || !mes) {
      return defaultSchedule
    }

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const targetDate = new Date(`${mes} ${dia}, ${currentYear}`)
    
    // Si la fecha actual es anterior a la ingresada
    if (currentDate < targetDate) {
      return returnMessageTemplate.replace('{dia}', dia).replace('{mes}', mes)
    }
    
    // Si la fecha ya pasó o es el mismo día
    return defaultSchedule
  }

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg shadow-lg">
      <div className="text-center">
        <div className="text-sm font-medium text-purple-100 mb-1">
          {liveLabel}
        </div>
        <div className="text-lg font-bold mb-2">
          {titulo || defaultTitle}
        </div>
        <div className="text-sm text-purple-100">
          {getRadioMessage()}
        </div>
      </div>
    </div>
  )
}
