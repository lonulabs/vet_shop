import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import PromosView from "./components/PromosView";
import CatalogView from "./components/CatalogView";
import ContactView from "./components/ContactView";
import CartDrawer from "./components/CartDrawer";
import { CartItem, CatalogItem, PromoItem } from "./types";
import { ArrowUp } from "lucide-react";

export default function App() {
  const [activeView, setActiveView] = useState("inicio");
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showGoToTop, setShowGoToTop] = useState(false);

  // 1. Recover shopping cart from localStorage on layout mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("biofarmex_cart");
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error("No se pudo cargar el carrito anterior", e);
    }
  }, []);

  // 2. Persistent save cart update alerts on state shift
  useEffect(() => {
    try {
      localStorage.setItem("biofarmex_cart", JSON.stringify(cartItems));
    } catch (e) {
      console.error("No se pudo guardar el estado de compra", e);
    }
  }, [cartItems]);

  // 3. Monitor browser scroll to trigger Go to Top indicator
  useEffect(() => {
    const handleScroll = () => {
      setShowGoToTop(window.scrollY > 320);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 4. Global Add to Basket actions
  const handleAddFormatToCart = (
    item: CatalogItem,
    format: [number | string, string, number | null]
  ) => {
    const formatLabel = format[1];
    const price = format[2] !== null ? parseFloat(format[2].toString()) : 0;
    const lineId = `${item.name}|${formatLabel}`;

    setCartItems((prev) => {
      const existingIdx = prev.findIndex((line) => line.id === lineId);
      if (existingIdx !== -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += 1;
        copy[existingIdx].total = copy[existingIdx].quantity * price;
        return copy;
      } else {
        return [
          ...prev,
          {
            id: lineId,
            name: item.name,
            format: formatLabel,
            price,
            quantity: 1,
            total: price,
            promo: false,
          },
        ];
      }
    });
  };

  const handleAddPromoToCart = (promo: PromoItem) => {
    const lineId = `${promo.name}|${promo.unit}|promo`;
    const price = promo.price;

    setCartItems((prev) => {
      const existingIdx = prev.findIndex((line) => line.id === lineId);
      if (existingIdx !== -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += 1;
        copy[existingIdx].total = copy[existingIdx].quantity * price;
        return copy;
      } else {
        return [
          ...prev,
          {
            id: lineId,
            name: promo.name,
            format: promo.unit,
            price,
            quantity: 1,
            total: price,
            promo: true,
            code: promo.code,
          },
        ];
      }
    });
  };

  // 5. Utility getters for status monitoring
  const isFormatInCart = (item: CatalogItem, formatName: string) => {
    const lineId = `${item.name}|${formatName}`;
    return cartItems.some((line) => line.id === lineId);
  };

  const isPromoInCart = (promo: PromoItem) => {
    const lineId = `${promo.name}|${promo.unit}|promo`;
    return cartItems.some((line) => line.id === lineId);
  };

  const handleRemoveFormatFromCart = (itemName: string, formatName: string) => {
    const lineId = `${itemName}|${formatName}`;
    setCartItems((prev) => prev.filter((line) => line.id !== lineId));
  };

  const handleRemovePromoFromCart = (lineId: string) => {
    setCartItems((prev) => prev.filter((line) => line.id !== lineId));
  };

  const handleUpdateQty = (lineId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((line) => {
          if (line.id === lineId) {
            const nextQty = line.quantity + delta;
            return {
              ...line,
              quantity: nextQty,
              total: nextQty * line.price,
            };
          }
          return line;
        })
        .filter((line) => line.quantity > 0);
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cartCount = cartItems.reduce((acc, line) => acc + line.quantity, 0);

  // Router dispatcher
  const renderActiveView = () => {
    switch (activeView) {
      case "inicio":
        return (
          <HomeView
            onNavigateToCatalog={() => setActiveView("catalog")}
            onNavigateToPromos={() => setActiveView("promos")}
            onAddPromoToCart={handleAddPromoToCart}
            isPromoInCart={isPromoInCart}
          />
        );
      case "nosotros":
        return <AboutView onNavigateToCatalog={() => setActiveView("catalog")} />;
      case "promos":
        return (
          <PromosView
            onAddPromoToCart={handleAddPromoToCart}
            isPromoInCart={isPromoInCart}
            onRemovePromoFromCart={handleRemovePromoFromCart}
          />
        );
      case "catalog":
        return (
          <CatalogView
            onAddFormatToCart={handleAddFormatToCart}
            isFormatInCart={isFormatInCart}
            onRemoveFormatFromCart={handleRemoveFormatFromCart}
            cartCount={cartCount}
            onCartToggle={() => setCartOpen(true)}
          />
        );
      case "contacto":
        return <ContactView />;
      default:
        return (
          <HomeView
            onNavigateToCatalog={() => setActiveView("catalog")}
            onNavigateToPromos={() => setActiveView("promos")}
            onAddPromoToCart={handleAddPromoToCart}
            isPromoInCart={isPromoInCart}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col justify-between bg-[#f8fafc] font-sans antialiased text-[#0f172a]" id="app-container">
      {/* Dynamic Header */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        cartCount={cartCount}
        onCartToggle={() => setCartOpen(true)}
      />

      {/* Main viewport Container */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        {renderActiveView()}
      </main>

      {/* Dynamic Footer */}
      <Footer setActiveView={setActiveView} activeView={activeView} />

      {/* Sliding Cotización Drawer */}
      <CartDrawer
        cartItems={cartItems}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onClear={handleClearCart}
      />

      {/* Persistent Smooth Go to Top Trigger Button */}
      {showGoToTop && (
        <button
          onClick={scrollToTop}
          id="goToTopBtn"
          className="fixed bottom-6 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue text-white shadow-xl hover:translate-y-[-3px] active:scale-95 hover:bg-brand-navy transition-all cursor-pointer border border-white/20 animate-fade-in"
          aria-label="Ir al inicio"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
