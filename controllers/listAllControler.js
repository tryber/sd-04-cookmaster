const { getAll } = require('../models/listRecipesModel');

const listRecipes = async (_req,res) => {
  const recipes = await getAll();

  console.log(recipes)
  res.render("home", { recipes })
}

module.exports = {
  listRecipes,
}
