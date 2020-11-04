const Recipes = require('../models/recipesModel');
const User = require('../models/userModel');

const listRecipes = async (req, res) => {
  const recipe = await Recipes.getRecipes();
  const user = req.user;

  return res.render('home', { recipe, user });
};

const recipeDetail = async (req, res) => {

  Recipes.findById(req.params.id)
    .then(rec => res.render({data: rec }))
    .catch(r => console.log(r))
  
  // const { id } = req.params;
  // const recipeDetail = await Recipes.findById(id);
  
  // return res.render('recipeDetail', { recipeDetail, user: req.user });
};

module.exports = { listRecipes, recipeDetail };


// const theRecipeName = async (req, res) => {
//   const { name } = req.params;
//   const recipeName = await Recipes.findByName(name);

//   if (!recipeName) return res.status(404).render('404');

//   res.render()

// }