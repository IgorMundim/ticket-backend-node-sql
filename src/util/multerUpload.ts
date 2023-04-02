import * as multer from "multer";
import { extname, resolve } from "path";
const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, resolve(__dirname, "..", "..", "uploads", "images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
  },
});

const uploads = multer({
  storage: fileStorage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

export default uploads;
