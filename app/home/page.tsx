import Nosotros from "@/components/Nosotros/Nosotros";
import Carrusel from "../../components/Carrusel/Carrusel";
import Contactos from "@/components/Contactos/Contactos";

export default function HomePage() {
  return (
    <div className="w-full h-auto overflow-x-hidden">
      <div className="w-full h-auto overflow-x-hidden">
        <Carrusel />
      </div>
      <Nosotros />
      <Contactos />
    </div>
  );
}
