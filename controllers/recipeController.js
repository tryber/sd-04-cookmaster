const recipeModel = require('../models/recipesModel');

const listRecipes = async (req, res) => {
  const recipesAuthor = await recipeModel.getAllRecipes();
  res.render('home', { recipesAuthor, user: req.user });
};

// Formulário receitas cadastro
const recipesForm = async (req, res) => res.render('users/recipesNew', { user: req.user });

// Cadastra receita
const addRecipes = async (req, res) => {
  const { id, firstName } = req.user;
  const { name, ingredients, instructions } = req.body;

  recipeModel
    .addRecipes(id, firstName, name, ingredients.join(), instructions)
    .then(() => res.send('Receita cadastrada!'));
};

module.exports = { listRecipes, recipesForm, addRecipes };
