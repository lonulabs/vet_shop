import React from "react";
import { ShieldCheck, Target, Rocket, Award, HeartHandshake, Eye, Landmark } from "lucide-react";

interface AboutViewProps {
  onNavigateToCatalog: () => void;
}

export default function AboutView({ onNavigateToCatalog }: AboutViewProps) {
  const companyValues = [
    {
      icon: <Award className="h-6 w-6 text-brand-primary" />,
      title: "Calidad de Patente",
      desc: "Excelente composición en cada producto, garantizando los más altos estándares regulatorios de la industria.",
    },
    {
      icon: <Rocket className="h-6 w-6 text-brand-primary" />,
      title: "Innovación Continua",
      desc: "Investigación y desarrollo constante para acercarte las soluciones veterinarias de vanguardia.",
    },
    {
      icon: <HeartHandshake className="h-6 w-6 text-brand-primary" />,
      title: "Alianza y Confianza",
      desc: "Trato directo y transparente con ganaderos, clínicas y asociaciones ganaderas del país.",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-brand-primary" />,
      title: "Sostenibilidad",
      desc: "Fomento de prácticas y suplementos que protegen el bienestar animal y minimizan residuos nocivos.",
    },
    {
      icon: <Target className="h-6 w-6 text-brand-primary" />,
      title: "Eficiencia Logística",
      desc: "Procesos optimizados de empaque y distribución nacional para garantizar la llegada expedita de tus pedidos.",
    },
    {
      icon: <Landmark className="h-6 w-6 text-brand-primary" />,
      title: "Dedicación Profesional",
      desc: "Ampliamos constantemente nuestro portafolio de patentes respaldado por asesores técnicos de primer nivel.",
    },
  ];

  return (
    <div className="flex flex-col gap-10 py-6 animate-fade-in text-left">
      {/* 1. Header Hero section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-brand-blue to-brand-navy p-8 md:p-12 text-white shadow-xl text-center">
        <div className="max-w-2xl mx-auto flex flex-col gap-3">
          <span className="text-xs font-mono tracking-widest text-brand-primary uppercase font-bold bg-white/10 px-3 py-1 rounded-full w-fit mx-auto backdrop-blur-sm">
            Sobre Nosotros
          </span>
          <h1 className="font-display text-3xl font-black md:text-4xl tracking-tight leading-tight">
            Biofarmex Bodega
          </h1>
          <p className="text-sm md:text-base leading-relaxed text-slate-200">
            Líderes en innovación, distribución y calidad de medicamentos farmacéuticos veterinarios con años de compromiso real enfocados en potenciar la salud y productividad animal.
          </p>
        </div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-48 bg-brand-primary/20 blur-[100px] rounded-full pointer-events-none" />
      </section>

      {/* 2. Embedded Video Section */}
      <section className="flex flex-col gap-4 text-center">
        <h2 className="font-display text-2xl font-black text-brand-dark tracking-tight">
          ¿Quiénes Somos?
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm max-w-lg mx-auto">
          Conoce nuestra filosofía corporativa y la planta de fabricación de última generación.
        </p>

        {/* Responsive, modern video player aspect grid overlay */}
        <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-2xl bg-slate-950 shadow-lg border border-slate-200/50">
          <div className="aspect-video w-full">
            <iframe
              src="https://www.youtube.com/embed/gEUXs5niUes"
              title="BIOFARMEX ¿Quiénes Somos?"
              className="h-full w-full border-0 select-none"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 3. Mission and Vision grid items */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mission card */}
        <div className="group rounded-2xl bg-white border border-slate-200/60 p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-primary/20 flex flex-col gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-brand-primary">
            <Target className="h-6 w-6" />
          </div>
          <h3 className="font-display text-xl font-bold text-brand-dark">
            🎯 Nuestra Misión
          </h3>
          <p className="text-sm leading-relaxed text-slate-500">
            Somos una empresa nacional comprometida firmemente en impulsar la sustentabilidad y rentabilidad del sector ganadero y veterinario. Fabricamos y comercializamos productos e insumos farmacéuticos de la más alta calidad, con el fin primordial de salvaguardar el bienestar animal y asegurar el éxito de nuestros productores.
          </p>
        </div>

        {/* Vision card */}
        <div className="group rounded-2xl bg-white border border-slate-200/60 p-6 md:p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:border-brand-primary/20 flex flex-col gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-brand-blue">
            <Eye className="h-6 w-6" />
          </div>
          <h3 className="font-display text-xl font-bold text-brand-dark">
            🚀 Nuestra Visión
          </h3>
          <p className="text-sm leading-relaxed text-slate-500">
            Es consolidarnos como el laboratorio veterinario de referencia, líder indiscutible en distribución directa y patentes de excelencia veterinaria. Proporcionamos un catálogo de soluciones integrales que elevan sustancialmente los estándares de salud y productividad agropecuaria en cada estado del país.
          </p>
        </div>
      </section>

      {/* 4. Company core values grid */}
      <section className="flex flex-col gap-6 rounded-3xl bg-slate-50 border border-slate-100 p-6 md:p-8">
        <div className="text-center max-w-2xl mx-auto flex flex-col gap-1.5">
          <span className="text-xs font-bold text-brand-blue uppercase tracking-widest">
            Pilares Organizacionales
          </span>
          <h2 className="font-display text-2xl font-black text-brand-dark tracking-tight">
            Nuestros Valores
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm">
            La base ética y técnica de todas nuestras acciones diarias con el hato de ganado y tus mascotas domésticas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {companyValues.map((value, idx) => (
            <div
              key={idx}
              className="group flex flex-col gap-3 rounded-2xl bg-white border border-slate-200/40 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 transition-colors group-hover:bg-brand-primary/5">
                {value.icon}
              </div>
              <h4 className="font-bold text-brand-dark text-sm sm:text-base tracking-tight leading-snug group-hover:text-brand-blue transition-colors">
                {value.title}
              </h4>
              <p className="text-xs text-slate-400 group-hover:text-slate-500 transition-colors leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Clean Commitment / CTA Banner */}
      <section className="flex flex-col items-center justify-between text-center gap-4 rounded-3xl bg-gradient-to-r from-brand-primary/10 to-brand-blue/5 border border-brand-primary/20 p-8">
        <div className="flex flex-col gap-2 max-w-md">
          <h3 className="font-display font-extrabold text-xl text-brand-dark">
            ¿Listo para optimizar la salud de tu ganadería?
          </h3>
          <p className="text-xs leading-relaxed text-slate-500">
            Descubre nuestro catálogo de farmacia veterinaria de calidad comercial para rumiantes, porcinos, aves y cachorros.
          </p>
        </div>
        <button
          onClick={onNavigateToCatalog}
          className="bg-brand-primary hover:bg-brand-primary/95 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg shadow-brand-primary/15 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
        >
          Ver Catálogo Completo
        </button>
      </section>
    </div>
  );
}
