"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Tv, Lock, Eye, EyeOff, KeyRound, ShieldAlert, ArrowRight, CheckCircle2 } from "lucide-react";
import { isAuthenticated, login } from "../../lib/auth";

export default function LoginPage() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (isAuthenticated()) {
            router.replace("/");
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!password.trim()) {
            setError("Zadejte prosím administrátorské heslo.");
            return;
        }

        setLoading(true);

        // Simulace krátkého ověření pro hladký UX efekt
        await new Promise((r) => setTimeout(r, 400));

        const ok = login(password);
        if (ok) {
            setSuccess(true);
            setTimeout(() => {
                router.replace("/");
            }, 500);
        } else {
            setError("Nesprávné administrátorské heslo. Přístup byl odepřen.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#090b10]">
            {/* Ambient background glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 blur-[140px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[300px] bg-cyan-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                {/* Brand Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-500 shadow-xl shadow-indigo-500/25 mb-4 border border-white/10">
                        <Tv className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <h1 className="text-2xl font-bold tracking-tight text-white">
                            ALION <span className="text-gradient">Advert</span>
                        </h1>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
                            Admin Hub
                        </span>
                    </div>
                    <p className="text-sm text-slate-400">
                        Zabezpečený přístup k řízení vysílání
                    </p>
                </div>

                {/* Login Card */}
                <div className="glass-panel p-8 bg-[#111420]/90 border-white/10 shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center gap-3 pb-6 mb-6 border-b border-white/10">
                        <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                            <Lock className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-white">Přihlášení správce</h2>
                            <p className="text-xs text-slate-400">Vstup pouze pro pověřené osoby</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs flex items-start gap-2.5 animate-in fade-in slide-in-from-top-1">
                                <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
                                <span>{error}</span>
                            </div>
                        )}

                        {success && (
                            <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs flex items-center gap-2.5">
                                <CheckCircle2 className="w-4 h-4 shrink-0" />
                                <span>Heslo ověřeno. Vstupuji do administrace...</span>
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-2">
                                Administrátorské heslo / API Klíč
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                                    <KeyRound className="w-4 h-4" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Zadejte heslo..."
                                    disabled={loading || success}
                                    autoFocus
                                    className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition disabled:opacity-50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200 transition"
                                    tabIndex={-1}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || success}
                            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-medium text-sm shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : success ? (
                                <>
                                    <span>Úspěšně přihlášen</span>
                                    <CheckCircle2 className="w-4 h-4" />
                                </>
                            ) : (
                                <>
                                    <span>Vstoupit do administrace</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-5 border-t border-white/5 flex items-center justify-center gap-2 text-[11px] text-slate-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>Chráněno konfigurovaným API klíčem</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
