"use client";

import React from "react";
import projectData from "../../data/project.json";

export default function Hero() {
  return (
    <section id="inicio" className="min-h-[90vh] flex flex-col justify-between bg-white pt-28 pb-12 px-6 sm:px-12 md:px-16 max-w-[1440px] mx-auto">
      {/* Top typographic banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
        <div className="lg:col-span-8 space-y-3">
          <span className="text-xs font-extrabold tracking-widest text-zinc-400 uppercase block">
            Repositorio Visual
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-zinc-950 tracking-tighter leading-none uppercase">
            Padre Claret
          </h1>
          <p className="text-base sm:text-lg text-zinc-800 font-bold tracking-wide uppercase">
            Registro Fotográfico y Documental
          </p>
          <p className="text-xs sm:text-sm text-zinc-400 font-mono tracking-widest uppercase">
            Av. Padre Claret &bull; Córdoba &bull; Argentina
          </p>
        </div>
      </div>

      {/* Hero Visual - Large Photographic Section */}
      <div className="mt-8 mb-4 relative h-[50vh] sm:h-[60vh] w-full bg-zinc-100 rounded-2xl overflow-hidden group select-none border border-zinc-200">
        <img
          src="/images/foto_1.jpg"
          alt="Vista de fachada del Complejo Padre Claret"
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.01]"
        />
        {/* Subtle vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/20 via-transparent to-transparent pointer-events-none" />
      </div>
      
      {/* Small credit */}
      <div className="text-right">
        <span className="text-[10px] text-zinc-400 font-mono">
          Registro Fotográfico del Complejo
        </span>
      </div>
    </section>
  );
}
