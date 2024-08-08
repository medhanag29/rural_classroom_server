import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname.replace(/\.[^/.]+$/, "")}${path.extname(file.originalname)}`);
  },
});

export const upload = multer({ storage: storage });