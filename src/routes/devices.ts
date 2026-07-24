import { Router } from "express";
import crypto from "crypto";
import { prisma } from "../lib/prisma.js";
import { deviceAuth } from "../middleware/auth.js";

const router = Router();

// POST /devices – Vytvoří nové TV zařízení, vrátí token
router.post("/", async (req, res) => {
    const { name } = req.body as { name?: string };

    if (!name) {
        res.status(400).json({ error: "Device name is required" });
        return;
    }

    const token = crypto.randomBytes(32).toString("hex");

    const device = await prisma.device.create({
        data: { name, token },
    });

    res.status(201).json({
        id: device.id,
        name: device.name,
        token: device.token, // Vrátíme token jen při vytvoření!
        createdAt: device.createdAt,
    });
});

// GET /devices – Seznam všech zařízení (bez tokenů)
router.get("/", async (_req, res) => {
    const devices = await prisma.device.findMany({
        select: {
            id: true,
            name: true,
            lastSeen: true,
            pendingCommand: true,
            createdAt: true,
            _count: { select: { playlist: true } },
        },
        orderBy: { createdAt: "desc" },
    });

    res.json(devices);
});

// DELETE /devices/:id – Smaže zařízení
router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    const device = await prisma.device.findUnique({ where: { id } });
    if (!device) {
        res.status(404).json({ error: "Device not found" });
        return;
    }

    await prisma.device.delete({ where: { id } });
    res.json({ message: "Device deleted" });
});

// POST /devices/:id/heartbeat – TV říká "jsem online" + posílá status
// Vyžaduje autentizaci tokenem
router.post("/:id/heartbeat", deviceAuth, async (req, res) => {
    const { id } = req.params;
    const { currentVideo } = req.body as { currentVideo?: string };

    // Zkontrolujeme, že token patří k tomuto zařízení
    if (req.device?.id !== id) {
        res.status(403).json({ error: "Token does not match device" });
        return;
    }

    const device = await prisma.device.update({
        where: { id },
        data: { lastSeen: new Date() },
        select: { pendingCommand: true },
    });

    // Pokud existuje příkaz, vrátíme ho a smažeme
    const command = device.pendingCommand;
    if (command) {
        await prisma.device.update({
            where: { id },
            data: { pendingCommand: null },
        });
    }

    res.json({
        ok: true,
        command: command ?? null, // "restart" | "reload_playlist" | null
    });
});

// POST /devices/:id/command – Admin pošle příkaz TV
router.post("/:id/command", async (req, res) => {
    const { id } = req.params;
    const { action } = req.body as { action?: string };

    const validCommands = ["restart", "reload_playlist"];
    if (!action || !validCommands.includes(action)) {
        res.status(400).json({ error: `Invalid command. Valid: ${validCommands.join(", ")}` });
        return;
    }

    const device = await prisma.device.findUnique({ where: { id } });
    if (!device) {
        res.status(404).json({ error: "Device not found" });
        return;
    }

    await prisma.device.update({
        where: { id },
        data: { pendingCommand: action },
    });

    res.json({ message: `Command '${action}' queued for device ${device.name}` });
});

export default router;
