const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/dbConfig');


const Transaction = sequelize.define(
  'Transaction',
  {
    customerDetails: {
      type: DataTypes.JSON,
      allowNull: false,
    },

    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    payment_gateway: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["esewa", "khalti"]],
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["PENDING", "COMPLETED", "FAILED", "REFUNDED"]],
      },
      defaultValue: "PENDING",
    },
  },
  {
    timestamps: true,
  }
)


module.exports = Transaction