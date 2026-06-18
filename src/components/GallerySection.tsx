"use client";

import React, { useState } from "react";
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

  // Compile the database of photos, excluding foto_26 (deleted) and foto_20, 21, 22 (moved exclusively to cañerías)
  const galleryItems: GalleryItem[] = Array.from({ length: 26 }, (_, i) => {
    const id = i + 1;
    const url = `/images/foto_${id}.jpg`;
    
    let category: "General" | "Grietas" | "Filtraciones" = "General";
    let title = `Registro Fotográfico ${id}`;
    let description = "Evidencia visual fáctica registrada en el complejo Padre Claret.";
    
    if (id >= 4 && id <= 10) {
      category = "Grietas";
      title = `Registro de Grieta ${id}`;
      description = "Fisuras visibles en muros y revestimientos del complejo.";
    } else if (id >= 11 && id <= 21) {
      category = "Filtraciones";
      title = `Registro de Filtración ${id}`;
      description = "Registro de filtración y escurrimientos pluviales observados.";
    } else {
      category = "General";
      title = `Vista General del Complejo ${id}`;
      description = "Áreas comunes, calzadas y sectores del complejo.";
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

  const filters: ("Todos" | "General" | "Grietas" | "Filtraciones")[] = [
    "Todos",
    "General",
    "Grietas",
    "Filtraciones",
  ];

  return (
    <section id="galeria" className="py-16 bg-zinc-50 border-t border-b border-zinc-150 px-6 sm:px-12 md:px-16">
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
              Mosaico completo de las evidencias fotográficas del complejo (excluyendo registros de cañerías).
            </p>
          </div>

          {/* Minimalist Filter Toggles */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-xs font-bold tracking-widest uppercase rounded-full transition-all cursor-pointer ${
                  filter === f
                    ? "bg-zinc-950 text-white shadow-sm"
                    : "bg-white text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 border border-zinc-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Layout Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              onClick={() => openLightbox(index)}
              className="break-inside-avoid bg-white border border-zinc-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group cursor-zoom-in flex flex-col justify-between mb-8"
            >
              <div className={`relative ${item.aspectRatio} w-full bg-white flex items-center justify-center p-4 border-b border-zinc-100`}>
                <img
                  src={item.url}
                  alt={item.title}
                  className="max-h-full max-w-full object-contain group-hover:scale-[1.02] transition-transform duration-500 ease-out select-none"
                />
                <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/[0.02] transition-colors duration-300" />
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
