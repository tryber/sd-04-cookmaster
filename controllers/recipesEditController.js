const recipeModel = require('../models/recipesByIdModel');
const recipeEditModel = require('../models/recipeEditModel');

const recipeEditForm = async  (req, res) => {
  const recipe = await recipeModel(req.params.id);
  if (recipe[0][1] !== req.user.id) return res.redirect(`/recipes/${req.params.id}`);
  return res.render('recipeEdit', { recipe, user: req.user });
};

const recipeEdit = async (req, res) => {
  const { recipeName, ingredients, recipeInstructions } = req.body;
  const ingredientsString = ingredients.join(',');
  console.log()
  
  recipeEditModel(req.params.id, recipeName, ingredientsString, recipeInstructions)
  .then(() => res.redirect(`/recipes/${req.params.id}`));
}

module.exports = {
  recipeEditForm,
  recipeEdit,
};
