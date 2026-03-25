"use client";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "./ExampleCarouselImage";
import { useState, useEffect } from "react";
import carouselData from "@/data/carousel.json";
import { StaticImageData } from "next/image";
import { FaBroadcastTower, FaYoutube } from "react-icons/fa";
import { createClient } from '@/utils/supabase/client';

// CONFIGURACIÓN DE VACACIONES
const FECHA_REGRESO = "el jueves 5 de marzo de 20 a 21 hs"; // Texto que verá la gente
const FECHA_LIMITE = new Date("2026-03-05"); // Fecha para que el cartel desaparezca solo

// Importar imágenes
import car1 from "../../public/car1.jpeg";
import car2 from "../../public/car2.jpg";
import car3 from "../../public/car3.jpeg";

const imageMap: Record<string, StaticImageData> = {
  "/car1.jpeg": car1,
  "/car2.jpg": car2,
  "/car3.jpeg": car3,
};

interface CarruselProps {
  foto_principal?: string;
  titulo_web?: string;
  carrusel_titulo_1?: string;
  carrusel_titulo_2?: string;
  carrusel_titulo_3?: string;
}

export default function ControlledCarousel({ foto_principal, titulo_web, carrusel_titulo_1, carrusel_titulo_2, carrusel_titulo_3 }: CarruselProps) {
  const [index, setIndex] = useState<number>(0);
  const [radioData, setRadioData] = useState({ dia: '', mes: '' });

  // Obtener datos de radio dinámicamente
  useEffect(() => {
    async function fetchRadioData() {
      try {
        const supabase = createClient()
        
        const { data: diaData } = await supabase
          .from('configuracion')
          .select('valor')
          .eq('clave', 'radio_dia')
          .single()

        const { data: mesData } = await supabase
          .from('configuracion')
          .select('valor')
          .eq('clave', 'radio_mes')
          .single()

        setRadioData({
          dia: diaData?.valor || '',
          mes: mesData?.valor || ''
        })
      } catch (error) {
        console.error('❌ Error fetching radio data:', error)
      }
    }

    fetchRadioData()
  }, [])

  // Función para generar el mensaje dinámico
  const getRadioMessage = () => {
    if (!radioData.dia || !radioData.mes) {
      return 'Todos los jueves por radio cultura de 20 a 21 hs'
    }

    const currentDate = new Date()
    const currentYear = currentDate.getFullYear()
    const targetDate = new Date(`${radioData.mes} ${radioData.dia}, ${currentYear}`)
    
    // Si la fecha actual es anterior a la ingresada
    if (currentDate < targetDate) {
      return `✨ Retomamos la programación el jueves ${radioData.dia} de ${radioData.mes} de 20 a 21 hs`
    }
    
    // Si la fecha ya pasó o es el mismo día
    return 'Todos los jueves por Radio Cultura de 20 a 21 hs'
  }

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  // Lógica automática: si hoy es antes de la fecha límite, estamos en vacaciones
  const hoy = new Date();
  const esVacaciones = hoy < FECHA_LIMITE;

  const slides = carouselData.hero.slides;

  return (
    <div className="carousel-wrapper w-full">
      <Carousel activeIndex={index} onSelect={handleSelect} interval={5000} indicators={true} className="w-full">
        {slides.map((slide, idx) => (
          <Carousel.Item key={slide.id}>
            <div className="relative overflow-hidden">
              <ExampleCarouselImage 
                img={imageMap[slide.image]} 
                priority={idx === 0}
                width={320}
                height={240}
              />
            </div>

            <div className="static md:absolute md:bottom-0 md:left-0 md:right-0 bg-slate-900 md:bg-black/50 text-white p-6 pb-20 md:p-12 md:pb-12 text-center backdrop-blur-sm transition-all min-h-[320px] md:min-h-[320px] md:max-h-[380px] flex flex-col justify-center">
              
              <p className="text-blue-400 text-xs md:text-sm uppercase tracking-[0.2em] font-bold mb-2">
                {slide.category}
              </p>

              <h2 className="text-xl md:text-4xl font-extrabold leading-tight mb-3">
                {slide.id === 1 && carrusel_titulo_1 ? carrusel_titulo_1 :
                 slide.id === 2 && carrusel_titulo_2 ? carrusel_titulo_2 :
                 slide.id === 3 && carrusel_titulo_3 ? carrusel_titulo_3 :
                 titulo_web || slide.title}
              </h2>

              {slide.subtitle && (
                <div className="mb-4">
                  {/* Si es el slide de la Radio (ID 1), usa el mensaje dinámico */}
                  {slide.id === 1 ? (
                    <p className="text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 px-4 py-2 rounded-lg inline-block text-sm md:text-lg font-bold animate-pulse">
                      {getRadioMessage()}
                    </p>
                  ) : (
                    <p className="text-slate-300 text-sm md:text-lg font-light">
                      {slide.id === 2 ? (
                        <p className="text-slate-300 text-sm md:text-lg font-light">
                          Participaron más de 1.500 jóvenes
                        </p>
                      ) : (
                        <p className="text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 px-4 py-2 rounded-lg inline-block text-sm md:text-lg font-bold animate-pulse">
                          Todos los jueves por Radio Cultura de 20 a 21 hs
                        </p>
                      )}
                    </p>
                  )}
                </div>
              )}

              {slide.link && slide.id !== 1 && (
                <div className="flex flex-col gap-3 mt-2 mb-4 items-center justify-center">
                  <a 
                    href={slide.link.url} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-400 hover:text-white underline text-xs md:text-sm break-all justify-center"
                  >
                    <FaBroadcastTower className="text-base md:text-lg flex-shrink-0" />
                    <span>{slide.link.text}</span>
                  </a>
                  {(slide as any).youtubeLink && (
                    <a 
                      href={(slide as any).youtubeLink.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-red-400 hover:text-white underline text-xs md:text-sm break-all justify-center"
                    >
                      <FaYoutube className="text-base md:text-lg flex-shrink-0" />
                      <span>{(slide as any).youtubeLink.text}</span>
                    </a>
                  )}
                </div>
              )}

              {/* Radio links outside text container for better layout - only show for first photo */}
              {slide.id === 1 && (
                <div className="flex flex-col gap-3 mt-1 mb-8 items-center justify-center">
                  <a href="www.fmradiocultura.com.ar/radio-cultura-en-vivo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-white underline text-base md:text-lg break-all justify-center">
                    <FaBroadcastTower className="text-base md:text-lg flex-shrink-0" />
                    <span>www.fmradiocultura.com.ar/radio-cultura-en-vivo</span>
                  </a>
                  <a href="www.youtube.com/@radioculturaba" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-red-400 hover:text-white underline text-base md:text-lg break-all justify-center">
                    <FaYoutube className="text-base md:text-lg flex-shrink-0" />
                    <span>www.youtube.com/@radioculturaba</span>
                  </a>
                </div>
              )}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <style jsx global>{`
        .carousel-wrapper {
          width: 100%;
          overflow: hidden;
          margin: 0;
          padding: 0;
        }
        .carousel {
          width: 100%;
          margin: 0;
          padding: 0;
        }
        .carousel-inner {
          width: 100%;
          margin: 0;
          padding: 0;
        }
        .carousel-item {
          background-color: #0f172a;
          width: 100%;
          margin: 0;
          padding: 0;
        }
        .carousel-item > div {
          width: 100%;
          margin: 0;
          padding: 0;
        }
        .carousel-item img {
          width: 100% !important;
          height: auto;
          object-fit: cover;
          object-position: center 25%;
          display: block;
          margin: 0;
          padding: 0;
        }
        @media (max-width: 768px) {
          /* Ajuste para los puntitos del carrusel en móvil - más cerca del contenido */
          .carousel-indicators {
            bottom: 24px !important;
            margin-bottom: 0 !important;
          }
          /* Espacio adicional para evitar superposición con indicadores */
          .carousel-item > div:last-child {
            padding-bottom: 4.5rem !important;
          }
        }
        /* Ajuste para desktop también */
        @media (min-width: 769px) {
          .carousel-indicators {
            bottom: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}