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

export async function updateMultipleConfig(updates: { clave: string; valor: string }[]) {
  const supabase = await createClient()

  // Verify auth
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return { error: 'No autorizado' }
  }

  // Update each configuration item
  for (const update of updates) {
    const { error } = await supabase
      .from('configuracion')
      .update({ valor: update.valor })
      .eq('clave', update.clave)

    if (error) {
      return { error: `Error actualizando ${update.clave}: ${error.message}` }
    }
  }

  revalidatePath('/')
  return { success: true }
}
