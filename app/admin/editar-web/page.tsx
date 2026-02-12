'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { updateMultipleConfig } from '../actions/update-content'
import ImageUploader from '@/components/ImageUploader'
import DynamicList from '@/components/DynamicList'
import LogrosList from '@/components/LogrosList'

interface ConfigItem {
  id: number
  clave: string
  valor: string
  tipo: 'texto' | 'imagen' | 'textarea' | 'lista_programas' | 'lista_conocenos' | 'lista_prensa' | 'lista_logros'
  seccion: string
}

export default function EditarWebPage() {
  const [configItems, setConfigItems] = useState<ConfigItem[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    const supabase = createClient()
    
    const { data, error } = await supabase
      .from('configuracion')
      .select('*')
      .order('seccion', { ascending: true })
      .order('clave', { ascending: true })

    if (error) {
      setMessage({ type: 'error', text: `Error cargando configuración: ${error.message}` })
    } else {
      setConfigItems(data || [])
    }
    
    setLoading(false)
  }

  const handleInputChange = (clave: string, valor: string) => {
    setConfigItems(prev => 
      prev.map(item => 
        item.clave === clave ? { ...item, valor } : item
      )
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    const updates = configItems.map(item => ({
      clave: item.clave,
      valor: item.valor
    }))

    const result = await updateMultipleConfig(updates)

    if (result.error) {
      setMessage({ type: 'error', text: result.error })
    } else {
      setMessage({ type: 'success', text: 'Configuración actualizada exitosamente' })
    }

    setSaving(false)
  }

  const renderInput = (item: ConfigItem) => {
    const baseClasses = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    
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
            label={item.clave.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
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
          <LogrosList
            value={item.valor}
            onChange={(jsonValue) => handleInputChange(item.clave, jsonValue)}
            label="Logros e Impactos"
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
        {Object.entries(groupedItems).map(([seccion, items]) => (
          <div key={seccion} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4 capitalize">
                {seccion.replace('_', ' ')}
              </h3>
              
              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.clave}>
                    <label htmlFor={item.clave} className="block text-sm font-medium text-gray-700 mb-2">
                      {item.clave.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </label>
                    {renderInput(item)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {configItems.length === 0 && (
          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl p-6">
            <p className="text-gray-500 text-center">
              No hay elementos de configuración disponibles. 
              Asegúrate de que la tabla 'configuracion' tenga registros.
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
