const Recipe = require('../models/recipeModel');
const ingredients = [];
// const setIngredients = (req, res) => {
//     const { q } = req.query;
//     foo.push(q);
//     console.log(foo);
//     res.render('edit', { foo });
//   };

const editRecipe = (req, res) => {
  const user = req.user;
  const { ing } = req.query;
  console.log('ing', ing);
  if (ing) {
    ingredients.push(ing);
  }
  console.log('array', ingredients);
  res.render('edit', { user, ingredients });
};

const registerRecipe = async (req, res) => {
  const user = req.user;
  const { name, instructions } = req.body;
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
