import type { Request, Response, NextFunction } from "express";

export const DEFAULT_ADMIN_KEY = "alion-advert-secret-2026";

/**
 * Middleware pro ověření administrátorského přístupu.
 * Očekává hlavičku: x-admin-key: <ADMIN_KEY>
 * Nebo: Authorization: Bearer <ADMIN_KEY>
 */
export function adminAuth(req: Request, res: Response, next: NextFunction) {
    const configuredKey = process.env.ADMIN_API_KEY || DEFAULT_ADMIN_KEY;

    const customHeader = req.headers["x-admin-key"] as string | undefined;
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined;

    const providedKey = customHeader || bearerToken;

    if (!providedKey || providedKey !== configuredKey) {
        res.status(401).json({
            error: "Unauthorized: Přístup zamítnut. Neplatný nebo chybějící administrační klíč.",
        });
        return;
    }

    next();
}
