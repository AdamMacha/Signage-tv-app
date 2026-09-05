"use client";

import React, { useState, useEffect } from "react";
import { Tv, Menu, X, ArrowUpRight, Sparkles, Building2 } from "lucide-react";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#06080d]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
            <div className="w-full h-full bg-[#090d16] rounded-[11px] flex items-center justify-center">
              <Tv className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold tracking-tight text-white">
                ALION <span className="text-gradient">Advert</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Network Live
              </span>
            </div>
            <span className="text-[10px] tracking-wider uppercase text-slate-400 font-medium -mt-0.5">
              Digital Signage Platform
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          <button
            onClick={() => scrollTo("jak-to-funguje")}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/5"
          >
            Jak to funguje
          </button>
          <button
            onClick={() => scrollTo("proc-digital-signage")}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/5"
          >
            Výhody signage
          </button>
          <button
            onClick={() => scrollTo("sit-obrazovek")}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/5"
          >
            Síť obrazovek
          </button>
          <button
            onClick={() => scrollTo("inzerenti")}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/5"
          >
            Pro firmy
          </button>
          <button
            onClick={() => scrollTo("prostory")}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/5"
          >
            Pro majitele prostor
          </button>
          <button
            onClick={() => scrollTo("faq")}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/5"
          >
            FAQ
          </button>
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => scrollTo("lead-forms")}
            className="text-xs font-medium text-slate-300 hover:text-white px-3.5 py-2 rounded-xl hover:bg-white/5 transition flex items-center gap-1.5 cursor-pointer border border-transparent hover:border-white/10"
          >
            <Building2 className="w-3.5 h-3.5 text-slate-400" />
            <span>Nabídnout prostor</span>
          </button>

          <button
            onClick={() => scrollTo("lead-forms")}
            className="relative group overflow-hidden rounded-xl p-[1px] focus:outline-none cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-indigo-500 to-cyan-500 rounded-xl group-hover:opacity-100 opacity-80 blur-[2px] transition duration-500 group-hover:duration-200 animate-pulse" />
            <span className="relative flex items-center gap-2 px-4 py-2 rounded-[11px] bg-[#0c111d] text-xs font-semibold text-white group-hover:bg-[#101726] transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Chci inzerovat</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => scrollTo("lead-forms")}
            className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold"
          >
            Poptat
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-900 border border-white/10 text-slate-300 hover:text-white"
            aria-label="Přepnout navigaci"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-white/10 bg-[#070a11]/95 backdrop-blur-2xl px-5 py-6 space-y-4 animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => scrollTo("jak-to-funguje")}
              className="text-left py-2 text-sm font-medium text-slate-200 hover:text-cyan-400"
            >
              Jak to funguje
            </button>
            <button
              onClick={() => scrollTo("proc-digital-signage")}
              className="text-left py-2 text-sm font-medium text-slate-200 hover:text-cyan-400"
            >
              Výhody digitální reklamy
            </button>
            <button
              onClick={() => scrollTo("sit-obrazovek")}
              className="text-left py-2 text-sm font-medium text-slate-200 hover:text-cyan-400"
            >
              Síť obrazovek v ČR
            </button>
            <button
              onClick={() => scrollTo("inzerenti")}
              className="text-left py-2 text-sm font-medium text-slate-200 hover:text-cyan-400"
            >
              Pro inzerenty & firmy
            </button>
            <button
              onClick={() => scrollTo("prostory")}
              className="text-left py-2 text-sm font-medium text-slate-200 hover:text-cyan-400"
            >
              Pro majitele prostor (provize)
            </button>
            <button
              onClick={() => scrollTo("faq")}
              className="text-left py-2 text-sm font-medium text-slate-200 hover:text-cyan-400"
            >
              Časté otázky (FAQ)
            </button>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
            <button
              onClick={() => scrollTo("lead-forms")}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 text-center"
            >
              Chci propagovat svou firmu
            </button>
            <button
              onClick={() => scrollTo("lead-forms")}
              className="w-full py-3 rounded-xl bg-slate-900 border border-white/15 text-slate-200 text-xs font-semibold text-center"
            >
              Chci nabídnout prostor pro TV
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
