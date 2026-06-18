"use client";

import React from "react";
import projectData from "../../data/project.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-zinc-500 py-16 px-6 sm:px-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-y-1 text-center md:text-left">
          <span className="font-semibold text-white tracking-wider text-xs uppercase block">
            {projectData.projectName}
          </span>
          <span className="text-[10px] text-zinc-600 font-medium tracking-widest uppercase">
            Padre Claret &bull; Córdoba, Argentina
          </span>
        </div>
        
        <div className="text-center md:text-right max-w-md space-y-3">
          <p className="text-[10px] text-zinc-600 leading-normal font-light">
            Repositorio fotográfico y documental informativo sobre incidencias observadas. No se emiten diagnósticos ni conclusiones técnicas. De acceso restringido y solo lectura.
          </p>
          <p className="text-[10px] text-zinc-700 tracking-wide">
            &copy; {currentYear} Registro de Incidencias. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
