const { tables } = require('../models/connection');
const { getAllRecipes, getRecipeById, updateRecipe } = require('../models/recipesModel');
const { findById } = require('../models/userModel');

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

const deletePage = ({ params: { id } }, res) => res.render('recipes/delete', { id, message: '' });

const deleteRecipe = async ({ params: { id }, userData, body }, res) => {
  const recipe = await getRecipeById(id);

  if (recipe.user_id !== userData.id) return res.redirect(`/recipes/${id}`);

  const { password } = await findById(userData.id);

  if (password !== body.password) return res.render('recipes/delete', { id, message: 'Senha incorreta' });

  return tables.recipes((r) => r.delete().where('id = :id').bind('id', id).execute())
    .then(() => res.redirect('/'))
    .catch((err) => res.send(err));
};

const postRecipe = async ({ params: { id }, body }, res) => updateRecipe(id, body)
  .then(() => res.redirect('/'))
  .catch((err) => res.send(err));

module.exports = {
  homeRecipes,
  oneRecipe,
  editRecipe,
  postRecipe,
  deletePage,
  deleteRecipe,
};
