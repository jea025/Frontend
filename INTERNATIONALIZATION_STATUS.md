# Estado de Internacionalización - Frontend JEA

**Fecha:** 31 de marzo de 2026  
**Rama actual:** `feature/i18n-simple`  
**Estado:** ✅ Sistema base funcionando - Fase 1 en progreso

---

## 📊 Resumen Ejecutivo

Sistema de internacionalización simple implementado con cambio de idioma ES/EN funcionando. El contenido dinámico se carga desde la base de datos Supabase y se traduce automáticamente usando DeepL/Google Translate.

### Métricas Actuales
- **Registros en BD:** 21 textos traducidos
- **Páginas traducidas:** Home (parcial), Navbar
- **Componentes traducidos:** Navbar, LanguageSwitcher, Home
- **Traducción automática:** ✅ Funcionando (script `npm run translate`)

---

## 🎯 ¿Qué está traducido actualmente?

### ✅ Completamente traducido
1. **Navbar**
   - INICIO ↔ HOME
   - CONÓCENOS MÁS ↔ ABOUT US
   - GALERÍA ↔ GALLERY
   - CONTACTO ↔ CONTACT

2. **Home Page - Contenido dinámico desde BD**
   - Títulos del carrusel (3 títulos)
   - Misión
   - Visión
   - Descripción larga
   - Textos de carga (loading_text, loading_subtitle)
   - Títulos de sección de prensa

### ⚠️ Parcialmente traducido
- **Home Page:** Algunos textos hardcodeados aún en español

### ❌ Sin traducir
- Footer
- Página de Galería
- Página de Contacto
- Página "Conócenos Más"
- Formularios
- Mensajes de error/éxito
- Otros componentes con texto hardcodeado

---

## 🏗️ Arquitectura Actual

### Base de Datos (Supabase)

**Tabla principal:** `contenido_multilenguaje`
```sql
Columnas:
- id (uuid, PK)
- clave (text, unique) -- Identificador del texto
- contexto (text) -- Dónde se usa
- texto_es (text) -- Texto en español
- texto_en (text) -- Texto en inglés
- texto_pt (text) -- Texto en portugués (futuro)
- estado (text) -- Estado del contenido
- necesita_revision (boolean)
- hash_md5 (text) -- Para caché de traducciones
- created_at, updated_at
```

**Vista:** `contenido_localizado`
- Es una VIEW (solo lectura)
- Hace `COALESCE(texto_en, texto_es)` para fallback automático
- Se usa para leer contenido en la app

**Tabla de caché:** `traduciones_cache`
- Almacena traducciones para evitar llamadas repetidas a APIs
- Usa hash MD5 del texto original como clave

### Sistema de Traducción

**Frontend (Cliente)**
- `lib/i18n-simple.tsx`: Context API para manejo de idioma
- `components/LanguageSwitcherSimple.tsx`: Botones ES/EN
- `localStorage`: Guarda preferencia de idioma del usuario

**Backend (Scripts)**
- `scripts/translate-content.mjs`: Script de traducción automática
  - Lee de `contenido_multilenguaje`
  - Detecta textos sin traducir (texto_en vacío)
  - Traduce con DeepL (primario) o Google Translate (fallback)
  - Actualiza `texto_en` en la tabla
  - Usa `SUPABASE_SERVICE_ROLE_KEY` para permisos

**APIs de Traducción**
- DeepL API (primaria): Mejor calidad
- Google Translate API (fallback): Respaldo

### Flujo de Datos

```
1. AGREGAR TEXTO NUEVO
   ↓
   SQL INSERT en contenido_multilenguaje (solo texto_es)
   ↓
   npm run translate (traduce automáticamente)
   ↓
   Actualiza texto_en en la tabla

2. MOSTRAR CONTENIDO
   ↓
   Componente lee de contenido_localizado (VIEW)
   ↓
   Carga texto_es y texto_en
   ↓
   useI18n hook determina idioma actual
   ↓
   Muestra texto según idioma seleccionado
```

---

## 🔧 Herramientas y Scripts

### Scripts disponibles

```bash
# Traducir contenido automáticamente
npm run translate

# Iniciar servidor de desarrollo
npm run dev

# Build de producción
npm run build
```

### Archivos SQL

**`scripts/add-hardcoded-texts.sql`**
- Template para agregar nuevos textos a la BD
- Incluye INSERT statements con clave, contexto, texto_es

**`migrate-internationalization.sql`**
- Migración inicial de la estructura de BD
- Crea tablas, vistas, funciones

---

## 📋 FASE 1: Mover textos hardcodeados a BD

### Objetivo
Identificar todos los textos hardcodeados en español y moverlos a la base de datos para que puedan ser:
1. Traducidos automáticamente
2. Editados desde el backoffice (futuro)

### Progreso Actual
- ✅ Home page: 4 textos movidos (loading, prensa titles)
- ⏳ Pendiente: Resto de componentes

### Próximos Pasos

#### 1. Identificar textos hardcodeados
Buscar en todos los componentes:
- Strings en español dentro de JSX
- Textos en `className`, `placeholder`, `title`, etc.
- Mensajes de error/éxito
- Labels de formularios

#### 2. Crear SQL para nuevos textos
Para cada texto encontrado:
```sql
INSERT INTO contenido_multilenguaje (clave, contexto, texto_es)
VALUES 
  ('footer_rights', 'Footer', 'Todos los derechos reservados'),
  ('contact_form_name', 'Formulario de contacto', 'Nombre'),
  -- etc...
```

#### 3. Ejecutar SQL en Supabase
- Copiar SQL al editor de Supabase
- Ejecutar
- Verificar que se insertaron correctamente

