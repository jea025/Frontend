#!/usr/bin/env node

/**
 * Script de diagnóstico para verificar el estado de los hashes MD5
 * 
 * Este script muestra:
 * 1. Todos los registros de contenido_multilenguaje con contexto='backoffice'
 * 2. El hash MD5 guardado vs el hash MD5 calculado del texto_es actual
 * 3. Si necesitan re-traducción
 */

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import crypto from 'crypto'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Cargar variables de entorno
dotenv.config({ path: join(__dirname, '../.env.local') })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Error: Faltan variables de entorno de Supabase')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

async function main() {
  console.log('🔍 Verificando estado de hashes MD5...\n')

  // Obtener registros de backoffice
  const { data: records, error } = await supabase
    .from('contenido_multilenguaje')
    .select('id, clave, texto_es, texto_en, hash_md5')
    .eq('contexto', 'backoffice')
    .order('clave')

  if (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }

  console.log(`📊 Encontrados ${records.length} registros de backoffice\n`)
  console.log('='.repeat(80))

  for (const record of records) {
    const currentHash = crypto.createHash('md5').update(record.texto_es).digest('hex')
    const hashMatch = record.hash_md5 === currentHash
    const needsTranslation = !record.texto_en || record.texto_en.trim() === '' || record.texto_en === record.texto_es || !hashMatch

    console.log(`\n📝 ${record.clave}`)
    console.log(`   ES: ${record.texto_es.substring(0, 60)}${record.texto_es.length > 60 ? '...' : ''}`)
    console.log(`   EN: ${record.texto_en ? record.texto_en.substring(0, 60) : '(vacío)'}${record.texto_en && record.texto_en.length > 60 ? '...' : ''}`)
    console.log(`   Hash guardado:  ${record.hash_md5 || '(ninguno)'}`)
    console.log(`   Hash calculado: ${currentHash}`)
    console.log(`   ¿Coinciden?: ${hashMatch ? '✅ SÍ' : '❌ NO'}`)
    console.log(`   ¿Necesita traducción?: ${needsTranslation ? '🔄 SÍ' : '✅ NO'}`)
  }

  console.log('\n' + '='.repeat(80))
  
  const needsTranslationCount = records.filter(r => {
    const currentHash = crypto.createHash('md5').update(r.texto_es).digest('hex')
    return !r.texto_en || r.texto_en.trim() === '' || r.texto_en === r.texto_es || r.hash_md5 !== currentHash
  }).length

  console.log(`\n📊 RESUMEN:`)
  console.log(`   Total registros: ${records.length}`)
  console.log(`   Necesitan traducción: ${needsTranslationCount}`)
  console.log(`   Ya traducidos: ${records.length - needsTranslationCount}`)
}

main().catch(error => {
  console.error('❌ Error fatal:', error)
  process.exit(1)
})
