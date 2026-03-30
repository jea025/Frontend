'use client'

import { useState, useEffect } from 'react'

interface PrensaItem {
  id: string
  titulo: string
  fecha: string
  url: string
}

export default function PrensaDinamica() {
  const [prensaItems, setPrensaItems] = useState<PrensaItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simplified version without Supabase for now
    try {
      console.log('🔄 Loading prensa items...')
      
      // Set empty array for now to prevent crashes
      setPrensaItems([])
      
      console.log('✅ Prensa items loaded (empty for now)')
    } catch (error) {
      console.error('❌ Error in useEffect:', error)
      setPrensaItems([])
    } finally {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="articulosLista">
        <div className="text-center text-gray-500">Cargando artículos...</div>
      </div>
    )
  }

  if (prensaItems.length === 0) {
    return null // No mostrar nada si no hay artículos dinámicos
  }

  return (
    <div className="articulosLista">
      {prensaItems.map((item) => (
        <div key={item.id} className="articuloItem">
          <a href={item.url} target="_blank" rel="noopener noreferrer" className="enlaceArticulo">
            <strong>{item.titulo}</strong>
            {item.fecha && <span className="text-gray-500 text-sm ml-2">({item.fecha})</span>}
          </a>
        </div>
      ))}
    </div>
  )
}
