const { authMiddleware } = require('./auth');
const userAuth = require('./userAuth');

module.exports = {
  auth: authMiddleware,
  userAuth,
};
