import React, { useState, useMemo } from "react";
import { CATALOG_ITEMS, getProductPlaceholderImage } from "../data";
import { CatalogItem } from "../types";
import { Search, ShoppingCart, Info, Activity, Filter, Check } from "lucide-react";

interface CatalogViewProps {
  onAddFormatToCart: (item: CatalogItem, format: [number | string, string, number | null]) => void;
  isFormatInCart: (item: CatalogItem, formatName: string) => boolean;
  onRemoveFormatFromCart: (itemName: string, formatName: string) => void;
  cartCount: number;
  onCartToggle: () => void;
}

export default function CatalogView({
  onAddFormatToCart,
  isFormatInCart,
  onRemoveFormatFromCart,
  cartCount,
  onCartToggle,
}: CatalogViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("Todos");

  // Dynamically extract all available tags in our dataset to feed category chips
  const availableTags = useMemo(() => {
    const tagsSet = new Set<string>();
    CATALOG_ITEMS.forEach((item) => {
      if (item.tags) {
        item.tags.forEach((tag) => tagsSet.add(tag));
      }
    });
    return ["Todos", ...Array.from(tagsSet).sort()];
  }, []);

  // Responsive filtering query checking both Name, Tags, AND Formula active compounds (vets search by chemical formula!)
  const filteredCatalog = useMemo(() => {
    return CATALOG_ITEMS.filter((item) => {
      const query = searchQuery.trim().toLowerCase();
      
      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.info.toLowerCase().includes(query) ||
        (item.formula &&
          item.formula.rows.some(
            (row) =>
              row[0].toLowerCase().includes(query) || row[1].toLowerCase().includes(query)
          ));

      const matchesTag = selectedTag === "Todos" || (item.tags && item.tags.includes(selectedTag));

      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag]);

  const handleFormatToggle = (item: CatalogItem, format: [number | string, string, number | null]) => {
    const formatName = format[1];
    if (isFormatInCart(item, formatName)) {
      onRemoveFormatFromCart(item.name, formatName);
    } else {
      onAddFormatToCart(item, format);
    }
  };

  return (
    <div className="flex flex-col gap-8 py-6 animate-fade-in text-left">
      
      {/* 1. Introductory header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="text-left">
          <h1 className="font-display text-2xl font-black text-brand-dark sm:text-3xl tracking-tight">
            Catálogo Farmacéutico Veterinario
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Medicamentos veterinarios autorizados, desparasitantes internos, antibióticos de patente, vitaminas y tónicos vigorizantes.
          </p>
        </div>

        {/* Big Quick Mobile Floating Cart Indicator on left if items loaded */}
        <button
          onClick={onCartToggle}
          className="flex h-12 items-center gap-2 rounded-xl bg-brand-primary px-4 text-xs font-bold text-white shadow-md self-start md:self-auto cursor-pointer"
        >
          <ShoppingCart className="h-4 w-4 shrink-0 animate-bounce" />
          <span>Ver Mi Cotización</span>
          {cartCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-300 text-brand-dark px-1 text-[11px] font-black">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* 2. Controls Section (Search + Category Filter Chips) */}
      <section className="flex flex-col gap-4 bg-slate-50 border border-slate-100 p-4 rounded-2xl">
        <div className="relative w-full">
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            id="catalogSearch"
            type="text"
            className="w-full rounded-xl border border-slate-200/80 bg-white py-3.5 pl-11 pr-4 text-sm text-brand-dark placeholder-slate-400 shadow-sm focus:border-brand-blue focus:outline-none focus:ring-4 focus:ring-brand-blue/8 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre del fármaco, principio activo o compuestos químicos (ej: Albendazol)..."
          />
        </div>

        {/* Dynamic Category Chips Track */}
        <div className="flex flex-col gap-1.5 ">
          <span className="text-[10px] font-mono font-bold tracking-wider text-slate-400 uppercase flex items-center gap-1">
            <Filter className="h-3 w-3" /> Categorías de Productos
          </span>
          <div className="flex flex-wrap gap-2.5">
            {availableTags.map((tag) => {
              const active = tag === selectedTag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all shadow-xs cursor-pointer ${
                    active
                      ? "bg-brand-blue text-white shadow"
                      : "bg-white border border-slate-200/60 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Product Cards Grid list */}
      {filteredCatalog.length > 0 ? (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCatalog.map((item, itemIdx) => {
            const productImg = getProductPlaceholderImage(item, itemIdx);

            return (
              <article
                key={item.name}
                className="group flex flex-col rounded-3xl bg-white border border-slate-200/75 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-brand-primary/15"
              >
                {/* Visual Cover Header */}
                <div className="relative aspect-video w-full bg-slate-50 overflow-hidden border-b border-slate-100 flex items-center justify-center p-3">
                  <img
                    src={productImg}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600";
                    }}
                    referrerPolicy="no-referrer"
                  />
                  {/* Category badging overlay */}
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-brand-navy/90 text-white px-3 py-0.5 text-[9px] font-bold tracking-widest uppercase backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Body details */}
                <div className="p-5 flex flex-col gap-4 flex-1">
                  
                  {/* Title and descriptions */}
                  <div className="flex flex-col gap-1.5">
                    <h2 className="font-display font-black text-lg text-brand-dark tracking-tight line-clamp-1 leading-snug group-hover:text-brand-blue transition-colors">
                      {item.name}
                    </h2>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                      {item.info}
                    </p>
                    {item.dosis && (
                      <div className="mt-1 bg-yellow-50/50 rounded-xl p-2.5 border border-yellow-250/30">
                        <p className="text-[10px] text-slate-500 leading-snug">
                          <strong className="text-brand-dark uppercase font-mono tracking-wider font-extrabold text-[9px] block">
                            Dosis Recomendada:
                          </strong>
                          {item.dosis}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* 1. Formats in stock listing table */}
                  <div className="flex flex-col gap-1.5 mt-2">
                    <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-blue flex items-center gap-1 border-b border-slate-100 pb-1">
                      <Activity className="h-3 w-3 text-brand-primary" /> Presentaciones Disponibles
                    </h3>
                    <div className="overflow-hidden border border-slate-100 rounded-xl shadow-xs">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-slate-50 text-slate-500 font-bold uppercase text-[9px]">
                            <th className="px-3 py-2 text-center w-12">🛒</th>
                            <th className="px-3 py-2">Formato</th>
                            <th className="px-3 py-2 text-right">Precio Neto</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.formats.map((fmt, idx) => {
                            const [code, label, price] = fmt;
                            const isAdded = isFormatInCart(item, label);
                            return (
                              <tr
                                key={idx}
                                className={`border-t border-slate-50 transition-colors ${
                                  isAdded ? "bg-emerald-50/35" : "hover:bg-slate-100/30"
                                }`}
                              >
                                <td className="px-3 py-2 text-center">
                                  <button
                                    onClick={() => handleFormatToggle(item, fmt)}
                                    className={`flex h-6 w-6 items-center justify-center rounded-md font-extrabold leading-none transition-all cursor-pointer ${
                                      isAdded
                                        ? "bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                                        : "bg-brand-primary text-white hover:bg-brand-primary/95 shadow"
                                    }`}
                                  >
                                    {isAdded ? "−" : "+"}
                                  </button>
                                </td>
                                <td className="px-3 py-2 font-mono font-medium text-slate-600">
                                  {label}
                                </td>
                                <td className="px-3 py-2 text-right font-bold text-brand-dark">
                                  {price !== null ? (
                                    `$${price.toFixed(2)}`
                                  ) : (
                                    <span className="text-[10px] text-slate-400 font-medium">
                                      Consultar
                                    </span>
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* 2. Active chemical formula rows */}
                  <div className="flex flex-col gap-1.5 mt-2">
                    <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-brand-blue flex items-center gap-1 border-b border-slate-100 pb-1">
                      🔬 Fórmula por {item.formula.header}
                    </h3>
                    <div className="overflow-hidden border border-slate-100 rounded-xl">
                      <table className="w-full text-left text-xs border-collapse font-mono bg-slate-50/30">
                        <tbody>
                          {item.formula.rows.map((row, idx) => (
                            <tr
                              key={idx}
                              className="border-t border-slate-50 hover:bg-slate-50/70"
                            >
                              <td className="px-3 py-1.5 text-[10px] font-medium text-slate-500">
                                {row[0]}
                              </td>
                              <td className="px-3 py-1.5 text-right font-bold text-[10px] text-slate-400">
                                {row[1]}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              </article>
            );
          })}
        </section>
      ) : (
        /* Empty Search Outcomes state */
        <div className="text-center py-16 rounded-2xl bg-slate-50 border border-slate-100">
          <Info className="h-10 w-10 text-slate-300 mx-auto block mb-2" />
          <h2 className="font-display font-bold text-slate-600 text-lg">
            No se encontraron productos
          </h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
            Prueba a buscar con otra palabra clave, principio activo o limpia la categoría seleccionada.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedTag("Todos");
            }}
            className="mt-4 rounded-xl bg-brand-blue text-white px-4 py-2 text-xs font-bold cursor-pointer"
          >
            Limpiar Filtros
          </button>
        </div>
      )}
    </div>
  );
}
