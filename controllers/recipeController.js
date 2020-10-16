const { getAll } = require('../models/recipeModel');

const showRecipes = async (req, res) => {
  const recipes = await getAll();

  if (req.cookies.token) {
    return res.status(200).render('admin/home', { recipes, user: req.user });
  }

  res.status(200).render('home', { recipes });
};

module.exports = {
  showRecipes,
};
