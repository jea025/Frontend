import { createClient } from '@/utils/supabase/server'
import { Metadata } from 'next'

interface ConfigData {
  [key: string]: string
}

async function getConfig(): Promise<ConfigData> {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('configuracion')
    .select('clave, valor')
    .in('clave', [
      'titulo_web',
      'descripcion_larga', 
      'foto_principal',
      'mision_texto',
      'vision_texto',
      'carrusel_titulo_1',
      'carrusel_titulo_2',
      'carrusel_titulo_3',
      'programas_list',
      'conocenos_list',
      'prensa_list',
      'logros_list',
      'contacto_email',
      'contacto_telefono',
      'direccion',
      'facebook_url',
      'instagram_url',
      'logo_header'
    ])

  if (error) {
    console.error('Error cargando configuración:', error)
    return {}
  }

  // Convert array to key-value object
  const config: ConfigData = {}
  data?.forEach(item => {
    config[item.clave] = item.valor
  })

  return config
}

export async function generateMetadata(): Promise<Metadata> {
  const config = await getConfig()
  
  return {
    title: config.titulo_web || 'Jóvenes en Acción',
    description: config.descripcion_larga || 'Transformamos vidas a través de la educación y el desarrollo comunitario.',
  }
}

export const revalidate = 30 // Revalidar cada 30 segundos

export default async function Main() {
  const config = await getConfig()

  return (
    <main className="min-h-screen">
      {/* Header con logo dinámico */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {config.logo_header ? (
              <img 
                src={config.logo_header} 
                alt="Logo" 
                className="h-12 w-auto"
              />
            ) : (
              <h1 className="text-2xl font-bold text-gray-900">
                {config.titulo_web || 'Jóvenes en Acción'}
              </h1>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {config.titulo_web || 'Jóvenes en Acción'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              {config.descripcion_larga || 'Transformamos vidas a través de la educación y el desarrollo comunitario.'}
            </p>
            
            {config.foto_principal && (
              <div className="mt-12">
                <img 
                  src={config.foto_principal} 
                  alt="Imagen principal" 
                  className="rounded-lg shadow-2xl mx-auto max-w-full h-auto"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Nosotros Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sobre Nosotros
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Misión</h3>
              <p className="text-gray-600 leading-relaxed">
                {config.mision || 'Nuestra misión es empoderar a los jóvenes mediante programas educativos y de desarrollo comunitario.'}
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Visión</h3>
              <p className="text-gray-600 leading-relaxed">
                {config.vision || 'Ser la organización líder en el desarrollo juvenil de la región.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Contacto
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">{config.contacto_email || 'contacto@ejemplo.org'}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Teléfono</h3>
              <p className="text-gray-600">{config.contacto_telefono || '+54 11 1234-5678'}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Dirección</h3>
              <p className="text-gray-600">{config.direccion || 'Av. Principal 123, Ciudad'}</p>
            </div>
          </div>
          
          {/* Redes Sociales */}
          {(config.facebook_url || config.instagram_url) && (
            <div className="mt-16 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Síguenos en redes sociales</h3>
              <div className="flex justify-center space-x-6">
                {config.facebook_url && (
                  <a 
                    href={config.facebook_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                )}
                
                {config.instagram_url && (
                  <a 
                    href={config.instagram_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:text-pink-800 transition-colors"
                  >
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
