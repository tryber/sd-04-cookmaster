const { getRecipes, findRecipeById, getRecipesByName, deleteRecipeById, insertRecipe } = require('../models/recipesModel');
const { findById } = require('../models/userModel');

const getAllRecipes = async (req, res) => {
  const recipes = await getRecipes();
  const { user = '' } = req;
  return res.render('home', { recipes, user });
};

const getRecipe = async (req, res) => {
  const { user } = req;
  const recipe = await findRecipeById(req.params.id);
  const isRecipeCreator = (!!user && user.id === recipe.userId);

  return res.render('recipeDetails', { recipe, isRecipeCreator });
};

const searchRecipe = async (req, res) => {
  const { q } = req.query;
  const recipes = await getRecipesByName(q);
  res.status(200).render('searchRecipe', { recipes });
};

const deleteRecipe = async (req, res) => {
  const { user, params, body } = req;
  const { password } = await findById(user.id);

  if (password !== body.password) {
    return res.render('admin/confirmPassword', { id: params.id, message: 'Senha Incorreta.' });
  }

  const warningsCount = await deleteRecipeById(params.id);

  if (warningsCount > 0) {
    return res.render('admin/confirmPassword', { id: params.id, message: 'erro ao excluir receita' });
  }

  return res.status(200).redirect('/');
};

const createRecipe = async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  const { user } = req;
  const userName = `${user.name} ${user.lastName}`;
  await insertRecipe(user.id, userName, name, ingredients.join(), instructions);

  res.redirect('/')
}

module.exports = {
  getAllRecipes,
  getRecipe,
  searchRecipe,
  deleteRecipe,
  createRecipe,
};
