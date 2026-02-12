import { createClient } from '@/utils/supabase/server'
import DeleteContactButton from './delete-button'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch contactos
  const { data: contactos, error } = await supabase
    .from('contactos')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return <div className="text-red-500">Error al cargar contactos: {error.message}</div>
  }

  return (
    <div className="space-y-6">
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Mensajes de Contacto
          </h2>
        </div>
      </div>

      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
        <div className="px-4 py-5 sm:p-6">
          {contactos && contactos.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">Fecha</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Nombre</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Asunto</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Mensaje</th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Contacto</th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Acciones</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {contactos.map((c) => (
                    <tr key={c.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                        {new Date(c.created_at).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">{c.nombre}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{c.asunto}</td>
                      <td className="px-3 py-4 text-sm text-gray-500 max-w-xs truncate">{c.mensaje}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div>{c.email}</div>
                        {c.telefono && <div>{c.telefono}</div>}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <DeleteContactButton id={c.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500 text-center py-10">No hay mensajes todavía.</p>
          )}
        </div>
      </div>
    </div>
  )
}
