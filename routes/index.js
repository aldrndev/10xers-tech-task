const express = require("express");
const router = express.Router();
const authRouter = require("./authRoutes");
const productRouter = require("./productRoutes");

router.use("/v1/auth", authRouter);
router.use("/v1/product", productRouter);

module.exports = router;
