const { authMiddleware } = require('./auth');
// const { validar } = require('./validate');

module.exports = {
  auth: authMiddleware,
  // validar,
};
