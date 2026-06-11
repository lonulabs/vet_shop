import React, { useState, useEffect } from "react";
import { CAROUSEL_GALLERY, PROMO_ITEMS, getProductPlaceholderImage } from "../data";
import { PromoItem } from "../types";
import { ArrowRight, ShieldCheck, Tag, Info, Percent, TrendingUp } from "lucide-react";

interface HomeViewProps {
  onNavigateToCatalog: () => void;
  onNavigateToPromos: () => void;
  onAddPromoToCart: (promo: PromoItem) => void;
  isPromoInCart: (promo: PromoItem) => boolean;
}

export default function HomeView({
  onNavigateToCatalog,
  onNavigateToPromos,
  onAddPromoToCart,
  isPromoInCart,
}: HomeViewProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-advance banner carousel every 5.5 seconds for nice organic discovery
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % CAROUSEL_GALLERY.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % CAROUSEL_GALLERY.length);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + CAROUSEL_GALLERY.length) % CAROUSEL_GALLERY.length);
  };

  // Extract a few headline promotions to showcase as "Promociones de la Semana"
  const featuredPromos = PROMO_ITEMS.slice(0, 4);

  return (
    <div className="flex flex-col gap-10 py-6 animate-fade-in">
      {/* 1. Immersive Hero Slider System */}
      <section className="relative overflow-hidden rounded-3xl bg-slate-900 text-white shadow-xl min-h-[300px] md:min-h-[440px] flex items-center">
        {/* Banner Images Track */}
        <div className="absolute inset-0 z-0">
          {CAROUSEL_GALLERY.map((url, index) => (
            <div
              key={url}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === activeSlide ? "opacity-45" : "opacity-0"
              }`}
            >
              <img
                src={url}
                alt={`Hato Ganadero ${index + 1}`}
                className="h-full w-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
          {/* Cool Dark Overlay gradient for premium readable text */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue/90 via-brand-dark/70 to-transparent z-10" />
        </div>

        {/* Hero Copy overlay */}
        <div className="relative z-20 max-w-2xl px-6 py-12 md:px-12 flex flex-col gap-4 text-left">
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-primary/25 px-3 py-1 font-mono text-xs font-semibold tracking-wider uppercase text-yellow-300 backdrop-blur-md outline outline-brand-primary/40">
            <span className="flex h-1.5 w-1.5 rounded-full bg-brand-primary animate-ping" />
            Salud Animal de Vanguardia
          </span>
          <h1 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl leading-tight">
            El socio confiable <br />
            <span className="text-brand-primary">para tu rancho o mascota</span>
          </h1>
          <p className="text-sm leading-relaxed text-slate-200 md:text-base max-w-lg">
            Surtido directo a mayoristas y minoristas con los precios de bodega más competitivos del mercado nacional. Descuentos increíbles de hasta el 50%.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={onNavigateToCatalog}
              className="inline-flex items-center gap-2 rounded-xl bg-brand-primary px-6 py-3 font-bold text-white shadow-lg shadow-brand-primary/20 transition-all hover:translate-y-[-2px] hover:shadow-brand-primary/35 hover:scale-[1.01] cursor-pointer"
            >
              Ver Catálogo
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={onNavigateToPromos}
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/15 cursor-pointer"
            >
              Ofertas Especiales
            </button>
          </div>
        </div>

        {/* Slide Manual Selectors */}
        <button
          onClick={handlePrevSlide}
          className="absolute left-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white transition-all cursor-pointer"
          aria-label="Previous image"
        >
          ‹
        </button>
        <button
          onClick={handleNextSlide}
          className="absolute right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 hover:bg-black/50 text-white transition-all cursor-pointer"
          aria-label="Next image"
        >
          ›
        </button>

        {/* Bottom index dots */}
        <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center gap-2">
          {CAROUSEL_GALLERY.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                idx === activeSlide ? "w-6 bg-brand-primary" : "w-2.5 bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Headline Statement & Wholesale Discounts Tier Card List */}
      <section className="flex flex-col gap-6 rounded-3xl bg-slate-50 border border-slate-100 p-6 md:p-8">
        <div className="text-center max-w-3xl mx-auto flex flex-col gap-2">
          <span className="text-xs font-bold leading-5 text-brand-blue uppercase tracking-widest flex items-center justify-center gap-1">
            <TrendingUp className="h-4 w-4 text-brand-primary inline" /> Sistema de Descuentos Progresivo
          </span>
          <h2 className="font-display text-2xl font-black text-brand-dark sm:text-3xl tracking-tight leading-8">
            Vendemos un amplio surtido de medicamentos para ganado y mascotas, al mejor precio
          </h2>
          <p className="text-slate-500 text-sm max-w-xl mx-auto">
            Disfruta de nuestro generoso tabulador de rebajas adaptado especialmente tanto para pequeños productores como grandes mayoristas.
          </p>
        </div>

        {/* Base Banner Indicator */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-navy p-6 text-white shadow-md">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary text-white shadow-inner font-display font-black text-2xl animate-pulse">
              30%
            </div>
            <div className="text-left">
              <h3 className="font-display font-extrabold text-lg sm:text-xl">DESCUENTO BASE SOBERANO</h3>
              <p className="text-xs text-slate-300">¡Obtén automáticamente un 30% de descuento de forma inmediata al iniciar tu cotización!</p>
            </div>
          </div>
          <button
            onClick={onNavigateToCatalog}
            className="w-full md:w-auto shrink-0 bg-yellow-300 text-brand-dark hover:bg-yellow-400 px-5 py-2.5 rounded-xl text-sm font-bold shadow transition-all hover:scale-103 cursor-pointer"
          >
            Obtener Cotización Ahora
          </button>
        </div>

        {/* Grid and ranges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-2">
          {[
            { range: "De $3,000 a $4,000 MXN", pct: "30%", desc: "Descuento Directo Base" },
            { range: "De $4,000 a $5,000 MXN", pct: "40%", desc: "Descuento Intermedio" },
            { range: "De $5,000 a $10,000 MXN", pct: "50%", desc: "Descuento Especial Súper" },
            { range: "De $10,000 en adelante", pct: "+5%", desc: "Adicional sobre volumen neto" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center rounded-2xl border border-slate-200/60 bg-white p-5 text-center shadow-sm transition-all duration-250 hover:-translate-y-1 hover:shadow-md hover:border-brand-primary/20"
            >
              <span className="text-[11px] font-semibold text-slate-400 capitalize block mb-1">
                {item.range}
              </span>
              <span className="font-display text-4xl font-extrabold text-brand-primary my-2 leading-none">
                {item.pct}
              </span>
              <span className="text-xs font-medium text-brand-dark bg-emerald-50 text-emerald-700 rounded-full px-2.5 py-0.5 font-mono">
                {item.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Legal notice badges */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-slate-500 bg-white/70 rounded-xl p-3 border border-dashed border-slate-200">
          <span className="flex items-center gap-1.5 font-medium text-brand-blue">
            <ShieldCheck className="h-4 w-4 text-brand-primary" />
            PRECIOS ESPECIALES PARA ASOCIACIONES Y VETERINARIAS
          </span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span className="flex items-center gap-1.5 font-medium text-brand-blue">
            <Info className="h-4 w-4 text-yellow-500" />
            Asesoría telefónica gratuita con tu médico a cargo.
          </span>
        </div>
      </section>

      {/* 3. Horizontal featured "Promociones de la semana" catalog */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-row items-center justify-between border-b border-slate-100 pb-3">
          <div className="text-left">
            <h3 className="font-display text-xl font-bold text-brand-dark sm:text-2xl tracking-tight">
              Promociones de la Semana
            </h3>
            <p className="text-slate-400 text-xs text-left">
              Fórmulas líquidas, tabletas e inyectables al costo más conveniente.
            </p>
          </div>
          <button
            onClick={onNavigateToPromos}
            className="text-xs font-bold text-brand-blue hover:text-brand-primary flex items-center gap-1 transition-colors cursor-pointer"
          >
            Ver más
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPromos.map((promo, idx) => {
            const added = isPromoInCart(promo);
            // Grab a high-res placeholder based on tag lookup (e.g. Antibiotics or vitamins)
            const fallbackImg = getProductPlaceholderImage({ name: promo.name, tags: [] }, idx);

            return (
              <article
                key={promo.code}
                className="group flex flex-col rounded-2xl bg-white border border-slate-200/70 p-4 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-brand-primary/20 hover:-translate-y-1 text-left relative overflow-hidden"
              >
                {/* Sale label badge */}
                <div className="absolute top-2 left-2 z-10 bg-brand-primary text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-sm tracking-widest font-mono">
                  OFERTA
                </div>

                {/* Cover Image */}
                <div className="relative mb-3 flex aspect-square items-center justify-center rounded-xl bg-slate-50 overflow-hidden select-none">
                  <img
                    src={fallbackImg}
                    alt={promo.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-106"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details layout */}
                <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase font-mono bg-slate-100 px-2 py-0.5 rounded-md w-fit block mb-1">
                  {promo.unit}
                </span>

                <h4 className="font-bold text-brand-dark text-sm sm:text-base leading-snug group-hover:text-brand-blue transition-colors line-clamp-2 h-10 mb-2">
                  {promo.name}
                </h4>

                {/* Buy button and Price info container */}
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between gap-1">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 line-through">
                      ${(promo.price * 1.5).toFixed(2)}
                    </span>
                    <span className="font-display font-extrabold text-md text-brand-blue">
                      ${promo.price.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => onAddPromoToCart(promo)}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-black transition-all cursor-pointer ${
                      added
                        ? "bg-red-50 text-red-600 hover:bg-red-100"
                        : "bg-brand-primary text-white hover:bg-brand-primary/95 shadow shadow-brand-primary/10"
                    }`}
                  >
                    {added ? "Quitar" : "Agregar"}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
