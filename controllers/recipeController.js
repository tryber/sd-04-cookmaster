const RecipeModel = require('../models/recipeModel');
const userModel = require('../models/userModel');

const listRecipes = async (req, res) => {
  const recipes = await RecipeModel.getAllRecipes();
  const user = req.user;
  res.render('home', { recipes, user });
};

const recipeById = async (req, res) => {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);
  const recipe = await RecipeModel.getByIdRecipe(idNumber);
  const user = req.user;
  return res.render('recipeById', { recipe, user });
};

const search = async (req, res) => {
  const user = req.user;
  const { q } = req.query;
  const recipes = await RecipeModel.getRecipeByName(q);
  return res.render('search', { recipes, user, query: q });
};

const cadastroRecipe = async (req, res) => {
  const user = req.user;
  return res.render('addRecipe', { user });
};

const registerRecipe = async (req, res) => {
  const user = req.user;
  const { nomeReceitaInput, ingredients, modoPreparo } = req.body;
  if (typeof ingredients === 'object') {
    await RecipeModel.createRecipe(
      user.id,
      `${user.firstName} ${user.lastName}`,
      nomeReceitaInput,
      ingredients.join(','),
      modoPreparo,
    );
  } else {
    await RecipeModel.createRecipe(
      user.id,
      `${user.firstName} ${user.lastName}`,
      nomeReceitaInput,
      ingredients,
      modoPreparo,
    );
  }
  res.redirect('/');
};

const editRecipe = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const idNumber = parseInt(id, 10);
  const recipe = await RecipeModel.getByIdRecipe(idNumber);
  if (recipe.userId !== req.user.id) return res.redirect(`/recipes/${id}`);
  return res.render('recipeEdit', { user, recipe });
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { nomeReceitaInput, ingredients, modoPreparo } = req.body;
  if (ingredients.indexOf(',') === -1) {
    await RecipeModel.updateRecipeModel(id, nomeReceitaInput, ingredients, modoPreparo);
  } else {
    await RecipeModel.updateRecipeModel(id, nomeReceitaInput, ingredients.join(','), modoPreparo);
  }
  res.redirect('/');
};

const deleteRecipe = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const idNumber = parseInt(id, 10);
  const recipe = await RecipeModel.getByIdRecipe(idNumber);
  if (user.id === recipe.userId) {
    res.render('deletePage', { recipe, message: null });
  }
  res.redirect(`/recipes/${id}`);
};

const deletarRecipe = async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;
  const recipe = await RecipeModel.getByIdRecipe(id);
  const usuario = await userModel.findById(recipe.userId);
  if (password === usuario.password) {
    await RecipeModel.deleteRecipeById(id);
    res.redirect('/');
  }
  res.render('deletePage', { recipe, message: 'Senha Incorreta.' });
};

const recipeByUserId = async (req, res) => {
  const user = req.user;
  const recipes = await RecipeModel.getByUserIdRecipe(user.id);
  return res.render('myRecipes', { recipes, user });
};

module.exports = {
  listRecipes,
  recipeById,
  search,
  cadastroRecipe,
  registerRecipe,
  editRecipe,
  updateRecipe,
  deleteRecipe,
  deletarRecipe,
  recipeByUserId,
};
