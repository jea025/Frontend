import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/admin'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Si el usuario viene de un reset password, redirigir a update-password
      // En caso contrario, ir a admin
      const isRecovery = next === '/auth/update-password'
      
      if (isRecovery) {
        return NextResponse.redirect(`${origin}/auth/update-password`)
      }
      
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/admin/login?error=auth_code_error`)
}
