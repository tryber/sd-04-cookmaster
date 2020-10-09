const {
  findAllRecipes, findRecipeById, searchRecipeByName,
  addRecipe, updateRecipe,
} = require('../models/recipeModel');

const index = async (req, res) => {
  const recipes = await findAllRecipes();

  return res.render('home', { recipes, user: req.user });
};

const findRecipeDetails = async (req, res) => {
  const { user } = req;
  const recipe = await findRecipeById(req.params.id);
  const isRecipeOwner = !!user && user.id === recipe.id;

  return res.render('recipeDetails', { recipe, isRecipeOwner, user });
};

const searchRecipe = async (req, res) => {
  const { q } = req.query;

  if (q === '') return res.render('search', { recipes: [], user: req.user });

  const recipes = await searchRecipeByName(q);
  return res.render('search', { recipes, user: req.user });
};

const newRecipe = async (req, res) => res.render('newRecipe', { message: null, user: req.user });

const newRecipeForm = async (req, res) => {
  const formData = req.body;
  await addRecipe(req.user, formData);
  res.redirect('/');
};

const editRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await findRecipeById(id);

  res.render('editRecipe', { recipe, user: req.user });
};

const recipeUpdate = async (req, res) => {
  const { recipeName, ingredients, instructions } = req.body;
  const { id } = req.params;

  await updateRecipe(id, recipeName, ingredients, instructions);
  res.redirect('/');
};

module.exports = {
  index,
  findRecipeDetails,
  searchRecipe,
  newRecipe,
  newRecipeForm,
  editRecipe,
  recipeUpdate,
};
