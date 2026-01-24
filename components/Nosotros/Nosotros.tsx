import Cards from "./Cards";
import aboutData from "@/data/about.json";

export default function Nosotros() {
  const { about, radio, video } = aboutData;

  return (
    <div className="w-full h-auto">
      {/* Sección Acerca de nosotros */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-800">
          <span className="text-customCyan2 font-bold">|</span> {about.title}
        </h2>
        
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
          {about.description.map((paragraph, index) => (
            <p key={index} className="text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
          
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
            {about.programs.map((program) => (
              <div key={program.id} className="bg-gradient-to-r from-cyan-50 to-transparent p-6 rounded-lg border-l-4 border-customCyan2">
                <h3 className="font-bold text-xl text-gray-900 mb-3">
                  Programa &quot;{program.name}&quot;
                </h3>
                <p className="text-lg leading-relaxed text-gray-700">
                  {program.description}
                </p>
              </div>
            ))}
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

      <Cards />

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
