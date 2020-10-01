const { getRecipes } = require('../models/getRecipes');


const recipesController = async (req, res) => {
  const recipes = await getRecipes();
  const { token = '' } = req.cookies || {};
  return res.render('home', { recipes, token });
};

module.exports = recipesController;
