import React, { useState } from "react";
import { ShoppingCart, Menu, X, ShieldAlert, Award } from "lucide-react";

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
  cartCount: number;
  onCartToggle: () => void;
}

export default function Header({
  activeView,
  setActiveView,
  cartCount,
  onCartToggle,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "inicio", label: "Inicio" },
    { id: "nosotros", label: "Nosotros" },
    { id: "promos", label: "Promociones" },
    { id: "catalog", label: "Catálogo" },
    { id: "contacto", label: "Contacto" },
  ];

  const handleNavClick = (viewId: string) => {
    setActiveView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-brand-blue/95 text-white shadow-md backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 md:py-4">
        {/* Brand Logo Container */}
        <div 
          className="flex cursor-pointer items-center gap-3 transition-colors hover:opacity-95"
          onClick={() => handleNavClick("inicio")}
          id="logo-brand"
        >
          {/* Custom Medical Vector Emblem */}
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-blue shadow-inner font-display font-bold text-lg border border-brand-primary">
            +
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold tracking-tight sm:text-xl md:text-2xl">
              BIOFARMEX <span className="text-brand-primary">BODEGA</span>
            </span>
            <span className="text-[10px] font-mono tracking-wider opacity-80 uppercase flex items-center gap-1">
              <Award className="h-3 w-3 text-brand-primary inline" /> Mayorista & Minorista
            </span>
          </div>
        </div>

        {/* Desktop Navigation Link Row */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = activeView === link.id;
            return (
              <button
                key={link.id}
                id={`nav-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-250 cursor-pointer ${
                  isActive
                    ? "bg-white/12 text-yellow-300 font-semibold shadow-sm border-b-2 border-brand-primary"
                    : "text-white/85 hover:bg-white/5 hover:text-white"
                }`}
              >
                {link.label}
              </button>
            );
          })}

          {/* Cart Icon trigger inside Navigation */}
          <button
            onClick={onCartToggle}
            id="nav-cart-btn"
            className="ml-4 flex items-center gap-2 rounded-xl bg-brand-primary px-4 py-2 text-sm font-bold text-white shadow-md transition-all duration-200 hover:scale-[1.03] hover:shadow-lg active:scale-95 cursor-pointer"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden lg:inline">Cotizar</span>
            {cartCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-300 px-1 text-xs font-black text-brand-dark animate-bounce">
                {cartCount}
              </span>
            )}
          </button>
        </nav>

        {/* Mobile Action Controls */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Cart trigger for Mobile */}
          <button
            onClick={onCartToggle}
            id="mobile-cart-btn"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition-opacity hover:opacity-90 cursor-pointer"
            aria-label="Abrir cotización"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-yellow-300 px-1 text-[10px] font-black text-brand-dark animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white transition-opacity hover:opacity-90 cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Floating Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-brand-navy p-4 shadow-xl transition-all md:hidden animate-fade-in">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeView === link.id;
              return (
                <button
                  key={link.id}
                  id={`mobile-nav-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex w-full items-center rounded-lg px-4 py-3 text-left font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-white/10 text-yellow-300 font-bold border-l-4 border-brand-primary"
                      : "text-white/80 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
