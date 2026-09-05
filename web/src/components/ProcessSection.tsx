import React from "react";
import { UploadCloud, Network, Eye, ArrowRight } from "lucide-react";

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Vyberete si kampaň",
      description:
        "Pošlete nám svůj reklamní spot nebo statický vizuál. Zvolíte si cílové lokality, typ provozoven a požadovanou délku vysílání.",
      icon: UploadCloud,
      gradient: "from-cyan-500/20 to-blue-500/10",
      accentColor: "#06b6d4",
      highlight: "Okamžité spuštění bez tiskových nákladů",
    },
    {
      number: "02",
      title: "Dostaneme ji na správná místa",
      description:
        "Váš spot vzdáleně nahrajeme a synchronizujeme s naší chytrou sítí televizních obrazovek v kavárnách, fitness centrech, čekárnách i hotelech.",
      icon: Network,
      gradient: "from-indigo-500/20 to-purple-500/10",
      accentColor: "#6366f1",
      highlight: "Cloudový broadcast v reálném čase",
    },
    {
      number: "03",
      title: "Vaše značka je skutečně vidět",
      description:
        "Reklama se v plynulé rotační smyčce opakovaně přehrává přímo před očima vašich potenciálních zákazníků v prémiové Full HD / 4K kvalitě.",
      icon: Eye,
      gradient: "from-emerald-500/20 to-teal-500/10",
      accentColor: "#10b981",
      highlight: "Stovky opakování a tisíce zhlédnutí denně",
    },
  ];

  return (
    <section id="jak-to-funguje" className="py-24 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-4">
            <span>Jednoduchý a rychlý proces</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Jak funguje naše <span className="text-gradient">reklamní síť</span>?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Od vašeho nápadu po vysílání na desítkách obrazovek dělí vaši firmu
            jen tři jednoduché kroky.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-emerald-500/30 -translate-y-12 z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="glass-panel p-8 relative z-10 flex flex-col justify-between hover:border-white/20 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-4xl font-black tracking-tight text-white/20 group-hover:text-cyan-400/40 transition-colors font-mono">
                      {step.number}
                    </span>
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${step.gradient} border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-medium text-slate-400">
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: step.accentColor }}
                  />
                  <span>{step.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
