const { authMiddleware } = require('./auth');
const { validatedRegister } = require('./registerValidate');

module.exports = {
  auth: authMiddleware,
  validatedRegister,
};
