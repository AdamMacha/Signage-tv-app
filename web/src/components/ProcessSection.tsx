import React from "react";
import { UploadCloud, Network, Eye } from "lucide-react";

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Vyberete si kampaň",
      description:
        "Pošlete nám svůj reklamní spot nebo statický vizuál. Zvolíte si cílové lokality, typ provozoven a požadovanou délku vysílání.",
      icon: UploadCloud,
      highlight: "Okamžité spuštění bez tiskových nákladů",
    },
    {
      number: "02",
      title: "Dostaneme ji na správná místa",
      description:
        "Váš spot vzdáleně nahrajeme a synchronizujeme s naší chytrou sítí televizních obrazovek v kavárnách, fitness centrech, čekárnách i hotelech.",
      icon: Network,
      highlight: "Cloudový broadcast v reálném čase",
    },
    {
      number: "03",
      title: "Vaše značka je skutečně vidět",
      description:
        "Reklama se v plynulé rotační smyčce opakovaně přehrává přímo před očima vašich potenciálních zákazníků v prémiové Full HD / 4K kvalitě.",
      icon: Eye,
      highlight: "Stovky opakování a tisíce zhlédnutí denně",
    },
  ];

  return (
    <section id="jak-to-funguje" className="py-24 relative border-t border-[oklch(28%_0.008_70/0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow mb-3">
            Jednoduchý a rychlý proces
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-normal mb-4">
            Jak funguje naše <span className="italic text-gold-gradient">reklamní síť</span>?
          </h2>
          <p className="text-[oklch(65%_0.01_70)] text-base sm:text-lg">
            Od vašeho nápadu po vysílání na desítkách obrazovek dělí vaši firmu
            jen tři jednoduché kroky.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting Gold Line (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-[oklch(78%_0.13_84)]/35 to-transparent -translate-y-12 z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="glass-card bg-surface p-8 relative z-10 flex flex-col justify-between hover:border-[oklch(78%_0.13_84)]/40 transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-4xl font-mono font-bold tracking-tight text-[oklch(78%_0.13_84)]/30 group-hover:text-[oklch(78%_0.13_84)] transition-colors">
                      {step.number}
                    </span>
                    <div className="w-12 h-12 rounded-xl bg-[oklch(78%_0.13_84)]/10 border border-[oklch(78%_0.13_84)]/25 flex items-center justify-center text-[oklch(78%_0.13_84)] shadow-lg group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-sm text-[oklch(65%_0.01_70)] leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[oklch(28%_0.008_70/0.4)] flex items-center gap-2 text-xs font-medium text-[oklch(65%_0.01_70)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[oklch(78%_0.13_84)]" />
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
