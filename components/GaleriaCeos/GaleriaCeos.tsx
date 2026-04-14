"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image, { StaticImageData } from "next/image";
import { useContent } from "@/hooks/useContent";
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

export default function GaleriaCeos() {
  // Cargar textos traducidos de la galería
  const { content: galleryTexts } = useContent({ prefix: 'gallery_', removePrefix: true });
  
  const [imagenSeleccionada, setImagenSeleccionada] = useState<{galeria: string; index: number} | null>(null);

  // Definir arrays de imágenes usando textos de la base de datos
  const imagenesGaleriaCeos: ImagenGaleria[] = [
    {
      src: ceos1,
      alt: "Entrevista con CEOs y Emprendedores - Sesión 1",
      titulo: galleryTexts.ceos_img1_title || "Entrevista con Victor Valle CEO de GOOGLE Argentina"
    },
    {
      src: ceos2,
      alt: "Entrevista con CEOs y Emprendedores - Sesión 2",
      titulo: galleryTexts.ceos_img2_title || "Entrevista a Alejandro y Micaela Kelman"
    },
    {
      src: ceos3,
      alt: "Programa Jóvenes en Acción - Entrevistas",
      titulo: galleryTexts.ceos_img3_title || "Entrevista al equipo ganador del 3er puesto del Premio Banco Patagonia Innova del 2013"
    }
  ];

  const imagenesColegios: ImagenGaleria[] = [
    {
      src: colegios1,
      alt: "Alumnos secundarios en programa radial",
      titulo: galleryTexts.schools_img1_title || "Jóvenes Conductores"
    },
    {
      src: colegios2,
      alt: "Estudiantes en producción de radio",
      titulo: galleryTexts.schools_img2_title || "Experiencia Radiofónica"
    }
  ];

  const imagenesPlantacion: ImagenGaleria[] = [
    {
      src: plantacion1,
      alt: "Proyecto de Forestación - Plantación de árboles",
      titulo: galleryTexts.forest_img1_title || "Plantación de Árboles Frutales"
    },
    {
      src: plantacion2,
      alt: "Jóvenes plantando árboles",
      titulo: galleryTexts.forest_img2_title || "Educación Ambiental"
    },
    {
      src: plantacion3,
      alt: "Proyecto Forestación, Educación y Valores",
      titulo: galleryTexts.forest_img3_title || "Compromiso con el Medio Ambiente"
    }
  ];

  const imagenesVoluntariado: ImagenGaleria[] = [
    {
      src: voluntariado1,
      alt: "Hogar",
      titulo: galleryTexts.volunteer_img1_title || "V H"
    },
    {
      src: voluntariado2,
      alt: "Hogar",
      titulo: galleryTexts.volunteer_img2_title || "Cumpleaños Hogar"
    },
    {
      src: voluntariado3,
      alt: "Hogar",
      titulo: galleryTexts.volunteer_img3_title || "Festejo Hogar"
    }
  ];

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
                <p className="click-para-ampliar">{galleryTexts.click_to_enlarge || "Toca para ampliar"}</p>
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
            <span className="texto-destacado">{galleryTexts.ceos_title_1 || "Jóvenes en Acción"}</span> {galleryTexts.ceos_title_2 || "en"}{" "}
            <span className="texto-radio">{galleryTexts.ceos_title_3 || "RADIO CULTURA"}</span>
          </h1>
          <h2 className="subtitulo">
            {galleryTexts.ceos_subtitle_1 || "Entrevistas a"} <span className="texto-ceos">{galleryTexts.ceos_subtitle_2 || "CEOS de Empresas"}</span>,{" "}
            <span className="texto-emprendedores">{galleryTexts.ceos_subtitle_3 || "Emprendedores"}</span> {galleryTexts.ceos_subtitle_4 || "y"}{" "}
            <span className="texto-especialistas">{galleryTexts.ceos_subtitle_5 || "Especialistas"}</span>
          </h2>
          <p className="descripcion-texto">
            {galleryTexts.ceos_description || "Descubre los momentos más inspiradores de nuestro programa radial, donde jóvenes tienen la oportunidad única de entrevistar a líderes empresariales, emprendedores exitosos y especialistas de diversas áreas, creando un puente generacional lleno de aprendizaje y motivación."}
          </p>
        </div>

        {renderGaleria(imagenesGaleriaCeos, 'ceos', true)} 
      </div>

      {/* Segunda sección - Alumnos Secundarios */}
      <div className="segunda-seccion">
        <div className="descripcion-secundaria">
          <h2 className="titulo-secundario">
            <span className="texto-programas">{galleryTexts.schools_title_1 || "Programas"}</span> {galleryTexts.schools_title_2 || "con la"}{" "}
            <span className="texto-produccion">{galleryTexts.schools_title_3 || "Producción y Conducción"}</span> {galleryTexts.schools_title_4 || "de"}{" "}
            <span className="texto-alumnos">{galleryTexts.schools_title_5 || "alumnos secundarios"}</span> {galleryTexts.schools_title_6 || "de"}{" "}
            <span className="texto-colegios">{galleryTexts.schools_title_7 || "distintos Colegios"}</span>
          </h2>
        </div>
        
        {renderGaleria(imagenesColegios, 'colegios')}

 {/* --- SECCIÓN: EVENTOS Y ESTUDIANTES (SIN RECTÁNGULO DE FONDO) --- */}
        <div className="flex flex-col items-center justify-center mt-16 pb-20 px-4">
          
          {/* Título - Sin fondo, integrado al flujo */}
          <div className="relative mb-8 flex flex-col items-center">
            <h3 className="text-slate-800 text-3xl md:text-4xl font-extrabold tracking-tight text-center">
              {galleryTexts.events_title || "Eventos en los que participamos:"}
            </h3>
            {/* Una línea un poco más estética */}
            <div className="h-1.5 w-16 bg-blue-600 mt-4 rounded-full"></div>
          </div>

          {/* Descripción - Color sólido sin transparencias extrañas */}
          <p className="max-w-2xl text-slate-700 text-center text-sm md:text-base leading-relaxed mb-10 font-medium px-2">
            {galleryTexts.events_bus_description || "¡Presentes en el lanzamiento del primer"} <span className="font-bold text-blue-700">{galleryTexts.events_bus_name || '"Colectivo Saludable y Sustentable"'}</span> {galleryTexts.events_bus_description_2 || "de Argentina! Contó con la colaboración de Fundación Barceló y otras universidades, donde nuestra integrante"} 
            <span className="text-slate-900 font-bold border-b-2 border-blue-200"> {galleryTexts.events_member_name || "Francesca Simonotto"}</span> {galleryTexts.events_member_description || "(alumna de Medicina de Barceló) representó a Jóvenes en Acción."}
          </p>

          {/* Contenedor del Video - Ahora con una sombra más suave para que no "explote" sobre el fondo */}
          <div className="w-full max-w-[280px] overflow-hidden rounded-[2.5rem] shadow-xl border-[6px] border-slate-100 bg-black">
            <video 
              controls 
              preload="metadata"
              poster="/miniatura_video_barcelo.png"
              className="w-full h-auto block"
              suppressHydrationWarning
            >
              <source src="/JEA_Fundacion_Barcelo.mp4#t=0.001" type="video/mp4" />
              {galleryTexts.events_video_error || "Tu navegador no soporta videos."}
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
            {galleryTexts.events_instagram_button || "Ver Reel completo"}
          </a>

        </div>

      </div>

      {/* Tercera sección - Forestación */}
      <div className="tercera-seccion">
        <div className="descripcion-terciaria">
          <h2 className="titulo-terciario">
            <span className="texto-proyecto">{galleryTexts.forest_title_1 || "PROYECTO"}</span>{" "}
            <span className="texto-forestacion">{galleryTexts.forest_title_2 || "FORESTACIÓN"}</span>,{" "}
            <span className="texto-educacion-valores">{galleryTexts.forest_title_3 || "EDUCACIÓN"}</span> {galleryTexts.forest_title_4 || "y"}{" "}
            <span className="texto-valores">{galleryTexts.forest_title_5 || "VALORES"}</span>
          </h2>
        </div>
        
        {renderGaleria(imagenesPlantacion, 'plantacion')}
      </div>

      {/* Cuarta sección - Voluntariado */}
      <div className="cuarta-seccion">
        <div className="descripcion-cuarta">
          <h2 className="titulo-cuarto">
            <span className="texto-voluntariado">{galleryTexts.volunteer_title_1 || "VOLUNTARIADO"}</span> {galleryTexts.volunteer_title_2 || "en"}{" "}
            <span className="texto-forestacion">{galleryTexts.volunteer_title_3 || "HOGAR"}</span> {" "}
            <span className="texto-educacion-valores">{galleryTexts.volunteer_title_4 || "DE"}</span> {" "}
            <span className="texto-valores">{galleryTexts.volunteer_title_5 || "NIÑOS"}</span> {" "}
            <span className="texto-forestacion">{galleryTexts.volunteer_title_6 || '"Puerta'} </span>
            <span className="texto-educacion-valores">{galleryTexts.volunteer_title_7 || "del"}</span> {" "}
            <span className="texto-valores">{galleryTexts.volunteer_title_8 || 'Cielo"'}</span>
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
                aria-label={galleryTexts.modal_close || "Cerrar modal"}
              >
                ×
              </button>
              
              <button 
                className="boton-navegacion boton-anterior"
                onClick={(e) => navegarImagen(e, 'anterior')}
                aria-label={galleryTexts.modal_previous || "Imagen anterior"}
              >
                ‹
              </button>
              <button 
                className="boton-navegacion boton-siguiente"
                onClick={(e) => navegarImagen(e, 'siguiente')}
                aria-label={galleryTexts.modal_next || "Imagen siguiente"}
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
                <p>{imagenSeleccionada.index + 1} {galleryTexts.modal_counter || "de"} {imagenesActuales.length}</p>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
}
