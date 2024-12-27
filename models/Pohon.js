const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("seed", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const Pohon = sequelize.define(
  "Pohon",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    gambar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    harga: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "pohon",
    timestamps: true,
  }
);

sequelize.sync().then(() => {
  console.log("Pohon table has been created.");
});

module.exports = Pohon;
