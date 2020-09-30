const { getRecipes } = require('../models');

const home = async (req, res) => {
  const { token = '' } = req.cookies || {};
  const islogged = !!token;
  const recipes = await getRecipes();
  return res.render('home', { recipes, islogged });
};

module.exports = { home };
