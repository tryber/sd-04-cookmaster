const receita = require('../models/homeModel');

const indexHome = async (req,res) => {
  const receitas = await receita.acharReceitas();
  const user_ = req.user
  console.log('ta me ouvindo?')

  res.render('home', { receitas, user_ });
}

module.exports = {
  indexHome,
}