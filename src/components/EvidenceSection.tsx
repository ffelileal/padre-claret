"use client";

import React, { useState } from "react";
import evidenceData from "../../data/evidence.json";
import Lightbox from "./Lightbox";

export default function EvidenceSection() {
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [activeImageSet, setActiveImageSet] = useState<string[]>([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const openLightbox = (images: string[], index: number) => {
    setActiveImageSet(images);
    setActiveImageIndex(index);
    setLightboxIsOpen(true);
  };

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev + 1) % activeImageSet.length);
  };

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev - 1 + activeImageSet.length) % activeImageSet.length);
  };

  // Group evidence by category type
  const cracksEvidence = evidenceData.filter((item) => item.category === "Fachadas");
  const leaksEvidence = evidenceData.filter(
    (item) => item.category === "Interiores" || item.category === "Áreas Comunes"
  );
  const installationsEvidence = evidenceData.filter((item) => item.category === "Instalaciones");

  const renderIncidentBlock = (incident: typeof evidenceData[0]) => {
    const hasImages = incident.images && incident.images.length > 0;
    
    return (
      <div key={incident.id} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        
        {/* Massive Image Container (Protagonist - 70-75% weight) */}
        <div className="lg:col-span-9 space-y-4">
          {hasImages ? (
            <div className="space-y-4">
              <div
                onClick={() => openLightbox(incident.images, 0)}
                className="relative aspect-[16/9] w-full bg-zinc-50 rounded-2xl overflow-hidden group cursor-zoom-in border border-zinc-150 hover:shadow-md transition-all duration-300"
              >
                <img
                  src={incident.images[0]}
                  alt={`${incident.title} - Imagen Principal`}
                  className="w-full h-full object-contain p-4 group-hover:scale-[1.01] transition-transform duration-700 ease-out select-none"
                />
                <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/[0.02] transition-colors" />
                <div className="absolute bottom-4 right-4 bg-zinc-950/90 text-white text-[10px] tracking-widest uppercase font-semibold px-4 py-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Ver en Pantalla Completa
                </div>
              </div>

              {/* Optional thumbnails row */}
              {incident.images.length > 1 && (
                <div className="flex gap-4">
                  {incident.images.slice(1).map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => openLightbox(incident.images, idx + 1)}
                      className="w-24 sm:w-32 aspect-[4/3] bg-zinc-50 rounded-xl overflow-hidden border border-zinc-200 cursor-zoom-in hover:border-zinc-400 transition-colors"
                    >
                      <img
                        src={img}
                        alt={`Miniatura ${idx + 2}`}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="aspect-[16/9] w-full bg-zinc-50 rounded-2xl border border-dashed border-zinc-200 flex flex-col items-center justify-center p-8 text-center">
              <svg className="w-12 h-12 text-zinc-300 mb-3" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375 0 11-.75 0 .375 0 01.75 0z" />
              </svg>
              <span className="text-sm text-zinc-400 font-light">Sin registro fotográfico disponible</span>
            </div>
          )}
        </div>

        {/* Descriptive Column (Secondary text - 25-30% weight) */}
        <div className="lg:col-span-3 space-y-6 self-start lg:sticky lg:top-24">
          <div className="space-y-2">
            <span className="text-[10px] font-extrabold tracking-widest text-zinc-400 uppercase block">
              Registro: {incident.date}
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-950 leading-tight">
              {incident.title}
            </h3>
          </div>

          <div className="space-y-4 text-zinc-600 text-sm sm:text-base leading-relaxed font-light">
            <p>{incident.description}</p>
          </div>

          {incident.observations && (
            <div className="pt-6 border-t border-zinc-150">
              <h4 className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-2">
                Observación Fáctica
              </h4>
              <p className="text-xs sm:text-sm text-zinc-500 italic leading-relaxed font-light">
                &ldquo;{incident.observations}&rdquo;
              </p>
            </div>
          )}
        </div>

      </div>
    );
  };

  return (
    <div className="space-y-0 max-w-[1440px] mx-auto px-6 sm:px-12 md:px-16">
      
      {/* SECTION 1: Grietas Observadas */}
      <section id="grietas" className="py-16 border-t border-zinc-150">
        <div className="mb-14 pb-4 border-b border-zinc-100">
          <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Sección Visual 01</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 uppercase mt-1">
            Grietas Observadas
          </h2>
        </div>
        
        <div className="space-y-24">
          {cracksEvidence.map(renderIncidentBlock)}
        </div>
      </section>

      {/* SECTION 2: Filtraciones Pluviales */}
      <section id="filtraciones" className="py-16 border-t border-zinc-150">
        <div className="mb-14 pb-4 border-b border-zinc-100">
          <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Sección Visual 02</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 uppercase mt-1">
            Filtraciones Pluviales
          </h2>
        </div>
        
        <div className="space-y-24">
          {leaksEvidence.map(renderIncidentBlock)}
        </div>
      </section>

      {/* SECTION 3: Instalaciones de Cañerías */}
      {installationsEvidence.length > 0 && (
        <section id="instalaciones" className="py-16 border-t border-zinc-150">
          <div className="mb-14 pb-4 border-b border-zinc-100">
            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">Sección Visual 03</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 uppercase mt-1">
              Instalaciones de Cañerías
            </h2>
          </div>
          
          <div className="space-y-24">
            {installationsEvidence.map(renderIncidentBlock)}
          </div>
        </section>
      )}

      <Lightbox
        images={activeImageSet}
        currentIndex={activeImageIndex}
        isOpen={lightboxIsOpen}
        onClose={() => setLightboxIsOpen(false)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}
