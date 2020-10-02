const { authMiddleware } = require('./auth');
const validate = require('./validate');

module.exports = {
  validate,
  auth: authMiddleware,
};
