"use client";

import React from "react";
import climateData from "../../data/climate.json";

export default function ClimateSection() {
  return (
    <section id="clima" className="py-16 bg-white border-t border-b border-zinc-150 px-6 sm:px-12 md:px-16 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
        
        {/* Left Column: Atypical Rains Narrative and timeline */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
              Contexto Climatológico
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 uppercase leading-none">
              {climateData.title}
            </h2>
            <p className="text-zinc-650 text-sm sm:text-base leading-relaxed font-light">
              {climateData.description}
            </p>
          </div>

          {/* Intro description */}
          <p className="text-base text-zinc-800 font-semibold leading-relaxed">
            {climateData.introText}
          </p>

          {/* Atypical Events timeline */}
          <div className="space-y-6 pt-2">
            {climateData.atypicalEvents.map((event) => (
              <div 
                key={event.id} 
                className="pl-5 border-l-2 border-zinc-950 space-y-1 py-1"
              >
                <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
                  {event.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 font-light leading-relaxed">
                  {event.description}
                </p>
              </div>
            ))}
          </div>

          {/* List of News & Archive Links */}
          <div className="space-y-4 pt-6 border-t border-zinc-100">
            <h3 className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
              Enlaces y Reportes Oficiales
            </h3>
            <div className="space-y-4">
              {climateData.newsReports.map((report) => (
                <div 
                  key={report.id} 
                  className="py-3 border-b border-zinc-100 last:border-0 flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                >
                  <div className="space-y-1 max-w-xl">
                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block">
                      {report.source}
                    </span>
                    <h4 className="text-sm font-semibold text-zinc-800">
                      {report.title}
                    </h4>
                    <p className="text-xs text-zinc-500 font-light leading-relaxed">
                      {report.summary}
                    </p>
                  </div>
                  <a
                    href={report.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold tracking-widest uppercase text-zinc-950 hover:text-zinc-600 transition-colors whitespace-nowrap self-start border-b border-zinc-950 pb-0.5"
                  >
                    Ver Fuente
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Historical Rainfall Table (Typography-based) */}
        <div className="lg:col-span-5 space-y-6 lg:pl-8 lg:sticky lg:top-24">
          <div className="space-y-2">
            <span className="text-[10px] font-bold tracking-widest text-zinc-400 uppercase block">
              Valores Normales
            </span>
            <h3 className="text-xl font-bold tracking-tight text-zinc-950 uppercase">
              Promedio Histórico Mensual en Córdoba
            </h3>
            <p className="text-xs text-zinc-500 font-light leading-relaxed">
              Precipitación mensual normal acumulada en milímetros (mm). Sirve de referencia para constatar los excesos registrados durante los eventos atípicos.
            </p>
          </div>

          {/* Pure Typographic Data List */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4">
            {climateData.historicalAverages.map((item, idx) => (
              <div key={idx} className="border-b border-zinc-100 pb-3 flex justify-between items-baseline pr-4">
                <span className="text-xs text-zinc-500 font-medium font-mono uppercase">{item.month}</span>
                <span className="text-base font-bold text-zinc-800 font-mono">{item.rainfall} mm</span>
              </div>
            ))}
          </div>

          <div className="pt-4 text-[10px] text-zinc-400 font-light leading-relaxed">
            * Fuente de referencia histórica: Registros meteorológicos de la ciudad (Tiempo3 / Google Share). Los desvíos climatológicos atípicos de 2025 y 2026 superaron con creces estos registros históricos promedio.
          </div>
        </div>

      </div>
    </section>
  );
}
