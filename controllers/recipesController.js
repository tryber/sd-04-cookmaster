const RecipesModel = require('../models/recipesModel');
const UserModel = require('../models/userModel');

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
  const { user } = req;

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
  const { user } = req;
  const { id } = req.params;
  const { userId } = await RecipesModel.getRecipeById(id);

  console.log(user);
  // console.log(id);
  console.log(userId);

  userId === user.id
    ? res.status(200).render('deleteRecipe', { message: null, id })
    : res.status(301).redirect('/');
};

const confirmDeleteController = async (req, res) => {
  const { user } = req;
  const { id } = req.params;
  const { password } = req.body;

  const usuario = await UserModel.findById(user.id);

  if (usuario.password !== password) {
    return res.status(200).render('deleteRecipe', { message: 'Senha incorreta', id });
  }
  await RecipesModel.deleteRecipe(id);
  return res.status(301).redirect('/');
};

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------

const userRecipesController = async (req, res) => {
  const { user } = req;

  const recipes = await RecipesModel.getAllByUserId(user.id);

  res.status(200).render('myRecipes', { recipes, user });
};

// -------------------------------------------------------------------------------
// -------------------------------------------------------------------------------

const showRecipeCreateForm = async (req, res) => {
  const { user } = req;
  res.status(200).render('createRecipe', { user });
};

const postNewRecipeController = async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  const { user } = req;
  console.log(user);

  await RecipesModel.createRecipe(
    user.id,
    `${user.name} ${user.lastName}`,
    name,
    ingredients,
    instructions,
  );

  return res.status(201).redirect('/');
};

module.exports = {
  allRecipesController,
  recipeByIdController,
  searchRecipesController,
  deleteRecipeController,
  userRecipesController,
  showRecipeCreateForm,
  postNewRecipeController,
  confirmDeleteController,
};
