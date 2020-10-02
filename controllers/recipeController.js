const { getById } = require('../models/recipeModel');

const recipe = async (req, res) => {
  const { token = '' } = req.cookies || {};
  const { id } = req.params;
  const recipeData = await getById(id);
  res.render('recipe', { ...recipeData, token });
};

module.exports = { recipe };
