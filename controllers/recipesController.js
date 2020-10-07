const Recipe = require('../models/recipes');

const home = async (req, res) => {
  const recipes = await Recipe.findAll();
  res.render('home', { recipes, user: req.user });
};

module.exports = {
  home,
};
