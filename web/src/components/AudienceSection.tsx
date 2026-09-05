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
  Coins,
} from "lucide-react";

export const AudienceSection: React.FC = () => {
  const venues = [
    { name: "Kavárny & Bistra", icon: Coffee },
    { name: "Fitness & Gyms", icon: Dumbbell },
    { name: "Hotely & Penziony", icon: Hotel },
    { name: "Čekárny & Kliniky", icon: Stethoscope },
    { name: "Autoservisy", icon: Car },
    { name: "Salony & Barber", icon: Sparkles },
    { name: "Obchody & Showroomy", icon: ShoppingBag },
    { name: "Recepce & Office", icon: Building2 },
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
    <section id="pro-koho" className="py-24 relative border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow mb-3">
            Dvě strany jedné sítě
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-normal mb-4">
            Pro koho je <span className="italic text-gold-gradient">ALION Advert</span>?
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Ať už chcete získat novou vlnu zákazníků, nebo zhodnotit prostor vaší provozovny,
            máme pro vás efektivní a transparentní řešení.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card A: Inzerenti */}
          <div className="glass-panel p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between border-[oklch(78%_0.13_84)]/20 hover:border-[oklch(78%_0.13_84)]/40 transition-all duration-300 group bg-surface">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[oklch(78%_0.13_84)]/5 blur-[100px] pointer-events-none rounded-full" />

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-[oklch(78%_0.13_84)]/10 border border-[oklch(78%_0.13_84)]/25 flex items-center justify-center text-[oklch(78%_0.13_84)]">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <span className="eyebrow !text-[10px] block mb-1">
                    Pro firmy a inzerenty
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-medium text-white tracking-normal">
                    Chcete být vidět tam, kde jsou zákazníci?
                  </h3>
                </div>
              </div>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                Dostaňte svou firmu, produkt nebo službu na obrazovky přímo v místech,
                kde se vaši cíloví zákazníci denně zdržují. Zvyšte povědomí o své značce
                a přiveďte nové klienty bez plýtvání rozpočtem na online bannerovou slepotu.
              </p>

              <div className="space-y-3 mb-8">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[oklch(78%_0.13_84)] mt-2 shrink-0" />
                  <span>Cílení na konkrétní města a typy provozoven (kavárny, fitness, hotely...)</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[oklch(78%_0.13_84)] mt-2 shrink-0" />
                  <span>Stovky přehrání denně v rotační smyčce ve vysokém 4K rozlišení</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[oklch(78%_0.13_84)] mt-2 shrink-0" />
                  <span>Flexibilní rozpočty i pro menší a střední lokální podniky</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => scrollToForms("advertiser")}
              className="w-full sm:w-auto px-8 py-4 rounded-none bg-[oklch(78%_0.13_84)] hover:bg-[oklch(85%_0.09_85)] text-black font-semibold text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[oklch(78%_0.13_84)]/15"
            >
              <span>Chci reklamní kampaň</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Card B: Majitelé prostor */}
          <div className="glass-panel p-8 sm:p-12 relative overflow-hidden flex flex-col justify-between border-border hover:border-[oklch(78%_0.13_84)]/40 transition-all duration-300 group bg-surface">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[oklch(78%_0.13_84)]/5 blur-[100px] pointer-events-none rounded-full" />

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-surface-elevated border border-border flex items-center justify-center text-[oklch(78%_0.13_84)]">
                  <Coins className="w-6 h-6" />
                </div>
                <div>
                  <span className="eyebrow !text-[10px] block mb-1">
                    Pro provozovatele prostor
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-medium text-white tracking-normal">
                    Máte místo, kde se denně pohybují lidé?
                  </h3>
                </div>
              </div>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
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
                      className="p-2.5 rounded-lg bg-surface-elevated border border-border/60 flex items-center gap-2 text-[11px] text-slate-300"
                    >
                      <VIcon className="w-3.5 h-3.5 text-[oklch(78%_0.13_84)] shrink-0" />
                      <span className="truncate">{v.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => scrollToForms("venue")}
              className="w-full sm:w-auto px-8 py-4 rounded-none bg-surface-elevated hover:bg-surface border border-border hover:border-[oklch(78%_0.13_84)]/50 text-[oklch(96%_0.01_80)] font-semibold text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Chci nabídnout prostor pro TV</span>
              <ArrowRight className="w-4 h-4 text-[oklch(78%_0.13_84)]" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
