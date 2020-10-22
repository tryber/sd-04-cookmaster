const recipeModel = require('../models/recipesModel');
const userModel = require('../models/userModel');

const listRecipes = async (req, res) => {
  const recipesAuthor = await recipeModel.getAllRecipes();
  return res.render('home', { recipesAuthor, user: req.user });
};

// Formulário receitas cadastro
const recipesForm = async (req, res) => res.render('users/recipesNew', { user: req.user });

// Cadastra receita
const addRecipes = async (req, res) => {
  const { id, firstName } = req.user;
  const { name, ingredients, instructions } = req.body;

  recipeModel
    .addRecipes(id, firstName, name, ingredients.join(), instructions)
    .then(() => res.redirect('/'));
};

// Encontra receita
const findRecipes = async (req, res) => {
  const { q } = req.query;
  if (q === '' && !q) {
    res.status(200).render('users/search', { recipes: null, user: req.user });
  }
  const recipes = await recipeModel.findRecipes(q);
  res.render('users/search', { recipes, user: req.user, query: q });
};

// Obtêm uma receita por id
const getRecipeById = async (req, res) => {
  const recipesId = await recipeModel.getRecipeId(req.params.id);
  // console.log(recipesId);
  // console.log(req.user);
  res.render('users/recipesEdit', { recipesId, user: req.user });
};

// Atualiza receita
const updateRecipes = async (req, res) => {
  try {
    const { name, ingredients, instructions } = req.body;
    const id = req.params.id;

    await recipeModel.updateRecipe(id, name, ingredients, instructions);
    // res.status(200).render('/home', { userId, user: req.user });
    return res.redirect('/me/recipes');
  } catch (erro) {
    return res.send('Erro...');
  }
};

// Form exlui receita - GET
const formDelete = async (req, res) => {
  const idRecipe = req.params.id;
  const mensagem = false;
  res.render('users/recipesRemove', { idRecipe, user: req.user, mensagem });
};

// Exclui receita - POST
const recipesDelete = async (req, res) => {
  const idRecipe = req.params.id;
  const senha = req.body.senha;
  const user = await userModel.findById(req.user.id);
  if (senha !== user.password) {
    const mensagem = 'Senha Incorreta.';
    res.render('users/recipesRemove', { idRecipe, user: req.user, mensagem });
  }

  try {
    await recipeModel.removeRecipes(idRecipe);
    return res.redirect('/');
  } catch (error) {
    return res.send('Erro...');
  }
};

module.exports = {
  listRecipes,
  recipesForm,
  addRecipes,
  findRecipes,
  getRecipeById,
  updateRecipes,
  recipesDelete,
  formDelete,
};
