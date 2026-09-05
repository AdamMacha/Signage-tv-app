"use client";

import React, { useState } from "react";
import { Network, MapPin, Radio, ShieldCheck, Zap } from "lucide-react";

interface NodePoint {
  id: string;
  name: string;
  region: string;
  x: number; // Percentage
  y: number; // Percentage
  status: "active" | "expanding";
  highlight: string;
}

export const NetworkMapSection: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<string>("praha");

  const nodes: NodePoint[] = [
    {
      id: "praha",
      name: "Praha",
      region: "Hlavní město a metropole",
      x: 38,
      y: 36,
      status: "active",
      highlight: "Vysoká koncentrace prémiových kaváren, hotelů a business zón",
    },
    {
      id: "plzen",
      name: "Plzeň",
      region: "Západní Čechy",
      x: 20,
      y: 48,
      status: "active",
      highlight: "Populární gastro lokality a frekventovaná sportovní centra",
    },
    {
      id: "liberec",
      name: "Liberec",
      region: "Severní Čechy",
      x: 46,
      y: 18,
      status: "expanding",
      highlight: "Nová partnerská místa ve sportovních a retailových centrech",
    },
    {
      id: "hradec",
      name: "Hradec Králové",
      region: "Východní Čechy",
      x: 58,
      y: 34,
      status: "active",
      highlight: "Výborný dosah na vysokoškolskou a aktivní městskou populaci",
    },
    {
      id: "brno",
      name: "Brno",
      region: "Jižní Morava",
      x: 70,
      y: 68,
      status: "active",
      highlight: "Druhá největší metropole s dynamickým technologickým publikem",
    },
    {
      id: "ostrava",
      name: "Ostrava",
      region: "Moravskoslezský kraj",
      x: 88,
      y: 44,
      status: "active",
      highlight: "Strategická obchodní a průmyslová centra s vysokou návštěvností",
    },
    {
      id: "budejovice",
      name: "České Budějovice",
      region: "Jižní Čechy",
      x: 36,
      y: 78,
      status: "expanding",
      highlight: "Rostoucí síť v turisticky a obchodně exponovaných zónách",
    },
  ];

  const currentNode = nodes.find((n) => n.id === selectedNode) || nodes[0];

  return (
    <section id="sit-obrazovek" className="py-24 relative bg-[#06080d] border-t border-white/5 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-600/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-4">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Republikové pokrytí</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Budujeme moderní síť po <span className="text-gradient">celé České republice</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Propojujeme atraktivní lokality do jednotné digitální platformy. Vyberte si jedno město
            nebo oslovte zákazníky v celé síti.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left/Main: Futuristic Abstract Network Map */}
          <div className="lg:col-span-8 glass-panel p-6 sm:p-10 relative overflow-hidden aspect-[4/3] sm:aspect-[16/10] flex items-center justify-center">
            {/* Subtle stylized topographic map contour / grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem]" />

            {/* SVG Connecting Network Vectors */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="lineGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="lineGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6" />
                </linearGradient>
              </defs>

              {/* Main Czech Backbone Connectivity Lines */}
              <line x1="20" y1="48" x2="38" y2="36" stroke="url(#lineGrad1)" strokeWidth="0.4" strokeDasharray="1,1" />
              <line x1="38" y1="36" x2="46" y2="18" stroke="url(#lineGrad1)" strokeWidth="0.4" strokeDasharray="1,1" />
              <line x1="38" y1="36" x2="58" y2="34" stroke="url(#lineGrad1)" strokeWidth="0.6" />
              <line x1="38" y1="36" x2="36" y2="78" stroke="url(#lineGrad2)" strokeWidth="0.4" strokeDasharray="1,1" />
              <line x1="58" y1="34" x2="70" y2="68" stroke="url(#lineGrad2)" strokeWidth="0.6" />
              <line x1="70" y1="68" x2="88" y2="44" stroke="url(#lineGrad1)" strokeWidth="0.6" />
              <line x1="38" y1="36" x2="70" y2="68" stroke="url(#lineGrad1)" strokeWidth="0.5" />
              <line x1="36" y1="78" x2="70" y2="68" stroke="url(#lineGrad2)" strokeWidth="0.4" strokeDasharray="1,1" />
            </svg>

            {/* Interactive City Nodes */}
            {nodes.map((node) => {
              const isSelected = selectedNode === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setSelectedNode(node.id)}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer focus:outline-none z-20"
                >
                  <div className="relative flex items-center justify-center">
                    {/* Ripple aura if selected */}
                    {isSelected && (
                      <span className="absolute w-12 h-12 rounded-full bg-cyan-400/20 animate-ping" />
                    )}
                    {/* Outer Glow */}
                    <span
                      className={`w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center ${
                        isSelected
                          ? "bg-cyan-500 shadow-lg shadow-cyan-500/50 scale-125"
                          : "bg-slate-900 border border-cyan-500/50 group-hover:scale-110 group-hover:border-cyan-400"
                      }`}
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full transition-colors ${
                          isSelected ? "bg-white" : "bg-cyan-400"
                        }`}
                      />
                    </span>

                    {/* City Label Badge */}
                    <span
                      className={`absolute top-7 px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap transition-all duration-200 backdrop-blur-md shadow-md ${
                        isSelected
                          ? "bg-cyan-500 text-black border border-cyan-400"
                          : "bg-black/80 text-slate-300 border border-white/10 group-hover:text-white group-hover:border-cyan-500/40"
                      }`}
                    >
                      {node.name}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Bottom Map Legend */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] text-slate-500 z-10 border-t border-white/5 pt-3">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  Aktivní vysílací uzly
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  Cloudová konektivita
                </span>
              </div>
              <span className="hidden sm:inline font-mono">
                Centrální synchronizace: 100% OK
              </span>
            </div>
          </div>

          {/* Right: Active Location Detail & Benefits */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel p-6 border-cyan-500/30">
              <div className="flex items-center justify-between mb-4">
                <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Vybraná lokalita
                </span>
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
              </div>

              <h3 className="text-2xl font-black text-white tracking-tight mb-1">
                {currentNode.name}
              </h3>
              <p className="text-xs font-semibold text-slate-400 mb-4">
                {currentNode.region}
              </p>

              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5 mb-4">
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentNode.highlight}
                </p>
              </div>

              <div className="space-y-2.5 text-xs text-slate-400 pt-3 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <span>Typy prostor:</span>
                  <span className="text-slate-200 font-medium">Bistra, fitness, hotely</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Rozlišení vysílání:</span>
                  <span className="text-cyan-400 font-mono font-medium">4K / Full HD 60fps</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Synchronizace spotů:</span>
                  <span className="text-slate-200 font-medium">Do 60 sekund</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-5 border-white/10 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white mb-1">
                  Cílení na míru vaší značce
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Nemusíte inzerovat plošně. Vyberte si pouze konkrétní města nebo specifické
                  prostory odpovídající vaší cílové skupině.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
