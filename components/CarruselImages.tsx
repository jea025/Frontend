'use client'

import { useState } from 'react'
import ImageUploader from './ImageUploader'

interface CarruselImagesProps {
  foto1: string
  foto2: string
  foto3: string
  onChange: (foto: 'foto1' | 'foto2' | 'foto3', url: string) => void
}

export default function CarruselImages({ foto1, foto2, foto3, onChange }: CarruselImagesProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Foto 1 - Radio
          </label>
          <ImageUploader
            value={foto1}
            onChange={(url) => onChange('foto1', url)}
            label="Foto 1 - Radio"
          />
          <p className="mt-1 text-xs text-gray-500">
            Imagen principal del carrusel (programación de radio)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Foto 2 - Salidas Culturales 1
          </label>
          <ImageUploader
            value={foto2}
            onChange={(url) => onChange('foto2', url)}
            label="Foto 2 - Salidas Culturales 1"
          />
          <p className="mt-1 text-xs text-gray-500">
            Segunda imagen del carrusel (salidas culturales)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Foto 3 - Salidas Culturales 2
          </label>
          <ImageUploader
            value={foto3}
            onChange={(url) => onChange('foto3', url)}
            label="Foto 3 - Salidas Culturales 2"
          />
          <p className="mt-1 text-xs text-gray-500">
            Tercera imagen del carrusel (salidas culturales)
          </p>
        </div>
      </div>
    </div>
  )
}
