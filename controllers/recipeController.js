const recipeModel = require('../models/recipesModel');

const listRecipes = async (req, res) => {
  const recipesAuthor = await recipeModel.getAllRecipes();
  res.render('home', { recipesAuthor, user: req.user });
};

module.exports = { listRecipes };
