"use client";
import Cards from "./Cards";
import aboutData from "@/data/about.json";
import { useState, useRef } from "react";

interface NosotrosProps {
  descripcion_larga?: string;
  mision_texto?: string;
  vision_texto?: string;
  programas_list?: string;
  conocenos_list?: string;
  prensa_list?: string;
}

export default function Nosotros({ descripcion_larga, mision_texto, vision_texto, programas_list, conocenos_list, prensa_list }: NosotrosProps) {
  const { about, radio, video } = aboutData;
  const [expandedPrograms, setExpandedPrograms] = useState<Set<number>>(new Set());
  const timeoutRefs = useRef<{ [key: number]: NodeJS.Timeout }>({});

  const handleMouseEnter = (id: number) => {
    // Clear any existing timeout for this program
    if (timeoutRefs.current[id]) {
      clearTimeout(timeoutRefs.current[id]);
    }
    
    // Set a new timeout to expand after 200ms
    timeoutRefs.current[id] = setTimeout(() => {
      setExpandedPrograms(prev => {
        const newSet = new Set(prev);
        newSet.add(id);
        return newSet;
      });
    }, 200);
  };

  const handleMouseLeave = (id: number) => {
    // Clear any existing timeout for this program
    if (timeoutRefs.current[id]) {
      clearTimeout(timeoutRefs.current[id]);
    }
    
    // Set a new timeout to collapse after 300ms (slightly longer than expand)
    timeoutRefs.current[id] = setTimeout(() => {
      setExpandedPrograms(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 300);
  };

  return (
    <div className="w-full h-auto">
      {/* Sección Acerca de nosotros */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800">
          <span className="text-customCyan2 font-bold">|</span> {about.title}
        </h2>
        
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
          {descripcion_larga ? (
            <p className="text-lg leading-relaxed whitespace-pre-line">
              {descripcion_larga}
            </p>
          ) : (
            about.description.map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed whitespace-pre-line">
                {paragraph}
              </p>
            ))
          )}
          
          <p className="text-lg leading-relaxed mt-6">
              Se consolidó como una organización que tiene el apoyo institucional de la{" "}
              {/* Link a FECIC */}
              <a 
                href={about.partners[0].url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-customCyan2 font-semibold hover:text-cyan-600 underline decoration-2 underline-offset-4"
              >
                {about.partners[0].fullName}
              </a>, y que ha sido seleccionada por{" "}
              
              {/* Link a HELP ARGENTINA */}
              <a 
                href={about.partners[1].url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-customCyan2 font-semibold hover:text-cyan-600 underline decoration-2 underline-offset-4"
              >
                {about.partners[1].name}
              </a>{" "}
              
              para poder recibir fondos desde el exterior, y es miembro de{" "}
              
              {/* Link a POTENCIAR SOLIDARIO */}
              <a 
                href={about.partners[2].url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-customCyan2 font-semibold hover:text-cyan-600 underline decoration-2 underline-offset-4"
              >
                {about.partners[2].name}
              </a>. Ha impactado en más de 24.000 niños, adolescentes y jóvenes de todo el país.
            </p>
          
          {/* Programas */}
          <div className="mt-12 space-y-8">
            {programas_list ? (
              (() => {
                try {
                  const programas = JSON.parse(programas_list)
                  return programas.map((program: any) => (
                    <div 
                      key={program.id} 
                      className="bg-gradient-to-r from-cyan-50 to-transparent rounded-lg border-l-4 border-customCyan2 overflow-hidden transition-all duration-300"
                      onMouseEnter={() => handleMouseEnter(program.id)}
                      onMouseLeave={() => handleMouseLeave(program.id)}
                    >
                      <div className="w-full p-6">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-xl text-gray-900">
                            Programa &quot;{program.titulo}&quot;
                          </h3>
                          <svg
                            className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${expandedPrograms.has(program.id) ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                        <div className={`text-base text-gray-600 italic transition-all duration-300 ${expandedPrograms.has(program.id) ? 'opacity-0 mt-0 h-0' : 'opacity-100 mt-2'}`}>
                          {program.descripcion.split('.')[0] + '.'}
                        </div>
                      </div>
                      <div className={`overflow-hidden transition-all duration-300 ${expandedPrograms.has(program.id) ? 'max-h-96' : 'max-h-0'}`}>
                        <div className="px-6 pb-6 pt-0">
                          <p className="text-lg leading-relaxed text-gray-700 whitespace-pre-line">
                            {program.descripcion}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                } catch {
                  return about.programs.map((program) => (
                    <div 
                      key={program.id} 
                      className="bg-gradient-to-r from-cyan-50 to-transparent rounded-lg border-l-4 border-customCyan2 overflow-hidden transition-all duration-300"
                      onMouseEnter={() => handleMouseEnter(program.id)}
                      onMouseLeave={() => handleMouseLeave(program.id)}
                    >
                      <div className="w-full p-6">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-xl text-gray-900">
                            Programa &quot;{program.name}&quot;
                          </h3>
                          <svg
                            className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${expandedPrograms.has(program.id) ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                        <div className={`text-base text-gray-600 italic transition-all duration-300 ${expandedPrograms.has(program.id) ? 'opacity-0 mt-0 h-0' : 'opacity-100 mt-2'}`}>
                          {program.description.split('.')[0] + '.'}
                        </div>
                      </div>
                      <div className={`overflow-hidden transition-all duration-300 ${expandedPrograms.has(program.id) ? 'max-h-96' : 'max-h-0'}`}>
                        <div className="px-6 pb-6 pt-0">
                          <p className="text-lg leading-relaxed text-gray-700">
                            {program.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                }
              })()
            ) : (
              about.programs.map((program) => (
                <div 
                  key={program.id} 
                  className="bg-gradient-to-r from-cyan-50 to-transparent rounded-lg border-l-4 border-customCyan2 overflow-hidden transition-all duration-300"
                  onMouseEnter={() => handleMouseEnter(program.id)}
                  onMouseLeave={() => handleMouseLeave(program.id)}
                >
                  <div className="w-full p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xl text-gray-900">
                        Programa &quot;{program.name}&quot;
                      </h3>
                      <svg
                        className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${expandedPrograms.has(program.id) ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    <div className={`text-base text-gray-600 italic transition-all duration-300 ${expandedPrograms.has(program.id) ? 'opacity-0 mt-0 h-0' : 'opacity-100 mt-2'}`}>
                      {program.description.split('.')[0] + '.'}
                    </div>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${expandedPrograms.has(program.id) ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-lg leading-relaxed text-gray-700">
                        {program.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Sección de radio */}
      <div className="flex flex-col justify-center items-center min-h-[400px] bg-no-repeat bg-cover bg-fixed bg-center bg-radio py-16 px-6">
        <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 max-w-4xl">
          <h2 className="text-center select-none text-3xl md:text-4xl text-white font-bold mb-6">
            {radio.title}
          </h2>
          <p className="text-center select-none text-lg md:text-xl text-white leading-relaxed">
            {radio.description}
            <a 
              href={radio.youtubeUrl} 
              className="text-cyan-300 hover:text-cyan-100 transition-colors duration-300 underline decoration-cyan-300 hover:decoration-cyan-100 decoration-2 underline-offset-4 block mt-4"
            >
              {radio.youtubeUrl}
            </a>
          </p>
        </div>
      </div>

      <Cards 
        mision_texto={mision_texto}
        vision_texto={vision_texto}
      />

      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-16"></div>

      {/* Video de YouTube */}
      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 mb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
          {video.title}
        </h2>
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-200">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}`}
            title="Video de Jóvenes en Acción"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
