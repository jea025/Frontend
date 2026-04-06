import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

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

    // Actualizar cada configuración en contenido_multilenguaje
    for (const update of updates) {
      console.log(`📝 API SAVE - Procesando ${update.clave}:`, update.valor)
      
      // Calcular hash MD5 del texto_es para detectar cambios
      const hash = crypto.createHash('md5').update(update.valor).digest('hex')
      
      const { error } = await supabase
        .from('contenido_multilenguaje')
        .upsert({ 
          clave: update.clave, 
          texto_es: update.valor,
          hash_md5: hash,
          contexto: 'backoffice',
          estado: 'activo'
        }, {
          onConflict: 'clave'
        })

      if (error) {
        console.error(`❌ API SAVE - Error en ${update.clave}:`, error)
        return NextResponse.json({ error: `Error actualizando ${update.clave}: ${error.message}` }, { status: 500 })
      }
      
      console.log(`✅ API SAVE - Guardado ${update.clave} exitosamente (hash: ${hash.substring(0, 8)}...)`)
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
