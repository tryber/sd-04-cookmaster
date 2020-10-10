const { getRecipes } = require('../models/recipesModel');

const recipesCtrl = async (req, res) => {
  const recipes = await getRecipes();
  const { token } = req.cookies || {};
  return res.render('home', { recipes, token });
};

module.exports = {
  recipesCtrl,
};
