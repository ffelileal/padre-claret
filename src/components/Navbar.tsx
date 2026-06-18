"use client";

import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
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
        
        {/* Navigation Menu */}
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

        {/* Mobile menu - simplified dot-links */}
        <div className="flex lg:hidden space-x-3 items-center">
          {navLinks.slice(0, 6).map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`text-[9px] font-bold tracking-widest uppercase transition-colors ${
                activeSection === link.id ? "text-zinc-950" : "text-zinc-400"
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
