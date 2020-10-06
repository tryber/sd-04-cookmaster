const receita = require('../models/homeModel');

const indexHome = async (req, res) => {
  const receitas = await receita.acharReceitas();
  const usuario = req.user;

  res.render('home', { receitas, usuario });
};

module.exports = {
  indexHome,
};
