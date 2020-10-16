//const { in } = require('sequelize/types/lib/operators');
const { recipeController } = require('.');
const recipeModel = require('../models/recipeModel');

async function listRecipes(req, res) {
  const recipes = await recipeModel.getAllRecipes();
  return res.render('home', { recipes, user: req.user });
}

async function showRecipesByUser(req, res) {
  const recipes = await recipeModel.getRecipe(Number(req.params.id));
  res.render('recipe', { recipes, user: req.user });
}

async function searchRecipe(req, res) {
  const recipes = await recipeModel.getRecipeByName(req.query.q);
  res.render('search', { recipes, user: req.user });
}

async function recipeRegister(req, res) {
  res.render('new', { user: req.user, message: null });
}

async function newRecipe(req, res) {
  const { recipeName, ingredients, prepare } = req.body;
  const { idUser, name, lastName } = req.user;
  console.log(req.user);

  if (!recipeModel.verifyData(recipeName, ingredients, prepare)) {
    return res.status(400).render('new', { user: req.user, message: 'Preencha todos os campos' });
  }
  {
    const userName = await `${name} ${lastName}`;
    await recipeModel.createRecipe(idUser, userName, recipeName, ingredients.toString(), prepare);
    return res.redirect('/');
  }
}

module.exports = { listRecipes, showRecipesByUser, searchRecipe, recipeRegister, newRecipe };
