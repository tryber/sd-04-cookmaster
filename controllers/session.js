const userModel = require('../models/user');

const signup = (req, res) => {
  const { name } = req.body;
  console.log(name);
};

module.exports = {
  signup,
};
