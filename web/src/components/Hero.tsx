"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Tv,
  CheckCircle2,
  TrendingUp,
  Activity,
  Play,
  ShieldCheck,
  Building2,
  Volume2,
  VolumeX,
  Clock,
  MapPin,
  Flame,
} from "lucide-react";

export const Hero: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  // Ukázkové dynamické spoty v simulátoru obrazovky
  const sampleAds = [
    {
      brand: "L’Aura Coffee & Bistro",
      category: "Gastro & Kavárna",
      location: "Praha – Vinohrady",
      headline: "Ranní káva a čerstvý brunch",
      subline: "Zastavte se na výběrovou kávu jen 5 minut odtud.",
      color: "from-amber-500/20 via-orange-500/10 to-transparent",
      accent: "#f59e0b",
      badge: "Lokální kampaň",
    },
    {
      brand: "Apex Fitness Hub",
      category: "Sport & Zdraví",
      location: "Brno – Centrum",
      headline: "Vstupte do formy bez kompromisů",
      subline: "Moderní gym, osobní trenéři a wellness zóna.",
      color: "from-cyan-500/20 via-blue-500/10 to-transparent",
      accent: "#06b6d4",
      badge: "Sezónní spot",
    },
    {
      brand: "NovaTech Advisory",
      category: "B2B & IT Služby",
      location: "Ostrava – Biz Park",
      headline: "Automatizace firemních procesů",
      subline: "Ušetřete až 30 % provozních nákladů díky cloud AI.",
      color: "from-indigo-500/20 via-purple-500/10 to-transparent",
      accent: "#818cf8",
      badge: "B2B kampaň",
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sampleAds.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying, sampleAds.length]);

  const scrollToForms = (targetType: "advertiser" | "venue") => {
    const el = document.getElementById("lead-forms");
    if (el) {
      // Nastavíme tab přes custom event nebo URL hash
      window.dispatchEvent(
        new CustomEvent("switch-lead-form", { detail: { type: targetType } })
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

  const currentAd = sampleAds[activeSlide];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyan-600/12 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[350px] bg-indigo-600/15 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[300px] bg-emerald-600/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Grid texture overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_30%,#000_70%,transparent_100%)] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-14 md:mb-20">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-semibold text-slate-300 mb-6 backdrop-blur-md hover:border-cyan-500/30 transition-colors">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="tracking-wider uppercase text-[11px] text-cyan-300 font-bold">
              DIGITAL SIGNAGE NETWORK
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">Nová generace reklamního prostoru</span>
          </div>

          {/* Main H1 Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            Vaše reklama.{" "}
            <br className="hidden sm:inline" />
            <span className="text-gradient">Na správném místě.</span>{" "}
            <span className="text-gradient-cyan">Ve správný čas.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            Propojujeme firmy, které chtějí být vidět, s frekventovanými místy,
            kde jejich reklamní spoty skutečně uvidí tisíce zákazníků každý den.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <button
              onClick={() => scrollToForms("advertiser")}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-semibold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Chci propagovat svou firmu</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollToForms("venue")}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/12 hover:border-white/25 text-slate-200 hover:text-white font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer backdrop-blur-md"
            >
              <Building2 className="w-4 h-4 text-slate-400" />
              <span>Chci umístit obrazovku</span>
            </button>
          </div>

          {/* Trust Badges Bar */}
          <div className="mt-10 pt-8 border-t border-white/5 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% digitální vzdálená správa</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Ultra HD vysílání & plynulá smyčka</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>Pravidelná pasivní provize z umístění</span>
            </div>
          </div>
        </div>

        {/* ── Realistic Hero Visual: Simulated 4K Smart Signage TV ── */}
        <div className="relative max-w-5xl mx-auto mt-6">
          {/* Ambient Screen Backlight (Ambilight glow effect) */}
          <div
            className="absolute -inset-4 md:-inset-8 blur-3xl opacity-35 transition-all duration-1000 -z-10 rounded-3xl"
            style={{
              background: `radial-gradient(circle, ${currentAd.accent} 0%, rgba(99,102,241,0.2) 50%, transparent 80%)`,
            }}
          />

          {/* Telemetry Card: Live Broadcast Status (Top Left Floating) */}
          <div className="hidden md:flex absolute -top-6 -left-6 z-30 glass-card p-4 items-center gap-3.5 border-white/15 animate-float-slow shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Live Broadcast Active
                </span>
              </div>
              <p className="text-[11px] text-slate-400">99.9% Uptime v síti</p>
            </div>
          </div>

          {/* Telemetry Card: Impressions Meter (Bottom Right Floating) */}
          <div className="hidden md:flex absolute -bottom-6 -right-6 z-30 glass-card p-4 items-center gap-3.5 border-white/15 animate-float-delayed shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/25 flex items-center justify-center text-cyan-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-white flex items-center gap-1">
                2 400+ zhlédnutí denně
              </span>
              <p className="text-[11px] text-slate-400">Průměrný zásah na 1 TV</p>
            </div>
          </div>

          {/* The Physical TV Bezel & Frame */}
          <div className="rounded-2xl md:rounded-3xl p-2 sm:p-3.5 bg-gradient-to-b from-slate-700/80 via-slate-800/90 to-slate-950 border border-slate-700/60 shadow-2xl shadow-black">
            {/* Inner TV Screen */}
            <div className="tv-screen relative aspect-video w-full rounded-xl md:rounded-2xl bg-[#090d16] border border-white/10 overflow-hidden flex flex-col justify-between">
              {/* Dynamic Ad Background with smooth transition */}
              <div
                className={`absolute inset-0 bg-gradient-to-tr ${currentAd.color} transition-all duration-700`}
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.06),transparent_60%)]" />

              {/* Top Bar inside TV (Signage OS overlay) */}
              <div className="relative z-30 p-3 sm:p-5 flex items-center justify-between border-b border-white/10 bg-black/40 backdrop-blur-md">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="px-2.5 py-1 rounded-md bg-rose-500 text-white text-[10px] sm:text-xs font-black tracking-wider flex items-center gap-1.5 shadow-md shadow-rose-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    LIVE
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-300 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{currentAd.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] text-slate-300 font-medium">
                    {currentAd.badge}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 font-mono">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>14:45</span>
                  </div>
                </div>
              </div>

              {/* Main Ad Spot Content (Simulating live broadcast ad) */}
              <div className="relative z-30 p-6 sm:p-10 md:p-14 flex flex-col justify-center my-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white/10 border border-white/15 w-fit mb-3 sm:mb-4 backdrop-blur-sm">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: currentAd.accent }}
                  />
                  <span className="text-[11px] sm:text-xs font-semibold text-slate-200">
                    {currentAd.category}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-2 sm:mb-3">
                  {currentAd.brand}
                </h3>
                <p className="text-lg sm:text-2xl md:text-3xl font-semibold text-slate-200 mb-2">
                  {currentAd.headline}
                </p>
                <p className="text-xs sm:text-base text-slate-300 max-w-xl">
                  {currentAd.subline}
                </p>
              </div>

              {/* Bottom Playback Control & Status Bar in TV */}
              <div className="relative z-30 p-3 sm:p-4 bg-black/60 backdrop-blur-md border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
                    title={isPlaying ? "Pozastavit simulaci" : "Spustit simulaci"}
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    {sampleAds.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveSlide(idx)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeSlide === idx
                            ? "w-8 bg-cyan-400"
                            : "w-2 bg-white/20 hover:bg-white/40"
                        }`}
                        aria-label={`Přejít na spot ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className="hidden sm:inline font-mono text-[11px]">
                    ALION TV OS • v2.4 (Active Loop)
                  </span>
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
              </div>
            </div>

            {/* TV Stand Base */}
            <div className="flex flex-col items-center mt-1 sm:mt-2">
              <div className="w-16 sm:w-24 h-2.5 sm:h-3.5 bg-gradient-to-b from-slate-700 to-slate-900 rounded-b-lg shadow-md" />
              <div className="w-32 sm:w-48 h-1 sm:h-1.5 bg-slate-600 rounded-full opacity-60 shadow-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
