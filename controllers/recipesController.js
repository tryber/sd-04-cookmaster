const Recipe = require('../models/recipes');

const home = async (_, res) => {
  const recipes = await Recipe.findAll();
  res.render('home', { recipes });
};

module.exports = {
  home,
};
