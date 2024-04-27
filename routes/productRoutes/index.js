const express = require("express");
const ProductController = require("../../controllers/productController");
const router = express.Router();

router.get("/show", ProductController.getProduct);
router.post("/add", ProductController.addProduct);

router.get("/show/:id", ProductController.getProductDetail);
router.put("/edit/:id", ProductController.editProduct);
router.delete("/delete/:id", ProductController.deleteProduct);

module.exports = router;
