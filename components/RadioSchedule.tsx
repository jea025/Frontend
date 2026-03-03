'use client'

import { useState } from 'react'

interface RadioScheduleProps {
  dia: string
  mes: string
  onChange: (dia: string, mes: string) => void
}

const meses = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
]

export default function RadioSchedule({ dia, mes, onChange }: RadioScheduleProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Día de Retorno de la Programación
        </label>
        <input
          type="number"
          min="1"
          max="31"
          value={dia}
          onChange={(e) => onChange(e.target.value, mes)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ej: 5"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mes de Retorno de la Programación
        </label>
        <select
          value={mes}
          onChange={(e) => onChange(dia, e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Seleccionar mes</option>
          {meses.map((mesOption) => (
            <option key={mesOption} value={mesOption}>
              {mesOption.charAt(0).toUpperCase() + mesOption.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-blue-50 p-4 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>Lógica de visualización:</strong>
        </p>
        <ul className="mt-2 text-xs text-blue-700 space-y-1">
          <li>• Si la fecha actual es anterior a la ingresada: "✨ Retomamos la programación el jueves [Día] de [Mes] de 20 a 21 hs"</li>
          <li>• Si la fecha ya pasó o es el mismo día: "Todos los jueves por radio cultura de 20 a 21 hs"</li>
        </ul>
      </div>
    </div>
  )
}
