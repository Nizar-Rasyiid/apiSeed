const express = require("express");
const BarangController = require("../controllers/BarangController");

const router = express.Router();

// Define routes
router.get("/barang", BarangController.getAllBarang);
router.get("/barang/:id", BarangController.getBarangById);
router.post("/barang", BarangController.createBarang);
router.put("/barang/:id", BarangController.updateBarang);
router.delete("/barang/:id", BarangController.deleteBarang);

module.exports = router;
