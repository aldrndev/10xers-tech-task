"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User);
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
        },
      },
      price: {
        type: DataTypes.NUMBER,
        allowNull: false,
        validate: {
          notEmpty: true,
          notNull: true,
          min: 1,
        },
      },
      stock: {
        type: DataTypes.NUMBER,
        allowNull: false,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      UserId: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
