"use client";

import React, { useState, useRef } from "react";
import {
    Film,
    Upload,
    Trash2,
    Play,
    HardDrive,
    FileVideo,
    X,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";
import { Video, uploadVideo, deleteVideo } from "../lib/api";

interface MediaLibraryProps {
    videos: Video[];
    onRefresh: () => void;
}

export const MediaLibrary: React.FC<MediaLibraryProps> = ({ videos, onRefresh }) => {
    const [dragActive, setDragActive] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const formatSize = (bytes: number) => {
        if (!bytes) return "0 MB";
        const mb = bytes / (1024 * 1024);
        return `${mb.toFixed(1)} MB`;
    };

    const handleFiles = async (files: FileList | null) => {
        if (!files || files.length === 0) return;
        const file = files[0];

        // Validace typu
        const allowed = ["video/mp4", "video/webm", "video/ogg", "video/quicktime", "video/x-msvideo"];
        if (!allowed.includes(file.type) && !file.name.match(/\.(mp4|webm|mov|ogg|avi)$/i)) {
            setUploadError("Nepodporovaný formát videa. Povolené: MP4, WebM, MOV, OGG, AVI.");
            return;
        }

        setUploading(true);
        setUploadProgress(0);
        setUploadError(null);
        setUploadSuccess(null);

        try {
            const uploaded = await uploadVideo(file, file.name.replace(/\.[^/.]+$/, ""), (percent) => {
                setUploadProgress(percent);
            });
            setUploadSuccess(`Video "${uploaded.name}" bylo úspěšně nahráno do cloudu!`);
            onRefresh();
            setTimeout(() => setUploadSuccess(null), 4000);
        } catch (err: unknown) {
            setUploadError(err instanceof Error ? err.message : "Chyba při nahrávání videa");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = "";
        }
    };

    const handleDelete = async (v: Video) => {
        if (!confirm(`Opravdu chcete smazat video "${v.name}"? Video bude odebráno i ze všech playlistů.`)) return;
        setDeletingId(v.id);
        try {
            await deleteVideo(v.id);
            if (selectedVideo?.id === v.id) setSelectedVideo(null);
            onRefresh();
        } catch (err: unknown) {
            alert(err instanceof Error ? err.message : "Chyba při mazání videa");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="space-y-6">
            {/* Upload Area (Drag & Drop) */}
            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    handleFiles(e.dataTransfer.files);
                }}
                onClick={() => !uploading && fileInputRef.current?.click()}
                className={`glass-panel p-8 border-2 border-dashed text-center cursor-pointer transition-all duration-300 relative overflow-hidden ${
                    dragActive
                        ? "border-indigo-400 bg-indigo-500/10 scale-[1.01]"
                        : "border-white/15 hover:border-indigo-500/50 hover:bg-white/[0.02]"
                }`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/mp4,video/webm,video/quicktime,video/ogg,video/avi"
                    onChange={(e) => handleFiles(e.target.files)}
                    className="hidden"
                    disabled={uploading}
                />

                <div className="max-w-md mx-auto flex flex-col items-center">
                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-3 text-indigo-400 shadow-lg shadow-indigo-500/10">
                        {uploading ? (
                            <div className="w-6 h-6 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
                        ) : (
                            <Upload className="w-7 h-7" />
                        )}
                    </div>

                    <h3 className="text-base font-bold text-white">
                        {uploading ? `Nahrávání videa do cloudu... (${uploadProgress}%)` : "Přetáhněte video sem nebo klikněte"}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                        Podporované formáty: MP4, WebM, QuickTime (MOV), AVI, OGG
                    </p>

                    {/* Progress Bar */}
                    {uploading && (
                        <div className="w-full mt-4 bg-slate-800 rounded-full h-2 overflow-hidden border border-white/10">
                            <div
                                className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full transition-all duration-300"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                    )}

                    {/* Alerts */}
                    {uploadError && (
                        <div className="mt-3 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            <span>{uploadError}</span>
                        </div>
                    )}

                    {uploadSuccess && (
                        <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                            <span>{uploadSuccess}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Videos Grid */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                        <Film className="w-4 h-4 text-cyan-400" />
                        Nahraná videa ({videos.length})
                    </h2>
                </div>

                {videos.length === 0 ? (
                    <div className="glass-panel p-12 text-center">
                        <FileVideo className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                        <h3 className="text-base font-semibold text-white">Žádná nahraná videa</h3>
                        <p className="text-xs text-slate-400 mt-1">
                            Nahrajte první video pomocí pole výše a poté ho přiřaďte do playlistu svých televizí.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {videos.map((video) => {
                            const isDeleting = deletingId === video.id;

                            return (
                                <div
                                    key={video.id}
                                    className="glass-card p-4 flex flex-col justify-between group relative overflow-hidden"
                                >
                                    <div>
                                        {/* Video preview thumbnail card */}
                                        <div
                                            onClick={() => setSelectedVideo(video)}
                                            className="w-full aspect-video rounded-lg bg-slate-900/90 border border-white/5 flex items-center justify-center relative cursor-pointer group-hover:border-indigo-500/40 transition-all overflow-hidden mb-3"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-indigo-600/80 group-hover:bg-indigo-500 flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110">
                                                <Play className="w-5 h-5 ml-0.5 fill-white" />
                                            </div>
                                            <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/75 text-[10px] font-mono text-slate-300">
                                                {video.mimeType.split("/")[1]?.toUpperCase() || "VIDEO"}
                                            </span>
                                        </div>

                                        {/* Video info */}
                                        <h4 className="font-semibold text-sm text-white truncate" title={video.name}>
                                            {video.name}
                                        </h4>
                                        <p className="text-[11px] font-mono text-slate-500 truncate mt-0.5">
                                            {video.filename}
                                        </p>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                                        <div className="flex items-center gap-1.5">
                                            <HardDrive className="w-3.5 h-3.5 text-slate-500" />
                                            <span>{formatSize(video.size)}</span>
                                        </div>

                                        <button
                                            onClick={() => handleDelete(video)}
                                            disabled={isDeleting}
                                            title="Smazat video"
                                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Video Player Modal */}
            {selectedVideo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
                    <div className="glass-panel p-6 max-w-3xl w-full bg-[#111420] border-white/20">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-base font-bold text-white flex items-center gap-2">
                                    <Film className="w-4 h-4 text-cyan-400" />
                                    {selectedVideo.name}
                                </h3>
                                <p className="text-xs text-slate-400 mt-0.5 font-mono">
                                    {selectedVideo.filename} • {formatSize(selectedVideo.size)}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedVideo(null)}
                                className="p-1 rounded-lg text-slate-400 hover:text-white"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* HTML5 Video Player */}
                        <div className="w-full aspect-video rounded-xl bg-black overflow-hidden border border-white/10 shadow-2xl">
                            <video
                                src={`https://xtzfgwytrehvkgamvkrs.supabase.co/storage/v1/object/public/videos/${selectedVideo.filename}`}
                                controls
                                autoPlay
                                className="w-full h-full object-contain"
                            >
                                Váš prohlížeč nepodporuje přehrávání videa.
                            </video>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
