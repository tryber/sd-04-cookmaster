const { getAllRecipes, getRecipeById, updateRecipe } = require('../models/recipesModel');

const homeRecipes = async ({ userData = false }, res) => {
  const recipes = await getAllRecipes();
  res.render('home', { recipes, userData });
};

const oneRecipe = async ({ params: { id }, userData = false }, res) => {
  const recipe = await getRecipeById(id);
  res.render('recipes/showOne', { ...recipe, userData });
};

const editRecipe = async ({ params: { id }, userData }, res) => {
  const recipe = await getRecipeById(id);
  if (recipe.user_id !== userData.id) res.redirect(`/recipes/${id}`);
  return res.render('recipes/edit', { recipe, userData });
};

const postRecipe = async ({ params: { id }, body }, res) => updateRecipe(id, body)
  .then(() => res.redirect('/'))
  .catch((err) => res.send(err));

module.exports = {
  homeRecipes,
  oneRecipe,
  editRecipe,
  postRecipe,
};
