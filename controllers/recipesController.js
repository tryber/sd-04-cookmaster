const recipesModel = require('../models/recipesModel');

const showAll = async (req, res) => {
  try {
    const recipes = await recipesModel.getAllRecipes();
    return res.render('home', { user: req.user, data: recipes });
  } catch (error) {
    return res.render('error', { error });
  }
};

const showOne = async (req, res) => {
  try {
    console.log(req.url);
    const recipe = await recipesModel.getRecipeById();
    return res.render('home', { user: req.user, data: recipe });
  } catch (error) {
    return res.render('error', { error });
  }
};

module.exports = {
  showOne,
  showAll,
};
