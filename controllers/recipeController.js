const recipeModel = require('../models/recipeModel');
const userModel = require('../models/userModel');

const showRecipes = async (req, res) => {
  const recipes = await recipeModel.findAll();

  return res.render('home', { recipes, user: req.user });
  // tem q colocar tb o user para acessar na home e na navbar
};

const seeRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeModel.recipeById(id);

  res.render('seerecipe', { ...recipe, user: req.user });
};

const searchRecipess = async (req, res) => {
  // valor do input de texto deverá estar acessível através da prop q do objeto req.query.
  const { q } = req.query;

  if (q === '') return res.render('searchRecipe', { recipes: null, user: req.user });

  const recipes = await recipeModel.searchRecipes(q);

  return res.render('searchRecipe', { recipes, user: req.user });
};

const myRecipe = async (req, res) => {
  const { id } = req.user;
  const recipes = await recipeModel.myRecipeByUserId(id);
  return res.render('admin/meRecipes', { recipes, user: req.user });
};

// controller para o post(pegar informaçao que o usuario fornece no caso a senha pra excluir)
const deleteRecipeForm = async (req, res) => {
  const { id } = req.user;
  const { userId } = await recipeModel.recipeById(req.params.id);

  if (userId !== id) res.redirect('/');

  return res.render('admin/delete', { message: null, user: req.user, id: req.params.id });
};

// A receita só deve ser excluída caso a senha esteja correta. Caso ela esteja incorreta,
// a pessoa deve ser redirecionada à página de exclusão da receita com a mensagem "Senha incorreta.
const deleteRecipe = async (req, res) => {
  const { id } = req.user;
  const { password: senha } = req.body;
  const { password } = await userModel.findById(id);

  if (password !== senha) {
    res.render('admin/delete', { message: 'Senha Incorreta.', user: req.user, id: req.params.id });
  }
  // Caso a receita seja excluída com sucesso, ser redirecionada à página de listagem de receitas.
  await recipeModel.deleteRecipe(req.params.id);

  return res.redirect('/');
};

// controller para o post(pegar informaçao que o usuario fornece)
const newRecipeForm = async (req, res) => res.render('admin/new', { user: req.user });

const newRecipe = async (req, res) => {
  const { recipeName, ingredients, instructions } = req.body;
  const { name, lastName, id } = req.user;
  const userFullName = `${name} ${lastName}`;

  await recipeModel.addNewRecipe(id, userFullName, recipeName, ingredients, instructions);

  return res.redirect('/');
};

module.exports = {
  showRecipes,
  seeRecipe,
  searchRecipess,
  myRecipe,
  deleteRecipeForm,
  deleteRecipe,
  newRecipe,
  newRecipeForm,
};
