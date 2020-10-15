const Recipes = require('../models/recipesModel');
const User = require('../models/userModel');

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
  const user = req.user;
  // console.log(recipes);
  return res.render('recipes/search', { recipes, user });
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

  return res.redirect('/');
};

const showEditRecipe = async (req, res) => {
  const user = req.user;
  const recipe = await Recipes.recipesById(req.params.id);
  // console.log(recipe);
  return res.render('recipes/edit', { user, recipe, message: null });
};

const showDeleteRecipe = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const { userId } = await Recipes.recipesById(id);

  if (userId !== user.id) res.redirect('/');
  return res.render('recipes/delete', { user, id, message: null });
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const user = await User.findById(req.user.id);

  if (user.password === password) {
    await Recipes.deleteRecipe(id);
    return res.redirect('/');
  }
  return res.render('recipes/delete', { user, id, message: 'Senha Incorreta.' });
};

const myRecipes = async (req, res) => {
  let message = null;
  const { id } = req.user;
  const recipes = await Recipes.recipesByUserId(id);

  if(recipes.length === 0) message = "você não possui receitas ainda."

  return res.render('recipes/myRecipes', { recipes, user: req.user, message });
}

module.exports = {
  index,
  recipesDetails,
  userRecipes,
  findRecipesByName,
  newRecipe,
  addRecipe,
  showEditRecipe,
  showDeleteRecipe,
  deleteRecipe,
  myRecipes,
};
