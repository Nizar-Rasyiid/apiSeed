const express = require("express");
const multer = require("multer");
const BarangController = require("../controllers/BarangController");

const router = express.Router();
const path = require("path"); // tambahkan ini
const fs = require("fs"); // tambahkan ini

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

// Define routes
router.get("/barang", BarangController.getAllBarang);
router.get("/barang/:id", BarangController.getBarangById);
router.post("/barang", BarangController.createBarang);
router.put("/barang/:id", BarangController.updateBarang);
router.delete("/barang/:id", BarangController.deleteBarang);

// Route untuk upload gambar
router.post(
  "/barang/:id/upload",
  upload.single("gambar"),
  (req, res, next) => {
    console.log("Request received");
    console.log("Files:", req.file);
    next();
  },
  BarangController.uploadGambarBarang
);

module.exports = router;
