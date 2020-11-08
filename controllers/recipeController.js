const Recipes = require('../models/recipesModel');
const User = require('../models/userModel');

const allRecipes = async (req, res) => {
  const recipe = await Recipes.getRecipes();
  return res.render('home', { recipe, user: req.user });
};

const recipeDetail = async (req, res) => {
  const { user } = req;
  const recipe = await findRecipeById(req.params.id);
  const isRecipeCreator = !!user && user.id === recipe.userId;

  return res.render('recipeDetails', { recipe, isRecipeCreator });
};

const userRecipe = async (req, res) => {
  const { user } = req;
  const recipes = await findRecipeByUserId(user.id);
  return res.render('/myRecipe', { recipes, user });
};

const searchRecipe = async (req, res) => {
  const { search } = req.query;
  const recipes = search ? await Recipes.findByName(search) : await Recipes.getRecipes();
  return res.render('searchRecipe', { recipes, user: req.user });
};

const addNewRecipe = (req, res) => {
  res.render('newRecipe', { user: req.user });
};

const createRecipe = async (req, res) => {
  const { recipeName, ingredients, instruction } = req.body;
  const { id, firstName, lastName } = req.user;
  const fullName = `${firstName} ${lastName}`;
  await Recipes.addRecipe(id, fullName, recipeName, ingredients, instruction);
  res.redirect('/');
};

const removeRecipe = async (req, res) => {
  const { user, params, body } = req;
  const { password } = await User.findById(user.id);

  if (password !== body.password) {
    return res.render('admin/confirmPassword', { id: params.id, message: 'Senha Incorreta.' });
  }

  const delRec = await deleteRecipeById(params.id);

  if (delRec > 0) {
    return res.render('admin/confirmPassword', {
      id: params.id,
      message: 'erro ao excluir receita',
    });
  }

  return res.status(200).redirect('/');
};

module.exports = {
  allRecipes,
  recipeDetail,
  userRecipe,
  searchRecipe,
  addNewRecipe,
  createRecipe,
  removeRecipe,
};
