"use client";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "./ExampleCarouselImage";
import { useState } from "react";
import carouselData from "@/data/carousel.json";
import { StaticImageData } from "next/image";

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

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const slides = carouselData.hero.slides;

  return (
    <div className="carousel-wrapper">
      <Carousel activeIndex={index} onSelect={handleSelect} interval={5000} indicators={true}>
        {slides.map((slide, idx) => (
          <Carousel.Item key={slide.id}>
            {/* Contenedor de la imagen */}
            <div className="relative overflow-hidden">
              <ExampleCarouselImage 
                img={imageMap[slide.image]} 
                priority={idx === 0}
              />
            </div>

            {/* CAPTION ADAPTATIVO */}
            {/* 'static' y 'bg-slate-900' para celular (abajo) | 'md:absolute' y 'md:bg-black/40' para PC (encima) */}
            <div className="static md:absolute md:bottom-0 md:left-0 md:right-0 bg-slate-900 md:bg-black/50 text-white p-6 md:p-12 text-center backdrop-blur-sm transition-all">
              
              <p className="text-blue-400 text-xs md:text-sm uppercase tracking-[0.2em] font-bold mb-2">
                {slide.category}
              </p>

              <h2 className="text-xl md:text-4xl font-extrabold leading-tight mb-3">
                {slide.title}
              </h2>

              {slide.subtitle && (
                <p className="text-slate-300 text-sm md:text-lg font-light mb-4">
                  {slide.subtitle}
                </p>
              )}

              {slide.link && (
                <a 
                  href={slide.link.url} 
                  target="_blank"
                  className="inline-block mt-2 text-blue-400 hover:text-white underline text-xs md:text-sm break-all"
                >
                  {slide.link.text}
                </a>
              )}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Ajuste para que el carrusel no corte el texto en mobile */}
      <style jsx global>{`
        .carousel-item {
          background-color: #0f172a; /* Fondo oscuro por si la imagen tarda en cargar */
        }
        @media (max-width: 768px) {
          .carousel-caption {
            display: none; /* Desactivamos el caption original de Bootstrap que falla en mobile */
          }
        }
      `}</style>
    </div>
  );
}