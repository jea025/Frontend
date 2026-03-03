'use client'

import { useState, useEffect } from 'react'

interface LogroItem {
  numero: string
  etiqueta: string
  descripcion: string
}

interface LogrosFieldsProps {
  value: string // JSON string
  onChange: (jsonValue: string) => void
  label?: string
}

export default function LogrosFields({ value, onChange, label = "Logros" }: LogrosFieldsProps) {
  // Parse JSON string to array or create empty array
  const getLogrosArray = (): LogroItem[] => {
    try {
      if (!value || value === '[]') return []
      return JSON.parse(value)
    } catch {
      return []
    }
  }

  const [logros, setLogros] = useState<LogroItem[]>(getLogrosArray())

  // Sync with prop changes
  useEffect(() => {
    setLogros(getLogrosArray())
  }, [value])

  // Add new empty logro
  const addLogro = () => {
    const newLogros = [...logros, { numero: '', etiqueta: '', descripcion: '' }]
    setLogros(newLogros)
    onChange(JSON.stringify(newLogros))
  }

  // Update logro field
  const updateLogro = (index: number, field: keyof LogroItem, fieldValue: string) => {
    const newLogros = [...logros]
    newLogros[index] = { ...newLogros[index], [field]: fieldValue }
    setLogros(newLogros)
    onChange(JSON.stringify(newLogros))
  }

  // Remove logro
  const removeLogro = (index: number) => {
    const newLogros = logros.filter((_, i) => i !== index)
    setLogros(newLogros)
    onChange(JSON.stringify(newLogros))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <button
          type="button"
          onClick={addLogro}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          + Agregar Logro
        </button>
      </div>

      {logros.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-md">
          <p className="text-gray-500">No hay logros agregados</p>
          <p className="text-sm text-gray-400 mt-1">Haz clic en "Agregar Logro" para comenzar</p>
        </div>
      ) : (
        <div className="space-y-4">
          {logros.map((logro, index) => (
            <div key={index} className="border border-gray-200 rounded-md p-4 bg-gray-50">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-gray-900">Logro #{index + 1}</h4>
                <button
                  type="button"
                  onClick={() => removeLogro(index)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Eliminar
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Número
                  </label>
                  <input
                    type="text"
                    value={logro.numero}
                    onChange={(e) => updateLogro(index, 'numero', e.target.value)}
                    placeholder="Ej: 50"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Etiqueta/Título
                  </label>
                  <input
                    type="text"
                    value={logro.etiqueta}
                    onChange={(e) => updateLogro(index, 'etiqueta', e.target.value)}
                    placeholder="Ej: Colegios"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Descripción
                  </label>
                  <input
                    type="text"
                    value={logro.descripcion}
                    onChange={(e) => updateLogro(index, 'descripcion', e.target.value)}
                    placeholder="Ej: Alumnos alcanzados"
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
