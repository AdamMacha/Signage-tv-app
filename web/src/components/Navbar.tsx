"use client";

import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  Sparkles,
  Building2,
  Lock,
  ChevronDown,
  Layers,
  Radio,
  HelpCircle,
  Zap,
} from "lucide-react";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 90;
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

  const scrollToLead = (type: "advertiser" | "venue") => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
    window.dispatchEvent(
      new CustomEvent("switch-lead-form", { detail: { type } })
    );
    const element = document.getElementById("lead-forms");
    if (element) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
      <div className="max-w-6xl mx-auto pointer-events-auto">
        {/* Floating Luxury Glass Pill Bar */}
        <div
          className={`transition-all duration-300 rounded-2xl sm:rounded-full border px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_12px_40px_rgba(0,0,0,0.65)] backdrop-blur-2xl ${
            scrolled
              ? "bg-[#100f0e]/95 border-[oklch(32%_0.01_70/0.8)] shadow-black/90"
              : "bg-[#131211]/80 border-[oklch(28%_0.008_70/0.6)] hover:border-[oklch(38%_0.015_70/0.7)]"
          }`}
        >
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 group transition-opacity hover:opacity-95"
          >
            {/* Minimalist Geometric Broadcast Emblem */}
            <div className="w-8 h-8 rounded-lg bg-[oklch(78%_0.13_84)]/10 border border-[oklch(78%_0.13_84)]/30 flex items-center justify-center text-[oklch(78%_0.13_84)] group-hover:border-[oklch(78%_0.13_84)] group-hover:shadow-[0_0_15px_oklch(78%_0.13_84/0.3)] transition-all duration-300 shadow-sm">
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="14" x="2" y="3" rx="2" />
                <line x1="8" x2="16" y1="21" y2="21" />
                <line x1="12" x2="12" y1="17" y2="21" />
                <circle cx="12" cy="10" r="1.5" fill="currentColor" />
              </svg>
            </div>

            {/* Wordmark */}
            <div className="flex items-center gap-1.5">
              <span className="text-sm sm:text-base font-extrabold tracking-wider text-white">
                ALION
              </span>
              <span className="font-display text-base sm:text-lg italic text-gold-gradient font-normal">
                Advert
              </span>
            </div>

            {/* Live Network Badge */}
            <span className="hidden xl:inline-flex items-center gap-1.5 ml-2 px-2 py-0.5 rounded-full text-[9px] font-mono tracking-widest uppercase bg-[oklch(78%_0.13_84)]/10 text-[oklch(78%_0.13_84)] border border-[oklch(78%_0.13_84)]/20 shadow-[0_0_10px_oklch(78%_0.13_84/0.15)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[oklch(78%_0.13_84)] animate-pulse" />
              Live
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => scrollTo("jak-to-funguje")}
              className="px-3 py-1.5 text-[13px] font-medium text-[oklch(70%_0.01_70)] hover:text-white transition-all duration-200 cursor-pointer rounded-full hover:bg-white/[0.05]"
            >
              Jak to funguje
            </button>
            <button
              onClick={() => scrollTo("proc-digital-signage")}
              className="px-3 py-1.5 text-[13px] font-medium text-[oklch(70%_0.01_70)] hover:text-white transition-all duration-200 cursor-pointer rounded-full hover:bg-white/[0.05]"
            >
              Výhody
            </button>
            <button
              onClick={() => scrollTo("sit-obrazovek")}
              className="px-3 py-1.5 text-[13px] font-medium text-[oklch(70%_0.01_70)] hover:text-white transition-all duration-200 cursor-pointer rounded-full hover:bg-white/[0.05]"
            >
              Síť lokalit
            </button>

            {/* Solutions Dropdown Menu */}
            <div
              className="relative py-1"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="px-3 py-1.5 text-[13px] font-medium text-[oklch(70%_0.01_70)] hover:text-white transition-all duration-200 cursor-pointer rounded-full hover:bg-white/[0.05] flex items-center gap-1"
              >
                <span>Řešení</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180 text-[oklch(78%_0.13_84)]" : "text-muted-foreground"
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 pointer-events-auto">
                  <div className="p-2 rounded-2xl bg-[#141312]/95 border border-[oklch(28%_0.008_70)] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_20px_40px_rgba(0,0,0,0.85)] backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150">
                    <button
                      onClick={() => scrollToLead("advertiser")}
                      className="w-full text-left p-3 rounded-xl hover:bg-white/[0.05] transition-all duration-200 flex items-start gap-3 cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[oklch(78%_0.13_84)]/10 border border-[oklch(78%_0.13_84)]/25 flex items-center justify-center text-[oklch(78%_0.13_84)] shrink-0 group-hover:scale-105 group-hover:bg-[oklch(78%_0.13_84)]/20 transition-all">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-white block group-hover:text-[oklch(78%_0.13_84)] transition-colors">
                          Pro inzerenty
                        </span>
                        <span className="text-[11px] text-muted-foreground block leading-snug mt-0.5">
                          Získejte zákazníky z prémiových míst s vysokou návštěvností
                        </span>
                      </div>
                    </button>

                    <button
                      onClick={() => scrollToLead("venue")}
                      className="w-full text-left p-3 rounded-xl hover:bg-white/[0.05] transition-all duration-200 flex items-start gap-3 cursor-pointer group border-t border-white/[0.06] mt-1"
                    >
                      <div className="w-8 h-8 rounded-lg bg-surface-elevated border border-border flex items-center justify-center text-[oklch(78%_0.13_84)] shrink-0 group-hover:scale-105 group-hover:border-[oklch(78%_0.13_84)]/40 transition-all">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-white block group-hover:text-[oklch(78%_0.13_84)] transition-colors">
                          Pro majitele prostor
                        </span>
                        <span className="text-[11px] text-muted-foreground block leading-snug mt-0.5">
                          Pravidelná měsíční provize za umístění TV obrazovky
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollTo("faq")}
              className="px-3 py-1.5 text-[13px] font-medium text-[oklch(70%_0.01_70)] hover:text-white transition-all duration-200 cursor-pointer rounded-full hover:bg-white/[0.05]"
            >
              FAQ
            </button>
          </nav>

          {/* Right Action CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Admin Hub Link */}
            <a
              href="https://alionadvert-admin.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              title="Vstup do administrace obrazovek"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-[oklch(70%_0.01_70)] hover:text-white hover:bg-white/[0.06] border border-white/5 hover:border-white/15 transition-all duration-200"
            >
              <Lock className="w-3 h-3 text-[oklch(78%_0.13_84)]" />
              <span>Admin Hub</span>
            </a>

            {/* Quick Venue Link */}
            <button
              onClick={() => scrollToLead("venue")}
              className="hidden sm:inline-flex px-3 py-1.5 text-xs font-medium text-[oklch(75%_0.01_70)] hover:text-white transition-colors duration-200 cursor-pointer"
            >
              Prostory
            </button>

            {/* Primary Luxury Gold Action Pill Button */}
            <button
              onClick={() => scrollToLead("advertiser")}
              className="relative group overflow-hidden rounded-full cursor-pointer focus:outline-none transition-transform duration-200 active:scale-[0.98]"
            >
              <span className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-gradient-to-r from-[oklch(78%_0.13_84)] to-[oklch(85%_0.09_85)] text-black text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_15px_oklch(78%_0.13_84/0.25)] group-hover:shadow-[0_0_25px_oklch(78%_0.13_84/0.45)] group-hover:brightness-105">
                <span>Chci inzerovat</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition"
              aria-label="Přepnout navigaci"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-5 rounded-2xl bg-[#141312]/95 border border-[oklch(28%_0.008_70/0.7)] shadow-2xl backdrop-blur-2xl space-y-4 animate-in slide-in-from-top-2 duration-200 pointer-events-auto">
            <div className="flex flex-col space-y-1 font-medium">
              <button
                onClick={() => scrollTo("jak-to-funguje")}
                className="text-left px-3 py-2 text-sm text-slate-300 hover:text-[oklch(78%_0.13_84)] rounded-lg hover:bg-white/5 transition"
              >
                Jak to funguje
              </button>
              <button
                onClick={() => scrollTo("proc-digital-signage")}
                className="text-left px-3 py-2 text-sm text-slate-300 hover:text-[oklch(78%_0.13_84)] rounded-lg hover:bg-white/5 transition"
              >
                Výhody digitální reklamy
              </button>
              <button
                onClick={() => scrollTo("sit-obrazovek")}
                className="text-left px-3 py-2 text-sm text-slate-300 hover:text-[oklch(78%_0.13_84)] rounded-lg hover:bg-white/5 transition"
              >
                Síť obrazovek v ČR
              </button>
              <button
                onClick={() => scrollTo("inzerenti")}
                className="text-left px-3 py-2 text-sm text-slate-300 hover:text-[oklch(78%_0.13_84)] rounded-lg hover:bg-white/5 transition"
              >
                Pro firmy a inzerenty
              </button>
              <button
                onClick={() => scrollTo("prostory")}
                className="text-left px-3 py-2 text-sm text-slate-300 hover:text-[oklch(78%_0.13_84)] rounded-lg hover:bg-white/5 transition"
              >
                Pro majitele prostor (provize)
              </button>
              <button
                onClick={() => scrollTo("faq")}
                className="text-left px-3 py-2 text-sm text-slate-300 hover:text-[oklch(78%_0.13_84)] rounded-lg hover:bg-white/5 transition"
              >
                Časté dotazy (FAQ)
              </button>
            </div>

            <div className="pt-3 border-t border-border/50 flex flex-col gap-2">
              <button
                onClick={() => scrollToLead("advertiser")}
                className="w-full py-3 rounded-xl bg-[oklch(78%_0.13_84)] text-black text-xs font-bold uppercase tracking-wider text-center"
              >
                Chci propagovat svou firmu
              </button>
              <button
                onClick={() => scrollToLead("venue")}
                className="w-full py-3 rounded-xl bg-surface border border-border text-slate-200 text-xs font-semibold uppercase tracking-wider text-center"
              >
                Chci nabídnout prostor pro TV
              </button>
              <a
                href="https://alionadvert-admin.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 text-center text-xs font-mono text-muted-foreground hover:text-white flex items-center justify-center gap-1.5 mt-1"
              >
                <Lock className="w-3.5 h-3.5 text-[oklch(78%_0.13_84)]" />
                <span>Přihlášení do administrace</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
