"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image, { StaticImageData } from "next/image";
import "./GaleriaCeos.css";

// Importar las imágenes de CEOs
import ceos1 from '../../public/ceos y emprendedores.jpeg';
import ceos2 from '../../public/ceos y emprendedores (1).jpeg';
import ceos3 from '../../public/ceos y emprendedores (2).jpeg';

// Importar las imágenes de Colegios
import colegios1 from '../../public/colegios (1).jpeg';
import colegios2 from '../../public/colegios (2).jpeg';

// Importar las imágenes de Plantación
import plantacion1 from '../../public/Plantación.jpeg';
import plantacion2 from '../../public/plantación (2).jpeg';
import plantacion3 from '../../public/plantación (3).jpeg';

// Importar las imágenes de Voluntariado
import voluntariado1 from '../../public/voluntariado.jpeg';
import voluntariado2 from '../../public/voluntariado (2).jpeg';
import voluntariado3 from '../../public/voluntariado.jpg';

interface ImagenGaleria {
  src: string | StaticImageData;
  alt: string;
  titulo?: string;
}

const imagenesGaleriaCeos: ImagenGaleria[] = [
  {
    src: ceos1,
    alt: "Entrevista con CEOs y Emprendedores - Sesión 1",
    titulo: "Entrevista con Victor Valle CEO de GOOGLE Argentina"
  },
  {
    src: ceos2,
    alt: "Entrevista con CEOs y Emprendedores - Sesión 2",
    titulo: "Entrevista a Alejandro y Micaela Kelman"
  },
  {
    src: ceos3,
    alt: "Programa Jóvenes en Acción - Entrevistas",
    titulo: "Entrevista al equipo ganador del 3er puesto del Premio Banco Patagonia Innova del 2013"
  }
];

const imagenesColegios: ImagenGaleria[] = [
  {
    src: colegios1,
    alt: "Alumnos secundarios en programa radial",
    titulo: "Jóvenes Conductores"
  },
  {
    src: colegios2,
    alt: "Estudiantes en producción de radio",
    titulo: "Experiencia Radiofónica"
  }
];

const imagenesPlantacion: ImagenGaleria[] = [
  {
    src: plantacion1,
    alt: "Proyecto de Forestación - Plantación de árboles",
    titulo: "Plantación de Árboles Frutales"
  },
  {
    src: plantacion2,
    alt: "Jóvenes plantando árboles",
    titulo: "Educación Ambiental"
  },
  {
    src: plantacion3,
    alt: "Proyecto Forestación, Educación y Valores",
    titulo: "Compromiso con el Medio Ambiente"
  }
];

const imagenesVoluntariado: ImagenGaleria[] = [
  {
    src: voluntariado1,
    alt: "Hogar",
    titulo: "V H"
  },
  {
    src: voluntariado2,
    alt: "Hogar",
    titulo: "Cumpleaños Hogar"
  },
  {
    src: voluntariado3,
    alt: "Hogar",
    titulo: "Festejo Hogar"
  }
];

