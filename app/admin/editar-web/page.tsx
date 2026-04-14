'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import ImageUploader from '@/components/ImageUploader'
import DynamicList from '@/components/DynamicList'
import LogrosList from '@/components/LogrosList'
import CarruselImages from '@/components/CarruselImages'
import RadioSchedule from '@/components/RadioSchedule'

interface ConfigItem {
  id: string
  clave: string
  valor: string
  texto_es: string
  texto_en: string
  tipo: 'texto' | 'imagen' | 'textarea' | 'lista_programas' | 'lista_conocenos' | 'lista_prensa' | 'lista_logros'
  seccion: string
}

interface CarruselState {
  foto1: string
  foto2: string
  foto3: string
}

interface RadioScheduleState {
  dia: string
  mes: string
}

export default function EditarWebPage() {
  const [configItems, setConfigItems] = useState<ConfigItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [carruselImages, setCarruselImages] = useState<CarruselState>({
    foto1: '',
    foto2: '',
    foto3: ''
  })
  const [radioSchedule, setRadioSchedule] = useState<RadioScheduleState>({
    dia: '',
    mes: ''
  })

  const fetchConfig = async () => {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('contenido_multilenguaje')
      .select('id, clave, texto_es, texto_en, contexto')
      .eq('contexto', 'backoffice')
      .order('clave', { ascending: true })

    if (error) {
      setMessage({ type: 'error', text: `Error cargando configuración: ${error.message}` })
    } else {
      const mappedData = (data || []).map(item => ({
        ...item,
        valor: item.texto_es,
        tipo: 'texto' as const,
        seccion: 'General'
      }))
      
      setConfigItems(mappedData)
      
      // Extraer datos del carrusel y schedule
      const carruselFoto1 = mappedData?.find(item => item.clave === 'carrusel_foto_1')
      const carruselFoto2 = mappedData?.find(item => item.clave === 'carrusel_foto_2')
      const carruselFoto3 = mappedData?.find(item => item.clave === 'carrusel_foto_3')
      const radioDia = mappedData?.find(item => item.clave === 'radio_dia')
      const radioMes = mappedData?.find(item => item.clave === 'radio_mes')
      
      setCarruselImages({
        foto1: carruselFoto1?.valor || '',
        foto2: carruselFoto2?.valor || '',
        foto3: carruselFoto3?.valor || ''
      })
      
      setRadioSchedule({
        dia: radioDia?.valor || '',
        mes: radioMes?.valor || ''
      })
    }
    
    setLoading(false)
  }

  useEffect(() => {
    fetchConfig()
  }, [])

  const handleInputChange = (clave: string, valor: string) => {
    setConfigItems(prev => 
      prev.map(item => 
        item.clave === clave ? { ...item, valor } : item
      )
    )
  }

  const handleCarruselImageChange = (foto: 'foto1' | 'foto2' | 'foto3', url: string) => {
    setCarruselImages(prev => ({ ...prev, [foto]: url }))
    
    // Actualizar también en configItems
    const claveMap = {
      foto1: 'carrusel_foto_1',
      foto2: 'carrusel_foto_2',
      foto3: 'carrusel_foto_3'
    }
    handleInputChange(claveMap[foto], url)
  }

  const handleRadioScheduleChange = (dia: string, mes: string) => {
    setRadioSchedule({ dia, mes })
    
    // Crear o actualizar items de radio en configItems si no existen
    setConfigItems(prev => {
      const updated = [...prev]
      
      // Buscar si ya existen los items de radio
      const radioDiaIndex = updated.findIndex(item => item.clave === 'radio_dia')
      const radioMesIndex = updated.findIndex(item => item.clave === 'radio_mes')
      
      // Actualizar o agregar radio_dia
      if (radioDiaIndex >= 0) {
        updated[radioDiaIndex] = { ...updated[radioDiaIndex], valor: dia }
      } else {
        updated.push({ 
          id: String(Date.now() + Math.random()), // ID temporal
          clave: 'radio_dia', 
          valor: dia, 
          texto_es: dia,
          texto_en: dia,
          tipo: 'texto' as const, 
          seccion: 'Carrusel' 
        })
      }
      
      // Actualizar o agregar radio_mes
      if (radioMesIndex >= 0) {
        updated[radioMesIndex] = { ...updated[radioMesIndex], valor: mes }
      } else {
        updated.push({ 
          id: String(Date.now() + Math.random()), // ID temporal
          clave: 'radio_mes', 
          valor: mes, 
          texto_es: mes,
          texto_en: mes,
          tipo: 'texto' as const, 
          seccion: 'Carrusel' 
        })
      }
      
      return updated
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    // Filtrar solo los items que tienen valor para evitar datos vacíos
    const updates = configItems
      .filter(item => item.valor !== undefined && item.valor !== null && item.valor !== '')
      .map(item => ({
        clave: item.clave,
        valor: item.valor
      }))

    console.log('Updates finales a enviar:', updates)

    try {
      // Llamar directamente a la API sin Server Action
      const response = await fetch('/admin/editar-web/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ updates }),
      })

      const result = await response.json()

      if (result.error) {
        console.error("❌ Error devuelto:", result.error)
        setMessage({ type: 'error', text: result.error })
      } else {
        console.log("✅ Guardado exitosamente")
        setMessage({ type: 'success', text: 'Configuración actualizada exitosamente' })
      }
    } catch (error) {
      console.error("❌ Error en handleSubmit:", error)
      setMessage({ type: 'error', text: 'Error al guardar la configuración' })
    }

    setSaving(false)
  }

  const renderInput = (item: ConfigItem) => {
    const baseClasses = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    
    // Solo permitir claves esenciales + contacto (SIN radio_dia, radio_mes)
    const clavesEsenciales = [
      'carrusel_foto_1', 'carrusel_foto_2', 'carrusel_foto_3',
      'carrusel_titulo_1', 'carrusel_titulo_2', 'carrusel_titulo_3',
      'descripcion_larga', 'mision_texto', 'vision_texto',
      'logros_list', 'prensa_list',
      'contacto_email', 'contacto_telefono', 'direccion',
      'facebook_url', 'instagram_url'
    ]
    
    if (!clavesEsenciales.includes(item.clave)) {
      return null
    }
    
    // Filtrar labels con 'List'
    const label = item.clave.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
    const displayLabel = label.includes('List') ? label.replace('List', '').trim() : label
    
    switch (item.tipo) {
      case 'textarea':
        return (
          <textarea
            id={item.clave}
            value={item.valor}
            onChange={(e) => handleInputChange(item.clave, e.target.value)}
            className={baseClasses}
            rows={4}
          />
        )
      case 'imagen':
        return (
          <ImageUploader
            value={item.valor}
            onChange={(url) => handleInputChange(item.clave, url)}
            label={displayLabel}
          />
        )
      case 'lista_programas':
        return (
          <DynamicList
            value={item.valor}
            onChange={(jsonValue) => handleInputChange(item.clave, jsonValue)}
            label="Programas"
            type="programas"
          />
        )
      case 'lista_conocenos':
        return (
          <DynamicList
            value={item.valor}
            onChange={(jsonValue) => handleInputChange(item.clave, jsonValue)}
            label="Conócenos Más"
            type="conocenos"
          />
        )
      case 'lista_prensa':
        return (
          <DynamicList
            value={item.valor}
            onChange={(jsonValue) => handleInputChange(item.clave, jsonValue)}
            label="Prensa y Premios"
            type="prensa"
          />
        )
      case 'lista_logros':
        return (
          <DynamicList
            value={item.valor}
            onChange={(jsonValue) => handleInputChange(item.clave, jsonValue)}
            label="Logros e Impactos"
            type="logros"
          />
        )
      case 'lista_prensa':
        return (
          <DynamicList
            value={item.valor}
            onChange={(jsonValue) => handleInputChange(item.clave, jsonValue)}
            label="Prensa y Premios"
            type="prensa"
          />
        )
      case 'texto':
      default:
        return (
          <input
            type="text"
            id={item.clave}
            value={item.valor}
            onChange={(e) => handleInputChange(item.clave, e.target.value)}
            className={baseClasses}
          />
        )
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="text-gray-500">Cargando configuración...</div>
      </div>
    )
  }

  // Group items by section
  const groupedItems = configItems.reduce((acc, item) => {
    if (!acc[item.seccion]) {
      acc[item.seccion] = []
    }
    acc[item.seccion].push(item)
    return acc
  }, {} as Record<string, ConfigItem[]>)

  // Solo mostrar secciones esenciales + contacto (SIN radio_dia, radio_mes)
  const filteredSections = Object.entries(groupedItems).filter(([seccion, items]) => {
    const tieneClavesEsenciales = items.some(item => [
      'carrusel_foto_1', 'carrusel_foto_2', 'carrusel_foto_3',
      'carrusel_titulo_1', 'carrusel_titulo_2', 'carrusel_titulo_3',
      'descripcion_larga', 'mision_texto', 'vision_texto',
      'logros_list', 'prensa_list',
      'contacto_email', 'contacto_telefono', 'direccion',
      'facebook_url', 'instagram_url'
    ].includes(item.clave))
    return tieneClavesEsenciales
  })

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Editar Contenido del Sitio Web
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Modifica el contenido del sitio web sin necesidad de tocar código
          </p>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-md ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Sección especial para imágenes del carrusel */}
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Imágenes del Carrusel
            </h3>
            <CarruselImages
              foto1={carruselImages.foto1}
              foto2={carruselImages.foto2}
              foto3={carruselImages.foto3}
              onChange={handleCarruselImageChange}
            />
          </div>
        </div>

        {/* Sección especial para schedule de radio */}
        <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Programación de Radio
            </h3>
            <RadioSchedule
              dia={radioSchedule.dia}
              mes={radioSchedule.mes}
              onChange={handleRadioScheduleChange}
            />
          </div>
        </div>

        {filteredSections.map(([seccion, items]) => (
          <div key={seccion} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 capitalize">
                {seccion.replace('_', ' ')}
              </h3>
              
              <div className="space-y-6">
                {items.map((item) => {
                  const renderedInput = renderInput(item)
                  return renderedInput ? (
                    <div key={item.clave}>
                      <label htmlFor={item.clave} className="block text-sm font-medium text-gray-700 mb-2">
                        {item.clave.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()).replace('List', '').trim()}
                      </label>
                      {renderedInput}
                    </div>
                  ) : null
                })}
              </div>
            </div>
          </div>
        ))}

        {configItems.length === 0 && (
          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6">
            <p className="text-gray-500 text-center">
              No se encontraron elementos de configuración.
            </p>
          </div>
        )}

        {configItems.length > 0 && (
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        )}
      </form>
    </div>
  )
}
