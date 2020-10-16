const recipesModel = require('../models/recipesModel');
const userModel = require('../models/userModel');

const listRecipes = async (req, res) => {
  const recipes = await recipesModel.getAllRecipes();
  const { user = null } = req;
  res.render('home', { recipes, user });
};

const getRecipeById = async (req, res) => {
  const { user = null } = req;
  const recipe = await recipesModel.getRecipeById(req.params.id);
  const isRecipeCreator = !!user && user.id === recipe.userId;

  return res.render('recipeDetails', { recipe, isRecipeCreator });
};

const getRecipesByUserID = async (req, res) => {
  const { user = null } = req;
  const recipes = await recipesModel.getRecipesByUserId(user.id);

  return res.render('admin/myRecipes', { recipes, user });
};

const searchRecipes = async (req, res) => {
  const { q } = req.query;
  const recipes = await recipesModel.getRecipesByName(q);
  res.status(200).render('searchRecipe', { recipes });
};

const createRecipe = async (req, res) => {
  const {
    body: { name, ingredients, instructions },
    user,
  } = req;

  const userName = `${user.name} ${user.lastName}`;
  await recipesModel.insertRecipe(
    user.id,
    userName,
    name,
    ingredients.join(),
    instructions,
  );

  res.redirect('/');
};

const deleteRecipe = async (req, res) => {
  const { user, params, body } = req;
  const { password } = await userModel.findById(user.id);

  if (password !== body.password) {
    return res.render('admin/confirmPassword', {
      id: params.id,
      message: 'Senha Incorreta.',
    });
  }

  const warningsCount = await recipesModel.deleteRecipe(params.id);

  if (warningsCount > 0) {
    return res.render('admin/confirmPassword', {
      id: params.id,
      message: 'erro ao excluir receita',
    });
  }

  return res.status(200).redirect('/');
};

module.exports = {
  listRecipes,
  getRecipeById,
  getRecipesByUserID,
  searchRecipes,
  createRecipe,
  deleteRecipe,
};
