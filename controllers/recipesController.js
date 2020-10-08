const Recipes = require('../models/recipesModel');

const index = async (req, res) => {
  const recipes = await Recipes.listRecipes();
  const user = req.user;
  return res.render('home', { recipes, user });
};

const recipesDetails = async (req, res) => {
  const recipe = await Recipes.recipesById(req.params.id);
  return res.render('recipes/detail', { recipe, user: req.user });
};

const userRecipes = async (req, res) => {
  const recipes = await Recipes.recipesByUserId(req.user.id);
  // console.log(recipes);
  return res.render('/', { recipes });
};

const findRecipesByName = async (req, res) => {
  const recipes = await Recipes.recipesByName(req.query.q);
  // console.log(recipes);
  return res.render('recipes/search', { recipes });
};

const newRecipe = (req, res) => res.render('recipes/new', { user: req.user, message: null });

const addRecipe = async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  const { user } = req;
  const fullName = `${user.name} ${user.lastName}`;
  // console.log(fullName);

  if (!name || !ingredients || !instructions || !fullName) {
    return res
      .status('500')
      .render('recipes/new', { user: req.user, message: 'Todos os campos devem ser preenchidos' });
  }

  await Recipes.newRecipe(user.id, fullName, name, ingredients, instructions);

  return res.render('recipes/new', { user: req.user, message: 'Receita cadastrada com sucesso!' });
};

module.exports = {
  index,
  recipesDetails,
  userRecipes,
  findRecipesByName,
  newRecipe,
  addRecipe,
};
