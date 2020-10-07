const recipeModel = require('../models/recipesByIdModel');
const recipeEditModel = require('../models/recipeEditModel');

const recipeEditForm = async (req, res) => {
  const recipe = await recipeModel(req.params.id);
  return res.render('recipeEdit', { recipe, user: req.user });
};

const recipeEdit = async (req, res) => {
  const { recipeName, ingredients, recipeInstructions } = req.body;

  const ingredientsString = ingredients.join(',');

  recipeEditModel(req.params.id, recipeName, ingredientsString, recipeInstructions)
    .then(() => res.redirect(`/`));
};

module.exports = {
  recipeEditForm,
  recipeEdit,
};
