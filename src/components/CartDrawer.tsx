import React from "react";
import { CartItem } from "../types";
import { X, Trash2, ShoppingBag, Send, AlertCircle } from "lucide-react";

interface CartDrawerProps {
  cartItems: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQty: (lineId: string, delta: number) => void;
  onClear: () => void;
}

export default function CartDrawer({
  cartItems,
  isOpen,
  onClose,
  onUpdateQty,
  onClear,
}: CartDrawerProps) {
  const totalAmount = cartItems.reduce((acc, item) => acc + item.total, 0);

  // Computes wholesale discount rates based on final compiled price thresholds
  // Descuento Base = 30%
  // $3,000 - $4,000 = 30%
  // $4,000 - $5,000 = 40%
  // $5,000 - $10,000 = 50%
  // $10,000+ = 50% + 5% additional bulk bonus
  const getSubtotalDetails = () => {
    let discountPct = 30; // Default base
    let isWholesale = false;
    let bulkBonus = false;

    if (totalAmount >= 10000) {
      discountPct = 50;
      bulkBonus = true;
      isWholesale = true;
    } else if (totalAmount >= 5000) {
      discountPct = 50;
      isWholesale = true;
    } else if (totalAmount >= 4000) {
      discountPct = 40;
    } else {
      discountPct = 30;
    }

    // Apply progressive discount directly on standard catalog prices to simulate real billing
    const discountFactor = (100 - discountPct) / 100;
    // Apply bulk tier factor if necessary (additional 5% off the already discounted total)
    const finalBill = bulkBonus 
      ? (totalAmount * discountFactor) * 0.95 
      : totalAmount * discountFactor;

    return {
      discountPct,
      bulkBonus,
      finalBill,
    };
  };

  const { discountPct, bulkBonus, finalBill } = getSubtotalDetails();

  const handleCheckoutViaWhatsApp = () => {
    if (cartItems.length === 0) return;

    const agentPhone = "525617524444";
    const textLines = [
      "¡Hola, Biofarmex Bodega! 👋",
      "Me gustaría solicitar una cotización especial sobre la siguiente lista de productos veterinarios:",
      "",
    ];

    cartItems.forEach((line, index) => {
      textLines.push(
        `${index + 1}. *${line.name}*` +
        `\n   ↳ ${line.format} [x${line.quantity}]` +
        `\n   ↳ Subtotal: $${line.total.toFixed(2)}`
      );
    });

    textLines.push("");
    textLines.push(`*Precio Base Subtotal:* $${totalAmount.toFixed(2)} MXN`);
    textLines.push(`*Descuento Aplicado:* ${discountPct}%`);
    if (bulkBonus) {
      textLines.push(`*Bono Especial Mayorista:* +5% adicional`);
    }
    textLines.push(`*TOTAL ESTIMADO NETO:* $${finalBill.toFixed(2)} MXN`);
    textLines.push("");
    textLines.push("Por favor confirmen disponibilidad y tiempo de entrega. ¡Muchas gracias!");

    const formattedMessage = encodeURIComponent(textLines.join("\n"));
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${agentPhone}&text=${formattedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* Background Dimming Mask Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-black/50 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Cart Drawer sliding core LHS panel */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-white p-6 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Draw Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="text-left">
            <h2 className="font-display font-black text-brand-dark text-xl flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-brand-primary" /> Mi Cotización
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {cartItems.length} componentes en tu lista
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="Cerrar carrito"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Dynamic products list */}
        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-3 min-h-0">
          {cartItems.length > 0 ? (
            cartItems.map((line) => (
              <div
                key={line.id}
                className={`group flex items-start gap-3 rounded-2xl p-3 border shadow-xs transition-colors text-left ${
                  line.promo 
                    ? "bg-yellow-50/20 border-yellow-250/20" 
                    : "bg-slate-50/40 border-slate-200/50"
                }`}
              >
                {/* Details layout */}
                <div className="flex-1 flex flex-col gap-1.5 leading-snug">
                  <div>
                    {line.promo && (
                      <span className="inline-block bg-yellow-400 text-brand-dark text-[8px] font-black uppercase px-2 py-0.5 rounded-full font-mono scale-90 origin-left mb-0.5">
                        DESCUENTO
                      </span>
                    )}
                    <h4 className="font-bold text-brand-dark text-sm leading-tight line-clamp-2">
                      {line.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500">
                    <span className="font-mono bg-white px-2 py-0.5 rounded border border-slate-200/50">
                      {line.format}
                    </span>
                    <span>•</span>
                    <span>${line.price.toFixed(2)}</span>
                  </div>

                  {/* Quantity adjusts */}
                  <div className="flex items-center gap-2.5 mt-1">
                    <button
                      onClick={() => onUpdateQty(line.id, -1)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-slate-200 hover:bg-slate-100 font-bold text-slate-600 shadow-xs cursor-pointer text-sm"
                    >
                      −
                    </button>
                    <span className="font-mono font-bold text-sm text-brand-dark min-w-[20px] text-center">
                      {line.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQty(line.id, 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-slate-200 hover:bg-slate-100 font-bold text-slate-600 shadow-xs cursor-pointer text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Sub-price and quick garbage */}
                <div className="flex flex-col items-end gap-3 self-center shrink-0">
                  <span className="font-display font-extrabold text-sm text-brand-blue">
                    ${line.total.toFixed(2)}
                  </span>
                  <button
                    onClick={() => onUpdateQty(line.id, -line.quantity)}
                    className="text-slate-350 hover:text-red-500 transition-colors p-1 rounded-md hover:bg-red-50 cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            /* Friendly empty state */
            <div className="my-auto text-center flex flex-col items-center gap-3 py-12 px-4">
              <ShoppingBag className="h-10 w-10 text-slate-200 animate-pulse" />
              <h3 className="font-bold text-slate-500 text-base">
                Tu cotización está vacía
              </h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Explora el catálogo o las promociones de la bodega y añade medicamentos veterinarios a tu cesta de compras para preparar tu factura.
              </p>
              <button
                onClick={onClose}
                className="mt-2 bg-brand-blue text-white hover:bg-brand-blue/95 font-bold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
              >
                Comenzar a Comprar
              </button>
            </div>
          )}
        </div>

        {/* Summary pricing info & checkouts */}
        {cartItems.length > 0 && (
          <div className="border-t border-slate-100 pt-4 flex flex-col gap-4 text-left">
            {/* Value details */}
            <div className="flex flex-col gap-2.5 bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs font-medium text-slate-600">
              <div className="flex justify-between items-center">
                <span>Subtotal Base (Lote):</span>
                <span className="font-mono text-brand-dark font-bold">${totalAmount.toFixed(2)} MXN</span>
              </div>
              <div className="flex justify-between items-center text-emerald-600">
                <span className="flex items-center gap-1">
                  Descuento por Volumen ({discountPct}%):
                </span>
                <span className="font-mono font-bold">
                  -${(totalAmount * (discountPct / 100)).toFixed(2)} MXN
                </span>
              </div>
              {bulkBonus && (
                <div className="flex justify-between items-center text-blue-600">
                  <span>Bono Mayorista Adicional (+5%):</span>
                  <span className="font-mono font-bold">
                    -${((totalAmount * ((100 - discountPct) / 100)) * 0.05).toFixed(2)} MXN
                  </span>
                </div>
              )}
              
              <div className="border-t border-dashed border-slate-200 pt-2 flex justify-between items-center text-sm font-extrabold text-brand-dark">
                <span className="flex items-center gap-1 font-display">
                  Total Neto Cotizado:
                </span>
                <span className="font-display font-black text-brand-blue text-lg">
                  ${finalBill.toFixed(2)} MXN
                </span>
              </div>
            </div>

            {/* Hint Notice */}
            <p className="text-[10px] text-slate-400 leading-relaxed text-center flex items-center justify-center gap-1.5 px-2">
              <AlertCircle className="h-3.5 w-3.5 text-yellow-500 shrink-0" />
              Precios estimados para Oaxaca/CDMX. El agente validará recargos de envío.
            </p>

            {/* Floating Action Buttons */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleCheckoutViaWhatsApp}
                className="w-full bg-brand-primary hover:bg-brand-primary/95 text-white font-extrabold text-sm py-4 rounded-xl shadow-lg shadow-brand-primary/18 flex items-center justify-center gap-2 transition-all hover:translate-y-[-1px] cursor-pointer"
              >
                <Send className="h-4 w-4 shrink-0" />
                Enviar Pedido por WhatsApp
              </button>
              <button
                onClick={onClear}
                className="w-full text-slate-400 hover:text-red-500 font-semibold text-xs py-2 text-center transition-colors cursor-pointer"
              >
                Vaciar Lista
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
