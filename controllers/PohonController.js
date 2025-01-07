const Pohon = require("../models/Pohon");

// Get all pohon
exports.getAllPohon = async (req, res) => {
  try {
    const pohon = await Pohon.findAll();
    res.status(200).json(pohon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get pohon by id
exports.getPohonById = async (req, res) => {
  try {
    const pohon = await Pohon.findByPk(req.params.id);
    if (pohon) {
      res.status(200).json(pohon);
    } else {
      res.status(404).json({ message: "Pohon not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new pohon
exports.createPohon = async (req, res) => {
  try {
    const newPohon = await Pohon.create(req.body);
    res.status(201).json(newPohon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update pohon by id
exports.updatePohon = async (req, res) => {
  try {
    const [updated] = await Pohon.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedPohon = await Pohon.findByPk(req.params.id);
      res.status(200).json(updatedPohon);
    } else {
      res.status(404).json({ message: "Pohon not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete pohon by id
exports.deletePohon = async (req, res) => {
  try {
    const deleted = await Pohon.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: "Pohon not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.uploadGambarPohon = async (req, res) => {
  try {
    console.log("File upload started");
    console.log("Request file:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const barang = await Barang.findByPk(req.params.id);
    if (!barang) {
      return res.status(404).json({ error: "Barang not found" });
    }

    // Update path gambar
    const imageUrl = `http://192.168.1.11:80/${req.file.path}`;
    barang.gambar = imageUrl; // Simpan URL lengkap
    await barang.save();

    res.status(200).json({
      message: "Gambar berhasil diupload",
      data: barang,
      file: req.file,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: error.message });
  }
};
