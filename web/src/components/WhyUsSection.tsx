import React from "react";
import {
  Cpu,
  MapPin,
  Clock,
  RefreshCw,
  Target,
  FileCheck2,
  Shield,
  Zap,
} from "lucide-react";

export const WhyUsSection: React.FC = () => {
  const benefits = [
    {
      icon: Cpu,
      title: "Moderní technologie",
      desc: "Naše obrazovky běží na vlastním stabilním klientském OS s cloudovou synchronizací v reálném čase a 99.9% dostupností.",
    },
    {
      icon: MapPin,
      title: "Strategická místa",
      desc: "Pečlivě vybíráme lokality s reálnou a přirozenou návštěvností, kde mají zákazníci čas vaše sdělení vnímat.",
    },
    {
      icon: Clock,
      title: "Bleskové spuštění",
      desc: "Zatímco tisk a výlep billboardu trvá týdny, u nás může vaše kampaň běžet už do 24 hodin od dodání podkladů.",
    },
    {
      icon: RefreshCw,
      title: "Flexibilní změny obsahu",
      desc: "Změnila se vám nabídka nebo máte novou akci? Výměnu spotu provedeme vzdáleně během několika minut.",
    },
    {
      icon: Target,
      title: "Úzké lokální cílení",
      desc: "Neplaťte za lidi na druhém konci republiky, pokud máte lokální firmu. Cílíme přesně tam, kde působíte.",
    },
    {
      icon: FileCheck2,
      title: "Transparentní spolupráce",
      desc: "Jasné smlouvy, férové provize pro majitele prostor a přehledné statistiky přehrávání pro inzerenty.",
    },
  ];

  return (
    <section className="py-24 relative bg-[#070a11] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Naše standardy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Proč spolupracovat s <span className="text-gradient">ALION Advert</span>?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Kombinujeme špičkový technologický hardware a software s individuálním přístupem
            ke každému partnerovi i inzerentovi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, idx) => {
            const BIcon = b.icon;
            return (
              <div
                key={idx}
                className="glass-card p-7 border-white/10 flex flex-col justify-between hover:border-cyan-500/30 transition-all group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                    <BIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                    {b.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
