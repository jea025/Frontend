"use client";

import { useState } from "react";

type FormState = {
  nombre: string;
  email: string;
  mensaje: string;
  asunto: string;
  tipo_consulta: string;
  como_nos_conociste: string;
  telefono: string;
};

const TIPOS_CONSULTA = [
  "Consulta general",
  "Prensa / Medios",
  "Colaboración o voluntariado",
  "Información sobre programas",
  "Otro",
];

export default function Contactos() {
  const [form, setForm] = useState<FormState>({
    nombre: "",
    email: "",
    mensaje: "",
    asunto: "",
    tipo_consulta: "",
    como_nos_conociste: "",
    telefono: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "No se pudo enviar el mensaje. Intentá de nuevo.");
        setLoading(false);
        return;
      }

      setSent(true);
      setForm({
        nombre: "",
        email: "",
        mensaje: "",
        asunto: "",
        tipo_consulta: "",
        como_nos_conociste: "",
        telefono: "",
      });
    } catch {
      setError("Error de conexión. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <section id="contactos" className="w-full bg-gray-50 py-16 px-6 md:px-12">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xl md:text-2xl text-gray-800 font-medium">
            Muchas gracias por dejarnos un mensaje, te contactaremos.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="contactos" className="w-full bg-gray-50 py-16 px-6 md:px-12">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800">
          <span className="text-customCyan2 font-bold">|</span> Contactos
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="nombre" className="block text-gray-700 font-medium mb-1">
              Nombre <span className="text-red-500">*</span>
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              required
              value={form.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customCyan2 focus:border-customCyan2 outline-none"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customCyan2 focus:border-customCyan2 outline-none"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label htmlFor="telefono" className="block text-gray-700 font-medium mb-1">
              Teléfono <span className="text-gray-400 text-sm">(opcional)</span>
            </label>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              value={form.telefono}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customCyan2 focus:border-customCyan2 outline-none"
              placeholder="+54 11 1234-5678"
            />
          </div>

          <div>
            <label htmlFor="asunto" className="block text-gray-700 font-medium mb-1">
              Asunto <span className="text-red-500">*</span>
            </label>
            <input
              id="asunto"
              name="asunto"
              type="text"
              required
              value={form.asunto}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customCyan2 focus:border-customCyan2 outline-none"
              placeholder="Ej: Consulta sobre programas"
            />
          </div>

          <div>
            <label htmlFor="tipo_consulta" className="block text-gray-700 font-medium mb-1">
              Tipo de consulta <span className="text-red-500">*</span>
            </label>
            <select
              id="tipo_consulta"
              name="tipo_consulta"
              required
              value={form.tipo_consulta}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customCyan2 focus:border-customCyan2 outline-none bg-white"
            >
              <option value="">Seleccionar...</option>
              {TIPOS_CONSULTA.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="como_nos_conociste" className="block text-gray-700 font-medium mb-1">
              ¿Cómo nos conociste? <span className="text-gray-400 text-sm">(opcional)</span>
            </label>
            <input
              id="como_nos_conociste"
              name="como_nos_conociste"
              type="text"
              value={form.como_nos_conociste}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customCyan2 focus:border-customCyan2 outline-none"
              placeholder="Ej: Redes sociales, búsqueda en internet..."
            />
          </div>

          <div>
            <label htmlFor="mensaje" className="block text-gray-700 font-medium mb-1">
              Mensaje <span className="text-red-500">*</span>
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              required
              rows={5}
              value={form.mensaje}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-customCyan2 focus:border-customCyan2 outline-none resize-y min-h-[120px]"
              placeholder="Escribí tu mensaje..."
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-8 py-3 bg-customCyan2 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Enviando..." : "Enviar mensaje"}
          </button>
        </form>
      </div>
    </section>
  );
}
