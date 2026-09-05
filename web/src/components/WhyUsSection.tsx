import React from "react";
import {
  Cpu,
  MapPin,
  Clock,
  RefreshCw,
  Target,
  FileCheck2,
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
    <section className="py-24 relative bg-surface/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow mb-3 flex items-center justify-center gap-2">
            <Zap className="w-3.5 h-3.5 text-[oklch(78%_0.13_84)]" />
            <span>Naše standardy</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-normal mb-4">
            Proč spolupracovat s <span className="italic text-gold-gradient">ALION Advert</span>?
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Kombinujeme špičkový hardware a software s individuálním přístupem
            ke každému partnerovi i inzerentovi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, idx) => {
            const BIcon = b.icon;
            return (
              <div
                key={idx}
                className="glass-card bg-surface p-8 border-border flex flex-col justify-between hover:border-[oklch(78%_0.13_84)]/40 transition-all group"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-surface-elevated border border-border flex items-center justify-center text-[oklch(78%_0.13_84)] mb-5 group-hover:scale-110 transition-transform">
                    <BIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                    {b.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
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
