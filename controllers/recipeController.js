const recipe = require('../models/recipeModel');

const listRecipes = async (req, res) => {
  try {
    const recipes = await recipe.getAllRecipes();
    return res.render('home', { recipes, user: req.user });
  } catch (error) {
    return error;
  }
};

const showRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const recipeResult = await recipe.getRecipeById(Number(id));
    return res.render('recipe', { recipeResult, user: req.user });
  } catch (error) {
    return error;
  }
};

const editRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const recipeToEdit = await recipe.getRecipeById(id);
    res.render('admin/editRecipe', { recipeToEdit, user: req.user });
  } catch (error) {
    return error
  }
};

const modifyRecipe = async (req, res) => {
  const recipeData = req.body; // dados da receita.
  const { id } = req.params; // id da receita.
  const loggedUserId = req.user.id; // id do usuário logado.
  const { userId } = await recipe.getRecipeById(Number(id)); // id de quem criou a receita.

  if (loggedUserId === userId) {
    await recipe.updateRecipe(Number(id), recipeData);
    return res.redirect('/');
  }
  return res.redirect(`/recipes/${id}`);
};

const deleteRecipe = async (req, res) => res.render('admin/editRecipe');

const newRecipeRender = async (req, res) => res.render('admin/newRecipe', { user: req.user });

const addAndReturnToHome = async (req, res) => {
  const recipeInfo = req.body;
  const userInfo = req.user;
  try {
    if (Object.keys(recipeInfo).length) {
      await recipe.addNewRecipe(recipeInfo, userInfo);
    }
    // return res.render('home', { user: req.user });
    res.redirect('/');
  } catch (err) {
    return err;
  }
};

const searchRecipes = async (req, res) => {
  const { q } = req.query;
  try {
    const recipes = await recipe.getRecipesByQuery(q);
    return res.render('admin/searchRecipes', { recipes, user: req.user });
  } catch (err) {
    return err;
  }
};

const myRecipesList = async (req, res) => {
  const { id } = req.user;
  try {
    const recipes = await recipe.getRecipesByUserId(Number(id));
    return res.render('admin/myRecipes', { recipes, user: req.user });
  } catch (error) {
    return error;
  }
};

module.exports = {
  listRecipes,
  showRecipeById,
  editRecipe,
  modifyRecipe,
  deleteRecipe,
  searchRecipes,
  addAndReturnToHome,
  newRecipeRender,
  myRecipesList,
};
