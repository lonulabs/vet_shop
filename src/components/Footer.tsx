import React from "react";
import { Activity, ShieldCheck, Mail, MapPin } from "lucide-react";

interface FooterProps {
  setActiveView: (view: string) => void;
  activeView: string;
}

export default function Footer({ setActiveView, activeView }: FooterProps) {
  const handleNavClick = (viewId: string) => {
    setActiveView(viewId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-brand-dark px-4 py-8 text-slate-300 sm:px-6 border-t border-white/5 font-sans">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Logo & description column */}
          <div className="flex flex-col gap-3">
            <span className="font-display text-xl font-bold tracking-tight text-white flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-primary text-white font-bold text-sm">
                +
              </span>
              BIOFARMEX <span className="text-brand-primary">BODEGA</span>
            </span>
            <p className="text-xs leading-relaxed text-slate-400">
              Distribuidora autorizada de medicamentos veterinarios de patente y suplementos alimenticios premium para el sector ganadero y mascotas domésticas.
            </p>
            <div className="mt-2 flex flex-col gap-1 text-[11px] text-slate-400">
              <span className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-brand-primary shrink-0" />
                Matriz en Oaxaca y Bodega de Enlace en CDMX.
              </span>
              <span className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-brand-primary shrink-0" />
                ventas@biofarmexbodega.com.mx
              </span>
            </div>
          </div>

          {/* Quick links navigation column */}
          <div className="flex flex-col gap-3">
            <span className="font-display font-bold text-white text-md tracking-wider uppercase text-xs">
              Navegación
            </span>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                { id: "inicio", label: "Inicio" },
                { id: "nosotros", label: "Nosotros" },
                { id: "promos", label: "Promociones" },
                { id: "catalog", label: "Catálogo" },
                { id: "contacto", label: "Contacto" },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left text-sm transition-colors cursor-pointer ${
                    activeView === link.id
                      ? "text-yellow-300 font-semibold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Quality badge column */}
          <div className="flex flex-col gap-3 h-full justify-between">
            <div>
              <span className="font-display font-bold text-white text-md tracking-wider uppercase text-xs block mb-2">
                Garantía y Seguridad
              </span>
              <div className="flex items-start gap-2 rounded-xl bg-white/5 p-3 text-xs leading-relaxed text-slate-400">
                <ShieldCheck className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" />
                <span>
                  Todos nuestros fármacos cuentan con registro SAGARPA y cumplen enteramente con los más rigurosos estándares sanitarios oficiales.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider and clean copyright */}
        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
          <p>© 2026 Biofarmex Bodega. Todos los derechos reservados.</p>
          <p className="mt-1 font-mono text-[10px] opacity-60">Matrícula y Control Profesional de Medicamentos.</p>
        </div>
      </div>
    </footer>
  );
}
