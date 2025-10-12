"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/j-logo.svg";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Detectar si es dispositivo móvil
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const activeClass = isMobile 
    ? "text-cyan-300 font-bold border-b-2 border-cyan-300 pb-2" 
    : "border-l-2 border-white text-white font-bold";
  const defaultClass = isMobile 
    ? "text-white hover:text-cyan-300 transition-colors duration-300" 
    : "text-white hover:text-gray-300";

  const menuItems = [
    { href: "/home", id: "inicio", label: "INICIO" },
    { href: "/journalism", id: "conocenos-mas", label: "CONÓCENOS MÁS" },
    { href: "/news", id: "galeria", label: "GALERÍA" },
    { href: "/contact", id: "contacto", label: "CONTACTO" }
  ];

  return (
    <>
      <div className="w-full h-20 md:h-24">
        <nav className="w-full h-20 md:h-24 bg-customCyan flex justify-between items-center fixed z-50 border-b-2 border-cyan-800 px-4 md:px-16">
          {/* Logo */}
          <Link href={'/home'} id="home" className="h-full flex items-center py-2">
            <Image 
              className="h-full w-auto transition-all duration-300" 
              src={logo} 
              alt="logo"
              style={{ objectFit: 'contain' }}
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-end gap-2 lg:gap-4">
            {menuItems.map((item) => (
              <Link key={item.id} href={item.href}>
                <button
                  id={item.id}
                  className={`h-8 px-3 py-2 mx-2 lg:mx-4 my-1 font-bold transition-all duration-300 hover:scale-105 ${
                    pathname === item.href ? activeClass : defaultClass
                  }`}
                >
                  {item.label}
                </button>
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden z-60 p-2 rounded-lg hover:bg-cyan-700 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <div
                className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${
                  isMenuOpen ? 'rotate-45 translate-y-2.5' : 'translate-y-0'
                }`}
              />
              <div
                className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out translate-y-2.5 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <div
                className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${
                  isMenuOpen ? '-rotate-45 translate-y-2.5' : 'translate-y-5'
                }`}
              />
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-20 md:top-24 left-0 right-0 bg-customCyan z-40 md:hidden transform transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'translate-y-0 opacity-100' 
            : '-translate-y-full opacity-0'
        }`}
      >
        <div className="flex flex-col py-4 border-b-2 border-cyan-800">
          {menuItems.map((item, index) => (
            <Link key={item.id} href={item.href}>
              <button
                id={`mobile-${item.id}`}
                className={`w-full text-left px-6 py-4 text-lg transition-all duration-300 hover:bg-cyan-700 hover:pl-8 ${
                  pathname === item.href ? activeClass : defaultClass
                }`}
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <span className="inline-block transform transition-transform duration-300 hover:translate-x-2">
                  {item.label}
                </span>
              </button>
            </Link>
          ))}
          
          {/* Contact Info in Mobile Menu */}
          <div className="px-6 py-4 mt-4 border-t border-cyan-700">
            <p className="text-cyan-200 text-sm mb-2">Contáctanos:</p>
            <p className="text-white text-sm">📧 correodejovenes@yahoo.com.ar</p>
          </div>
        </div>
      </div>

      {/* Mobile Menu Animation Styles */}
      <style jsx>{`
        @keyframes slideInDown {
          from {
            transform: translate3d(0, -100%, 0);
            opacity: 0;
          }
          to {
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
        }

        @keyframes slideOutUp {
          from {
            transform: translate3d(0, 0, 0);
            opacity: 1;
          }
          to {
            transform: translate3d(0, -100%, 0);
            opacity: 0;
          }
        }

        .menu-enter {
          animation: slideInDown 0.3s ease-out;
        }

        .menu-exit {
          animation: slideOutUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Navbar;
