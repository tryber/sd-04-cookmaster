const RecipeModel = require('../models/newRecipeModel');

const renderNewRecipe = (req, res) => {
  const { user } = req;
  res.render('newRecipe', { user });
};

const postNewRecipe = async (req, res) => {
  const { nameRecipe, item, modoPreparo } = req.body;
  const { id, name, lastName } = req.user;
  const userName = `${name} ${lastName}`;
  await RecipeModel.insertRecipe(id, userName, nameRecipe, item.join(' ,'), modoPreparo);

  res.redirect('/');
};

module.exports = {
  renderNewRecipe,
  postNewRecipe,
};
