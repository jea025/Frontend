# Instrucciones: Agregar Video de Testimonios de Personalidades

## 📋 Resumen

Se agregó una nueva sección en la galería con el video de Victor Valle (ex CEO de Google Argentina) debajo de la sección "Eventos en los que participamos".

---

## 🎯 Cambios Realizados

### 1. Componente Actualizado
**Archivo:** `Frontend/components/GaleriaCeos/GaleriaCeos.tsx`

Se agregó una nueva sección después del video de Fundación Barceló con:
- Título: "Personalidades que han pasado por nuestro espacio y sus testimonios"
- Video embebido de YouTube (Victor Valle)
- Botón para ver el reel completo en Instagram

### 2. Script SQL Creado
**Archivo:** `Frontend/scripts/add-testimonials-title.sql`

Contiene los textos en español que necesitan ser traducidos:
- `gallery_testimonials_title`: Título de la sección
- `gallery_testimonials_instagram_button`: Texto del botón de Instagram

---

## 🚀 Pasos para Aplicar los Cambios

### Paso 1: Ejecutar el Script SQL en Supabase

1. Abre Supabase Dashboard
2. Ve a SQL Editor
3. Copia y pega el contenido de `Frontend/scripts/add-testimonials-title.sql`
4. Ejecuta el script (botón "Run")
5. Verifica que aparezcan 2 registros nuevos

**Query de verificación:**
```sql
SELECT clave, texto_es, texto_en, contexto
FROM contenido_multilenguaje
WHERE clave IN ('gallery_testimonials_title', 'gallery_testimonials_instagram_button')
ORDER BY clave;
```

**Resultado esperado:**
```
clave                                    | texto_es                                                              | texto_en | contexto
-----------------------------------------|-----------------------------------------------------------------------|----------|----------
gallery_testimonials_instagram_button    | Ver Reel Victor Valle                                                 | NULL     | gallery
gallery_testimonials_title               | Personalidades que han pasado por nuestro espacio y sus testimonios   | NULL     | gallery
```

### Paso 2: Traducir los Textos

Ejecuta el script de traducción:

```bash
cd Frontend
npm run translate
```

**Salida esperada:**
```
[1/2] Traduciendo: gallery_testimonials_instagram_button
  📝 ES: Ver Reel Victor Valle
  ✅ EN: Watch Victor Valle Reel

[2/2] Traduciendo: gallery_testimonials_title
  📝 ES: Personalidades que han pasado por nuestro espacio y sus testimonios
  ✅ EN: Personalities who have visited our space and their testimonials

✅ Exitosas: 2
```

### Paso 3: Verificar en el Sitio Web

1. Abre el sitio web: `http://localhost:3000/gallery`
2. Desplázate hacia abajo hasta después del video de Fundación Barceló
3. Deberías ver:
   - **En Español:** "Personalidades que han pasado por nuestro espacio y sus testimonios"
   - **En Inglés:** "Personalities who have visited our space and their testimonials"
4. Verifica que el video de YouTube se cargue correctamente
5. Verifica que el botón de Instagram funcione

---

## 📊 Estructura de la Nueva Sección

```
┌─────────────────────────────────────────────────────────────┐
│  Eventos en los que participamos (sección existente)        │
│  - Descripción del colectivo saludable                      │
│  - Video de Fundación Barceló                               │
│  - Botón "Ver Reel completo"                                │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  Personalidades que han pasado por nuestro espacio...       │  ← NUEVA SECCIÓN
│  - Video de Victor Valle (YouTube embebido)                 │
│  - Botón "Ver Reel Victor Valle"                            │
└─────────────────────────────────────────────────────────────┘
                          ↓
┌─────────────────────────────────────────────────────────────┐
│  Proyecto Forestación, Educación y Valores                  │
│  (sección existente)                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Detalles Técnicos

### Video Embebido
- **Plataforma:** YouTube
- **URL del video:** `https://www.youtube.com/watch?v=xN0crvT6BfQ`
- **URL embebida:** `https://www.youtube.com/embed/xN0crvT6BfQ`
- **Dimensiones:** 280px × 200px
- **Estilo:** Bordes redondeados, sombra, borde blanco

### Link a Instagram
- **URL del reel:** `https://www.instagram.com/reels/DB1iOFHvC9V/`
- **Estilo:** Botón oscuro con icono de Instagram rosa

### Textos Traducibles
| Clave                                  | Español                                                              | Inglés (auto-traducido)                                    |
|----------------------------------------|----------------------------------------------------------------------|-----------------------------------------------------------|
| `gallery_testimonials_title`           | Personalidades que han pasado por nuestro espacio y sus testimonios  | Personalities who have visited our space and their testimonials |
| `gallery_testimonials_instagram_button`| Ver Reel Victor Valle                                                | Watch Victor Valle Reel                                   |

---

## ✅ Checklist de Verificación

- [ ] Script SQL ejecutado en Supabase
- [ ] 2 registros nuevos en `contenido_multilenguaje`
- [ ] `npm run translate` ejecutado exitosamente
- [ ] Textos traducidos al inglés en la base de datos
- [ ] Video visible en español en el sitio web
- [ ] Video visible en inglés en el sitio web
- [ ] Botón de Instagram funciona correctamente
- [ ] Video de YouTube se reproduce correctamente
- [ ] Diseño responsive funciona en móvil y desktop

---

## 🐛 Troubleshooting

### El video no se muestra
- Verifica que el iframe de YouTube no esté bloqueado por el navegador
- Revisa la consola del navegador para errores
- Verifica que la URL del video sea correcta

### Los textos no están traducidos
- Ejecuta `npm run translate` nuevamente
- Verifica en Supabase que `texto_en` no sea NULL
- Limpia el caché del navegador (Ctrl + Shift + R)

### El botón de Instagram no funciona
- Verifica que la URL del reel sea correcta
- Prueba abriendo la URL directamente en el navegador

---

**Última actualización:** 6 de abril de 2026  
**Autor:** Kiro AI Assistant
