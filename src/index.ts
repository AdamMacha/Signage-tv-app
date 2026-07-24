import express from "express";
import cors from "cors";
import fs from "fs";

import devicesRouter from "./routes/devices.js";
import videosRouter from "./routes/videos.js";
import playlistRouter from "./routes/playlist.js";

// Ujištění, že složka uploads existuje (i pro dočasné soubory)
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

const app = express();

app.use(cors());
app.use(express.json());

// Routery
app.use("/devices", devicesRouter);
app.use("/videos", videosRouter);
app.use("/devices/:id/playlist", playlistRouter);

app.get("/", (_req, res) => {
    res.json({ status: "ok", message: "Signage Server is running" });
});

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});