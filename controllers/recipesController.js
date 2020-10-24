const recipesModel = require('../models/recipesModel');

const allRecipes = async (req, res) => {
  const recipes = (await recipesModel.fetchAllRecipesModel()) || [];
  return res.render('home', { recipes, message: null, user: req.user });
};

const recipePage = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesModel.fetchRecipeIdModel(id);
  return res.render('recipe', { recipe, message: null, user: req.user });
};

const searchRecipes = async (req, res) => {
  const name = req.query.q;
  let recipes = [];
  if (name) {
    recipes = await recipesModel.fetchRecipeNameModel(name);
  }
  return res.render('search', { recipes, message: null, user: req.user });
};

const createRecipePage = async (req, res) => {
  return res.render('createRecipe', { message: null, redirect: null, user: req.user });
};

const createRecipe = async (req, res) => {
  // console.log(req.body);

  const {
    body: { name, ingredients, method },
    user,
  } = req;

  return res.render('createRecipe', { message: 'Receita cadastrada com sucesso', redirect: null, user: req.user });
};

module.exports = { allRecipes, recipePage, searchRecipes, createRecipe, createRecipePage };
