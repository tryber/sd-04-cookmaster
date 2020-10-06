const recipe = require('../models/recipeModel');

const listRecipes = async (req, res) => {
  try {
    const recipes = await recipe.getAllRecipes();
    return res.render('home', { recipes, user: req.user });
  } catch (error) {
    return error;
  }
};

module.exports = { listRecipes };
