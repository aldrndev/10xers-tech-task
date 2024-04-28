const { verifyToken } = require("../utils/jwt");
const { User, Product } = require("../models");

const authenticate = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      return next(new Error("unathorized"));
    }

    const verify = verifyToken(access_token);

    const checkUser = await User.findByPk(verify.id);

    if (!checkUser) {
      return next(new Error("unathorized"));
    }

    if (checkUser.role !== "admin") {
      return next(new Error("forbidden"));
    }

    req.user = verify;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
