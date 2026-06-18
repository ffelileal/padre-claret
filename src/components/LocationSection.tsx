"use client";

import React from "react";
import projectData from "../../data/project.json";

export default function LocationSection() {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    projectData.location
  )}`;

  // Google Maps Classic Embed URL resolving address dynamically
  const embedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(projectData.location)}&t=&z=17&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="ubicacion" className="py-16 bg-zinc-50 border-t border-b border-zinc-150 px-6 sm:px-12 md:px-16">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 border-b border-zinc-200/60 pb-4">
          <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
            Geolocalización
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 mt-1 uppercase">
            Ubicación del Complejo
          </h2>
          <p className="text-zinc-500 mt-2 text-sm sm:text-base font-light">
            Detalle del emplazamiento físico del complejo residencial sobre Av. Padre Claret 4851 4851.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-stretch">
          
          {/* Details Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">
                  Dirección Oficial
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight leading-tight">
                  {projectData.location}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 font-light">
                  Ciudad de Córdoba, Provincia de Córdoba, República Argentina.
                </p>
              </div>

              <div className="pt-6 border-t border-zinc-200 space-y-4">
                <p className="text-xs sm:text-sm text-zinc-650 font-light leading-relaxed">
                  El complejo residencial se encuentra localizado en una zona de fácil conectividad y acceso directo sobre la avenida principal.
                </p>
              </div>
            </div>

            <div className="pt-4">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 bg-zinc-950 hover:bg-zinc-850 text-white text-xs font-bold tracking-widest uppercase py-3.5 px-6 rounded-full shadow-sm transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <span>Ver en Google Maps Grande</span>
              </a>
            </div>
          </div>

          {/* Interactive Map Iframe */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] w-full bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
              <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                title="Mapa de ubicación Complejo Padre Claret 4851"
              ></iframe>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
