import React from "react";
import {
  Maximize2,
  MapPin,
  RotateCw,
  Sliders,
  Sparkles,
  Ban,
  Clock,
  Zap,
} from "lucide-react";

export const WhySignageSection: React.FC = () => {
  const pillars = [
    {
      icon: Maximize2,
      title: "Nepřehlédnutelná viditelnost",
      subtitle: "Žádný AdBlock ani přeskakování",
      description:
        "Zatímco online reklamy lidé ignorují nebo blokují, velká obrazovka ve stylové kavárně, čekárně nebo posilovně přirozeně upoutá pozornost každého návštěvníka.",
      badge: "100% zhlédnutí",
    },
    {
      icon: MapPin,
      title: "Přesný lokální zásah",
      subtitle: "Oslovte zákazníky v jejich čtvrti",
      description:
        "Cílíte přesně tam, kde máte provozovnu nebo odkud k vám jezdí zákazníci. Můžete si zvolit konkrétní město, čtvrť nebo typ provozovny.",
      badge: "Hyper-lokální",
    },
    {
      icon: RotateCw,
      title: "Vysoká frekvence kontaktu",
      subtitle: "Opakovaný dojem během celého dne",
      description:
        "Váš spot se přehrává ve vyvážené smyčce několikrát za hodinu od rána do večera. Zákazník tak značku vnímá opakovaně a přirozeně si ji zapamatuje.",
      badge: "Vysoká retence",
    },
    {
      icon: Sliders,
      title: "Nulové starosti s tiskem",
      subtitle: "100% digitální distribuce",
      description:
        "Žádné tisknutí letáků, vylepování plakátů ani pronájem statických billboardů. Spot nahrajeme na dálku a vysíláme během několika minut.",
      badge: "Okamžitý start",
    },
    {
      icon: Sparkles,
      title: "Dynamická flexibilita",
      subtitle: "Změna obsahu kdykoliv potřebujete",
      description:
        "Máte novou sezónní nabídku nebo slevovou akci? Spot můžeme v průběhu běžící kampaně okamžitě vyměnit za nový bez dodatečných montážních poplatků.",
      badge: "Real-time update",
    },
  ];

  return (
    <section id="proc-digital-signage" className="py-24 relative bg-[#070a11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-4">
            <span>Budoucnost outdoorové reklamy</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Proč zvolit <span className="text-gradient">digital signage</span>?
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Srovnání s běžnou tiskovou a online reklamou: maximální dopad tam, kde se lidé
            skutečně pohybují a rozhodují o nákupech.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            const isLarge = idx === 0;
            return (
              <div
                key={idx}
                className={`glass-card p-8 flex flex-col justify-between border-white/10 ${
                  isLarge ? "lg:col-span-2 lg:bg-gradient-to-br lg:from-cyan-950/20 lg:to-[#0e1424]" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/5 text-slate-300 border border-white/10">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-1.5 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-cyan-400/90 mb-4">
                    {item.subtitle}
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-slate-500">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>ALION Signage Smart Delivery</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
