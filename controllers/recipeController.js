const recipeModel = require('../models/recipeModel');

const home = async (req, res) => {
  const recipes = await recipeModel.findAll();

  res.render('home', { recipes, user: req.user });
};

const detailsRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeModel.findById(id);

  res.render('recipes/details', { recipe, user: req.user });
};

const buscarRecipe = async (req, res) => {
  const { q } = req.query;
  const recipe = {};

  if (!q) {
    res.render('recipes/buscar', { recipe, user: req.user });
  } else {
    recipeModel
      .findByName(q)
      .then((sucesso) => res.render('recipes/buscar', { recipe: sucesso, user: req.user }))
      .catch(() => res.send('Receita não existe'));
  }
};

const adicionar = (req, res) => res.render('recipes/cadastro', { user: req.user });

const adicionarRecipe = async (req, res) => {
  const { user_id, user, nome, instructions } = req.body;
  const ingredients = req.body.ingredients.join();
  const data = { user_id, user, nome, ingredients, instructions };

  recipeModel.createRecipe(data).then(() => res.redirect('/'));
};

const update = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipeModel.findById(id);

  res.render('recipes/update', { recipe, user: req.user });
};

const updateCommit = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { nome, instructions } = req.body;
  const ingredients = req.body.ingredients.toString();

  const data = { id, nome, ingredients, instructions };

  recipeModel.updateRecipe(data).then(() => res.redirect('/'));
};

const minhasReceitas = async (req, res) => {
  const { id } = req.user;

  const recipes = await recipeModel.findByUserID(id);

  res.render('recipes/minhasReceitas', { recipes, user: req.user });
};

module.exports = {
  minhasReceitas,
  updateCommit,
  update,
  adicionarRecipe,
  adicionar,
  buscarRecipe,
  detailsRecipe,
  home,
};
