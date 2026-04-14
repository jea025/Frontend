# Security Policy

## Cumplimiento OWASP Top 10 2021

Este proyecto implementa las mejores prácticas de seguridad según OWASP Top 10 2021.

### A05:2021 - Security Misconfiguration ✅

**Implementado:**
- ✅ Security Headers configurados (CSP, X-Frame-Options, etc.)
- ✅ HTTPS forzado con HSTS
- ✅ Configuración segura de Next.js
- ✅ Eliminación de console.logs en producción
- ✅ TypeScript para type safety

**Archivos:**
- `vercel.json` - Headers a nivel de Vercel
- `next.config.ts` - Headers a nivel de Next.js
- `SECURITY_HEADERS.md` - Documentación detallada

### A06:2021 - Vulnerable and Outdated Components ✅

**Estado actual:**
```bash
npm audit
# ✅ 0 vulnerabilidades encontradas
# ✅ 449 dependencias auditadas
```

**Proceso de mantenimiento:**
1. Auditoría semanal: `npm audit`
2. Actualización de parches: `npm audit fix`
3. Revisión de dependencias: `npm outdated`

## Scripts de Seguridad

### Validar Security Headers
```bash
# Validar en localhost
npm run validate-security

# Validar en producción
npm run validate-security https://tu-sitio.vercel.app
```

### Auditoría Completa
```bash
# Ejecuta npm audit + validación de headers
npm run security-audit
```

### Verificar Vulnerabilidades
```bash
# Ver vulnerabilidades
npm audit

# Ver detalles en JSON
npm audit --json

# Aplicar fixes automáticos
npm audit fix

# Aplicar fixes incluyendo breaking changes (con cuidado)
npm audit fix --force
```

## Security Headers Implementados

| Header | Valor | Propósito |
|--------|-------|-----------|
| Content-Security-Policy | Configuración estricta | Previene XSS, clickjacking |
| X-Content-Type-Options | nosniff | Previene MIME sniffing |
| X-Frame-Options | DENY | Previene clickjacking |
| X-XSS-Protection | 1; mode=block | Filtro XSS del navegador |
| Referrer-Policy | strict-origin-when-cross-origin | Controla referrer |
| Permissions-Policy | camera=(), microphone=(), geolocation=() | Bloquea APIs sensibles |
| Strict-Transport-Security | max-age=63072000 | Fuerza HTTPS |

## Recursos Externos Permitidos

### Supabase (Base de datos)
- `*.supabase.co` (HTTPS)
- `*.supabase.co` (WSS)

### YouTube (Embeds)
- `youtube.com`
- `youtube-nocookie.com`

### Google Cloud Storage (Imágenes)
- `storage.googleapis.com`

### Vercel Analytics
- `vercel.live`
- `va.vercel-scripts.com`

### Redes Sociales (Enlaces externos)
- Instagram: Solo enlaces, no embeds
- Facebook: Solo enlaces, no embeds
- YouTube: Enlaces y embeds

## Reportar Vulnerabilidades

Si encuentras una vulnerabilidad de seguridad:

1. **NO** abras un issue público
2. Contacta al equipo de desarrollo directamente
3. Proporciona detalles:
   - Descripción de la vulnerabilidad
   - Pasos para reproducir
   - Impacto potencial
   - Sugerencias de mitigación (opcional)

## Checklist de Seguridad para Deployment

Antes de cada deployment a producción:

- [ ] Ejecutar `npm audit` (0 vulnerabilidades)
- [ ] Ejecutar `npm run security-audit`
- [ ] Verificar que `.env.local` no esté en git
- [ ] Verificar que secrets estén en Vercel Environment Variables
- [ ] Revisar logs de build en Vercel
- [ ] Validar headers en producción con `npm run validate-security [URL]`
- [ ] Verificar en https://securityheaders.com/
- [ ] Verificar en https://observatory.mozilla.org/

## Herramientas de Testing

### Online
- [Security Headers](https://securityheaders.com/)
- [Mozilla Observatory](https://observatory.mozilla.org/)
- [SSL Labs](https://www.ssllabs.com/ssltest/)

### Local
- OWASP ZAP
- Burp Suite Community
- npm audit

## Mejores Prácticas Implementadas

1. ✅ Principio de menor privilegio
2. ✅ Defense in depth (múltiples capas de seguridad)
3. ✅ Fail securely (errores no exponen información sensible)
4. ✅ Secure by default
5. ✅ Separation of concerns
6. ✅ Input validation (TypeScript + Supabase RLS)
7. ✅ Output encoding (React automático)
8. ✅ Cryptographic practices (HTTPS, HSTS)

## Actualizaciones de Seguridad

### Última auditoría: [Fecha actual]
- Estado: ✅ Sin vulnerabilidades
- Dependencias: 449 paquetes
- Headers: ✅ Todos configurados

### Próxima auditoría programada: [Fecha + 1 semana]

## Referencias

- [OWASP Top 10 2021](https://owasp.org/Top10/)
- [OWASP Cheat Sheet Series](https://cheatsheetseries.owasp.org/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security-headers)
- [Vercel Security](https://vercel.com/docs/security)
