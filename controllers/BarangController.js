const Barang = require("../models/Barang");

// Get all barang
exports.getAllBarang = async (req, res) => {
  try {
    const barang = await Barang.findAll();
    res.status(200).json(barang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get barang by id
exports.getBarangById = async (req, res) => {
  try {
    const barang = await Barang.findByPk(req.params.id);
    if (barang) {
      res.status(200).json(barang);
    } else {
      res.status(404).json({ message: "Barang not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create new barang
exports.createBarang = async (req, res) => {
  try {
    const newBarang = await Barang.create(req.body);
    res.status(201).json(newBarang);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update barang by id
exports.updateBarang = async (req, res) => {
  try {
    const [updated] = await Barang.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedBarang = await Barang.findByPk(req.params.id);
      res.status(200).json(updatedBarang);
    } else {
      res.status(404).json({ message: "Barang not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete barang by id
exports.deleteBarang = async (req, res) => {
  try {
    const deleted = await Barang.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: "Barang not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Upload Gambar Barang
exports.uploadGambarBarang = async (req, res) => {
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
