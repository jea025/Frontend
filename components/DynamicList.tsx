'use client'

import { useState } from 'react'

interface DynamicListProps {
  value: string
  onChange: (jsonValue: string) => void
  label: string
  type: 'programas' | 'conocenos' | 'prensa'
}

interface ProgramItem {
  id: string
  titulo: string
  descripcion: string
}

interface ConocenosItem {
  id: string
  texto: string
}

interface PrensaItem {
  id: string
  titulo: string
  descripcion: string
  url: string
}

export default function DynamicList({ value, onChange, label, type }: DynamicListProps) {
  const [items, setItems] = useState(() => {
    try {
      return value ? JSON.parse(value) : getDefaultItems(type)
    } catch {
      return getDefaultItems(type)
    }
  })

  function getDefaultItems(type: string) {
    switch (type) {
      case 'programas':
        return []
      case 'conocenos':
        return []
      case 'prensa':
        return []
      default:
        return []
    }
  }

  const updateItems = (newItems: any[]) => {
    setItems(newItems)
    onChange(JSON.stringify(newItems))
  }

  const addItem = () => {
    let newItem
    switch (type) {
      case 'programas':
        newItem = { id: Date.now().toString(), titulo: '', descripcion: '' }
        break
      case 'conocenos':
        newItem = { id: Date.now().toString(), texto: '' }
        break
      case 'prensa':
        newItem = { id: Date.now().toString(), titulo: '', descripcion: '', url: '' }
        break
      default:
        return
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

  const renderProgramItem = (item: ProgramItem) => (
    <div key={item.id} className="border rounded-lg p-4 space-y-3 bg-gray-50">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-900">Programa</h4>
        <button
          type="button"
          onClick={() => removeItem(item.id)}
          className="text-red-600 hover:text-red-800 text-sm"
        >
          Eliminar
        </button>
      </div>
      <input
        type="text"
        value={item.titulo}
        onChange={(e) => updateItem(item.id, 'titulo', e.target.value)}
        placeholder="Título del programa"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        value={item.descripcion}
        onChange={(e) => updateItem(item.id, 'descripcion', e.target.value)}
        placeholder="Descripción del programa"
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )

  const renderConocenosItem = (item: ConocenosItem) => (
    <div key={item.id} className="border rounded-lg p-4 space-y-3 bg-gray-50">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-900">Elemento</h4>
        <button
          type="button"
          onClick={() => removeItem(item.id)}
          className="text-red-600 hover:text-red-800 text-sm"
        >
          Eliminar
        </button>
      </div>
      <textarea
        value={item.texto}
        onChange={(e) => updateItem(item.id, 'texto', e.target.value)}
        placeholder="Texto del elemento"
        rows={2}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )

  const renderPrensaItem = (item: PrensaItem) => (
    <div key={item.id} className="border rounded-lg p-4 space-y-3 bg-gray-50">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-gray-900">Premio/Prensa</h4>
        <button
          type="button"
          onClick={() => removeItem(item.id)}
          className="text-red-600 hover:text-red-800 text-sm"
        >
          Eliminar
        </button>
      </div>
      <input
        type="text"
        value={item.titulo}
        onChange={(e) => updateItem(item.id, 'titulo', e.target.value)}
        placeholder="Título del artículo/premio"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        value={item.descripcion}
        onChange={(e) => updateItem(item.id, 'descripcion', e.target.value)}
        placeholder="Descripción del artículo/premio"
        rows={3}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="url"
        value={item.url}
        onChange={(e) => updateItem(item.id, 'url', e.target.value)}
        placeholder="URL del hipervínculo"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
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
          Agregar {type === 'programas' ? 'Programa' : type === 'conocenos' ? 'Elemento' : 'Premio/Prensa'}
        </button>
      </div>
      
      <div className="space-y-3">
        {items.map((item: any) => {
          switch (type) {
            case 'programas':
              return renderProgramItem(item as ProgramItem)
            case 'conocenos':
              return renderConocenosItem(item as ConocenosItem)
            case 'prensa':
              return renderPrensaItem(item as PrensaItem)
            default:
              return null
          }
        })}
      </div>

      {items.length === 0 && (
        <div className="text-center py-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
          <p>No hay elementos agregados</p>
          <p className="text-sm mt-1">Haz clic en "Agregar" para comenzar</p>
        </div>
      )}
    </div>
  )
}
