const Recipe = require('../models/recipeModel');
const User = require('../models/userModel');

const getDeletePage = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  const recipes = await Recipe.getRecipeById(id);
  const recipe = recipes[0];
  if (user.id === recipe.userId) {
    res.render('deletePage', { recipe, message: null });
  }
  res.redirect(`/recipes/${id}`);
};

const deleteRecipe = async (req, res) => {
  const { password } = req.body;
  const { id } = req.params;
  const recipes = await Recipe.getRecipeById(id);
  const recipe = recipes[0];
  const usuario = await User.findById(recipe.userId);
  if (password === usuario.password) {
    await Recipe.deleteRecipe(id);
    res.redirect('/');
  }
  res.render('deletePage', { recipe, message: 'Senha Incorreta.' });
};

module.exports = {
  getDeletePage,
  deleteRecipe,
};
