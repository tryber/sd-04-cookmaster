const RecipesModel = require('../models/recipesModel');

const allRecipesController = async (req, res) => {
  const recipes = await RecipesModel.allRecipes();

  const { token } = req.cookies;

  try {
    res.status(200).render('home', { recipes, token });
  } catch (err) {
    res.status(500).send('<h2>Não foi possivel realizar essa operação</h2>');
  }
};

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------

const recipeByIdController = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  const recipe = await RecipesModel.getRecipeById(id);

  try {
    res.status(200).render('recipeDetails', { recipe, user });
  } catch (err) {
    res.status(500).send('<h2>Não foi possivel realizar essa operação</h2>');
  }
};

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------

const searchRecipesController = async (req, res) => {
  const { q } = req.query;

  const recipes = await RecipesModel.searchRecipes(q);

  try {
    res.status(200).render('search', { recipes });
  } catch (err) {
    res.status(500).send('<h2>Não foi possivel realizar essa operação</h2>');
  }
};

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------

const deleteRecipeController = async (req, res) => {
  // const {user} = req;

  // const recipe = await RecipesModel.getRecipeById(id);

  try {
    res.status(200).render('deleteRecipe');
  } catch (err) {
    res.status(500).send('<h2>Não foi possivel realizar essa operação</h2>');
  }
};

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------

const userRecipesController = async (req, res) => {
  const { user } = req;

  const recipes = await RecipesModel.getAllByUserId(user.id);

  res.render('myRecipes', { recipes, user });
};

module.exports = {
  allRecipesController,
  recipeByIdController,
  searchRecipesController,
  deleteRecipeController,
  userRecipesController,
};
