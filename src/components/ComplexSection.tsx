"use client";

import React, { useState } from "react";
import projectData from "../../data/project.json";
import Lightbox from "./Lightbox";

export default function ComplexSection() {
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const images = ["/images/foto_2.jpg", "/images/foto_3.jpg"];

  const openLightbox = (idx: number) => {
    setActiveIndex(idx);
    setLightboxIsOpen(true);
  };

  return (
    <section id="complejo" className="bg-white py-16 px-6 sm:px-12 md:px-16 max-w-[1440px] mx-auto border-t border-zinc-100">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Editorial Text Block */}
        <div className="lg:col-span-4 space-y-6">
          <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase block">
            El Complejo
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 leading-tight">
            REGISTRO GENERAL
          </h2>
          <p className="text-zinc-650 text-sm sm:text-base leading-relaxed font-light">
            El complejo consta de 4 viviendas familiares sobre la Avenida Padre Claret. 
            Esta página web funciona como un archivo de fotos y documentos para registrar de manera clara y objetiva el estado de la propiedad.
          </p>
          <div className="pt-4 border-t border-zinc-100">
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest block font-bold">Ubicación</span>
            <span className="text-xs text-zinc-700 font-semibold">{projectData.location}</span>
          </div>
        </div>

        {/* Large Layout Map & Photo */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div
              onClick={() => openLightbox(0)}
              className="relative aspect-[4/3] w-full bg-zinc-50 rounded-2xl overflow-hidden group border border-zinc-150 cursor-zoom-in hover:shadow-sm transition-shadow duration-300"
            >
              <img
                src={images[0]}
                alt="Vista del complejo foto 2"
                className="w-full h-full object-cover select-none"
              />
              <div className="absolute bottom-4 right-4 bg-zinc-950/90 text-white text-[10px] tracking-wider uppercase font-semibold px-3.5 py-1.5 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Ver en Grande
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 font-light italic px-2">
              Registro general de áreas exteriores del complejo.
            </p>
          </div>

          <div className="space-y-3">
            <div
              onClick={() => openLightbox(1)}
              className="relative aspect-[4/3] w-full bg-zinc-50 rounded-2xl overflow-hidden group border border-zinc-150 cursor-zoom-in hover:shadow-sm transition-shadow duration-300"
            >
              <img
                src={images[1]}
                alt="Vista del complejo foto 3"
                className="w-full h-full object-cover select-none"
              />
              <div className="absolute bottom-4 right-4 bg-zinc-950/90 text-white text-[10px] tracking-wider uppercase font-semibold px-3.5 py-1.5 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Ver en Grande
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 font-light italic px-2">
              Registro general de circulaciones comunes.
            </p>
          </div>
        </div>

      </div>

      <Lightbox
        images={images}
        currentIndex={activeIndex}
        isOpen={lightboxIsOpen}
        onClose={() => setLightboxIsOpen(false)}
        onNext={() => setActiveIndex((prev) => (prev + 1) % images.length)}
        onPrev={() => setActiveIndex((prev) => (prev - 1 + images.length) % images.length)}
      />
    </section>
  );
}
