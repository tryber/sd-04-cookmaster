const recipesModels = require('../models/recipesModels');
const { validation } = require('../services/isValid');

// Pagina Inicial
const index = async (req, res) => {
  const recipes = await recipesModels.getAllRecipes();

  res.render('home', { recipes, user: req.user });
};

// Cadastros Controllers
const cadastroForm = async (req, res) => res.render('cadastro', { message: null });

const cadastro = async (req, res, redirect) => {
  const isValid = await validation({ ...req.body });

  console.log(isValid);
  if (isValid.status === 'ok') {
    res.render('cadastro', { message: isValid.message });
  } else {
    res.render('cadastro', { message: isValid.message });
  }
};

// Recipe Details Controllers

const recipeDetails = async (req, res) => {
  const recipe = await recipesModels.findRecipeById(req.params.id);
  console.log(recipe);

  res.render('recipeDetail', { recipe, user: req.user });
};

module.exports = {
  index,
  cadastro,
  cadastroForm,
  recipeDetails,
};
