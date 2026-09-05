import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { supabase } from "../lib/supabase.js";
import { adminAuth, DEFAULT_ADMIN_KEY } from "../middleware/adminAuth.js";

const router = Router({ mergeParams: true }); // Dědí :id z nadřazeného routeru

// GET /devices/:id/playlist – Vrátí aktuální playlist (přístup pro TV s tokenem nebo admina s admin klíčem)
router.get("/", async (req, res) => {
    const { id } = req.params as { id: string };

    // Ověříme, že zařízení existuje
    const deviceExists = await prisma.device.findUnique({ where: { id } });
    if (!deviceExists) {
        res.status(404).json({ error: "Device not found" });
        return;
    }

    const configuredAdminKey = process.env.ADMIN_API_KEY || DEFAULT_ADMIN_KEY;
    const customAdminHeader = req.headers["x-admin-key"] as string | undefined;

    // 1. Ověření administrátora přes x-admin-key
    if (customAdminHeader && customAdminHeader === configuredAdminKey) {
        // Admin povolen
    } else {
        // 2. Ověření TV tokenu nebo admin Bearer tokenu
        const authHeader = req.headers.authorization;
        const token = authHeader?.startsWith("Bearer ")
            ? authHeader.slice(7)
            : (req.query.token as string);

        if (!token) {
            res.status(401).json({ error: "Unauthorized: Chybí autorizace (token zařízení nebo admin klíč)" });
            return;
        }

        if (token === configuredAdminKey) {
            // Admin povolen přes Bearer
        } else {
            const device = await prisma.device.findUnique({
                where: { token },
                select: { id: true },
            });
            if (!device || device.id !== id) {
                res.status(403).json({ error: "Token does not match device" });
                return;
            }
        }
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

// POST /devices/:id/playlist – Admin přidá video do playlistu TV (zabezpečeno admin klíčem)
router.post("/", adminAuth, async (req, res) => {
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

// DELETE /devices/:id/playlist/:videoId – Admin odebere video z playlistu (zabezpečeno admin klíčem)
router.delete("/:videoId", adminAuth, async (req, res) => {
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

// PUT /devices/:id/playlist/reorder – Admin změní pořadí videí (zabezpečeno admin klíčem)
router.put("/reorder", adminAuth, async (req, res) => {
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
