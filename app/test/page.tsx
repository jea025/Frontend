import { createClient } from '@/utils/supabase/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

interface ConfigData {
  [key: string]: string
}

async function getConfig(): Promise<ConfigData> {
  const supabase = await createClient()
  
  console.log("🧪 TEST - Buscando claves en Supabase...")
  
  const { data, error } = await supabase
    .from('configuracion')
    .select('clave, valor')
    .in('clave', [
      'radio_dia',
      'radio_mes',
      'logros_list',
      'prensa_list'
    ])

  if (error) {
    console.error('❌ TEST - Error cargando configuración:', error)
    return {}
  }

  console.log("📊 TEST - Datos recibidos de Supabase:", data)

  // Convert array to key-value object
  const config: ConfigData = {}
  data?.forEach(item => {
    config[item.clave] = item.valor
    console.log(`✅ TEST - Clave ${item.clave}:`, item.valor)
  })

  console.log("🎯 TEST - Config final:", config)
  return config
}

export default async function TestPage() {
  console.log(">>>> TEST PAGE - SERVIDOR ESTÁ VIVO <<<<")
  const config = await getConfig()

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Página de Prueba - Configuración</h1>
      
      <div className="bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Configuración Recibida:</h2>
        <pre className="bg-white p-4 rounded border overflow-auto">
          {JSON.stringify(config, null, 2)}
        </pre>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded">
          <h3 className="font-semibold mb-2">Radio Día:</h3>
          <p>{config.radio_dia || 'No encontrado'}</p>
        </div>
        
        <div className="bg-blue-50 p-4 rounded">
          <h3 className="font-semibold mb-2">Radio Mes:</h3>
          <p>{config.radio_mes || 'No encontrado'}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded">
          <h3 className="font-semibold mb-2">Logros List:</h3>
          <p className="text-sm">{config.logros_list || 'No encontrado'}</p>
        </div>
        
        <div className="bg-green-50 p-4 rounded">
          <h3 className="font-semibold mb-2">Prensa List:</h3>
          <p className="text-sm">{config.prensa_list || 'No encontrado'}</p>
        </div>
      </div>
    </div>
  )
}
