import { Router } from "express";
import path from "path";
import fs from "fs/promises";
import { createReadStream, statSync } from "fs";
import multer from "multer";
import { prisma } from "../lib/prisma.js";

const router = Router();

// Nastavení multer úložiště
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    fileFilter: (_req, file, cb) => {
        const allowedExtensions = [".mp4", ".webm", ".ogg", ".mov", ".avi"];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowedExtensions.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error(`Unsupported file extension: ${ext}. Allowed: ${allowedExtensions.join(", ")}`));
        }
    },
});

// POST /videos/upload – Nahrání nového videa
router.post("/upload", upload.single("video"), async (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
    }

    const video = await prisma.video.create({
        data: {
            name: (req.body.name as string) || req.file.originalname,
            filename: req.file.filename,
            mimeType: req.file.mimetype,
            size: req.file.size,
        },
    });

    res.status(201).json(video);
});

// GET /videos – Seznam všech videí
router.get("/", async (_req, res) => {
    const videos = await prisma.video.findMany({
        orderBy: { createdAt: "desc" },
    });
    res.json(videos);
});

// GET /videos/stream/:filename – Streaming videa pro TV
// Podporuje HTTP Range requesty (Android ExoPlayer to vyžaduje)
router.get("/stream/:filename", (req, res) => {
    const { filename } = req.params;
    const filePath = path.join("uploads", filename);

    let stat;
    try {
        stat = statSync(filePath);
    } catch {
        res.status(404).json({ error: "File not found" });
        return;
    }

    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        // Partial content – Android ExoPlayer posílá Range hlavičky
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0] ?? "0", 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunkSize = end - start + 1;

        res.writeHead(206, {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunkSize,
            "Content-Type": "video/mp4",
        });

        createReadStream(filePath, { start, end }).pipe(res);
    } else {
        // Celý soubor najednou
        res.writeHead(200, {
            "Content-Length": fileSize,
            "Content-Type": "video/mp4",
            "Accept-Ranges": "bytes",
        });

        createReadStream(filePath).pipe(res);
    }
});

// DELETE /videos/:id – Smaže video z DB i z disku
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    const video = await prisma.video.findUnique({ where: { id } });
    if (!video) {
        res.status(404).json({ error: "Video not found" });
        return;
    }

    // Smazat fyzický soubor
    try {
        await fs.unlink(path.join("uploads", video.filename));
    } catch {
        console.warn(`File not found on disk: ${video.filename}`);
    }

    // Smazat z DB (PlaylistItems se smažou automaticky díky onDelete: Cascade)
    await prisma.video.delete({ where: { id } });

    res.json({ message: "Video deleted" });
});

export default router;
