const { getRecipes } = require('../models/recipesModel');

const recipesCtrl = async (req, res) => {
  console.log('?')
  const recipes = await getRecipes();
  console.log('ok')
  const { token } = req.cookies || {};
  return res.render('home', { recipes, token });
};

module.exports = {
  recipesCtrl,
};
