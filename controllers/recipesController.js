const recipesModel = require('../models/recipesModel');

const show = async (req, res) => {
  try {
    const recipes = await recipesModel.getAllRecipes();
    return res.render('home', { user: req.user, data: recipes });
  } catch (error) {
    return res.render('error', { error });
  }
};

module.exports = {
  show,
};
