const { recipesModel } = require('../models');

const listAllRecipes = async (req, res) => {
  try {
    const getAllRecipes = await recipesModel.getAllRecipes();
    return res.render('home', { getAllRecipes, user: req.user });
  } catch (error) {
    return error;
  }
};

const recipeDetailsController = async (req, res) => {
  try {
    const { id } = req.params;
    const recipeDetails = await recipesModel.recipeDetails(id);
    return res.render('recipeDetails', { recipeDetails, user: req.user });
  } catch (error) {
    return error;
  }
};

const searchByNameController = async (req, res) => {
  try {
    const { q } = req.query;
    const searchByName = await recipesModel.recipeSearchByName(q);
    return res.render('recipeSearch', { searchByName, user: req.user });
  } catch (error) {
    return error;
  }
};

const enterNewRecipe = async (req, res) => {
  res.render('newRecipe', { user: req.user });
};

const createNewRecipe = async (req, res) => {
  try {
    const { user } = req;
    const { name, ingredients, instructions } = req.body;

    await recipesModel.createRecipeModel(user.id, user.name, name, ingredients, instructions);

    return res.redirect('/');
  } catch (error) {
    return error;
  }
};

const enterEditRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const recipeDetailsEdit = await recipesModel.recipeDetailsEdit(id);

    if (recipeDetailsEdit.userId !== req.user.id) return res.redirect(`/recipes/${id}`);

    return res.render('editRecipe', { recipeDetailsEdit, user: req.user });
  } catch (error) {
    return error;
  }
};

const editRecipeController = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, instructions } = req.body;

  await recipesModel.editRecipeModel(id, name, ingredients, instructions);
  return res.redirect('/');
};

//  Controller da tela de Minhas Receitas.
const recipeUserId = async (req, res) => {
  try {
    const { id } = req.user;
    const recipesUserId = await recipesModel.selectRecipeByUserId(id);
    return res.render('myRecipes', { recipesUserId: recipesUserId || [], user: req.user });
  } catch (error) {
    return error;
  }
};

module.exports = {
  listAllRecipes,
  recipeDetailsController,
  searchByNameController,
  enterNewRecipe,
  createNewRecipe,
  editRecipeController,
  enterEditRecipe,
  recipeUserId,
};
