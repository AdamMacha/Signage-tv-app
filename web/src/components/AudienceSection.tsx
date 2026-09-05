"use client";

import React from "react";
import {
  Building2,
  Briefcase,
  ArrowRight,
  Coffee,
  Dumbbell,
  Hotel,
  Stethoscope,
  Car,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Coins,
} from "lucide-react";

export const AudienceSection: React.FC = () => {
  const venues = [
    { name: "Kavárny & Bistra", icon: Coffee },
    { name: "Fitness & Gyms", icon: Dumbbell },
    { name: "Hotely & Penziony", icon: Hotel },
    { name: "Čekárny & Kliniky", icon: Stethoscope },
    { name: "Autoservisy & Pneuservisy", icon: Car },
    { name: "Salony & Barber shopy", icon: Sparkles },
    { name: "Obchody & Showroomy", icon: ShoppingBag },
    { name: "Recepce & Kanceláře", icon: Building2 },
  ];

  const scrollToForms = (targetType: "advertiser" | "venue") => {
    const el = document.getElementById("lead-forms");
    if (el) {
      window.dispatchEvent(
        new CustomEvent("switch-lead-form", { detail: { type: targetType } })
      );
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="pro-koho" className="py-24 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-4">
            <span>Dvě strany jedné sítě</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Pro koho je <span className="text-gradient">ALION Advert</span>?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Ať už chcete získat nové platící zákazníky, nebo zhodnotit prostor vaší provozovny,
            máme pro vás řešení.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card A: Inzerenti */}
          <div className="glass-panel p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    Pro firmy a inzerenty
                  </span>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Chcete být vidět tam, kde jsou zákazníci?
                  </h3>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Dostaňte svou firmu, produkt nebo službu na obrazovky přímo v místech,
                kde se vaši cíloví zákazníci denně zdržují. Zvyšte povědomí o své značce
                a přiveďte nové klienty bez plýtvání rozpočtem.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <span>Cílení na konkrétní města a typy provozoven (kavárny, fitness, hotely...)</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <span>Stovky přehrání denně v rotační smyčce ve vysokém rozlišení</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-2 shrink-0" />
                  <span>Flexibilní rozpočty i pro menší a střední lokální podniky</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => scrollToForms("advertiser")}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-cyan-500/20 transition flex items-center justify-center gap-2 cursor-pointer group-hover:shadow-cyan-500/35"
            >
              <span>Chci reklamní kampaň</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card B: Majitelé prostor */}
          <div className="glass-panel p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-300 group">
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-[100px] pointer-events-none rounded-full" />

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400">
                  <Coins className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                    Pro majitele a provozovatele prostor
                  </span>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Máte místo, kde se denně pohybují lidé?
                  </h3>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Získejte pravidelný pasivní příjem. Umístíme k vám do provozovny moderní
                televizní obrazovku, zajistíme kompletní instalaci i technický servis
                a vy každý měsíc inkasujete provizi z běžící reklamy.
              </p>

              {/* Venue pills grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
                {venues.map((v, i) => {
                  const VIcon = v.icon;
                  return (
                    <div
                      key={i}
                      className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center gap-2 text-[11px] text-slate-300"
                    >
                      <VIcon className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      <span className="truncate">{v.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => scrollToForms("venue")}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-white/10 hover:border-white/25 text-white font-semibold text-sm transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Chci nabídnout prostor pro TV</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
