"use client";

import React from "react";
import {
  Sparkles,
  Layers,
  Repeat,
  Video,
  ArrowRight,
  Target,
} from "lucide-react";

export const AdvertiserSection: React.FC = () => {
  const perks = [
    {
      icon: Target,
      title: "Přesné zacílení",
      desc: "Oslovte publikum přesně podle životního stylu – sportovce v gymu, profesionály v business kavárně nebo rodiny v bistru.",
    },
    {
      icon: Repeat,
      title: "Frekvence a opakování",
      desc: "Spot se přehrává ve vyvážené rotační smyčce několikrát za hodinu, což zaručuje vysoké zapamatování vašeho sdělení.",
    },
    {
      icon: Layers,
      title: "Kombinace více lokalit",
      desc: "Zvolte si jednu strategickou provozovnu nebo celou síť napříč městem pro maximální dominanci v dané oblasti.",
    },
    {
      icon: Video,
      title: "Flexibilní formáty spotů",
      desc: "Podpora videí i statických animovaných vizuálů (10s, 15s i 30s formáty) s krystalicky čistým obrazem.",
    },
  ];

  const scrollToAdvertiserForm = () => {
    const el = document.getElementById("lead-forms");
    if (el) {
      window.dispatchEvent(
        new CustomEvent("switch-lead-form", { detail: { type: "advertiser" } })
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
    <section id="inzerenti" className="py-24 relative bg-surface/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Proposition & Copy */}
          <div className="lg:col-span-6">
            <div className="eyebrow mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[oklch(78%_0.13_84)]" />
              <span>Progresivní venkovní reklama</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white tracking-normal mb-6 leading-[1.1]">
              Dostaňte svou značku{" "}
              <span className="italic text-gold-gradient">přímo před oči zákazníků</span>.
            </h2>

            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">
              Běžné billboardy lidé míjejí v autě během vteřiny. Naše obrazovky jsou umístěné
              v interiérech, kde lidé sedí, relaxují a čekají – mají čas si vaši nabídku
              v klidu prohlédnout a reagovat na ni.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {perks.map((p, i) => {
                const PIcon = p.icon;
                return (
                  <div key={i} className="p-4 rounded-xl bg-surface border border-border">
                    <PIcon className="w-5 h-5 text-[oklch(78%_0.13_84)] mb-2" />
                    <h3 className="text-sm font-bold text-white mb-1">{p.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                );
              })}
            </div>

            <button
              onClick={scrollToAdvertiserForm}
              className="px-8 py-4 rounded-none bg-[oklch(78%_0.13_84)] hover:bg-[oklch(85%_0.09_85)] text-black font-semibold text-xs uppercase tracking-widest transition flex items-center gap-2 cursor-pointer shadow-lg shadow-[oklch(78%_0.13_84)]/15"
            >
              <span>Chci nezávaznou nabídku kampaně</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column: Campaign Preview Dashboard Widget */}
          <div className="lg:col-span-6">
            <div className="glass-panel bg-surface p-6 sm:p-8 border-border relative overflow-hidden">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-border/40">
                <div>
                  <span className="eyebrow !text-[10px] block mb-1">
                    Kampaňový report & metriky
                  </span>
                  <h3 className="font-display text-2xl font-medium text-white">Live distribuce spotů</h3>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[oklch(78%_0.13_84)]/10 border border-[oklch(78%_0.13_84)]/25 text-[11px] text-[oklch(78%_0.13_84)] font-mono font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[oklch(78%_0.13_84)] animate-pulse" />
                  Active Loop
                </div>
              </div>

              {/* Metrics Cards */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
                <div className="p-3.5 rounded-xl bg-surface-elevated border border-border/40 text-center">
                  <span className="text-xs text-muted-foreground block mb-1 font-mono">Rotace / hod</span>
                  <span className="text-lg sm:text-xl font-bold text-white">8–12×</span>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-elevated border border-border/40 text-center">
                  <span className="text-xs text-muted-foreground block mb-1 font-mono">Délka spotu</span>
                  <span className="text-lg sm:text-xl font-bold text-[oklch(78%_0.13_84)]">10–30s</span>
                </div>
                <div className="p-3.5 rounded-xl bg-surface-elevated border border-border/40 text-center">
                  <span className="text-xs text-muted-foreground block mb-1 font-mono">Doba nasazení</span>
                  <span className="text-lg sm:text-xl font-bold text-[oklch(85%_0.09_85)]">&lt; 24 hod</span>
                </div>
              </div>

              {/* Broadcast Schedule Simulation Bar */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-slate-300 block font-mono">
                  Příklad vysílací smyčky (Play list loop):
                </span>
                <div className="p-3.5 rounded-xl bg-black/40 border border-[oklch(78%_0.13_84)]/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[oklch(78%_0.13_84)]" />
                    <span className="font-semibold text-white">Váš reklamní spot</span>
                  </div>
                  <span className="font-mono text-[oklch(78%_0.13_84)]">15 sec (Priorita 1)</span>
                </div>
                <div className="p-3.5 rounded-xl bg-black/20 border border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-slate-600" />
                    <span>Informativní obsah & počasí</span>
                  </div>
                  <span className="font-mono">10 sec</span>
                </div>
                <div className="p-3.5 rounded-xl bg-black/20 border border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-slate-600" />
                    <span>Partner sítě B</span>
                  </div>
                  <span className="font-mono">15 sec</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                <span>Plně měřitelný a transparentní provoz</span>
                <span className="text-[oklch(78%_0.13_84)] font-semibold">100% garance přehrání</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
