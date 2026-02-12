'use client'

import { useState } from 'react'

interface LogrosListProps {
  value: string
  onChange: (jsonValue: string) => void
  label: string
}

interface LogroItem {
  id: string
  numero: string
  etiqueta: string
  descripcion: string
  link_texto?: string
  link_url?: string
}

export default function LogrosList({ value, onChange, label }: LogrosListProps) {
  const [items, setItems] = useState(() => {
    try {
      return value ? JSON.parse(value) : []
    } catch {
      return []
    }
  })

  const updateItems = (newItems: any[]) => {
    setItems(newItems)
    onChange(JSON.stringify(newItems))
  }

  const addItem = () => {
    const newItem = { 
      id: Date.now().toString(), 
      numero: '', 
      etiqueta: '', 
      descripcion: '', 
      link_texto: '', 
      link_url: '' 
    }
    updateItems([...items, newItem])
  }

  const updateItem = (id: string, field: string, fieldValue: string) => {
    const newItems = items.map((item: any) => 
      item.id === id ? { ...item, [field]: fieldValue } : item
    )
    updateItems(newItems)
  }

  const removeItem = (id: string) => {
    const newItems = items.filter((item: any) => item.id !== id)
    updateItems(newItems)
  }

  const renderLogroItem = (item: LogroItem) => (
    <div key={item.id} className="border rounded-lg p-4 space-y-3 bg-gray-50">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-900">Logro/Impacto</h4>
        <button
          type="button"
          onClick={() => removeItem(item.id)}
          className="text-red-600 hover:text-red-800 text-sm"
        >
          Eliminar
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          type="text"
          value={item.numero}
          onChange={(e) => updateItem(item.id, 'numero', e.target.value)}
          placeholder="Número (ej: 60)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={item.etiqueta}
          onChange={(e) => updateItem(item.id, 'etiqueta', e.target.value)}
          placeholder="Etiqueta/Título (ej: Colegios)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <textarea
        value={item.descripcion}
        onChange={(e) => updateItem(item.id, 'descripcion', e.target.value)}
        placeholder="Descripción del logro/impacto"
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-pre-line"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          type="text"
          value={item.link_texto}
          onChange={(e) => updateItem(item.id, 'link_texto', e.target.value)}
          placeholder="Texto del link (ej: Ver video)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="url"
          value={item.link_url}
          onChange={(e) => updateItem(item.id, 'link_url', e.target.value)}
          placeholder="URL del link (opcional)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  )

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <button
          type="button"
          onClick={addItem}
          className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
        >
          Agregar Logro
        </button>
      </div>
      
      <div className="space-y-3">
        {items.map((item: any) => renderLogroItem(item))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
          <p>No hay logros agregados</p>
          <p className="text-sm mt-1">Haz clic en "Agregar Logro" para comenzar</p>
        </div>
      )}
    </div>
  )
}
