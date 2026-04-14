'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useText, useContent } from '@/hooks/useContent'

interface LogroDinamico {
  numero: string
  etiqueta: string
  descripcion: string
  link_texto?: string
  url?: string
}

interface LogroEstatico {
  numero: string
  etiqueta: string
  descripcion: string
  link_texto?: string
  url?: string
}

export default function LogrosCombinados() {
  const [logrosDinamicos, setLogrosDinamicos] = useState<LogroDinamico[]>([])
  const [loading, setLoading] = useState(true)
  const logrosTitle = useText('logros_title')
  const logrosLoading = useText('logros_loading')
  const { content: logrosTexts } = useContent({ prefix: 'logro_', removePrefix: true });

  // Logros estáticos existentes
  const logrosEstaticos: LogroEstatico[] = [
    {
      numero: "28",
      etiqueta: logrosTexts['28_etiqueta'] || "años",
      descripcion: logrosTexts['28_descripcion'] || "trayectoria como Programa Radial en Radio Cultura desde sus inicios."
    },
    {
      numero: "24.200", 
      etiqueta: logrosTexts['24200_etiqueta'] || "adolescentes y jóvenes",
      descripcion: logrosTexts['24200_descripcion'] || "participaron de 18 provincias y distrito federal"
    },
    {
      numero: "60",
      etiqueta: logrosTexts['60_etiqueta'] || "Colegios",
      descripcion: logrosTexts['60_descripcion'] || "públicos, privados y de distintas confesiones religiosas participaron con sus alumnos secundarios teniendo a cargo la producción y conducción de un espacio.",
      link_texto: logrosTexts.link_video || "Ver video",
      url: "https://www.youtube.com/watch?v=cDfEJe0lCMg"
    },
    {
      numero: "20",
      etiqueta: logrosTexts['20_etiqueta'] || "Universidades", 
      descripcion: logrosTexts['20_descripcion'] || "públicas y privadas de distintas provincias de la Argentina participan por medio de sus alumnos en el programa radial y en los distintos proyectos que realizamos.",
      link_texto: logrosTexts.link_video || "Ver video",
      url: "https://www.youtube.com/watch?v=1XlorMImfRs"
    },
    {
      numero: "50",
      etiqueta: logrosTexts['50_etiqueta'] || "ONGs",
      descripcion: logrosTexts['50_descripcion'] || "dedicadas a la educación, la inclusión laboral, la discapacidad, la inclusión social, el emprendedorismo, la oferta de capacitaciones son aliadas nuestras."
    },
    {
      numero: "3",
      etiqueta: logrosTexts['3_etiqueta'] || "Automóviles",
      descripcion: logrosTexts['3_descripcion'] || "último modelo, donamos a Escuelas Técnicas de Salta, Mendoza y San Miguel del Monte (Pcia. de Bs. As.) en alianza con GM, Citroën y Peugeot."
    },
    {
      numero: "1.200",
      etiqueta: logrosTexts['1200_etiqueta'] || "Jóvenes",
      descripcion: logrosTexts['1200_descripcion'] || "participaron en las Salidas Integradoras e Inclusivas (Cines Debate, Salidas al Teatro, Museos, Conciertos, Eventos solidarios, académicos, para el empleo, etc) con alumnos de 5to año del secundario, estudiantes universitarios y jóvenes profesionales de distintas realidades socioeconómicas, en forma gratuita gracias al apoyo de empresas."
    },
    {
      numero: "15",
      etiqueta: logrosTexts['15_etiqueta'] || "Capacitaciones",
      descripcion: logrosTexts['15_descripcion'] || "en Oratoria y Comunicación Corporal",
      link_texto: logrosTexts.link_video || "Ver video", 
      url: "https://www.youtube.com/watch?v=iK2jV5y_pyc"
    },
    {
      numero: "2.200",
      etiqueta: logrosTexts['2200_etiqueta'] || "Niños y niñas",
      descripcion: logrosTexts['2200_descripcion'] || "que nunca fueron al cine, participaron en las Funciones Solidarias de Cine Debate de Metegol (desde los valores con el Equipo que hizo la película) gracias a J. J. Campanella y empresas.",
      link_texto: logrosTexts.link_video || "Ver video",
      url: "https://www.youtube.com/watch?v=wOeZ9pgnWAU"
    },
    {
      numero: "10",
      etiqueta: logrosTexts['10_etiqueta'] || "Encuentros Nacionales",
      descripcion: logrosTexts['10_descripcion'] || "de Jóvenes Líderes, participaron 100 jóvenes que son primeros estudiantes universitarios de sus familias, de 16 provincias de Argentina con el apoyo del Departamento de Estado de EEUU, su embajada en Argentina, la Fundación Konrad Adenauer y en alianza con empresas y ONGs",
      link_texto: logrosTexts.link_video || "Ver video",
      url: "https://www.youtube.com/watch?v=DaiK9izexZo"
    },
    {
      numero: "150",
      etiqueta: logrosTexts['150_arboles_etiqueta'] || "Plantación de árboles",
      descripcion: logrosTexts['150_arboles_descripcion'] || "frutales en Escuelas y ONGs de distintos rincones de Argentina, liderados por 25 jóvenes líderes (que son los primeros universitarios de sus familias) para inspirar a alumnos secundarios. Ya se plantaron 57 en La Pampa, en Florencio Varela, y San Miguel, Pcia. De Bs. As. y Misiones."
    },
    {
      numero: "150",
      etiqueta: logrosTexts['150_ninos_etiqueta'] || "Niños y niñas",
      descripcion: logrosTexts.ninos_hogares_description || "que viven en Hogares, por causas de abandono familiar, se les ha festejado su Cumpleaños con los voluntarios de Jóvenes en Acción desde 2022",
      link_texto: logrosTexts.link_video || "Ver video",
      url: "https://www.instagram.com/reel/C7kkPX1v8dr"
    }
  ]

  useEffect(() => {
    async function fetchLogrosDinamicos() {
      try {
        const supabase = createClient()
        
        // Primero, ver qué claves existen
        const { data: allData, error: allError } = await supabase
          .from('configuracion')
          .select('clave, valor')
          .like('clave', '%logro%')
        
        console.log('🔍 Claves con "logro":', allData)
        
        // Intentar con diferentes posibles nombres de clave
        const posiblesClaves = ['logros_list', 'logros', 'logros_lista', 'lista_logros']
        let foundData = null
        let usedKey = null
        
        for (const key of posiblesClaves) {
          const { data, error } = await supabase
            .from('configuracion')
            .select('valor')
            .eq('clave', key)
            .single()
          
          if (!error && data?.valor) {
            foundData = data
            usedKey = key
            console.log(`✅ Encontrado con clave: ${key}`)
            break
          } else {
            console.log(`❌ No encontrado con clave: ${key}`, error)
          }
        }

        if (foundData?.valor) {
          try {
            const parsed = JSON.parse(foundData.valor)
            console.log(`✅ Logros dinámicos parseados (${usedKey}):`, parsed)
            setLogrosDinamicos(parsed)
          } catch (parseError) {
            console.error('❌ Error parsing logros:', parseError)
            setLogrosDinamicos([])
          }
        } else {
          console.log('⚠️ No se encontraron logros dinámicos, usando solo estáticos')
          setLogrosDinamicos([])
        }
      } catch (error) {
        console.error('❌ Error general:', error)
        setLogrosDinamicos([])
      } finally {
        setLoading(false)
      }
    }

    fetchLogrosDinamicos()
  }, [])

  if (loading) {
    return (
      <div className="logrosSection">
        <h1 className="texto tituloH1">{logrosTitle || "LOGROS E IMPACTO"}</h1>
        <div className="text-center py-8">{logrosLoading || "Cargando logros..."}</div>
      </div>
    )
  }

  // Combinar logros estáticos y dinámicos
  const todosLosLogros = [...logrosEstaticos, ...logrosDinamicos]

  // Reorganizar por número (convertir a número para ordenar correctamente)
  const logrosOrdenados = todosLosLogros.sort((a, b) => {
    const numA = parseFloat(a.numero.replace(/[.,]/g, ''))
    const numB = parseFloat(b.numero.replace(/[.,]/g, ''))
    return numB - numA // Orden descendente (mayor a menor)
  })

  return (
    <div className="logrosSection">
      <h1 className="texto tituloH1">{logrosTitle || "LOGROS E IMPACTO"}</h1>
      
      <div className="logrosGrid">
        {logrosOrdenados.map((logro, index) => (
          <div key={`logro-${index}`} className="logroItem">
            <div className="numeroDestacado">{logro.numero}</div>
            <div className="textoLogro">
              <strong>{logro.etiqueta}</strong><br />
              {logro.descripcion}
              {logro.link_texto && logro.url && (
                <>
                  <br />
                  <a 
                    href={logro.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="linkVideo"
                  >
                    {logro.link_texto}
                  </a>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
