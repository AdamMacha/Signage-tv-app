"use client";

import React from "react";
import {
  Coins,
  CheckCircle2,
  ArrowRight,
  Percent,
} from "lucide-react";

export const VenueHostSection: React.FC = () => {
  const steps = [
    {
      num: "1",
      title: "Domluvíme vhodné místo",
      desc: "Prohlédneme vaši provozovnu a společně vybereme pozici na zdi či stojanu, kde bude obrazovka vypadat skvěle a přirozeně.",
    },
    {
      num: "2",
      title: "Nainstalujeme zařízení",
      desc: "Dodáme špičkovou moderní TV obrazovku, bezpečně ji namontujeme a připojíme k našemu centrálnímu systému.",
    },
    {
      num: "3",
      title: "Zajistíme kompletní provoz",
      desc: "Veškerou techniku, obsah, synchronizaci spotů i případný servis řešíme my. Vy se nemusíte o nic starat.",
    },
    {
      num: "4",
      title: "Vy získáváte provizi",
      desc: "Každý měsíc vám vyplácíme smluvní provizi z reklamního vysílání. Získáváte stabilní pasivní příjem.",
    },
  ];

  const scrollToVenueForm = () => {
    const el = document.getElementById("lead-forms");
    if (el) {
      window.dispatchEvent(
        new CustomEvent("switch-lead-form", { detail: { type: "venue" } })
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
    <section id="prostory" className="py-24 relative border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow mb-3 flex items-center justify-center gap-2">
            <Coins className="w-3.5 h-3.5 text-[oklch(78%_0.13_84)]" />
            <span>Pasivní příjem pro váš podnik</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-normal mb-4">
            Máte prostor. <span className="italic text-gold-gradient">My máme obrazovku.</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Proměňte prázdnou zeď ve vaší kavárně, hotelu, čekárně nebo posilovně ve stálý
            zdroj příjmů. Bez počátečních investic a bez jakýchkoli starostí.
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="glass-card bg-surface p-6 border-border flex flex-col justify-between hover:border-[oklch(78%_0.13_84)]/40 transition-all group"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[oklch(78%_0.13_84)]/10 border border-[oklch(78%_0.13_84)]/25 text-[oklch(78%_0.13_84)] font-mono font-bold flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  0{s.num}
                </div>
                <h3 className="text-base font-bold text-white mb-2 tracking-tight">
                  {s.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {s.desc}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-border/40 flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono">
                <CheckCircle2 className="w-3.5 h-3.5 text-[oklch(78%_0.13_84)]" />
                <span>Garance profesionality</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner with Key Assurances */}
        <div className="glass-panel p-8 sm:p-10 border-[oklch(78%_0.13_84)]/25 flex flex-col md:flex-row items-center justify-between gap-8 bg-surface">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[oklch(78%_0.13_84)] font-mono uppercase tracking-wider mb-1">
              <Percent className="w-4 h-4" />
              <span>Nulové počáteční náklady & nulové riziko</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-medium text-white tracking-normal">
              Máte vhodný prostor? Zjistěte nezávazně výši vaší měsíční provize.
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Ozvěte se nám a my spočítáme odhadovanou provizi podle typu prostoru a jeho
              návštěvnosti. Instalaci i zařízení hradíme my.
            </p>
          </div>

          <button
            onClick={scrollToVenueForm}
            className="shrink-0 px-8 py-4 rounded-none bg-[oklch(78%_0.13_84)] hover:bg-[oklch(85%_0.09_85)] text-black font-semibold text-xs uppercase tracking-widest transition flex items-center gap-2 cursor-pointer shadow-lg shadow-[oklch(78%_0.13_84)]/15"
          >
            <span>Nabídnout prostor pro TV</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
