const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("seed", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
const Shipping = sequelize.define(
  "Shipping",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shippingMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalHarga: {
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
    // Other model options go here
    tableName: "shipping",
    timestamps: true,
  }
);

// Sync the model with the database
sequelize.sync().then(() => {
  console.log("Shipping table has been created.");
});

module.exports = Shipping;
