const { authMiddleware } = require('./auth');
const { passwordValidation, regexValidation } = require('./validations');

module.exports = {
  auth: authMiddleware,
  passwordValidation,
  regexValidation,
};
