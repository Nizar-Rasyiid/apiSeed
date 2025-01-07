const express = require("express");
const multer = require("multer");

const PohonController = require("../controllers/PohonController");

const path = require("path"); // tambahkan ini
const fs = require("fs"); // tambahkan ini
const router = express.Router();

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Update konfigurasi multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // limit 5MB
  },
});

// Define routes dengan prefix /pohon
router.post("/pohon", PohonController.createPohon);
router.get("/pohon", PohonController.getAllPohon);
router.get("/pohon/:id", PohonController.getPohonById);
router.put("/pohon/:id", PohonController.updatePohon);
router.delete("/pohon/:id", PohonController.deletePohon);
router.post(
  "/pohon/:id/upload",
  upload.single("gambar"),
  (req, res, next) => {
    console.log("Request received");
    console.log("Files:", req.file);
    next();
  },
  PohonController.uploadGambarPohon
);

module.exports = router;
