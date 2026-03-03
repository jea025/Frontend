'use client'

interface PrensaItem {
  id: string
  titulo: string
  descripcion: string
  url: string
}

interface PrensaDisplayProps {
  prensa_list?: string
}

export default function PrensaDisplay({ prensa_list }: PrensaDisplayProps) {
  console.log("🔥 DEBUG PrensaDisplay - prensa_list:", prensa_list)
  
  if (!prensa_list) {
    console.log("🔥 DEBUG PrensaDisplay - No hay prensa_list, returning null")
    return null
  }

  let prensa: PrensaItem[] = []
  
  try {
    console.log("🔍 Parseando prensa_list:", prensa_list)
    prensa = JSON.parse(prensa_list)
    console.log("✅ Prensa parseada:", prensa)
  } catch (error) {
    console.error("❌ Error parseando prensa_list:", error)
    return (
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-800">Error al cargar la prensa</p>
      </div>
    )
  }

  if (!Array.isArray(prensa) || prensa.length === 0) {
    console.log("🔥 DEBUG PrensaDisplay - Array vacío o no válido:", prensa)
    return null
  }

  console.log("🔥 DEBUG PrensaDisplay - Renderizando", prensa.length, "items")

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {prensa.map((item) => (
        <div key={item.id} className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {item.titulo}
          </h3>
          <p className="text-gray-600 mb-4 whitespace-pre-line">
            {item.descripcion}
          </p>
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            Ver más
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      ))}
    </div>
  )
}
