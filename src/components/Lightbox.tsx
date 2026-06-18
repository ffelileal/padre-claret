"use client";

import React, { useEffect } from "react";

interface LightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };

    // Lock body scroll
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm select-none">
      
      {/* Background click listener */}
      <div className="absolute inset-0 cursor-zoom-out" onClick={onClose} />

      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 text-white/70 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/10"
        aria-label="Cerrar vista"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Navigation - Prev Button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 z-50 p-2 text-white/70 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/10"
          aria-label="Imagen anterior"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Image Container */}
      <div className="relative max-w-5xl max-h-[85vh] mx-4 z-40 flex flex-col items-center">
        <img
          src={images[currentIndex]}
          alt={`Evidencia ampliada ${currentIndex + 1}`}
          className="max-w-full max-h-[80vh] object-contain rounded border border-white/10 shadow-2xl transition-transform duration-300"
          onClick={(e) => e.stopPropagation()} // Prevents closing when clicking image
        />
        
        {/* Caption/Counter */}
        <div className="mt-4 px-3 py-1 text-xs text-white/60 bg-black/40 rounded-full border border-white/5">
          {currentIndex + 1} / {images.length} — {images[currentIndex].split("/").pop()}
        </div>
      </div>

      {/* Navigation - Next Button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 z-50 p-2 text-white/70 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/10"
          aria-label="Imagen siguiente"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
