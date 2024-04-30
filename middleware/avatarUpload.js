import path from "node:path";
import multer from "multer";

const tmpDir = path.resolve("tmp");

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    // const extension = file.mimetype.split("/")[1];
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage: multerConfig,
});
