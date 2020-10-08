const meRecipesModel = require('../models/meRecipesModel');

const meRecipesController = async (req, res) => {
  const { user } = req;
  const recipes = await meRecipesModel.findById(user.id);

  res.render('meRecipes', { recipes, user });
};

module.exports = {
  meRecipesController,
};
