const recipesModel = require('../models/recipesModel');
const userModel = require('../models/userModel');

const showAllRecipes = async (req, res) => {
  const recipes = await recipesModel.getAllRecipes();

  res.render('home', { recipes, user: req.user });
};

const showRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesModel.getRecipeById(id);

  res.render('recipes/recipe', { ...recipe, user: req.user });
};

const searchRecipe = async (req, res) => {
  const { q } = req.query;

  if (q === '') return res.render('recipes/search', { recipes: null, user: req.user });

  const recipes = await recipesModel.searchRecipes(q);
  return res.render('recipes/searchRecipe', { recipes, user: req.user });
};

const createRecipe = async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  const { id, firstName, lastName } = req.user;

  const nameUser = await `${firstName} ${lastName}`;

  await recipesModel.newRecipe(id, nameUser, name, ingredients, instructions);
  return res.redirect('/');
};

const newRecipe = (req, res) => res.render('recipes/newRecipe', { user: req.user });

const editRecipe = async (req, res) => {
  const userInfo = req.user;
  const { id } = req.params;
  const recipe = await recipesModel.getRecipeById(id);

  const arrayIng = recipe.ingredients.split(',');

  recipe.ingredients = arrayIng;

  if (recipe.userId === userInfo.id) {
    return res.render('recipes/editRecipe', { recipe, user: userInfo });
  }

  // Path-relative redirects are also possible.
  // If you were on http://example.com/admin/post/new,
  // the following would redirect to http://example.com/admin/post:
  return res.redirect('..');
};

const editSucess = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, instructions } = req.body;

  await recipesModel.editRecipe(id, name, ingredients, instructions);
  return res.redirect('/me/recipes');
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const { userId } = await recipesModel.getRecipeById(id);

  if (userId !== req.user.id) return res.redirect('/');
  return res.render('recipes/deleteRecipe', { id, message: null });
};

const confirmDelete = async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;

  const user = await userModel.findById(req.user.id);

  if (user.password === password) {
    await recipesModel.deleteRecipe(id);
    return res.status(200).redirect('/');
  }
  return res.render('recipes/deleteRecipe', { message: 'Senha Incorreta.', id });
};

module.exports = {
  showAllRecipes,
  showRecipe,
  editRecipe,
  editSucess,
  createRecipe,
  newRecipe,
  searchRecipe,
  deleteRecipe,
  confirmDelete,
};
