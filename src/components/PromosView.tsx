import React, { useState } from "react";
import { PROMO_ITEMS, getProductPlaceholderImage } from "../data";
import { PromoItem } from "../types";
import { Tag, Check, Trash2, ArrowLeft, ArrowUpRight, BadgeAlert, ShoppingCart } from "lucide-react";

interface PromosViewProps {
  onAddPromoToCart: (promo: PromoItem) => void;
  isPromoInCart: (promo: PromoItem) => boolean;
  onRemovePromoFromCart: (promoId: string) => void;
}

export default function PromosView({
  onAddPromoToCart,
  isPromoInCart,
  onRemovePromoFromCart,
}: PromosViewProps) {
  const [selectedPromoIndex, setSelectedPromoIndex] = useState(0);
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  const selectedPromo = PROMO_ITEMS[selectedPromoIndex] || PROMO_ITEMS[0];

  const handleSelectPromo = (index: number) => {
    setSelectedPromoIndex(index);
    if (window.innerWidth < 768) {
      setMobileDetailOpen(true);
    }
  };

  const handlePromoToggle = (promo: PromoItem) => {
    if (isPromoInCart(promo)) {
      // Cart item ID format is "itemName|formatName|promo"
      const cartLineId = `${promo.name}|${promo.unit}|promo`;
      onRemovePromoFromCart(cartLineId);
    } else {
      onAddPromoToCart(promo);
    }
  };

  return (
    <div className="flex flex-col gap-6 py-6 animate-fade-in text-left">
      {/* Header section */}
      <div className="border-b border-slate-100 pb-4">
        <h1 className="font-display text-2xl font-black text-brand-dark sm:text-3xl tracking-tight">
          Panel de Promociones de la Bodega
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Aprovecha descuentos directos configurados de fábrica. Agrega varias promociones a la vez para tu cotización.
        </p>
      </div>

      {/* Main split grid: Sticky detailed Preview LHS + Grid List RHS */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* LHS sticky detailed card preview - hidden on mobile unless toggled */}
        <div
          className={`md:col-span-5 md:sticky md:top-24 bg-white border border-slate-200/80 rounded-2xl p-6 shadow-md md:flex flex-col gap-5 ${
            mobileDetailOpen ? "fixed inset-x-0 bottom-0 top-16 z-50 overflow-y-auto block rounded-t-3xl border-t-2 border-brand-primary" : "hidden"
          }`}
        >
          {/* Header row with close for Mobile drawer */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 md:hidden">
            <span className="font-display font-black text-brand-dark text-lg">
              Detalle de Promoción
            </span>
            <button
              onClick={() => setMobileDetailOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 font-bold hover:bg-slate-200 cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Promo big product image */}
          <div className="relative aspect-square flex items-center justify-center rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shadow-inner p-3 min-h-[220px]">
            <img
              src={getProductPlaceholderImage({ name: selectedPromo.name, tags: [] }, selectedPromoIndex)}
              alt={selectedPromo.name}
              className="h-full w-full object-cover rounded-md"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 right-3 bg-brand-dark hover:bg-brand-blue text-white text-[11px] font-mono rounded-full px-3 py-1 shadow font-bold flex items-center gap-1">
              Ref: #{selectedPromo.code}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200/55 px-3 py-0.5 text-xs font-bold w-fit font-mono">
              Unidad: {selectedPromo.unit}
            </span>
            <h2 className="font-display font-extrabold text-2xl text-brand-dark leading-tight">
              {selectedPromo.name}
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed scale-95 origin-left">
              Fórmula patenta de rápida asimilación garantizada por Biofarmex. Precio con descuento mayorista directo aplicado sobre el lote de stock.
            </p>
          </div>

          {/* Price & Cart actions */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col text-left mr-auto">
              <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase block">
                Precio Neto de Oferta
              </span>
              <span className="font-display text-3xl font-black text-brand-blue">
                ${selectedPromo.price.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => handlePromoToggle(selectedPromo)}
              className={`w-full sm:w-auto rounded-xl px-6 py-3.5 text-sm font-black transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                isPromoInCart(selectedPromo)
                  ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                  : "bg-brand-primary text-white hover:bg-brand-primary/95 shadow-brand-primary/20 hover:scale-[1.01]"
              }`}
            >
              {isPromoInCart(selectedPromo) ? (
                <>
                  <Trash2 className="h-4 w-4 shrink-0" />
                  Remover del Carrito
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4 shrink-0" />
                  Solicitar Ahora
                </>
              )}
            </button>
          </div>
        </div>

        {/* RHS Product catalog grid list */}
        <div className="md:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-semibold text-slate-400 font-mono">
              Módulos Activos de Oferta
            </span>
            <span className="text-xs font-bold text-brand-blue bg-blue-50 px-2.5 py-0.5 rounded-full font-mono">
              {PROMO_ITEMS.length} Promociones
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROMO_ITEMS.map((promo, index) => {
              const active = index === selectedPromoIndex;
              const inCart = isPromoInCart(promo);
              const fallbackImg = getProductPlaceholderImage({ name: promo.name, tags: [] }, index);

              return (
                <div
                  key={promo.code}
                  onClick={() => handleSelectPromo(index)}
                  className={`group rounded-2xl bg-white border p-4 shadow-sm transition-all duration-200 hover:shadow-md flex flex-col justify-between gap-4 cursor-pointer relative overflow-hidden select-none ${
                    active
                      ? "border-brand-primary ring-2 ring-brand-primary/10 shadow-md transform translate-y-[-2px] bg-brand-primary/5"
                      : "border-slate-200/70 hover:border-brand-blue/30"
                  }`}
                >
                  {/* Status Indicator circle for cart */}
                  {inCart && (
                    <div className="absolute top-2 right-2 bg-brand-primary text-white h-5 w-5 rounded-full flex items-center justify-center shadow animate-fade-in">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                  )}

                  {/* Body click to select */}
                  <div className="flex flex-col gap-2">
                    <div className="aspect-square w-full rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden mb-1 border border-slate-100">
                      <img
                        src={fallbackImg}
                        alt={promo.name}
                        className="h-full w-full object-cover transition-transform group-hover:scale-104"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase font-mono tracking-wide bg-slate-100 px-2 py-0.5 rounded w-fit">
                      {promo.unit}
                    </span>
                    <h3 className="font-bold text-brand-dark text-sm sm:text-base leading-snug line-clamp-2 h-10 group-hover:text-brand-blue transition-colors">
                      {promo.name}
                    </h3>
                  </div>

                  {/* Price trigger */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                    <div className="flex flex-col text-left">
                      <span className="text-[9px] text-slate-400 leading-none">Neto</span>
                      <span className="font-display font-black text-brand-blue text-md">
                        ${promo.price.toFixed(2)}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePromoToggle(promo);
                      }}
                      className={`h-9 rounded-lg px-3 py-1.5 font-bold font-mono text-sm leading-none flex items-center justify-center gap-1 transition-all cursor-pointer ${
                        inCart
                          ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                          : "bg-brand-primary text-white hover:bg-brand-primary/95"
                      }`}
                    >
                      {inCart ? "-" : "+"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Glass Backing blur backdrop for mobile detailed preview */}
      {mobileDetailOpen && (
        <div
          onClick={() => setMobileDetailOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
        />
      )}
    </div>
  );
}
