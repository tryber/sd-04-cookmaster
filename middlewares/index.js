const { authMiddleware } = require('./auth');
const validation = require('./validation');

module.exports = {
  auth: authMiddleware,
  userValidation: validation,
};
