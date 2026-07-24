import { Router } from "express";
import path from "path";
import fs from "fs/promises";
import multer from "multer";
import { prisma } from "../lib/prisma.js";
import { supabase } from "../lib/supabase.js";

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

// POST /videos/upload – Nahrání nového videa (nyní s uploadem na Supabase)
router.post("/upload", upload.single("video"), async (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
    }

    try {
        const fileBuffer = await fs.readFile(req.file.path);
        const { error: uploadError } = await supabase.storage
            .from("videos")
            .upload(req.file.filename, fileBuffer, {
                contentType: req.file.mimetype,
                cacheControl: "3600",
                upsert: false,
            });

        // Vždy smažeme dočasný soubor z disku Render serveru, i když to spadne
        await fs.unlink(req.file.path).catch(console.error);

        if (uploadError) {
            console.error("Supabase upload error:", uploadError);
            res.status(500).json({ error: "Failed to upload video to cloud storage" });
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
    } catch (err) {
        console.error("Upload handler error:", err);
        // Smazat z disku při neočekávané chybě
        if (req.file) {
            await fs.unlink(req.file.path).catch(() => {});
        }
        res.status(500).json({ error: "Internal server error during upload" });
    }
});

// GET /videos – Seznam všech videí
router.get("/", async (_req, res) => {
    const videos = await prisma.video.findMany({
        orderBy: { createdAt: "desc" },
    });
    res.json(videos);
});

// Původní lokální streamování (GET /videos/stream/:filename) bylo odstraněno.
// Televize nyní bude stahovat videa přímo ze Supabase Storage veřejných URL.

// DELETE /videos/:id – Smaže video z DB i z disku
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    const video = await prisma.video.findUnique({ where: { id } });
    if (!video) {
        res.status(404).json({ error: "Video not found" });
        return;
    }

    // Smazat ze Supabase Storage
    const { error: storageError } = await supabase.storage.from("videos").remove([video.filename]);
    if (storageError) {
        console.warn(`Failed to delete video from Supabase: ${storageError.message}`);
    }

    // Smazat z DB (PlaylistItems se smažou automaticky díky onDelete: Cascade)
    await prisma.video.delete({ where: { id } });

    res.json({ message: "Video deleted" });
});

export default router;
