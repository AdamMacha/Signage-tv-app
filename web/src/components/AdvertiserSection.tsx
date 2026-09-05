"use client";

import React from "react";
import {
  Sparkles,
  Layers,
  Repeat,
  Gauge,
  Video,
  ArrowRight,
  Target,
  BarChart3,
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
    <section id="inzerenti" className="py-24 relative bg-[#070a11] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Proposition & Copy */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Progresivní venkovní reklama</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
              Dostaňte svou značku{" "}
              <span className="text-gradient">přímo před oči zákazníků</span>.
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
              Běžné billboardy lidé míjejí v autě během vteřiny. Naše obrazovky jsou umístěné
              v interiérech, kde lidé sedí, relaxují a čekají – mají čas si vaši nabídku
              v klidu prohlédnout a reagovat na ni.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {perks.map((p, i) => {
                const PIcon = p.icon;
                return (
                  <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <PIcon className="w-5 h-5 text-cyan-400 mb-2" />
                    <h3 className="text-sm font-bold text-white mb-1">{p.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                  </div>
                );
              })}
            </div>

            <button
              onClick={scrollToAdvertiserForm}
              className="px-7 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-xl shadow-cyan-500/20 transition flex items-center gap-2 cursor-pointer"
            >
              <span>Chci nezávaznou nabídku kampaně</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right Column: Campaign Preview Dashboard Widget */}
          <div className="lg:col-span-6">
            <div className="glass-panel p-6 sm:p-8 border-cyan-500/20 relative overflow-hidden">
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                    Kampaňový report & metriky
                  </span>
                  <h3 className="text-lg font-bold text-white">Live distribuce spotů</h3>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active Loop
                </div>
              </div>

              {/* Sample Metrics Cards */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 text-center">
                  <span className="text-xs text-slate-400 block mb-1">Rotace / hod</span>
                  <span className="text-lg sm:text-xl font-black text-white">8–12×</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 text-center">
                  <span className="text-xs text-slate-400 block mb-1">Délka spotu</span>
                  <span className="text-lg sm:text-xl font-black text-cyan-400">10–30s</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 text-center">
                  <span className="text-xs text-slate-400 block mb-1">Doba nasazení</span>
                  <span className="text-lg sm:text-xl font-black text-emerald-400">&lt; 24 hod</span>
                </div>
              </div>

              {/* Broadcast Schedule Simulation Bar */}
              <div className="space-y-3">
                <span className="text-xs font-semibold text-slate-300 block">
                  Příklad vysílací smyčky (Play list loop):
                </span>
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span className="font-semibold text-white">Váš reklamní spot</span>
                  </div>
                  <span className="font-mono text-cyan-400">15 sec (Priorita 1)</span>
                </div>
                <div className="p-3 rounded-xl bg-black/20 border border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-slate-600" />
                    <span>Informativní obsah & počasí</span>
                  </div>
                  <span className="font-mono">10 sec</span>
                </div>
                <div className="p-3 rounded-xl bg-black/20 border border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-slate-600" />
                    <span>Partner sítě B</span>
                  </div>
                  <span className="font-mono">15 sec</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                <span>Plně měřitelný a transparentní provoz</span>
                <span className="text-cyan-400 font-semibold">100% garance přehrání</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
