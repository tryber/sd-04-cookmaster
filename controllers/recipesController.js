const recipesModel = require('../models/recipesModel');

const listRecipes = async (_req, res) => {
  const recipes = await recipesModel.getRecipes();

  res.render('home', { recipes });
};

module.exports = { listRecipes };
