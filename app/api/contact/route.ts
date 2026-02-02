import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  // Leer variables dentro del handler para asegurar que estén disponibles en runtime
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  try {
    // Debug logging para verificar variables en Vercel
    console.log("Checking Supabase config...");
    console.log("NEXT_PUBLIC_SUPABASE_URL exists:", !!supabaseUrl);
    console.log("SUPABASE_SERVICE_ROLE_KEY exists:", !!supabaseServiceKey);
    
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing Supabase configuration");
      return NextResponse.json(
        { error: "Configuración de Supabase faltante" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const {
      nombre,
      email,
      mensaje,
      asunto,
      tipo_consulta,
      como_nos_conociste,
      telefono,
    } = body;

    if (!nombre?.trim() || !email?.trim() || !mensaje?.trim() || !asunto?.trim() || !tipo_consulta?.trim()) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios: nombre, email, mensaje, asunto, tipo de consulta" },
        { status: 400 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { error: insertError } = await supabase.from("contactos").insert({
      nombre: nombre.trim(),
      email: email.trim(),
      mensaje: mensaje.trim(),
      asunto: asunto.trim(),
      tipo_consulta: tipo_consulta.trim(),
      como_nos_conociste: como_nos_conociste?.trim() || null,
      telefono: telefono?.trim() || null,
    });

    if (insertError) {
      console.error("Supabase insert error:", insertError);
      return NextResponse.json(
        { error: "No se pudo guardar el mensaje. Intentá de nuevo." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json(
      { error: "Error al procesar el mensaje" },
      { status: 500 }
    );
  }
}
