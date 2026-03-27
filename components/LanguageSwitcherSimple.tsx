'use client'

import { useI18n } from '@/lib/i18n-simple'

export default function LanguageSwitcherSimple() {
  const { locale, setLocale } = useI18n()

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setLocale('es')}
        className={`px-3 py-1 rounded ${
          locale === 'es'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        ES
      </button>
      <button
        onClick={() => setLocale('en')}
        className={`px-3 py-1 rounded ${
          locale === 'en'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        EN
      </button>
    </div>
  )
}
