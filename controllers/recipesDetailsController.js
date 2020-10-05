const recipesDetailsModel = require('../models/recipesByIdModel');

const recipesDetailsController = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesDetailsModel(id);
  res.render('recipeDetails', { recipe, user: req.user });
};

module.exports = recipesDetailsController;
