const { getRecipes } = require('../models/recipesModel');

const recipesCtrl = async (req, res) => {
  const recipes = await getRecipes();
  console.log(recipes);
  const { token } = req.cookies || {};
  console.log(token);
  return res.render('home', { recipes, token });
};

module.exports = {
  recipesCtrl,
};