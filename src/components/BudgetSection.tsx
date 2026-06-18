"use client";

import React from "react";
import budgetData from "../../data/budget.json";

export default function BudgetSection() {
  const totalAmount = budgetData.reduce((sum, item) => sum + item.amount, 0);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="presupuesto" className="py-16 bg-zinc-50 border-t border-b border-zinc-150 px-6 sm:px-12 md:px-16">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Large visual header for budget total */}
        <div className="mb-14 space-y-2">
          <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase">
            Estimación General
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950 uppercase">
            Presupuesto de Reparación
          </h2>
          <div className="text-5xl sm:text-7xl font-black text-zinc-950 tracking-tighter leading-none font-mono py-2">
            {formatCurrency(totalAmount)}
          </div>
          <p className="text-zinc-500 text-sm sm:text-base font-light max-w-xl">
            Monto aproximado calculado en base a cotizaciones de mano de obra y materiales para las tareas de resolución detalladas a continuación.
          </p>
        </div>

        {/* Minimalist Details List (No Tables, No Cards) */}
        <div className="max-w-4xl pt-6 border-t border-zinc-200/60">
          <h3 className="text-xs font-bold tracking-widest text-zinc-400 uppercase mb-6">
            Desglose de Tareas Estimadas
          </h3>
          
          <div className="divide-y divide-zinc-200/60">
            {budgetData.map((item) => (
              <div
                key={item.id}
                className="py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 first:pt-0 last:pb-0"
              >
                <div className="space-y-1 max-w-2xl">
                  <h4 className="text-base sm:text-lg font-bold text-zinc-800">
                    {item.concept}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-500 font-light leading-relaxed">
                    {item.detail}
                  </p>
                </div>
                <div className="text-sm sm:text-base font-mono font-bold text-zinc-900 whitespace-nowrap text-left sm:text-right">
                  {formatCurrency(item.amount)}
                </div>
              </div>
            ))}
          </div>
          
          {/* Note */}
          <div className="mt-8 pt-4 border-t border-zinc-200/60 text-[10px] text-zinc-400 font-mono">
            * Nota: Los valores son estimados y pueden variar según cotizaciones finales y costos de materiales.
          </div>
        </div>

      </div>
    </section>
  );
}
