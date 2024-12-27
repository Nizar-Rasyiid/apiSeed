const express = require("express");
const PohonController = require("../controllers/PohonController");

const router = express.Router();

// Define routes dengan prefix /pohon
router.post("/pohon", PohonController.createPohon);
router.get("/pohon", PohonController.getAllPohon);
router.get("/pohon/:id", PohonController.getPohonById);
router.put("/pohon/:id", PohonController.updatePohon);
router.delete("/pohon/:id", PohonController.deletePohon);

module.exports = router;
