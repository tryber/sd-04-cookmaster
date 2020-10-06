const recipeModel = require('../models/recipeModel');

const showRecipes = async (req, res) => {
  const recipes = await recipeModel.findAll();
  console.log(recipes);
  return res.render('home', { recipes, user: req.user });
  // tem q colocar tb o user para acessar na home e na navbar
};

const seeRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeModel.recipeById(id);

  res.render('seerecipe', { ...recipe, user: req.user });
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
  // newRecipe,
};
