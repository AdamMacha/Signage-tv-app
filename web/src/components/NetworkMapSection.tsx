"use client";

import React, { useState } from "react";
import { Radio, ShieldCheck, Zap } from "lucide-react";

interface NodePoint {
  id: string;
  name: string;
  region: string;
  x: number;
  y: number;
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
    <section id="sit-obrazovek" className="py-24 relative bg-surface/30 border-t border-border overflow-hidden">
      {/* Background ambient lighting in gold */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[oklch(78%_0.13_84)]/6 blur-[170px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow mb-3 flex items-center justify-center gap-2">
            <Radio className="w-3.5 h-3.5 animate-pulse text-[oklch(78%_0.13_84)]" />
            <span>Republikové pokrytí</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-normal mb-4">
            Budujeme moderní síť po <span className="italic text-gold-gradient">celé České republice</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg">
            Propojujeme atraktivní lokality do jednotné digitální platformy. Vyberte si jedno město
            nebo oslovte zákazníky v celé síti.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left/Main: Futuristic Abstract Network Map */}
          <div className="lg:col-span-8 glass-panel bg-surface p-6 sm:p-10 relative overflow-hidden aspect-[4/3] sm:aspect-[16/10] flex items-center justify-center border-border">
            {/* Subtle stylized topographic map contour / grid */}
            <div className="absolute inset-0 carbon-grid opacity-[0.05]" />

            {/* SVG Connecting Network Vectors in Gold */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="goldLine1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#cfa751" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#8d6e30" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="goldLine2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8d6e30" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#e0ca8e" stopOpacity="0.6" />
                </linearGradient>
              </defs>

              {/* Main Czech Backbone Connectivity Lines */}
              <line x1="20" y1="48" x2="38" y2="36" stroke="url(#goldLine1)" strokeWidth="0.4" strokeDasharray="1,1" />
              <line x1="38" y1="36" x2="46" y2="18" stroke="url(#goldLine1)" strokeWidth="0.4" strokeDasharray="1,1" />
              <line x1="38" y1="36" x2="58" y2="34" stroke="url(#goldLine1)" strokeWidth="0.6" />
              <line x1="38" y1="36" x2="36" y2="78" stroke="url(#goldLine2)" strokeWidth="0.4" strokeDasharray="1,1" />
              <line x1="58" y1="34" x2="70" y2="68" stroke="url(#goldLine2)" strokeWidth="0.6" />
              <line x1="70" y1="68" x2="88" y2="44" stroke="url(#goldLine1)" strokeWidth="0.6" />
              <line x1="38" y1="36" x2="70" y2="68" stroke="url(#goldLine1)" strokeWidth="0.5" />
              <line x1="36" y1="78" x2="70" y2="68" stroke="url(#goldLine2)" strokeWidth="0.4" strokeDasharray="1,1" />
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
                      <span className="absolute w-12 h-12 rounded-full bg-[oklch(78%_0.13_84)]/20 animate-ping" />
                    )}
                    {/* Outer Glow */}
                    <span
                      className={`w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center ${
                        isSelected
                          ? "bg-[oklch(78%_0.13_84)] shadow-lg shadow-[oklch(78%_0.13_84)]/50 scale-125"
                          : "bg-black border border-[oklch(78%_0.13_84)]/50 group-hover:scale-110 group-hover:border-[oklch(78%_0.13_84)]"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full transition-colors ${
                          isSelected ? "bg-black" : "bg-[oklch(78%_0.13_84)]"
                        }`}
                      />
                    </span>

                    {/* City Label Badge */}
                    <span
                      className={`absolute top-7 px-2.5 py-1 rounded-sm text-[10px] font-mono font-bold tracking-wider whitespace-nowrap transition-all duration-200 backdrop-blur-md shadow-md ${
                        isSelected
                          ? "bg-[oklch(78%_0.13_84)] text-black border border-[oklch(85%_0.09_85)]"
                          : "bg-black/90 text-slate-300 border border-border group-hover:text-white group-hover:border-[oklch(78%_0.13_84)]/50"
                      }`}
                    >
                      {node.name}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Bottom Map Legend */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] text-muted-foreground z-10 border-t border-border/40 pt-3">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 font-mono text-[10px]">
                  <span className="w-2 h-2 rounded-full bg-[oklch(78%_0.13_84)]" />
                  Aktivní uzly
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[10px]">
                  <span className="w-2 h-2 rounded-full bg-[oklch(85%_0.09_85)]" />
                  Cloudová konektivita
                </span>
              </div>
              <span className="hidden sm:inline font-mono text-[10px] text-muted-foreground">
                Centrální synchronizace: 100% OK
              </span>
            </div>
          </div>

          {/* Right: Active Location Detail & Benefits */}
          <div className="lg:col-span-4 space-y-6">
            <div className="glass-panel bg-surface p-6 border-[oklch(78%_0.13_84)]/30">
              <div className="flex items-center justify-between mb-4">
                <span className="eyebrow !text-[10px]">
                  Vybraná lokalita
                </span>
                <span className="text-xs text-[oklch(78%_0.13_84)] font-mono font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[oklch(78%_0.13_84)] animate-pulse" />
                  Online
                </span>
              </div>

              <h3 className="font-display text-3xl font-medium text-white tracking-normal mb-1">
                {currentNode.name}
              </h3>
              <p className="text-xs font-semibold text-muted-foreground mb-4">
                {currentNode.region}
              </p>

              <div className="p-4 rounded-xl bg-surface-elevated border border-border/40 mb-4">
                <p className="text-xs text-[oklch(94%_0.015_80)] leading-relaxed">
                  {currentNode.highlight}
                </p>
              </div>

              <div className="space-y-2.5 text-xs text-muted-foreground pt-3 border-t border-border/40 font-mono">
                <div className="flex items-center justify-between">
                  <span>Typy prostor:</span>
                  <span className="text-[oklch(96%_0.01_80)] font-sans font-medium">Bistra, fitness, hotely</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Rozlišení vysílání:</span>
                  <span className="text-[oklch(78%_0.13_84)] font-medium">4K / Full HD 60fps</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Synchronizace:</span>
                  <span className="text-[oklch(96%_0.01_80)] font-sans font-medium">Do 60 sekund</span>
                </div>
              </div>
            </div>

            <div className="glass-card bg-surface p-5 border-border flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[oklch(78%_0.13_84)] shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-white mb-1 uppercase tracking-wider font-mono">
                  Cílení na míru vaší značce
                </h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
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
