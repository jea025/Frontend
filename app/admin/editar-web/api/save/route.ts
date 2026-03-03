import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    console.log("🚀 API SAVE - Iniciando")
    
    const { updates } = await request.json()
    console.log("📊 API SAVE - Updates recibidos:", updates)

    const supabase = await createClient()
    
    // Verificar autenticación
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      console.error("❌ API SAVE - Error de autenticación:", authError)
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }
    
    console.log("✅ API SAVE - Usuario autenticado:", user.email)

    // Actualizar cada configuración
    for (const update of updates) {
      console.log(`📝 API SAVE - Procesando ${update.clave}:`, update.valor)
      
      const { error } = await supabase
        .from('configuracion')
        .upsert({ 
          clave: update.clave, 
          valor: update.valor,
          tipo: 'texto',
          seccion: 'General'
        }, {
          onConflict: 'clave'
        })

      if (error) {
        console.error(`❌ API SAVE - Error en ${update.clave}:`, error)
        return NextResponse.json({ error: `Error actualizando ${update.clave}: ${error.message}` }, { status: 500 })
      }
      
      console.log(`✅ API SAVE - Guardado ${update.clave} exitosamente`)
    }

    console.log("🔄 API SAVE - Ejecutando revalidatePath('/')")
    
    // Revalidar caché
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/')

    console.log("✅ API SAVE - Completado exitosamente")
    return NextResponse.json({ success: true })
    
  } catch (error) {
    console.error("💥 API SAVE - Error general:", error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Error desconocido' 
    }, { status: 500 })
  }
}
