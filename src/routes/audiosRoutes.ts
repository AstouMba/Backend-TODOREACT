import { Router } from "express";
import { audioUpload } from "../middlewaares/audioUpload.js";
import { AuthMiddleware } from "../middlewaares/AuthMiddleware.js";
import fs from "fs";
import path from "path";

const router = Router();
const audioDir = path.join(process.cwd(), "/uploads/audios");

router.post(
  "/audio",
  AuthMiddleware.authenticateUser,
  audioUpload.single("audio"),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier audio fourni" });
    }
    res.json({
      message: "Audio uploadé avec succès",
      file: req.file.filename,
      url: `/uploads/audios/${req.file.filename}`,
    });
  }
);

router.get("/", AuthMiddleware.authenticateUser, (req, res) => {
  fs.readdir(audioDir, (err, files) => {
    if (err) return res.status(500).json({ error: "Impossible de lire le dossier audio" });
    res.json({ audios: files.map(f => `/uploads/audios/${f}`) });
  });
});

export default router;
