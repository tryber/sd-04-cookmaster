const recipesModel = require('../models/cooksModel');

const listarReceitas = async (req, res) => {
  const cooks = await recipesModel.listCook();
  console.log(cooks);
  return res.render('home', { cooks, user: req.user });
};

module.exports = { listarReceitas };
