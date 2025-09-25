import multer from "multer";
import path from "path";
import fs from "fs";
const audioDir = path.join(process.cwd(), "/uploads/audios");
if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, audioDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});
export const audioUpload = multer({ storage });
//# sourceMappingURL=audioUpload.js.map