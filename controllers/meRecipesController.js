const meRecipesModel = require('../models/meRecipesModel');

const meRecipeController = async (req, res) => {
  const recipes =  await meRecipesModel(req.user.id);
  console.log(recipes)
  res.render('meRecipes', { recipes });
}

module.exports = meRecipeController;
