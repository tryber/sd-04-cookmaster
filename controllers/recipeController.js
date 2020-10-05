const recipe = require('../models/recipeModel');
const user = require('../models/userModel');

const index = async (req, res) => {
  const recipes = await recipe.findAll();
  // const usuario = await user.findByEmail('bruno.batista@gmail.com');

  res.render("home", { recipes, user: req.user});
}

module.exports = {
  index,
}