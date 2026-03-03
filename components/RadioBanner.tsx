'use client'

interface RadioBannerProps {
  dia?: string
  mes?: string
  titulo?: string
}

export default function RadioBanner({ dia, mes, titulo }: RadioBannerProps) {
  console.log("🔥 DEBUG RadioBanner - dia:", dia, "mes:", mes, "titulo:", titulo)
  
  const getRadioMessage = () => {
    console.log("🔥 DEBUG RadioBanner - getRadioMessage - dia:", dia, "mes:", mes)
    
    if (!dia || !mes) {
      console.log("🔥 DEBUG RadioBanner - No hay dia o mes, usando default")
      return 'Todos los jueves por radio cultura de 20 a 21 hs'
    }

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const targetDate = new Date(`${mes} ${dia}, ${currentYear}`)
    
    console.log("🔥 DEBUG RadioBanner - currentDate:", currentDate, "targetDate:", targetDate)
    
    // Si la fecha actual es anterior a la ingresada
    if (currentDate < targetDate) {
      const message = `✨ Retomamos la programación el jueves ${dia} de ${mes} de 20 a 21 hs`
      console.log("🔥 DEBUG RadioBanner - Mensaje futuro:", message)
      return message
    }
    
    // Si la fecha ya pasó o es el mismo día
    console.log("🔥 DEBUG RadioBanner - Mensaje default (pasó o es hoy)")
    return 'Todos los jueves por radio cultura de 20 a 21 hs'
  }

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg shadow-lg">
      <div className="text-center">
        <div className="text-sm font-medium text-purple-100 mb-1">
          Radio en vivo
        </div>
        <div className="text-lg font-bold mb-2">
          {titulo || 'Jóvenes en Acción'}
        </div>
        <div className="text-sm text-purple-100">
          {getRadioMessage()}
        </div>
      </div>
    </div>
  )
}
