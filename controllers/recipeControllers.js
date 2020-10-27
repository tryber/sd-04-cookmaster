const recipesModel = require('../models/cooksModel');

const listarReceitas = async (req, res) => {
  const cooks = await recipesModel.listCook();
  // console.log(cooks);
  return res.render('home', { cooks, user: req.user });
};

const viewRecipesUser = async (req, res) => {
  const cooks = await recipesModel.listSpecificRecipe(Number(req.params.id));
  res.render('recipes', { cooks, user: req.user });
};

const searchRecipes = async (req, res) =>{
  console.log("recipes");
  const cooks = await recipesModel.getSpecificRecipe(req.query.q);
  res.render('search',{ cooks, user: req.user})
  console.log(cooks);
};

module.exports = { listarReceitas, viewRecipesUser, searchRecipes };
