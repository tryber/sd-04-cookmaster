const { getRecipes } = require('../models/recipesModel');

const getAllRecipes = async (req, res) => {
  const recipes = await getRecipes();
  const { user = '' } = req;
  return res.render('home', { recipes, user });
};

module.exports = { getAllRecipes };
