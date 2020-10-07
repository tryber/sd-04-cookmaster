const Recipe = require('../models/recipeModel');

const editRecipe = (req, res) => {
  const user = req.user; 
  res.render('edit', { user });
};

const registerRecipe = async (req, res) => {
  const user = req.user;
  const { name, ingredients, instructions } = req.body;
  console.log(name, ingredients, instructions);
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
