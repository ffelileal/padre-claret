"use client";

import React, { useState } from "react";
import evidenceData from "../../data/evidence.json";
import Lightbox from "./Lightbox";

interface IncidentCarouselProps {
  images: string[];
  title: string;
  onImageClick: (index: number) => void;
}

function IncidentCarousel({ images, title, onImageClick }: IncidentCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative aspect-[16/9] w-full bg-zinc-50 rounded-2xl overflow-hidden group border border-zinc-150 hover:shadow-md transition-all duration-300">
      
      {/* Slides Container */}
      <div 
        className="w-full h-full flex transition-transform duration-500 ease-out cursor-zoom-in"
        style={{ transform: `translate3d(-${currentSlide * 100}%, 0, 0)` }}
        onClick={() => onImageClick(currentSlide)}
      >
        {images.map((img, idx) => (
          <div key={idx} className="w-full h-full flex-shrink-0 relative">
            <img
              src={img}
              alt={`${title} - Imagen ${idx + 1}`}
              className="w-full h-full object-contain p-4 select-none"
            />
          </div>
        ))}
      </div>

      {/* Vignette background for controls */}
      <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/[0.01] pointer-events-none transition-colors" />

      {/* Navigation Arrows - Visible on hover on desktop, always visible on mobile */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-zinc-950 p-2.5 rounded-full shadow-md backdrop-blur-sm transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100 flex items-center justify-center cursor-pointer z-10 hover:scale-105"
            aria-label="Imagen anterior"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-zinc-950 p-2.5 rounded-full shadow-md backdrop-blur-sm transition-all duration-300 lg:opacity-0 lg:group-hover:opacity-100 flex items-center justify-center cursor-pointer z-10 hover:scale-105"
            aria-label="Imagen siguiente"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Bottom Center Indicator Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 bg-black/20 backdrop-blur-[2px] px-3 py-1.5 rounded-full border border-white/5">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(idx);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                currentSlide === idx ? "bg-white scale-125 w-3" : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Ir a imagen ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Zoom hint */}
      <div className="absolute bottom-4 right-4 bg-zinc-950/90 text-white text-[10px] tracking-widest uppercase font-semibold px-4 py-2 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Ver en Pantalla Completa
      </div>
    </div>
  );
}

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
        
        {/* Massive Image Carousel Container (Protagonist - 70-75% weight) */}
        <div className="lg:col-span-9">
          {hasImages ? (
            <IncidentCarousel
              images={incident.images}
              title={incident.title}
              onImageClick={(index) => openLightbox(incident.images, index)}
            />
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

          <div className="space-y-4 text-zinc-650 text-sm sm:text-base leading-relaxed font-light">
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
