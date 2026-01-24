"use client";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "./ExampleCarouselImage";
import { useState } from "react";
import carouselData from "@/data/carousel.json";
import { StaticImageData } from "next/image";
import { FaBroadcastTower, FaYoutube } from "react-icons/fa";

// CONFIGURACIÓN DE VACACIONES
const FECHA_REGRESO = "el jueves 19 de febrero de 20 a 21 hs"; // Texto que verá la gente
const FECHA_LIMITE = new Date("2026-02-19"); // Fecha para que el cartel desaparezca solo

// Importar imágenes
import car1 from "../../public/car1.jpeg";
import car2 from "../../public/car2.jpg";
import car3 from "../../public/car3.jpeg";

const imageMap: Record<string, StaticImageData> = {
  "/car1.jpeg": car1,
  "/car2.jpg": car2,
  "/car3.jpeg": car3,
};

export default function ControlledCarousel() {
  const [index, setIndex] = useState<number>(0);

  // Lógica automática: si hoy es antes de la fecha límite, estamos en vacaciones
  const hoy = new Date();
  const esVacaciones = hoy < FECHA_LIMITE;

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

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
              />
            </div>

            <div className="static md:absolute md:bottom-0 md:left-0 md:right-0 bg-slate-900 md:bg-black/50 text-white p-6 pb-20 md:p-12 md:pb-12 text-center backdrop-blur-sm transition-all min-h-[260px] md:min-h-[320px] md:max-h-[380px] flex flex-col justify-center">
              
              <p className="text-blue-400 text-xs md:text-sm uppercase tracking-[0.2em] font-bold mb-2">
                {slide.category}
              </p>

              <h2 className="text-xl md:text-4xl font-extrabold leading-tight mb-3">
                {slide.title}
              </h2>

              {slide.subtitle && (
                <div className="mb-4">
                  {/* Si es el slide de la radio (ID 1) y estamos en vacaciones, cambia el texto */}
                  {slide.id === 1 && esVacaciones ? (
                    <p className="text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 px-4 py-2 rounded-lg inline-block text-sm md:text-lg font-bold animate-pulse">
                      ✨ Retomamos la programación {FECHA_REGRESO}
                    </p>
                  ) : (
                    <p className="text-slate-300 text-sm md:text-lg font-light">
                      {slide.subtitle}
                    </p>
                  )}
                </div>
              )}

              {slide.link && (
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
          .carousel-caption {
            display: none !important;
          }
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