#### 4. Ejecutar traducción automática
```bash
npm run translate
```

#### 5. Actualizar componentes
Cambiar de:
```tsx
<h1>Todos los derechos reservados</h1>
```

A:
```tsx
const { locale } = useI18n()
const [config, setConfig] = useState({})

// Cargar de Supabase...

<h1>{config.footer_rights}</h1>
```

---

## 📋 FASE 2: Backoffice para edición

### Objetivo
Crear interfaz administrativa para que el usuario pueda:
- Ver todos los textos del sitio
- Editar textos en español
- Ver/editar traducciones en inglés
- Marcar textos que necesitan revisión
- Traducir manualmente o automáticamente

### Componentes a crear
1. **Panel de administración de contenido**
   - Lista de todos los textos
   - Filtros por contexto, estado
   - Búsqueda por clave o texto

2. **Editor de texto individual**
   - Campo para texto_es
   - Campo para texto_en
   - Botón "Traducir automáticamente"
   - Checkbox "Necesita revisión"

3. **Traducción masiva**
   - Botón para traducir todos los textos pendientes
   - Progreso de traducción
   - Reporte de éxitos/errores

### Consideraciones
- Usar `SUPABASE_SERVICE_ROLE_KEY` para operaciones de escritura
- Validar permisos de usuario (solo admin)
- Caché de traducciones para evitar costos de API

---

## 📋 FASE 3: Optimizaciones

### Mejoras propuestas

1. **Performance**
   - Caché de contenido en localStorage
   - Prefetch de traducciones
   - Lazy loading de contenido por página

2. **SEO**
   - Meta tags traducidos
   - URLs localizadas (opcional)
   - Sitemap multiidioma

3. **UX**
   - Detección automática de idioma del navegador
   - Animaciones en cambio de idioma
   - Indicador de idioma actual más visible

4. **Mantenimiento**
   - Tests para componentes traducidos
   - Validación de claves faltantes
   - Reporte de textos sin traducir

---

## 🔑 Variables de Entorno Requeridas

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# APIs de Traducción
DEEPL_API_KEY=xxx
GOOGLE_TRANSLATE_API_KEY=xxx

# Opcional (para usar en cliente)
NEXT_PUBLIC_DEEPL_API_KEY=xxx
NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY=xxx
```

---

## 🐛 Problemas Conocidos y Soluciones

### ❌ Problema: "Cannot access 'displayConfig' before initialization"
**Causa:** Variable usada antes de ser declarada  
**Solución:** Mover declaración de `displayConfig` antes del bloque `if (loading)`

### ❌ Problema: 406 Not Acceptable en queries a Supabase
**Causa:** Intentando leer de tabla `configuracion` que está vacía  
**Solución:** Usar tabla `contenido_localizado` (VIEW) o `contenido_multilenguaje` (tabla base)

### ❌ Problema: Traducciones no aparecen
**Causa:** `texto_en` es null en la base de datos  
**Solución:** Ejecutar `npm run translate` para generar traducciones

### ❌ Problema: Script de traducción falla
**Causa:** Falta `SUPABASE_SERVICE_ROLE_KEY` o API keys  
**Solución:** Verificar que todas las variables estén en `.env.local`

---

## 📚 Recursos y Documentación

### Archivos clave
- `Frontend/lib/i18n-simple.tsx` - Sistema de i18n
- `Frontend/scripts/translate-content.mjs` - Script de traducción
- `Frontend/scripts/add-hardcoded-texts.sql` - Template SQL
- `Frontend/utils/translation-service.ts` - Servicio de traducción (no usado actualmente)

### Documentación externa
- [DeepL API Docs](https://www.deepl.com/docs-api)
- [Google Translate API Docs](https://cloud.google.com/translate/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Next.js i18n](https://nextjs.org/docs/app/building-your-application/routing/internationalization)

---

## 🎯 Próximos Pasos Recomendados

### Opción A: Continuar Fase 1 (Mover más textos a BD)
1. Identificar componentes con texto hardcodeado
2. Crear SQL para esos textos
3. Ejecutar SQL y traducción
4. Actualizar componentes

**Ventaja:** Más contenido traducible  
**Tiempo estimado:** 2-4 horas

### Opción B: Implementar Fase 2 (Backoffice)
1. Crear página de administración
2. Implementar CRUD de textos
3. Agregar traducción manual/automática

**Ventaja:** Usuario puede editar sin código  
**Tiempo estimado:** 4-6 horas

### Opción C: Optimizar lo existente
1. Mejorar performance (caché)
2. Agregar tests
3. Mejorar UX del cambio de idioma

**Ventaja:** Mejor experiencia de usuario  
**Tiempo estimado:** 2-3 horas

---

## 📞 Preguntas Frecuentes

**P: ¿Cómo agrego un nuevo texto traducible?**  
R: 1) Agregar a BD con SQL INSERT, 2) Ejecutar `npm run translate`, 3) Usar en componente

**P: ¿Puedo editar traducciones manualmente?**  
R: Sí, directamente en Supabase o esperando al backoffice (Fase 2)

**P: ¿Qué pasa si cambio un texto en español?**  
R: Debes ejecutar `npm run translate` de nuevo para actualizar la traducción

**P: ¿Cómo funciona el fallback?**  
R: Si `texto_en` es null, la VIEW `contenido_localizado` devuelve `texto_es` automáticamente

**P: ¿Puedo agregar más idiomas (portugués)?**  
R: Sí, la tabla ya tiene `texto_pt`. Solo falta actualizar el script y el frontend

---

**Última actualización:** 31 de marzo de 2026  
**Mantenido por:** Kiro AI Assistant
