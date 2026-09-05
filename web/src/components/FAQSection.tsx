"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, Briefcase, Building2 } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
  category: "advertiser" | "venue";
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<"all" | "advertiser" | "venue">("all");

  const faqs: FAQItem[] = [
    {
      category: "advertiser",
      q: "Jak rychle můžeme naši kampaň spustit?",
      a: "Jakmile nám zašlete hotový video spot nebo grafický podklad, dokážeme kampaň v našem cloudovém systému zkontrolovat a nasadit na obrazovky do 24 hodin. V urgentních případech i v rámci několika hodin.",
    },
    {
      category: "advertiser",
      q: "V jakém formátu a délce má být reklamní spot?",
      a: "Standardně podporujeme video soubory MP4 (H.264/H.265) ve Full HD (1920×1080) nebo 4K rozlišení v poměru 16:9. Typická délka jednoho zobrazení spotu je 10, 15 nebo 30 sekund. Pokud spot ještě nemáte, rádi vám s jeho přípravou pomůžeme.",
    },
    {
      category: "advertiser",
      q: "Můžeme reklamní spot v průběhu kampaně změnit?",
      a: "Ano, a to je jedna z největších výhod digital signage! Na rozdíl od drahého přetisknutí billboardu stačí poslat nové video a my ho vzdáleně nahrajeme a vyměníme během pár minut bez přerušení vysílání.",
    },
    {
      category: "advertiser",
      q: "Jak přesně se měří úspěšnost a zásah kampaně?",
      a: "Náš systém přesně eviduje každé spuštění vašeho spotu – víte přesný počet přehrání za hodinu, den i měsíc v každé jednotlivé lokalitě. Znáte průměrnou denní návštěvnost zapojených prostor a frekvenci kontaktu s diváky.",
    },
    {
      category: "venue",
      q: "Kolik mě stojí instalace a provoz obrazovky v mém podniku?",
      a: "Provozovatele prostor to nestojí vůbec nic – 0 Kč. Televizní hardware, certifikované montážní držáky, kabely i instalaci naším technikem hradíme my. Naopak vy získáváte pravidelnou měsíční provizi.",
    },
    {
      category: "venue",
      q: "Jak je to se spotřebou elektřiny a hlukem?",
      a: "Používáme výhradně moderní nízkoenergetické LED obrazovky s energetickou třídou šetrnou k životnímu prostředí. Navíc je v systému nastaven inteligentní časovač, který obrazovku zapíná až s vaší otevírací dobou a v noci ji přepíná do režimu spánku.",
    },
    {
      category: "venue",
      q: "Mohu na obrazovce zobrazovat i své vlastní akce a nabídky?",
      a: "Samozřejmě! V rotační smyčce rádi vyhradíme prostor pro vaše denní menu, sezónní novinky nebo akce vašeho podniku. Obrazovka tak slouží nejen jako zdroj pasivního příjmu, ale i jako atraktivní digitální tabule pro vaše hosty.",
    },
    {
      category: "venue",
      q: "Kdy a jak je mi vyplácena provize z umístění?",
      a: "Provize je vyplácena každý měsíc přímo na váš bankovní účet na základě přehledného vyúčtování a partnerské smlouvy. Výše provize závisí na atraktivitě lokality a denní návštěvnosti.",
    },
  ];

  const filteredFaqs =
    activeCategory === "all"
      ? faqs
      : faqs.filter((item) => item.category === activeCategory);

  return (
    <section id="faq" className="py-24 relative bg-[#06080d] border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Odpovědi na vaše otázky</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Často kladené <span className="text-gradient">dotazy</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Vše, co potřebujete vědět před zahájením kampaně nebo instalací obrazovky.
          </p>

          {/* Filter Pill Buttons */}
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeCategory === "all"
                  ? "bg-white/10 text-white border border-white/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Všechny dotazy
            </button>
            <button
              onClick={() => setActiveCategory("advertiser")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeCategory === "advertiser"
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Pro inzerenty
            </button>
            <button
              onClick={() => setActiveCategory("venue")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                activeCategory === "venue"
                  ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Pro majitele prostor
            </button>
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card border-white/10 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-slate-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-cyan-400 bg-cyan-500/10 border-cyan-500/30" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-in fade-in duration-300">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
