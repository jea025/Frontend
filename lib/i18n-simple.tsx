'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Locale = 'es' | 'en'

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

// Traducciones simples
const translations: Record<Locale, Record<string, string>> = {
  es: {
    // Navigation
    'nav.home': 'INICIO',
    'nav.about': 'CONÓCENOS MÁS',
    'nav.gallery': 'GALERÍA',
    'nav.contact': 'CONTACTO',
    'nav.mobile.contact': 'Contáctanos:',
    
    // Footer
    'footer.rights': 'Todos los derechos reservados',
    
    // Common
    'common.loading': 'Cargando...',
    'common.error': 'Error',
    'common.success': 'Éxito',
    
    // Home page
    'home.mission': 'Misión',
    'home.vision': 'Visión',
    'home.about': 'Sobre Nosotros',
    'home.achievements': 'Logros e Impactos',
    'home.press': 'Prensa y Premios',
    'home.contact': 'Contacto',
    'home.email': 'Email',
    'home.phone': 'Teléfono',
    'home.address': 'Dirección',
    'home.social': 'Síguenos en redes sociales',
    
    // 404 page
    '404.title': 'Página no encontrada',
    '404.message': 'Lo sentimos, la página que buscas no existe o ha sido movida.',
    '404.home': 'Volver al inicio',
    '404.gallery': 'Ver galería',
    '404.contact': 'Si crees que esto es un error, por favor contáctanos.',
  },
  en: {
    // Navigation
    'nav.home': 'HOME',
    'nav.about': 'ABOUT US',
    'nav.gallery': 'GALLERY',
    'nav.contact': 'CONTACT',
    'nav.mobile.contact': 'Contact us:',
    
    // Footer
    'footer.rights': 'All rights reserved',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    
    // Home page
    'home.mission': 'Mission',
    'home.vision': 'Vision',
    'home.about': 'About Us',
    'home.achievements': 'Achievements and Impact',
    'home.press': 'Press and Awards',
    'home.contact': 'Contact',
    'home.email': 'Email',
    'home.phone': 'Phone',
    'home.address': 'Address',
    'home.social': 'Follow us on social media',
    
    // 404 page
    '404.title': 'Page not found',
    '404.message': 'Sorry, the page you are looking for does not exist or has been moved.',
    '404.home': 'Back to home',
    '404.gallery': 'View gallery',
    '404.contact': 'If you think this is an error, please contact us.',
  },
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('es')

  useEffect(() => {
    // Cargar idioma guardado
    const saved = localStorage.getItem('locale') as Locale
    if (saved && (saved === 'es' || saved === 'en')) {
      setLocaleState(saved)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  const t = (key: string): string => {
    return translations[locale][key] || key
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return context
}
