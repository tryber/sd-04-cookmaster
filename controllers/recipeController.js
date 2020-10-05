const recipe = require('../models/recipeModel');

const listRecipes = async (_req, res) => {
  try {
    const recipes = await recipe.getAllRecipes();
    return res.render('home', { recipes });
  } catch (error) {
    return error;
  }
};

module.exports = { listRecipes };
