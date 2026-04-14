# Security Headers - OWASP Compliance

Este documento explica los security headers implementados para cumplir con las mejores prácticas de OWASP Top 10 (A05:2021 - Security Misconfiguration y A06:2021 - Vulnerable and Outdated Components).

## Headers Implementados

### 1. Content-Security-Policy (CSP)
**Propósito:** Previene ataques XSS, clickjacking y otros ataques de inyección de código.

**Configuración actual:**
```
default-src 'self'
script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com
style-src 'self' 'unsafe-inline'
img-src 'self' data: https: blob:
font-src 'self' data:
connect-src 'self' https://*.supabase.co wss://*.supabase.co https://vercel.live https://va.vercel-scripts.com
frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com
media-src 'self' https:
object-src 'none'
base-uri 'self'
form-action 'self'
frame-ancestors 'none'
upgrade-insecure-requests
```

**Recursos externos permitidos:**
- ✅ Supabase (base de datos): `*.supabase.co`
- ✅ YouTube embeds: `youtube.com`, `youtube-nocookie.com`
- ✅ Vercel Analytics: `vercel.live`, `va.vercel-scripts.com`
- ✅ Google Cloud Storage (imágenes): `storage.googleapis.com`
- ✅ Instagram/Facebook (enlaces externos, no embeds)

**Notas:**
- `'unsafe-inline'` en scripts y estilos es necesario para Next.js y React Bootstrap
- `'unsafe-eval'` es necesario para algunas funcionalidades de Next.js en desarrollo
- Para producción, considera usar nonces o hashes para eliminar `'unsafe-inline'`

### 2. X-Content-Type-Options
**Valor:** `nosniff`

**Propósito:** Previene que el navegador "adivine" el tipo MIME de los archivos, evitando ataques de tipo MIME sniffing.

### 3. X-Frame-Options
**Valor:** `DENY`

**Propósito:** Previene ataques de clickjacking al no permitir que el sitio sea embebido en iframes.

**Nota:** Si necesitas permitir embeds en dominios específicos, cambia a `SAMEORIGIN` o usa `frame-ancestors` en CSP.

### 4. X-XSS-Protection
**Valor:** `1; mode=block`

**Propósito:** Activa el filtro XSS del navegador (legacy, pero aún útil para navegadores antiguos).

### 5. Referrer-Policy
**Valor:** `strict-origin-when-cross-origin`

**Propósito:** Controla qué información de referrer se envía en las peticiones:
- Same-origin: envía URL completa
- Cross-origin HTTPS→HTTPS: envía solo el origen
- Cross-origin HTTPS→HTTP: no envía nada

### 6. Permissions-Policy
**Valor:** `camera=(), microphone=(), geolocation=()`

**Propósito:** Deshabilita el acceso a APIs sensibles del navegador que no se usan en la aplicación.

**APIs bloqueadas:**
- Cámara
- Micrófono
- Geolocalización

### 7. Strict-Transport-Security (HSTS)
**Valor:** `max-age=63072000; includeSubDomains; preload`

**Propósito:** Fuerza conexiones HTTPS por 2 años, incluyendo subdominios.

**Nota:** Solo funciona en HTTPS. Vercel lo aplica automáticamente.

## Validación de Headers

### Herramientas de testing:
1. **Security Headers**: https://securityheaders.com/
2. **Mozilla Observatory**: https://observatory.mozilla.org/
3. **OWASP ZAP**: Para testing automatizado

### Comando para verificar headers localmente:
```bash
curl -I https://tu-dominio.vercel.app
```

## Vulnerabilidades de Dependencias

### Estado actual (npm audit):
```
✅ 0 vulnerabilidades encontradas
✅ Total de dependencias: 449
✅ Última verificación: [fecha actual]
```

### Mantenimiento recomendado:
```bash
# Verificar vulnerabilidades
npm audit

# Ver detalles
npm audit --json

# Actualizar dependencias con vulnerabilidades
npm audit fix

# Actualizar dependencias major (con cuidado)
npm audit fix --force
```

## Mejoras Futuras (Opcional)

### 1. CSP más estricto
- Eliminar `'unsafe-inline'` usando nonces o hashes
- Eliminar `'unsafe-eval'` si es posible

### 2. Subresource Integrity (SRI)
- Agregar hashes de integridad para scripts externos

### 3. Report-URI para CSP
- Configurar endpoint para recibir reportes de violaciones CSP

### 4. Feature-Policy adicional
- Considerar bloquear más APIs según necesidades

## Archivos Modificados

1. `vercel.json` - Headers a nivel de Vercel
2. `next.config.ts` - Headers a nivel de Next.js (tiene prioridad)

## Referencias

- [OWASP Top 10 2021](https://owasp.org/Top10/)
- [OWASP Secure Headers Project](https://owasp.org/www-project-secure-headers/)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Content Security Policy Reference](https://content-security-policy.com/)
