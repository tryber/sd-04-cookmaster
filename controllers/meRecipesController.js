const meRecipesModel = require('../models/meRecipesModel');

const meRecipeController = async (req, res) => {
  const recipes = await meRecipesModel(req.user.id);
  res.render('meRecipes', { recipes });
};

module.exports = meRecipeController;
