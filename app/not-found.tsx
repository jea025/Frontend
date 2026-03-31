'use client'

import Link from 'next/link'
import { useContent } from '@/hooks/useContent'

export default function NotFound() {
  const { content } = useContent({ 
    prefix: '404_', 
    removePrefix: true 
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Título 404 */}
        <h1 className="text-9xl font-bold text-customCyan mb-4">
          404
        </h1>

        {/* Mensaje */}
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          {content.title || 'Página no encontrada'}
        </h2>
        
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          {content.message || 'Lo sentimos, la página que buscas no existe o ha sido movida.'}
        </p>

        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/home"
            className="bg-customCyan hover:bg-cyan-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            {content.button_home || 'Volver al inicio'}
          </Link>
          
          <Link 
            href="/gallery"
            className="bg-white hover:bg-gray-50 text-customCyan font-semibold py-3 px-8 rounded-lg border-2 border-customCyan transition-all duration-300 hover:scale-105"
          >
            {content.button_gallery || 'Ver galería'}
          </Link>
        </div>

        {/* Decoración */}
        <div className="mt-16 text-gray-400">
          <p className="text-sm">
            {content.contact_message || 'Si crees que esto es un error, por favor contáctanos.'}
          </p>
        </div>
      </div>
    </div>
  )
}
