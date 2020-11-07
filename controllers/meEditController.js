const { findById } = require('../models/userModel');
const meEditModel = require('../models/meEditModel');

const meEditForm = async (req, res) => {
  const { id } = req.user;
  const user = await findById(id);
  res.render('meEdit', { user, message: null });
};

const meEdit = async (req, res) => {
  const { id } = req.user;
  const user = await findById(id);
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  if (password !== confirmPassword) return res.render('meEdit', { user, message: 'As senhas tem que ser iguais.' });
  return meEditModel(id, email, password, firstName, lastName)
    .then(() => res.redirect('/'));
};

module.exports = {
  meEditForm,
  meEdit,
};
