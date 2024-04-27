const express = require("express");
const ProductController = require("../../controllers/productController");
const authenticate = require("../../middlewares/auth");
const router = express.Router();

router.use(authenticate);
router.get("/get", ProductController.getProduct);
router.post("/add", ProductController.addProduct);

router.get("/get/:id", ProductController.getProductDetail);
router.put("/edit/:id", ProductController.editProduct);
router.delete("/delete/:id", ProductController.deleteProduct);

module.exports = router;
