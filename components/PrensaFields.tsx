'use client'

import { useState, useEffect } from 'react'

interface PrensaItem {
  titulo: string
  descripcion: string
  url: string
}

interface PrensaFieldsProps {
  value: string // JSON string
  onChange: (jsonValue: string) => void
  label?: string
}

export default function PrensaFields({ value, onChange, label = "Prensa y Premios" }: PrensaFieldsProps) {
  // Parse JSON string to array or create empty array
  const getPrensaArray = (): PrensaItem[] => {
    try {
      if (!value || value === '[]') return []
      return JSON.parse(value)
    } catch {
      return []
    }
  }

  const [prensa, setPrensa] = useState<PrensaItem[]>(getPrensaArray())

  // Sync with prop changes
  useEffect(() => {
    setPrensa(getPrensaArray())
  }, [value])

  // Add new empty prensa item
  const addPrensa = () => {
    const newPrensa = [...prensa, { titulo: '', descripcion: '', url: '' }]
    setPrensa(newPrensa)
    onChange(JSON.stringify(newPrensa))
  }

  // Update prensa field
  const updatePrensa = (index: number, field: keyof PrensaItem, fieldValue: string) => {
    const newPrensa = [...prensa]
    newPrensa[index] = { ...newPrensa[index], [field]: fieldValue }
    setPrensa(newPrensa)
    onChange(JSON.stringify(newPrensa))
  }

  // Remove prensa item
  const removePrensa = (index: number) => {
    const newPrensa = prensa.filter((_, i) => i !== index)
    setPrensa(newPrensa)
    onChange(JSON.stringify(newPrensa))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <button
          type="button"
          onClick={addPrensa}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          + Agregar Noticia/Premio
        </button>
      </div>

      {prensa.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-md">
          <p className="text-gray-500">No hay noticias o premios agregados</p>
          <p className="text-sm text-gray-400 mt-1">Haz clic en "Agregar Noticia/Premio" para comenzar</p>
        </div>
      ) : (
        <div className="space-y-4">
          {prensa.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-md p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-900">Noticia/Premio #{index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removePrensa(index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Eliminar
                </button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Título del premio o noticia
                  </label>
                  <input
                    type="text"
                    value={item.titulo}
                    onChange={(e) => updatePrensa(index, 'titulo', e.target.value)}
                    placeholder="Ej: Premio a la excelencia educativa"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Descripción breve
                  </label>
                  <textarea
                    value={item.descripcion}
                    onChange={(e) => updatePrensa(index, 'descripcion', e.target.value)}
                    placeholder="Ej: Reconocimiento por el impacto en la comunidad educativa"
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Link/URL (opcional)
                  </label>
                  <input
                    type="url"
                    value={item.url}
                    onChange={(e) => updatePrensa(index, 'url', e.target.value)}
                    placeholder="Ej: https://ejemplo.com/noticia"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
