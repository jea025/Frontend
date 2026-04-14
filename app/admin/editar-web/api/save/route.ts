import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { updates } = await request.json()
    const supabase = await createClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    for (const update of updates) {
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
        return NextResponse.json({ 
          error: `Error al guardar: ${error.message}` 
        }, { status: 500 })
      }
    }
    
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/')

    return NextResponse.json({ success: true })
    
  } catch (error) {
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Error al procesar la solicitud' 
    }, { status: 500 })
  }
}
