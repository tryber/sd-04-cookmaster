const Recipe = require('../models/recipeModel');

const editRecipe = (req, res) => {
  const user = req.user;
  res.render('edit', { user });
};
// ver depois a questao de ingredients
const registerRecipe = async (req, res) => {
  const user = req.user;
  const { name, ingredients, instructions } = req.body;
  await Recipe.createRecipe(
    user.id,
    `${user.name} ${user.lastName}`,
    name,
    ingredients,
    instructions,
  );
  res.render('edit', { user });
};

module.exports = {
  editRecipe,
  registerRecipe,
};
