import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ComplexSection from "@/components/ComplexSection";
import EvidenceSection from "@/components/EvidenceSection";
import ClimateSection from "@/components/ClimateSection";
import GallerySection from "@/components/GallerySection";
import BudgetSection from "@/components/BudgetSection";
import DocsSection from "@/components/DocsSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow bg-white">
        {/* Cover visual & title banner */}
        <Hero />

        {/* General complex description & Implantation plan */}
        <ComplexSection />
        
        {/* Visual spreads for Grietas and Filtraciones */}
        <EvidenceSection />

        {/* Climate context and news links */}
        <ClimateSection />

        {/* Masonry photographic gallery */}
        <GallerySection />

        {/* Repair Quote cost highlights and details */}
        <BudgetSection />

        {/* Typographic PDF Documents index */}
        <DocsSection />

        {/* Location & Map placeholders */}
        <LocationSection />
      </main>
      <Footer />
    </>
  );
}
