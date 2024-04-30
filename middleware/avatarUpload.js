import path from "node:path";
import multer from "multer";

const tmpDir = path.resolve("tmp");

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const filter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(HttpError(400, "Please, upload images only"), false);
  }
};

export const uploadAvatar = multer({
  storage: multerConfig,
  fileFilter: filter,
  limits: {
    fieldSize: 2 * 1024 * 1024,
  },
}).single("avatar");
