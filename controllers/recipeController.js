const Recipes = require('../models/recipeModel');
const Users = require('../models/userModel');

const listAllRecipes = async (req, res) => {
  const recipes = await Recipes.getAllRecipes();

  // const user = await Users.findByEmail('bruno.batista@gmail.com');

  // console.log(user);

  res.render('home', { recipes, user: req.user });
};

const recipeDetails = async (req, res) => {
  const { id } = req.params;

  const recipe = await Recipes.getRecipeById(id);

  if (!id) res.status(404).render('notFound');

  res.render('recipes', { recipe });
};

const createRecipe = async (req, res) => {
  const { id, user, name, ingredients, instructions } = await req.body;
  const newRecipeCreated = await Recipes.create(id, user, name, ingredients, instructions);

  res.render('newRecipe', { newRecipeCreated });
};

module.exports = { recipeDetails, listAllRecipes, createRecipe };
