const express = require("express");
const Shipping = require("../models/Shipping");
const Product = require("../models/Product"); // Assuming you have a Product model

const router = express.Router();

// Create a new shipping
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, shippingMethod, email, paymentMethod, totalHarga, productId, quantity } = req.body;

    // Find the product
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if enough stock is available
    if (product.stock < quantity) {
      return res.status(400).json({ error: "Not enough stock available" });
    }

    // Calculate total price
    const totalPrice = totalHarga * quantity;

    // Create the shipping
    const shipping = await Shipping.create({
      firstName,
      lastName,
      shippingMethod,
      email,
      paymentMethod,
      totalHarga: totalPrice,
    });

    // Reduce the stock
    product.stock -= quantity;
    await product.save();

    res.status(201).json(shipping);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read all shippings
router.get("/", async (req, res) => {
  try {
    const shippings = await Shipping.findAll();
    res.status(200).json(shippings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Read a single shipping by ID
router.get("/:id", async (req, res) => {
  try {
    const shipping = await Shipping.findByPk(req.params.id);
    if (!shipping) {
      return res.status(404).json({ error: "Shipping not found" });
    }
    res.status(200).json(shipping);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a shipping by ID
router.put("/:id", async (req, res) => {
  try {
    const { firstName, lastName, shippingMethod, email, paymentMethod, totalHarga } = req.body;
    const shipping = await Shipping.findByPk(req.params.id);
    if (!shipping) {
      return res.status(404).json({ error: "Shipping not found" });
    }

    shipping.firstName = firstName;
    shipping.lastName = lastName;
    shipping.shippingMethod = shippingMethod;
    shipping.email = email;
    shipping.paymentMethod = paymentMethod;
    shipping.totalHarga = totalHarga;

    await shipping.save();
    res.status(200).json(shipping);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a shipping by ID
router.delete("/:id", async (req, res) => {
  try {
    const shipping = await Shipping.findByPk(req.params.id);
    if (!shipping) {
      return res.status(404).json({ error: "Shipping not found" });
    }

    await shipping.destroy();
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
