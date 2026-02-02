import Nosotros from "@/components/Nosotros/Nosotros";
import Carrusel from "../../components/Carrusel/Carrusel";

export default function HomePage() {
  return (
    <div className="w-full h-auto overflow-x-hidden">
      <div className="w-full h-auto overflow-x-hidden">
        <Carrusel />
      </div>
      <Nosotros />
    </div>
  );
}
