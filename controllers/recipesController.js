const { tables } = require('../models/connection');
const {
  getAllRecipes, getRecipeById, updateRecipe, insertRecipe, searchByName, searchByUser
} = require('../models/recipesModel');
const { validatePassword } = require('../models/userModel');

const homeRecipes = async ({ userData = false }, res) => {
  const recipes = await getAllRecipes();
  res.render('home', { recipes, userData });
};

const oneRecipe = async ({ params: { id }, userData = false }, res) => {
  const recipe = await getRecipeById(id);
  res.render('recipes/showOne', { ...recipe, userData });
};

const newPage = ({ userData }, res) => res.render('recipes/new', { userData });

const postNew = ({ userData, body }, res) => insertRecipe(body, userData)
  .then(() => res.redirect('/'))
  .catch((err) => res.send(err));

const editRecipe = async ({ params: { id }, userData }, res) => {
  const recipe = await getRecipeById(id);
  if (recipe.user_id !== userData.id) res.redirect(`/recipes/${id}`);
  return res.render('recipes/edit', { recipe, userData });
};

const postRecipe = async ({ params: { id }, body }, res) => updateRecipe(id, body)
  .then(() => res.redirect('/'))
  .catch((err) => res.send(err));

const deletePage = ({ params: { id } }, res) => res.render('recipes/delete', { id, message: '' });

const deleteRecipe = async ({ params: { id }, userData, body: { password } }, res) => {
  const recipe = await getRecipeById(id);

  if (recipe.user_id !== userData.id) return res.redirect(`/recipes/${id}`);

  if (!(await validatePassword(password, userData.id))) {
    return res.render('recipes/delete', { id, message: 'Senha Incorreta.' });
  }

  return tables.recipes((r) => r.delete().where('id = :id').bind('id', id).execute())
    .then(() => res.redirect('/'))
    .catch((err) => res.send(err));
};

const searchRecipe = async ({ userData, query: { q } }, res) => {
  if (q) {
    const recipes = await searchByName(q);
    return res.render('search', { userData, recipes });
  }
  return res.render('search', { userData, recipes: [] });
};

const myRecipes = async ({ userData }, res) => {
  const recipes = await searchByUser(userData.id);
  res.render('recipes/myRecipes', { userData, recipes });
};

module.exports = {
  homeRecipes,
  oneRecipe,
  editRecipe,
  postRecipe,
  deletePage,
  deleteRecipe,
  newPage,
  postNew,
  searchRecipe,
  myRecipes,
};
