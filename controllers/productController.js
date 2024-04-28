const { Op } = require("sequelize");
const { Product, User } = require("../models");

class ProductController {
  static async getProduct(req, res, next) {
    try {
      let filterProduct = req.query.filter
        ? { brand: { [Op.iLike]: req.query.filter } }
        : {};

      let searchProduct = req.query.search
        ? { name: { [Op.iLike]: `%${req.query.search}%` } }
        : {};

      let sortProduct = [];

      if (req.query.sort === "highest") {
        sortProduct = [["price", "DESC"]];
      } else if (req.query.sort === "lowest") {
        sortProduct = [["price", "ASC"]];
      }

      const products = await Product.findAll({
        where: {
          ...filterProduct,
          ...searchProduct,
        },
        include: {
          model: User,
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
        order: sortProduct,
      });

      if (products.length === 0) {
        res.status(200).json({
          message: "No product found",
        });
      }

      res.status(200).json({
        message: "Success get product data",
        data: products,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProductDetail(req, res, next) {
    try {
      const { id } = req.params;

      const productDetail = await Product.findByPk(id, {
        include: {
          model: User,
          attributes: {
            exclude: ["createdAt", "updatedAt", "password"],
          },
        },
      });

      if (!productDetail) {
        return next(new Error("product_not_found"));
      }

      res.status(200).json({
        message: "Success get product detail",
        data: productDetail,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addProduct(req, res, next) {
    try {
      const { id } = req.user;
      const { name, description, price, stock, brand } = req.body;

      const createProduct = await Product.create({
        name,
        description,
        price,
        stock,
        brand,
        UserId: id,
      });

      res.status(201).json({
        message: `Success create product ${createProduct.name}`,
        data: createProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;

      const removeProduct = await Product.destroy({ where: { id } });

      if (!removeProduct) {
        return next(new Error("product_not_found"));
      }

      res.status(200).json({
        message: "Success delete product",
      });
    } catch (error) {
      next(error);
    }
  }

  static async editProduct(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, price, stock, brand } = req.body;

      const updateProduct = await Product.update(
        { name, description, price, stock, brand },
        { where: { id } }
      );

      if (!updateProduct) {
        return next(new Error("product_not_found"));
      }

      const checkUpdate = await Product.findByPk(id);

      res.status(200).json({
        message: "Success edit product",
        data: checkUpdate,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;
