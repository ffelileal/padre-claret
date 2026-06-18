"use client";

import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ["inicio", "complejo", "grietas", "filtraciones", "instalaciones", "clima", "presupuesto", "documentacion", "ubicacion"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom >= 180) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "inicio", label: "Inicio" },
    { id: "complejo", label: "Complejo" },
    { id: "grietas", label: "Grietas" },
    { id: "filtraciones", label: "Filtraciones" },
    { id: "instalaciones", label: "Instalaciones" },
    { id: "clima", label: "Clima" },
    { id: "presupuesto", label: "Presupuesto" },
    { id: "documentacion", label: "Documentos" },
    { id: "ubicacion", label: "Ubicación" },
  ];

  const handleLinkClick = (id: string) => {
    setMenuIsOpen(false);
    // Smooth scroll is handled natively by browser CSS, but this updates hash
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled || menuIsOpen
            ? "bg-white/90 backdrop-blur-md py-4 shadow-sm border-b border-zinc-100"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="font-extrabold text-zinc-950 tracking-widest text-sm uppercase">
              Padre Claret
            </span>
            <span className="text-[9px] text-zinc-400 font-bold tracking-widest uppercase border-l border-zinc-200 pl-3">
              Registro Fáctico
            </span>
          </div>
          
          {/* Desktop Navigation Menu */}
          <div className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`text-xs font-bold tracking-widest uppercase transition-all duration-300 relative py-1 ${
                  activeSection === link.id
                    ? "text-zinc-950"
                    : "text-zinc-400 hover:text-zinc-900"
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-950 rounded-full" />
                )}
              </a>
            ))}
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMenuIsOpen(!menuIsOpen)}
            className="flex lg:hidden flex-col justify-center items-center w-10 h-10 gap-1.5 focus:outline-none z-50 cursor-pointer"
            aria-label={menuIsOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <span
              className={`h-0.5 w-6 bg-zinc-950 rounded-full transition-transform duration-300 ${
                menuIsOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-zinc-950 rounded-full transition-opacity duration-300 ${
                menuIsOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-zinc-950 rounded-full transition-transform duration-300 ${
                menuIsOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Fullscreen Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 bg-white/95 backdrop-blur-lg z-30 transition-all duration-500 lg:hidden flex flex-col justify-center px-12 ${
          menuIsOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <div className="space-y-6 flex flex-col items-start pt-16">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`text-2xl font-black uppercase tracking-tight text-left cursor-pointer transition-colors ${
                activeSection === link.id ? "text-zinc-950" : "text-zinc-400"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
        <div className="absolute bottom-12 left-12 space-y-2">
          <span className="text-[10px] font-extrabold tracking-widest text-zinc-400 uppercase block">
            Ubicación del Complejo
          </span>
          <p className="text-xs text-zinc-600 font-light">
            Av. Padre Claret 4851, Córdoba, Argentina
          </p>
        </div>
      </div>
    </>
  );
}
