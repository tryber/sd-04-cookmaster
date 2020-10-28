const recipesModel = require('../models/recipesModel');

const showAll = async (req, res) => {
  try {
    const recipes = await recipesModel.getAllRecipes();
    return res.render('home', { user: req.user, recipes });
  } catch (error) {
    return res.send(error);
  }
};

const search = async (req, res) => {
  const { q } = req.query;
  if (!q && q !== '') res.status(200).render('recipes/search', { recipes: null, user: req.user });
  const recipes = await recipesModel.getRecipeByName(q);
  return res.status(200).render('recipes/search', { recipes, user: req.user, query: q });
};

const showOne = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesModel.getRecipeById(id);
    recipe.ingredients = recipe.ingredients.split(',');
    return res.render('recipes/view', { user: req.user, recipe });
  } catch (error) {
    return res.send(error);
  }
};

const add = (req, res) => {
  const { id, name: firstName, lastName } = req.user;
  const { name, ingredientes, instructions } = req.body;
  const userName = `${firstName} ${lastName}`;
  recipesModel.add(id, userName, name, ingredientes, instructions);
  res.redirect('/');
};

module.exports = {
  add,
  showOne,
  showAll,
  search,
};
