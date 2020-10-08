const Recipes = require('../models/recipeModel');

const listAllRecipes = async (req, res) => {
  const recipes = await Recipes.getAllRecipes();

  res.status(200).render('home', { recipes, user: req.user });
};

const recipeDetails = async (req, res) => {
  const { id } = req.params;

  const recipe = await Recipes.getRecipeById(id);

  if (!id) res.status(404).render('notFound');

  res.status(200).render('recipes', { recipe, user: req.user });
};

const searchRecipe = async (req, res) => {
  const { q } = req.query;
  const recipes = q ? await Recipes.searchRecipeByName(q) : await Recipes.getAllRecipes();
  let message;
  if (!recipes || recipes === []) {
    message = 'Nada encontrado...';
  }

  res.status(200).render('searchRecipe', { recipes, user: req.user, message });
};

const addRecipe = async (req, res) => {
  const { name, ingredientList, instructions } = req.body;
  // console.log('linha 30, formRecipe', name, ingredients, instructions);
  // console.log(typeof ingredients);

  // console.log('linha 32, req.user: ', req.user);

  const { iD, firstName, lastName } = req.user;
  const fullName = `${firstName} ${lastName}`;
  await Recipes.createRecipe(iD, fullName, name, ingredientList, instructions);
  // res.render('newRecipe', { user: req.user });
  res.redirect('/');
};

const newRecipe = async (req, res) => {
  // console.log('linha 40, req.user', req.user);
  res.render('newRecipe', { user: req.user });
};

const removeRecipe = async (req, res) => {
  res.status(200).render('deleteRecipe', { message: null });
};

module.exports = {
  recipeDetails,
  listAllRecipes,
  newRecipe,
  addRecipe,
  searchRecipe,
  removeRecipe,
};
