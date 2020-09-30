const getRecipes = require('../models/recipesModel');

const home = async (_req, res) => {
  const recipes = await getRecipes();
  return res.render('home', { recipes });
};

module.exports = { home };
