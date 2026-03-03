'use client'

import "./Prensa/Prensa.css"; // Reutilizamos los estilos del componente original

interface LogroItem {
  numero: string
  etiqueta: string
  descripcion: string
  link_texto?: string
  url?: string
}

interface LogrosDisplayProps {
  logros_list: string
}

export default function LogrosDisplay({ logros_list }: LogrosDisplayProps) {
  let logros: LogroItem[] = []
  
  try {
    if (logros_list) {
      logros = JSON.parse(logros_list)
    }
  } catch (error) {
    console.error("Error parsing logros_list:", error)
    logros = []
  }

  if (!logros || logros.length === 0) {
    return null
  }

  return (
    <div className="logrosSection">
      <h1 className="texto tituloH1">LOGROS E IMPACTO</h1>
      
      <div className="logrosGrid">
        {logros.map((logro, index) => (
          <div key={index} className="logroItem">
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
