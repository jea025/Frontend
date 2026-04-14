'use client'

import "./Prensa.css";
import Image from "next/image";
import afiche from '../../public/afiche.jpg';
import santaClaraImg from '../../public/Santa Clara Premio.jpg';
import embajadaEEUUImg from '../../public/Embajada EEUU.jpg';
import santaClaraAlumnosImg from "../../public/Foto-Alumnos-Santa-Clara-Asis.jpeg";
import LogrosCombinados from './LogrosCombinados';
import PrensaDinamica from './PrensaDinamica';
import { useContent } from '@/hooks/useContent';
// La estatuilla la usaremos directamente por ruta ya que es para un link

export default function Prensa() {
  const { content: prensaTexts } = useContent({ prefix: 'prensa_', removePrefix: true });
  return (
    <div className="prensaContainer">
      {/* PRIMER BLOQUE - LOGROS E IMPACTO (AHORA DINÁMICOS + ESTÁTICOS) */}
      <LogrosCombinados />

      <hr className="separadorSeccion" />

      {/* SEGUNDO BLOQUE - PRENSA Y PREMIOS */}
      <div className="prensaSection">
        <h1 className="texto tituloH1">{prensaTexts.title || "PRENSA Y PREMIOS"}</h1>

        {/* Sección de Prensa */}
        <div className="prensaSubsection">
          <h2 className="texto tituloH2">{prensaTexts.section_title || "Artículos de Prensa"}</h2>
          
          {/* Artículo CONSUDEC Destacado */}
          <div className="articuloDestacadoPrincipal">
            <div className="etiquetaDestacadoPrincipal">{prensaTexts.featured_label || "ARTÍCULO DESTACADO"}</div>
            <a href="https://consudec.org/wp/revistas/#ago25_1" target="_blank" rel="noopener noreferrer" className="enlaceArticuloDestacado">
              {prensaTexts.consudec_title || "Jóvenes en Acción - Revista CONSUDEC - Agosto 2025"}
            </a>
            <p className="descripcionDestacada">
              {prensaTexts.consudec_description || "Artículo especial sobre el impacto y la trayectoria de Jóvenes en Acción publicado en la prestigiosa revista de CONSUDEC (Consejo Superior de Educación Católica)."}
            </p>
            <div className="iconoRevista">📖</div>
          </div>
          
          {/* Artículos Dinámicos del Admin */}
          <PrensaDinamica />
          
          {/* Artículos Estáticos Existentes */}
          <div className="articulosLista">
            <div className="articuloItem">
              <a href="https://aica.org/noticia-jovenes-en-accion-celebro-25-anos-en-el-desarrollo-de-valores-para-brindar-oportunidades" target="_blank" rel="noopener noreferrer" className="enlaceArticulo">
                {prensaTexts.aica_title || "Jóvenes en Acción celebró 25 años en el desarrollo de valores para brindar oportunidades - AICA.org"}
              </a>
              <span className="fechaArticulo">17 de octubre de 2022</span>
            </div>

            <div className="articuloItem">
              <a href="https://www.lanacion.com.ar/comunidad/noticias-del-mundo-social-nid2081739" target="_blank" rel="noopener noreferrer" className="enlaceArticulo"> {prensaTexts.article_5_title || "Noticias del mundo social"}</a>
              <span className="fechaArticulo">{prensaTexts.article_5_date || "13 de noviembre de 2017"}</span>
            </div>

            <div className="articuloItem">
              <a href="https://www.lanacion.com.ar/sociedad/capacitacion-para-jovenes-del-interior-del-pais-nid1665941/" target="_blank" rel="noopener noreferrer" className="enlaceArticulo">
                {prensaTexts.article_6_title || "Capacitación para jóvenes del interior del país - LA NACIÓN"}
              </a>
              <span className="fechaArticulo">{prensaTexts.article_6_date || "21 de febrero de 2014"}</span>
            </div>

            <div className="articuloItem">
              <a href="https://www.lanacion.com.ar/comunidad/que-paso-este-mes-en-el-sector-social-nid1559433/" target="_blank" rel="noopener noreferrer" className="enlaceArticulo">
                {prensaTexts.article_7_title || "Qué pasó este mes en el sector social - LA NACIÓN"}
              </a>
              <span className="fechaArticulo">{prensaTexts.article_7_date || "2 de marzo de 2013"}</span>
            </div>

            <div className="articuloItem ">
              <a href="https://www.lanacion.com.ar/comunidad/la-voz-de-los-invisibles-nid1361797" target="_blank" rel="noopener noreferrer" className="enlaceArticulo"> {prensaTexts.article_1_title || "La voz de los invisibles - LA NACIÓN"}</a>
              <span className="fechaArticulo">{prensaTexts.article_1_date || "2 de abril de 2011"}</span>
              {/*<span className="etiquetaDestacado">DESTACADO</span>*/}
            </div>

            <div className="articuloItem">
              <a href="https://www.lanacion.com.ar/espectaculos/distinguen-los-valores-solidarios-en-medios-de-comunicacion-nid957951" target="_blank" rel="noopener noreferrer" className="enlaceArticulo"> {prensaTexts.article_2_title || "Distinguen los valores solidarios en medios de comunicación"} </a>
              <span className="fechaArticulo">{prensaTexts.article_2_date || "31 de octubre de 2007"}</span>
            </div>

            <div className="articuloItem">
              <a href="https://www.lanacion.com.ar/espectaculos/radio/la-cultura-tambien-se-hace-oir-nid696742" target="_blank" rel="noopener noreferrer" className="enlaceArticulo">{prensaTexts.article_3_title || "La cultura también se hace oír - LA NACIÓN"}</a>
              <span className="fechaArticulo">{prensaTexts.article_3_date || "17 de abril de 2005"}</span>
            </div>

            <div className="articuloItem">
              <a href="https://www.lanacion.com.ar/espectaculos/veinte-minutos-de-aire-nid602936" target="_blank" rel="noopener noreferrer" className="enlaceArticulo">{prensaTexts.article_4_title || "Veinte minutos de aire"}</a>
              <span className="fechaArticulo">{prensaTexts.article_4_date || "21 de mayo de 2004"}</span>
            </div>
          </div>
        </div>

        {/* Sección de Premios */}
        <div className="premiosSubsection">
          <h2 className="texto tituloH2">{prensaTexts.awards_title || "Premios y Reconocimientos"}</h2>
          
          <div className="premiosLista">
            <div className="premioItem">
              <div className="premioIcono">🏆</div>
              <div className="premioContenido">
                <h3 className="premioTitulo">{prensaTexts.premio_santa_clara_title || "Premio Santa Clara de Asís (2001)"}</h3>
                <p className="premioDescripcion">
                  {prensaTexts.premio_santa_clara_org || "📍 Otorgado por la Liga de Madres de Familia"}<br />
                  {prensaTexts.santa_clara_recognition || "Reconocimiento a Jóvenes en Acción por"} {" "}
                  <a 
                    href="/Estatuilla-Santa-Clara-Asis.jpeg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 underline font-semibold hover:text-blue-700"
                  >
                    {prensaTexts.view_diploma || "[ver diploma]"}
                  </a>
                </p>
              </div>
              
              {/* CONTENEDOR DE IMÁGENES: 'flex-col' para celu, 'md:flex-row' para PC */}
              <div className="premioImagenes flex flex-col md:flex-row gap-4 mt-4">
                
                {/* Primera Imagen: Entrega */}
                <a href={santaClaraImg.src} target="_blank" rel="noopener noreferrer" className="cursor-zoom-in block">
                  <Image 
                    src={santaClaraImg} 
                    alt={prensaTexts.premio_santa_clara_alt || "Premio Santa Clara de Asís - Ceremonia de entrega"} 
                    className="imagenPremio hover:opacity-90 transition-opacity rounded-lg"
                    width={300}
                    height={200}
                    style={{ objectFit: 'cover' }}
                  />
                </a>

                {/* Segunda Imagen: Alumnos */}
                <a href={santaClaraAlumnosImg.src} target="_blank" rel="noopener noreferrer" className="cursor-zoom-in block">
                  <Image 
                    src={santaClaraAlumnosImg} 
                    alt={prensaTexts.premio_alumnos_alt || "Alumnos Santa Clara de Asís"} 
                    className="imagenPremio hover:opacity-90 transition-opacity rounded-lg"
                    width={300}
                    height={200}
                    style={{ objectFit: 'cover' }}
                  />
                </a>
              </div>
            </div>

            <div className="premioItem">
              <div className="premioIcono">🏅</div>
              <div className="premioContenido">
                <h3 className="premioTitulo">{prensaTexts.embajada_title || "Reconocimiento de la Embajada de Estados Unidos (2001)"}</h3>
                <p className="premioDescripcion">
                  {prensaTexts.embajada_description_1 || "📍 Embajadora Vilma S. Martinez – Proyecto PLIMIC"}<br />
                  {prensaTexts.embajada_description_2 || "📜 Entrega de diploma y agasajo en la sede diplomática"}<br />
                  {prensaTexts.embajada_description_3 || "El Proyecto PLIMIC (Programa de Liderazgo Inclusivo, Multimedial y Cultural) fue financiado por el Departamento de Estado de EEUU y supervisado por la Embajada. Jóvenes en Acción recibió un diploma en reconocimiento a su labor."}
                </p>
              </div>
              
              <div className="premioImagenes">
                {/* Enlace para expandir la imagen en otra pestaña */}
                <a 
                  href={embajadaEEUUImg.src} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="cursor-zoom-in block"
                >
                  <Image 
                    src={embajadaEEUUImg} 
                    alt="Reconocimiento Embajada de Estados Unidos - Ceremonia" 
                    className="imagenPremio hover:opacity-90 transition-opacity rounded-lg"
                    width={400} // Podés ajustar el tamaño según prefieras
                    height={300}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Artículos principales con contenido completo */}
        <h2 className="texto tituloH2">{prensaTexts.article_full_title || "La voz de los chicos comprometidos"}</h2>
        <div className="cajaTipoRevista">
          <p className="texto parrafo">
            {prensaTexts.article_full_p1 || "Su sueño era mostrar esa juventud que tan poca prensa tenía..."}
            <br />
            <br />
            {prensaTexts.article_full_p2 || "Carmen tenía 18 años la primera vez que se planteó hacer algo con los jóvenes..."}
            <br />
            <br />
            {prensaTexts.article_full_p3 || "La metodología es la siguiente: los chicos eligen un tema..."}
            <br />
            <br />
            {prensaTexts.article_full_p4 || "El programa va los jueves, de 20 a 21, por Radio Cultura FM 97.9..."}
            <br />
            <br />
            {prensaTexts.article_full_p5 || "Los temas que se desgranan en el programa sirven para poner el foco..."}
            <br />
            <br />
            {prensaTexts.article_full_p6 || "No quiere olvidarse: El programa no existiría sin el inicial y constante apoyo..."}
            <br />
            <br />
            {prensaTexts.article_full_p7 || "Chicos internados en un instituto penal de La Plata..."}
            <br />
            <br />
            {prensaTexts.article_full_p8 || "El gran desafío del programa es llegar más lejos..."}
            <br />
            <br />
            {prensaTexts.article_full_p9 || "El efecto va más allá de la radio..."}
            <br />
            <br />
            {prensaTexts.article_full_p10 || "El programa radial Jóvenes en acción cumplió diez años y sigue creciendo."}
            <br />
            <br />
            {prensaTexts.article_full_p11 || "Participar del programa te deja un aprendizaje muy profundo como persona..."}
          </p>
          <Image className="imagenPrensaPrimera" src={afiche} alt="imagen" />
        </div>
        <h4 className="texto">
          {prensaTexts.article_full_author || "Por Cynthia Palacios"}<br></br>{prensaTexts.article_full_source || "FUENTE: Redacción de LA NACION"}
        </h4>
        <hr></hr>

        <h2 className="texto tituloH2">{prensaTexts.canal7_title || "Jóvenes en acción en Canal 7"}</h2>
        <p className="texto parrafo">
          {prensaTexts.canal7_description || "El Sábado 28 de Junio de 2008 a las 21.15 hs volvió Víctor Hugo Morales"}
          {" "}{prensaTexts.canal7_full_p1 || "a presentar por Canal 7, nuevos Protagonistas de La Segunda Argentina..."}
          <br />
          <br />
          {prensaTexts.canal7_full_p2 || "Participó también Carmen Sicardi, Directora del Programa Jóvenes en Acción..."}
          <br />
          <br />
          {prensaTexts.canal7_full_p3 || "En la parte final del programa, chicos con capacidades especiales..."}
          <br />
          <br />
          {prensaTexts.canal7_full_p4 || "El mensaje que trajeron los chicos al programa es que quieren decir basta de violencia..."}
          <br />
          <br />
          {prensaTexts.canal7_full_p5 || "Como en todos los programas al final del mismo todos los participantes recibieron un pasaporte..."}
        </p>
      </div>
    </div>
  );
}
