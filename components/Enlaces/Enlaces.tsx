"use client";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { useText } from "@/hooks/useContent";

export default function Enlaces() {
  const socialTitle = useText('footer_social_title', 'Síguenos en nuestras redes sociales');
  
  return (
    <div className="flex flex-col items-center space-y-4 mb-6 w-screen h-50">
      <h3 className="text-xl font-semibold text-white">
        {socialTitle}
      </h3>
      <div className="flex space-x-6">
        <a
          href="https://facebook.com/radio.jovenesenaccion"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FaFacebook className="text-4xl text-white hover:text-cyan-200" />
        </a>
        <a
          href="https://instagram.com/jovenes.enaccion"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <FaInstagram className="text-4xl text-white hover:text-gray-100" />
        </a>
        <a
          href="https://youtube.com/@jenaccionmultimedial"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="YouTube"
        >
          <FaYoutube className="text-4xl text-white hover:text-gray-100" />
        </a>
      </div>
    </div>
  );
}
