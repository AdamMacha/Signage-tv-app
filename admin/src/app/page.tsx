"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
    LayoutDashboard,
    Tv,
    Film,
    ListMusic,
    AlertCircle,
    RotateCw,
} from "lucide-react";
import { Header } from "../components/Header";
import { StatsCards } from "../components/StatsCards";
import { DevicesView } from "../components/DevicesView";
import { MediaLibrary } from "../components/MediaLibrary";
import { PlaylistManager } from "../components/PlaylistManager";
import { Device, Video, fetchDevices, fetchVideos } from "../lib/api";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "../lib/auth";

type Tab = "overview" | "devices" | "media" | "playlists";

export default function AdminDashboardPage() {
    const [activeTab, setActiveTab] = useState<Tab>("overview");
    const [devices, setDevices] = useState<Device[]>([]);
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedDeviceId, setSelectedDeviceId] = useState<string | undefined>(undefined);

    const router = useRouter();
    const [authChecked, setAuthChecked] = useState(false);
    const [now, setNow] = useState<number>(() => (typeof window !== "undefined" ? Date.now() : 0));

    useEffect(() => {
        if (!isAuthenticated()) {
            router.replace("/login");
        } else {
            setAuthChecked(true);
        }
    }, [router]);

    useEffect(() => {
        if (!authChecked) return;
        const timer = setInterval(() => setNow(Date.now()), 10000);
        return () => clearInterval(timer);
    }, [authChecked]);

    // Načtení dat ze serveru
    const loadData = useCallback(async (isSilent = false) => {
        if (!isSilent) setIsRefreshing(true);
        setError(null);
        try {
            const [devicesData, videosData] = await Promise.all([
                fetchDevices(),
                fetchVideos(),
            ]);
            setDevices(devicesData);
            setVideos(videosData);
        } catch (err: unknown) {
            console.error("Fetch data error:", err);
            setError(err instanceof Error ? err.message : "Nepodařilo se připojit k serveru. Zkontrolujte, zda server běží.");
        } finally {
            setLoading(false);
            setIsRefreshing(false);
        }
    }, []);

    // Inicializace
    useEffect(() => {
        if (!authChecked) return;
        let isCancelled = false;
        Promise.all([fetchDevices(), fetchVideos()])
            .then(([devicesData, videosData]) => {
                if (!isCancelled) {
                    setDevices(devicesData);
                    setVideos(videosData);
                    setLoading(false);
                }
            })
            .catch((err: unknown) => {
                if (!isCancelled) {
                    console.error("Init data error:", err);
                    setError(err instanceof Error ? err.message : "Nepodařilo se připojit k serveru.");
                    setLoading(false);
                }
            });

        return () => {
            isCancelled = true;
        };
    }, [authChecked]);

    // Periodický auto-refresh každých 15 sekund pro živé sledování stavu TV
    useEffect(() => {
        if (!authChecked) return;
        const interval = setInterval(() => {
            loadData(true);
        }, 15000);
        return () => clearInterval(interval);
    }, [authChecked, loadData]);

    // Přepnutí do playlist manažeru pro konkrétní zařízení
    const handleManagePlaylist = (device: Device) => {
        setSelectedDeviceId(device.id);
        setActiveTab("playlists");
    };

    // Počet online zařízení (< 90s)
    const onlineCount = devices.filter((d) => {
        if (!d.lastSeen || !now) return false;
        return (now - new Date(d.lastSeen).getTime()) / 1000 < 90;
    }).length;

    const navTabs = [
        { id: "overview", label: "Přehled", icon: LayoutDashboard },
        { id: "devices", label: "Obrazovky & TV", icon: Tv, count: devices.length },
        { id: "media", label: "Knihovna videí", icon: Film, count: videos.length },
        { id: "playlists", label: "Playlist Builder", icon: ListMusic },
    ];

    if (!authChecked) {
        return (
            <div className="min-h-screen bg-[#090b10] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
                    <span className="text-xs text-slate-400">Ověřování oprávnění...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#090b10] flex flex-col text-slate-100 selection:bg-indigo-500 selection:text-white">
            {/* Header */}
            <Header
                onRefresh={() => loadData(false)}
                isRefreshing={isRefreshing}
                onlineCount={onlineCount}
                totalDevices={devices.length}
            />

            {/* Main Content Area */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
                {/* Navigation Tabs */}
                <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto">
                    {navTabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as Tab)}
                                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all whitespace-nowrap cursor-pointer ${
                                    isActive
                                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                <span>{tab.label}</span>
                                {tab.count !== undefined && (
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                                        isActive ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
                                    }`}>
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-sm flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400" />
                            <span>{error}</span>
                        </div>
                        <button
                            onClick={() => loadData(false)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 font-semibold text-xs transition"
                        >
                            <RotateCw className="w-3.5 h-3.5" />
                            Zkusit znovu
                        </button>
                    </div>
                )}

                {/* Loading state on initial load */}
                {loading && (
                    <div className="py-20 text-center space-y-3">
                        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto" />
                        <p className="text-sm text-slate-400 font-medium">Načítání dat ze serveru...</p>
                    </div>
                )}

                {/* Tab Views */}
                {!loading && (
                    <>
                        {/* 1. Přehled (Overview) */}
                        {activeTab === "overview" && (
                            <div className="space-y-8">
                                <StatsCards devices={devices} videos={videos} />

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Rychlý náhled zařízení */}
                                    <div className="glass-panel p-6 space-y-4">
                                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                            <h3 className="font-bold text-white text-base flex items-center gap-2">
                                                <Tv className="w-4 h-4 text-indigo-400" />
                                                Stav obrazovek
                                            </h3>
                                            <button
                                                onClick={() => setActiveTab("devices")}
                                                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
                                            >
                                                Zobrazit vše →
                                            </button>
                                        </div>

                                        {devices.length === 0 ? (
                                            <p className="text-xs text-slate-500 py-6 text-center">
                                                Žádná registrovaná zařízení.
                                            </p>
                                        ) : (
                                            <div className="space-y-2.5">
                                                {devices.slice(0, 5).map((d) => {
                                                    const online = d.lastSeen && now
                                                        ? (now - new Date(d.lastSeen).getTime()) / 1000 < 90
                                                        : false;
                                                    return (
                                                        <div
                                                            key={d.id}
                                                            className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between hover:border-white/10 transition"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <span className={`w-2.5 h-2.5 rounded-full ${online ? "bg-emerald-400 online-pulse" : "bg-rose-500"}`} />
                                                                <div>
                                                                    <p className="text-sm font-semibold text-white">{d.name}</p>
                                                                    <p className="text-[11px] text-slate-500">{d._count.playlist} videí v playlistu</p>
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={() => handleManagePlaylist(d)}
                                                                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20"
                                                            >
                                                                Playlist
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>

                                    {/* Rychlý náhled videí */}
                                    <div className="glass-panel p-6 space-y-4">
                                        <div className="flex items-center justify-between border-b border-white/10 pb-3">
                                            <h3 className="font-bold text-white text-base flex items-center gap-2">
                                                <Film className="w-4 h-4 text-cyan-400" />
                                                Poslední nahraná videa
                                            </h3>
                                            <button
                                                onClick={() => setActiveTab("media")}
                                                className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
                                            >
                                                Knihovna videí →
                                            </button>
                                        </div>

                                        {videos.length === 0 ? (
                                            <p className="text-xs text-slate-500 py-6 text-center">
                                                Zatím nebyla nahrána žádná videa.
                                            </p>
                                        ) : (
                                            <div className="space-y-2.5">
                                                {videos.slice(0, 5).map((v) => (
                                                    <div
                                                        key={v.id}
                                                        className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between"
                                                    >
                                                        <div className="min-w-0 pr-3">
                                                            <p className="text-sm font-semibold text-white truncate">{v.name}</p>
                                                            <p className="text-[11px] text-slate-500 font-mono">{(v.size / (1024 * 1024)).toFixed(1)} MB</p>
                                                        </div>
                                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                                                            {v.mimeType.split("/")[1]?.toUpperCase()}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* 2. Obrazovky & TV */}
                        {activeTab === "devices" && (
                            <DevicesView
                                devices={devices}
                                onRefresh={() => loadData(false)}
                                onManagePlaylist={handleManagePlaylist}
                            />
                        )}

                        {/* 3. Knihovna videí */}
                        {activeTab === "media" && (
                            <MediaLibrary
                                videos={videos}
                                onRefresh={() => loadData(false)}
                            />
                        )}

                        {/* 4. Playlist Builder */}
                        {activeTab === "playlists" && (
                            <PlaylistManager
                                devices={devices}
                                videos={videos}
                                selectedDeviceId={selectedDeviceId}
                                onRefreshDevices={() => loadData(true)}
                            />
                        )}
                    </>
                )}
            </main>
        </div>
    );
}
