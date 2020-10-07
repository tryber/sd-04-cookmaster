const { getAll, getRecipeById, searchRecipeModel, newRecipeInsert } = require('../models/listRecipesModel');

const listRecipes = async (req, res) => {
  const recipes = await getAll();

  return res.render('home', { recipes, user: req.user });
};

const recipeDetails = async (req, res) => {
  const { id } = req.params;

  const recipe = await getRecipeById(id);

  return res.render('recipeDetails', { recipe, user: req.user });
};

const searchRecipe = async (req, res) => {
  const { q } = req.query;

  if (q === '') return res.render('search', { recipes: null, user: req.user });

  const recipes = await searchRecipeModel(q);
  return res.render('search', { recipes, user: req.user });
};

const NewRecipe = async (req, res) =>
  res.render('newRecipe', { message: null, user: req.user });

const newRecipeForm = async (req, res) => {
  const formInfo = req.body;
  const message = 'Receita salva com sucesso';
  await newRecipeInsert(req.user, formInfo);
  return res.render('newRecipe', { message, user: req.user });
};

module.exports = {
  listRecipes,
  recipeDetails,
  searchRecipe,
  NewRecipe,
  newRecipeForm,
};
