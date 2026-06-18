"use client";

import React, { useState, useRef } from "react";
import Lightbox from "./Lightbox";

interface GalleryItem {
  id: number;
  url: string;
  title: string;
  category: "General" | "Grietas" | "Filtraciones";
  description: string;
  aspectRatio: string;
}

export default function GallerySection() {
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<"Todos" | "General" | "Grietas" | "Filtraciones">("Todos");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Compile the database of photos, excluding foto_26 (deleted) and foto_20, 21, 22 (moved exclusively to cañerías)
  const galleryItems: GalleryItem[] = Array.from({ length: 26 }, (_, i) => {
    const id = i + 1;
    const url = `/images/foto_${id}.jpg`;
    
    let category: "General" | "Grietas" | "Filtraciones" = "General";
    let title = `Registro Fotográfico ${id}`;
    let description = "Evidencia visual registrada en el complejo.";
    
    if (id >= 4 && id <= 10) {
      category = "Grietas";
      title = `Registro de Grieta ${id}`;
      description = "Fisuras visibles en muros del complejo.";
    } else if (id >= 11 && id <= 21) {
      category = "Filtraciones";
      title = `Registro de Filtración ${id}`;
      description = "Registro de filtración y escurrimientos pluviales.";
    } else {
      category = "General";
      title = `Vista General ${id}`;
      description = "Áreas comunes y sectores generales del complejo.";
    }
    
    const aspectRatios = ["aspect-[4/3]", "aspect-[3/4]", "aspect-[16/10]", "aspect-[1/1]"];
    const aspectRatio = aspectRatios[i % aspectRatios.length];

    return { id, url, title, category, description, aspectRatio };
  }).filter(item => {
    // Exclude foto_26 (deleted) and foto_20, 21, 22 (assigned exclusively to cañerías section)
    return item.id !== 26 && item.id !== 20 && item.id !== 21 && item.id !== 22;
  });

  const filteredItems = filter === "Todos"
    ? galleryItems
    : galleryItems.filter((item) => item.category === filter);

  const imageUrls = filteredItems.map((item) => item.url);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxIsOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % imageUrls.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.firstElementChild?.getBoundingClientRect().width || 300;
      scrollRef.current.scrollBy({ left: -(itemWidth + 24), behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.firstElementChild?.getBoundingClientRect().width || 300;
      scrollRef.current.scrollBy({ left: (itemWidth + 24), behavior: "smooth" });
    }
  };

  const filters: ("Todos" | "General" | "Grietas" | "Filtraciones")[] = [
    "Todos",
    "General",
    "Grietas",
    "Filtraciones",
  ];

  return (
    <section id="galeria" className="py-16 bg-zinc-50 border-t border-b border-zinc-150 px-6 sm:px-12 md:px-16 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-b border-zinc-200/80 pb-6">
          <div>
            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
              Archivo Completo
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 mt-1 uppercase">
              Galería Principal
            </h2>
            <p className="text-zinc-500 mt-2 text-sm sm:text-base font-light">
              Deslizá para ver las evidencias fotográficas del complejo (excluyendo registros de cañerías).
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
            {/* Minimalist Filter Toggles */}
            <div className="flex gap-2 overflow-x-auto pb-2 flex-nowrap scrollbar-none -mx-6 px-6 sm:mx-0 sm:px-0">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-full transition-all cursor-pointer flex-shrink-0 ${
                    filter === f
                      ? "bg-zinc-950 text-white shadow-sm"
                      : "bg-white text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 border border-zinc-200"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Navigation Arrows for desktop/tablet */}
            <div className="hidden sm:flex items-center gap-2 border-l border-zinc-200 pl-4 py-1 flex-shrink-0">
              <button
                onClick={scrollLeft}
                className="p-2 bg-white hover:bg-zinc-100 text-zinc-800 rounded-full border border-zinc-200 transition-colors shadow-sm cursor-pointer hover:scale-105 active:scale-95"
                aria-label="Deslizar izquierda"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={scrollRight}
                className="p-2 bg-white hover:bg-zinc-100 text-zinc-800 rounded-full border border-zinc-200 transition-colors shadow-sm cursor-pointer hover:scale-105 active:scale-95"
                aria-label="Deslizar derecha"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Sliding Carousel Grid */}
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto pb-6 gap-6 scroll-smooth snap-x snap-mandatory scrollbar-none -mx-6 px-6 sm:mx-0 sm:px-0"
        >
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start bg-white border border-zinc-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group cursor-zoom-in flex flex-col justify-between"
            >
              <div className="relative aspect-[4/3] w-full bg-white flex items-center justify-center p-4 border-b border-zinc-100">
                <img
                  src={item.url}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-[1.01] transition-transform duration-500 ease-out select-none"
                />
                <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/[0.01] transition-colors duration-300" />
              </div>
              <div className="p-6 bg-white space-y-2">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="font-bold text-zinc-850 text-sm tracking-tight">
                    {item.title}
                  </h3>
                  <span className="text-[9px] font-bold text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded tracking-widest uppercase whitespace-nowrap">
                    {item.category}
                  </span>
                </div>
                <p className="text-zinc-500 text-xs leading-relaxed font-light">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        images={imageUrls}
        currentIndex={currentIndex}
        isOpen={lightboxIsOpen}
        onClose={() => setLightboxIsOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
}
