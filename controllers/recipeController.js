const recipeModel = require('../models/recipeModel');

const listRecipes = async (req, res) => {
  const recipes = await recipeModel.getAllRecipes();
  res.render('home', { recipes, message: null, user: req.user });
};

const recipeDetails = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeModel.getRecipeById(id);
  return res.status(200).render('recipes/recipeDetails', { recipe, user: req.user });
};

const searchRecipes = async (req, res) => {
  const { q } = req.query;
  if (!q && q !== '') res.status(200).render('recipes/search', { recipes: null, user: req.user });
  const recipes = await recipeModel.getRecipeByName(q);
  return res.status(200).render('recipes/search', { recipes, user: req.user, query: q });
};

const newRecipe = async (req, res) => {
  res.status(201).render('recipes/new', {
    user: req.user,
    nameMessage: null,
    ingredientsMessage: null,
    instructionsMessage: null,
    successMessage: null,
  });
};

const addRecipe = async (req, res) => {
  const { name, ingredients, instructions } = req.body;

  await recipeModel.addRecipe(
    `${req.user.name} ${req.user.lastName}`,
    req.user.id,
    name,
    ingredients,
    instructions,
  );

  res.redirect('/');
};

const editRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeModel.getRecipeById(id);

  res.status(201).render('recipes/edit', {
    user: req.user,
    nameMessage: null,
    ingredientsMessage: null,
    instructionsMessage: null,
    successMessage: null,
    recipe,
  });
};

const updateRecipe = async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  const { id } = req.params;
  try {
    await recipeModel.updateRecipe(id, name, ingredients, instructions);
    res.redirect('/');
  } catch (err) {
    res.send(err);
  }
};

const myRecipes = async (req, res) => {
  const recipes = await recipeModel.getRecipeByUserId(req.user.id);

  res.status(200).render('me/recipes', { recipes, message: null, user: req.user });
};

const deleteForm = async (req, res) => {
  const { id } = req.params;
  res.status(201).render('recipes/delete', {
    user: req.user,
    message: null,
    id,
  });
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const auth = await recipeModel.verifyUser(id, req.user.id, password);
  if (auth) {
    await recipeModel.deleteRecipeById(id);
    res.status(202).redirect('/');
  }
  res.status(401).render('recipes/delete', {
    user: req.user,
    id,
    message: 'Senha Incorreta.',
  });
};

module.exports = {
  listRecipes,
  recipeDetails,
  searchRecipes,
  newRecipe,
  addRecipe,
  editRecipe,
  updateRecipe,
  myRecipes,
  deleteForm,
  deleteRecipe,
};
