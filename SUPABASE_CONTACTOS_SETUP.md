# Configuración de Supabase para la sección Contactos

Seguí estos pasos **una sola vez** en tu proyecto de Supabase.

---

## 0. Instalar el cliente de Supabase (si no lo hiciste)

En la raíz del proyecto, en la terminal:

```bash
npm install @supabase/supabase-js
```

---

## 1. Agregar la clave de servicio en tu proyecto (`.env.local`)

En la raíz del proyecto, en el archivo **`.env.local`**, agregá esta línea (con el valor real que copiaste de Supabase):

```
SUPABASE_SERVICE_ROLE_KEY=el_valor_que_copiaste_de_supabase
```

**Importante:** Esa clave es la que dice *"This key has the ability to bypass Row Level Security..."*. No la subas a Git ni la compartas. El archivo `.env.local` ya está en `.gitignore`.

---

## 2. Crear la tabla en Supabase

1. Entrá a [Supabase](https://supabase.com) → tu proyecto.
2. En el menú izquierdo, andá a **SQL Editor**.
3. Creá una **New query** y pegá el siguiente SQL.
4. Ejecutá la query (Run).

```sql
-- Tabla para los mensajes de contacto
CREATE TABLE contactos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  asunto TEXT NOT NULL,
  tipo_consulta TEXT NOT NULL,
  como_nos_conociste TEXT,
  telefono TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Índice para ordenar por fecha
CREATE INDEX idx_contactos_created_at ON contactos (created_at DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE contactos ENABLE ROW LEVEL SECURITY;

-- Política: nadie puede leer/actualizar/borrar desde el cliente (anon)
-- Solo el backend con SUPABASE_SERVICE_ROLE_KEY puede insertar.
-- No creamos políticas para anon → el cliente no puede hacer nada directo sobre esta tabla.
-- (El insert lo hace la API de Next.js con la service role.)
```

Después de ejecutar, en **Table Editor** deberías ver la tabla **contactos** con las columnas: `id`, `nombre`, `email`, `mensaje`, `asunto`, `tipo_consulta`, `como_nos_conociste`, `telefono`, `created_at`.

---

## 3. Seguridad (RLS) – qué quedó configurado

- **RLS está activado** en la tabla `contactos`.
- **No hay políticas** que permitan a usuarios anónimos (anon key) leer, insertar, actualizar o borrar. Por eso nadie puede usar la clave pública desde el navegador para tocar esta tabla.
- Los mensajes **solo se guardan** desde el servidor (API de Next.js), usando `SUPABASE_SERVICE_ROLE_KEY`, que puede bypassear RLS. Así solo tu app puede escribir en `contactos`.

No tenés que hacer nada más en Supabase para RLS; con esto alcanza.

---

## Resumen de lo que hiciste

1. Agregaste `SUPABASE_SERVICE_ROLE_KEY` a `.env.local`.
2. Creaste la tabla `contactos` con el SQL de arriba.
3. Dejaste RLS activado y sin políticas para anon (seguro).

Cuando eso esté listo, el formulario de la sección Contactos va a enviar los datos a tu API y esta los guardará en Supabase.
