import type { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma.js";

// Rozšíříme Request o device
declare global {
    namespace Express {
        interface Request {
            device?: {
                id: string;
                name: string;
            };
        }
    }
}

/**
 * Middleware pro ověření TV tokenu.
 * TV posílá token v hlavičce: Authorization: Bearer <TOKEN>
 * Nebo jako query parametr: ?token=<TOKEN>
 */
export async function deviceAuth(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
        ? authHeader.slice(7)
        : (req.query.token as string);

    if (!token) {
        res.status(401).json({ error: "Missing authorization token" });
        return;
    }

    const device = await prisma.device.findUnique({
        where: { token },
        select: { id: true, name: true },
    });

    if (!device) {
        res.status(401).json({ error: "Invalid token" });
        return;
    }

    req.device = device;
    next();
}