export default function GaleriaCeos() {
  const [imagenSeleccionada, setImagenSeleccionada] = useState<{galeria: string; index: number} | null>(null);

  const abrirModal = useCallback((galeria: string, index: number) => {
    setImagenSeleccionada({galeria, index});
    document.body.style.overflow = 'hidden';
  }, []);

  const cerrarModal = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setImagenSeleccionada(null);
    document.body.style.overflow = 'unset';
  }, []);

  const obtenerImagenesActuales = useCallback((): ImagenGaleria[] => {
    if (!imagenSeleccionada) return [];
    switch(imagenSeleccionada.galeria) {
      case 'ceos': return imagenesGaleriaCeos;
      case 'colegios': return imagenesColegios;
      case 'plantacion': return imagenesPlantacion;
      case 'hogar': return imagenesVoluntariado;
      default: return [];
    }
  }, [imagenSeleccionada]);

  const navegarImagen = useCallback((e: React.MouseEvent, direccion: 'anterior' | 'siguiente') => {
    e.stopPropagation();
    if (!imagenSeleccionada) return;
    
    const imagenesActuales = obtenerImagenesActuales();
    let nuevoIndice;
    
    if (direccion === 'anterior') {
      nuevoIndice = imagenSeleccionada.index === 0 ? imagenesActuales.length - 1 : imagenSeleccionada.index - 1;
    } else {
      nuevoIndice = imagenSeleccionada.index === imagenesActuales.length - 1 ? 0 : imagenSeleccionada.index + 1;
    }
    setImagenSeleccionada({galeria: imagenSeleccionada.galeria, index: nuevoIndice});
  }, [imagenSeleccionada, obtenerImagenesActuales]);

  // Navegación con teclado
  useEffect(() => {
    if (!imagenSeleccionada) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      const imagenesActuales = obtenerImagenesActuales();
      
      if (e.key === 'ArrowLeft') {
        const nuevoIndice = imagenSeleccionada.index === 0 ? imagenesActuales.length - 1 : imagenSeleccionada.index - 1;
        setImagenSeleccionada({galeria: imagenSeleccionada.galeria, index: nuevoIndice});
      } else if (e.key === 'ArrowRight') {
        const nuevoIndice = imagenSeleccionada.index === imagenesActuales.length - 1 ? 0 : imagenSeleccionada.index + 1;
        setImagenSeleccionada({galeria: imagenSeleccionada.galeria, index: nuevoIndice});
      } else if (e.key === 'Escape') {
        cerrarModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [imagenSeleccionada, obtenerImagenesActuales, cerrarModal]);

  const renderGaleria = (imagenes: ImagenGaleria[], nombreGaleria: string, isFirstSection: boolean = false) => (
    <div className="galeria-grid">
      {imagenes.map((imagen, index) => (
        <div 
          key={index} 
          className="imagen-container"
          onClick={() => abrirModal(nombreGaleria, index)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              abrirModal(nombreGaleria, index);
            }
          }}
        >
          <div className="imagen-wrapper">
            <Image
              src={imagen.src}
              alt={imagen.alt}
              className="imagen-galeria"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={isFirstSection && index === 0}
            />
            <div className="overlay">
              <div className="overlay-content">
                <h3 className="imagen-titulo">{imagen.titulo}</h3>
                <p className="click-para-ampliar">Toca para ampliar</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* Primera sección - CEOs y Emprendedores */}
      <div className="galeria-ceos-container">
        <div className="descripcion-section">
          <h1 className="titulo-principal">
            <span className="texto-destacado">Jóvenes en Acción</span> en{" "}
            <span className="texto-radio">RADIO CULTURA</span>
          </h1>
          <h2 className="subtitulo">
            Entrevistas a <span className="texto-ceos">CEOS de Empresas</span>,{" "}
            <span className="texto-emprendedores">Emprendedores</span> y{" "}
            <span className="texto-especialistas">Especialistas</span>
          </h2>
          <p className="descripcion-texto">
            Descubre los momentos más inspiradores de nuestro programa radial, donde jóvenes 
            tienen la oportunidad única de entrevistar a líderes empresariales, emprendedores 
            exitosos y especialistas de diversas áreas, creando un puente generacional lleno 
            de aprendizaje y motivación.
          </p>
        </div>

        {renderGaleria(imagenesGaleriaCeos, 'ceos', true)} 
      </div>

      {/* Segunda sección - Alumnos Secundarios */}
      <div className="segunda-seccion">
        <div className="descripcion-secundaria">
          <h2 className="titulo-secundario">
            <span className="texto-programas">Programas</span> con la{" "}
            <span className="texto-produccion">Producción y Conducción</span> de{" "}
            <span className="texto-alumnos">alumnos secundarios</span> de{" "}
            <span className="texto-colegios">distintos Colegios</span>
          </h2>
        </div>
        
        {renderGaleria(imagenesColegios, 'colegios')}

 {/* --- SECCIÓN: EVENTOS Y ESTUDIANTES (SIN RECTÁNGULO DE FONDO) --- */}
        <div className="flex flex-col items-center justify-center mt-16 pb-20 px-4">
          
          {/* Título - Sin fondo, integrado al flujo */}
          <div className="relative mb-8 flex flex-col items-center">
            <h3 className="text-slate-800 text-3xl md:text-4xl font-extrabold tracking-tight text-center">
              Eventos en los que participamos:
            </h3>
            {/* Una línea un poco más estética */}
            <div className="h-1.5 w-16 bg-blue-600 mt-4 rounded-full"></div>
          </div>

          {/* Descripción - Color sólido sin transparencias extrañas */}
          <p className="max-w-2xl text-slate-700 text-center text-sm md:text-base leading-relaxed mb-10 font-medium px-2">
            ¡Presentes en el lanzamiento del primer <span className="font-bold text-blue-700">"Colectivo Saludable y Sustentable"</span> de Argentina! 
            Contó con la colaboración de Fundación Barceló y otras universidades, donde nuestra integrante 
            <span className="text-slate-900 font-bold border-b-2 border-blue-200"> Francesca Simonotto</span> (alumna de Medicina de Barceló) representó a Jóvenes en Acción.
          </p>

          {/* Contenedor del Video - Ahora con una sombra más suave para que no "explote" sobre el fondo */}
          <div className="w-full max-w-[280px] overflow-hidden rounded-[2.5rem] shadow-xl border-[6px] border-slate-100 bg-black">
            <video 
              controls 
              preload="metadata"
              poster="/miniatura_video_barcelo.png"
              className="w-full h-auto block"
            >
              <source src="/JEA_Fundacion_Barcelo.mp4#t=0.001" type="video/mp4" />
              Tu navegador no soporta videos.
            </video>
          </div>
          
          {/* Botón de Instagram - Estilo minimalista */}
          <a 
            href="https://www.instagram.com/reel/DPT4ZUMDSDH/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-10 flex items-center gap-2 px-8 py-3 bg-slate-900 hover:bg-black rounded-xl text-white text-sm font-bold transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              className="w-5 h-5 text-pink-400"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            Ver Reel completo
          </a>

        </div>

      </div>

      {/* Tercera sección - Forestación */}
      <div className="tercera-seccion">
        <div className="descripcion-terciaria">
          <h2 className="titulo-terciario">
            <span className="texto-proyecto">PROYECTO</span>{" "}
            <span className="texto-forestacion">FORESTACIÓN</span>,{" "}
            <span className="texto-educacion-valores">EDUCACIÓN</span> y{" "}
            <span className="texto-valores">VALORES</span>
          </h2>
        </div>
        
        {renderGaleria(imagenesPlantacion, 'plantacion')}
      </div>

      {/* Cuarta sección - Voluntariado */}
      <div className="cuarta-seccion">
        <div className="descripcion-cuarta">
          <h2 className="titulo-cuarto">
            <span className="texto-voluntariado">VOLUNTARIADO</span> en{" "}
            <span className="texto-forestacion">HOGAR</span> {" "}
            <span className="texto-educacion-valores">DE</span> {" "}
            <span className="texto-valores">NIÑOS</span> {" "}
            <span className="texto-forestacion">&ldquo;Puerta </span>
            <span className="texto-educacion-valores">del</span> {" "}
            <span className="texto-valores">Cielo&rdquo;</span>
          </h2>
        </div>
        
        {renderGaleria(imagenesVoluntariado, 'hogar')}
      </div>

      {/* Modal para imagen ampliada */}
      {imagenSeleccionada !== null && (() => {
        const imagenesActuales = obtenerImagenesActuales();
        const imagenActual = imagenesActuales[imagenSeleccionada.index];
        
        return (
          <div 
            className="modal-overlay" 
            onClick={cerrarModal}
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button 
                className="boton-cerrar" 
                onClick={cerrarModal}
                aria-label="Cerrar modal"
              >
                ×
              </button>
              
              <button 
                className="boton-navegacion boton-anterior"
                onClick={(e) => navegarImagen(e, 'anterior')}
                aria-label="Imagen anterior"
              >
                ‹
              </button>
              <button 
                className="boton-navegacion boton-siguiente"
                onClick={(e) => navegarImagen(e, 'siguiente')}
                aria-label="Imagen siguiente"
              >
                ›
              </button>

              <div className="imagen-modal-wrapper">
                <Image
                  src={imagenActual.src}
                  alt={imagenActual.alt}
                  className="imagen-modal"
                  fill
                  sizes="90vw"
                  priority
                />
              </div>
              
              <div className="info-imagen">
                <h3>{imagenActual.titulo}</h3>
                <p>{imagenSeleccionada.index + 1} de {imagenesActuales.length}</p>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
}
