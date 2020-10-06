const recipeModel = require('../models/recipesByIdModel');
const userModel = require('../models/userModel');
const recipeDeleteModel = require('../models/recipesDeleteModel');

const recipeDeleteForm = async (req, res) => {
  const recipe = await recipeModel(req.params.id);
  return res.render('recipeDelete', { recipe, message: null });
};

const recipeDelete = async (req, res) => {
  const recipe = await recipeModel(req.params.id);
  const user = await userModel.findById(req.user.id);
  const { password } = req.body;
  if (password !== user.password) return res.render('recipeDelete', { recipe, message: 'Senha Incorreta.' });
  recipeDeleteModel(req.params.id)
    .then(() => res.redirect('/'));
};

module.exports = {
  recipeDeleteForm,
  recipeDelete,
};
