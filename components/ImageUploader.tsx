'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

interface ImageUploaderProps {
  value: string
  onChange: (url: string) => void
  label?: string
}

export default function ImageUploader({ value, onChange, label }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Por favor selecciona un archivo de imagen válido')
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no debe superar los 5MB')
      return
    }

    setUploading(true)
    setError(null)

    try {
      const supabase = createClient()
      
      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      
      // Upload to bucket
      const { data, error: uploadError } = await supabase.storage
        .from('imagenes_web')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('imagenes_web')
        .getPublicUrl(fileName)

      onChange(publicUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al subir la imagen')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveImage = () => {
    onChange('')
    setError(null)
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <label className="block text-sm font-medium text-gray-700">
          {label || 'Imagen'}
        </label>
        {uploading && (
          <span className="text-sm text-blue-600">Subiendo...</span>
        )}
      </div>

      {/* File input */}
      <div className="flex items-center space-x-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            disabled:opacity-50"
        />
        {value && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
          >
            Eliminar
          </button>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Image preview */}
      {value && !uploading && (
        <div className="mt-2">
          <img
            src={value}
            alt="Preview"
            className="h-32 w-auto object-cover rounded border border-gray-300"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
              setError('No se pudo cargar la imagen')
            }}
          />
          <p className="text-xs text-gray-500 mt-1 truncate">{value}</p>
        </div>
      )}

      {/* Upload progress placeholder */}
      {uploading && (
        <div className="mt-2">
          <div className="h-32 w-full bg-gray-100 rounded border border-gray-300 flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">Subiendo imagen...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
