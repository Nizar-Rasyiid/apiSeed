// controllers/OrderController.js
const OrderModel = require("../models/Order");
const Barang = require("../models/Barang");
const Pohon = require("../models/Pohon");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("seed", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// Controller untuk menangani pemesanan
const controller = {
  // Membuat pesanan baru
  createOrder: async (req, res) => {
    const transaction = await OrderModel.sequelize.transaction();

    try {
      const {
        productType, // 'barang' atau 'pohon'
        productId,
        quantity,
        firstName,
        lastName,
        email,
        shippingMethod,
        paymentMethod,
      } = req.body;

      // Validasi input
      if (!productType || !productId || !quantity || quantity <= 0) {
        throw new Error("Data input tidak valid");
      }

      // Pilih model berdasarkan productType
      const Model = productType === "barang" ? Barang : Pohon;

      // Cek ketersediaan produk
      const product = await Model.findByPk(productId);

      if (!product) {
        throw new Error(`${productType} dengan ID ${productId} tidak ditemukan`);
      }

      // Cek stock
      if (product.stock < quantity) {
        throw new Error("Stock tidak mencukupi");
      }

      // Hitung total harga
      const totalHarga = product.harga * quantity;

      // Buat pesanan
      const order = await OrderModel.create(
        {
          productType,
          productId,
          quantity,
          totalPrice: totalHarga, // Pastikan totalPrice sesuai dengan skema
          firstName,
          lastName,
          email,
          shippingMethod,
          paymentMethod,
        },
        { transaction }
      );

      // Kurangi stock produk
      await product.update(
        {
          stock: product.stock - quantity,
        },
        { transaction }
      );

      // Komit transaksi
      await transaction.commit();

      res.status(201).json({
        message: "Pesanan berhasil dibuat",
        order,
        product: {
          id: product.id,
          title: product.title,
          description: product.description || product.desc,
          stock: product.stock,
          harga: product.harga,
        },
      });
    } catch (error) {
      // Rollback jika terjadi kesalahan
      await transaction.rollback();
      res.status(400).json({ error: error.message });
    }
  },

  // Mendapatkan detail pesanan
  getOrder: async (req, res) => {
    try {
      const order = await OrderModel.findByPk(req.params.id);

      if (!order) {
        return res.status(404).json({ message: "Pesanan tidak ditemukan" });
      }

      // Ambil detail produk
      const Model = order.productType === "barang" ? Barang : Pohon;
      const product = await Model.findByPk(order.productId);

      res.status(200).json({
        order,
        product: product
          ? {
              id: product.id,
              title: product.title,
              description: product.description || product.desc,
              stock: product.stock,
              harga: product.harga,
            }
          : null,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Mendapatkan detail produk (barang/pohon)
  getProductDetails: async (req, res) => {
    try {
      const { type, id } = req.params;

      // Pilih model berdasarkan type
      const Model = type === "barang" ? Barang : Pohon;
      const product = await Model.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: `${type} tidak ditemukan` });
      }

      res.status(200).json({
        id: product.id,
        title: product.title,
        description: product.description || product.desc,
        stock: product.stock,
        harga: product.harga,
        gambar: product.gambar,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = controller;
