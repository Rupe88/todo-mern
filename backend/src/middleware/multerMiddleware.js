// multerConfig.js
import multer from "multer";
import path from "path";

// Configure storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// Initialize multer with storage config
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|pdf|doc|docx/; // allowed file types
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only images and documents are allowed"));
    }
  },
});

export default upload;
