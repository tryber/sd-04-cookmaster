const receita = require('../models/homeModel');

const indexHome = async (req, res) => {
  const receitas = await receita.acharReceitas();
  const usuario = req.user;
  const erroData = null;
  const cadastroValido = null;
  const receitaCadastrada = null;
  // console.log('usuario', usuario, receitas);

  res.render('home', { receitas, usuario, erroData, cadastroValido, receitaCadastrada });
};

module.exports = {
  indexHome,
};
