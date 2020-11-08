const recipesModel = require('../models/recipesModel');

const listAllRecipes = async (req, res) => {
  const recipes = await recipesModel.getAllRecipes();

  try {
    res.status(200).render('home', { recipes, user: req.user });
  } catch (error) {
    res.status(500).send('<p>Desculpe, ocorreu algum erro, tente novamente<p>');
  }
};

const recipeDetail = async (req, res) => {
  const recipe = await recipesModel.getRecipeById(req.params.id);

  const { ingredients } = recipe;
  const ingredientsSplit = ingredients.split(',');
  recipe.ingredients = ingredientsSplit;

  res.status(200).render('details', { recipe, user: req.user });
};

const searchRecipesByQuery = async (req, res) => {
  const { q } = req.query;

  if (q === undefined) return res.render('searchRecipes', { recipes: [], user: req.user });

  const recipes = await recipesModel.getRecipeByQuery(q);

  return res.render('searchRecipes', { recipes, user: req.user });
};

const registerNewRecipeForm = async (req, res) =>
  res.render('newRecipe', { user: req.user });

const registerNewRecipe = async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  const { id, firstName, lastName } = req.user;

  const fullName = `${firstName} ${lastName}`;

  const recipe = await recipesModel.registerNewRecipe(
    id,
    fullName,
    name,
    ingredients,
    instructions,
  );

  if (!recipe) {
    res.status(500).send('<p>Desculpe, ocorreu um erro, tente novamente<p>');
  }
  return res.redirect('/');
};

const updateRecipeData = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const recipe = await recipesModel.getRecipeById(id);
  const { ingredients } = recipe;
 
  const ingredientsArray = ingredients.split(',');
  recipe.ingredients = ingredientsArray;

  // if (userId !== id) res.redirect(`/recipes/${recipeId}`);

  return res.render('updateRecipe', { recipe, user: req.user });
};

const updateRecipeForm = async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  const { id } = req.params;
  console.log(id, name, ingredients, instructions);

  await recipesModel.updateRecipe(id, name, ingredients, instructions);

  return res.redirect('/');
};

module.exports = {
  listAllRecipes,
  recipeDetail,
  searchRecipesByQuery,
  registerNewRecipeForm,
  registerNewRecipe,
  updateRecipeData,
  updateRecipeForm,
};
