const { response } = require('express');
const Recipe = require('../models/recipes');

const home = async (_, res) => {
  const recipes = await Recipe.findAll();
  console.log(recipes);
  res.render('home', { recipes });
};

module.exports = {
  home,
};
