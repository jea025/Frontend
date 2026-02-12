'use client'

import { useState } from 'react'
import { deleteContact } from '../actions/delete-contact'

export default function DeleteContactButton({ id }: { id: number }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('¿Estás seguro de que querés eliminar este mensaje?')) return

    setIsDeleting(true)
    const result = await deleteContact(id)
    
    if (result?.error) {
      alert('Error al eliminar: ' + result.error)
      setIsDeleting(false)
    }
    // If success, revalidatePath in server action will refresh the page
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-600 hover:text-red-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isDeleting ? 'Eliminando...' : 'Eliminar'}
    </button>
  )
}
