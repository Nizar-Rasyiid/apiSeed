const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("seed", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const Barang = sequelize.define(
  "Barang",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    gambar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    harga: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: "barang",
    timestamps: true,
  }
);

sequelize.sync().then(() => {
  console.log("Barang table has been created.");
});

module.exports = Barang;
