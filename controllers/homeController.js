const recipeModel = require('../models/recipeModel');

const home = async (req, res) => {
  const { token = '' } = req.cookies || {};
  const recipes = await recipeModel.getAll();
  res.render('home', { recipes, isLogged: token });
};

module.exports = {
  home,
};
