const recipe = require('../models/recipeModel');

const listRecipes = async (_req, res) => {
  try {
    const recipes = await recipe.getAllRecipes();

    console.log(recipes);
    return res.render('home', { recipes });
  } catch (error) {
    return error;
  }
};

module.exports = { listRecipes };
