const registerNewRecipe = require('../models/recipesNewModel');

const recipesNewForm = (req, res) => {
  return res.render('recipesNew', { user: req.user });
};

const recipesNew = async (req, res) => {
  const { userId, userName, recipeName, ingredients, recipeInstructions } = req.body;
  const ingredientsString = ingredients.join(',');

  registerNewRecipe(userId, userName, recipeName, ingredientsString, recipeInstructions)
    .then(() => res.render('recipesNew', { user: req.user }));
};

module.exports = {
  recipesNewForm,
  recipesNew,
};
