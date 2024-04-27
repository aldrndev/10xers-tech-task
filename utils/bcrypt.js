const bcrypt = require("bcryptjs");

const hashPassword = (password) => {
  return bcrypt.hashSync(password);
};

const checkPassword = (password, hashPwd) => {
  return bcrypt.compareSync(password, hashPwd);
};

module.exports = {
  hashPassword,
  checkPassword,
};
