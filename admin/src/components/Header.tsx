"use client";

import React, { useState } from "react";
import { Tv, RefreshCw, Settings, Radio } from "lucide-react";
import { getApiUrl, setApiUrl, DEFAULT_API_URL } from "../lib/api";

interface HeaderProps {
    onRefresh: () => void;
    isRefreshing: boolean;
    onlineCount: number;
    totalDevices: number;
}

export const Header: React.FC<HeaderProps> = ({
    onRefresh,
    isRefreshing,
    onlineCount,
    totalDevices,
}) => {
    const [showSettings, setShowSettings] = useState(false);
    const [serverUrl, setServerUrlState] = useState(getApiUrl());
    const [testResult, setTestResult] = useState<string | null>(null);
    const [testing, setTesting] = useState(false);

    const handleSaveUrl = (url: string) => {
        setApiUrl(url);
        setServerUrlState(url);
        setShowSettings(false);
        onRefresh();
    };

    const handleTest = async (url: string) => {
        setTesting(true);
        setTestResult(null);
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000);
            const res = await fetch(`${url}/`, { signal: controller.signal });
            clearTimeout(timeout);
            if (res.ok) {
                setTestResult("✅ Spojení se serverem je v pořádku!");
            } else {
                setTestResult(`⚠️ Server odpověděl kódem: ${res.status}`);
            }
        } catch {
            setTestResult("❌ Server je nedostupný.");
        } finally {
            setTesting(false);
        }
    };

    return (
        <header className="sticky top-0 z-40 w-full glass-panel !rounded-none !border-t-0 !border-x-0 border-b border-white/10 px-6 py-4 bg-[#090b10]/80 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Brand */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <Tv className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-bold tracking-tight text-white">
                                ALION <span className="text-gradient">Signage</span>
                            </h1>
                            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                                Admin Hub
                            </span>
                        </div>
                        <p className="text-xs text-slate-400">Správa digitálních obrazovek a vysílání</p>
                    </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-4">
                    {/* Live indicator badge */}
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/60 border border-white/10 text-xs">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-slate-300 font-medium">
                            <strong className="text-emerald-400">{onlineCount}</strong> / {totalDevices} TV online
                        </span>
                    </div>

                    {/* Server URL display */}
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-white/5 text-xs text-slate-400">
                        <Radio className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="truncate max-w-[200px]">{serverUrl}</span>
                    </div>

                    {/* Refresh button */}
                    <button
                        onClick={onRefresh}
                        disabled={isRefreshing}
                        title="Obnovit data"
                        className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white transition border border-white/5 disabled:opacity-50"
                    >
                        <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-indigo-400" : ""}`} />
                    </button>

                    {/* Settings button */}
                    <button
                        onClick={() => setShowSettings(true)}
                        title="Nastavení serveru"
                        className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 hover:text-white transition border border-white/5"
                    >
                        <Settings className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Modal: Nastavení API serveru */}
            {showSettings && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <div className="glass-panel p-6 max-w-md w-full bg-[#111420] border-white/15">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Settings className="w-5 h-5 text-indigo-400" />
                                Nastavení backend serveru
                            </h3>
                            <button
                                onClick={() => setShowSettings(false)}
                                className="text-slate-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        <p className="text-xs text-slate-400 mb-4">
                            Zvolte, zda má administrace komunikovat s produkčním Render serverem nebo lokálním serverem.
                        </p>

                        <div className="space-y-3 mb-5">
                            <label className="text-xs font-semibold text-slate-300">URL backendu:</label>
                            <input
                                type="text"
                                value={serverUrl}
                                onChange={(e) => setServerUrlState(e.target.value)}
                                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900 border border-white/10 text-white focus:outline-none focus:border-indigo-500"
                                placeholder="https://..."
                            />

                            <div className="flex gap-2 text-xs">
                                <button
                                    onClick={() => setServerUrlState(DEFAULT_API_URL)}
                                    className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30"
                                >
                                    ☁️ Produkce (Render)
                                </button>
                                <button
                                    onClick={() => setServerUrlState("http://localhost:3000")}
                                    className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
                                >
                                    💻 Lokální (localhost:3000)
                                </button>
                            </div>
                        </div>

                        {testResult && (
                            <div className={`p-2.5 rounded-lg text-xs mb-4 ${
                                testResult.startsWith("✅") ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20" : "bg-rose-500/10 text-rose-300 border border-rose-500/20"
                            }`}>
                                {testResult}
                            </div>
                        )}

                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => handleTest(serverUrl)}
                                disabled={testing}
                                className="px-3.5 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                            >
                                {testing ? "Testuji..." : "Testovat spojení"}
                            </button>
                            <button
                                onClick={() => handleSaveUrl(serverUrl)}
                                className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition shadow-lg shadow-indigo-600/30"
                            >
                                Uložit změny
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};
