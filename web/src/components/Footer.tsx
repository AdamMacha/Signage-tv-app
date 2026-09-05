"use client";

import React, { useState } from "react";
import { Tv, Mail, MapPin, Lock, ArrowUpRight, X } from "lucide-react";

export const Footer: React.FC = () => {
  const [legalModal, setLegalModal] = useState<"privacy" | "terms" | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
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
    <footer className="bg-[#0e0e0d] border-t border-border pt-16 pb-12 text-muted-foreground relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[oklch(78%_0.13_84)] to-[oklch(65%_0.16_70)] p-[1px] shadow-lg shadow-[oklch(78%_0.13_84)]/15">
                <div className="w-full h-full bg-[#171615] rounded-[11px] flex items-center justify-center">
                  <Tv className="w-5 h-5 text-[oklch(78%_0.13_84)]" />
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                ALION <span className="text-gold-gradient">Advert</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground max-w-sm leading-relaxed">
              Prémiová platforma pro digitální venkovní reklamu. Propojujeme inzerenty
              hledající reálné zákazníky s provozovateli frekventovaných lokalit.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-muted-foreground font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[oklch(78%_0.13_84)] animate-pulse" />
                <span className="text-slate-300 font-medium">Síť aktivní 24/7</span>
              </div>
              <span>•</span>
              <span>Full HD / 4K Broadcast</span>
            </div>
          </div>

          {/* Col 2: Pro inzerenty */}
          <div className="space-y-3">
            <h4 className="eyebrow !text-[11px] block text-white">
              Pro inzerenty
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollTo("inzerenti")}
                  className="hover:text-[oklch(78%_0.13_84)] transition cursor-pointer"
                >
                  Přehled kampaní
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("proc-digital-signage")}
                  className="hover:text-[oklch(78%_0.13_84)] transition cursor-pointer"
                >
                  Výhody digital signage
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("sit-obrazovek")}
                  className="hover:text-[oklch(78%_0.13_84)] transition cursor-pointer"
                >
                  Lokality a města
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("lead-forms")}
                  className="text-[oklch(78%_0.13_84)] hover:text-[oklch(85%_0.09_85)] font-semibold transition cursor-pointer flex items-center gap-1"
                >
                  <span>Kalkulace kampaně</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Pro majitele prostor */}
          <div className="space-y-3">
            <h4 className="eyebrow !text-[11px] block text-white">
              Pro majitele prostor
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollTo("prostory")}
                  className="hover:text-[oklch(78%_0.13_84)] transition cursor-pointer"
                >
                  Jak funguje provize
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("prostory")}
                  className="hover:text-[oklch(78%_0.13_84)] transition cursor-pointer"
                >
                  Podporované typy provozoven
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("faq")}
                  className="hover:text-[oklch(78%_0.13_84)] transition cursor-pointer"
                >
                  Náklady a instalace (0 Kč)
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("lead-forms")}
                  className="text-[oklch(78%_0.13_84)] hover:text-[oklch(85%_0.09_85)] font-semibold transition cursor-pointer flex items-center gap-1"
                >
                  <span>Nabídnout prostor</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Kontakt & Správa */}
          <div className="space-y-3">
            <h4 className="eyebrow !text-[11px] block text-white">
              Kontakt & Podpora
            </h4>
            <div className="space-y-2 text-xs">
              <a
                href="mailto:info@alionadvert.cz"
                className="flex items-center gap-2 hover:text-white transition"
              >
                <Mail className="w-3.5 h-3.5 text-[oklch(78%_0.13_84)] shrink-0" />
                <span>info@alionadvert.cz</span>
              </a>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-[oklch(78%_0.13_84)] shrink-0" />
                <span>Praha & celá ČR</span>
              </div>
            </div>

            <div className="pt-4">
              <a
                href="https://alionadvert-admin.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-surface-elevated border border-border hover:border-[oklch(78%_0.13_84)]/40 text-muted-foreground hover:text-white text-[11px] font-mono transition"
              >
                <Lock className="w-3 h-3 text-[oklch(78%_0.13_84)]" />
                <span>Admin Hub</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} ALION Advert. Všechna práva vyhrazena.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setLegalModal("privacy")}
              className="hover:text-[oklch(78%_0.13_84)] transition cursor-pointer"
            >
              Ochrana osobních údajů (GDPR)
            </button>
            <button
              onClick={() => setLegalModal("terms")}
              className="hover:text-[oklch(78%_0.13_84)] transition cursor-pointer"
            >
              Obchodní podmínky
            </button>
          </div>
        </div>
      </div>

      {/* Modal pro GDPR a Podmínky */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="glass-panel p-6 sm:p-8 max-w-xl w-full bg-[#181817] border-border max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/60">
              <h3 className="font-display text-2xl font-medium text-white">
                {legalModal === "privacy"
                  ? "Zásady ochrany osobních údajů (GDPR)"
                  : "Všeobecné obchodní podmínky"}
              </h3>
              <button
                onClick={() => setLegalModal(null)}
                className="p-1 rounded-sm hover:bg-surface text-muted-foreground hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs sm:text-sm text-muted-foreground space-y-3 leading-relaxed">
              {legalModal === "privacy" ? (
                <>
                  <p>
                    Vážíme si vašeho soukromí. Veškeré údaje, které nám poskytnete prostřednictvím
                    kontaktních a poptávkových formulářů (jméno, telefon, e-mail, název firmy,
                    lokalita), zpracováváme v souladu s Nařízením Evropského parlamentu a Rady (EU)
                    2016/679 (GDPR).
                  </p>
                  <p>
                    <strong>Účel zpracování:</strong> Údaje jsou využívány výhradně za účelem přípravy
                    cenové nabídky na reklamní kampaň nebo posouzení vhodnosti prostoru pro instalaci
                    reklamní obrazovky a související komunikace s vámi.
                  </p>
                  <p>
                    Vaše údaje nikdy neprodáváme ani neposkytujeme neoprávněným třetím stranám.
                    Máte právo kdykoliv požádat o výpis, opravu nebo výmaz vašich osobních údajů
                    zasláním žádosti na e-mail info@alionadvert.cz.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    ALION Advert poskytuje technologické a mediální služby v oblasti digitální
                    reklamy (digital signage).
                  </p>
                  <p>
                    <strong>Pro inzerenty:</strong> Parametry kampaně, délka trvání, frekvence
                    rotace spotů a cena jsou vždy specifikovány v individuální objednávce nebo smlouvě.
                    Zadavatel odpovídá za obsah dodaného reklamního materiálu a za soulad s platnými
                    zákony ČR.
                  </p>
                  <p>
                    <strong>Pro provozovatele prostor:</strong> Umístění obrazovky a výše měsíční
                    provize jsou sjednávány ve smlouvě o spolupráci. ALION Advert nese odpovědnost
                    za dodání, montáž, technickou údržbu a pojištění zařízení.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-border/40 flex justify-end">
              <button
                onClick={() => setLegalModal(null)}
                className="px-6 py-2.5 rounded-none bg-[oklch(78%_0.13_84)] text-black text-xs font-bold uppercase tracking-wider hover:bg-[oklch(85%_0.09_85)] transition"
              >
                Rozumím a zavřít
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
