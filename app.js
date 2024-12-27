const express = require("express");
const cors = require("cors");
const orderRoutes = require("./routes/orderRoutes");
const pohonRoutes = require("./routes/pohonRoutes");
const barangRoutes = require("./routes/barangRoutes");

const app = express();
const port = 3000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use(orderRoutes);
app.use(pohonRoutes);
app.use(barangRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
