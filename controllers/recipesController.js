const { getRecipes, getRecipeById } = require('../models/recipeModel');

const findAllRecipes = async (req, res) => {
  const recipes = await getRecipes();
  const { user = '' } = req;
  console.log(`controller findAllRecipes(tela Home): ${recipes}`);

  return res.render('home', { recipes, user });
};

const findRecipeDetails = async (req, res) => {
  const { user } = req;
  const recipe = await getRecipeById(req.params.id);
  const isRecipeOwner = !!user && user.id === recipe.id;
  console.log(
    `recipeDetails - user: ${user} , recipe: ${recipe} , isRecipeOwner: ${isRecipeOwner}`,
  );

  return res.render('recipeDetails', { recipe, isRecipeOwner, user });
};

module.exports = {
  findAllRecipes,
  findRecipeDetails,
};
