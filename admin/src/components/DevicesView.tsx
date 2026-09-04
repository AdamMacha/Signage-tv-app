"use client";

import React, { useState } from "react";
import {
    Tv,
    Search,
    Plus,
    RotateCcw,
    RefreshCw,
    Trash2,
    ListMusic,
    Clock,
    CheckCircle2,
    AlertCircle,
    Copy,
    Check,
} from "lucide-react";
import { Device, createDevice, deleteDevice, sendDeviceCommand } from "../lib/api";

interface DevicesViewProps {
    devices: Device[];
    onRefresh: () => void;
    onManagePlaylist: (device: Device) => void;
}

export const DevicesView: React.FC<DevicesViewProps> = ({
    devices,
    onRefresh,
    onManagePlaylist,
}) => {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState<"all" | "online" | "offline">("all");
    const [showNewModal, setShowNewModal] = useState(false);
    const [newDeviceName, setNewDeviceName] = useState("");
    const [createdToken, setCreatedToken] = useState<{ name: string; token: string } | null>(null);
    const [copiedToken, setCopiedToken] = useState(false);
    const [loadingAction, setLoadingAction] = useState<string | null>(null);
    const [actionMessage, setActionMessage] = useState<{ id: string; text: string; ok: boolean } | null>(null);

    const [now, setNow] = useState<number>(() => (typeof window !== "undefined" ? Date.now() : 0));

    React.useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 10000);
        return () => clearInterval(timer);
    }, []);

    // Online status check (< 90 sekund)
    const isOnline = (d: Device) => {
        if (!d.lastSeen || !now) return false;
        const diffSeconds = (now - new Date(d.lastSeen).getTime()) / 1000;
        return diffSeconds < 90;
    };

    const formatLastSeen = (d: Device) => {
        if (!d.lastSeen || !now) return "Dosud žádný kontakt";
        const diffSec = Math.floor((now - new Date(d.lastSeen).getTime()) / 1000);
        if (diffSec < 60) return `Před ${diffSec}s`;
        if (diffSec < 3600) return `Před ${Math.floor(diffSec / 60)} min`;
        return new Date(d.lastSeen).toLocaleDateString("cs-CZ", {
            day: "2-digit",
            month: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // Filtrování zařízení
    const filteredDevices = devices.filter((d) => {
        const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.id.includes(search);
        if (!matchesSearch) return false;
        if (filter === "online") return isOnline(d);
        if (filter === "offline") return !isOnline(d);
        return true;
    });

    const handleCreateDevice = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newDeviceName.trim()) return;
        setLoadingAction("create");
        try {
            const res = await createDevice(newDeviceName.trim());
            setCreatedToken({ name: res.name, token: res.token });
            setNewDeviceName("");
            onRefresh();
        } catch (err: unknown) {
            alert(err instanceof Error ? err.message : "Chyba při vytváření zařízení");
        } finally {
            setLoadingAction(null);
        }
    };

    const handleDeleteDevice = async (d: Device) => {
        if (!confirm(`Opravdu chcete smazat zařízení "${d.name}"?`)) return;
        setLoadingAction(`delete-${d.id}`);
        try {
            await deleteDevice(d.id);
            onRefresh();
        } catch (err: unknown) {
            alert(err instanceof Error ? err.message : "Chyba při mazání zařízení");
        } finally {
            setLoadingAction(null);
        }
    };

    const handleSendCommand = async (d: Device, action: "restart" | "reload_playlist") => {
        setLoadingAction(`${action}-${d.id}`);
        try {
            await sendDeviceCommand(d.id, action);
            const label = action === "restart" ? "Restart vyžádán" : "Obnova playlistu vyžádána";
            setActionMessage({ id: d.id, text: `✓ ${label}`, ok: true });
            setTimeout(() => setActionMessage(null), 3000);
            onRefresh();
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Chyba";
            setActionMessage({ id: d.id, text: `✕ ${msg}`, ok: false });
            setTimeout(() => setActionMessage(null), 3000);
        } finally {
            setLoadingAction(null);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopiedToken(true);
        setTimeout(() => setCopiedToken(false), 2000);
    };

    return (
        <div className="space-y-6">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                {/* Search & Filters */}
                <div className="flex items-center gap-3 flex-1">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Vyhledat televizi podle názvu nebo ID..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
                        />
                    </div>

                    <div className="flex bg-slate-900/80 p-1 rounded-xl border border-white/10 text-xs">
                        <button
                            onClick={() => setFilter("all")}
                            className={`px-3 py-1.5 rounded-lg font-medium transition ${
                                filter === "all" ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" : "text-slate-400 hover:text-white"
                            }`}
                        >
                            Všechny ({devices.length})
                        </button>
                        <button
                            onClick={() => setFilter("online")}
                            className={`px-3 py-1.5 rounded-lg font-medium transition ${
                                filter === "online" ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30" : "text-slate-400 hover:text-white"
                            }`}
                        >
                            Online ({devices.filter(isOnline).length})
                        </button>
                        <button
                            onClick={() => setFilter("offline")}
                            className={`px-3 py-1.5 rounded-lg font-medium transition ${
                                filter === "offline" ? "bg-rose-600 text-white shadow-md shadow-rose-600/30" : "text-slate-400 hover:text-white"
                            }`}
                        >
                            Offline ({devices.filter((d) => !isOnline(d)).length})
                        </button>
                    </div>
                </div>

                {/* Add Device Button */}
                <button
                    onClick={() => {
                        setCreatedToken(null);
                        setShowNewModal(true);
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition cursor-pointer"
                >
                    <Plus className="w-4 h-4" />
                    Přidat novou televizi
                </button>
            </div>

            {/* Devices Table / Grid */}
            {filteredDevices.length === 0 ? (
                <div className="glass-panel p-12 text-center">
                    <Tv className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <h3 className="text-base font-semibold text-white">Nenalezena žádná zařízení</h3>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                        {devices.length === 0
                            ? "Zatím nemáte registrovanou žádnou televizi. Přidejte první obrazovku tlačítkem výše."
                            : "Zadanému filtru neodpovídá žádné zařízení."}
                    </p>
                </div>
            ) : (
                <div className="glass-panel overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-white/10 bg-slate-900/40 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                    <th className="py-3.5 px-5">Televize / Obrazovka</th>
                                    <th className="py-3.5 px-5">Stav</th>
                                    <th className="py-3.5 px-5">Poslední kontakt</th>
                                    <th className="py-3.5 px-5">Playlist</th>
                                    <th className="py-3.5 px-5 text-right">Dálkové akce</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredDevices.map((device) => {
                                    const online = isOnline(device);
                                    const isActing = loadingAction?.endsWith(device.id);

                                    return (
                                        <tr
                                            key={device.id}
                                            className="hover:bg-white/[0.02] transition-colors group"
                                        >
                                            {/* Název & ID */}
                                            <td className="py-4 px-5">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2.5 rounded-xl border ${
                                                        online
                                                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                                                            : "bg-slate-800/40 border-slate-700/20 text-slate-500"
                                                    }`}>
                                                        <Tv className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                                                            {device.name}
                                                        </p>
                                                        <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                                                            ID: {device.id}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Online / Offline status badge */}
                                            <td className="py-4 px-5">
                                                {online ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                        <span className="w-2 h-2 rounded-full bg-emerald-400 online-pulse" />
                                                        Online
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
                                                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                                                        Offline
                                                    </span>
                                                )}
                                            </td>

                                            {/* Poslední heartbeat */}
                                            <td className="py-4 px-5 text-xs text-slate-400">
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                                                    <span>{formatLastSeen(device)}</span>
                                                </div>
                                            </td>

                                            {/* Počet videí v playlistu */}
                                            <td className="py-4 px-5">
                                                <button
                                                    onClick={() => onManagePlaylist(device)}
                                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 transition cursor-pointer"
                                                >
                                                    <ListMusic className="w-3.5 h-3.5" />
                                                    {device._count.playlist} videí
                                                </button>
                                            </td>

                                            {/* Akce */}
                                            <td className="py-4 px-5 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    {actionMessage?.id === device.id && (
                                                        <span className={`text-xs font-medium mr-2 ${actionMessage.ok ? "text-emerald-400" : "text-rose-400"}`}>
                                                            {actionMessage.text}
                                                        </span>
                                                    )}

                                                    {/* Obnovit playlist */}
                                                    <button
                                                        onClick={() => handleSendCommand(device, "reload_playlist")}
                                                        disabled={isActing}
                                                        title="Vynutit znovunačtení playlistu na televizi"
                                                        className="p-2 rounded-lg bg-slate-800/80 hover:bg-indigo-600/30 text-slate-300 hover:text-indigo-400 border border-white/5 transition disabled:opacity-50 cursor-pointer"
                                                    >
                                                        <RefreshCw className="w-4 h-4" />
                                                    </button>

                                                    {/* Restartovat */}
                                                    <button
                                                        onClick={() => handleSendCommand(device, "restart")}
                                                        disabled={isActing}
                                                        title="Restartovat přehrávač na televizi"
                                                        className="p-2 rounded-lg bg-slate-800/80 hover:bg-amber-600/30 text-slate-300 hover:text-amber-400 border border-white/5 transition disabled:opacity-50 cursor-pointer"
                                                    >
                                                        <RotateCcw className="w-4 h-4" />
                                                    </button>

                                                    {/* Smazat */}
                                                    <button
                                                        onClick={() => handleDeleteDevice(device)}
                                                        disabled={isActing}
                                                        title="Smazat zařízení"
                                                        className="p-2 rounded-lg bg-slate-800/80 hover:bg-rose-600/30 text-slate-300 hover:text-rose-400 border border-white/5 transition disabled:opacity-50 cursor-pointer"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Modal: Přidání nového zařízení */}
            {showNewModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
                    <div className="glass-panel p-6 max-w-md w-full bg-[#111420] border-white/15">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                <Tv className="w-5 h-5 text-indigo-400" />
                                Registrovat novou TV
                            </h3>
                            <button
                                onClick={() => setShowNewModal(false)}
                                className="text-slate-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        {!createdToken ? (
                            <form onSubmit={handleCreateDevice} className="space-y-4">
                                <p className="text-xs text-slate-400">
                                    Zadejte název televize nebo lokality (např. <em>Recepce Hlavní Vchod</em>). Server vygeneruje unikátní token.
                                </p>
                                <div>
                                    <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                                        Název zařízení:
                                    </label>
                                    <input
                                        type="text"
                                        value={newDeviceName}
                                        onChange={(e) => setNewDeviceName(e.target.value)}
                                        placeholder="Např. Showroom 1"
                                        required
                                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
                                    />
                                </div>

                                <div className="flex gap-3 justify-end pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowNewModal(false)}
                                        className="px-4 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                                    >
                                        Zrušit
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loadingAction === "create"}
                                        className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30"
                                    >
                                        {loadingAction === "create" ? "Vytvářím..." : "Vytvořit TV"}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="space-y-4">
                                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                                    <span>Televize <strong>{createdToken.name}</strong> byla úspěšně vytvořena!</span>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-slate-300">Bezpečnostní token zařízení:</label>
                                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-white/10 font-mono text-xs text-indigo-300 break-all">
                                        <span className="flex-1">{createdToken.token}</span>
                                        <button
                                            onClick={() => copyToClipboard(createdToken.token)}
                                            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white flex-shrink-0"
                                            title="Kopírovat token"
                                        >
                                            {copiedToken ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                                        <AlertCircle className="w-3 h-3 text-amber-400" />
                                        Token se zobrazuje pouze jednou při vytvoření.
                                    </p>
                                </div>

                                <div className="flex justify-end pt-3">
                                    <button
                                        onClick={() => setShowNewModal(false)}
                                        className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white"
                                    >
                                        Hotovo
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
