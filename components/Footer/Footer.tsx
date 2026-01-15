//import Image from "next/image";
//import AxionLogo from "../../public/AxionLogo.png";
import Enlaces from "../Enlaces/Enlaces";

export default function Footer() {
  return (
    <div className="w-full h-1/3 flex flex-col bg-gradient-to-r from-cyan-700 to-customCyan ">
      <div className="w-full h-1 bg-white mt-2 mb-2 border-r-1"></div>
      <div className="w-full flex flex-row items-center justify-center ">
        {/*
        <p className="text-center select-none text-white mr-2 font-bold h-full">
          Con el apoyo de
        </p>
        <Image
          src={AxionLogo}
          width={640 / 1.5}
          height={312 / 1.5}
          alt="AxionLogo"
          className="items-center justify-center flex"
        />
        <p className="text-center select-none font-bold text-white mt-28">
          Patrocinador oficial de Jóvenes en Acción
        </p>

        TODO: poner los sponsors

          */} 
      </div>

      <div className="w-full h-1 bg-cyan-700 mt-2 mb-2 border-r-1"></div>

      <Enlaces />
      <div className="w-full h-0.5 bg-white mt-1 mb-0 border-r-1"></div>

      <div className="w-full pt-6">
        <h3 className="text-white text-center select-none font-light">
          <p className="text-xl">
            © 2026 Jóvenes en Acción. Todos los derechos reservados.
          </p>
        </h3>
      </div>
    </div>
  );
}
