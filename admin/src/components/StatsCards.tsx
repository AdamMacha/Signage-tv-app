"use client";

import React from "react";
import { Tv, Radio, WifiOff, Film, HardDrive } from "lucide-react";
import { Device, Video } from "../lib/api";

interface StatsCardsProps {
    devices: Device[];
    videos: Video[];
}

export const StatsCards: React.FC<StatsCardsProps> = ({ devices, videos }) => {
    const [now, setNow] = React.useState<number>(() => (typeof window !== "undefined" ? Date.now() : 0));

    React.useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 10000);
        return () => clearInterval(timer);
    }, []);

    // Považujeme zařízení za Online, pokud poslalo heartbeat za posledních 90 sekund
    const isOnline = (d: Device) => {
        if (!d.lastSeen || !now) return false;
        const diffSeconds = (now - new Date(d.lastSeen).getTime()) / 1000;
        return diffSeconds < 90;
    };

    const onlineCount = devices.filter(isOnline).length;
    const offlineCount = devices.length - onlineCount;

    // Celková velikost videí
    const totalBytes = videos.reduce((acc, v) => acc + (v.size || 0), 0);
    const totalMb = (totalBytes / (1024 * 1024)).toFixed(1);

    const stats = [
        {
            title: "Všechny obrazovky",
            value: devices.length,
            subtitle: "Registrované televize",
            icon: Tv,
            color: "text-indigo-400",
            bg: "bg-indigo-500/10",
            border: "border-indigo-500/20",
        },
        {
            title: "Online vysílání",
            value: onlineCount,
            subtitle: "Aktivní v posledních 90s",
            icon: Radio,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
            badge: onlineCount > 0 ? "Živé" : undefined,
        },
        {
            title: "Offline zařízení",
            value: offlineCount,
            subtitle: "Bez odezvy na heartbeat",
            icon: WifiOff,
            color: offlineCount > 0 ? "text-rose-400" : "text-slate-400",
            bg: offlineCount > 0 ? "bg-rose-500/10" : "bg-slate-800/40",
            border: offlineCount > 0 ? "border-rose-500/20" : "border-slate-700/20",
        },
        {
            title: "Knihovna videí",
            value: videos.length,
            subtitle: "Nahrané mediální soubory",
            icon: Film,
            color: "text-cyan-400",
            bg: "bg-cyan-500/10",
            border: "border-cyan-500/20",
        },
        {
            title: "Cloud úložiště",
            value: `${totalMb} MB`,
            subtitle: "Supabase Storage",
            icon: HardDrive,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
            border: "border-purple-500/20",
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                    <div
                        key={i}
                        className="glass-panel p-5 relative overflow-hidden group hover:border-white/20 transition-all duration-300"
                    >
                        {/* Background glow */}
                        <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full ${stat.bg} blur-2xl group-hover:scale-125 transition-transform duration-500`} />

                        <div className="flex items-start justify-between mb-3 relative z-10">
                            <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} border ${stat.border}`}>
                                <Icon className="w-5 h-5" />
                            </div>
                            {stat.badge && (
                                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    {stat.badge}
                                </span>
                            )}
                        </div>

                        <div className="relative z-10">
                            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">{stat.title}</p>
                            <p className="text-2xl font-extrabold text-white mt-1 tracking-tight">{stat.value}</p>
                            <p className="text-[11px] text-slate-500 mt-1">{stat.subtitle}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
