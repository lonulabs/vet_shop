import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Facebook, Copy, Check, MessageSquare } from "lucide-react";

export default function ContactView() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopyToClipboard = (text: string, id: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          setCopiedText(id);
          setTimeout(() => setCopiedText(null), 2000);
        })
        .catch(() => fallbackCopy(text, id));
    } else {
      fallbackCopy(text, id);
    }
  };

  const fallbackCopy = (text: string, id: string) => {
    const ta = document.createElement("textarea");
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      setCopiedText(id);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (e) {
      console.error("No se pudo copiar el texto", e);
    }
    document.body.removeChild(ta);
  };

  return (
    <div className="flex flex-col gap-10 py-6 animate-fade-in text-left">
      {/* Intro row */}
      <section className="border-b border-slate-100 pb-4">
        <h1 className="font-display text-2xl font-black text-brand-dark sm:text-3xl tracking-tight">
          Contacto y Cotizaciones Directas
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Para presupuestos, asesorías y cotizaciones sobre volumen, estamos a tu disposición. Contáctanos por WhatsApp o correo para una cotización inmediata.
        </p>
      </section>

      {/* Main split: LHS Cards + RHS Map embeddings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LHS Contact info cards (Roberto, Edgar, email) - col span 5 */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="bg-gradient-to-tr from-slate-50 to-white border border-slate-200/60 p-6 rounded-2xl shadow-sm flex flex-col gap-6">
            
            <div className="border-b border-slate-100 pb-3">
              <h2 className="font-display font-extrabold text-lg text-brand-blue flex items-center gap-2">
                <Phone className="h-5 w-5 text-brand-primary" /> Ventas y Soporte Técnico
              </h2>
              <p className="text-slate-400 text-[11px] mt-0.5">
                Nuestros agentes comerciales responderán a la brevedad.
              </p>
            </div>

            {/* Roberto Rodriguez */}
            <div className="flex flex-col gap-3 rounded-xl bg-slate-100/40 p-4 border border-slate-200/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex flex-col leading-snug">
                  <span className="font-bold text-brand-dark text-sm sm:text-base">
                    Roberto Rodriguez
                  </span>
                  <span className="font-mono text-xs text-brand-blue font-bold">
                    +52 561 752 4444
                  </span>
                </div>
                
                {/* Copy / WhatsApp controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyToClipboard("+52 561 752 4444", "roberto")}
                    className={`h-9 rounded-lg px-3 text-xs font-bold font-mono transition-colors border flex items-center gap-1 cursor-pointer ${
                      copiedText === "roberto"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-250"
                        : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {copiedText === "roberto" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copiedText === "roberto" ? "¡Copiado!" : "Copiar"}
                  </button>

                  <a
                    href="https://api.whatsapp.com/send?phone=525617524444&text=Buen+d%C3%ADa+%F0%9F%91%8B+Quisiera+informaci%C3%B3n+de+los+medicamentos+por+favor"
                    target="_blank"
                    rel="noreferrer"
                    className="h-9 rounded-lg bg-brand-primary hover:bg-brand-primary/95 text-white px-3 font-semibold text-xs flex items-center gap-1 shadow-sm shrink-0"
                  >
                    <MessageSquare className="h-3.5 w-3.5" /> WhatsApp
                  </a>
                </div>
              </div>

              {/* Roberto Facebook Profile */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-medium">Canal de Enlace:</span>
                <a
                  href="https://www.facebook.com/profile.php?id=61588056222189"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <Facebook className="h-3 w-3 inline shrink-0" /> Facebook Roberto
                </a>
              </div>
            </div>

            {/* Edgar Morales */}
            <div className="flex flex-col gap-3 rounded-xl bg-slate-100/40 p-4 border border-slate-200/30">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex flex-col leading-snug">
                  <span className="font-bold text-brand-dark text-sm sm:text-base">
                    Edgar Morales
                  </span>
                  <span className="font-mono text-xs text-brand-blue font-bold">
                    +52 553 500 1048
                  </span>
                </div>
                
                {/* Copy / WhatsApp controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyToClipboard("+52 553 500 1048", "edgar")}
                    className={`h-9 rounded-lg px-3 text-xs font-bold font-mono transition-colors border flex items-center gap-1 cursor-pointer ${
                      copiedText === "edgar"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-250"
                        : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {copiedText === "edgar" ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copiedText === "edgar" ? "¡Copiado!" : "Copiar"}
                  </button>

                  <a
                    href="https://api.whatsapp.com/send?phone=525535001048&text=Buen+d%C3%ADa+%F0%9F%91%8B+Quisiera+informaci%C3%B3n+de+los+medicamentos+por+favor"
                    target="_blank"
                    rel="noreferrer"
                    className="h-9 rounded-lg bg-brand-primary hover:bg-brand-primary/95 text-white px-3 font-semibold text-xs flex items-center gap-1 shadow-sm shrink-0"
                  >
                    <MessageSquare className="h-3.5 w-3.5" /> WhatsApp
                  </a>
                </div>
              </div>

              {/* Edgar Facebook Profile */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-medium">Canal de Enlace:</span>
                <a
                  href="https://www.facebook.com/farma.vet.lab"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <Facebook className="h-3 w-3 inline shrink-0" /> Facebook Edgar
                </a>
              </div>
            </div>

            {/* Email and Hours info row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-xs">
              
              {/* Mail Box */}
              <div className="flex flex-col gap-1.5 leading-snug">
                <span className="font-extrabold text-brand-blue uppercase font-mono tracking-wider text-[9px]">
                  Correo Electrónico:
                </span>
                <span className="font-medium text-slate-600 font-mono select-all">
                  ventas@biofarmexbodega.com.mx
                </span>
                <button
                  onClick={() => handleCopyToClipboard("ventas@biofarmexbodega.com.mx", "email")}
                  className={`flex items-center gap-1 text-[10px] w-fit font-bold cursor-pointer ${
                    copiedText === "email" ? "text-emerald-600" : "text-brand-primary hover:opacity-85"
                  }`}
                >
                  {copiedText === "email" ? "¡Copiado!" : "Copiar correo"}
                </button>
              </div>

              {/* Opening Hours */}
              <div className="flex flex-col gap-1 leading-snug">
                <span className="font-extrabold text-brand-blue uppercase font-mono tracking-wider text-[9px] flex items-center gap-1">
                  <Clock className="h-3 w-3 text-brand-primary inline" /> Horario comercial:
                </span>
                <span className="font-medium text-slate-600">
                  Lunes a Viernes
                </span>
                <span className="text-slate-400">
                  10:00 a.m. a 6:00 p.m.
                </span>
              </div>

            </div>

          </div>
        </div>

        {/* RHS Maps Embeds - col span 7 */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          
          {/* Oaxaca Office Bodega */}
          <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm flex flex-col items-stretch">
            <div className="bg-brand-blue p-4 text-white text-left">
              <h3 className="font-display font-extrabold text-base flex items-center gap-2">
                <MapPin className="h-5 w-5 text-brand-primary shrink-0" /> Bodega Principal en Oaxaca
              </h3>
              <p className="text-slate-300 text-[11px] mt-0.5">
                Consultas, entregas directas y compras al mayoreo integradas.
              </p>
            </div>
            
            {/* Map Frame */}
            <div className="w-full h-56 bg-slate-100">
              <iframe
                src="https://maps.google.com/maps?q=17.06439265505019,-96.7312298265827&z=19&output=embed"
                className="w-full h-full border-0 select-none"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            
            <div className="p-3 text-center bg-slate-50 border-t border-slate-100">
              <a
                href="https://maps.app.goo.gl/8nmkqRYH9HCnqnir9"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-brand-blue hover:text-brand-primary underline"
              >
                Abrir en Google Maps Oficial
              </a>
            </div>
          </div>

          {/* CDMX Bodega */}
          <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm flex flex-col items-stretch">
            <div className="bg-brand-blue p-4 text-white text-left">
              <h3 className="font-display font-extrabold text-base flex items-center gap-2">
                <MapPin className="h-5 w-5 text-brand-primary shrink-0" /> Bodega de Enlace en CDMX
              </h3>
              <p className="text-slate-300 text-[11px] mt-0.5">
                Punto estratégico de coordinación y despachos para el centro del país.
              </p>
            </div>
            
            {/* Map Frame */}
            <div className="w-full h-56 bg-slate-100">
              <iframe
                src="https://maps.google.com/maps?q=19.39220257460595,-99.02162528238152&z=19&output=embed"
                className="w-full h-full border-0 select-none"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            
            <div className="p-3 text-center bg-slate-50 border-t border-slate-100">
              <a
                href="https://maps.app.goo.gl/UamHxNRNQf9AAt3Z6"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-brand-blue hover:text-brand-primary underline"
              >
                Abrir en Google Maps CDMX
              </a>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
