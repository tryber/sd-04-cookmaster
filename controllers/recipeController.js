const recipeModel = require('../models/recipeModel');

const showRecipes = async (req, res) => {
  const recipes = await recipeModel.findAll();

  return res.render('home', { recipes, user: req.user });
  // tem q colocar tb o user para acessar na home e na navbar
};

const seeRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeModel.recipeById(id);

  res.render('seerecipe', { ...recipe, user: req.user });
};

const searchRecipess = async (req, res) => {
  // valor do input de texto deverá estar acessível através da prop q do objeto req.query.
  const { q } = req.query;

  if (q === '') return res.render('searchRecipe', { recipes: null, user: req.user });

  const recipes = await recipeModel.searchRecipes(q);

  return res.render('searchRecipe', { recipes, user: req.user });
};

const myRecipe = async (req, res) => {
  const { id } = req.user;
  const recipes = await recipeModel.myRecipeByUserId(id);
  return res.render('admin/meRecipes', { recipes, user: req.user });
};

// const newRecipe = async (req, res) => {
//   const { recipeName, ingredients, instructions } = req.body;
//   const { name, lastName, id } = req.user;
//   const userFullName = `${name} ${lastName}`;

//   await recipeModel.addNewRecipe(id, userFullName, recipeName, ingredients, instructions);

//   return res.redirect('/');
// };

module.exports = {
  showRecipes,
  seeRecipe,
  searchRecipess,
  myRecipe,
  // newRecipe,
};
