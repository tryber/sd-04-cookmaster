const {getRecipes} = require("../../sd-03-project-cookmaster/models/getRecipes");


const recipesController = async (_req, res) => {
  const recipes = await getRecipes();
  console.log(recipes);

  return res.render('home', { recipes });
}

module.exports = recipesController;
