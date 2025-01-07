const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const orderRoutes = require("./routes/orderRoutes");
const pohonRoutes = require("./routes/pohonRoutes");
const barangRoutes = require("./routes/barangRoutes");

const app = express();
// const path = require("path");
const fs = require("fs");
const port = 80;

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use(orderRoutes);
app.use(pohonRoutes);
app.use(barangRoutes);

app.listen(port, "192.168.1.11", () => {
  console.log(`Server is running on http://192.168.1.11:${port}`);
});
