const recipiesModel = require('../models/recipiesModel');

const show = async (req, res) => {
  try {
    const recipes = await recipiesModel.getAllRecipes();
    return res.render('home', { user: req.user, data: recipes });
  } catch (error) {
    return res.render('error', { error });
  }
};

module.exports = {
  show,
};
