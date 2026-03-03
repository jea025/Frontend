'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

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
    async function fetchPrensa() {
      try {
        const supabase = createClient()
        
        const { data, error } = await supabase
          .from('configuracion')
          .select('valor')
          .eq('clave', 'prensa_list')
          .single()

        if (error) {
          console.error('❌ Error fetching prensa:', error)
          setPrensaItems([])
          return
        }

        if (data?.valor) {
          const parsed = JSON.parse(data.valor)
          setPrensaItems(parsed)
          console.log('✅ Prensa dinámica cargada:', parsed)
        }
      } catch (error) {
        console.error('❌ Error parsing prensa:', error)
        setPrensaItems([])
      } finally {
        setLoading(false)
      }
    }

    fetchPrensa()
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
