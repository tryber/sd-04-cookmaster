const deleteModel = require('../models/deleteRecipeModel');

const renderDeleteRecipe = (req, res) => {
  const { user, params } = req;
  const { id } = params;
  const message = null;
  res.render('deleteRecipe', { user, id, message });
};

const postDeleteRecipe = async (req, res) => {
  const { user, body, params } = req;
  const { id } = params;
  const message = 'Senha Incorreta.';

  const userPassword = await deleteModel.findById(user.id);
  if (userPassword.password === body.password) {
    await deleteModel.deleteRecipe(id);
    return res.redirect('/');
  }
  return res.render('deleteRecipe', { user, id, message });
};

module.exports = {
  renderDeleteRecipe,
  postDeleteRecipe,
};
