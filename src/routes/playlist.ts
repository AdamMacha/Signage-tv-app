import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { deviceAuth } from "../middleware/auth.js";
import { supabase } from "../lib/supabase.js";

const router = Router({ mergeParams: true }); // Dědí :id z nadřazeného routeru

// GET /devices/:id/playlist – Vrátí aktuální playlist (pro TV i admina)
// TV se autentizuje tokenem
router.get("/", deviceAuth, async (req, res) => {
    const { id } = req.params as { id: string };

    // Zkontrolujeme, že token patří k tomuto zařízení
    if (req.device?.id !== id) {
        res.status(403).json({ error: "Token does not match device" });
        return;
    }

    const items = await prisma.playlistItem.findMany({
        where: { deviceId: id },
        orderBy: { order: "asc" },
        include: {
            video: {
                select: {
                    id: true,
                    name: true,
                    filename: true,
                    mimeType: true,
                    size: true,
                },
            },
        },
    });

    const playlist = items.map((item) => ({
        playlistItemId: item.id,
        order: item.order,
        video: {
            ...item.video,
            downloadUrl: supabase.storage.from("videos").getPublicUrl(item.video.filename).data.publicUrl,
        },
    }));

    res.json(playlist);
});

// POST /devices/:id/playlist – Admin přidá video do playlistu TV
router.post("/", async (req, res) => {
    const { id: deviceId } = req.params as { id: string };
    const { videoId, order } = req.body as { videoId?: string; order?: number };

    if (!videoId) {
        res.status(400).json({ error: "videoId is required" });
        return;
    }

    // Ověříme, že zařízení existuje
    const device = await prisma.device.findUnique({ where: { id: deviceId } });
    if (!device) {
        res.status(404).json({ error: "Device not found" });
        return;
    }

    // Ověříme, že video existuje
    const video = await prisma.video.findUnique({ where: { id: videoId } });
    if (!video) {
        res.status(404).json({ error: "Video not found" });
        return;
    }

    // Pokud order není zadán, přidáme na konec
    let itemOrder = order;
    if (itemOrder === undefined) {
        const lastItem = await prisma.playlistItem.findFirst({
            where: { deviceId },
            orderBy: { order: "desc" },
        });
        itemOrder = (lastItem?.order ?? 0) + 1;
    }

    const item = await prisma.playlistItem.create({
        data: { deviceId, videoId, order: itemOrder },
        include: { video: { select: { name: true, filename: true } } },
    });

    res.status(201).json(item);
});

// DELETE /devices/:id/playlist/:videoId – Admin odebere video z playlistu
router.delete("/:videoId", async (req, res) => {
    const { id: deviceId, videoId } = req.params as { id: string; videoId: string };

    const item = await prisma.playlistItem.findUnique({
        where: { deviceId_videoId: { deviceId, videoId } },
    });

    if (!item) {
        res.status(404).json({ error: "Video not in playlist" });
        return;
    }

    await prisma.playlistItem.delete({
        where: { deviceId_videoId: { deviceId, videoId } },
    });

    res.json({ message: "Video removed from playlist" });
});

// PUT /devices/:id/playlist/reorder – Admin změní pořadí videí
router.put("/reorder", async (req, res) => {
    const { id: deviceId } = req.params as { id: string };
    const { order } = req.body as { order?: Array<{ videoId: string; order: number }> };

    if (!Array.isArray(order) || order.length === 0) {
        res.status(400).json({ error: "order array is required" });
        return;
    }

    // Aktualizujeme pořadí v transakci
    await prisma.$transaction(
        order.map(({ videoId, order: newOrder }) =>
            prisma.playlistItem.update({
                where: { deviceId_videoId: { deviceId, videoId } },
                data: { order: newOrder },
            })
        )
    );

    res.json({ message: "Playlist reordered" });
});

export default router;
