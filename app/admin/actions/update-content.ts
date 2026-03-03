'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateConfig(clave: string, valor: string) {
  const supabase = await createClient()

  // Verify auth
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return { error: 'No autorizado' }
  }

  const { error } = await supabase
    .from('configuracion')
    .update({ valor })
    .eq('clave', clave)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/')
  return { success: true }
}

// Función para determinar el tipo y sección según la clave
function getTipoYSeccion(clave: string) {
  if (clave.includes('foto') || clave.includes('logo')) {
    return { tipo: 'imagen', seccion: 'Inicio' }
  }
  if (clave.includes('mision') || clave.includes('vision') || clave.includes('descripcion')) {
    return { tipo: 'textarea', seccion: 'Nosotros' }
  }
  if (clave.includes('list')) {
    if (clave.includes('programas')) return { tipo: 'lista_programas', seccion: 'Programas' }
    if (clave.includes('conocenos')) return { tipo: 'lista_conocenos', seccion: 'Nosotros' }
    if (clave.includes('prensa')) return { tipo: 'lista_prensa', seccion: 'Prensa' }
    if (clave.includes('logros')) return { tipo: 'lista_logros', seccion: 'Logros' }
  }
  if (clave.includes('carrusel') || clave.includes('radio')) {
    return { tipo: 'texto', seccion: 'Carrusel' }
  }
  if (clave.includes('contacto') || clave.includes('direccion') || clave.includes('facebook') || clave.includes('instagram')) {
    return { tipo: 'texto', seccion: 'Contacto' }
  }
  return { tipo: 'texto', seccion: 'General' }
}

export async function updateMultipleConfig(updates: { clave: string; valor: string }[]) {
  console.log("🚀 Iniciando updateMultipleConfig")
  console.log("📊 Datos a enviar:", updates)
  
  const supabase = await createClient()
  
  // Verificar conexión
  console.log("🔗 Variables de entorno:", {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Definida" : "❌ No definida",
    key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Definida" : "❌ No definida"
  })

  // Verify auth
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    console.error("❌ Error de autenticación:", authError)
    return { error: 'No autorizado' }
  }
  
  console.log("✅ Usuario autenticado:", user?.email)

  // Update each configuration item
  for (let i = 0; i < updates.length; i++) {
    const update = updates[i]
    const { tipo, seccion } = getTipoYSeccion(update.clave)
    
    console.log(`📝 Procesando item ${i + 1}/${updates.length}:`, {
      clave: update.clave,
      valor: update.valor,
      tipo,
      seccion
    })
    
    try {
      const { data, error } = await supabase
        .from('configuracion')
        .upsert({ 
          clave: update.clave, 
          valor: update.valor,
          tipo: tipo,
          seccion: seccion
        }, {
          onConflict: 'clave'
        })
        .select()

      console.log("📥 Respuesta Supabase:", { data, error })

      if (error) {
        console.error(`❌ Error en upsert para ${update.clave}:`, error)
        return { error: `Error actualizando ${update.clave}: ${error.message}` }
      }
      
      if (data) {
        console.log(`✅ Registro guardado exitosamente:`, data[0])
      } else {
        console.warn(`⚠️ No se recibieron datos del upsert para ${update.clave}`)
      }
    } catch (err) {
      console.error(`💥 Error catch en ${update.clave}:`, err)
      return { error: `Error inesperado actualizando ${update.clave}: ${err instanceof Error ? err.message : 'Error desconocido'}` }
    }
  }

  console.log("🔄 Ejecutando revalidatePath('/')")
  revalidatePath('/')
  console.log("✅ updateMultipleConfig completado exitosamente")
  
  return { success: true }
}
