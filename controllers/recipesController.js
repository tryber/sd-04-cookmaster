const { recipesModel } = require('../models');
const userModel = require('../models/userModel');

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
    const recipeDetailsEdit = await recipesModel.recipeDetailsByID(id);

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

const deleteRecipeGET = async (req, res) => {
  console.log('get', req.user, req.params);

  const { id } = req.params;
  const { userId } = await recipesModel.recipeDetailsByID(id);

  if(userId !== req.user.id) return res.redirect('/');
  return res.render('excludeRecipe', { id, message: null });
};

const deleteRecipePOST = async (req, res) => {
  try {
    console.log('post', req.params);

    const { password } = req.body;
    const { id } = req.params;

    const userID = await userModel.findById(req.user.id);

    if (userID.password === password) {
      await recipesModel.deleteRecipeModel(id);
      return res.redirect('/');
    }
    return res.render('excludeRecipe', { id, message: 'Senha Incorreta.' });
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
  deleteRecipePOST,
  deleteRecipeGET,
};
