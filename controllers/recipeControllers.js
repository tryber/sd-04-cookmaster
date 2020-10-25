const recipesModel = require('../models/cooksModel');

const listarReceitas = async (req, res) => {
  const cooks = await recipesModel.listCook();
  // console.log(cooks);
  return res.render('home', { cooks, user: req.user });
};

const viewRecipesUser = async (req, res) => {
  console.log('req', req.user);
  const cooks = await recipesModel.listSpecificRecipe(Number(req.params.id));
  console.log('cook', cooks);
  res.render('recipes', { cooks, user: req.user });
};

module.exports = { listarReceitas, viewRecipesUser };
