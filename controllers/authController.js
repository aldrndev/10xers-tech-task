const { User } = require("../models");
const { checkPassword } = require("../utils/bcrypt");
const { createToken } = require("../utils/jwt");

class AuthController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new Error("email_password_required"));
      }

      const checkUser = await User.findOne({ where: { email } });

      if (!checkUser) {
        return next(new Error("user_not_found"));
      }

      if (!checkPassword(password, checkUser.password)) {
        return next(new Error("password_not_match"));
      }

      const payload = {
        id: checkUser.id,
        email: checkUser.email,
        name: checkUser.name,
        role: checkUser.role,
        phoneNumber: checkUser.phoneNumber,
      };

      const token = createToken(payload);

      res.status(200).json({
        message: `Welcome back ${checkUser.name}`,
        access_token: token,
        user: payload,
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { name, email, password, role, phoneNumber } = req.body;

      const createUser = await User.create({
        name,
        email,
        password,
        role,
        phoneNumber,
      });

      res.status(201).json({
        message: `User ${createUser.name} created successfully`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
