'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function TestSupabase() {
  const [status, setStatus] = useState('Testing...')
  const [error, setError] = useState('')

  useEffect(() => {
    async function testConnection() {
      try {
        console.log('🔍 Testing Supabase connection...')
        
        const supabase = createClient()
        
        // Test 1: Verificar variables de entorno
        console.log('🌐 Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL?.substring(0, 20) + '...')
        console.log('🔑 Anon Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
        
        // Test 2: Consulta simple
        const { data, error } = await supabase
          .from('configuracion')
          .select('clave')
          .limit(1)
        
        if (error) {
          console.error('❌ Supabase Error:', error)
          setError(`Supabase Error: ${error.message}`)
          setStatus('❌ Failed')
        } else {
          console.log('✅ Supabase OK:', data)
          setStatus('✅ Connected')
          setError('')
        }
      } catch (err) {
        console.error('❌ Connection Error:', err)
        setError(`Connection Error: ${err}`)
        setStatus('❌ Failed')
      }
    }

    testConnection()
  }, [])

  return (
    <div className="fixed top-4 right-4 bg-white border rounded-lg p-4 shadow-lg z-50 max-w-sm">
      <h3 className="font-bold text-sm mb-2">🔍 Supabase Test</h3>
      <div className="text-xs space-y-1">
        <div>Status: <span className={`font-semibold ${status.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>{status}</span></div>
        {error && <div className="text-red-600 break-words">{error}</div>}
      </div>
    </div>
  )
}
