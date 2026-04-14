#!/usr/bin/env node

/**
 * Script para validar Security Headers de OWASP
 * Uso: node scripts/validate-security-headers.mjs [URL]
 * Ejemplo: node scripts/validate-security-headers.mjs https://tu-sitio.vercel.app
 */

const url = process.argv[2] || 'http://localhost:3000';

console.log(`\n🔒 Validando Security Headers en: ${url}\n`);

async function validateHeaders() {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const headers = response.headers;

    const requiredHeaders = {
      'x-content-type-options': {
        expected: 'nosniff',
        description: 'Previene MIME type sniffing'
      },
      'x-frame-options': {
        expected: 'DENY',
        description: 'Previene clickjacking',
        alternative: 'SAMEORIGIN'
      },
      'x-xss-protection': {
        expected: '1; mode=block',
        description: 'Activa filtro XSS del navegador'
      },
      'referrer-policy': {
        expected: 'strict-origin-when-cross-origin',
        description: 'Controla información de referrer'
      },
      'permissions-policy': {
        expected: /camera=\(\).*microphone=\(\).*geolocation=\(\)/,
        description: 'Restringe APIs sensibles'
      },
      'content-security-policy': {
        expected: /default-src/,
        description: 'Previene XSS y ataques de inyección'
      },
      'strict-transport-security': {
        expected: /max-age=\d+/,
        description: 'Fuerza HTTPS'
      }
    };

    let passed = 0;
    let failed = 0;
    let warnings = 0;

    console.log('📋 Resultados:\n');

    for (const [headerName, config] of Object.entries(requiredHeaders)) {
      const headerValue = headers.get(headerName);
      
      if (!headerValue) {
        console.log(`❌ ${headerName}: FALTA`);
        console.log(`   → ${config.description}`);
        failed++;
      } else {
        const isValid = typeof config.expected === 'string' 
          ? headerValue === config.expected || (config.alternative && headerValue === config.alternative)
          : config.expected.test(headerValue);

        if (isValid) {
          console.log(`✅ ${headerName}: OK`);
          console.log(`   → ${headerValue.substring(0, 80)}${headerValue.length > 80 ? '...' : ''}`);
          passed++;
        } else {
          console.log(`⚠️  ${headerName}: PRESENTE pero valor inesperado`);
          console.log(`   → Esperado: ${config.expected}`);
          console.log(`   → Actual: ${headerValue.substring(0, 80)}${headerValue.length > 80 ? '...' : ''}`);
          warnings++;
        }
      }
      console.log('');
    }

    console.log('━'.repeat(60));
    console.log(`\n📊 Resumen:`);
    console.log(`   ✅ Pasados: ${passed}/${Object.keys(requiredHeaders).length}`);
    console.log(`   ❌ Faltantes: ${failed}`);
    console.log(`   ⚠️  Advertencias: ${warnings}`);

    if (failed === 0 && warnings === 0) {
      console.log(`\n🎉 ¡Todos los security headers están correctamente configurados!`);
      process.exit(0);
    } else if (failed > 0) {
      console.log(`\n⚠️  Algunos headers críticos faltan. Revisa la configuración.`);
      process.exit(1);
    } else {
      console.log(`\n⚠️  Headers presentes pero con valores no estándar.`);
      process.exit(0);
    }

  } catch (error) {
    console.error(`\n❌ Error al validar headers: ${error.message}`);
    console.error(`\nAsegúrate de que el servidor esté corriendo en: ${url}`);
    process.exit(1);
  }
}

validateHeaders();
