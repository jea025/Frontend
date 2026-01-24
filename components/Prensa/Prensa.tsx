import "./Prensa.css";
import Image from "next/image";
import afiche from '../../public/afiche.jpg';
import santaClaraImg from '../../public/Santa Clara Premio.jpg';
import embajadaEEUUImg from '../../public/Embajada EEUU.jpg';
import santaClaraAlumnosImg from "../../public/Foto-Alumnos-Santa-Clara-Asis.jpeg";
// La estatuilla la usaremos directamente por ruta ya que es para un link

export default function Prensa() {
  return (
    <div className="prensaContainer">
      {/* PRIMER BLOQUE - LOGROS E IMPACTO */}
      <div className="logrosSection">
        <h1 className="texto tituloH1">LOGROS E IMPACTO</h1>
        
        <div className="logrosGrid">
          <div className="logroItem">
            <div className="numeroDestacado">28</div>
            <div className="textoLogro">
              <strong>años</strong><br />
              trayectoria como Programa Radial en Radio Cultura desde sus inicios.
            </div>
          </div>

          <div className="logroItem">
            <div className="numeroDestacado">24.200</div>
            <div className="textoLogro">
              <strong>adolescentes y jóvenes</strong><br />
              participaron de 18 provincias y distrito federal
            </div>
          </div>

          <div className="logroItem">
            <div className="numeroDestacado">60</div>
            <div className="textoLogro">
              <strong>Colegios</strong><br />
              públicos, privados y de distintas confesiones religiosas participaron con sus alumnos secundarios teniendo a cargo la producción y conducción de un espacio.<br />
              <a href="https://www.youtube.com/watch?v=cDfEJe0lCMg" target="_blank" rel="noopener noreferrer" className="linkVideo">Ver video</a>
            </div>
          </div>

          <div className="logroItem">
            <div className="numeroDestacado">20</div>
            <div className="textoLogro">
              <strong>Universidades</strong><br />
              públicas y privadas de distintas provincias de la Argentina participan por medio de sus alumnos en el programa radial y en los distintos proyectos que realizamos.<br />
              <a href="https://www.youtube.com/watch?v=1XlorMImfRs" target="_blank" rel="noopener noreferrer" className="linkVideo">Ver video</a>
            </div>
          </div>

          <div className="logroItem">
            <div className="numeroDestacado">50</div>
            <div className="textoLogro">
              <strong>ONGs</strong><br />
              dedicadas a la educación, la inclusión laboral, la discapacidad, la inclusión social, el emprendedorismo, la oferta de capacitaciones son aliadas nuestras.
            </div>
          </div>

          <div className="logroItem">
            <div className="numeroDestacado">3</div>
            <div className="textoLogro">
              <strong>Automóviles</strong><br />
              último modelo, donamos a Escuelas Técnicas de Salta, Mendoza y San Miguel del Monte (Pcia. de Bs. As.) en alianza con GM, Citroën y Peugeot.
            </div>
          </div>

          <div className="logroItem">
            <div className="numeroDestacado">1.200</div>
            <div className="textoLogro">
              <strong>Jóvenes</strong><br />
              participaron en las Salidas Integradoras e Inclusivas (Cines Debate, Salidas al Teatro, Museos, Conciertos, Eventos solidarios, académicos, para el empleo, etc) con alumnos de 5to año del secundario, estudiantes universitarios y jóvenes profesionales de distintas realidades socioeconómicas, en forma gratuita gracias al apoyo de empresas.
            </div>
          </div>

          <div className="logroItem">
            <div className="numeroDestacado">15</div>
            <div className="textoLogro">
              <strong>Capacitaciones</strong><br />
              en Oratoria y Comunicación Corporal<br />
              <a href="https://www.youtube.com/watch?v=iK2jV5y_pyc" target="_blank" rel="noopener noreferrer" className="linkVideo">Ver video</a>
            </div>
          </div>

          <div className="logroItem">
            <div className="numeroDestacado">2.200</div>
            <div className="textoLogro">
              <strong>Niños y niñas</strong><br />
              que nunca fueron al cine, participaron en las Funciones Solidarias de Cine Debate de Metegol (desde los valores con el Equipo que hizo la película) gracias a J. J. Campanella y empresas.<br />
              <a href="https://www.youtube.com/watch?v=wOeZ9pgnWAU" target="_blank" rel="noopener noreferrer" className="linkVideo">Ver video</a>
            </div>
          </div>

          <div className="logroItem">
            <div className="numeroDestacado">10</div>
            <div className="textoLogro">
              <strong>Encuentros Nacionales</strong><br />
              de Jóvenes Líderes, participaron 100 jóvenes que son primeros estudiantes universitarios de sus familias, de 16 provincias de Argentina con el apoyo del Departamento de Estado de EEUU, su embajada en Argentina, la Fundación Konrad Adenauer y en alianza con empresas y ONGs<br />
              <a href="https://www.youtube.com/watch?v=DaiK9izexZo" target="_blank" rel="noopener noreferrer" className="linkVideo">Ver video</a>
            </div>
          </div>

          <div className="logroItem">
            <div className="numeroDestacado">150</div>
            <div className="textoLogro">
              <strong>Plantación de árboles</strong><br />
              frutales en Escuelas y ONGs de distintos rincones de Argentina, liderados por 25 jóvenes líderes (que son los primeros universitarios de sus familias) para inspirar a alumnos secundarios. Ya se plantaron 57 en La Pampa, en Florencio Varela, y San Miguel, Pcia. De Bs. As. y Misiones.
            </div>
          </div>

          <div className="logroItem">
            <div className="numeroDestacado">150</div>
            <div className="textoLogro">
              <strong>Niños y niñas</strong><br />
              que viven en Hogares, por causas de abandono familiar, se les ha festejado su Cumpleaños con los voluntarios de Jóvenes en Acción desde 2022<br />
              <a href="https://www.instagram.com/reel/C7kkPX1v8dr" target="_blank" rel="noopener noreferrer" className="linkVideo">Ver video</a>
            </div>
          </div>
        </div>
      </div>

      <hr className="separadorSeccion" />

      {/* SEGUNDO BLOQUE - PRENSA Y PREMIOS */}
      <div className="prensaSection">
        <h1 className="texto tituloH1">PRENSA Y PREMIOS</h1>

        {/* Sección de Prensa */}
        <div className="prensaSubsection">
          <h2 className="texto tituloH2">Artículos de Prensa</h2>
          
          {/* Artículo CONSUDEC Destacado */}
          <div className="articuloDestacadoPrincipal">
            <div className="etiquetaDestacadoPrincipal">ARTÍCULO DESTACADO</div>
            <a href="https://consudec.org/wp/revistas/#ago25_1" target="_blank" rel="noopener noreferrer" className="enlaceArticuloDestacado">
              Jóvenes en Acción - Revista CONSUDEC - Agosto 2025
            </a>
            <p className="descripcionDestacada">
              Artículo especial sobre el impacto y la trayectoria de Jóvenes en Acción publicado en la prestigiosa revista de CONSUDEC (Consejo Superior de Educación Católica).
            </p>
            <div className="iconoRevista">📖</div>
          </div>
          
          <div className="articulosLista">
            <div className="articuloItem">
              <a href="https://aica.org/noticia-jovenes-en-accion-celebro-25-anos-en-el-desarrollo-de-valores-para-brindar-oportunidades" target="_blank" rel="noopener noreferrer" className="enlaceArticulo">
                Jóvenes en Acción celebró 25 años en el desarrollo de valores para brindar oportunidades - AICA.org
              </a>
              <span className="fechaArticulo">17 de octubre de 2022</span>
            </div>

            <div className="articuloItem">
              <a href="https://www.lanacion.com.ar/comunidad/noticias-del-mundo-social-nid2081739" target="_blank" rel="noopener noreferrer" className="enlaceArticulo"> Noticias del mundo social</a>
              <span className="fechaArticulo">13 de noviembre de 2017</span>
            </div>

            <div className="articuloItem">
              <a href="https://www.lanacion.com.ar/sociedad/capacitacion-para-jovenes-del-interior-del-pais-nid1665941/" target="_blank" rel="noopener noreferrer" className="enlaceArticulo">
                Capacitación para jóvenes del interior del país - LA NACIÓN
              </a>
              <span className="fechaArticulo">21 de febrero de 2014</span>
            </div>

            <div className="articuloItem">
              <a href="https://www.lanacion.com.ar/comunidad/que-paso-este-mes-en-el-sector-social-nid1559433/" target="_blank" rel="noopener noreferrer" className="enlaceArticulo">
                Qué pasó este mes en el sector social - LA NACIÓN
              </a>
              <span className="fechaArticulo">2 de marzo de 2013</span>
            </div>

            <div className="articuloItem ">{/*destacado*/}
              <a href="https://www.lanacion.com.ar/comunidad/la-voz-de-los-invisibles-nid1361797" target="_blank" rel="noopener noreferrer" className="enlaceArticulo"> La voz de los invisibles - LA NACIÓN</a>
              <span className="fechaArticulo">2 de abril de 2011</span>
              {/*<span className="etiquetaDestacado">DESTACADO</span>*/}
            </div>

            <div className="articuloItem">
              <a href="https://www.lanacion.com.ar/cultura/distinguen-los-valores-solidarios-en-medios-de-comunicacion-nid957951" target="_blank" rel="noopener noreferrer" className="enlaceArticulo"> Distinguen los valores solidarios en medios de comunicación </a>
              <span className="fechaArticulo">31 de octubre de 2007</span>
            </div>

            <div className="articuloItem">
              <a href="https://www.lanacion.com.ar/espectaculos/radio/la-cultura-tambien-se-hace-oir-nid696742" target="_blank" rel="noopener noreferrer" className="enlaceArticulo">La cultura también se hace oír - LA NACIÓN</a>
              <span className="fechaArticulo">17 de abril de 2005</span>
            </div>

            <div className="articuloItem">
              <a href="https://www.lanacion.com.ar/espectaculos/veinte-minutos-de-aire-nid602936" target="_blank" rel="noopener noreferrer" className="enlaceArticulo">Veinte minutos de aire</a>
              <span className="fechaArticulo">21 de mayo de 2004</span>
            </div>
          </div>
        </div>

        {/* Sección de Premios */}
        <div className="premiosSubsection">
          <h2 className="texto tituloH2">Premios y Reconocimientos</h2>
          
          <div className="premiosLista">
            <div className="premioItem">
              <div className="premioIcono">🏆</div>
              <div className="premioContenido">
                <h3 className="premioTitulo">Premio Santa Clara de Asís (2001)</h3>
                <p className="premioDescripcion">
                  📍 Otorgado por la Liga de Madres de Familia<br />
                  Reconocimiento a Jóvenes en Acción por {" "}
                  <a 
                    href="/Estatuilla-Santa-Clara-Asis.jpeg" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 underline font-semibold hover:text-blue-700"
                  >
                    [ver diploma]
                  </a>
                </p>
              </div>
              
              {/* CONTENEDOR DE IMÁGENES: 'flex-col' para celu, 'md:flex-row' para PC */}
              <div className="premioImagenes flex flex-col md:flex-row gap-4 mt-4">
                
                {/* Primera Imagen: Entrega */}
                <a href={santaClaraImg.src} target="_blank" rel="noopener noreferrer" className="cursor-zoom-in block">
                  <Image 
                    src={santaClaraImg} 
                    alt="Premio Santa Clara de Asís - Ceremonia de entrega" 
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
                    alt="Alumnos Santa Clara de Asís" 
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
                <h3 className="premioTitulo">Reconocimiento de la Embajada de Estados Unidos (2001)</h3>
                <p className="premioDescripcion">
                  📍 Embajadora Vilma S. Martinez – Proyecto PLIMIC<br />
                  📜 Entrega de diploma y agasajo en la sede diplomática<br />
                  El Proyecto PLIMIC (Programa de Liderazgo Inclusivo, Multimedial y Cultural) fue financiado por el Departamento de Estado de EEUU y supervisado por la Embajada. Jóvenes en Acción recibió un diploma en reconocimiento a su labor.
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
        <h2 className="texto tituloH2">La voz de los chicos comprometidos</h2>
        <div className="cajaTipoRevista">
          <p className="texto parrafo">
            Su sueño era mostrar esa juventud que tan poca prensa tenía. Esa que
            estudia y trabaja por los otros, que critica y que piensa cómo se
            pueden hacer mejor las cosas. Hoy, el sueño de Carmen Sicardi cumplió
            diez años: el programa radial Jóvenes en acción dio voz a los temas
            que interesan y preocupan a los adolescentes. En estos diez años,
            pasaron por el programa 4600 chicos de más de 70 colegios. Desde el
            principio apunté a que fuera hecho por jóvenes de todas las
            realidades, explica.
            <br />
            <br />
            Carmen tenía 18 años la primera vez que se planteó hacer algo con los
            jóvenes. Desde los 16 era voluntaria de Cáritas y veía que había una
            juventud sana que no aparecía en los medios de comunicación. Era
            injusto que sólo apareciera la otra imagen, cuenta. Estudió Trabajo
            Social y se sumergió en la problemática de la niñez en riesgo. Trabajó
            en un juzgado de familia, en la Comisión Arquidiocesana de Minoridad y
            en la asociación Anidar, que se ocupa del tema adopción. Hace 15 años
            empecé como columnista en un programa que se levantó y armé el mío:
            Asignatura pendiente , dice. Después llegaría la propuesta de crear un
            programa para estudiantes secundarios.
            <br />
            <br />
            La metodología es la siguiente: los chicos eligen un tema, lo
            investigan, hacen entrevistas y plantean conclusiones y propuestas. La
            idea no es que vengan a lamentarse, sino que asuman el desafío de
            pensar cuáles son los cambios que se deben implementar, agrega. El
            objetivo es que desarrollen su conciencia ciudadana y cívica, además
            de ser capaces de ejercer una autocrítica y de buscar qué recursos hay
            para ofrecer ayuda.
            <br />
            <br />
            El programa va los jueves, de 20 a 21, por Radio Cultura FM 97.9. Más
            allá de la investigación que sale al aire, la producción del programa
            implica un rico debate previo y un trabajo en equipo. La propuesta es
            que sea un aprendizaje de vida, un análisis constructivo y un aporte
            de los chicos, desde su visión y su lenguaje, a la sociedad, considera
            Carmen.
            <br />
            <br />
            Los temas que se desgranan en el programa sirven para poner el foco en
            lo que preocupa a los jóvenes: drogas, accidentes de tránsito, trabajo
            infantil, violencia. El 80% de las temáticas que eligen es social.
            <br />
            <br />
            No quiere olvidarse: El programa no existiría sin el inicial y
            constante apoyo de Carmen de Estrada, que sugirió realizar un programa
            de radio con chicos; del doctor Alberto Olivero, rector del San
            Tarsicio, que dijo sí al proyecto, y del doctor Pedro Simoncini,
            asesor del programa.
            <br />
            <br />
            Chicos internados en un instituto penal de La Plata, adolescentes con
            capacidades diferentes y jóvenes que se estaban rehabilitando de su
            adicción tomaron presencia en el espacio.
            <br />
            <br />
            El gran desafío del programa es llegar más lejos: pasaron por el aire
            de la radio jóvenes de 11 provincias. El otro sueño es que
            www.jovenesenaccion.net sea un sitio de referencia para todos los
            jóvenes que buscan crecer y desarrollarse, con valores y compromiso,
            se sincera Carmen. Por eso en el acto por el aniversario, el programa
            premió al Grupo de Jóvenes ProVida.
            <br />
            <br />
            El efecto va más allá de la radio. Los estudiantes que ganaron el
            primer concurso literario ¿Qué país queremos tener los jóvenes?
            eligieron escuelas de Chaco, Mendoza, Jujuy, Santiago del Estero y la
            Capital que recibirán libros y material de estudio, que viaja con la
            Fundación Andreani. Para que Jóvenes en acción se abra cada vez más
            necesitamos contar con el apoyo de empresas, ya que es muy difícil
            sostener el programa, reconoce Carmen. Para contactarse:
            correodejovenes@yahoo.com.ar
            <br />
            <br />
            El programa radial Jóvenes en acción cumplió diez años y sigue
            creciendo.
            <br />
            <br />
            Participar del programa te deja un aprendizaje muy profundo como
            persona, dice Jorge Sagrero, un joven que participó cuando estudiaba
            en una escuela de Villa Lugano y hoy está a un final de terminar la
            carrera de Periodismo. Lo que hace este espacio es brindar
            oportunidades para todos, es integrar, es reconocer y aceptar al otro,
            con sus virtudes y limitaciones, asegura Valeria Donati, coordinadora
            de la Escuela de Educación Especial Nuestra Luz, de Olivos.
          </p>
          <Image className="imagenPrensaPrimera" src={afiche} alt="imagen" />
        </div>
        <h4 className="texto">
          Por Cynthia Palacios<br></br>FUENTE: Redacción de LA NACION
        </h4>
        <hr></hr>

        <h2 className="texto tituloH2">Jóvenes en acción en Canal 7</h2>
        <p className="texto parrafo">
          El Sábado 28 de Junio de 2008 a las 21.15 hs volvió Víctor Hugo Morales
          a presentar por Canal 7, nuevos Protagonistas de La Segunda Argentina.
          En esta edición, alumnos del Colegio E.M.E.M Nº1 Distrito Escolar Nº 13,
          VILLA LUGANO participantes del programa radial Jóvenes en acción, tratan
          el tema de la violencia y la discriminación, algo con lo cual tienen que
          convivir mientras se esfuerzan por estudiar y trabajar y, en algunos
          casos de madres solteras, cuidar también de sus hijos.
          <br />
          <br />
          Participó también Carmen Sicardi, Directora del Programa Jóvenes en
          Acción y algunos de los jóvenes ganadores del 1er Concurso Literario de
          JOVENES EN ACCION sobre el tema ¿Qué país queremos tener los jóvenes?
          <br />
          <br />
          En la parte final del programa, chicos con capacidades especiales
          pertenecientes a la Escuela NUESTRA LUZ tuvieron a su cargo la parte más
          emotiva del programa cuando interpretan una canción creada por ellos
          cuyo tema es en contra de la violencia y que idearon especialmente para
          el programa radial que realizaron.
          <br />
          <br />
          El mensaje que trajeron los chicos al programa es que quieren decir
          basta de violencia en todas sus manifestaciones y propuestas para
          construir un país mejor.
          <br />
          <br />
          Como en todos los programas al final del mismo todos los participantes
          recibieron un pasaporte que los acredita como ciudadanos de La Segunda
          Argentina y que tiene como propósito invitarlos a conocer el Monumento
          Nacional a la Bandera, en Rosario, que fue construido simbolizando a la
          Patria como una nave imaginaria viajando hacia su destino de grandeza.
        </p>
      </div>
    </div>
  );
}
