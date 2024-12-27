const express = require("express");
const OrderController = require("../controllers/OrderController");

const router = express.Router();
router.post("/orders", OrderController.createOrder);
router.get("/orders/:id", OrderController.getOrder);
router.get("/products/:type/:id", OrderController.getProductDetails);

module.exports = router;
