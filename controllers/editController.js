const Recipe = require('../models/recipeModel');

const newRecipe = (req, res) => {
  const user = req.user;
  res.render('newRecipe', { user });
};
// ver depois a questao de ingredients
const registerRecipe = async (req, res) => {
  const user = req.user;
  const { name, ingredients, instructions } = req.body;
  await Recipe.createRecipe(
    user.id,
    `${user.name} ${user.lastName}`,
    name,
    ingredients.join(','),
    instructions,
  );
  res.redirect('/');
};

const editRecipe = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const recipes = await Recipe.getRecipeById(id);
  const recipe = recipes[0];
  if (user.id === recipe.userId) {
    res.render('editRecipe', { recipe, user });
  }
  res.redirect(`/recipes/${id}`);
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, instructions } = req.body;
  await Recipe.updateRecipe(id, name, ingredients.join(','), instructions);
  res.redirect('/');
};

module.exports = {
  newRecipe,
  registerRecipe,
  editRecipe,
  updateRecipe,
};
