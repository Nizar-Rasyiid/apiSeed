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
