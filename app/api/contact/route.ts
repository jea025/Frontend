import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  // Estos logs nos van a decir qué ve el servidor realmente
  console.log("DEBUG URL:", process.env.NEXT_PUBLIC_SUPABASE_URL ? "Existe" : "FALTA");
  console.log("DEBUG KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY ? "Existe" : "FALTA");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  try {
    if (!supabaseUrl || !supabaseServiceKey) {
      // Agregamos más info al error para saber cuál falta
      const falta = !supabaseUrl ? "URL" : "KEY";
      return NextResponse.json(
        { error: `Configuración de Supabase faltante: Falta la ${falta}` },
        { status: 500 }
      );
    }
    // ... resto del código

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
  } catch (e: any) {
    // ESTO VA A GRITAR EN TU TERMINAL
    console.error("--- ERROR DETECTADO EN API/CONTACT ---");
    console.error("Mensaje:", e.message);
    console.error("Stack:", e.stack);
    console.error("---------------------------------------");
    
    return NextResponse.json(
      { error: "Error interno", detalle: e.message },
      { status: 500 }
    );
  }
}
