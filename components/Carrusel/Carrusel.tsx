"use client";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "./ExampleCarouselImage";
import { useState } from "react";
import carouselData from "@/data/carousel.json";
import { StaticImageData } from "next/image";

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
    <div className="carousel-wrapper">
      <Carousel activeIndex={index} onSelect={handleSelect} interval={5000} indicators={true}>
        {slides.map((slide, idx) => (
          <Carousel.Item key={slide.id}>
            <div className="relative overflow-hidden">
              <ExampleCarouselImage 
                img={imageMap[slide.image]} 
                priority={idx === 0}
              />
            </div>

            <div className="static md:absolute md:bottom-0 md:left-0 md:right-0 bg-slate-900 md:bg-black/50 text-white p-6 pb-14 md:p-12 text-center backdrop-blur-sm transition-all min-h-[260px] md:min-h-[auto] flex flex-col justify-center">
              
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
                <a 
                  href={slide.link.url} 
                  target="_blank"
                  className="inline-block mt-2 text-blue-400 hover:text-white underline text-xs md:text-sm break-all mb-4"
                >
                  {slide.link.text}
                </a>
              )}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <style jsx global>{`
        .carousel-item {
          background-color: #0f172a;
        }
        @media (max-width: 768px) {
          .carousel-caption {
            display: none !important;
          }
          /* Ajuste para los puntitos del carrusel en móvil */
          .carousel-indicators {
            bottom: 5px !important;
          }
        }
      `}</style>
    </div>
  );
}