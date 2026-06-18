"use client";

import React from "react";
import docsData from "../../data/documents.json";

export default function DocsSection() {
  return (
    <section id="documentacion" className="py-16 bg-white border-b border-zinc-150 px-6 sm:px-12 md:px-16">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <div className="mb-14 border-b border-zinc-100 pb-4">
          <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
            Repositorio
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 mt-1 uppercase">
            Documentación de Soporte
          </h2>
          <p className="text-zinc-500 mt-2 text-sm sm:text-base font-light">
            Enlace a los archivos PDF de respaldo de relevamiento e inspecciones fácticas.
          </p>
        </div>

        {/* Index style document list - Simple & Typographic */}
        <div className="max-w-4xl space-y-6">
          {docsData.map((doc) => (
            <div
              key={doc.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-zinc-100 last:border-b-0 gap-4"
            >
              {/* Document title and size */}
              <div className="flex items-baseline space-x-3">
                <span className="text-base sm:text-lg text-zinc-700" role="img" aria-label="documento">
                  📄
                </span>
                <span className="text-sm sm:text-base font-semibold text-zinc-900 hover:text-zinc-950 transition-colors">
                  {doc.title}
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  ({doc.fileSize})
                </span>
              </div>

              {/* Download & View Actions */}
              <div className="flex items-center space-x-6">
                <a
                  href={`/documents/${doc.fileName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold tracking-widest uppercase text-zinc-500 hover:text-zinc-950 transition-colors"
                >
                  Ver PDF
                </a>
                <a
                  href={`/documents/${doc.fileName}`}
                  download={doc.fileName}
                  className="text-xs font-bold tracking-widest uppercase text-zinc-950 hover:text-zinc-650 transition-colors border-b-2 border-zinc-950 pb-0.5"
                >
                  Descargar
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
