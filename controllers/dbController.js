const DB = require('../models/dbModel');


const listRecipes = async (req, res) => {
  const recipes = await DB.getAllRecipes();
  console.log("recipes dbControler", recipes);
  res.render('home', { recipes });
};

module.exports = {
  listRecipes
};
