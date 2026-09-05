"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  Building2,
  Briefcase,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Send,
  Phone,
  Mail,
  User,
  Globe,
  MapPin,
} from "lucide-react";
import {
  AdvertiserFormData,
  VenueHostFormData,
  advertiserSchema,
  venueHostSchema,
} from "@/lib/validations";

export const LeadFormsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"advertiser" | "venue">("advertiser");

  // Inzerent form state
  const [advForm, setAdvForm] = useState<AdvertiserFormData>({
    type: "advertiser",
    name: "",
    company: "",
    email: "",
    phone: "",
    website: "",
    location: "",
    budget: "10 000–25 000 Kč",
    message: "",
  });

  // Prostor form state
  const [venueForm, setVenueForm] = useState<VenueHostFormData>({
    type: "venue",
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    venueType: "Kavárna",
    footTraffic: "100–300 lidí denně",
    ownership: "Vlastní prostor",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const handleSwitch = (e: any) => {
      if (e.detail?.type) {
        setActiveTab(e.detail.type);
        setSuccess(false);
        setErrorMessage(null);
        setFieldErrors({});
      }
    };
    window.addEventListener("switch-lead-form", handleSwitch);
    return () => window.removeEventListener("switch-lead-form", handleSwitch);
  }, []);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#cfa751", "#e0ca8e", "#f7f6f2", "#000000"],
      });
    } catch {
      // Graceful fallback
    }
  };

  const handleAdvertiserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setFieldErrors({});

    const validation = advertiserSchema.safeParse(advForm);
    if (!validation.success) {
      const errs: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        const path = err.path.join(".");
        errs[path] = err.message;
      });
      setFieldErrors(errs);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        throw new Error(data.error || "Při odesílání došlo k chybě.");
      }

      setSuccess(true);
      triggerConfetti();
    } catch (err: any) {
      setErrorMessage(err.message || "Nepodařilo se odeslat poptávku. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  };

  const handleVenueSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setFieldErrors({});

    const validation = venueHostSchema.safeParse(venueForm);
    if (!validation.success) {
      const errs: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        const path = err.path.join(".");
        errs[path] = err.message;
      });
      setFieldErrors(errs);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        throw new Error(data.error || "Při odesílání došlo k chybě.");
      }

      setSuccess(true);
      triggerConfetti();
    } catch (err: any) {
      setErrorMessage(err.message || "Nepodařilo se odeslat nabídku. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="lead-forms" className="py-24 relative bg-surface/20 border-t border-border">
      {/* Background ambient light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[oklch(78%_0.13_84)]/8 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="eyebrow mb-3 flex items-center justify-center gap-2">
            <Send className="w-3.5 h-3.5 text-[oklch(78%_0.13_84)]" />
            <span>Nezávazný kontakt</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-white tracking-normal mb-4">
            Začněme spolupracovat ještě <span className="italic text-gold-gradient">dnes</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Vyberte, zda chcete propagovat svou firmu, nebo nabídnout prostor pro obrazovku.
            Odpovíme vám do 24 hodin s konkrétní kalkulací.
          </p>

          {/* Tab Switcher */}
          <div className="mt-8 inline-flex p-1.5 rounded-sm bg-surface-elevated border border-border shadow-xl backdrop-blur-xl">
            <button
              type="button"
              onClick={() => {
                setActiveTab("advertiser");
                setSuccess(false);
                setErrorMessage(null);
                setFieldErrors({});
              }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-none text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeTab === "advertiser"
                  ? "bg-[oklch(78%_0.13_84)] text-black shadow-md"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Chci inzerovat</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab("venue");
                setSuccess(false);
                setErrorMessage(null);
                setFieldErrors({});
              }}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-none text-xs font-mono uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                activeTab === "venue"
                  ? "bg-[oklch(78%_0.13_84)] text-black shadow-md"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Nabídnout prostor</span>
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="glass-panel bg-surface p-6 sm:p-10 border-border shadow-2xl relative overflow-hidden">
          {success ? (
            /* Success State */
            <div className="py-12 text-center flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500">
              <div className="w-16 h-16 rounded-full bg-[oklch(78%_0.13_84)]/15 border border-[oklch(78%_0.13_84)]/30 flex items-center justify-center text-[oklch(78%_0.13_84)] mb-6 shadow-xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display text-3xl sm:text-4xl font-medium text-white mb-2 tracking-normal">
                Děkujeme za poptávku!
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto mb-8">
                Vaše údaje jsme v pořádku přijali. Náš specialista vás bude kontaktovat
                nejpozději do 24 hodin s nezávaznou nabídkou.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="px-6 py-3 rounded-none bg-surface-elevated hover:bg-surface text-white text-xs uppercase tracking-widest font-semibold border border-border transition"
              >
                Odeslat další poptávku
              </button>
            </div>
          ) : (
            /* Forms */
            <div>
              {errorMessage && (
                <div className="mb-6 p-4 rounded-lg bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {activeTab === "advertiser" ? (
                /* ── FORM 1: Inzerent ── */
                <form onSubmit={handleAdvertiserSubmit} className="space-y-5">
                  <div className="border-b border-border/60 pb-4 mb-6">
                    <h3 className="font-display text-2xl font-medium text-white flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-[oklch(78%_0.13_84)]" />
                      Poptávka reklamní kampaně
                    </h3>
                    <p className="text-xs text-muted-foreground font-sans">
                      Vyplňte základní informace a připravíme vám individuální plán vysílání.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Jméno */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                        Jméno a příjmení *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          required
                          value={advForm.name}
                          onChange={(e) => setAdvForm({ ...advForm, name: e.target.value })}
                          placeholder="Jan Novák"
                          className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-surface-elevated border border-border text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[oklch(78%_0.13_84)] focus:ring-1 focus:ring-[oklch(78%_0.13_84)] transition"
                        />
                      </div>
                      {fieldErrors["name"] && (
                        <span className="text-[11px] text-rose-400 mt-1 block font-mono">
                          {fieldErrors["name"]}
                        </span>
                      )}
                    </div>

                    {/* Firma */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                        Název firmy / Značka *
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          required
                          value={advForm.company}
                          onChange={(e) => setAdvForm({ ...advForm, company: e.target.value })}
                          placeholder="Např. ACME Gastro s.r.o."
                          className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-surface-elevated border border-border text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[oklch(78%_0.13_84)] focus:ring-1 focus:ring-[oklch(78%_0.13_84)] transition"
                        />
                      </div>
                      {fieldErrors["company"] && (
                        <span className="text-[11px] text-rose-400 mt-1 block font-mono">
                          {fieldErrors["company"]}
                        </span>
                      )}
                    </div>

                    {/* E-mail */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                        Firemní e-mail *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                        <input
                          type="email"
                          required
                          value={advForm.email}
                          onChange={(e) => setAdvForm({ ...advForm, email: e.target.value })}
                          placeholder="novak@firma.cz"
                          className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-surface-elevated border border-border text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[oklch(78%_0.13_84)] focus:ring-1 focus:ring-[oklch(78%_0.13_84)] transition"
                        />
                      </div>
                      {fieldErrors["email"] && (
                        <span className="text-[11px] text-rose-400 mt-1 block font-mono">
                          {fieldErrors["email"]}
                        </span>
                      )}
                    </div>

                    {/* Telefon */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                        Telefonní číslo *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                        <input
                          type="tel"
                          required
                          value={advForm.phone}
                          onChange={(e) => setAdvForm({ ...advForm, phone: e.target.value })}
                          placeholder="+420 777 123 456"
                          className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-surface-elevated border border-border text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[oklch(78%_0.13_84)] focus:ring-1 focus:ring-[oklch(78%_0.13_84)] transition"
                        />
                      </div>
                      {fieldErrors["phone"] && (
                        <span className="text-[11px] text-rose-400 mt-1 block font-mono">
                          {fieldErrors["phone"]}
                        </span>
                      )}
                    </div>

                    {/* Web */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                        Webové stránky (volitelné)
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                        <input
                          type="url"
                          value={advForm.website}
                          onChange={(e) => setAdvForm({ ...advForm, website: e.target.value })}
                          placeholder="https://vasedomena.cz"
                          className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-surface-elevated border border-border text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[oklch(78%_0.13_84)] focus:ring-1 focus:ring-[oklch(78%_0.13_84)] transition"
                        />
                      </div>
                    </div>

                    {/* Lokalita */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                        Cílová lokalita / město *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          required
                          value={advForm.location}
                          onChange={(e) => setAdvForm({ ...advForm, location: e.target.value })}
                          placeholder="Např. Praha, Brno, celá ČR..."
                          className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-surface-elevated border border-border text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[oklch(78%_0.13_84)] focus:ring-1 focus:ring-[oklch(78%_0.13_84)] transition"
                        />
                      </div>
                      {fieldErrors["location"] && (
                        <span className="text-[11px] text-rose-400 mt-1 block font-mono">
                          {fieldErrors["location"]}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Rozpočet */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                      Přibližný měsíční rozpočet *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        "Do 5 000 Kč",
                        "5 000–10 000 Kč",
                        "10 000–25 000 Kč",
                        "25 000–50 000 Kč",
                        "50 000+ Kč",
                        "Nevím, potřebuji poradit",
                      ].map((budgetOption) => (
                        <button
                          key={budgetOption}
                          type="button"
                          onClick={() =>
                            setAdvForm({
                              ...advForm,
                              budget: budgetOption as AdvertiserFormData["budget"],
                            })
                          }
                          className={`p-2.5 rounded-sm text-xs font-mono font-semibold border text-center transition cursor-pointer ${
                            advForm.budget === budgetOption
                              ? "bg-[oklch(78%_0.13_84)]/15 border-[oklch(78%_0.13_84)] text-[oklch(78%_0.13_84)] shadow-sm"
                              : "bg-surface-elevated border-border text-muted-foreground hover:border-border/80 hover:text-white"
                          }`}
                        >
                          {budgetOption}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Zpráva */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                      Představa o kampani / Poznámka (volitelné)
                    </label>
                    <textarea
                      rows={3}
                      value={advForm.message}
                      onChange={(e) => setAdvForm({ ...advForm, message: e.target.value })}
                      placeholder="Máte už hotové video, nebo potřebujete spot vytvořit? Kdy by měla kampaň odstartovat?"
                      className="w-full p-3.5 rounded-sm bg-surface-elevated border border-border text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[oklch(78%_0.13_84)] focus:ring-1 focus:ring-[oklch(78%_0.13_84)] transition"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-none bg-[oklch(78%_0.13_84)] hover:bg-[oklch(85%_0.09_85)] text-black font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[oklch(78%_0.13_84)]/20"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Odesílám poptávku...</span>
                      </>
                    ) : (
                      <>
                        <span>Chci nezávaznou nabídku</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* ── FORM 2: Nabídka prostoru ── */
                <form onSubmit={handleVenueSubmit} className="space-y-5">
                  <div className="border-b border-border/60 pb-4 mb-6">
                    <h3 className="font-display text-2xl font-medium text-white flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-[oklch(78%_0.13_84)]" />
                      Nabídka prostoru pro reklamní obrazovku
                    </h3>
                    <p className="text-xs text-muted-foreground font-sans">
                      Umístíme k vám obrazovku a budeme vám vyplácet pravidelnou měsíční provizi.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Jméno */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                        Jméno a příjmení kontaktní osoby *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          required
                          value={venueForm.name}
                          onChange={(e) => setVenueForm({ ...venueForm, name: e.target.value })}
                          placeholder="Jan Novák"
                          className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-surface-elevated border border-border text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[oklch(78%_0.13_84)] focus:ring-1 focus:ring-[oklch(78%_0.13_84)] transition"
                        />
                      </div>
                      {fieldErrors["name"] && (
                        <span className="text-[11px] text-rose-400 mt-1 block font-mono">
                          {fieldErrors["name"]}
                        </span>
                      )}
                    </div>

                    {/* Provozovna */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                        Název provozovny / podniku *
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          required
                          value={venueForm.company}
                          onChange={(e) => setVenueForm({ ...venueForm, company: e.target.value })}
                          placeholder="Např. Kavárna Máj"
                          className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-surface-elevated border border-border text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[oklch(78%_0.13_84)] focus:ring-1 focus:ring-[oklch(78%_0.13_84)] transition"
                        />
                      </div>
                      {fieldErrors["company"] && (
                        <span className="text-[11px] text-rose-400 mt-1 block font-mono">
                          {fieldErrors["company"]}
                        </span>
                      )}
                    </div>

                    {/* E-mail */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                        E-mailová adresa *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                        <input
                          type="email"
                          required
                          value={venueForm.email}
                          onChange={(e) => setVenueForm({ ...venueForm, email: e.target.value })}
                          placeholder="kontakt@kavarnamaj.cz"
                          className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-surface-elevated border border-border text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[oklch(78%_0.13_84)] focus:ring-1 focus:ring-[oklch(78%_0.13_84)] transition"
                        />
                      </div>
                      {fieldErrors["email"] && (
                        <span className="text-[11px] text-rose-400 mt-1 block font-mono">
                          {fieldErrors["email"]}
                        </span>
                      )}
                    </div>

                    {/* Telefon */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                        Telefonní číslo *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                        <input
                          type="tel"
                          required
                          value={venueForm.phone}
                          onChange={(e) => setVenueForm({ ...venueForm, phone: e.target.value })}
                          placeholder="+420 602 123 456"
                          className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-surface-elevated border border-border text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[oklch(78%_0.13_84)] focus:ring-1 focus:ring-[oklch(78%_0.13_84)] transition"
                        />
                      </div>
                      {fieldErrors["phone"] && (
                        <span className="text-[11px] text-rose-400 mt-1 block font-mono">
                          {fieldErrors["phone"]}
                        </span>
                      )}
                    </div>

                    {/* Adresa */}
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                        Přesná adresa / lokalita prostoru *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          required
                          value={venueForm.address}
                          onChange={(e) => setVenueForm({ ...venueForm, address: e.target.value })}
                          placeholder="Ulice, číslo popisné, PSČ a město"
                          className="w-full pl-10 pr-4 py-2.5 rounded-sm bg-surface-elevated border border-border text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[oklch(78%_0.13_84)] focus:ring-1 focus:ring-[oklch(78%_0.13_84)] transition"
                        />
                      </div>
                      {fieldErrors["address"] && (
                        <span className="text-[11px] text-rose-400 mt-1 block font-mono">
                          {fieldErrors["address"]}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Typ prostoru */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                      Typ prostoru / provozovny *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                      {[
                        "Kavárna",
                        "Restaurace",
                        "Hotel",
                        "Fitness",
                        "Obchod",
                        "Čekárna",
                        "Kancelář",
                        "Autoservis",
                        "Salon",
                        "Jiné",
                      ].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() =>
                            setVenueForm({
                              ...venueForm,
                              venueType: type as VenueHostFormData["venueType"],
                            })
                          }
                          className={`p-2.5 rounded-sm text-xs font-mono font-semibold border text-center transition cursor-pointer ${
                            venueForm.venueType === type
                              ? "bg-[oklch(78%_0.13_84)]/20 border-[oklch(78%_0.13_84)] text-[oklch(78%_0.13_84)]"
                              : "bg-surface-elevated border-border text-muted-foreground hover:border-border/80 hover:text-white"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Návštěvnost a Vlastnictví */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                        Odhadovaná denní návštěvnost *
                      </label>
                      <select
                        value={venueForm.footTraffic}
                        onChange={(e) => setVenueForm({ ...venueForm, footTraffic: e.target.value })}
                        className="w-full p-2.5 rounded-sm bg-surface-elevated border border-border text-white text-sm focus:outline-none focus:border-[oklch(78%_0.13_84)] focus:ring-1 focus:ring-[oklch(78%_0.13_84)] transition font-mono"
                      >
                        <option value="Do 100 lidí denně">Do 100 lidí denně</option>
                        <option value="100–300 lidí denně">100–300 lidí denně</option>
                        <option value="300–1 000 lidí denně">300–1 000 lidí denně</option>
                        <option value="1 000+ lidí denně">1 000+ lidí denně</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                        Vlastnický vztah k prostoru *
                      </label>
                      <select
                        value={venueForm.ownership}
                        onChange={(e) =>
                          setVenueForm({
                            ...venueForm,
                            ownership: e.target.value as VenueHostFormData["ownership"],
                          })
                        }
                        className="w-full p-2.5 rounded-sm bg-surface-elevated border border-border text-white text-sm focus:outline-none focus:border-[oklch(78%_0.13_84)] focus:ring-1 focus:ring-[oklch(78%_0.13_84)] transition font-mono"
                      >
                        <option value="Vlastní prostor">Vlastní prostor</option>
                        <option value="Dlouhodobý pronájem">Dlouhodobý pronájem</option>
                      </select>
                    </div>
                  </div>

                  {/* Zpráva */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                      Doplňující informace o prostoru (volitelné)
                    </label>
                    <textarea
                      rows={3}
                      value={venueForm.message}
                      onChange={(e) => setVenueForm({ ...venueForm, message: e.target.value })}
                      placeholder="Popište umístění, kde by mohla obrazovka viset (např. za barem, u recepce, v čekací zóně)..."
                      className="w-full p-3.5 rounded-sm bg-surface-elevated border border-border text-white placeholder-slate-600 text-sm focus:outline-none focus:border-[oklch(78%_0.13_84)] focus:ring-1 focus:ring-[oklch(78%_0.13_84)] transition"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-none bg-[oklch(78%_0.13_84)] hover:bg-[oklch(85%_0.09_85)] text-black font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[oklch(78%_0.13_84)]/20"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Odesílám nabídku...</span>
                      </>
                    ) : (
                      <>
                        <span>Chci nabídnout prostor pro obrazovku</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
